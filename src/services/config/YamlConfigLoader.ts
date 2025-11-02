import * as yaml from 'js-yaml';
import * as vscode from 'vscode';
import * as path from 'path';
import { PathsConfigSchema, IntegrationsConfigSchema, QualityConfigSchema } from './ConfigSchema';

/**
 * Carregador de configurações YAML.
 * Singleton que carrega, valida e sanitiza configurações YAML do Prisma.
 *
 * Implementa proteção contra path traversal (ADR-001, RS001-RS003).
 * Carrega YAMLs de `.prisma/configuracoes/prisma/` e aplica validação Zod.
 *
 * @example
 * ```typescript
 * const loader = YamlConfigLoader.getInstance();
 * const configs = await loader.loadAll('/path/to/workspace');
 * if (configs) {
 *   console.log(configs.paths.agents); // '.claude/agents/prisma'
 * }
 * ```
 */
export class YamlConfigLoader {
    private static instance: YamlConfigLoader;
    private cachedConfigs: YamlConfigs | null = null;

    private constructor() {}

    /**
     * Retorna instância singleton do YamlConfigLoader.
     *
     * @returns Instância única do loader
     *
     * @example
     * ```typescript
     * const loader = YamlConfigLoader.getInstance();
     * const configs = await loader.loadAll('/workspace');
     * ```
     */
    static getInstance(): YamlConfigLoader {
        if (!YamlConfigLoader.instance) {
            YamlConfigLoader.instance = new YamlConfigLoader();
        }
        return YamlConfigLoader.instance;
    }

    /**
     * Carrega todos os YAMLs de configuração do workspace.
     *
     * Carrega e mergea 3 arquivos YAML:
     * - `caminhos.yaml`: Paths relativos ao workspace
     * - `integracoes.yaml`: Configurações de integração com Claude
     * - `qualidade.yaml`: Configurações de validação
     *
     * Se o diretório não existir, cria arquivos default.
     * Aplica validação Zod e sanitização de paths (ADR-001).
     *
     * @param workspaceRoot - Caminho absoluto para raiz do workspace
     * @returns Configurações mergeadas ou null se erro de parsing
     *
     * @example
     * ```typescript
     * const loader = YamlConfigLoader.getInstance();
     * const configs = await loader.loadAll('/path/to/workspace');
     *
     * if (configs) {
     *   console.log(configs.paths.agents);  // '.claude/agents/prisma'
     *   console.log(configs.integrations.invocationMode); // 'cli'
     *   console.log(configs.quality.enabled); // true
     * }
     * ```
     */
    async loadAll(workspaceRoot: string): Promise<YamlConfigs | null> {
        // Cache hit
        if (this.cachedConfigs) {
            return this.cachedConfigs;
        }

        const configDir = path.join(workspaceRoot, '.prisma/configuracoes/prisma');

        try {
            // Verifica se diretório existe
            await vscode.workspace.fs.stat(vscode.Uri.file(configDir));
        } catch {
            // Diretório não existe - cria com defaults
            await this.createDefaults(configDir);
        }

        try {
            // Carrega os 3 YAMLs principais
            const [paths, integrations, quality] = await Promise.all([
                this.loadYaml(path.join(configDir, 'caminhos.yaml'), PathsConfigSchema),
                this.loadYaml(path.join(configDir, 'integracoes.yaml'), IntegrationsConfigSchema),
                this.loadYaml(path.join(configDir, 'qualidade.yaml'), QualityConfigSchema)
            ]);

            // Se TODOS os YAMLs falharam (parsing error), retorna null
            if (!paths && !integrations && !quality) {
                throw new Error('All YAML files failed to load');
            }

            // Extrai apenas os campos necessários
            const defaultPaths = this.getDefaultPaths();
            const defaultIntegrations = this.getDefaultIntegrations();
            const defaultQuality = this.getDefaultQuality();

            let configs: YamlConfigs = {
                paths: paths?.paths || defaultPaths,
                integrations: integrations?.claude ? {
                    invocationMode: integrations.claude.invocationMode ?? defaultIntegrations.invocationMode,
                    cliPath: integrations.claude.cliPath ?? defaultIntegrations.cliPath,
                    terminal: integrations.claude.terminal ? {
                        activationDelay: integrations.claude.terminal.activationDelay ?? defaultIntegrations.terminal.activationDelay
                    } : defaultIntegrations.terminal
                } : defaultIntegrations,
                quality: quality?.validation ? {
                    enabled: quality.validation.enabled ?? defaultQuality.enabled,
                    strictMode: quality.validation.strictMode ?? defaultQuality.strictMode,
                    logLevel: quality.validation.logLevel ?? defaultQuality.logLevel,
                    showNotifications: quality.validation.showNotifications ?? defaultQuality.showNotifications
                } : defaultQuality
            };

            // Sanitiza paths (RS001-RS003 - ADR-001)
            configs = this.sanitizeConfigs(configs, workspaceRoot);

            // Cache
            this.cachedConfigs = configs;
            return configs;

        } catch (error) {
            console.error('[YamlConfigLoader] Failed to load YAMLs:', error);
            return null;  // Fallback para JSON/defaults
        }
    }

