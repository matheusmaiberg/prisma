# Requirements Specification: YamlConfigLoader
**Versão**: 1.0
**Analista**: v3 (Perspectiva: Riscos & Implementação Técnica)
**Data**: 2025-01-15
**Status**: Draft

---

## 1. Contexto Técnico

### 1.1 Análise de Código Existente

**ConfigManager (src/utils/configManager.ts)**
```typescript
// Linha 46-67: Método loadSettings() atual
async loadSettings(): Promise<PrismaSettings> {
    const settingsPath = path.join(
        this.workspaceFolder.uri.fsPath,
        DEFAULT_PATHS.settings,  // ← HARDCODED de constants.ts
        CONFIG_FILE_NAME         // ← 'prisma.settings.json'
    );

    try {
        const fileContent = await vscode.workspace.fs.readFile(vscode.Uri.file(settingsPath));
        const settings = JSON.parse(Buffer.from(fileContent).toString());  // ← Só lê JSON
        const mergedSettings = { ...this.getDefaultSettings(), ...settings };
        this.settings = mergedSettings;
        return this.settings!;
    } catch (error) {
        // Return default settings if file doesn't exist
        this.settings = this.getDefaultSettings();
        return this.settings!;
    }
}
```

**Problema Identificado**:
- Só lê JSON (linha 59)
- Path hardcoded (linha 52-53)
- Merge simples (linha 60) - não suporta deep merge
- Sem validação de schema

**AgentManager (src/features/agents/agentManager.ts)**
```typescript
// Linha 64: Path hardcoded #1
const targetDir = path.join(this.workspaceRoot, '.claude/agents/prisma');

// Linha 104: Path hardcoded #2
const promptsDir = path.join(this.workspaceRoot, '.claude/system-prompts');

// Linha 138: Path hardcoded #3
const targetDir = path.join(this.workspaceRoot, '.claude/commands/prisma');

// Linha 159: Path hardcoded #4
const targetDir = path.join(this.workspaceRoot, '.claude/templates');

// Linha 179, 319, 336: Mais paths hardcoded
```

**Total de Paths Hardcoded**: 7 instâncias em AgentManager apenas.

### 1.2 Dependências Atuais

```json
// package.json (linha 395-398)
"dependencies": {
  "gray-matter": "^4.0.3",    // Parsing de frontmatter (usado)
  "handlebars": "^4.7.8",     // Templates (usado)
  "js-yaml": "^4.1.0"         // YAML parsing (NÃO USADO ainda)
}
```

**js-yaml já instalado** - não requer nova dependência para parsing YAML.

**Zod NÃO instalado** - requer adicionar:
```json
"devDependencies": {
  "@types/js-yaml": "^4.0.9",  // Já existe
  "zod": "^3.22.4"             // ADICIONAR
}
```

---

## 2. Requisitos de Implementação Técnica

### 2.1 Arquitetura de Componentes

**Novos Arquivos a Criar**:

```
src/
├── services/
│   └── config/
│       ├── YamlConfigLoader.ts       # Singleton - carrega e valida YAMLs
│       ├── ConfigSchema.ts           # Zod schemas para validação
│       └── ConfigMerger.ts           # Deep merge de configs (YAML + JSON + defaults)
├── types/
│   └── config.types.ts               # Interfaces TypeScript geradas de schemas
└── utils/
    └── configManager.ts (MODIFICAR)  # Integrar com YamlConfigLoader
```

**Arquivos a Modificar**:
- `src/utils/configManager.ts`: Adicionar integração com YamlConfigLoader
- `src/features/agents/agentManager.ts`: Substituir 7 paths hardcoded
- `src/constants.ts`: Marcar como deprecated (opcional)

**Arquivos a Criar (Resources)**:
```
dist/resources/configuracoes/prisma/
├── caminhos.yaml         # Paths de diretórios
├── integracoes.yaml      # Integrações externas (Claude CLI)
└── qualidade.yaml        # Validação e logs
```

### 2.2 Interface YamlConfigLoader

