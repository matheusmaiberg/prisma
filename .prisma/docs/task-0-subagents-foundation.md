# 🎯 TASK 0: Foundation para Subagentes PRISMA
## Baseado no Guide do Dan sobre Claude Code Agents

---

## 📋 CONTEXTO CRÍTICO

O Dan revelou que subagentes no Claude Code funcionam de forma específica que PRECISAMOS entender antes de implementar PRISMA:

### Fluxo de Informação Real:
```
[VOCÊ]
   ↓ (prompt)
[AGENTE PRIMÁRIO]
   ↓ (system prompt + delegação)
[SUBAGENTES]
   ↓ (resposta)
[AGENTE PRIMÁRIO]
   ↓ (consolidação)
[VOCÊ]
```

**CRÍTICO**: Subagentes respondem ao agente primário, NÃO a você!

---

## 🏗️ FOUNDATION NECESSÁRIO

### 1. Estrutura de Agentes PRISMA

```
.prisma/
├── agents/                      # Subagentes especializados
│   ├── _shared/                 # Base compartilhada
│   │   └── base-agent.md        # Template base
│   ├── meta-agent.md            # Agente que cria agentes
│   ├── state-manager.md         # Gerencia estado persistente
│   ├── event-logger.md          # Event sourcing
│   ├── context-analyzer.md      # Analisa e cache contexto
│   └── progress-tracker.md      # Visual progress display
├── prompts/                     # Reusable prompts
│   └── prime-prisma.md          # Comando principal
└── config/
    └── agent-registry.yaml      # Registro de todos os agentes
```

### 2. Template Base para Subagentes PRISMA

```markdown
# Agent: [NOME]

agent_id: "[ID ÚNICO]"
description: |
  # QUANDO CHAMAR ESTE AGENTE:
  - Se o usuário disser: X, Y ou Z
  - Se precisar de: [FUNCIONALIDADE]

  # COMO PROMPTAR ESTE AGENTE:
  Passe sempre: contexto do projeto, estado atual, objetivo específico

  # IMPORTANTE:
  Este agente NÃO tem contexto da conversa anterior!

tools:
  - Read
  - Write
  - Edit
  - [ESPECÍFICAS]

## SYSTEM PROMPT

### Purpose
[O que este agente faz especificamente]

### Input Expected from Primary Agent
[Formato esperado do prompt do agente primário]

### Report Format to Primary Agent
```yaml
status: success|partial|failed
summary: "One sentence summary"
details:
  - key_point_1
  - key_point_2
actions_taken:
  - action_1
  - action_2
next_suggested_agent: "[ID do próximo agente se aplicável]"
```

### Core Instructions
1. [Instrução específica 1]
2. [Instrução específica 2]
3. SEMPRE reporte no formato YAML acima
4. NUNCA assuma contexto não fornecido

### Constraints
- Execute APENAS o que foi pedido
- Não faça suposições sobre o projeto
- Reporte erros claramente
```

### 3. Meta-Agent PRISMA

Seguindo o exemplo do Dan, precisamos de um meta-agent que:

```markdown
# Meta-Agent PRISMA

agent_id: "prisma-meta"
description: |
  USE PROACTIVELY quando:
  - Usuário pedir para criar novo agente
  - Usuário descrever workflow repetitivo
  - Precisar especialização para tarefa

## SYSTEM PROMPT

### Purpose
Criar novos subagentes PRISMA com formato correto e registro automático

### Workflow
1. Entender necessidade do usuário
2. Gerar agent_id único
3. Criar description rica (QUANDO e COMO chamar)
4. Definir tools necessárias
5. Escrever system prompt focado
6. Registrar em agent-registry.yaml
7. Testar agente criado

### Template Generation
[Usar template base sempre]
```

---

## 📊 PRINCÍPIOS FUNDAMENTAIS

### 1. Context Preservation
- ✅ Cada subagente tem contexto isolado
- ✅ Previne poluição do contexto principal
- ⚠️ Subagente NÃO tem histórico da conversa

### 2. Specialized Expertise
- Cada agente faz UMA coisa MUITO bem
- Tools limitadas ao necessário
- System prompt ultra-focado