    /**
     * Carrega um único YAML e valida com schema Zod.
     */
    private async loadYaml<T>(filePath: string, schema: { parse: (data: unknown) => T }): Promise<T | null> {
        try {
            const content = await vscode.workspace.fs.readFile(vscode.Uri.file(filePath));
            const text = Buffer.from(content).toString('utf8');
            const parsed = yaml.load(text);

            // Valida com Zod
            const validated = schema.parse(parsed);
            return validated;

        } catch (error) {
            if (error instanceof Error) {
                console.warn(`[YamlConfigLoader] Failed to load ${path.basename(filePath)}:`, error.message);
            }
            return null;  // Fallback para próximo YAML ou defaults
        }
    }

    /**
     * Valida path contra path traversal e paths absolutos.
     * Implementa requisitos RS001-RS003 (ADR-001).
     */
    private validatePath(inputPath: string, workspaceRoot: string): boolean {
        try {
            const normalized = path.normalize(inputPath);

            // Rejeita paths absolutos
            if (path.isAbsolute(normalized)) {
                return false;
            }

            // Rejeita path traversal (..) - verifica no caminho normalizado
            const segments = normalized.split(path.sep);
            if (segments.includes('..')) {
                return false;
            }

            // Verifica se resolve dentro do workspace usando path.relative
            const resolved = path.resolve(workspaceRoot, normalized);
            const relative = path.relative(workspaceRoot, resolved);

            // Se path.relative retornar um path que começa com '..' ou é absoluto,
            // significa que está fora do workspace
            // String vazia significa que resolve para o workspace root (válido)
            if (relative === '') {
                return true; // Workspace root é válido
            }

            if (relative.startsWith('..') || path.isAbsolute(relative)) {
                return false;
            }

            return true;

        } catch {
            return false;
        }
    }

    /**
     * Sanitiza configs aplicando validação de paths.
     * Substitui paths inválidos por defaults.
     */
    private sanitizeConfigs(configs: YamlConfigs, workspaceRoot: string): YamlConfigs {
        const defaults = this.getDefaultPaths();

        for (const [key, pathValue] of Object.entries(configs.paths)) {
            if (!this.validatePath(pathValue, workspaceRoot)) {
                console.warn(`[YamlConfigLoader] Invalid path '${key}': ${pathValue}. Using default.`);
                (configs.paths as any)[key] = (defaults as any)[key];
            }
        }

        return configs;
    }

    /**
     * Cria YAMLs padrão se não existirem.
     */
    private async createDefaults(configDir: string): Promise<void> {
        await vscode.workspace.fs.createDirectory(vscode.Uri.file(configDir));

        const defaults = {
            'caminhos.yaml': this.getDefaultPathsYaml(),
            'integracoes.yaml': this.getDefaultIntegrationsYaml(),
            'qualidade.yaml': this.getDefaultQualityYaml()
        };

        for (const [filename, content] of Object.entries(defaults)) {
            const filePath = path.join(configDir, filename);
            await vscode.workspace.fs.writeFile(
                vscode.Uri.file(filePath),
                Buffer.from(content, 'utf8')
            );
        }
    }

