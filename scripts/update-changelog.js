#!/usr/bin/env node

/**
 * Script para atualizar CHANGELOG.md e CHANGELOG.pt-BR.md quando a versão muda
 * Uso: node scripts/update-changelog.js [version] [date] [description]
 */

const fs = require('fs');
const path = require('path');

const version = process.argv[2] || process.env.npm_package_version;
const date = process.argv[3] || new Date().toISOString().split('T')[0];
const description = process.argv[4] || '';

if (!version) {
  console.error('❌ Version is required');
  process.exit(1);
}

const rootDir = path.join(__dirname, '..');
const changelogPath = path.join(rootDir, 'CHANGELOG.md');
const changelogPtPath = path.join(rootDir, 'CHANGELOG.pt-BR.md');

function updateChangelog(filePath, lang) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Encontra a linha após "All notable changes..." ou "Todas as mudanças..."
  const insertIndex = lines.findIndex(line =>
    line.includes('will be documented') || line.includes('serão documentadas')
  ) + 2;

  if (insertIndex < 2) {
    console.error(`❌ Could not find insertion point in ${filePath}`);
    return false;
  }

  // Verifica se a versão já existe
  if (content.includes(`## [${version}]`)) {
    console.log(`ℹ️  Version ${version} already exists in ${path.basename(filePath)}`);
    return false;
  }

  const newEntry = lang === 'pt' ? [
    `## [${version}] - ${date}`,
    '',
    '### ✨ Novos Recursos',
    '',
    `- ${description || 'Adicione aqui as novidades...'}`,
    '',
    '### 🐛 Correções de Bugs',
    '',
    '- ',
    '',
    '### 🔧 Melhorias',
    '',
    '- ',
    ''
  ] : [
    `## [${version}] - ${date}`,
    '',
    '### ✨ New Features',
    '',
    `- ${description || 'Add new features here...'}`,
    '',
    '### 🐛 Bug Fixes',
    '',
    '- ',
    '',
    '### 🔧 Improvements',
    '',
    '- ',
    ''
  ];

  // Insere a nova entrada
  lines.splice(insertIndex, 0, ...newEntry);

  // Salva o arquivo
  fs.writeFileSync(filePath, lines.join('\n'));
  console.log(`✅ Updated ${path.basename(filePath)} with version ${version}`);
  return true;
}

// Atualiza ambos os changelogs
let updated = false;
updated = updateChangelog(changelogPath, 'en') || updated;
updated = updateChangelog(changelogPtPath, 'pt') || updated;

if (updated) {
  console.log('');
  console.log('📝 Please edit the changelogs to add your changes:');
  console.log('   - CHANGELOG.md');
  console.log('   - CHANGELOG.pt-BR.md');
  console.log('');
}
