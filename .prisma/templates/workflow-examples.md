# PRISMA Workflow Examples
## Exemplos Práticos de Uso do Sistema PRISMA

### 1. Workflow de Desenvolvimento

#### Cenário: Análise de Nova Feature
```bash
# Comando único que orquestra múltiplos agentes
claude --agent prisma-prime --prompt "
Analise a implementação da nova feature de autenticação.
Execute análise completa incluindo:
- Estado atual do código
- Contexto de dependências
- Progresso de implementação
- Logs de desenvolvimento
"
```

**O que acontece internamente:**
1. `prisma-prime` coordena a operação
2. `state-manager` salva contexto da sessão
3. `event-logger` registra início da análise
4. `context-analyzer` examina código e dependências
5. `progress-tracker` gera relatório visual

### 2. Workflow de Debug

#### Cenário: Investigação de Bug Crítico
```bash
claude --agent prisma-prime --prompt "
Debug bug crítico no sistema de pagamentos.
Colete todos os logs, analise stacktrace e sugira correções.
Priorize eventos dos últimos 24h.
"
```

**Chain de Execução:**
```
prisma-prime → event-logger (coleta logs) → context-analyzer (analisa patterns) → progress-tracker (reporta findings)
```

### 3. Workflow de Deploy

#### Cenário: Preparação para Release
```bash
claude --agent prisma-prime --prompt "
Prepare sistema para deploy v2.1.0.
Valide testes, analise dependências, gere documentação.
Inclua checklist de pré-deploy.
"
```

### 4. Workflow de Monitoramento

#### Cenário: Health Check Automático
```bash
# Executar a cada 15 minutos via cron
*/15 * * * * claude --agent prisma-prime --prompt "health check report anomalies only"
```

### 5. Workflow de Backup

#### Cenário: Backup Antes de Mudanças Grandes
```bash
claude --agent prisma-prime --prompt "
Backup completo antes de refatoração do core.
Inclua estado de todos os agentes, logs críticos e cache.
Valide integridade do backup.
"
```

## Workflows Customizados

### Custom Workflow: Code Review
```markdown
---
workflow: code-review
description: Review completo de código com múltiplos agentes
agents:
  - context-analyzer (análise de código)
  - event-logger (histórico de changes)
  - progress-tracker (quality metrics)
---

Comando: claude --agent prisma-prime --prompt "execute code-review workflow on src/auth/*"
```

### Custom Workflow: Performance Analysis
```markdown
---
workflow: performance-analysis
description: Análise de performance com profiling
agents:
  - context-analyzer (analyze bottlenecks)
  - event-logger (collect performance events)
  - progress-tracker (generate performance dashboard)
---

Comando: claude --agent prisma-prime --prompt "execute performance-analysis on user authentication flow"
```

## Integration Patterns

### 1. Git Integration
```bash
# Pre-commit hook
claude --agent prisma-prime --prompt "analyze staged changes and validate code quality"

# Post-merge hook
claude --agent event-logger --prompt "log merge event and analyze conflicts resolved"
```

### 2. CI/CD Integration
```yaml
# .github/workflows/prisma-analysis.yml
- name: PRISMA Analysis
  run: |
    claude --agent prisma-prime --prompt "analyze pull request changes with security focus"
```

### 3. IDE Integration
```json
// VS Code task
{
  "label": "PRISMA Quick Analysis",
  "type": "shell",
  "command": "claude --agent context-analyzer --prompt 'analyze current file context'"
}
```

## Advanced Use Cases

### 1. Multi-Repository Analysis
```bash
claude --agent prisma-prime --prompt "
Analyze microservices architecture across repositories:
- user-service (analyze API endpoints)
- payment-service (analyze transaction flow)
- notification-service (analyze event handling)
Identify integration points and potential issues.
"
```

### 2. Compliance Audit
```bash
claude --agent prisma-prime --prompt "
Execute compliance audit for GDPR requirements.
Analyze data handling, logging practices, and user consent flows.
Generate compliance report with recommendations.
"
```

### 3. Security Analysis
```bash
claude --agent prisma-prime --prompt "
Security analysis of authentication system.
Check for vulnerabilities, analyze access patterns,
validate encryption implementations.
"
```

## Emergency Workflows

### 1. Incident Response
```bash
# Quando sistema falha em produção
claude --agent prisma-prime --prompt "
EMERGENCY: Production system down.
Analyze recent deployments, collect error logs,
identify root cause and suggest immediate fixes.
Priority: CRITICAL
"
```

### 2. Data Recovery
```bash
claude --agent state-manager --prompt "
URGENT: Restore system state from backup.
Validate data integrity and report recovery status.
Target: last known good state from 2h ago.
"
```

## Scheduled Workflows

### 1. Daily Health Check
```bash
# Cron: 0 9 * * * (todo dia às 9h)
claude --agent prisma-prime --prompt "daily health check with summary report"
```

### 2. Weekly Performance Review
```bash
# Cron: 0 9 * * 1 (segunda-feira às 9h)
claude --agent context-analyzer --prompt "weekly performance analysis with trends"
```

### 3. Monthly Security Audit
```bash
# Cron: 0 9 1 * * (primeiro dia do mês às 9h)
claude --agent prisma-prime --prompt "monthly security audit with compliance check"
```

## Workflow Chaining

### Sequential Workflows
```bash
# Workflow 1 → Workflow 2 → Workflow 3
claude --agent prisma-prime --prompt "
1. bootstrap system
2. run full analysis
3. generate final report
Execute sequentially with validation between steps.
"
```

### Parallel Workflows
```bash
# Workflows paralelos para diferentes componentes
claude --agent prisma-prime --prompt "
Parallel analysis:
- frontend (analyze React components)
- backend (analyze API endpoints)
- database (analyze query performance)
Aggregate results into unified report.
"
```

## Error Handling Examples

### Graceful Degradation
```bash
claude --agent prisma-prime --prompt "
Analyze system with graceful degradation.
If context-analyzer fails, continue with basic analysis.
Always ensure progress-tracker generates final report.
"
```

### Retry Logic
```bash
claude --agent prisma-prime --prompt "
Execute workflow with retry logic.
If any agent fails, retry up to 2 times.
Log all failures for debugging.
"
```

## Best Practices

### 1. Prompt Design
- Seja específico sobre o que você quer
- Inclua contexto relevante
- Defina prioridades claramente
- Especifique formato de saída esperado

### 2. Agent Coordination
- Use prisma-prime para workflows complexos
- Permita que agentes especializados façam seu trabalho
- Monitore dependências entre agentes
- Implemente fallbacks para cenários de erro

### 3. Performance Optimization
- Use cache quando apropriado
- Limite escopo de análise quando possível
- Execute workflows longos em background
- Monitore uso de recursos

### 4. Debugging
- Sempre inclua correlation IDs
- Use event-logger para auditoria
- Mantenha logs estruturados
- Implemente health checks regulares