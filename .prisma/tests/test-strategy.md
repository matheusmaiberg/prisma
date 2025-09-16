# PRISMA Testing Strategy
## Estratégia de Testing para Multi-Agent Systems

### 1. Testing Isolado de Subagentes

#### Script de Teste Individual
```bash
#!/bin/bash
# test-agent.sh - Testa agente específico

AGENT_NAME=$1
TEST_PROMPT=$2

echo "🧪 Testing Agent: $AGENT_NAME"
echo "📝 Prompt: $TEST_PROMPT"

# Criar sessão isolada
claude --agent $AGENT_NAME --prompt "$TEST_PROMPT" --output test-results/$AGENT_NAME-$(date +%s).json

echo "✅ Test completed. Check results in test-results/"
```

#### Casos de Teste por Agente

**State Manager:**
```bash
# Teste 1: Save State
./test-agent.sh state-manager "Salve o estado do agente test-agent com dados: {user: 'dan', session: '123'}"

# Teste 2: Load State
./test-agent.sh state-manager "Carregue o estado do agente test-agent"

# Teste 3: Cleanup
./test-agent.sh state-manager "Execute cleanup de cache expirado"
```

**Event Logger:**
```bash
# Teste 1: Log Event
./test-agent.sh event-logger "Registre evento: agent_start para state-manager com correlation_id workflow_001"

# Teste 2: Error Event
./test-agent.sh event-logger "Registre erro crítico: timeout no agente context-analyzer"
```

### 2. Testing de Workflows

#### Workflow Bootstrap Test
```bash
# Comando de teste
claude --agent prisma-prime --prompt "bootstrap PRISMA system"

# Validações esperadas:
# 1. state-manager deve ser chamado primeiro
# 2. event-logger deve registrar operações
# 3. Resposta deve incluir status de ambos agentes
```

#### Full Chain Test
```bash
# Comando de teste
claude --agent prisma-prime --prompt "run full analysis on codebase structure"

# Validações esperadas:
# 1. Todos os 4 agentes core devem ser executados
# 2. Ordem correta: state-manager → event-logger → context-analyzer → progress-tracker
# 3. Cada agente deve reportar no formato PRISMA
```

### 3. Debugging Multi-Agent

#### Debug Script
```bash
#!/bin/bash
# debug-chain.sh - Debug de chain de agentes

WORKFLOW_ID=$1

echo "🔍 Debugging Workflow: $WORKFLOW_ID"

# 1. Check logs
echo "📋 Event Logs:"
cat .prisma/logs/events-$(date +%Y-%m-%d).json | jq ".[] | select(.correlation_id==\"$WORKFLOW_ID\")"

# 2. Check state
echo "💾 State Files:"
ls -la .prisma/state/

# 3. Check cache
echo "🗄️ Cache Status:"
cat .prisma/cache/context-*.json | jq ".cache_key, .access_count, .ttl"
```

#### Debug Commands
```bash
# Debug agente específico
claude --agent prisma-prime --prompt "debug state-manager show last 5 operations"

# Debug workflow
claude --agent prisma-prime --prompt "status show detailed breakdown of current workflows"
```

### 4. Validation Checklist

#### ✅ Pre-Execution Checks
```bash
# Verifica estrutura PRISMA
ls -la .prisma/{config,agents,logs,state,cache}

# Verifica configuração
cat .prisma/config/prisma-config.yaml | grep -E "(agents|workflows|logging)"

# Verifica registry
cat .prisma/config/agent-registry.yaml | grep -E "status.*active"
```

#### ✅ Post-Execution Validation
```bash
# Verifica logs foram criados
test -f .prisma/logs/events-$(date +%Y-%m-%d).json && echo "✅ Logs OK" || echo "❌ No logs"

# Verifica estado foi persistido
test -n "$(ls .prisma/state/ 2>/dev/null)" && echo "✅ State OK" || echo "❌ No state"

# Verifica formato de resposta PRISMA
# Deve conter: status, resumo, detalhes, acoes_realizadas
```

### 5. Performance Testing

#### Load Test Script
```bash
#!/bin/bash
# load-test.sh - Teste de carga

for i in {1..10}; do
  echo "🔄 Load test iteration $i"
  time claude --agent prisma-prime --prompt "analyze system quick check" &
done

wait
echo "✅ Load test completed"
```

#### Métricas a Coletar
- Tempo de resposta por agente
- Taxa de sucesso
- Uso de memória/CPU
- Tamanho dos logs gerados

### 6. Troubleshooting Common Issues

#### Agente não é chamado
```bash
# Debug: Verificar description
grep -n "description:" .prisma/agents/$AGENT_NAME.md

# Fix: Melhorar description com keywords "Use proativamente para..."
```

#### Resposta não segue padrão PRISMA
```bash
# Debug: Verificar system prompt
grep -A 20 "Padrão de Resposta PRISMA" .prisma/agents/$AGENT_NAME.md
```

#### Chain falha no meio
```bash
# Debug: Verificar logs de evento
jq '.[] | select(.type=="error")' .prisma/logs/events-$(date +%Y-%m-%d).json
```

### 7. Automated Testing

#### CI/CD Integration
```yaml
# .github/workflows/prisma-test.yml
name: PRISMA Agent Tests
on: [push, pull_request]

jobs:
  test-agents:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Test Individual Agents
        run: |
          ./test-agent.sh state-manager "test save operation"
          ./test-agent.sh event-logger "test event logging"
      - name: Test Workflows
        run: |
          claude --agent prisma-prime --prompt "bootstrap PRISMA"
```