```typescript
/**
 * Singleton que carrega configurações YAML e as valida com Zod.
 *
 * @example
 * const loader = YamlConfigLoader.getInstance();
 * const configs = await loader.loadAll('.prisma/configuracoes/prisma');
 * const paths = configs.paths; // { agents: '.claude/agents/prisma', ... }
 */
export class YamlConfigLoader {
    private static instance: YamlConfigLoader;
    private cachedConfigs: YamlConfigs | null = null;

    private constructor() {}

    static getInstance(): YamlConfigLoader;

    /**
     * Carrega todos os YAMLs de um diretório e faz merge.
     * @param dirPath - Caminho relativo ao workspace (ex: '.prisma/configuracoes/prisma')
     * @returns Configurações mergeadas e validadas
     * @throws {YamlConfigError} Se diretório não existe e createDefaults=false
     */
    async loadAll(dirPath: string, options?: LoadOptions): Promise<YamlConfigs>;

    /**
     * Valida configurações contra schemas Zod.
     * @returns { valid: true } | { valid: false, errors: ZodError[] }
     */
    validate(configs: any): ValidationResult;

    /**
     * Cria arquivos YAML padrão.
     */
    async createDefaults(dirPath: string): Promise<void>;

    /**
     * Limpa cache (para testes).
     */
    clearCache(): void;
}

interface LoadOptions {
    createDefaults?: boolean;  // default: true
    strictMode?: boolean;      // default: false (falhas não bloqueiam)
    logErrors?: boolean;       // default: true
}

interface ValidationResult {
    valid: boolean;
    errors?: ZodError[];
}

interface YamlConfigs {
    paths: PathsConfig;
    integrations: IntegrationsConfig;
    quality: QualityConfig;
}
```

### 2.3 Schema Zod (ConfigSchema.ts)

```typescript
import { z } from 'zod';

/**
 * Schema para caminhos.yaml
 */
export const PathsConfigSchema = z.object({
    paths: z.object({
        agents: z.string().min(1),           // .claude/agents/prisma
        prompts: z.string().min(1),          // .claude/system-prompts
        commands: z.string().min(1),         // .claude/commands/prisma
        templates: z.string().min(1),        // .claude/templates
        specs: z.string().min(1),            // .prisma/projeto/especificacoes
        steering: z.string().min(1),         // .claude/steering
        settings: z.string().min(1)          // .claude/settings
    }).strict()  // Rejeitar campos desconhecidos
});

/**
 * Schema para integracoes.yaml
 */
export const IntegrationsConfigSchema = z.object({
    claude: z.object({
        invocationMode: z.enum(['cli', 'extension']).default('cli'),
        cliPath: z.string().default('claude'),
        terminal: z.object({
            activationDelay: z.number().int().min(0).max(5000).default(800)
        }).optional()
    }).strict()
});

/**
 * Schema para qualidade.yaml
 */
export const QualityConfigSchema = z.object({
    validation: z.object({
        enabled: z.boolean().default(true),
        strictMode: z.boolean().default(false),
        logLevel: z.enum(['error', 'warn', 'info', 'debug']).default('warn'),
        showNotifications: z.boolean().default(true)
    }).strict()
});

/**
 * Schema completo (union de todos os YAMLs)
 */
export const YamlConfigsSchema = z.object({
    paths: PathsConfigSchema.shape.paths,
    integrations: IntegrationsConfigSchema.shape.claude,
    quality: QualityConfigSchema.shape.validation
});

// Export de tipos inferidos
export type PathsConfig = z.infer<typeof PathsConfigSchema>;
export type IntegrationsConfig = z.infer<typeof IntegrationsConfigSchema>;
export type QualityConfig = z.infer<typeof QualityConfigSchema>;
export type YamlConfigs = z.infer<typeof YamlConfigsSchema>;
```

### 2.4 Integração com ConfigManager (Adapter Pattern)

