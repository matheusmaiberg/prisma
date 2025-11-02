#!/usr/bin/env node

import { InitCommand } from './commands/init';
import { SyncCommand } from './commands/sync';
import { CleanupCommand } from './commands/cleanup';
import { logger } from './utils/logger';

const COMMANDS = {
    init: 'Inicializar estrutura do Prisma (.prisma/)',
    sync: 'Sincronizar arquivos do Prisma (.prisma/ → .claude/)',
    cleanup: 'Limpar arquivos sincronizados',
    help: 'Mostrar ajuda'
};

class PrismaCLI {
    async run(args: string[]): Promise<void> {
        const command = args[2];

        if (!command || command === 'help' || command === '--help' || command === '-h') {
            this.showHelp();
            return;
        }

        switch (command) {
            case 'init':
                await this.runInit();
                break;

            case 'sync':
                await this.runSync();
                break;

            case 'cleanup':
                await this.runCleanup();
                break;

            default:
                logger.error(`Comando desconhecido: ${command}`);
                this.showHelp();
                process.exit(1);
        }
    }

    private async runInit(): Promise<void> {
        try {
            const initCommand = new InitCommand();
            await initCommand.execute();
        } catch (error: any) {
            logger.error(`Erro ao executar init: ${error.message}`);
            process.exit(1);
        }
    }

    private async runSync(): Promise<void> {
        try {
            const syncCommand = new SyncCommand();
            await syncCommand.execute();
        } catch (error: any) {
            logger.error(`Erro ao executar sync: ${error.message}`);
            process.exit(1);
        }
    }

    private async runCleanup(): Promise<void> {
        try {
            const cleanupCommand = new CleanupCommand();
            await cleanupCommand.execute();
        } catch (error: any) {
            logger.error(`Erro ao executar cleanup: ${error.message}`);
            process.exit(1);
        }
    }

    private showHelp(): void {
        console.log(`
╔═══════════════════════════════════════════════╗
║         Prisma CLI - Claude Code Tools        ║
╚═══════════════════════════════════════════════╝

Uso: prisma <comando>

Comandos disponíveis:
`);

        for (const [cmd, description] of Object.entries(COMMANDS)) {
            console.log(`  ${cmd.padEnd(12)} ${description}`);
        }

        console.log(`
Exemplos:
  $ prisma init        # Inicializar estrutura do Prisma
  $ prisma sync        # Sincronizar arquivos
  $ prisma cleanup     # Limpar arquivos sincronizados
  $ prisma help        # Mostrar esta ajuda

Mais informações:
  https://github.com/matheusmaiberg/prisma
`);
    }
}

// Executar CLI
const cli = new PrismaCLI();
cli.run(process.argv).catch(error => {
    logger.error(`Erro fatal: ${error.message}`);
    process.exit(1);
});
