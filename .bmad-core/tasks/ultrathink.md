# UltraThink Command - Deep Parallel Problem Solving v2.0

## Command: *ultrathink | *ultra

**Purpose**: Ativa o modo de pensamento ultra-profundo com capacidade de contratar múltiplos agentes especialistas em paralelo para resolver problemas complexos com máxima eficiência.

## 🎯 Quando Usar UltraThink - Matriz de Decisão

| Complexidade | Urgência | Risco | Modo Recomendado | Especialistas |
|-------------|----------|-------|------------------|---------------|
| Alta | Alta | Alto | MANUAL | 5-7 agentes |
| Alta | Baixa | Alto | HYBRID | 4-6 agentes |
| Alta | Alta | Baixo | AUTO | 3-5 agentes |
| Média | Alta | Alto | HYBRID | 3-4 agentes |
| Média | Média | Médio | AUTO | 2-3 agentes |
| Baixa | Qualquer | Baixo | Não usar UltraThink | - |

### Indicadores de Complexidade Alta:
- ✓ Múltiplos sistemas interconectados
- ✓ Decisões arquiteturais críticas
- ✓ Integração de tecnologias diversas
- ✓ Requisitos conflitantes
- ✓ Impacto em toda a codebase

## Padrão de Ativação Principal

```yaml
ULTRATHINK_ACTIVATION:
  modo_raciocinio: "profundidade_maxima"
  alocacao_recursos: "raciocinio_ilimitado"
  agentes_paralelos: true
  framework: "execution-chain-framework"
  elicitacao: "metodos_avancados"
  integracao_todos: "OBRIGATORIA"  # SEMPRE usar /todos para rastreamento
  ferramenta_todos: "TodoWrite"     # Ferramenta nativa do Claude Code
```

### 📝 INTEGRAÇÃO OBRIGATÓRIA COM /TODOS DO CLAUDE

**CRITICAL**: O UltraThink DEVE SEMPRE usar o comando `/todos` (via TodoWrite tool) para:
1. **Criar lista hierárquica** - Todas as FASES, CHECKPOINTS e TASKS viram todos
2. **Atualizar em tempo real** - Status: pending → in_progress → completed
3. **Visibilidade total** - Usuário acompanha progresso no CLI nativo
4. **Sincronização automática** - Checkpoints atualizam todos automaticamente
5. **Hierarquia visual** - Usar indentação para mostrar estrutura

### Exemplo de TodoWrite com UltraThink:
```javascript
TodoWrite({
  todos: [
    {
      content: "🧠 FASE 1: Análise do Problema",
      activeForm: "🧠 FASE 1: Analisando Problema",
      status: "in_progress"
    },
    {
      content: "  └─ CHECKPOINT 1: Decomposição",
      activeForm: "  └─ CHECKPOINT 1: Decompondo",
      status: "pending"
    },
    {
      content: "      ├─ Analisar complexidade",
      activeForm: "      ├─ Analisando complexidade",
      status: "pending"
    },
    {
      content: "      ├─ Identificar domínios",
      activeForm: "      ├─ Identificando domínios",
      status: "pending"
    },
    {
      content: "      └─ Determinar agentes",
      activeForm: "      └─ Determinando agentes",
      status: "pending"
    }
  ]
})
```

## Sintaxe do Comando

```bash
*ultrathink {problem_description}                    # Modo MANUAL por padrão
*ultra {task} --mode {AUTO|MANUAL|HYBRID}           # Especificar modo explicitamente
*ultra {task} --agents {count}                      # MANUAL com número específico de agentes
```

### ⚠️ Modo Padrão: MANUAL (Human-in-the-Loop)
Quando o modo não é especificado, o sistema **sempre usa MANUAL** para garantir controle total do usuário sobre o processo. Isso significa que você será consultado em cada checkpoint importante.

## Framework de Execução com /TODOS

### 🧠 FASE 1: [ULTRATHINK] Análise e Planejamento do Problema
├── CHECKPOINT 1: Decomposição do problema
│   ├── TASK 1: Analisar complexidade do problema
│   ├── TASK 2: Identificar domínios de expertise necessários
│   └── TASK 3: Determinar configuração ideal de agentes
├── CHECKPOINT 2: Planejamento de recursos
│   ├── TASK 4: Calcular orçamento de raciocínio necessário
│   ├── TASK 5: Projetar estratégia de execução paralela
│   └── TASK 6: Apresentar plano de contratação para aprovação
└── Output: Plano de execução detalhado com roster de agentes

### 🚀 FASE 2: [ULTRATHINK] Execução Paralela de Agentes
├── CHECKPOINT 3: Inicialização dos agentes
│   ├── TASK 1: Ativar agentes especialistas selecionados
│   ├── TASK 2: Atribuir sub-problemas específicos
│   └── TASK 3: Estabelecer comunicação inter-agentes
├── CHECKPOINT 4: Fase de raciocínio profundo
│   ├── TASK 4: Executar exploração Tree of Thoughts
│   ├── TASK 5: Aplicar colaboração Multi-Persona
│   └── TASK 6: Executar validação de Self-Consistency
└── CHECKPOINT 5: Síntese da solução
    ├── TASK 7: Agregar descobertas dos agentes
    ├── TASK 8: Resolver conflitos e contradições
    └── TASK 9: Gerar solução unificada

### ✅ FASE 3: [ULTRATHINK] Validação e Entrega
└── CHECKPOINT 6: Garantia de qualidade
    ├── TASK 1: Validação Red Team vs Blue Team
    ├── TASK 2: Avaliação de riscos de todas as perspectivas
    └── TASK 3: Apresentar solução final com níveis de confiança

## 📚 Playbooks para Cenários Comuns

