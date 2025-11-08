import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { PRISMA_DIR, CLAUDE_MD_FILE } from '../../constants';

/**
 * SetupManager handles automatic initialization of Prisma workspace structure
 */
export class SetupManager {
    private workspaceRoot: string;
    private prismaDir: string;
    private resourcesPath: string;

    constructor(
        private outputChannel: vscode.OutputChannel
    ) {
        const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
        if (!workspaceFolder) {
            throw new Error('No workspace folder found');
        }

        this.workspaceRoot = workspaceFolder.uri.fsPath;
        this.prismaDir = path.join(this.workspaceRoot, PRISMA_DIR);
        this.resourcesPath = path.join(__dirname, '..', '..', 'resources');
    }

    /**
     * Initialize the .prisma workspace structure
     */
    async initialize(): Promise<void> {
        this.outputChannel.appendLine('[Setup] Initializing Prisma workspace structure...');

        try {
            // Create base .prisma directory
            await this.ensureDir(this.prismaDir);

            // Create main directories
            await this.createMainDirectories();

            // Copy resources from src/resources to .prisma
            await this.syncResources();

            // Create README files
            await this.createReadmeFiles();

            // Create .gitkeep for empty directories
            await this.createGitkeep();

            this.outputChannel.appendLine('[Setup] ✅ Prisma workspace structure initialized successfully');

            vscode.window.showInformationMessage('Prisma workspace initialized successfully!');

        } catch (error) {
            this.outputChannel.appendLine(`[Setup] ❌ Error initializing workspace: ${error}`);
            vscode.window.showErrorMessage(`Failed to initialize Prisma workspace: ${error}`);
            throw error;
        }
    }

    /**
     * Create main directory structure
     */
    private async createMainDirectories(): Promise<void> {
        const mainDirs = [
            'checkpoints',
            'comandos',
            'configuracoes',
            'melhorias',
            'projeto',
            'prompts',
            'relatorios',
            'templates',
            'workflows'
        ];

        for (const dir of mainDirs) {
            await this.ensureDir(path.join(this.prismaDir, dir));
        }

        // Create subdirectories
        const subDirs = [
            // projeto subdirectories
            'projeto/analises',
            'projeto/aprendizado',
            'projeto/arquitetura',
            'projeto/auditoria',
            'projeto/checklists',
            'projeto/decisoes',
            'projeto/diretrizes',
            'projeto/especificacoes',
            'projeto/historico',
            'projeto/implementacao',
            'projeto/mapa',
            'projeto/outros',
            'projeto/padroes',
            'projeto/relatorios',
            'projeto/revisoes',
            'projeto/sumarios',

            // relatorios subdirectories
            'relatorios/agent-reports',
            'relatorios/auditoria',
            'relatorios/correcoes',
            'relatorios/execucao',
            'relatorios/hydration',
            'relatorios/outros',
            'relatorios/revisao',
            'relatorios/revisao-codigo',
            'relatorios/seguranca',
            'relatorios/sumarios',

            // melhorias subdirectories
            'melhorias/agentes',
            'melhorias/prompts',

            // comandos subdirectories
            'comandos/analisar',
            'comandos/especificacao',
            'comandos/implementacao',
            'comandos/organizar',
            'comandos/tarefa',
            'comandos/testes'
        ];

        for (const dir of subDirs) {
            await this.ensureDir(path.join(this.prismaDir, dir));
        }

        // Create spec template structure
        const templateDir = path.join(this.prismaDir, 'projeto', 'especificacoes', '_template');
        await this.ensureDir(templateDir);
        await this.ensureDir(path.join(templateDir, 'artifacts'));
        await this.ensureDir(path.join(templateDir, 'decisions'));
        await this.ensureDir(path.join(templateDir, 'reports'));

        this.outputChannel.appendLine('[Setup] ✅ Directory structure created');
    }

