# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

## [1.0.0] - 2025-11-02

### 🎉 Lançamento Inicial

Lançamento inicial do **Prisma for Claude Code** - Uma poderosa extensão VSCode que traz desenvolvimento orientado a especificações e sincronização de arquivos para Claude Code.

### ✨ Recursos Principais

#### 🔄 Prisma CLI

- **Comando Sync**: Copia todos os arquivos de `.prisma/` para `.claude/` com rastreamento baseado em JSON
- **Comando Cleanup**: Remove todos os arquivos sincronizados com confirmação
- **Exclusões Inteligentes**: Exclui automaticamente `.git`, `node_modules` e `.vscode`
- **Rastreamento de Arquivos**: Operações reversíveis com logging detalhado
- **Logging com emojis**: Feedback visual claro para todas as operações
- **Rastreamento de Tamanho**: Mostra tamanho total dos arquivos sincronizados

#### 📝 Gerenciamento de Specs

- **Criar Specs**: Gera documentos de requisitos, design e tarefas com ajuda do Claude
- **Explorador Visual**: Navegue e gerencie specs na barra lateral
- **Fluxo de Spec**: Requisitos → Design → Tarefas com revisão em cada etapa
- **Suporte a Sub Agentes**: Cria specs usando agentes especializados para processamento paralelo
- **Implementação de Tarefas**: Provedor CodeLens com botão "▶ Implementar Tarefa"
- **Continuidade de Sessão**: Continue a execução de tarefas após interrupção da sessão

#### 🤖 Gerenciamento de Agentes

- **Agentes de Usuário e Projeto**: Visualize e gerencie agentes do Claude Code em ambos os níveis
- **Agentes Integrados**: Agentes de fluxo de spec pré-configurados
  - spec-requirements: Gera requisitos abrangentes
  - spec-design: Cria documentos de design técnico
  - spec-tasks: Divide tarefas de implementação
  - spec-judge: Revisa e avalia specs
  - spec-impl: Implementa código com melhores práticas
  - spec-test: Gera testes abrangentes
  - spec-system-prompt-loader: Carrega contexto para agentes
- **Explorador de Agentes**: Navegue e edite configurações de agentes
- **Execução Paralela**: Execução paralela de agentes configurável pelo usuário (1-128 agentes)
- **Avaliação Baseada em Árvore**: Sistema eficiente de revisão de múltiplos documentos

#### 🎯 Gerenciamento de Steering

- **CLAUDE.md**: Navegue e edite diretrizes globais/específicas do projeto
- **Documentos Gerados**: Documentos de steering de produto, técnico e estrutura
- **Steering Customizado**: Crie orientação específica do projeto
- **Refinamento em Background**: Melhoria de documentos alimentada por Claude

#### 🔌 Integração MCP

- **Servidores MCP**: Visualize servidores MCP globais e do workspace configurados
- **Status de Conexão**: Analisa e exibe status de conexão do servidor
- **Carregamento Assíncrono**: Carregamento rápido com busca paralela de detalhes
- **Exibição de Escopo**: Mostra escopos de servidor com tooltips

#### 🪝 Gerenciamento de Hooks

- **Explorador de Hooks**: Visualize e gerencie hooks do Claude Code
- **Cópia de Comando**: Copie rapidamente comandos de hook para área de transferência

#### ⚙️ Configuração

- **Gerenciamento de Configurações**: Configuração centralizada via `prisma.settings.json`
- **Customização de Visualizações**: Mostrar/ocultar diferentes visualizações do explorador
- **Configuração de Caminhos**: Customize diretórios de specs, steering e configurações
- **Delay de Terminal**: Delay configurável para ativação de venv

### 🔧 Recursos Técnicos

#### 🛡️ Sistema de Permissões

- **Verificação de Permissão**: Verifica permissões do Claude Code antes da execução
- **Configuração Interativa**: Guia de configuração de permissão baseado em webview
- **Modo Bypass**: Suporte para `--permission-mode bypassPermissions`
- **Orientação ao Usuário**: Instruções claras para configuração de permissão

#### 🏗️ Arquitetura

- **Bundling Webpack**: Builds de produção otimizados (redução de 65% no tamanho)
- **TypeScript**: Implementação completa em TypeScript com tipagem estrita
- **Padrão Provider**: TreeDataProviders para todos os exploradores
- **Padrão Manager**: Gerenciamento centralizado para specs, steering, agentes
- **Tratamento de Eventos**: Observadores de sistema de arquivos com debouncing
- **Integração Shell**: Execução de terminal com tratamento adequado de código de saída

#### 🧪 Testes

- **Suite de Testes Abrangente**: Testes unitários e de integração
- **Framework Jest**: Infraestrutura de testes moderna
- **Teste de Snapshot**: Valida geração de prompts
- **100% de Cobertura**: Cobertura completa para recursos críticos

#### 🌍 Suporte a Plataformas

- **macOS**: Totalmente suportado ✅
- **Linux**: Totalmente suportado ✅
- **Windows (WSL)**: Suportado com conversão automática de caminho ✅
- **Conversão de Caminho**: Conversão automática de caminho Windows para WSL

#### 📚 Documentação

- **Documentação Bilíngue**: Documentação completa em inglês e português
- **README.md**: Documentação abrangente em inglês
- **README.pt-BR.md**: Tradução completa em português
- **CHANGELOG.pt-BR.md**: Changelog em português

### 🐛 Correções de Confiabilidade

- Normalização de caminho para diretório de specs customizado em diferentes sistemas operacionais
- Suporte ao botão "Start Task" do CodeLens para arquivos com finais de linha CRLF
- Resolução do erro "Raw mode is not supported" com substituição de comando
- Carregamento de arquivo de recurso na extensão empacotada
- Tratamento adequado de TTY na integração com Claude CLI
- Dependências de runtime corretamente colocadas em dependencies (não devDependencies)

### 🎨 Experiência do Usuário

- **Verificador de Atualização Automática**: Integração da API do GitHub para verificação de versão
- **Sistema de Notificação**: Notificações com auto-descarte e ações claras
- **Observadores de Arquivo**: Atualização automática em mudanças de arquivo
- **Estados de Carregamento**: Feedback visual durante operações assíncronas
- **Sistema de Ícones**: Indicadores visuais claros para diferentes tipos de item
- **Menus de Contexto**: Ações ricas de menu de contexto para todos os itens

### 📦 Instalação e Distribuição

- **VSCode Marketplace**: Disponível no Visual Studio Marketplace
- **OpenVSX Registry**: Disponível para Cursor IDE
- **Empacotamento VSIX**: Suporte a instalação direta
- **GitHub Releases**: Fluxo de release automatizado

---

**Prisma for Claude Code** - Inspirado em [Kiro for Claude Code](https://github.com/notdp/kiro-for-cc)

Construído com ❤️ para a comunidade Claude Code
