# Changelog

## [1.0.1] - 2025-11-07

### 🔧 Correções e Melhorias

#### Fixed
- 🐛 Corrigido caminho de especificações para `.prisma/projeto/especificacoes`
- 🐛 Ajustado namespace de comandos para funcionar corretamente no Claude Code

#### Added
- 📦 Script `sync-resources` para sincronização automática de recursos
- 📝 Frontmatter YAML nos comandos (description, model, argument-hint)
- 🔄 Sincronização seletiva: comandos e agentes apenas em `.claude/`

#### Changed
- 📁 Otimizada estrutura de diretórios, removendo duplicações desnecessárias
- 🎯 Comandos agora ficam em `.claude/commands/prisma/` com namespace correto
- ⚡ Build process melhorado com sincronização automática de recursos

## [1.0.0] - 2025-11-02

### 🎉 First Official Release

#### Added

- ✨ 20 agentes customizados Prisma em português (analista, arquiteto, auditor, avaliador-riscos, configurador, conformista, decisor, designer, documentador, elicitador, idealizador, implementador, juiz, meta, planejador, prisma, regulador, revisor, testador, testador-specs)
- 🌍 Sistema i18n completo com suporte a PT/EN
- 🎨 Novos logos Prisma (SVG e PNG)
- 📦 Exportação automática de agentes, prompts, comandos e templates
- 🔍 Sistema de file watchers para sync automático

#### Changed

- 🏷️ Rebranding completo de "Kiro" para "Prisma"
- 👤 Publisher atualizado para matheusmaiberg
- 🔗 Repository atualizado para <https://github.com/matheusmaiberg/prisma>
- 🌐 Tradução de todas as interfaces para português e inglês

#### Fixed

- 🐛 Console.log substituídos por outputChannel
- 🐛 Referências ao nome antigo "Kiro" removidas
- 🐛 URL de ajuda corrigida
- 🐛 Extension ID atualizado nos testes
- 🐛 Comentários em chinês traduzidos para inglês

#### Technical

- ⚙️ Webpack otimizado com CopyPlugin
- 📝 TypeScript strict mode habilitado
- 🎯 VSIX optimizado com .vscodeignore
- 📄 Licença MIT adicionada

---

## [1.0.0] - 2025-11-02 (Previous Initial Release)

Initial release of **Prisma for Claude Code** - A powerful VSCode extension that brings spec-driven development and file synchronization to Claude Code.

### ✨ Core Features

#### 🔄 Prisma CLI

- **Sync Command**: Copy all files from `.prisma/` to `.claude/` with JSON-based tracking
- **Cleanup Command**: Remove all synced files with confirmation prompts
- **Smart Exclusions**: Automatically excludes `.git`, `node_modules`, and `.vscode`
- **File Tracking**: Reversible operations with detailed logging
- **Emoji-based logging**: Clear visual feedback for all operations
- **Size Tracking**: Shows total size of synced files

#### 📝 Spec Management

- **Create Specs**: Generate requirements, design, and task documents with Claude's help
- **Visual Explorer**: Browse and manage specs in the sidebar
- **Spec Workflow**: Requirements → Design → Tasks with review at each step
- **Sub Agent Support**: Create specs using specialized agents for parallel processing
- **Task Implementation**: CodeLens provider with "▶ Implement Task" button
- **Session Continuity**: Continue task execution after session interruption

#### 🤖 Agent Management

- **User & Project Agents**: View and manage Claude Code agents at both levels
- **Built-in Agents**: Pre-configured spec workflow agents
  - spec-requirements: Generate comprehensive requirements
  - spec-design: Create technical design documents
  - spec-tasks: Break down implementation tasks
  - spec-judge: Review and evaluate specs
  - spec-impl: Implement code with best practices
  - spec-test: Generate comprehensive tests
  - spec-system-prompt-loader: Load context for agents
- **Agent Explorer**: Browse and edit agent configurations
- **Parallel Execution**: User-configurable parallel agent execution (1-128 agents)
- **Tree-based Evaluation**: Efficient multi-document review system

#### 🎯 Steering Management

- **CLAUDE.md**: Browse and edit global/project-specific guidelines
- **Generated Docs**: Product, tech, and structure steering documents
- **Custom Steering**: Create project-specific guidance
- **Background Refinement**: Claude-powered document improvement

#### 🔌 MCP Integration

- **MCP Servers**: View configured global and workspace MCP servers
- **Connection Status**: Parse and display server connection status
- **Async Loading**: Fast loading with parallel detail fetching
- **Scope Display**: Show server scopes with tooltips

#### 🪝 Hooks Management

- **Hooks Explorer**: View and manage Claude Code hooks
- **Command Copy**: Quick copy hook commands to clipboard

#### ⚙️ Configuration

- **Settings Management**: Centralized configuration via `prisma.settings.json`
- **View Customization**: Show/hide different explorer views
- **Path Configuration**: Customize specs, steering, and settings directories
- **Terminal Delay**: Configurable delay for venv activation

### 🔧 Technical Features

#### 🛡️ Permission System

- **Permission Verification**: Check Claude Code permissions before execution
- **Interactive Setup**: Webview-based permission configuration guide
- **Bypass Mode**: Support for `--permission-mode bypassPermissions`
- **User Guidance**: Clear instructions for permission setup

#### 🏗️ Architecture

- **Webpack Bundling**: Optimized production builds (65% size reduction)
- **TypeScript**: Full TypeScript implementation with strict typing
- **Provider Pattern**: TreeDataProviders for all explorers
- **Manager Pattern**: Centralized management for specs, steering, agents
- **Event Handling**: File system watchers with debouncing
- **Shell Integration**: Terminal execution with proper exit code handling

#### 🧪 Testing

- **Comprehensive Test Suite**: Unit and integration tests
- **Jest Framework**: Modern testing infrastructure
- **Snapshot Testing**: Validate prompt generation
- **100% Coverage**: Full coverage for critical features

#### 🌍 Platform Support

- **macOS**: Fully supported ✅
- **Linux**: Fully supported ✅
- **Windows (WSL)**: Supported with automatic path conversion ✅
- **Path Conversion**: Automatic Windows to WSL path conversion

#### 📚 Documentation

- **Bilingual Docs**: Full documentation in English and Portuguese
- **README.md**: Comprehensive English documentation
- **README.pt-BR.md**: Complete Portuguese translation
- **CHANGELOG.pt-BR.md**: Portuguese changelog

### 🐛 Reliability Fixes

- Path normalization for custom specs directory across different OS
- CodeLens "Start Task" button support for files with CRLF line endings
- "Raw mode is not supported" error resolution with command substitution
- Resource file loading in packaged extension
- Proper TTY handling in Claude CLI integration
- Runtime dependencies correctly placed in dependencies (not devDependencies)

### 🎨 User Experience

- **Auto Update Checker**: GitHub API integration for version checking
- **Notification System**: Auto-dismiss notifications with clear actions
- **File Watchers**: Automatic refresh on file changes
- **Loading States**: Visual feedback during async operations
- **Icon System**: Clear visual indicators for different item types
- **Context Menus**: Rich context menu actions for all items

### 📦 Installation & Distribution

- **VSCode Marketplace**: Available on Visual Studio Marketplace
- **OpenVSX Registry**: Available for Cursor IDE
- **VSIX Packaging**: Direct installation support
- **GitHub Releases**: Automated release workflow

---

**Prisma for Claude Code** - Inspired by [Kiro for Claude Code](https://github.com/notdp/kiro-for-cc)

Built with ❤️ for the Claude Code community
