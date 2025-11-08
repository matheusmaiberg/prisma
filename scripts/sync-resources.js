const fs = require('fs').promises;
const path = require('path');
const { existsSync, mkdirSync, readdirSync, statSync } = require('fs');

/**
 * Sync resources from src/resources to workspace folders
 * This script copies Prisma workflow files to .prisma and Claude files to .claude
 */

const workspaceRoot = process.cwd();
const resourcesPath = path.join(workspaceRoot, 'src', 'resources');

// Mapping of resources to target directories
const syncMap = [
    // Prisma workflow files go to .prisma (all resources except agentes and comandos)
    { source: 'configuracoes', target: '.prisma/configuracoes' },
    { source: 'prompts', target: '.prisma/prompts' },
    { source: 'templates', target: '.prisma/templates' },
    { source: 'projeto', target: '.prisma/projeto' },
    { source: 'workflows', target: '.prisma/workflows' },
    { source: 'checkpoints', target: '.prisma/checkpoints' },
    { source: 'CLAUDE.md', target: '.prisma/CLAUDE.md' },

    // Claude-specific files go to .claude (only agentes and comandos)
    { source: 'comandos', target: '.claude/commands/prisma' },  // Commands under prisma namespace
    { source: 'agentes', target: '.claude/agents/prisma' }      // Agents under prisma namespace
];

// Helper to ensure directory exists
async function ensureDir(dirPath) {
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
    }
}

// Helper to copy file
async function copyFile(src, dest) {
    await ensureDir(path.dirname(dest));
    await fs.copyFile(src, dest);
}

// Helper to copy directory recursively
async function copyDir(src, dest) {
    await ensureDir(dest);

    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            await copyDir(srcPath, destPath);
        } else {
            await copyFile(srcPath, destPath);
        }
    }
}

async function syncResources() {
    console.log('📦 Syncing resources from src/resources...');

    try {
        // Ensure source exists
        if (!existsSync(resourcesPath)) {
            console.error('❌ Resources directory not found:', resourcesPath);
            return;
        }

        // Process each mapping
        for (const { source, target } of syncMap) {
            const sourcePath = path.join(resourcesPath, source);
            const targetPath = path.join(workspaceRoot, target);

            if (existsSync(sourcePath)) {
                const stats = statSync(sourcePath);

                if (stats.isDirectory()) {
                    await copyDir(sourcePath, targetPath);
                    console.log(`✅ Synced ${source} → ${target}`);
                } else {
                    await copyFile(sourcePath, targetPath);
                    console.log(`✅ Synced ${source} → ${target}`);
                }
            }
        }

        // Remove /prisma: prefix from command files in .claude/commands/prisma
        const claudeCommandsPath = path.join(workspaceRoot, '.claude', 'commands', 'prisma');
        if (existsSync(claudeCommandsPath)) {
            await processCommandFiles(claudeCommandsPath);
        }

        console.log('✨ Resource sync complete!');

    } catch (error) {
        console.error('❌ Error syncing resources:', error);
        process.exit(1);
    }
}

/**
 * Process command files to remove /prisma: prefix for Claude Code compatibility
 */
async function processCommandFiles(commandsPath) {
    const files = await fs.readdir(commandsPath, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(commandsPath, file.name);

        if (file.isDirectory()) {
            // Recurse into subdirectories
            await processCommandFiles(filePath);
        } else if (file.name.endsWith('.md')) {
            // Process markdown file
            let content = await fs.readFile(filePath, 'utf8');

            // Remove /prisma: prefix from command names
            content = content.replace(/^# Command: \/prisma:/gm, '# Command: /');
            content = content.replace(/^# Comando: \/prisma:/gm, '# Comando: /');

            // Write back if content changed
            await fs.writeFile(filePath, content, 'utf8');
        }
    }
}

// Run sync
syncResources().catch(console.error);