```typescript
// src/utils/configManager.ts (modificações)

import { YamlConfigLoader } from '../services/config/YamlConfigLoader';

export class ConfigManager {
    private yamlLoader: YamlConfigLoader;
    private yamlConfigs: YamlConfigs | null = null;

    async loadSettings(): Promise<PrismaSettings> {
        // PASSO 1: Carregar YAMLs
        try {
            this.yamlLoader = YamlConfigLoader.getInstance();
            this.yamlConfigs = await this.yamlLoader.loadAll('.prisma/configuracoes/prisma', {
                createDefaults: true,
                strictMode: false
            });
        } catch (error) {
            this.outputChannel.appendLine(`[ConfigManager] Failed to load YAMLs: ${error}`);
            this.yamlConfigs = null;  // Fallback para JSON/defaults
        }

        // PASSO 2: Carregar JSON (existente)
        let jsonSettings: Partial<PrismaSettings> = {};
        try {
            const settingsPath = path.join(
                this.workspaceFolder.uri.fsPath,
                this.yamlConfigs?.paths.settings || DEFAULT_PATHS.settings,  // ← Usar YAML se disponível
                CONFIG_FILE_NAME
            );
            const fileContent = await vscode.workspace.fs.readFile(vscode.Uri.file(settingsPath));
            jsonSettings = JSON.parse(Buffer.from(fileContent).toString());
        } catch (error) {
            // JSON não existe - ok, usar defaults
        }

        // PASSO 3: Merge com precedência YAML > JSON > defaults
        this.settings = this.mergeConfigs(
            this.yamlConfigs,
            jsonSettings,
            this.getDefaultSettings()
        );

        return this.settings!;
    }

    /**
     * Deep merge de configs com precedência.
     */
    private mergeConfigs(
        yaml: YamlConfigs | null,
        json: Partial<PrismaSettings>,
        defaults: PrismaSettings
    ): PrismaSettings {
        // Implementação de deep merge (lodash.merge ou custom)
        // Precedência: yaml > json > defaults

        const result = { ...defaults };

        // Merge JSON
        if (json.paths) {
            result.paths = { ...result.paths, ...json.paths };
        }

        // Merge YAML (sobrescreve JSON)
        if (yaml?.paths) {
            result.paths = { ...result.paths, ...yaml.paths };
        }

        // Merge outras seções...

        return result;
    }
}
```

---

## 3. Requisitos Funcionais (Casos de Teste)

### 3.1 Carregamento de YAMLs

**RF-T001**: Dado que `.prisma/configuracoes/prisma/caminhos.yaml` existe e é válido, quando sistema carrega configs, então `yamlConfigs.paths` contém valores do YAML.

**RF-T002**: Dado que `.prisma/configuracoes/prisma/` não existe, quando sistema carrega configs, então sistema cria 3 YAMLs padrão (caminhos, integracoes, qualidade).

**RF-T003**: Dado que `caminhos.yaml` contém sintaxe inválida (`paths: [invalid`), quando sistema carrega configs, então log contém erro "Failed to parse caminhos.yaml: unexpected token" e sistema usa fallback.

**RF-T004**: Dado que múltiplos YAMLs definem mesmo campo (`paths.agents`), quando sistema faz merge, então último YAML em ordem alfabética vence.

### 3.2 Validação de Schemas

**RF-T005**: Dado que `caminhos.yaml` contém campo desconhecido (`invalidField: value`), quando sistema valida, então Zod rejeita com erro "Unrecognized key: invalidField" e sistema usa fallback.

**RF-T006**: Dado que `integracoes.yaml` contém `invocationMode: invalid`, quando sistema valida, então Zod rejeita com erro "Expected 'cli' | 'extension', received 'invalid'".

**RF-T007**: Dado que `paths.agents` contém path traversal (`../../../etc/passwd`), quando sistema valida, então validação customizada rejeita com erro "Path traversal detected".

### 3.3 Merge de Configurações

**RF-T008**: Dado que YAML define `paths.agents: .yaml-agents`, JSON define `paths.agents: .json-agents` e default é `.claude/agents/prisma`, quando sistema faz merge, então resultado é `.yaml-agents` (YAML vence).

