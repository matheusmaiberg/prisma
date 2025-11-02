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

### Configuração YAML (Recomendado)

A partir da v1.0.0, Prisma suporta configuração via arquivos YAML modulares em `.prisma/configuracoes/prisma/`:

#### Arquivos de Configuração

**caminhos.yaml** - Paths relativos ao workspace root
```yaml
paths:
  agents: .claude/agents/prisma
  prompts: .claude/system-prompts
  commands: .claude/commands/prisma
  templates: .claude/templates
  specs: .prisma/projeto/especificacoes
  steering: .claude/steering
  settings: .claude/settings
```

**integracoes.yaml** - Configurações de integração com Claude
```yaml
claude:
  invocationMode: cli  # cli | extension
  cliPath: claude
  terminal:
    activationDelay: 800  # ms
```

**qualidade.yaml** - Configurações de validação
```yaml
validation:
  enabled: true
  strictMode: false
  logLevel: warn  # error | warn | info | debug
  showNotifications: true
```

#### Precedência de Configuração

1. **YAML** (`.prisma/configuracoes/prisma/*.yaml`) - Prioridade máxima
2. **JSON** (`.claude/settings/prisma.settings.json`) - Fallback
3. **Defaults** - Valores padrão internos

#### Segurança (ADR-001)

Todos os paths são validados contra:
- ✅ Path traversal (`../../../etc/passwd`)
- ✅ Paths absolutos (`/etc/passwd`, `C:\Windows\System32`)
- ✅ Resolução fora do workspace

Paths inválidos são automaticamente substituídos por defaults seguros.

### Migrando de JSON para YAML (v1.0 → v1.1+)

Se você já usa Prisma v1.0 com configuração JSON (`.claude/settings/prisma.settings.json`), pode migrar gradualmente para YAML:

#### Migração Automática (Recomendado)

O Prisma detecta automaticamente configurações YAML e usa-as com prioridade sobre JSON:

1. Crie `.prisma/configuracoes/prisma/` na raiz do workspace
2. Copie os arquivos YAML default da extensão (aparecerão automaticamente na primeira execução)
3. Edite os YAMLs conforme necessário
4. Mantenha o JSON como backup (fallback automático)

#### Migração Manual

**De JSON:**
```json
{
  "paths": {
    "specs": ".prisma/projeto/especificacoes",
    "steering": ".claude/steering",
    "settings": ".claude/settings"
  },
  "claude": {
    "invocationMode": "cli",
    "cliPath": "claude"
  }
}
```

**Para YAML:**

**caminhos.yaml:**
```yaml
paths:
  agents: .claude/agents/prisma
  prompts: .claude/system-prompts
  commands: .claude/commands/prisma
  templates: .claude/templates
  specs: .prisma/projeto/especificacoes  # ← Copiado do JSON
  steering: .claude/steering              # ← Copiado do JSON
  settings: .claude/settings              # ← Copiado do JSON
```

**integracoes.yaml:**
```yaml
claude:
  invocationMode: cli  # ← Copiado do JSON
  cliPath: claude      # ← Copiado do JSON
  terminal:
    activationDelay: 800
```

**qualidade.yaml:**
```yaml
validation:
  enabled: true
  strictMode: false
  logLevel: warn
  showNotifications: true
```

#### Compatibilidade

- ✅ **Backward compatible**: JSON continua funcionando
- ✅ **Gradual migration**: Migre um campo por vez
- ✅ **Fallback automático**: YAML → JSON → defaults
- ✅ **No breaking changes**: Extensão funciona com ou sem YAML

#### Verificação

Para verificar que YAML está sendo usado:

1. Abra DevTools do VSCode (Help → Toggle Developer Tools)
2. Console deve mostrar: `[YamlConfigLoader] Loaded configs from YAML`
3. Se mostrar `[ConfigManager] Failed to load YAML configs`, está usando JSON

#### Troubleshooting

**YAML não está sendo carregado:**
- Verifique sintaxe YAML (indentação correta)
- Paths devem ser relativos ao workspace root
- Não use tabs, apenas espaços (2 espaços)

**Paths customizados não funcionam:**
- Verifique validação de segurança (não use `..` ou paths absolutos)
- Console mostra warnings se path for inválido
- Path inválido é substituído por default automaticamente

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