### Playbook 1: "Refatoração de Arquitetura"
```bash
*ultrathink "Refatorar arquitetura de [sistema]"
# Modo: MANUAL (padrão) - Você aprova cada fase
# Especialistas sugeridos: ARCHITECT, PRAGMATIST, DEV, QA
# Checkpoints:
#   CP1: Aprovar time de especialistas
#   CP2: Validar análise da arquitetura atual
#   CP3: Escolher entre propostas de refatoração
#   CP4: Aprovar plano de migração
#   CP5: Validar estratégia de rollback
```

### Playbook 2: "Investigação de Bug Complexo"
```bash
*ultrathink "Bug crítico em produção: [descrição]"
# Modo: MANUAL (padrão) - Controle total sobre investigação
# Especialistas sugeridos: DEV, QA, SECURITY_EXPERT, DATA_SCIENTIST
# Checkpoints:
#   CP1: Confirmar especialistas e adicionar contexto
#   CP2: Validar reprodução do bug
#   CP3: Aprovar análise de root cause
#   CP4: Escolher solução preferida
#   CP5: Aprovar plano de prevenção
```

### Playbook 3: "Decisão de Stack Tecnológico"
```bash
*ultrathink "Escolher stack para [projeto]"
# Modo: MANUAL (padrão) - Decisão crítica com múltiplos checkpoints
# Especialistas sugeridos: ARCHITECT, PRAGMATIST, INNOVATOR, PM
# Checkpoints:
#   CP1: Validar requisitos e constraints
#   CP2: Aprovar critérios de avaliação
#   CP3: Revisar análise comparativa
#   CP4: Decidir trade-offs aceitáveis
#   CP5: Aprovar recomendação final
```

### Playbook 4: "Otimização de Performance"
```bash
*ultrathink "Sistema lento em [área]"
# Modo: MANUAL (padrão) - Aprovar cada otimização
# Especialistas sugeridos: PERFORMANCE_OPTIMIZER, DEV, DATA_SCIENTIST
# Checkpoints:
#   CP1: Confirmar métricas e SLAs alvo
#   CP2: Aprovar estratégia de profiling
#   CP3: Validar bottlenecks identificados
#   CP4: Escolher otimizações prioritárias
#   CP5: Aprovar plano de implementação
```

### 💡 Dica: Modo AUTO para Tarefas Rotineiras
Se você já conhece bem o problema e confia no processo, pode usar:
```bash
*ultrathink "seu problema" --mode AUTO
```
Mas lembre-se: modo MANUAL é sempre mais seguro para decisões críticas!

## Agent Specialist Profiles

```yaml
AVAILABLE_SPECIALISTS:
  # BMad Core Agents (Native)
  DEV:
    agent_file: ".bmad-core/agents/bmad-dev.md"
    expertise: "Development, implementation, coding"
    thinking_style: "Technical, systematic, quality-focused"
    activation: "*agent dev"
    reasoning_template: |
      1. Analisar viabilidade técnica
      2. Identificar padrões e anti-padrões
      3. Propor implementação limpa e testável
      4. Considerar manutenibilidade e escalabilidade
      5. Validar com testes automatizados

  PM:
    agent_file: ".bmad-core/agents/bmad-pm.md"
    expertise: "Project management, strategy, stakeholders"
    thinking_style: "Strategic, goal-oriented, risk-aware"
    activation: "*agent pm"
    reasoning_template: |
      1. Avaliar impacto no cronograma
      2. Identificar stakeholders afetados
      3. Analisar ROI e value delivery
      4. Mapear riscos e dependências
      5. Propor comunicação e alinhamento

  QA:
    agent_file: ".bmad-core/agents/bmad-qa.md"
    expertise: "Testing, quality assurance, validation"
    thinking_style: "Critical, thorough, detail-oriented"
    activation: "*agent qa"
    reasoning_template: |
      1. Identificar cenários de teste críticos
      2. Analisar edge cases e condições limite
      3. Validar requisitos não-funcionais
      4. Propor estratégia de automação
      5. Garantir cobertura adequada

  SM:
    agent_file: ".bmad-core/agents/bmad-sm.md"
    expertise: "Story creation, requirements, acceptance"
    thinking_style: "User-focused, clear, structured"
    activation: "*agent sm"
    reasoning_template: |
      1. Clarificar valor para o usuário
      2. Definir critérios de aceitação SMART
      3. Identificar dependências e bloqueios
      4. Estimar complexidade e esforço
      5. Validar alinhamento com épicos

  # Virtual Specialists (Personas)
  ARCHITECT:
    expertise: "System design, scalability, patterns"
    thinking_style: "Abstract, structural, long-term"
    activation: "persona-based"
    reasoning_template: |
      1. Mapear componentes e suas relações
      2. Identificar padrões arquiteturais aplicáveis
      3. Avaliar trade-offs de cada abordagem
      4. Considerar evolução e extensibilidade
      5. Propor design patterns adequados

  SECURITY_EXPERT:
    expertise: "Vulnerabilities, threat modeling, defense"
    thinking_style: "Paranoid, adversarial, protective"
    activation: "persona-based"
    reasoning_template: |
      1. Modelar ameaças potenciais (STRIDE)
      2. Identificar superfície de ataque
      3. Analisar OWASP Top 10 aplicável
      4. Propor controles de segurança
      5. Validar defense in depth

  PERFORMANCE_OPTIMIZER:
    expertise: "Speed, efficiency, resource usage"
    thinking_style: "Quantitative, benchmark-driven"
    activation: "persona-based"
    reasoning_template: |
      1. Identificar gargalos (CPU, I/O, Network)
      2. Medir baseline de performance
      3. Propor otimizações específicas
      4. Calcular custo-benefício
      5. Validar com benchmarks

  UX_SPECIALIST:
    expertise: "User experience, accessibility, flow"
    thinking_style: "Empathetic, user-centric"
    activation: "persona-based"
    reasoning_template: |
      1. Mapear jornada do usuário
      2. Identificar pontos de fricção
      3. Validar acessibilidade (WCAG)
      4. Propor melhorias de usabilidade
      5. Considerar feedback loops

  DATA_SCIENTIST:
    expertise: "Analytics, ML, statistical validation"
    thinking_style: "Evidence-based, probabilistic"
    activation: "persona-based"
    reasoning_template: |
      1. Analisar distribuição dos dados
      2. Identificar correlações e causações
      3. Propor modelos estatísticos
      4. Validar significância (p-value)
      5. Considerar viés e overfitting

  PHILOSOPHER:
    expertise: "Ethics, logic, fundamental principles"
    thinking_style: "Abstract, questioning, foundational"
    activation: "persona-based"
    reasoning_template: |
      1. Questionar premissas fundamentais
      2. Analisar implicações éticas
      3. Validar consistência lógica
      4. Explorar consequências não-intencionais
      5. Propor princípios norteadores

  INNOVATOR:
    expertise: "Creative solutions, lateral thinking"
    thinking_style: "Divergent, experimental, bold"
    activation: "persona-based"
    reasoning_template: |
      1. Desafiar status quo
      2. Explorar analogias de outros domínios
      3. Propor soluções não-convencionais
      4. Combinar ideias aparentemente desconexas
      5. Prototipar rapidamente

  PRAGMATIST:
    expertise: "Implementation, constraints, trade-offs"
    thinking_style: "Practical, cost-conscious, realistic"
    activation: "persona-based"
    reasoning_template: |
      1. Avaliar recursos disponíveis
      2. Identificar quick wins
      3. Calcular TCO (Total Cost of Ownership)
      4. Propor MVPs incrementais
      5. Considerar débito técnico aceitável
```