**RF-T009**: Dado que YAML não define `paths.agents`, JSON define `paths.agents: .json-agents`, quando sistema faz merge, então resultado é `.json-agents` (JSON vence sobre default).

**RF-T010**: Dado que nem YAML nem JSON definem `paths.agents`, quando sistema faz merge, então resultado é `.claude/agents/prisma` (default).

### 3.4 Integração com AgentManager

**RF-T011**: Dado que `caminhos.yaml` define `paths.agents: .custom-agents`, quando AgentManager inicializa, então agentes são copiados para `.custom-agents`.

**RF-T012**: Dado que `configManager.getPath('agents')` é chamado, quando YAML define path customizado, então retorna path do YAML (não hardcoded).

---

## 4. Requisitos de Segurança

### 4.1 Validação de Paths (CRÍTICO)

**RS001**: Sistema MUST validar que paths não contêm `../` que escapam do workspace root.

**Implementação**:
```typescript
function validatePath(inputPath: string, workspaceRoot: string): boolean {
    const normalized = path.normalize(inputPath);
    const absolute = path.join(workspaceRoot, normalized);

    // Verifica se path resolvido está dentro do workspace
    return absolute.startsWith(workspaceRoot);
}
```

**Teste**:
```typescript
// ✅ Válido
validatePath('.claude/agents', '/workspace') // → true

// ❌ Inválido (path traversal)
validatePath('../../../etc/passwd', '/workspace') // → false
validatePath('..\\..\\Windows\\System32', '/workspace') // → false
```

**RS002**: Sistema MUST rejeitar paths absolutos fornecidos por usuários (apenas relativos ao workspace são permitidos).

**RS003**: Sistema MUST sanitizar paths antes de usar em operações de filesystem (remover caracteres especiais, normalizar separadores).

### 4.2 Proteção de Logs

**RS004**: Logs de erro MUST NÃO expor conteúdo completo de YAMLs (apenas metadata: filename, linha, tipo de erro).

**Exemplo**:
```typescript
// ❌ ERRADO - expõe conteúdo
console.error('Failed to parse YAML:', yamlContent);

// ✅ CORRETO - só metadata
console.error('Failed to parse caminhos.yaml at line 5: unexpected token');
```

---

## 5. Requisitos de Performance

### 5.1 Benchmarks

**RP001**: Carregamento de 3 YAMLs (total ~1KB) MUST completar em < 50ms (média de 10 execuções).

**RP002**: Validação Zod de 3 schemas MUST completar em < 30ms.

**RP003**: Deep merge de configs (YAML + JSON + defaults) MUST completar em < 10ms.

**RP004**: Startup total da extensão NÃO DEVE aumentar em > 100ms após adicionar YamlConfigLoader.

### 5.2 Estratégias de Otimização

**Caching**:
```typescript
class YamlConfigLoader {
    private cachedConfigs: YamlConfigs | null = null;

    async loadAll(dirPath: string): Promise<YamlConfigs> {
        if (this.cachedConfigs) {
            return this.cachedConfigs;  // ← Cache hit
        }

        // Load e valida...
        this.cachedConfigs = configs;
        return configs;
    }
}
```

**Lazy Loading**:
- YamlConfigLoader só carrega YAMLs na primeira chamada a `loadSettings()`
- Não carregar durante `extension.activate()` (pode ser async depois)

**Parallel Loading**:
```typescript
// Carregar múltiplos YAMLs em paralelo
const [caminhos, integracoes, qualidade] = await Promise.all([
    this.loadYaml('caminhos.yaml'),
    this.loadYaml('integracoes.yaml'),
    this.loadYaml('qualidade.yaml')
]);
```

---

## 6. Análise de Riscos Técnicos

### 6.1 Matriz de Riscos

