# Prisma for Claude Code

<p align="center">
  <img src="icon.png" width="160" height="160" alt="Prisma Logo">
</p>

<p align="center">
  <strong>Gerenciamento profissional de especificações, agentes e configurações para Claude Code</strong>
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=matheusmaiberg.prisma-for-cc"><img src="https://img.shields.io/visual-studio-marketplace/v/matheusmaiberg.prisma-for-cc?color=blue&label=VS%20Code%20Marketplace" alt="Version"></a>
  <a href="https://marketplace.visualstudio.com/items?itemName=matheusmaiberg.prisma-for-cc"><img src="https://img.shields.io/visual-studio-marketplace/i/matheusmaiberg.prisma-for-cc?color=success" alt="Installs"></a>
  <a href="https://github.com/matheusmaiberg/prisma"><img src="https://img.shields.io/github/license/matheusmaiberg/prisma" alt="License"></a>
</p>

---

## 📖 Sobre

**Prisma for Claude Code** é uma extensão VSCode profissional que oferece ferramentas completas para gerenciar especificações, agentes customizados, steering e configurações do Claude Code.

Desenvolvida com foco em produtividade e organização, a extensão inclui 20 agentes especializados em português, sistema de internacionalização completo e interface intuitiva.

### ✨ Features Principais

- 🤖 **20 Agentes Customizados**: Agentes especializados em português para todas as etapas do desenvolvimento
- 🌍 **i18n Completo**: Interface em português e inglês com detecção automática
- 📋 **Gestão de Especificações**: Crie, edite e organize specs com comandos dedicados
- 🎯 **Steering Avançado**: Configure direcionamento personalizado para o Claude
- ⚡ **Sync Automático**: File watchers mantêm tudo sincronizado
- 🎨 **Interface Moderna**: Views dedicadas para cada funcionalidade

---

## 🚀 Instalação

### Via Marketplace (Recomendado)

1. Abra o VSCode
2. Acesse Extensions (Ctrl/Cmd + Shift + X)
3. Busque por "Prisma for Claude Code"
4. Clique em "Install"

### Via VSIX

```bash
code --install-extension prisma-for-cc-1.0.0.vsix
```

---

## 📚 Como Usar

### Agentes Prisma

A extensão inclui 20 agentes especializados que são automaticamente copiados para `.claude/agents/prisma/` ao abrir um workspace:

- **analista**: Cria e refina documentos de requisitos usando formato EARS
- **arquiteto**: Documenta arquitetura técnica automaticamente
- **auditor**: Auditoria profunda de especificações
- **avaliador-riscos**: Análise de riscos técnicos e de negócio
- **configurador**: Inicializa projetos com padrões de alta qualidade
- **conformista**: Verifica conformidade com regras e padrões
- **decisor**: Orquestrador de quality gates
- **designer**: Cria documentos de design técnico
- **documentador**: Gera documentação estruturada
- **elicitador**: Análise de alinhamento automática
- **idealizador**: Facilita brainstorming sistematizado
- **implementador**: Implementa código funcional
- **juiz**: Avalia e seleciona melhor versão entre candidatos
- **meta**: Meta-agente para otimização
- **planejador**: Decompõe design em tarefas
- **prisma**: Orquestrador principal do sistema
- **regulador**: Validação e enforcement de padrões
- **revisor**: Revisão profissional de código
- **testador**: Geração automática de testes
- **testador-specs**: Cria documentos e código de teste

### Comandos Disponíveis

Acesse via Command Palette (Ctrl/Cmd + Shift + P):

#### Especificações

- `Prisma: Create New Spec` - Criar nova especificação
- `Prisma: New Spec with Agents` - Criar spec com agentes
- `Prisma: Delete Spec` - Excluir especificação
- `Prisma: Refresh Specs` - Atualizar lista

#### Steering

- `Prisma: Create Custom Steering` - Criar direcionamento personalizado
- `Prisma: Init Steering` - Inicializar direcionamento
- `Prisma: Refine Steering` - Refinar direcionamento
- `Prisma: Delete Steering` - Excluir direcionamento

#### Agentes

- `Prisma: Refresh Agents` - Atualizar lista de agentes

#### Configurações

- `Prisma: Prisma Settings` - Abrir configurações
- `Prisma: Check for Updates` - Verificar atualizações
- `Prisma: Prisma Help` - Abrir documentação

### Views na Sidebar

A extensão adiciona uma seção "PRISMA" na sidebar com:

- **Especificações**: Visualize e gerencie suas specs
- **Agentes**: Navegue pelos agentes disponíveis
  - User Agents: Agentes globais para todos os projetos
  - Project Agents: Agentes específicos do projeto
- **Direcionamento**: Configure steering rules
- **Hooks**: Gerencie hooks do Claude Code
- **Servidores MCP**: Configure servidores MCP
- **Configurações**: Acesse configurações rápidas

---

## ⚙️ Configuração

### Workspace Settings

```json
{
  "prisma.views.specs.visible": true,
  "prisma.views.agents.visible": true,
  "prisma.views.steering.visible": true,
  "prisma.views.hooks.visible": true,
  "prisma.views.mcpServers.visible": true,
  "prisma.views.settings.visible": false
}
```

### Estrutura de Diretórios

```
.claude/
├── agents/
│   └── prisma/           # 20 agentes customizados
├── especificacoes/       # Specs (PT) ou specs/ (EN)
├── system-prompts/       # Prompts de sistema
├── commands/             # Comandos slash
└── templates/            # Templates
```

---

## 🛠️ Desenvolvimento

### Requisitos

- Node.js 20+
- VSCode 1.84.0+

### Setup

```bash
# Clone o repositório
git clone https://github.com/matheusmaiberg/prisma.git
cd prisma

# Instale dependências
npm install

# Execute em modo dev
npm run watch

# Build produção
npm run package-web

# Gerar VSIX
npm run package
```

### Testes

```bash
# Executar testes
npm test

# Com cobertura
npm run test:coverage
```

---

## 📝 Changelog

Veja [CHANGELOG.md](CHANGELOG.md) para histórico completo de versões.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Minha feature incrível'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja [LICENSE](LICENSE) para detalhes.

---

## 🙏 Créditos

**Prisma for Claude Code** - Inspirado em [Kiro for Claude Code](https://github.com/notdp/kiro-for-cc)

Desenvolvido com ❤️ por [Matheus Maiberg](https://github.com/matheusmaiberg)

---

## 📬 Suporte

- 🐛 [Reportar Bug](https://github.com/matheusmaiberg/prisma/issues)
- 💡 [Solicitar Feature](https://github.com/matheusmaiberg/prisma/issues)
- 📖 [Documentação](https://github.com/matheusmaiberg/prisma#readme)

---

<p align="center">Made with ⚡ by Claude Code</p>
