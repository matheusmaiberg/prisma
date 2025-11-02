#!/usr/bin/env node

/**
 * Prisma Sync Script
 *
 * Copia arquivos da pasta .prisma/ para a estrutura .claude/
 * e mantém um registro dos arquivos copiados para possível limpeza futura.
 */

const fs = require('fs');
const path = require('path');

// Configuração
const CONFIG = {
    sourceDir: '.prisma',
    targetDir: '.claude',
    trackingFile: '.vscode/scripts/prisma-files.json',
    excludeDirs: ['.git', 'node_modules', '.vscode']
};

// Estado do tracking
const tracking = {
    syncedAt: new Date().toISOString(),
    files: [],
    directories: []
};

/**
 * Verifica se um diretório deve ser excluído
 */
function shouldExclude(dirName) {
    return CONFIG.excludeDirs.includes(dirName);
}

/**
 * Copia um arquivo e registra no tracking
 */
function copyFile(sourcePath, targetPath) {
    try {
        // Criar diretório de destino se não existir
        const targetDir = path.dirname(targetPath);
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });

            // Registrar diretório criado
            const relativeDir = path.relative(process.cwd(), targetDir);
            if (!tracking.directories.includes(relativeDir)) {
                tracking.directories.push(relativeDir);
            }
        }

        // Copiar arquivo
        fs.copyFileSync(sourcePath, targetPath);

        // Registrar arquivo copiado
        const relativeTarget = path.relative(process.cwd(), targetPath);
        tracking.files.push({
            source: path.relative(process.cwd(), sourcePath),
            target: relativeTarget,
            size: fs.statSync(targetPath).size
        });

        console.log(`✓ Copiado: ${relativeTarget}`);
    } catch (error) {
        console.error(`✗ Erro ao copiar ${sourcePath}:`, error.message);
    }
}

/**
 * Copia diretório recursivamente
 */
function copyDirectory(sourceDir, targetDir) {
    if (!fs.existsSync(sourceDir)) {
        console.error(`Diretório fonte não encontrado: ${sourceDir}`);
        return;
    }

    const entries = fs.readdirSync(sourceDir, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(sourceDir, entry.name);
        const targetPath = path.join(targetDir, entry.name);

        if (entry.isDirectory()) {
            // Verificar se deve excluir
            if (shouldExclude(entry.name)) {
                console.log(`⊘ Ignorado: ${entry.name}/`);
                continue;
            }

            // Copiar subdiretório recursivamente
            copyDirectory(sourcePath, targetPath);
        } else if (entry.isFile()) {
            // Copiar arquivo
            copyFile(sourcePath, targetPath);
        }
    }
}

/**
 * Salva o arquivo de tracking
 */
function saveTracking() {
    const trackingPath = CONFIG.trackingFile;
    const trackingDir = path.dirname(trackingPath);

    // Criar diretório se não existir
    if (!fs.existsSync(trackingDir)) {
        fs.mkdirSync(trackingDir, { recursive: true });
    }

    // Adicionar estatísticas
    tracking.stats = {
        totalFiles: tracking.files.length,
        totalDirectories: tracking.directories.length,
        totalSize: tracking.files.reduce((sum, f) => sum + f.size, 0)
    };

    // Salvar JSON
    fs.writeFileSync(
        trackingPath,
        JSON.stringify(tracking, null, 2),
        'utf8'
    );

    console.log(`\n📝 Tracking salvo em: ${trackingPath}`);
}

/**
 * Função principal
 */
function main() {
    console.log('🔄 Prisma Sync - Copiando arquivos...\n');

    const sourceDir = path.join(process.cwd(), CONFIG.sourceDir);
    const targetDir = path.join(process.cwd(), CONFIG.targetDir);

    console.log(`Origem: ${sourceDir}`);
    console.log(`Destino: ${targetDir}\n`);

    // Copiar arquivos
    copyDirectory(sourceDir, targetDir);

    // Salvar tracking
    saveTracking();

    // Resumo
    console.log('\n✅ Sincronização concluída!');
    console.log(`   Arquivos copiados: ${tracking.files.length}`);
    console.log(`   Diretórios criados: ${tracking.directories.length}`);
    console.log(`   Tamanho total: ${(tracking.stats.totalSize / 1024).toFixed(2)} KB`);
}

// Executar
try {
    main();
} catch (error) {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
}