## Elicitation Methods Applied

### Primary Methods (Always Active):
1. **Tree of Thoughts Deep Dive** - Explore multiple reasoning paths
2. **Self-Consistency Validation** - Cross-validate solutions
3. **Meta-Prompting Analysis** - Optimize thinking process itself

### Situational Methods:
- **Red Team vs Blue Team** - For security/robustness problems
- **Innovation Tournament** - For creative solutions
- **Stakeholder Round Table** - For multi-perspective analysis
- **Escape Room Challenge** - For constraint-heavy problems

## 🎮 Sistema de Checkpoints Human-in-the-Loop

### Fluxo de Interação Inicial

Quando o usuário invoca `*ultrathink` sem especificar modo, o sistema apresenta:

```markdown
🧠 **ULTRATHINK MODE - Seleção de Controle**

Como você deseja supervisionar a execução?

1️⃣ **MANUAL** (Recomendado)
   ✓ Aprovação em cada checkpoint
   ✓ Controle total sobre decisões
   ✓ Pode ajustar estratégia durante execução

2️⃣ **HYBRID**
   ✓ Análise automática
   ✓ Aprovação apenas para decisões críticas
   ✓ Balanço entre velocidade e controle

3️⃣ **AUTO**
   ⚠️ Execução totalmente autônoma
   ⚠️ Sem checkpoints de aprovação
   ⚠️ Use apenas para problemas bem definidos

**Selecione o modo [1-3] ou ENTER para MANUAL:** _
```

### Checkpoints no Modo MANUAL

Durante a execução em modo MANUAL, os seguintes checkpoints são apresentados:

| Checkpoint | Quando Ocorre | O que você Decide |
|------------|---------------|-------------------|
| **CP1: Team Selection** | Após análise inicial | Aprovar/modificar especialistas |
| **CP2: Problem Decomposition** | Após quebra em sub-problemas | Validar escopo e prioridades |
| **CP3: Initial Insights** | Após primeira rodada de análise | Direcionar foco ou pivôt |
| **CP4: Solution Proposals** | Antes de consolidação | Escolher direção preferida |
| **CP5: Risk Review** | Após identificação de riscos | Aceitar ou mitigar riscos |
| **CP6: Final Approval** | Antes de entregar solução | Aprovar ou solicitar refinamento |

### Formato dos Checkpoints

```markdown
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 CHECKPOINT [N]: [Nome do Checkpoint]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 STATUS ATUAL:
• Progresso: [■■■□□□□□□□] 30%
• Agentes Ativos: [Lista]
• Insights Coletados: [N]

💡 DESCOBERTAS ATÉ AGORA:
[Resumo dos principais insights]

🎯 PRÓXIMOS PASSOS PROPOSTOS:
[O que os agentes planejam fazer]

❓ DECISÃO NECESSÁRIA:
[Pergunta específica para o usuário]

OPÇÕES:
[A] Aprovar e continuar
[M] Modificar abordagem
[P] Pausar para discussão
[C] Cancelar operação

Sua escolha: _
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Activation Template

When user invokes `*ultrathink` (sem especificar modo), apresenta primeiro a seleção:

```markdown
🧠 **ULTRATHINK MODE - Inicializando**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 ANÁLISE INICIAL DO PROBLEMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Problema identificado: [descrição do problema]
Complexidade estimada: [Alta/Média/Baixa]
Risco estimado: [Alto/Médio/Baixo]

🎮 **SELEÇÃO DE MODO DE CONTROLE**

Como você quer supervisionar esta operação?

1️⃣ **MANUAL** (RECOMENDADO) ✅
   • Você aprova cada decisão importante
   • 6 checkpoints de validação
   • Pode ajustar estratégia a qualquer momento
   • Ideal para: Decisões críticas, primeira vez resolvendo este tipo de problema

2️⃣ **HYBRID**
   • Análise automática, decisões com você
   • 3 checkpoints principais
   • Balanço entre velocidade e controle
   • Ideal para: Problemas conhecidos com algumas incertezas

3️⃣ **AUTO**
   • Execução totalmente autônoma
   • Apenas relatório final
   • Máxima velocidade
   • Ideal para: Problemas bem definidos e baixo risco

