# Prisma CLI

CLI para gerenciar sincronização de arquivos do Prisma com o Prisma for Claude Code.

## 📦 Instalação

### Como Binário Global

```bash
npm link
```

Isso cria um link simbólico global para o comando `prisma`.

### Como Dependência do Projeto

O CLI já está integrado aos scripts npm do projeto:

```bash
npm run prisma:sync     # Sincronizar arquivos
npm run prisma:cleanup  # Limpar arquivos
```

## 🚀 Uso

### Comando: sync

Copia todos os arquivos de `.prisma/` para `.claude/` e cria um arquivo de tracking.

```bash
# Usando o binário global
prisma sync

# Ou usando npm script
npm run prisma:sync
```

**Saída:**
```
🔄 Prisma Sync - Copiando arquivos...

ℹ️  Origem: C:\...\prisma\.prisma
ℹ️  Destino: C:\...\prisma\.claude

✓ Copiado: .claude\agentes\analista.md
✓ Copiado: .claude\agentes\arquiteto.md
...

📝 Tracking salvo em: .vscode/scripts/prisma-files.json
✅ Sincronização concluída!
ℹ️     Arquivos copiados: 47
ℹ️     Diretórios criados: 10
ℹ️     Tamanho total: 541.34 KB
```

### Comando: cleanup

Remove todos os arquivos que foram copiados pelo comando sync.

```bash
# Usando o binário global
prisma cleanup

# Ou usando npm script
npm run prisma:cleanup
```

**Saída:**
```
🧹 Prisma Cleanup - Removendo arquivos...

⚠️  ATENÇÃO: Esta operação irá remover:
ℹ️     - 47 arquivo(s)
ℹ️     - 10 diretório(s) vazios
ℹ️     - Sincronizado em: 2025-11-02T03:20:35.188Z

Deseja continuar? (s/N): s

🧹 Removendo arquivos...

✓ Removido: .claude\agentes\analista.md
✓ Removido: .claude\agentes\arquiteto.md
...

✅ Limpeza concluída!
ℹ️     Arquivos removidos: 47/47
ℹ️     Diretórios removidos: 10/10
```

### Comando: help

Mostra ajuda e lista de comandos disponíveis.

```bash
prisma help
# ou
prisma --help
# ou
prisma -h
# ou simplesmente
prisma
```

## 📂 Estrutura de Arquivos

```
src/cli/
├── index.ts                 # Ponto de entrada do CLI
├── commands/
│   ├── sync.ts             # Comando de sincronização
│   └── cleanup.ts          # Comando de limpeza
└── utils/
    └── logger.ts           # Utilitário de logs
```

## 🔧 Configuração

O CLI usa a seguinte configuração (hardcoded em `src/cli/commands/sync.ts`):

```typescript
{
    sourceDir: '.prisma',                            // Diretório fonte
    targetDir: '.claude',                            // Diretório destino
    trackingFile: '.vscode/scripts/prisma-files.json', // Arquivo de tracking
    excludeDirs: ['.git', 'node_modules', '.vscode'] // Diretórios ignorados
}
```

## 📝 Arquivo de Tracking

O arquivo `prisma-files.json` é gerado automaticamente e contém:

```json
{
  "syncedAt": "2025-11-02T03:20:35.188Z",
  "files": [
    {
      "source": ".prisma\\agentes\\analista.md",
      "target": ".claude\\agentes\\analista.md",
      "size": 17426
    }
  ],
  "directories": [
    ".claude\\agentes"
  ],
  "stats": {
    "totalFiles": 47,
    "totalDirectories": 10,
    "totalSize": 554398
  }
}
```

## 🛠️ Desenvolvimento

### Compilar

```bash
npm run compile
```

Isso compila o TypeScript para JavaScript em `dist/cli/`.

### Adicionar Novo Comando

1. Criar arquivo em `src/cli/commands/seu-comando.ts`:

```typescript
import { logger } from '../utils/logger';

export class SeuComando {
    async execute(): Promise<void> {
        logger.info('Executando seu comando...');
        // Lógica aqui
    }
}
```

2. Importar e adicionar em `src/cli/index.ts`:

```typescript
import { SeuComando } from './commands/seu-comando';

// No método run():
case 'seu-comando':
    await this.runSeuComando();
    break;

// Adicionar método:
private async runSeuComando(): Promise<void> {
    const cmd = new SeuComando();
    await cmd.execute();
}
```

## 🎨 Logger

O CLI usa um logger customizado com emojis para melhor visualização:

```typescript
logger.info('Mensagem informativa');     // ℹ️
logger.success('Operação bem-sucedida'); // ✅
logger.error('Erro encontrado');         // ❌
logger.warning('Aviso importante');      // ⚠️
logger.step('Passo em progresso');       // 🔄
logger.check('Item verificado');         // ✓
logger.skip('Item ignorado');            // ⊘
logger.clean('Limpeza em progresso');    // 🧹
logger.file('Arquivo relacionado');      // 📝
logger.folder('Pasta relacionada');      // 📁
```

## 🐛 Troubleshooting

### CLI não encontrado

Execute `npm link` para criar o link global.

### Permissão negada

No Windows, certifique-se de executar o terminal como administrador.

### Arquivos não copiados

Verifique se o diretório `.prisma/` existe e contém arquivos.

## 📄 Licença

MIT