| ID | Risco | Probabilidade | Impacto Técnico | Severidade | Mitigação |
|----|-------|---------------|-----------------|------------|-----------|
| **RT1** | ConfigManager refactor quebra código existente | **ALTA** | **CRÍTICO** | 🔴 P0 | Adapter Pattern + testes retrocompatibilidade |
| **RT2** | Parse de YAML falha e extensão não inicializa | **ALTA** | **CRÍTICO** | 🔴 P0 | Fallback robusto + try-catch em múltiplos níveis |
| **RT3** | Deep merge corrompe configs (sobrescreve erradamente) | **MÉDIA** | **ALTO** | 🟡 P1 | Testes unitários extensivos de merge + lodash.merge |
| **RT4** | Zod schemas desatualizados em relação a código | **MÉDIA** | **ALTO** | 🟡 P1 | CI job valida schemas vs interfaces TS |
| **RT5** | Performance degrada (> 100ms no startup) | **MÉDIA** | **MÉDIO** | 🟡 P2 | Benchmarks + caching + lazy loading |
| **RT6** | Path traversal permite acesso a arquivos externos | **BAIXA** | **CRÍTICO** | 🔴 P0 | Validação de paths + normalização + testes segurança |
| **RT7** | YAML com encoding não-UTF8 causa parse error | **BAIXA** | **MÉDIO** | 🟢 P3 | js-yaml detecta encoding + fallback |

### 6.2 Plano de Contingência

**Se RT1 (ConfigManager refactor quebra código)**:
1. Rollback para versão anterior (Git)
2. Criar branch isolada para YamlConfigLoader
3. Implementar feature flag: `USE_YAML_LOADER=false` para desativar

**Se RT2 (Parse falha e extensão não inicializa)**:
1. Log detalhado no OutputChannel
2. Notificação VSCode com botão "Use Defaults"
3. Fallback automático para JSON + defaults
4. Extensão continua funcional (só ignora YAML problemático)

**Se RT6 (Path traversal)**:
1. Rejeitar imediatamente na validação
2. Logar tentativa suspeita
3. Usar path padrão (não customizado)
4. Notificar usuário de configuração inválida

---

## 7. Estratégia de Testes

### 7.1 Testes Unitários (Jest)

**YamlConfigLoader.test.ts**:
```typescript
describe('YamlConfigLoader', () => {
    describe('loadAll', () => {
        it('should load valid YAMLs and merge correctly', async () => {
            // Given: YAMLs válidos em dir
            // When: loadAll()
            // Then: configs mergeadas corretamente
        });

        it('should create defaults if YAMLs do not exist', async () => {
            // Given: Diretório vazio
            // When: loadAll({ createDefaults: true })
            // Then: 3 YAMLs criados
        });

        it('should use fallback when YAML parsing fails', async () => {
            // Given: YAML com sintaxe inválida
            // When: loadAll()
            // Then: Retorna defaults + log de erro
        });
    });

    describe('validate', () => {
        it('should reject unknown fields in strict mode', () => {
            // Given: Config com campo desconhecido
            // When: validate()
            // Then: valid=false + erro Zod
        });

        it('should reject path traversal attempts', () => {
            // Given: Path com ../../../
            // When: validate()
            // Then: valid=false + erro customizado
        });
    });
});
```

**ConfigSchema.test.ts**:
```typescript
describe('ConfigSchema', () => {
    describe('PathsConfigSchema', () => {
        it('should accept valid paths config', () => {
            const valid = { paths: { agents: '.claude/agents', /* ... */ } };
            expect(() => PathsConfigSchema.parse(valid)).not.toThrow();
        });

        it('should reject missing required fields', () => {
            const invalid = { paths: { agents: '.claude' } };  // Missing outros campos
            expect(() => PathsConfigSchema.parse(invalid)).toThrow(ZodError);
        });
    });
});
```

### 7.2 Testes de Integração

**ConfigManager.integration.test.ts**:
```typescript
describe('ConfigManager + YamlConfigLoader Integration', () => {
    it('should prioritize YAML > JSON > defaults', async () => {
        // Given: YAML, JSON e defaults todos definem paths.agents
        // When: configManager.loadSettings()
        // Then: Retorna valor do YAML
    });

    it('should work with only JSON (no YAML)', async () => {
        // Given: Apenas JSON existe (usuários v1.0)
        // When: configManager.loadSettings()
        // Then: Retorna valores do JSON
    });
});
```