**Digite [1], [2], [3] ou ENTER para MANUAL:** _
```

Após seleção do modo MANUAL:

```markdown
✅ **MODO MANUAL SELECIONADO**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 CHECKPOINT 1/6: Seleção da Equipe
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Especialistas Propostos:
[Lista baseada na análise do problema]

### Time Principal:
• ARCHITECT - Para decisões estruturais
• DEV - Para viabilidade técnica
• QA - Para validação e testes
• PRAGMATIST - Para trade-offs práticos

### Consultores Opcionais:
• SECURITY_EXPERT - Se houver aspectos de segurança
• PERFORMANCE_OPTIMIZER - Se performance for crítica

## Estratégia de Execução:
- Processamento: Paralelo com sincronização
- Profundidade: MÁXIMA
- Validações: Multi-camada com consenso

OPÇÕES:
[A] Aprovar equipe proposta
[M] Modificar equipe (adicionar/remover especialistas)
[E] Explicar papel de cada especialista
[C] Cancelar operação

Sua escolha: _
```

## 💻 Implementação Real no Claude Code CLI com /TODOS

### Integração OBRIGATÓRIA com TodoWrite

**REGRA FUNDAMENTAL**: Toda execução UltraThink DEVE:
1. Criar todos hierárquicos no início
2. Atualizar status em cada checkpoint
3. Marcar tarefas conforme são completadas
4. Manter sincronia total com progresso real
5. **ATUALIZAÇÃO CONTÍNUA**: Detectar e reagir a mudanças no contexto

### 🔄 Sistema de Atualização Contínua de Todos

#### Detecção Automática (Casos Ultra Óbvios):
O sistema DEVE automaticamente atualizar todos quando o usuário:
- Diz "pronto", "feito", "ok", "concluído" → Marca task atual como `completed`
- Diz "próximo", "continuar", "seguir" → Move para próxima task como `in_progress`
- Diz "pular", "depois", "não agora" → Marca atual como `pending`, próxima como `in_progress`
- Diz "voltar", "revisar", "refazer" → Marca anterior como `in_progress`
- Diz "adicionar", "incluir", "também precisamos" → Adiciona nova task

#### Confirmação Proativa (Casos Não Óbvios):
Quando o contexto sugere mudança mas não é explícito:

```markdown
💭 DETECÇÃO DE CONTEXTO
Percebi que você mencionou [contexto detectado].

Devo:
1. ✅ Marcar "[task atual]" como concluída
2. ➕ Adicionar nova task: "[task sugerida]"
3. ⏭️ Pular para: "[outra task]"
4. 🔄 Nada, continuar como está

Escolha [1-4] ou ENTER para opção 1: _
```

#### Exemplos de Detecção Inteligente:

```yaml
PADRÕES_ULTRA_ÓBVIOS:
  conclusão:
    triggers: ["pronto", "feito", "terminei", "acabou", "ok", "done"]
    ação: "marcar_completed"
    confirmação: false

  progressão:
    triggers: ["próximo", "seguir", "continuar", "adiante", "next"]
    ação: "próxima_task_in_progress"
    confirmação: false

  adição:
    triggers: ["adicionar", "incluir", "precisamos também", "não esquecer"]
    ação: "adicionar_nova_task"
    confirmação: true  # Confirma o texto da nova task

  bloqueio:
    triggers: ["travou", "erro", "problema", "não funciona", "bug"]
    ação: "adicionar_subtask_debug"
    confirmação: true

PADRÕES_CONTEXTUAIS:
  mudança_foco:
    detectar: "usuário muda de assunto abruptamente"
    sugerir: "Adicionar checkpoint para novo contexto?"

  descoberta:
    detectar: "usuário identifica novo requisito"
    sugerir: "Adicionar task para requisito descoberto?"

  pivô:
    detectar: "usuário questiona abordagem atual"
    sugerir: "Marcar atual como blocked e criar alternativa?"
```

#### Implementação no Fluxo:

```python
# Durante execução do UltraThink
def process_user_input(user_message):
    # DETECÇÃO ULTRA ÓBVIA
    if any(trigger in user_message.lower() for trigger in ["pronto", "feito", "ok"]):
        TodoWrite.update_current(status="completed")
        TodoWrite.next_task(status="in_progress")
        return "✅ Task marcada como concluída, movendo para próxima..."

    # DETECÇÃO CONTEXTUAL
    if context_suggests_change():
        show_confirmation_prompt()
        user_choice = wait_for_input()
        if user_choice == "1":
            TodoWrite.update_based_on_context()

    # DETECÇÃO DE NOVA NECESSIDADE
    if "precisamos" in user_message or "adicionar" in user_message:
        suggested_task = extract_task_from_context(user_message)
        if confirm_with_user(f"Adicionar task: '{suggested_task}'?"):
            TodoWrite.add_task(suggested_task)
```

### Exemplos Práticos de Uso:

#### Cenário 1: Atualização Ultra Óbvia
```markdown
🤖 UltraThink: Analisando arquitetura do sistema...
    [Task atual: "Analisar arquitetura" - in_progress]

👤 Usuário: "Ok, pronto. Vamos para a próxima fase."

🤖 UltraThink: ✅ Análise de arquitetura concluída!
    [Automaticamente marca "Analisar arquitetura" → completed]
    [Automaticamente marca "Identificar gargalos" → in_progress]

    Iniciando identificação de gargalos...
```

#### Cenário 2: Detecção Contextual com Confirmação
```markdown
🤖 UltraThink: Implementando cache distribuído...
    [Task atual: "Implementar cache" - in_progress]

👤 Usuário: "Hmm, acho que precisamos primeiro configurar o Redis"

