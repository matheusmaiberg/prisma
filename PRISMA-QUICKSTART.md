# 🚀 PRISMA QUICK START
**Meta-Agente para Claude Code com Subagentes Especializados**

## ⚡ Comandos Prontos para Usar

### 1. Inicialização (COPIE E COLE)
```bash
# Bootstrap do sistema PRISMA
claude --agent prisma-prime --prompt "bootstrap PRISMA system"
```

### 2. Análise Completa (COPIE E COLE)
```bash
# Análise completa do projeto atual
claude --agent prisma-prime --prompt "run full analysis on current codebase structure"
```

### 3. Status do Sistema (COPIE E COLE)
```bash
# Verificar status de todos os agentes
claude --agent prisma-prime --prompt "status show detailed system information"
```

### 4. Criar Novo Agente (COPIE E COLE)
```bash
# Criar agente personalizado
claude --agent meta-agente --prompt "Build a new sub-agent for [DESCREVA SUA NECESSIDADE]. The agent should [CAPACIDADES DESEJADAS] and integrate with PRISMA system."
```

## 📁 Estrutura Criada

```
.prisma/
├── agents/           # 6 agentes prontos
│   ├── meta-agente.md
│   ├── prisma-prime.md
│   ├── state-manager.md
│   ├── event-logger.md
│   ├── context-analyzer.md
│   └── progress-tracker.md
├── config/           # Configuração central
│   ├── prisma-config.yaml
│   └── agent-registry.yaml
├── templates/        # Templates reutilizáveis
│   ├── agent-template.md
│   ├── command-snippets.sh
│   └── workflow-examples.md
└── tests/           # Estratégia de testing
    └── test-strategy.md
```

## 🎯 Agentes Implementados

| Agente | Função | Comando de Teste |
|--------|---------|------------------|
| **prisma-prime** | Orquestrador principal | `claude --agent prisma-prime --prompt "status"` |
| **state-manager** | Persistência e estado | `claude --agent state-manager --prompt "save test state"` |
| **event-logger** | Event sourcing | `claude --agent event-logger --prompt "log test event"` |
| **context-analyzer** | Cache inteligente | `claude --agent context-analyzer --prompt "analyze context"` |
| **progress-tracker** | Visualização de progresso | `claude --agent progress-tracker --prompt "show dashboard"` |
| **meta-agente** | Criador de agentes | `claude --agent meta-agente --prompt "Build new agent for X"` |

## 🔥 Workflows Prontos

### Desenvolvimento
```bash
claude --agent prisma-prime --prompt "execute development workflow: analyze codebase, run tests, generate documentation"
```

### Debug
```bash
claude --agent prisma-prime --prompt "debug system show all issues and suggest fixes"
```

### Deploy
```bash
claude --agent prisma-prime --prompt "execute deployment workflow: validate code, run tests, prepare release"
```

## ⚙️ Aliases Úteis (Adicione ao seu shell)

```bash
# Adicione ao seu ~/.bashrc ou ~/.zshrc
alias prisma-boot='claude --agent prisma-prime --prompt "bootstrap PRISMA system"'
alias prisma-status='claude --agent prisma-prime --prompt "status show detailed system information"'
alias prisma-analyze='claude --agent prisma-prime --prompt "run full analysis"'
alias prisma-debug='claude --agent prisma-prime --prompt "debug system show all issues"'
alias prisma-clean='claude --agent state-manager --prompt "cleanup expired cache and optimize"'
```

## 🧪 Testing Rápido

### Teste Individual
```bash
# Testar agente específico
claude --agent state-manager --prompt "test save operation with sample data"
```

### Teste de Workflow
```bash
# Testar workflow completo
claude --agent prisma-prime --prompt "test bootstrap workflow with validation"
```

## 🚨 Emergency Commands

### Sistema com Problemas
```bash
claude --agent prisma-prime --prompt "EMERGENCY: system health check and repair"
```

### Recovery
```bash
claude --agent state-manager --prompt "restore system from last known good state"
```

## 📊 Monitoring

### Health Check Diário
```bash
# Adicione ao cron: 0 9 * * *
claude --agent prisma-prime --prompt "daily health check with summary report"
```

### Performance Check
```bash
claude --agent context-analyzer --prompt "performance analysis with recommendations"
```

## 🎨 Customização

### Criar Agente Especializado
```bash
# Exemplo: Agente para testes
claude --agent meta-agente --prompt "Build a new sub-agent for automated testing. The agent should run unit tests, integration tests, collect coverage reports, and integrate with progress-tracker for visual feedback."
```

### Workflow Personalizado
```bash
# Exemplo: Code review workflow
claude --agent prisma-prime --prompt "execute code-review workflow on src/components/* with focus on React best practices"
```

## 🔧 Troubleshooting

### Agente não responde
1. Verificar se arquivo existe: `ls .prisma/agents/`
2. Verificar registry: `cat .prisma/config/agent-registry.yaml`
3. Testar com prisma-prime: `claude --agent prisma-prime --prompt "debug [agente-name]"`

### Workflow falha
1. Verificar logs: `ls .prisma/logs/`
2. Status do sistema: `claude --agent prisma-prime --prompt "status"`
3. Recovery: `claude --agent state-manager --prompt "restore last stable state"`

## 📚 Próximos Passos

1. **Execute o bootstrap**: `claude --agent prisma-prime --prompt "bootstrap PRISMA system"`
2. **Teste análise**: `claude --agent prisma-prime --prompt "run full analysis"`
3. **Crie seu primeiro agente**: Use o meta-agente para suas necessidades específicas
4. **Configure aliases**: Adicione os aliases ao seu shell
5. **Implemente monitoring**: Configure health checks automáticos

## 💡 Dicas de Uso

- **Sempre use prisma-prime** para workflows complexos
- **meta-agente** para criar novos agentes especializados
- **Inclua contexto específico** nos prompts para melhores resultados
- **Use correlation IDs** para debug de workflows longos
- **Monitore logs** em `.prisma/logs/` para troubleshooting

---

**🎯 O sistema PRISMA está pronto para uso! Comece com o bootstrap e explore os workflows disponíveis.**