    /**
     * Sync resources from src/resources to .prisma
     */
    private async syncResources(): Promise<void> {
        const resourceMap = [
            { source: 'configuracoes', target: 'configuracoes' },
            { source: 'prompts', target: 'prompts' },
            { source: 'templates', target: 'templates' },
            { source: 'projeto', target: 'projeto' },
            { source: 'workflows', target: 'workflows' },
            { source: 'checkpoints', target: 'checkpoints' },
            { source: CLAUDE_MD_FILE, target: CLAUDE_MD_FILE }
        ];

        for (const { source, target } of resourceMap) {
            const sourcePath = path.join(this.resourcesPath, source);
            const targetPath = path.join(this.prismaDir, target);

            if (fs.existsSync(sourcePath)) {
                const stats = fs.statSync(sourcePath);

                if (stats.isDirectory()) {
                    await this.copyDirectory(sourcePath, targetPath);
                    this.outputChannel.appendLine(`[Setup] ✅ Synced ${source} → .prisma/${target}`);
                } else {
                    await this.copyFile(sourcePath, targetPath);
                    this.outputChannel.appendLine(`[Setup] ✅ Synced ${source} → .prisma/${target}`);
                }
            }
        }
    }

    /**
     * Create README files
     */
    private async createReadmeFiles(): Promise<void> {
        // Main projeto README
        const projetoReadme = path.join(this.prismaDir, 'projeto', 'README.md');
        if (!fs.existsSync(projetoReadme)) {
            const content = `# Prisma - Documentação do Projeto

Esta pasta contém toda a documentação centralizada do projeto.

## Estrutura

- **analises/**: Análises de código, arquitetura, performance
- **aprendizado/**: Lições aprendidas, retrospectivas
- **arquitetura/**: Padrões arquiteturais, decisões técnicas
- **auditoria/**: Auditorias de qualidade, segurança, compliance
- **checklists/**: Checklists de validação e processo
- **decisoes/**: ADRs (Architecture Decision Records)
- **diretrizes/**: Guidelines de desenvolvimento
- **especificacoes/**: Especificações de features (requirements, design, tasks)
- **historico/**: Histórico de mudanças importantes
- **implementacao/**: Guias de implementação
- **mapa/**: Mapas do sistema (dependency graphs, visual maps)
- **outros/**: Documentação que não se encaixa em categorias acima
- **padroes/**: Padrões de código, testes, documentação
- **relatorios/**: Relatórios permanentes de projeto
- **revisoes/**: Revisões de código, arquitetura, processo
- **sumarios/**: Sumários executivos de projetos e fases

## Especificações vs Relatórios

- **projeto/especificacoes/**: Documentos PERMANENTES de features (versionados)
- **projeto/relatorios/**: Relatórios de ANÁLISE permanentes
- **.prisma/relatorios/**: Relatórios de EXECUÇÃO temporários (podem ser limpos)

## Como Navegar

1. **Para entender o projeto**: Comece por \`arquitetura/\`
2. **Para criar nova feature**: Use \`especificacoes/_template/\`
3. **Para decisões arquiteturais**: Consulte \`decisoes/\`
4. **Para padrões de código**: Consulte \`padroes/\`
`;
            fs.writeFileSync(projetoReadme, content);
        }

        // Especificações README
        const especReadme = path.join(this.prismaDir, 'projeto', 'especificacoes', 'README.md');
        if (!fs.existsSync(especReadme)) {
            const content = `# Especificações de Features

Esta pasta contém todas as especificações de features do projeto.

## Estrutura de uma Especificação

Cada feature tem sua própria pasta com estrutura padronizada:

\`\`\`
{feature-name}/
├── requirements.md    # Requisitos (analista)
├── design.md          # Design técnico (designer)
├── tasks.md           # Tarefas (planejador)
├── artifacts/         # Artefatos de implementação
├── decisions/         # Decisões durante desenvolvimento
└── reports/           # Relatórios de QA, riscos, compliance
\`\`\`

## Workflow Prisma

1. **analista** → Cria \`requirements.md\`
2. **designer** → Cria \`design.md\`
3. **planejador** → Cria \`tasks.md\`
4. **implementador** → Executa tasks
5. **testador-specs** → Valida com testes
6. **revisor** → Revisa código
7. **conformista** → Valida compliance
8. **documentador** → Documenta em \`/docs\`

## Criar Nova Especificação

Use o comando da extensão VSCode:
- \`Prisma: Create New Spec\` para criação manual
- \`Prisma: New Spec with Agents\` para criação com workflow completo

## Convenções

- **Naming**: kebab-case (\`payment-api\`, \`user-profile\`)
- **Status**: Draft → In Progress → Complete
- **Approval**: Cada fase requer aprovação do usuário

## Ver Também

- Template: \`_template/\`
- Workflow completo: \`.prisma/prompts/prisma-prompt.md\`
`;
            fs.writeFileSync(especReadme, content);
        }

        // Template README
        const templateReadme = path.join(this.prismaDir, 'projeto', 'especificacoes', '_template', 'README.md');
        if (!fs.existsSync(templateReadme)) {
            const content = `# Template de Especificação

Esta pasta contém a estrutura padrão para uma nova especificação Prisma.

## Estrutura Padrão

\`\`\`
{feature-name}/
├── requirements.md    # Requisitos da feature (analista)
├── design.md          # Design técnico (designer)
├── tasks.md           # Tarefas de implementação (planejador)
├── artifacts/         # Artefatos de implementação
├── decisions/         # Decisões tomadas durante desenvolvimento
└── reports/           # Relatórios de QA, riscos, compliance
\`\`\`

## Como Usar

Use os comandos da extensão VSCode para criar novas specs automaticamente.

## Arquivos Principais

### requirements.md
- Criado por: **analista**
- Formato: EARS (Easy Approach to Requirements Syntax)
- Aprovação obrigatória antes de prosseguir

### design.md
- Criado por: **designer**
- Contém: Arquitetura, componentes, diagramas Mermaid
- Aprovação obrigatória antes de prosseguir

### tasks.md
- Criado por: **planejador**
- Contém: Lista de tarefas com dependências
- Formato: Headers (## Task N:) com subtarefas em checkbox

## Subpastas

### artifacts/
Artefatos criados durante implementação:
- Protótipos
- Dumps de configuração
- Dados de teste
- Screenshots

### decisions/
Decisões arquiteturais e técnicas:
- Trade-offs considerados
- Alternativas avaliadas
- Justificativas de escolhas

### reports/
Relatórios de validação:
- QA reports (testador-specs)
- Risk assessment (avaliador-riscos)
- Compliance checks (conformista)
- Code reviews (revisor)

---

**Nota**: Esta estrutura é criada automaticamente ao iniciar nova especificação.
`;
            fs.writeFileSync(templateReadme, content);
        }

        this.outputChannel.appendLine('[Setup] ✅ README files created');
    }

