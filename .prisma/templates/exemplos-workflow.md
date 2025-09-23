# Exemplos de Workflows PRISMA
## Exemplos Práticos de Uso do Sistema PRISMA

### 1. Workflow de Desenvolvimento

#### Cenário: Análise de Nova Funcionalidade
```bash
# Comando único que orquestra múltiplos agentes
claude --agent prisma-prime --prompt "
Analise a implementação da nova funcionalidade de autenticação.
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

**Cadeia de Execução:**
```
prisma-prime → event-logger (coleta logs) → context-analyzer (analisa padrões) → progress-tracker (reporta descobertas)
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
Backup completo antes de refatoração do núcleo.
Inclua estado de todos os agentes, logs críticos e cache.
Valide integridade do backup.
"
```

## Workflows Personalizados

### Workflow Personalizado: Revisão de Código
```markdown
---
workflow: revisao-codigo
description: Revisão completa de código com múltiplos agentes
agents:
  - context-analyzer (análise de código)
  - event-logger (histórico de mudanças)
  - progress-tracker (métricas de qualidade)
---

Comando: claude --agent prisma-prime --prompt "execute code-review workflow on src/auth/*"
```

### Workflow Personalizado: Análise de Performance
```markdown
---
workflow: analise-performance
description: Análise de performance com profiling
agents:
  - context-analyzer (analisar gargalos)
  - event-logger (coletar eventos de performance)
  - progress-tracker (gerar painel de performance)
---

Comando: claude --agent prisma-prime --prompt "execute performance-analysis on user authentication flow"
```

## Padrões de Integração

### 1. Integração com Git
```bash
# Pre-commit hook
claude --agent prisma-prime --prompt "analyze staged changes and validate code quality"

# Post-merge hook
claude --agent event-logger --prompt "log merge event and analyze conflicts resolved"
```

### 2. Integração com CI/CD
```yaml
# .github/workflows/prisma-analysis.yml
- name: Análise PRISMA
  run: |
    claude --agent prisma-prime --prompt "analyze pull request changes with security focus"
```

### 3. Integração com IDE
```json
// Tarefa do VS Code
{
  "label": "Análise Rápida PRISMA",
  "type": "shell",
  "command": "claude --agent context-analyzer --prompt 'analyze current file context'"
}
```

## Casos de Uso Avançados

### 1. Análise Multi-Repositório
```bash
claude --agent prisma-prime --prompt "
Analise arquitetura de microsserviços através de repositórios:
- user-service (analisar endpoints da API)
- payment-service (analisar fluxo de transações)
- notification-service (analisar tratamento de eventos)
Identifique pontos de integração e problemas potenciais.
"
```

### 2. Auditoria de Conformidade
```bash
claude --agent prisma-prime --prompt "
Execute auditoria de conformidade para requisitos LGPD.
Analise tratamento de dados, práticas de log e fluxos de consentimento.
Gere relatório de conformidade com recomendações.
"
```

### 3. Análise de Segurança
```bash
claude --agent prisma-prime --prompt "
Análise de segurança do sistema de autenticação.
Verifique vulnerabilidades, analise padrões de acesso,
valide implementações de criptografia.
"
```

## Workflows de Emergência

### 1. Resposta a Incidentes
```bash
# Quando sistema falha em produção
claude --agent prisma-prime --prompt "
EMERGÊNCIA: Sistema de produção fora do ar.
Analise deploys recentes, colete logs de erro,
identifique causa raiz e sugira correções imediatas.
Prioridade: CRÍTICA
"
```

### 2. Recuperação de Dados
```bash
claude --agent state-manager --prompt "
URGENTE: Restaurar estado do sistema a partir do backup.
Valide integridade dos dados e reporte status de recuperação.
Alvo: último estado válido conhecido de 2h atrás.
"
```

## Workflows Agendados

### 1. Verificação Diária de Saúde
```bash
# Cron: 0 9 * * * (todo dia às 9h)
claude --agent prisma-prime --prompt "daily health check with summary report"
```

### 2. Revisão Semanal de Performance
```bash
# Cron: 0 9 * * 1 (segunda-feira às 9h)
claude --agent context-analyzer --prompt "weekly performance analysis with trends"
```

### 3. Auditoria Mensal de Segurança
```bash
# Cron: 0 9 1 * * (primeiro dia do mês às 9h)
claude --agent prisma-prime --prompt "monthly security audit with compliance check"
```

## Encadeamento de Workflows

### Workflows Sequenciais
```bash
# Workflow 1 → Workflow 2 → Workflow 3
claude --agent prisma-prime --prompt "
1. inicializar sistema
2. executar análise completa
3. gerar relatório final
Execute sequencialmente com validação entre etapas.
"
```

### Workflows Paralelos
```bash
# Workflows paralelos para diferentes componentes
claude --agent prisma-prime --prompt "
Análise paralela:
- frontend (analisar componentes React)
- backend (analisar endpoints da API)
- banco de dados (analisar performance de consultas)
Agregar resultados em relatório unificado.
"
```

## Exemplos de Tratamento de Erros

### Degradação Elegante
```bash
claude --agent prisma-prime --prompt "
Analise sistema com degradação elegante.
Se context-analyzer falhar, continue com análise básica.
Sempre garanta que progress-tracker gere relatório final.
"
```

### Lógica de Retry
```bash
claude --agent prisma-prime --prompt "
Execute workflow com lógica de retry.
Se qualquer agente falhar, tente novamente até 2 vezes.
Registre todas as falhas para debugging.
"
```

## Melhores Práticas

### 1. Design de Prompts
- Seja específico sobre o que você quer
- Inclua contexto relevante
- Defina prioridades claramente
- Especifique formato de saída esperado

### 2. Coordenação de Agentes
- Use prisma-prime para workflows complexos
- Permita que agentes especializados façam seu trabalho
- Monitore dependências entre agentes
- Implemente fallbacks para cenários de erro

### 3. Otimização de Performance
- Use cache quando apropriado
- Limite escopo de análise quando possível
- Execute workflows longos em segundo plano
- Monitore uso de recursos

### 4. Debugging
- Sempre inclua correlation IDs
- Use event-logger para auditoria
- Mantenha logs estruturados
- Implemente health checks regulares