### 3. Delegation Pattern
```yaml
primary_agent_sees:
  - agent_id
  - description (CRÍTICO!)
  - tools available

primary_agent_prompts_with:
  - specific_task
  - relevant_context
  - expected_output_format

subagent_returns:
  - structured_response
  - to_primary_agent_only
  - in_agreed_format
```

### 4. Chain Pattern
```
Command → Prime Agent → Subagent A → Result A
                      ↓
                      → Subagent B → Result B
                      ↓
                  Consolidate → User
```

---

## 🚀 IMPLEMENTAÇÃO PASSO-A-PASSO

### PASSO 1: Criar Estrutura Base
```bash
# Criar diretórios
mkdir -p .prisma/agents/_shared
mkdir -p .prisma/prompts
mkdir -p .prisma/config

# Criar template base
touch .prisma/agents/_shared/base-agent.md
```

### PASSO 2: Implementar Meta-Agent
```bash
# Criar meta-agent baseado no do Dan
touch .prisma/agents/meta-agent.md
```

### PASSO 3: Criar Registry
```yaml
# .prisma/config/agent-registry.yaml
agents:
  prisma-meta:
    path: agents/meta-agent.md
    type: meta
    auto_trigger: ["create agent", "build agent", "new workflow"]

  state-manager:
    path: agents/state-manager.md
    type: core
    auto_trigger: ["save state", "load state", "persist"]

  event-logger:
    path: agents/event-logger.md
    type: core
    auto_trigger: ["log event", "audit", "history"]
```

### PASSO 4: Criar Comando Prime
```markdown
# .prisma/prompts/prime-prisma.md

You are the PRISMA Prime Agent.

## Your Role
Orchestrate subagents to accomplish complex tasks while maintaining state and context.

## Available Subagents
[Load from registry]

## Workflow
1. Analyze user request
2. Determine which subagents to call
3. Prepare context for each subagent
4. Call subagents with proper prompts
5. Consolidate responses
6. Update state if needed
7. Report to user

## Key Behaviors
- Always check state before starting
- Log important events
- Track progress visually
- Chain agents intelligently
```

---

## ⚠️ PITFALLS A EVITAR (Aprendidos com Dan)

### 1. NÃO escrever prompts, escrever SYSTEM PROMPTS
❌ ERRADO: "Faça X, depois Y"
✅ CERTO: "Você é um agente que faz X. Quando receber Y, retorne Z"

### 2. NÃO esquecer que subagentes não têm contexto
❌ ERRADO: "Continue o trabalho anterior"
✅ CERTO: "Com base neste contexto: [contexto], faça [tarefa]"

### 3. NÃO negligenciar a description
❌ ERRADO: "Agente de teste"
✅ CERTO: "USE quando: usuário pedir testes. PASSE: arquivo a testar, tipo de teste. ESPERE: relatório estruturado"

### 4. NÃO criar dependency coupling
- Manter agentes independentes
- Evitar chains muito longas
- Não depender de formato específico de outro agente

### 5. LEMBRAR que subagentes não podem chamar subagentes
- Apenas o agente primário orquestra
- Chains devem ser gerenciadas pelo prime agent

---

## 📈 MÉTRICAS DE SUCESSO

- [ ] Meta-agent cria novos agentes corretamente
- [ ] Registry atualiza automaticamente
- [ ] Subagentes respondem em formato estruturado
- [ ] Estado persiste entre sessões
- [ ] Events são logados corretamente
- [ ] Zero poluição de contexto entre agentes

---

## 🎯 RESULTADO ESPERADO

Após completar Task 0, teremos:

1. **Foundation sólido** para subagentes PRISMA
2. **Meta-agent** capaz de gerar novos agentes
3. **Registry** central de agentes
4. **Patterns** estabelecidos para delegation
5. **Prime agent** que orquestra tudo

Isso nos permitirá implementar o PRISMA com a arquitetura correta desde o início, evitando os pitfalls que o Dan identificou.

---

**PRÓXIMO PASSO**: Implementar o meta-agent seguindo o exemplo do Dan, adaptado para PRISMA.

*"Problem → Solution → Technology" - Dan*