    /**
     * Create .gitkeep files in empty directories
     */
    private async createGitkeep(): Promise<void> {
        const createGitkeepRecursive = (dir: string) => {
            if (!fs.existsSync(dir)) {
                return;
            }

            const entries = fs.readdirSync(dir, { withFileTypes: true });

            // If directory is empty or has only subdirectories, create .gitkeep
            const hasFiles = entries.some(entry => entry.isFile());
            if (!hasFiles) {
                const gitkeepPath = path.join(dir, '.gitkeep');
                if (!fs.existsSync(gitkeepPath)) {
                    fs.writeFileSync(gitkeepPath, '');
                }
            }

            // Recurse into subdirectories
            for (const entry of entries) {
                if (entry.isDirectory()) {
                    createGitkeepRecursive(path.join(dir, entry.name));
                }
            }
        };

        createGitkeepRecursive(this.prismaDir);
        this.outputChannel.appendLine('[Setup] ✅ .gitkeep files created');
    }

    /**
     * Helper to ensure directory exists
     */
    private async ensureDir(dirPath: string): Promise<void> {
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    }

    /**
     * Helper to copy file
     */
    private async copyFile(src: string, dest: string): Promise<void> {
        await this.ensureDir(path.dirname(dest));
        fs.copyFileSync(src, dest);
    }

    /**
     * Helper to copy directory recursively
     */
    private async copyDirectory(src: string, dest: string): Promise<void> {
        await this.ensureDir(dest);

        const entries = fs.readdirSync(src, { withFileTypes: true });

        for (const entry of entries) {
            const srcPath = path.join(src, entry.name);
            const destPath = path.join(dest, entry.name);

            if (entry.isDirectory()) {
                await this.copyDirectory(srcPath, destPath);
            } else {
                await this.copyFile(srcPath, destPath);
            }
        }
    }

    /**
     * Check if Prisma workspace is initialized
     */
    isInitialized(): boolean {
        return fs.existsSync(this.prismaDir);
    }
}