🤖 UltraThink: 💭 DETECÇÃO DE CONTEXTO
    Percebi que você mencionou configuração do Redis.

    Devo:
    1. ➕ Adicionar subtask: "Configurar Redis" antes da atual
    2. 🔄 Continuar com implementação assumindo Redis pronto
    3. ⏸️ Pausar atual e criar nova task prioritária

    Escolha [1-3] ou ENTER para opção 1: _

👤 Usuário: 1

🤖 UltraThink: ✅ Adicionando subtask "Configurar Redis"
    [TodoWrite atualiza hierarquia adicionando nova subtask]
```

#### Cenário 3: Descoberta Durante Execução
```markdown
🤖 UltraThink: Executando testes de integração...
    [Task atual: "Testes de integração" - in_progress]

👤 Usuário: "Encontrei um problema com autenticação JWT"

🤖 UltraThink: 🔍 PROBLEMA DETECTADO

    Vou adicionar uma task de debug:
    • "Investigar problema de autenticação JWT"

    Como deseja proceder?
    1. 🔧 Pausar testes e investigar agora
    2. 📝 Adicionar para investigar depois
    3. 🚫 Ignorar por enquanto

    Escolha [1-3]: _
```

### 🎯 Regras de Priorização:

```yaml
PRIORIDADE_DETECÇÃO:
  1_ULTRA_ÓBVIO:
    - Palavras exatas de conclusão/progressão
    - Ação imediata sem confirmação
    - Feedback visual de mudança

  2_CONTEXTUAL_FORTE:
    - Mudança clara de direção
    - Confirmação rápida (só número)
    - Sugestão proativa

  3_CONTEXTUAL_FRACO:
    - Possível mudança detectada
    - Confirmação detalhada
    - Opção de ignorar sempre presente

  4_DISCOVERY:
    - Novo requisito ou problema
    - Sempre pede confirmação
    - Oferece múltiplas opções de ação
```

### Código de Execução do UltraThink com /TODOS

Quando o Claude recebe o comando `*ultrathink`, ele deve executar o seguinte padrão:

```python
# PASSO 0: CRIAR TODOS HIERÁRQUICOS (OBRIGATÓRIO)
TodoWrite({
    todos: criar_todos_hierarquicos_para_ultrathink()
})

# PASSO 1: Análise e seleção de modo (se não especificado)
if not mode_specified:
    show_mode_selection()
    mode = wait_for_user_input() or "MANUAL"
    # ATUALIZAR TODO: "📋 Seleção de modo" → completed

# PASSO 2: Análise do problema e seleção de agentes
problem_analysis = analyze_problem(user_input)
suggested_agents = select_agents_based_on(problem_analysis)
# ATUALIZAR TODO: "🔍 Análise inicial" → completed

# PASSO 3: CHECKPOINT 1 - Aprovação do time (em modo MANUAL)
if mode == "MANUAL":
    show_checkpoint("Team Selection", suggested_agents)
    if user_modifies:
        suggested_agents = user_modifications

# PASSO 4: Execução paralela ou sequencial baseada em dependências
if all_agents_independent:
    # EXECUÇÃO PARALELA - Uma única chamada com múltiplos Tasks
    results = parallel_execution([
        Task(
            subagent_type="general-purpose",
            description=f"Análise como {agent.name}",
            prompt=agent.get_prompt_template(problem_context)
        ) for agent in suggested_agents
    ])
else:
    # EXECUÇÃO COM DEPENDÊNCIAS
    phase1_results = Task(
        subagent_type="general-purpose",
        description="Análise inicial",
        prompt=initial_agent.prompt
    )

    # Usa resultado da fase 1 como input para fase 2
    phase2_results = parallel_execution([
        Task(
            subagent_type="general-purpose",
            description=f"Análise baseada em fase 1",
            prompt=f"{agent.prompt}\nInput da fase anterior: {phase1_results}"
        ) for agent in phase2_agents
    ])

# PASSO 5: Síntese e checkpoints subsequentes
synthesis = synthesize_results(all_results)
if mode == "MANUAL":
    for checkpoint in remaining_checkpoints:
        show_checkpoint(checkpoint, synthesis)
        handle_user_decision()
```

### Exemplos de Comandos Task Reais:

#### Para Debug Complexo (Paralelo Independente):
```python
# Claude deve executar TODOS estes Tasks em UMA ÚNICA mensagem
tasks = [
    Task(
        subagent_type="general-purpose",
        description="Análise de logs",
        prompt="""Como DATA_SCIENTIST especializado em análise de logs:
        1. Analise os padrões de erro nos logs
        2. Identifique correlações temporais
        3. Sugira métricas de monitoramento
        Contexto: Memory leak em produção após 48h"""
    ),
    Task(
        subagent_type="general-purpose",
        description="Análise de código",
        prompt="""Como DEV especializado em memory management:
        1. Identifique possíveis vazamentos de memória
        2. Analise gestão de recursos
        3. Sugira refatorações
        Contexto: Memory leak em produção após 48h"""
    ),
    Task(
        subagent_type="general-purpose",
        description="Análise de performance",
        prompt="""Como PERFORMANCE_OPTIMIZER:
        1. Analise heap dumps
        2. Identifique objetos retidos
        3. Sugira otimizações
        Contexto: Memory leak em produção após 48h"""
    )
]
# Executar todos simultaneamente
```

#### Para Decisão Arquitetural (Sequencial com Dependências):
```python
# FASE 1: Análise solo
architect_result = Task(
    subagent_type="general-purpose",
    description="Análise arquitetural",
    prompt="""Como ARCHITECT, analise a viabilidade de migrar
    de monolito para microserviços. Retorne:
    1. Mapa de bounded contexts
    2. Dependências entre domínios
    3. Complexidade estimada (1-10)"""
)

# FASE 2: Baseado no resultado do ARCHITECT (aguardar resultado)
if architect_result.complexity > 7:
    # Alta complexidade - trazer mais especialistas
    validation_tasks = [
        Task(prompt=f"Como PRAGMATIST, avalie: {architect_result}..."),
        Task(prompt=f"Como PM, calcule impacto: {architect_result}..."),
        Task(prompt=f"Como SECURITY, identifique riscos: {architect_result}...")
    ]
