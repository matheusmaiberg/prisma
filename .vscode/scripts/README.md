# Scripts Prisma Sync

Scripts para sincronizar os arquivos do Prisma (`.prisma/`) com a estrutura do Prisma for Claude Code (`.claude/`).

## 📋 Arquivos

- **prisma-sync.js** - Copia arquivos de `.prisma/` para `.claude/`
- **prisma-cleanup.js** - Remove arquivos copiados
- **prisma-files.json** - Tracking dos arquivos (gerado automaticamente)

## 🚀 Uso

### Sincronizar arquivos

Copia todos os arquivos de `.prisma/` para `.claude/`:

```bash
npm run prisma:sync
```

Isso irá:
- Copiar todos os arquivos de `.prisma/` → `.claude/`
- Criar diretórios necessários
- Gerar arquivo de tracking em `.vscode/scripts/prisma-files.json`

### Limpar arquivos copiados

Remove todos os arquivos que foram copiados pela sincronização:

```bash
npm run prisma:cleanup
```

Isso irá:
- Ler o arquivo de tracking
- Remover todos os arquivos listados
- Remover diretórios vazios
- Deletar o arquivo de tracking

## 📝 Arquivo de Tracking

O arquivo `prisma-files.json` contém:

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

## ⚙️ Configuração

Os scripts podem ser configurados editando as constantes no início de cada arquivo:

**prisma-sync.js:**
```javascript
const CONFIG = {
    sourceDir: '.prisma',           // Diretório fonte
    targetDir: '.claude',            // Diretório destino
    trackingFile: '.vscode/scripts/prisma-files.json',
    excludeDirs: ['.git', 'node_modules', '.vscode']
};
```

**prisma-cleanup.js:**
```javascript
const CONFIG = {
    trackingFile: '.vscode/scripts/prisma-files.json'
};
```

## 🔒 Segurança

- O cleanup pede confirmação antes de remover arquivos
- Arquivos em `.git`, `node_modules` e `.vscode` são ignorados
- O tracking permite reverter a sincronização completamente

## 💡 Casos de Uso

### Workflow típico

1. **Desenvolver no Prisma** (`.prisma/`)
2. **Sincronizar** com `npm run prisma:sync`
3. **Usar com Prisma** (arquivos em `.claude/`)
4. **Limpar quando necessário** com `npm run prisma:cleanup`

### Atualizar arquivos

Se você modificar arquivos em `.prisma/`:

```bash
npm run prisma:cleanup  # Remove versão antiga
npm run prisma:sync     # Copia nova versão
```

## 🐛 Solução de Problemas

### "Arquivo de tracking não encontrado"

Execute `npm run prisma:sync` primeiro para criar o tracking.

### "Diretório não vazio"

Alguns diretórios em `.claude/` podem ter outros arquivos. O cleanup só remove diretórios completamente vazios.

### Verificar o que foi copiado

```bash
cat .vscode/scripts/prisma-files.json
```

## 📊 Estatísticas

Após a sincronização, você verá:

```
✅ Sincronização concluída!
   Arquivos copiados: 47
   Diretórios criados: 10
   Tamanho total: 541.34 KB
```
