#!/usr/bin/env node

/**
 * Prisma Cleanup Script
 *
 * Remove todos os arquivos que foram copiados pelo prisma-sync.js
 * usando o arquivo de tracking prisma-files.json como referência.
 */

const fs = require('fs');
const path = require('path');

// Configuração
const CONFIG = {
    trackingFile: '.vscode/scripts/prisma-files.json'
};

/**
 * Lê o arquivo de tracking
 */
function loadTracking() {
    const trackingPath = path.join(process.cwd(), CONFIG.trackingFile);

    if (!fs.existsSync(trackingPath)) {
        console.error(`❌ Arquivo de tracking não encontrado: ${trackingPath}`);
        console.log('   Execute "npm run prisma:sync" primeiro.');
        process.exit(1);
    }

    try {
        const content = fs.readFileSync(trackingPath, 'utf8');
        return JSON.parse(content);
    } catch (error) {
        console.error(`❌ Erro ao ler arquivo de tracking:`, error.message);
        process.exit(1);
    }
}

/**
 * Remove um arquivo
 */
function removeFile(filePath) {
    const fullPath = path.join(process.cwd(), filePath);

    if (!fs.existsSync(fullPath)) {
        console.log(`⊘ Já removido: ${filePath}`);
        return false;
    }

    try {
        fs.unlinkSync(fullPath);
        console.log(`✓ Removido: ${filePath}`);
        return true;
    } catch (error) {
        console.error(`✗ Erro ao remover ${filePath}:`, error.message);
        return false;
    }
}

/**
 * Remove um diretório vazio
 */
function removeEmptyDirectory(dirPath) {
    const fullPath = path.join(process.cwd(), dirPath);

    if (!fs.existsSync(fullPath)) {
        return false;
    }

    try {
        // Verificar se está vazio
        const contents = fs.readdirSync(fullPath);
        if (contents.length === 0) {
            fs.rmdirSync(fullPath);
            console.log(`✓ Diretório removido: ${dirPath}`);
            return true;
        } else {
            console.log(`⊘ Diretório não vazio: ${dirPath} (${contents.length} itens)`);
            return false;
        }
    } catch (error) {
        console.error(`✗ Erro ao remover diretório ${dirPath}:`, error.message);
        return false;
    }
}

/**
 * Pergunta ao usuário se deseja continuar
 */
function askConfirmation(tracking) {
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve) => {
        console.log('\n⚠️  ATENÇÃO: Esta operação irá remover:');
        console.log(`   - ${tracking.files.length} arquivo(s)`);
        console.log(`   - ${tracking.directories.length} diretório(s) vazios`);
        console.log(`   - Sincronizado em: ${tracking.syncedAt}\n`);

        readline.question('Deseja continuar? (s/N): ', (answer) => {
            readline.close();
            resolve(answer.toLowerCase() === 's' || answer.toLowerCase() === 'sim');
        });
    });
}

/**
 * Função principal
 */
async function main() {
    console.log('🧹 Prisma Cleanup - Removendo arquivos...\n');

    // Carregar tracking
    const tracking = loadTracking();

    // Verificar se há algo para limpar
    if (!tracking.files || tracking.files.length === 0) {
        console.log('ℹ️  Nenhum arquivo para limpar.');
        return;
    }

    // Pedir confirmação
    const confirmed = await askConfirmation(tracking);

    if (!confirmed) {
        console.log('\n❌ Operação cancelada pelo usuário.');
        return;
    }

    console.log('\n🗑️  Removendo arquivos...\n');

    // Remover arquivos
    let filesRemoved = 0;
    for (const file of tracking.files) {
        if (removeFile(file.target)) {
            filesRemoved++;
        }
    }

    // Remover diretórios vazios (ordem reversa para remover dos mais profundos)
    console.log('\n📁 Removendo diretórios vazios...\n');
    const sortedDirs = [...tracking.directories].sort((a, b) => {
        // Ordenar por profundidade (mais profundo primeiro)
        return b.split(path.sep).length - a.split(path.sep).length;
    });

    let dirsRemoved = 0;
    for (const dir of sortedDirs) {
        if (removeEmptyDirectory(dir)) {
            dirsRemoved++;
        }
    }

    // Remover arquivo de tracking
    console.log('\n📝 Removendo arquivo de tracking...\n');
    const trackingPath = path.join(process.cwd(), CONFIG.trackingFile);
    try {
        fs.unlinkSync(trackingPath);
        console.log(`✓ Removido: ${CONFIG.trackingFile}`);
    } catch (error) {
        console.error(`✗ Erro ao remover tracking:`, error.message);
    }

    // Resumo
    console.log('\n✅ Limpeza concluída!');
    console.log(`   Arquivos removidos: ${filesRemoved}/${tracking.files.length}`);
    console.log(`   Diretórios removidos: ${dirsRemoved}/${tracking.directories.length}`);
}

// Executar
main().catch(error => {
    console.error('❌ Erro fatal:', error);
    process.exit(1);
});
