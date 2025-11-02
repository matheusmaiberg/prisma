import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { logger } from '../utils/logger';

interface TrackingData {
    syncedAt: string;
    files: Array<{
        source: string;
        target: string;
        size: number;
    }>;
    directories: string[];
    stats?: {
        totalFiles: number;
        totalDirectories: number;
        totalSize: number;
    };
}

export class CleanupCommand {
    private trackingFile: string;

    constructor() {
        this.trackingFile = '.vscode/scripts/prisma-files.json';
    }

    async execute(): Promise<void> {
        logger.clean('Prisma Cleanup - Removendo arquivos...\n');

        // Carregar tracking
        const tracking = this.loadTracking();

        // Verificar se há algo para limpar
        if (!tracking.files || tracking.files.length === 0) {
            logger.info('Nenhum arquivo para limpar.');
            return;
        }

        // Pedir confirmação
        const confirmed = await this.askConfirmation(tracking);

        if (!confirmed) {
            logger.error('Operação cancelada pelo usuário.');
            return;
        }

        logger.clean('Removendo arquivos...\n');

        // Remover arquivos
        let filesRemoved = 0;
        for (const file of tracking.files) {
            if (this.removeFile(file.target)) {
                filesRemoved++;
            }
        }

        // Remover diretórios vazios
        logger.folder('Removendo diretórios vazios...\n');
        const sortedDirs = [...tracking.directories].sort((a, b) => {
            return b.split(path.sep).length - a.split(path.sep).length;
        });

        let dirsRemoved = 0;
        for (const dir of sortedDirs) {
            if (this.removeEmptyDirectory(dir)) {
                dirsRemoved++;
            }
        }

        // Remover arquivo de tracking
        logger.file('Removendo arquivo de tracking...\n');
        const trackingPath = path.join(process.cwd(), this.trackingFile);
        try {
            fs.unlinkSync(trackingPath);
            logger.check(`Removido: ${this.trackingFile}`);
        } catch (error: any) {
            logger.error(`Erro ao remover tracking: ${error.message}`);
        }

        // Resumo
        logger.success('Limpeza concluída!');
        logger.info(`   Arquivos removidos: ${filesRemoved}/${tracking.files.length}`);
        logger.info(`   Diretórios removidos: ${dirsRemoved}/${tracking.directories.length}`);
    }

    private loadTracking(): TrackingData {
        const trackingPath = path.join(process.cwd(), this.trackingFile);

        if (!fs.existsSync(trackingPath)) {
            logger.error(`Arquivo de tracking não encontrado: ${trackingPath}`);
            logger.info('Execute "prisma sync" primeiro.');
            process.exit(1);
        }

        try {
            const content = fs.readFileSync(trackingPath, 'utf8');
            return JSON.parse(content);
        } catch (error: any) {
            logger.error(`Erro ao ler arquivo de tracking: ${error.message}`);
            process.exit(1);
        }
    }

    private async askConfirmation(tracking: TrackingData): Promise<boolean> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise((resolve) => {
            logger.warning('ATENÇÃO: Esta operação irá remover:');
            logger.info(`   - ${tracking.files.length} arquivo(s)`);
            logger.info(`   - ${tracking.directories.length} diretório(s) vazios`);
            logger.info(`   - Sincronizado em: ${tracking.syncedAt}\n`);

            rl.question('Deseja continuar? (s/N): ', (answer) => {
                rl.close();
                resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim');
            });
        });
    }

    private removeFile(filePath: string): boolean {
        const fullPath = path.join(process.cwd(), filePath);

        if (!fs.existsSync(fullPath)) {
            logger.skip(`Já removido: ${filePath}`);
            return false;
        }

        try {
            fs.unlinkSync(fullPath);
            logger.check(`Removido: ${filePath}`);
            return true;
        } catch (error: any) {
            logger.error(`Erro ao remover ${filePath}: ${error.message}`);
            return false;
        }
    }

    private removeEmptyDirectory(dirPath: string): boolean {
        const fullPath = path.join(process.cwd(), dirPath);

        if (!fs.existsSync(fullPath)) {
            return false;
        }

        try {
            const contents = fs.readdirSync(fullPath);
            if (contents.length === 0) {
                fs.rmdirSync(fullPath);
                logger.check(`Diretório removido: ${dirPath}`);
                return true;
            } else {
                logger.skip(`Diretório não vazio: ${dirPath} (${contents.length} itens)`);
                return false;
            }
        } catch (error: any) {
            logger.error(`Erro ao remover diretório ${dirPath}: ${error.message}`);
            return false;
        }
    }
}