### 7.3 Testes de Performance

**ConfigManager.benchmark.test.ts**:
```typescript
describe('Performance Benchmarks', () => {
    it('should load YAMLs in < 50ms', async () => {
        const start = performance.now();
        await loader.loadAll('.prisma/configuracoes/prisma');
        const duration = performance.now() - start;

        expect(duration).toBeLessThan(50);
    });
});
```

### 7.4 Cobertura Mínima

- **YamlConfigLoader**: 90% (classe crítica)
- **ConfigSchema**: 85% (validação crítica)
- **ConfigManager (modificações)**: 80%
- **Geral**: 80%

---

## 8. Roadmap de Implementação

### Fase 1: Setup & Core (Prioridade: P0)
- [ ] Adicionar dependência `zod` ao package.json
- [ ] Criar `src/services/config/YamlConfigLoader.ts` (skeleton)
- [ ] Criar `src/services/config/ConfigSchema.ts` com 3 schemas
- [ ] Criar `src/types/config.types.ts` com interfaces
- [ ] Criar 3 YAMLs default em `dist/resources/configuracoes/prisma/`

### Fase 2: Implementação (Prioridade: P0)
- [ ] Implementar `YamlConfigLoader.loadAll()`
- [ ] Implementar `YamlConfigLoader.validate()`
- [ ] Implementar `YamlConfigLoader.createDefaults()`
- [ ] Implementar validação de path traversal
- [ ] Adicionar testes unitários (cobertura ≥ 90%)

### Fase 3: Integração (Prioridade: P0)
- [ ] Modificar `ConfigManager.loadSettings()` para usar YamlConfigLoader
- [ ] Implementar deep merge (YAML > JSON > defaults)
- [ ] Adicionar error handling e fallback
- [ ] Adicionar testes de integração

### Fase 4: Refactor AgentManager (Prioridade: P1)
- [ ] Substituir 7 paths hardcoded por `configManager.getPath()`
- [ ] Testar inicialização de agentes com paths customizados
- [ ] Validar retrocompatibilidade

### Fase 5: Qualidade & Docs (Prioridade: P1)
- [ ] Adicionar logging detalhado no OutputChannel
- [ ] Adicionar notificações VSCode para erros de YAML
- [ ] Escrever documentação de customização
- [ ] Criar migration guide para v1.0

### Fase 6: Performance & Security (Prioridade: P2)
- [ ] Adicionar benchmarks de performance
- [ ] Implementar caching de configs
- [ ] Adicionar testes de segurança (path traversal)
- [ ] Validar que startup não aumentou > 100ms

---

## 9. Checklist de Aceitação Técnica

### 9.1 Implementação

- [ ] **TA001**: YamlConfigLoader implementado como Singleton
- [ ] **TA002**: 3 schemas Zod criados (PathsConfig, IntegrationsConfig, QualityConfig)
- [ ] **TA003**: ConfigManager integra com YamlConfigLoader via Adapter Pattern
- [ ] **TA004**: Deep merge implementado com precedência YAML > JSON > defaults
- [ ] **TA005**: AgentManager não possui paths hardcoded (7 instâncias removidas)

### 9.2 Qualidade

- [ ] **TA006**: Cobertura de testes ≥ 80% (geral) e ≥ 90% (YamlConfigLoader)
- [ ] **TA007**: Testes de parse error com fallback passam
- [ ] **TA008**: Testes de path traversal passam (segurança)
- [ ] **TA009**: Testes de retrocompatibilidade passam (JSON sem YAML funciona)
- [ ] **TA010**: Benchmarks de performance passam (< 100ms no startup)

### 9.3 Documentação

- [ ] **TA011**: README atualizado com seção "Customizando Paths"
- [ ] **TA012**: JSDoc completo em YamlConfigLoader
- [ ] **TA013**: Comentários em YAMLs default explicam cada campo
- [ ] **TA014**: Migration guide criado para usuários v1.0

### 9.4 Validação Final

