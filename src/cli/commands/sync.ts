import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../utils/logger';

interface SyncConfig {
    sourceDir: string;
    targetDir: string;
    trackingFile: string;
    excludeDirs: string[];
}

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

export class SyncCommand {
    private config: SyncConfig;
    private tracking: TrackingData;

    constructor() {
        this.config = {
            sourceDir: '.prisma',
            targetDir: '.claude',
            trackingFile: '.vscode/scripts/prisma-files.json',
            excludeDirs: ['.git', 'node_modules', '.vscode']
        };

        this.tracking = {
            syncedAt: new Date().toISOString(),
            files: [],
            directories: []
        };
    }

    async execute(): Promise<void> {
        logger.step('Prisma Sync - Copiando arquivos...\n');

        const sourceDir = path.join(process.cwd(), this.config.sourceDir);
        const targetDir = path.join(process.cwd(), this.config.targetDir);

        logger.info(`Origem: ${sourceDir}`);
        logger.info(`Destino: ${targetDir}\n`);

        // Copiar arquivos
        this.copyDirectory(sourceDir, targetDir);

        // Salvar tracking
        this.saveTracking();

        // Resumo
        logger.success('Sincronização concluída!');
        logger.info(`   Arquivos copiados: ${this.tracking.files.length}`);
        logger.info(`   Diretórios criados: ${this.tracking.directories.length}`);
        logger.info(`   Tamanho total: ${(this.tracking.stats!.totalSize / 1024).toFixed(2)} KB`);
    }

    private shouldExclude(dirName: string): boolean {
        return this.config.excludeDirs.includes(dirName);
    }

    private copyFile(sourcePath: string, targetPath: string): void {
        try {
            // Criar diretório de destino se não existir
            const targetDir = path.dirname(targetPath);
            if (!fs.existsSync(targetDir)) {
                fs.mkdirSync(targetDir, { recursive: true });

                // Registrar diretório criado
                const relativeDir = path.relative(process.cwd(), targetDir);
                if (!this.tracking.directories.includes(relativeDir)) {
                    this.tracking.directories.push(relativeDir);
                }
            }

            // Copiar arquivo
            fs.copyFileSync(sourcePath, targetPath);

            // Registrar arquivo copiado
            const relativeTarget = path.relative(process.cwd(), targetPath);
            this.tracking.files.push({
                source: path.relative(process.cwd(), sourcePath),
                target: relativeTarget,
                size: fs.statSync(targetPath).size
            });

            logger.check(`Copiado: ${relativeTarget}`);
        } catch (error: any) {
            logger.error(`Erro ao copiar ${sourcePath}: ${error.message}`);
        }
    }

    private copyDirectory(sourceDir: string, targetDir: string): void {
        if (!fs.existsSync(sourceDir)) {
            logger.error(`Diretório fonte não encontrado: ${sourceDir}`);
            return;
        }

        const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

        for (const entry of entries) {
            const sourcePath = path.join(sourceDir, entry.name);
            const targetPath = path.join(targetDir, entry.name);

            if (entry.isDirectory()) {
                // Verificar se deve excluir
                if (this.shouldExclude(entry.name)) {
                    logger.skip(`Ignorado: ${entry.name}/`);
                    continue;
                }

                // Copiar subdiretório recursivamente
                this.copyDirectory(sourcePath, targetPath);
            } else if (entry.isFile()) {
                // Copiar arquivo
                this.copyFile(sourcePath, targetPath);
            }
        }
    }

    private saveTracking(): void {
        const trackingPath = this.config.trackingFile;
        const trackingDir = path.dirname(trackingPath);

        // Criar diretório se não existir
        if (!fs.existsSync(trackingDir)) {
            fs.mkdirSync(trackingDir, { recursive: true });
        }

        // Adicionar estatísticas
        this.tracking.stats = {
            totalFiles: this.tracking.files.length,
            totalDirectories: this.tracking.directories.length,
            totalSize: this.tracking.files.reduce((sum, f) => sum + f.size, 0)
        };

        // Salvar JSON
        fs.writeFileSync(
            trackingPath,
            JSON.stringify(this.tracking, null, 2),
            'utf8'
        );

        logger.file(`Tracking salvo em: ${trackingPath}`);
    }
}