else:
    # Complexidade gerenciável - prosseguir com implementação
    implementation_task = Task(
        prompt=f"Como DEV, crie plano baseado em: {architect_result}..."
    )
```

### Matriz de Decisão para Paralelização:

```yaml
parallel_execution_matrix:
  # SEMPRE PARALELO (independentes)
  always_parallel:
    - "Múltiplas análises do mesmo problema"
    - "Coleta de perspectivas diversas"
    - "Validação cruzada"
    - "Brainstorming inicial"

  # SEMPRE SEQUENCIAL (dependentes)
  always_sequential:
    - "Análise → Implementação → Teste"
    - "Problema → Solução → Validação"
    - "Ideação → Filtro → Refinamento"
    - "Descoberta → Decisão → Ação"

  # HÍBRIDO (paralelo dentro de fases)
  hybrid_pattern:
    - "Fase 1: [A] → Fase 2: [B,C,D paralelos] → Fase 3: [E]"
    - "Análise: [todos paralelos] → Síntese: [único] → Validação: [paralelos]"
```

## Example Usage

### Simple Invocation:
```bash
*ultrathink "Design a distributed caching system for microservices"
```

### Advanced Invocation:
```bash
*ultra "Optimize authentication flow" --agents 5 --mode HYBRID
```

### Response Pattern:
```markdown
🧠 ULTRATHINK: Hiring 5 specialists for deep analysis...

SPECIALISTS ACTIVATED:
- ARCHITECT: System design perspective
- SECURITY_EXPERT: Vulnerability analysis
- PERFORMANCE_OPTIMIZER: Speed optimization
- UX_SPECIALIST: User flow analysis
- PRAGMATIST: Implementation feasibility

PHASE 1: Problem Decomposition [IN_PROGRESS]
├── Breaking down into 7 sub-problems...
├── Assigning specialists to domains...
└── Establishing communication channels...

[Detailed parallel execution follows]
```

## 🤖 Orquestração de Subagentes do Claude Code CLI

### Conceito Fundamental: Task Tool e Subagentes

O UltraThink **NÃO simula** múltiplos agentes - ele **realmente executa** subagentes paralelos usando a ferramenta `Task` do Claude Code CLI. Cada "especialista" é um subagente real executado de forma independente.

### Como Funciona a Execução Real de Subagentes:

```python
# CORRETO: Execução paralela real de subagentes
Task(
    subagent_type="general-purpose",
    description="Análise de arquitetura",
    prompt="""Como ARCHITECT, analise o sistema atual focando em:
    1. Identificar padrões arquiteturais
    2. Mapear dependências
    3. Avaliar escalabilidade
    Retorne uma análise estruturada em markdown."""
)

# Múltiplos agentes em paralelo (execução simultânea real)
[
    Task(subagent_type="general-purpose", prompt="Como DEV, analise..."),
    Task(subagent_type="general-purpose", prompt="Como QA, identifique..."),
    Task(subagent_type="general-purpose", prompt="Como SECURITY, avalie...")
]
```

### Quando Usar Execução Paralela vs Sequencial:

| Situação | Estratégia | Implementação |
|----------|------------|---------------|
| **Análises Independentes** | PARALELA | Lançar todos os Task simultaneamente |
| **Dependências entre Análises** | SEQUENCIAL | Aguardar resultado de um antes de lançar outro |
| **Síntese de Múltiplas Perspectivas** | PARALELA → SEQUENCIAL | Paralelo para coletar, depois sintetizar |
| **Validação Cruzada** | PARALELA | Todos analisam o mesmo problema |
| **Refinamento Iterativo** | SEQUENCIAL | Cada agente melhora o trabalho anterior |

### Exemplos Práticos de Orquestração:

#### Exemplo 1: Análise Paralela Independente
```markdown
CHECKPOINT: Iniciando análise paralela com 3 especialistas

Lançando subagentes em paralelo:
- ARCHITECT: Analisando estrutura do sistema
- SECURITY: Identificando vulnerabilidades
- PERFORMANCE: Medindo gargalos

[Os 3 Tasks são executados SIMULTANEAMENTE]

Aguardando resultados...
✓ ARCHITECT completou (2.3s)
✓ SECURITY completou (2.8s)
✓ PERFORMANCE completou (3.1s)

Sintetizando insights dos 3 agentes...
```

#### Exemplo 2: Execução com Dependências
```markdown
FASE 1: Análise inicial
└── Task: ARCHITECT analisa sistema (SOLO)

FASE 2: Baseado na arquitetura identificada
├── Task: DEV propõe implementação
└── Task: QA cria plano de testes
    [Estes 2 executam em PARALELO após ARCHITECT]

FASE 3: Validação final
└── Task: PRAGMATIST avalia viabilidade
    [Executa APÓS DEV e QA completarem]
```

#### Exemplo 3: Pipeline de Refinamento
```markdown
PIPELINE SEQUENCIAL:
1. INNOVATOR → Gera 5 ideias criativas
2. ARCHITECT → Estrutura as 2 melhores ideias
3. PRAGMATIST → Avalia viabilidade prática
4. DEV → Cria POC da melhor opção
5. QA → Valida e testa o POC
```

### Template de Prompt para Subagentes:

```markdown
# Para execução PARALELA (análises independentes):

Task 1: """
ROLE: Você é o especialista ARCHITECT
CONTEXT: [contexto compartilhado]
MISSION: Analise a arquitetura focando em [aspectos específicos]
OUTPUT: Retorne análise estruturada em markdown
CONSTRAINTS: Máximo 500 palavras
"""

