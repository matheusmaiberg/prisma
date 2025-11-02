# Prisma for Claude Code

[![Visual Studio Marketplace](https://img.shields.io/vscode-marketplace/v/heisebaiyun.prisma-for-cc.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=heisebaiyun.prisma-for-cc)
[![Downloads](https://img.shields.io/vscode-marketplace/d/heisebaiyun.prisma-for-cc.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=heisebaiyun.prisma-for-cc)
[![GitHub stars](https://img.shields.io/github/stars/heisebaiyun/prisma.svg?style=flat-square)](https://github.com/heisebaiyun/prisma/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/heisebaiyun/prisma.svg?style=flat-square)](https://github.com/heisebaiyun/prisma/issues)

## 📖 Traduções

| Idioma | Link |
|--------|------|
| English | [README.md](./README.md) |
| Português (Brasil) | [README.pt-BR.md](./README.pt-BR.md) (Atual) |

> [!IMPORTANT]
> **🎉 Novo: Prisma CLI para Sincronização de Arquivos!**
> Inclui uma poderosa ferramenta CLI para sincronizar arquivos de `.prisma/` para o diretório `.claude/`, com rastreamento e recursos de limpeza.

Uma extensão VSCode que traz desenvolvimento orientado a especificações para o Claude Code com sincronização integrada de arquivos. Gerencie suas specs, documentos de steering e configurações do Prisma visualmente enquanto aproveita os poderosos recursos de IA do Claude Code.

## Recursos

### 🔄 Prisma CLI

- **Comando Sync**: Copia todos os arquivos de `.prisma/` para `.claude/` com rastreamento
- **Comando Cleanup**: Remove todos os arquivos sincronizados com confirmação
- **Rastreamento de Arquivos**: Rastreamento baseado em JSON para operações reversíveis
- **Exclusões Inteligentes**: Exclui automaticamente `.git`, `node_modules` e `.vscode`

```bash
# Sincronizar arquivos
npm run prisma:sync

# Limpar arquivos sincronizados
npm run prisma:cleanup

# Ou use a CLI global após npm link
prisma sync
prisma cleanup
```

### 📝 Gerenciamento de SPEC

- **Criar Specs**: Gere documentos de requisitos, design e tarefas com a ajuda do Claude
- **Explorador Visual**: Navegue e gerencie specs na barra lateral
- **Fluxo de Spec**: Requisitos → Design → Tarefas com revisão em cada etapa
- **Suporte a Sub Agentes**: Crie specs usando agentes especializados para processamento paralelo

### 🤖 Gerenciamento de AGENTES

- **Agentes de Usuário e Projeto**: Visualize e gerencie agentes do Claude Code em níveis de usuário e projeto
- **Agentes Integrados**: Agentes de fluxo de spec pré-configurados (requisitos, design, tarefas, judge, etc.)
- **Explorador de Agentes**: Navegue e edite configurações de agentes com destaque de sintaxe

### 🎯 Gerenciamento de STEERING

- **CLAUDE.md**: Navegue e edite diretrizes globais/específicas do projeto
- **Documentos Gerados**: Documentos de steering de produto, técnico e estrutura

### 🔌 Gerenciamento de MCP

- **Servidores MCP**: Visualize servidores MCP globais e de workspace configurados

### 🪝 Gerenciamento de HOOKS

- **Hooks de Agente**: Visualize hooks do Claude Code

### ⚙️ Outros

- **Gerenciamento de Configurações**: Configuração centralizada

## Instalação

### Pré-requisitos

1. **Instalação do Claude Code**: Certifique-se de que o Claude Code está instalado e configurado

2. **Compatibilidade**:

| Plataforma                | Suporte | Notas                                        | Status     |
| ------------------------- | ------- | -------------------------------------------- | ---------- |
| macOS                     | ✅       | Totalmente suportado                         | lançado    |
| Linux                     | ✅       | Totalmente suportado                         | lançado    |
| Windows (WSL)             | ✅       | Suportado com conversão automática de caminho| lançado    |
| Windows (CMD)             | ❌       | Não suportado                                | A definir  |
| Windows (PowerShell)      | ❌       | Não suportado                                | A definir  |
| Windows (MinTTY Git Bash) | ❌       | Não suportado                                | A definir  |

### Do Marketplace de Extensões

**Usuários do VSCode:**

1. Abra o VSCode
2. Vá para Extensões (Cmd+Shift+X)
3. Procure por "Prisma for Claude Code"
4. Clique em Instalar

Ou via linha de comando:

```bash
code --install-extension heisebaiyun.prisma-for-cc
```

**Usuários do Cursor:**
A extensão está disponível no OpenVSX Registry. No Cursor:

1. Vá para Extensões
2. Procure por "Prisma for Claude Code"
3. Clique em Instalar

Ou via linha de comando:

```bash
cursor --install-extension heisebaiyun.prisma-for-cc
```

### Do arquivo VSIX

Baixe o arquivo `.vsix` mais recente dos [GitHub Releases](https://github.com/heisebaiyun/prisma/releases/latest), então:

```bash
# VSCode
code --install-extension prisma-for-cc-{versao-mais-recente}.vsix

# Cursor
cursor --install-extension prisma-for-cc-{versao-mais-recente}.vsix
```

Substitua `{versao-mais-recente}` pelo número real da versão.

## Uso

### Uso do Prisma CLI

A CLI fornece dois comandos principais para sincronização de arquivos:

#### Sincronizar Arquivos

```bash
# Usando scripts npm
npm run prisma:sync

# Ou usando CLI global (após npm link)
prisma sync
```

Isso irá:

1. Copiar todos os arquivos de `.prisma/` para `.claude/`
2. Criar um arquivo de rastreamento em `.vscode/scripts/prisma-files.json`
3. Mostrar progresso detalhado com contagens de arquivos e tamanhos

#### Limpar Arquivos

```bash
# Usando scripts npm
npm run prisma:cleanup

# Ou usando CLI global
prisma cleanup
```

Isso irá:

1. Ler o arquivo de rastreamento
2. Mostrar o que será removido (arquivos, diretórios e data de sincronização)
3. Pedir confirmação
4. Remover todos os arquivos rastreados e diretórios vazios
5. Deletar o arquivo de rastreamento

### Criando uma Spec

**Método Tradicional:**

1. Clique no ícone Prisma na barra de atividades
2. Na visualização SPEC, clique no botão `+`
3. Digite uma descrição do recurso
4. Claude gerará o documento de requisitos
5. Revise e aprove antes de prosseguir para o design
6. Gere tarefas após a conclusão do design

**Com Sub Agentes:**

1. Clique no ícone Prisma na barra de atividades
2. No cabeçalho da visualização SPEC, clique no botão "New Spec with Agents" (✨)
3. Digite uma descrição do recurso
4. Claude delegará automaticamente o trabalho para agentes especializados
5. Revise as saídas conforme os agentes concluem seu trabalho

### Fluxo de Spec

1. **Requisitos**: Defina o que você quer construir
2. **Design**: Crie design técnico após aprovação dos requisitos
3. **Tarefas**: Gere tarefas de implementação após aprovação do design
4. **Implementação**: Execute tarefas uma por uma

### Documentos de Steering

Crie orientação específica do projeto:

- Clique no ícone ✨ para criar steering personalizado
- Gere documentos iniciais (produto, técnico, estrutura)
- Documentos são armazenados em `.claude/steering/`

## Configuração

As configurações são armazenadas em `.claude/settings/prisma.settings.json`:

```json
{
  "paths": {
    "specs": ".claude/specs",
    "steering": ".claude/steering",
    "settings": ".claude/settings"
  },
  "views": {
    "specs": {
      "visible": true
    },
    "steering": {
      "visible": true
    },
    "mcp": {
      "visible": true
    },
    "hooks": {
      "visible": true
    },
    "settings": {
      "visible": false
    }
  }
}
```

## Estrutura do Workspace

A extensão cria a seguinte estrutura no seu workspace:

```plain
.claude/                      # Diretório de dados da extensão
├── specs/                    # Especificações de recursos
│   └── {nome-da-spec}/
│       ├── requirements.md   # O que construir
│       ├── design.md        # Como construir
│       └── tasks.md         # Passos de implementação
├── agents/                  # Agentes do Claude Code
│   └── prisma/              # Agentes integrados (auto-inicializados)
│       ├── spec-requirements.md
│       ├── spec-design.md
│       ├── spec-tasks.md
│       ├── spec-judge.md
│       ├── spec-impl.md
│       ├── spec-test.md
│       └── spec-system-prompt-loader.md
├── steering/                # Documentos de orientação de IA
│   ├── product.md          # Convenções de produto
│   ├── tech.md             # Padrões técnicos
│   └── structure.md        # Organização de código
└── settings/
    └── prisma.settings.json # Configurações da extensão

.prisma/                     # Seus arquivos fonte do Prisma (não modificados)
└── ...                      # Qualquer estrutura que você quiser

.vscode/
└── scripts/
    └── prisma-files.json   # Rastreamento de arquivos para sync/cleanup
```

## Estrutura da Prisma CLI

A CLI está localizada em `src/cli/`:

```plain
src/cli/
├── index.ts                 # Ponto de entrada da CLI
├── commands/
│   ├── sync.ts             # Implementação do comando sync
│   └── cleanup.ts          # Implementação do comando cleanup
└── utils/
    └── logger.ts           # Utilitário de logger com saída emoji
```

### Recursos da CLI

- **Logging baseado em emoji**: Feedback visual claro para todas as operações
- **Exclusões de arquivos**: Pula automaticamente `.git`, `node_modules`, `.vscode`
- **Rastreamento de tamanho**: Mostra tamanho total dos arquivos sincronizados
- **Prompts de confirmação**: Previne deleções acidentais
- **Saída detalhada**: Mostra cada arquivo sendo copiado ou removido

Para mais detalhes da CLI, veja [src/cli/README.md](src/cli/README.md)

## Desenvolvimento

### Pré-requisitos

- Node.js 16+
- VSCode 1.84.0+
- TypeScript 5.3.0+

### Configuração

```bash
# Clone o repositório
git clone https://github.com/heisebaiyun/prisma.git
cd prisma

# Instale as dependências
npm install

# Compile o TypeScript
npm run compile

# Modo watch (auto-compilação nas mudanças)
npm run watch

# Link CLI globalmente para testes
npm link
```

### Executando a Extensão

1. Abra o projeto no VSCode
2. Pressione `F5` para iniciar o Extension Development Host
3. A extensão estará disponível na nova janela do VSCode

### Build

```bash
# Build do pacote VSIX
npm run package

# Saída: prisma-for-cc-{versao-mais-recente}.vsix
```

### Gerenciamento de Changelog

O projeto inclui gerenciamento automatizado de changelog:

```bash
# Atualizar changelog para uma nova versão
npm run changelog:update [versão] [data] [descrição]

# Exemplo
npm run changelog:update 1.1.0 2025-11-03 "Lançamento de novo recurso"

# Instalar hooks do git (auto-instalado com npm install)
npm run hooks:install
```

**Recursos do Hook Git:**
- **Mudanças de Versão**: Detecta automaticamente mudanças de versão no `package.json` e solicita atualização dos changelogs
- **Conventional Commits**: Detecta tipos de commit (`feat:`, `fix:`, `docs:`, etc.) e **adiciona automaticamente** entradas nos changelogs
- **Suporte Bilíngue**: Atualiza automaticamente ambos os changelogs em inglês e português
- **Categorização Inteligente**: Roteia commits para seções apropriadas (Novos Recursos, Correções de Bugs, Documentação, etc.)
- **Auto-staging**: Adiciona automaticamente arquivos de changelog modificados ao staging

**Tipos de Commit Suportados:**
- `feat:` → Novos Recursos
- `fix:` → Correções de Bugs
- `docs:` → Documentação
- `perf:` → Performance
- `refactor:`, `style:`, `build:`, `ci:`, `test:`, `chore:` → Melhorias

### Estrutura do Projeto

```plain
src/
├── extension.ts              # Ponto de entrada da extensão
├── constants.ts              # Constantes de configuração
├── cli/                      # Prisma CLI
│   ├── index.ts             # Ponto de entrada da CLI
│   ├── commands/            # Comandos da CLI
│   └── utils/               # Utilitários da CLI
├── features/                 # Lógica de negócio
│   ├── spec/
│   ├── steering/
│   └── agents/
├── providers/                # VSCode TreeDataProviders
├── prompts/                  # Templates de prompt de IA
├── resources/                # Recursos integrados
└── utils/
```

## Licença

Licença MIT - veja [LICENSE](./LICENSE) para detalhes

---

**Prisma for Claude Code** - Inspirado em [Kiro for Claude Code](https://github.com/notdp/kiro-for-cc)