    /**
     * Limpa o cache de configurações.
     *
     * Força próxima chamada de `loadAll()` a recarregar YAMLs do disco.
     * Útil para testes e para invalidar cache após mudanças em arquivos.
     *
     * @example
     * ```typescript
     * const loader = YamlConfigLoader.getInstance();
     * await loader.loadAll('/workspace'); // Reads from disk
     * await loader.loadAll('/workspace'); // Uses cache
     *
     * loader.clearCache();
     * await loader.loadAll('/workspace'); // Reads from disk again
     * ```
     */
    clearCache(): void {
        this.cachedConfigs = null;
    }

    // ==================== Defaults ====================

    private getDefaultPaths() {
        return {
            agents: '.claude/agents/prisma',
            prompts: '.claude/system-prompts',
            commands: '.claude/commands/prisma',
            templates: '.claude/templates',
            specs: '.prisma/projeto/especificacoes',
            steering: '.claude/steering',
            settings: '.claude/settings'
        };
    }

    private getDefaultIntegrations() {
        return {
            invocationMode: 'cli' as const,
            cliPath: 'claude',
            terminal: {
                activationDelay: 800
            }
        };
    }

    private getDefaultQuality() {
        return {
            enabled: true,
            strictMode: false,
            logLevel: 'warn' as const,
            showNotifications: true
        };
    }

    private getDefaultPathsYaml(): string {
        return `# Configuração de Paths - Prisma for Claude Code
# Paths são relativos ao workspace root

paths:
  agents: .claude/agents/prisma
  prompts: .claude/system-prompts
  commands: .claude/commands/prisma
  templates: .claude/templates
  specs: .prisma/projeto/especificacoes
  steering: .claude/steering
  settings: .claude/settings
`;
    }

    private getDefaultIntegrationsYaml(): string {
        return `# Configuração de Integrações - Prisma for Claude Code

claude:
  invocationMode: cli  # cli | extension
  cliPath: claude
  terminal:
    activationDelay: 800  # ms
`;
    }

    private getDefaultQualityYaml(): string {
        return `# Configuração de Validação - Prisma for Claude Code

validation:
  enabled: true
  strictMode: false
  logLevel: warn  # error | warn | info | debug
  showNotifications: true
`;
    }
}

/**
 * Configurações YAML mergeadas do Prisma.
 *
 * Estrutura resultante da combinação de 3 arquivos YAML:
 * - `caminhos.yaml` → `paths`
 * - `integracoes.yaml` → `integrations`
 * - `qualidade.yaml` → `quality`
 */
export interface YamlConfigs {
    /**
     * Paths relativos ao workspace root.
     * Sanitizados contra path traversal (ADR-001).
     *
     * @example
     * ```typescript
     * {
     *   agents: '.claude/agents/prisma',
     *   prompts: '.claude/system-prompts',
     *   commands: '.claude/commands/prisma'
     * }
     * ```
     */
    paths: Record<string, string>;

    /**
     * Configurações de integração com Claude CLI/Extension.
     */
    integrations: {
        /** Modo de invocação: CLI externo ou Extension API */
        invocationMode: 'cli' | 'extension';

        /** Caminho para binário Claude CLI (se invocationMode === 'cli') */
        cliPath: string;

        /** Configurações de terminal (opcional) */
        terminal?: {
            /** Delay de ativação do terminal em ms (0-5000) */
            activationDelay: number;
        };
    };

    /**
     * Configurações de validação e qualidade.
     */
    quality: {
        /** Validação Zod habilitada */
        enabled: boolean;

        /** Modo strict (rejeita campos desconhecidos) */
        strictMode: boolean;

        /** Nível de log: error | warn | info | debug */
        logLevel: 'error' | 'warn' | 'info' | 'debug';

        /** Mostrar notificações visuais de erro */
        showNotifications: boolean;
    };
}