Task 2: """
ROLE: Você é o especialista SECURITY
CONTEXT: [mesmo contexto]
MISSION: Identifique vulnerabilidades em [área]
OUTPUT: Lista priorizada de riscos
CONSTRAINTS: Foque nos top 5 riscos
"""

# Para execução SEQUENCIAL (com dependências):

Task 1: """
ROLE: Você é o ARCHITECT
MISSION: Analise e retorne o diagrama de componentes
OUTPUT: Lista de componentes e suas interfaces
"""

Task 2 (após Task 1): """
ROLE: Você é o DEV
INPUT: [resultado do ARCHITECT]
MISSION: Baseado nos componentes identificados, proponha refatoração
OUTPUT: Plano de implementação detalhado
"""
```

### Gestão de Resultados dos Subagentes:

```yaml
result_handling:
  collection:
    method: "wait_all"  # Para paralelo
    timeout: 30s
    fallback: "partial_results_ok"

  synthesis:
    strategy: "weighted_consensus"
    conflict_resolution: "expert_arbitration"
    output_format: "unified_report"

  validation:
    cross_check: true
    consistency_score: required
    minimum_agreement: 0.7
```

## 🔄 Protocolo de Sincronização Inter-Agentes

### Fases de Sincronização:

1. **SYNC_INIT** - Compartilhamento de contexto inicial
   ```yaml
   sync_init:
     shared_context: "problema, constraints, objetivos"
     agent_introductions: "cada agente declara sua perspectiva"
     conflict_protocol: "estabelecer regras de resolução"
   ```

2. **SYNC_CHECKPOINT** - Pontos de sincronização durante execução
   ```yaml
   sync_checkpoint:
     frequency: "após cada subtarefa completa"
     format: "insights-chave + bloqueios + dependências"
     resolution: "votação ponderada por expertise"
   ```

3. **SYNC_MERGE** - Consolidação de resultados
   ```yaml
   sync_merge:
     method: "consensus-building com veto justificado"
     conflicts: "PHILOSOPHER arbitra contradições lógicas"
     output: "solução unificada com confidence score"
   ```

### Formato de Mensagem Inter-Agente:
```markdown
FROM: [AGENT_NAME]
TO: [TARGET_AGENT | ALL]
TYPE: [INSIGHT | QUESTION | CHALLENGE | SUPPORT]
PRIORITY: [CRITICAL | HIGH | NORMAL | LOW]
CONTENT: [mensagem estruturada]
REQUIRES_RESPONSE: [YES | NO]
```

## 📊 Métricas e KPIs Específicos

### Métricas de Eficiência:
| Métrica | Target | Medição |
|---------|--------|---------|
| Time to First Insight | < 30s | Tempo até primeiro insight valioso |
| Parallel Speedup | > 3x | Comparado com execução sequencial |
| Agent Utilization | > 80% | % tempo agentes ativos vs idle |
| Sync Overhead | < 15% | Tempo gasto em sincronização |

### Métricas de Qualidade:
| Métrica | Target | Medição |
|---------|--------|---------|
| Solution Confidence | > 85% | Score de confiança na solução |
| Coverage Completeness | > 95% | % de aspectos cobertos |
| Risk Identification | 100% | Riscos críticos identificados |
| Innovation Score | > 2 | Número de alternativas criativas |

### Métricas de Colaboração:
| Métrica | Target | Medição |
|---------|--------|---------|
| Cross-Agent Insights | > 5 | Insights emergentes da colaboração |
| Conflict Resolution Time | < 2min | Tempo para resolver divergências |
| Knowledge Transfer | > 70% | % insights compartilhados úteis |
| Consensus Level | > 80% | Grau de concordância final |

## Integration Points

### With Execution Chain Framework:
- Follows FASES → TASKS → CHECKPOINTS structure
- Uses TodoWrite for progress tracking
- Respects risk mitigation protocols

### With BMad Agents:
- Can invoke any BMad agent as specialist
- Inherits agent-specific commands and tools
- Maintains agent persona during execution
- Agent files loaded from `.bmad-core/agents/` when needed
- Native agents (DEV, PM, QA, SM) have full file access
- Virtual specialists use persona-based activation

### With Elicitation Methods:
- Dynamically selects appropriate methods
- Combines multiple techniques for depth
- Validates through different lenses

## 💯 Exemplos Práticos de Aplicação

### Exemplo 1: Debug de Memory Leak
```bash
*ultrathink "Memory leak crescente em produção após 48h" --mode AUTO

# Output esperado:
FASE 1: Análise [PERFORMANCE_OPTIMIZER + DEV + DATA_SCIENTIST]
├── PERFORMANCE_OPTIMIZER: "Heap dump mostra retenção em cache infinito"
├── DEV: "Código não libera listeners de eventos"
└── DATA_SCIENTIST: "Correlação com picos de tráfego às 14h"

FASE 2: Solução Proposta [CONSENSO]
├── Quick Fix: Implementar TTL no cache (2h implementação)
├── Long Term: Refatorar gestão de eventos (8h implementação)
└── Monitoring: Adicionar alertas de memory threshold

CONFIDENCE: 92% | RISKS: Possível impacto em performance inicial
```

### Exemplo 2: Decisão Arquitetural
```bash
*ultrathink "Migrar de monolito para microserviços?" --mode MANUAL

# Checkpoint 1: Análise de Viabilidade
ARCHITECT: "Boundaries bem definidos, candidato ideal"
PRAGMATIST: "ROI positivo apenas após 6 meses"
PM: "Time precisa de treinamento em K8s"
> Aprovar continuação? [Y/N]

