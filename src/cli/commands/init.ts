import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';

export class InitCommand {
    private readonly resourcesPath: string;
    private readonly prismaPath: string;

    constructor() {
        const cwd = process.cwd();
        // Recursos estão dentro do dist após build
        this.resourcesPath = path.join(__dirname, '../../resources');
        this.prismaPath = path.join(cwd, '.prisma');
    }

    async execute(): Promise<void> {
        logger.info('🚀 Inicializando Prisma...\n');

        try {
            // Criar estrutura de diretórios
            this.createDirectoryStructure();

            // Copiar arquivos de recursos
            await this.copyResources();

            logger.success('\n✅ Prisma inicializado com sucesso!');
            logger.info(`📁 Estrutura criada em: ${this.prismaPath}`);
            logger.info('\n📝 Próximos passos:');
            logger.info('  1. Edite os agentes em .prisma/agents/ conforme necessário');
            logger.info('  2. Execute "prisma sync" para sincronizar com .claude/');
        } catch (error: any) {
            logger.error(`Erro ao inicializar: ${error.message}`);
            throw error;
        }
    }

    private createDirectoryStructure(): void {
        logger.info('📁 Criando estrutura de diretórios...');

        const directories = [
            this.prismaPath,
            path.join(this.prismaPath, 'agents'),
            path.join(this.prismaPath, 'especificacoes'),
            path.join(this.prismaPath, 'steering'),
            path.join(this.prismaPath, 'prompts')
        ];

        for (const dir of directories) {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
                logger.info(`  ✓ Criado: ${path.relative(process.cwd(), dir)}`);
            } else {
                logger.warning(`  ⚠ Já existe: ${path.relative(process.cwd(), dir)}`);
            }
        }
    }

    private async copyResources(): Promise<void> {
        logger.info('\n📋 Copiando recursos padrão...');

        // Copiar agentes
        await this.copyAgents();

        // Copiar prompts
        await this.copyPrompts();
    }

    private async copyAgents(): Promise<void> {
        const agentsSourcePath = path.join(this.resourcesPath, 'agents');
        const agentsDestPath = path.join(this.prismaPath, 'agents');

        if (!fs.existsSync(agentsSourcePath)) {
            logger.warning(`  ⚠ Diretório de agentes não encontrado: ${agentsSourcePath}`);
            return;
        }

        const files = fs.readdirSync(agentsSourcePath);
        let copied = 0;

        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            const sourcePath = path.join(agentsSourcePath, file);
            const destPath = path.join(agentsDestPath, file);

            if (fs.existsSync(destPath)) {
                logger.warning(`  ⚠ Já existe: agents/${file}`);
                continue;
            }

            fs.copyFileSync(sourcePath, destPath);
            logger.info(`  ✓ Copiado: agents/${file}`);
            copied++;
        }

        logger.success(`  ✅ ${copied} agente(s) copiado(s)`);
    }

    private async copyPrompts(): Promise<void> {
        const promptsSourcePath = path.join(this.resourcesPath, 'prompts');
        const promptsDestPath = path.join(this.prismaPath, 'prompts');

        if (!fs.existsSync(promptsSourcePath)) {
            logger.warning(`  ⚠ Diretório de prompts não encontrado: ${promptsSourcePath}`);
            return;
        }

        const files = fs.readdirSync(promptsSourcePath);
        let copied = 0;

        for (const file of files) {
            if (!file.endsWith('.md')) continue;

            const sourcePath = path.join(promptsSourcePath, file);
            const destPath = path.join(promptsDestPath, file);

            if (fs.existsSync(destPath)) {
                logger.warning(`  ⚠ Já existe: prompts/${file}`);
                continue;
            }

            fs.copyFileSync(sourcePath, destPath);
            logger.info(`  ✓ Copiado: prompts/${file}`);
            copied++;
        }

        if (copied > 0) {
            logger.success(`  ✅ ${copied} prompt(s) copiado(s)`);
        }
    }
}