- [ ] **TA015**: Extensão compila sem erros TypeScript
- [ ] **TA016**: Extensão funciona em Windows, macOS e Linux
- [ ] **TA017**: Usuários v1.0 (com JSON) não sofrem breaking changes
- [ ] **TA018**: Novos usuários (sem configs) veem YAMLs criados automaticamente

---

## 10. Referências Técnicas

### 10.1 Bibliotecas

- **js-yaml**: https://github.com/nodeca/js-yaml - YAML 1.2 parser
- **Zod**: https://zod.dev/ - TypeScript-first schema validation
- **lodash.merge**: https://lodash.com/docs/4.17.15#merge - Deep merge utility (opcional)

### 10.2 Documentação

- VSCode Extension API - Workspace: https://code.visualstudio.com/api/references/vscode-api#workspace
- TypeScript Decorators: https://www.typescriptlang.org/docs/handbook/decorators.html (para Singleton)
- OWASP Path Traversal: https://owasp.org/www-community/attacks/Path_Traversal

### 10.3 Código Existente

- `src/utils/configManager.ts` (linhas 46-67, 77-108)
- `src/features/agents/agentManager.ts` (linhas 64, 104, 138, 159, 179, 319, 336)
- `src/constants.ts` (linhas 12-41)

---

## 11. Questões Técnicas em Aberto

| ID | Questão | Resposta Sugerida | Impacto se não Resolver |
|----|---------|-------------------|-------------------------|
| QT1 | Usar lodash.merge ou implementar deep merge customizado? | lodash.merge (testado, confiável) | Médio - bugs de merge |
| QT2 | Implementar hot-reload de YAMLs ou requerer restart? | Restart apenas (v1.0) | Baixo - UX menor |
| QT3 | Validar encoding de YAMLs (UTF-8 vs UTF-16)? | js-yaml detecta automaticamente | Baixo - edge case raro |
| QT4 | Criar migration script para JSON → YAML? | Não (manual ok) | Baixo - poucos usuários |
| QT5 | Suportar variáveis de ambiente em YAMLs (${HOME})? | Não (v1.0), considerar v2.0 | Baixo - workaround manual |

---

**Aprovado por**: _[Pendente]_
**Revisor Técnico**: _[Pendente - recomendado: Senior TypeScript Dev]_
**Data de Aprovação**: _[Pendente]_

---

## 12. Anexo: Exemplo de YAML Completo

**`.prisma/configuracoes/prisma/caminhos.yaml`**:
```yaml
# Configuração de Paths - Prisma for Claude Code
# Paths são relativos ao workspace root
# Documentação: https://github.com/matheusmaiberg/prisma/wiki/yaml-configs

paths:
  # Diretório onde agentes built-in são instalados
  agents: .claude/agents/prisma

  # Diretório de system prompts globais
  prompts: .claude/system-prompts

  # Diretório de slash commands
  commands: .claude/commands/prisma

  # Diretório de templates de especificações
  templates: .claude/templates

  # Diretório de especificações de features
  specs: .prisma/projeto/especificacoes

  # Diretório de steering documents
  steering: .claude/steering

  # Diretório de configurações JSON (legacy)
  settings: .claude/settings
```

**`.prisma/configuracoes/prisma/integracoes.yaml`**:
```yaml
# Configuração de Integrações - Prisma for Claude Code

claude:
  # Modo de invocação: 'cli' (Claude CLI) ou 'extension' (API futura)
  invocationMode: cli

  # Path para executável do Claude CLI
  cliPath: claude

  # Configurações de terminal
  terminal:
    # Delay para aguardar ativação de venv (ms)
    activationDelay: 800
```

**`.prisma/configuracoes/prisma/qualidade.yaml`**:
```yaml
# Configuração de Validação - Prisma for Claude Code

validation:
  # Ativar validação de schemas
  enabled: true

  # Modo estrito: falhas bloqueiam startup (não recomendado)
  strictMode: false

  # Nível de log: error | warn | info | debug
  logLevel: warn

  # Mostrar notificações no VSCode para erros
  showNotifications: true
```