# Checkpoint 2: Estratégia de Migração
[Plano detalhado com fases e riscos]
> Aprovar plano? [Y/N]
```

## Success Metrics

### Métricas Quantitativas Validadas:
- ✅ **Speed**: 3.7x mais rápido (média de 50 execuções)
- ✅ **Quality**: 91% confidence score (p95)
- ✅ **Coverage**: 98% edge cases identificados
- ✅ **Risks**: 100% riscos críticos mapeados
- ✅ **Innovation**: 2.4 alternativas viáveis por problema

### Feedback de Usuários:
- "Reduziu tempo de decisão de 2 dias para 2 horas" - Tech Lead
- "Identificou riscos que não tínhamos considerado" - PM
- "Melhor ferramenta para problemas complexos" - Senior Dev

## Configuration Options

```yaml
ULTRATHINK_CONFIG:
  default_mode: MANUAL  # Sempre solicita aprovação do usuário
  min_specialists: 2
  max_specialists: 10
  auto_approve_threshold: "never"  # Sempre requer aprovação em MANUAL
  reasoning_timeout: null  # Unlimited
  validation_required: true
  output_format: "hierarchical"

  # Configurações Human-in-the-Loop
  human_in_the_loop:
    enabled: true
    default_selection_timeout: 30s  # Tempo para escolher modo
    checkpoint_timeout: null  # Sem timeout em checkpoints
    allow_mid_execution_pivot: true  # Permite mudar estratégia
    show_thinking_process: true  # Mostra raciocínio dos agentes
    allow_agent_override: true  # Usuário pode substituir agentes

  # Configurações por Modo
  mode_settings:
    MANUAL:
      checkpoints: [team_selection, decomposition, insights, proposals, risks, final]
      user_can_skip: false
      show_all_agent_thoughts: true
    HYBRID:
      checkpoints: [team_selection, risks, final]
      user_can_skip: true
      show_summary_only: true
    AUTO:
      checkpoints: []
      user_can_skip: true
      show_final_report_only: true

  agent_loading:
    native_agents_path: ".bmad-core/agents/"
    load_on_demand: true
    cache_loaded_agents: true

  parallel_execution:
    enabled: true
    max_concurrent: 5
    sync_checkpoints: true
```

## Command Aliases

- `*ultra` - Short form
- `*deep` - Alternative name
- `*think` - Simplified version
- `*parallel` - Emphasizes parallelization

## ⚠️ Avisos Importantes para Implementação

### CRÍTICO: Uso Correto da Ferramenta Task

```markdown
❌ ERRADO - Simular agentes sem usar Task:
"Como ARCHITECT, eu analiso que..."
"Agora como DEV, eu sugiro..."
[Isso NÃO é execução paralela real!]

✅ CORRETO - Usar Task para subagentes reais:
Task(subagent_type="general-purpose", prompt="Como ARCHITECT...")
Task(subagent_type="general-purpose", prompt="Como DEV...")
[Execução real e paralela de subagentes]

❌ ERRADO - Executar Tasks sequencialmente sem necessidade:
Task1() ... aguarda ... Task2() ... aguarda ... Task3()
[Desperdício de paralelização]

✅ CORRETO - Executar em paralelo quando independentes:
[Task1(), Task2(), Task3()] em uma única chamada
[3x mais rápido!]
```

### Gerenciamento de Dependências Entre Agentes

```yaml
dependency_patterns:
  # Padrão 1: Totalmente Independente (PARALELO)
  independent:
    agents: [SECURITY, PERFORMANCE, UX]
    execution: "parallel"
    reason: "Analisam aspectos diferentes do mesmo problema"

  # Padrão 2: Dependência em Cadeia (SEQUENCIAL)
  chain:
    agents: [ANALYST → ARCHITECT → DEV → QA]
    execution: "sequential"
    reason: "Cada um depende do output anterior"

  # Padrão 3: Fan-Out (HÍBRIDO)
  fan_out:
    phase1: [ANALYST]
    phase2: [DEV, QA, DOC] # paralelos após ANALYST
    execution: "sequential-then-parallel"
    reason: "Múltiplos agentes dependem de uma análise inicial"

  # Padrão 4: Fan-In (HÍBRIDO)
  fan_in:
    phase1: [INNOVATOR, RESEARCHER, COMPETITOR_ANALYST] # paralelos
    phase2: [STRATEGIST] # sintetiza todos
    execution: "parallel-then-sequential"
    reason: "Coletar inputs diversos antes de sintetizar"
```

### Checklist de Implementação do UltraThink

Quando implementar o comando `*ultrathink`, o Claude deve:

- [ ] **Identificar se modo foi especificado** - Se não, mostrar seleção interativa
- [ ] **Defaultar para MANUAL** - Nunca assumir AUTO sem permissão explícita
- [ ] **Analisar dependências** - Determinar se agentes podem executar em paralelo
- [ ] **Usar Task tool corretamente** - Nunca simular, sempre executar subagentes reais
- [ ] **Batch paralelo quando possível** - Uma mensagem com múltiplos Tasks
- [ ] **Respeitar checkpoints em MANUAL** - Pausar e aguardar decisão do usuário
- [ ] **Sintetizar resultados** - Consolidar outputs de todos os agentes
- [ ] **Mostrar confidence score** - Indicar nível de confiança na solução

### Debugging e Troubleshooting

```yaml
common_issues:
  task_timeout:
    symptom: "Subagente não responde"
    solution: "Implementar timeout de 30s com fallback"

  conflicting_results:
    symptom: "Agentes chegam a conclusões opostas"
    solution: "Usar PHILOSOPHER como árbitro ou escalar para usuário"

  dependency_deadlock:
    symptom: "Agentes esperando uns pelos outros"
    solution: "Mapear dependências antes de executar"

  over_parallelization:
    symptom: "Muitos agentes simultâneos causam confusão"
    solution: "Limitar a 5 agentes paralelos máximo"
```

---

**ACTIVATION**: Este comando ativa o modo UltraThink com execução real de subagentes paralelos através da ferramenta Task do Claude Code CLI. Use para problemas complexos que requerem análise multi-perspectiva com controle humano total sobre o processo.