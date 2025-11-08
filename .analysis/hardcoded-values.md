# Valores Hardcoded para Corrigir

## Prioridade Alta

### 1. extension.ts
- **Linha 131**: `.claude/especificacoes` → usar `configManager.getPath('specs')`
- **Linhas 170, 468**: `.claude` → usar constant ou config
- **Linha 515**: `~/.claude.json` → usar config

### 2. setupManager.ts
- **Linha 22**: `.prisma` → usar config/constant
- **Linhas 65-121**: Nomes de pastas hardcoded → usar config

### 3. agentManager.ts
- **Linha 72**: `dist/resources/agentes` → usar config
- **Linha 137**: `dist/resources/comandos` → usar config
- **Linha 138**: `.claude/commands` → usar config

### 4. hooksExplorerProvider.ts
- **Linha 159**: `.claude` → usar config
- **Linha 183**: `.claude/settings.json` → usar config

### 5. steeringExplorerProvider.ts
- **Linha 56**: `.claude/CLAUDE.md` → usar config

### 6. steeringManager.ts
- **Linha 208**: `.claude` → usar config

### 7. language.ts
- **Linha 32**: `projeto/especificacoes` → usar config

## Constants a Criar

```typescript
export const PRISMA_DIR = '.prisma';
export const CLAUDE_DIR = '.claude';
export const CLAUDE_CONFIG_FILE = '.claude.json';
export const CLAUDE_SETTINGS_DIR = 'settings';
export const CLAUDE_COMMANDS_DIR = 'commands';
export const CLAUDE_AGENTS_DIR = 'agents';

// Prisma structure
export const PRISMA_PROJETO_DIR = 'projeto';
export const PRISMA_SPECS_DIR = 'especificacoes';
export const PRISMA_COMMANDS_DIR = 'comandos';
export const PRISMA_AGENTS_DIR = 'agentes';
```
