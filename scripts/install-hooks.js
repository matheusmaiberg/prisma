#!/usr/bin/env node

/**
 * Instala hooks do Git para o projeto
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const gitHooksDir = path.join(rootDir, '.git', 'hooks');

// Lista de hooks para instalar
const hooks = [
  {
    name: 'prepare-commit-msg',
    description: 'Auto-update changelog on version changes'
  },
  {
    name: 'commit-msg',
    description: 'Detect conventional commits and update changelog'
  }
];

// Verifica se é um repositório git
if (!fs.existsSync(gitHooksDir)) {
  console.log('ℹ️  Not a git repository, skipping hooks installation');
  process.exit(0);
}

try {
  let installed = 0;

  for (const hook of hooks) {
    const hookSource = path.join(__dirname, hook.name);
    const hookDest = path.join(gitHooksDir, hook.name);

    // Verifica se o arquivo de origem existe
    if (!fs.existsSync(hookSource)) {
      console.warn(`⚠️  Hook source not found: ${hook.name}`);
      continue;
    }

    // Copia o hook
    fs.copyFileSync(hookSource, hookDest);

    // Torna executável (Unix-like sistemas)
    if (process.platform !== 'win32') {
      fs.chmodSync(hookDest, '755');
    }

    console.log(`   ✓ ${hook.name}: ${hook.description}`);
    installed++;
  }

  if (installed > 0) {
    console.log(`\n✅ ${installed} Git hook(s) installed successfully`);
  } else {
    console.log('⚠️  No hooks were installed');
  }
} catch (error) {
  console.error('❌ Failed to install git hooks:', error.message);
  process.exit(1);
}
