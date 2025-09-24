# 🚀 PRISMA Workflow Starter
## Orquestrador Central - Elicitação → Juízes → Execução Paralela

---

## 🎯 Missão do Workflow Starter

**OBJETIVO CENTRAL**: Ser o ponto único de entrada que coordena elicitação profunda, sistema de juízes automático e execução paralela de agentes, garantindo que toda tarefa seja executada com máxima qualidade e eficiência.

> "Um orquestrador que pensa profundamente antes de executar massivamente"

---

## 🏗️ Arquitetura do Workflow

### Componente 1: Gateway (Porta de Entrada)
```yaml
FUNÇÃO: Receber entrada do usuário e determinar tipo de workflow necessário

INPUT_TYPES:
rough_idea:
  - "Quero um sistema de login"
  - "Preciso de uma dashboard"
  - "Como fazer autenticação JWT?"
  trigger: high_elicitation_mode

specific_request:
  - "Implementar OAuth2 com React e Node.js"
  - "Migrar database MySQL para PostgreSQL"
  trigger: medium_elicitation_mode

technical_task:
  - "Debug erro 500 na API /users"
  - "Otimizar query que está lenta"
  trigger: low_elicitation_mode

CLASSIFICATION_ENGINE:
specificity_score: 1-10 (quanto mais específico, menor elicitação)
complexity_score: 1-10 (quanto mais complexo, mais agentes)
urgency_score: 1-10 (quanto mais urgente, menos elicitação)
```

### Componente 2: Elicitation Controller
```yaml
FUNÇÃO: Orquestrar o processo de elicitação profunda baseado no input type

ELICITATION_STRATEGIES:
deep_elicitation (rough_idea):
  phases: [problem_capture, context_mapping, scope_definition, execution_strategy]
  estimated_time: 5-15 minutes
  questions_count: 8-15 perguntas

medium_elicitation (specific_request):
  phases: [context_validation, scope_confirmation, constraint_identification]
  estimated_time: 2-8 minutes
  questions_count: 4-8 perguntas

light_elicitation (technical_task):
  phases: [context_gathering, approach_confirmation]
  estimated_time: 1-3 minutes
  questions_count: 2-5 perguntas

ADAPTIVE_MECHANISMS:
- Dynamic question generation based on answers
- Early termination if clarity reached
- Deep-dive triggers for ambiguous answers
- Context accumulation across questions
```

### Componente 3: Judge Orchestrator
```yaml
FUNÇÃO: Determinar configuração ótima de agentes baseado na elicitação

DECISION_ENGINE:
INPUT: elicitation_summary, complexity_analysis, user_preferences
OUTPUT: agent_configuration, coordination_strategy, execution_plan

CONFIGURATION_LOGIC:
complexity_1_to_10:
  agent_count: 2
  coordination: zero_coordination
  template: perspective_split
  rationale: "Diversidade > Eficiência"

complexity_11_to_20:
  agent_count: 3-4
  coordination: minimal_coordination
  template: domain_split
  rationale: "Especialização com autonomia"

complexity_21_to_30:
  agent_count: 4-8
  coordination: structured_coordination
  template: hierarchical_split
  rationale: "Complexidade requer estrutura"

AUTO_OVERRIDES:
- Sempre mínimo 2 agentes (never single agent)
- User pode request agent count específico
- Emergency mode (1 agente só em casos críticos)
- Resource constraints podem reduzir count
```

### Componente 4: Execution Orchestrator
```yaml
FUNÇÃO: Coordenar a execução paralela dos agentes selecionados

EXECUTION_MODES:
parallel_independent:
  - Brief identical para todos agentes
  - Zero communication durante execução
  - Judge seleciona melhor output final
  - Maximum diversity approach

parallel_collaborative:
  - Briefings especializados complementares
  - Checkpoints de coordenação
  - Integration ao final
  - Balanced coordination approach

parallel_hierarchical:
  - Lead agent + specialist agents
  - Structured communication protocols
  - Phased execution com integration
  - Maximum coordination approach

MONITORING_CAPABILITIES:
- Real-time progress tracking
- Resource utilization monitoring
- Quality gate enforcement
- Automatic intervention triggers
```

---

## 🔄 Fluxo Principal de Execução

### Fase 1: Análise e Classificação (5-30 segundos)
```yaml
STEP 1.1 - INPUT_ANALYSIS:
actions:
  - Parse user input
  - Detect input_type (rough/specific/technical)
  - Calculate specificity_score (1-10)
  - Identify domain hints (web/mobile/AI/etc)

STEP 1.2 - COMPLEXITY_ESTIMATION:
actions:
  - Analyze technical complexity indicators
  - Estimate business impact scope
  - Identify integration requirements
  - Calculate preliminary complexity_score

STEP 1.3 - ELICITATION_PLANNING:
actions:
  - Select elicitation strategy
  - Generate initial question set
  - Estimate elicitation time needed
  - Prepare context accumulation structure

OUTPUT: elicitation_plan.yaml
```

### Fase 2: Elicitação Profunda (1-15 minutos)
```yaml
STEP 2.1 - ULTRATHINK_ACTIVATION:
process:
  - Load elicitation personas (investigador/analista/estrategista)
  - Activate deep questioning mode
  - Initialize context building
  - Start interactive elicitation session

STEP 2.2 - ADAPTIVE_QUESTIONING:
process:
  - Present questions conversationally
  - Adapt follow-ups based on answers
  - Build progressive understanding
  - Detect clarity improvement

STEP 2.3 - ELICITATION_SYNTHESIS:
process:
  - Synthesize all gathered information
  - Generate structured requirements
  - Validate understanding with user
  - Produce elicitation_summary

QUALITY_GATES:
- Clarity score >= 8/10
- All ambiguities resolved
- User confirms understanding
- Context sufficient for execution

OUTPUT: elicitation_summary.yaml com confidence_score
```

### Fase 3: Configuração de Agentes (10-60 segundos)
```yaml
STEP 3.1 - COMPLEXITY_REFINEMENT:
process:
  - Refine complexity score baseado na elicitação
  - Identify required specializations
  - Assess coordination needs
  - Calculate resource requirements

STEP 3.2 - AGENT_SELECTION:
process:
  - Apply configuration rules
  - Select optimal agent count (min 2)
  - Choose coordination strategy
  - Generate briefing templates

STEP 3.3 - EXECUTION_PLANNING:
process:
  - Create detailed execution plan
  - Set quality gates and checkpoints
  - Define success criteria
  - Prepare monitoring structure

USER_CONFIRMATION:
- Present agent configuration
- Explain rationale for choices
- Allow user adjustments
- Confirm before execution

OUTPUT: execution_config.yaml with agent assignments
```

### Fase 4: Execução Paralela (Tempo Variável)
```yaml
STEP 4.1 - AGENT_BRIEFING:
process:
  - Generate specialized briefings
  - Load agent contexts
  - Initialize communication channels
  - Launch agents simultaneously

STEP 4.2 - EXECUTION_MONITORING:
process:
  - Track progress per agent
  - Monitor resource utilization
  - Enforce quality gates
  - Handle conflicts/blockers

STEP 4.3 - COORDINATION_MANAGEMENT:
process:
  - Facilitate checkpoints (if configured)
  - Resolve conflicts automatically
  - Maintain context synchronization
  - Escalate issues when needed

REAL_TIME_ADAPTATION:
- Auto-adjust coordination level
- Add/remove agents if needed
- Modify timeline based on progress
- Handle emergency situations

OUTPUT: agent_outputs[] com metadata
```

### Fase 5: Avaliação e Seleção (30-120 segundos)
```yaml
STEP 5.1 - AUTOMATED_EVALUATION:
process:
  - Apply judge evaluation criteria
  - Score all agent outputs
  - Generate comparative analysis
  - Identify synthesis opportunities

STEP 5.2 - SELECTION_LOGIC:
process:
  - Rank outputs by score
  - Apply tie-breaking rules
  - Consider user preferences
  - Generate selection justification

STEP 5.3 - RESULT_PRESENTATION:
process:
  - Present selected solution
  - Explain selection rationale
  - Highlight key insights
  - Suggest next steps

FINAL_SYNTHESIS:
- Combine best elements if beneficial
- Create executive summary
- Document lessons learned
- Update system knowledge base

OUTPUT: final_solution with evaluation_report
```

---

## 🎭 Templates de Interação

### Template 1: Quick Start (Início Rápido)
```yaml
USER_INPUT: "Quero criar um sistema de blog"

WORKFLOW_RESPONSE:
"🧠 Analisando sua solicitação...
  Input Type: Rough Idea
  Complexity: Medium (estimated 12/30)
  Elicitação Deep Mode: Ativado

  Vou fazer algumas perguntas para entender exatamente o que você precisa:

  1. Qual é o público-alvo do seu blog? (pessoal/profissional/empresarial)
  2. Quantos autores vão publicar conteúdo? (1 pessoa / equipe pequena / equipe grande)
  3. Há necessidades específicas além de posts básicos? (comentários/SEO/analytics)
  ..."

AUTO_CONFIGURATION:
"📊 Baseado nas suas respostas:
  Complexidade Final: 15/30
  Configuração: 3 agentes especializados
  - Agent 1: Frontend/UX Specialist
  - Agent 2: Backend/CMS Specialist
  - Agent 3: DevOps/Deployment Specialist

  Coordenação: Colaborativa com checkpoints
  Tempo Estimado: 45-60 minutos

  Pode prosseguir? (sim/ajustar configuração/mais detalhes)"
```

### Template 2: Technical Request (Solicitação Técnica)
```yaml
USER_INPUT: "Implementar autenticação JWT em API Node.js existente"

WORKFLOW_RESPONSE:
"🔧 Detectando contexto técnico...
  Input Type: Specific Technical
  Complexity: Low-Medium (estimated 8/30)
  Elicitação Light Mode: Ativado

  Algumas perguntas rápidas para configurar corretamente:

  1. Qual framework está usando? (Express/Fastify/NestJS/outro)
  2. Onde vão armazenar users? (database existente/novo/serviço externo)
  3. Há requirements de segurança específicos? (refresh tokens/rate limiting)
  ..."

AUTO_CONFIGURATION:
"⚙️ Configuração Recomendada:
  Complexidade Final: 9/30
  Configuração: 2 agentes paralelos
  - Agent 1: Security-first approach
  - Agent 2: Implementation-first approach

  Coordenação: Zero (comparação final)
  Tempo Estimado: 20-30 minutos

  Executar? (sim/modificar/detalhes)"
```

### Template 3: Emergency Mode (Modo Emergência)
```yaml
USER_INPUT: "Bug crítico em produção, API retornando 500"

WORKFLOW_RESPONSE:
"🚨 MODO EMERGÊNCIA DETECTADO
  Input Type: Critical Bug
  Complexity: Variable
  Elicitação: Minimal Mode

  1. Quando começou? (agora/hoje/ontem)
  2. Que endpoints afetados? (todos/específicos)
  3. Logs/stack trace disponível? (sim/não/parcial)

AUTO_EMERGENCY_CONFIG:
  Configuração: 2 agentes diagnóstico paralelo
  - Agent 1: Root Cause Analysis
  - Agent 2: Immediate Mitigation

  Tempo Target: 15 minutos
  Prioridade: Máxima

  INICIANDO DIAGNÓSTICO IMEDIATO..."
```

---

## 📊 Sistema de Métricas e Aprendizado

### Métricas de Workflow Performance
```yaml
ELICITATION_METRICS:
clarity_improvement:
  baseline: Initial clarity score (1-10)
  target: Final clarity >= 8
  measurement: Delta improvement

time_to_clarity:
  baseline: Elicitation start
  target: Clarity achieved
  measurement: Minutes to sufficient clarity

user_satisfaction:
  baseline: User confusion/frustration
  target: User confidence in understanding
  measurement: Self-reported satisfaction (1-10)

EXECUTION_METRICS:
agent_utilization:
  baseline: Agent idle time
  target: >80% active work time
  measurement: Active time / Total time

coordination_efficiency:
  baseline: Coordination overhead
  target: <20% of total execution time
  measurement: Coordination time / Total time

quality_consistency:
  baseline: Score variation between agents
  target: <2 points standard deviation
  measurement: Std dev of agent scores
```

### Sistema de Aprendizado Adaptativo
```yaml
PATTERN_RECOGNITION:
successful_configurations:
  - Track: input patterns → optimal configurations
  - Learn: Which agent counts work best for which problems
  - Adapt: Auto-suggest proven configurations

elicitation_optimization:
  - Track: question patterns → clarity achievement
  - Learn: Which questions most effective per domain
  - Adapt: Dynamic question generation improvement

coordination_tuning:
  - Track: coordination strategy → output quality
  - Learn: Optimal coordination level per problem type
  - Adapt: Auto-adjust coordination recommendations

FEEDBACK_LOOPS:
user_corrections:
  - When user adjusts recommended configuration
  - Learn from adjustments and rationale
  - Improve future recommendations

output_ratings:
  - User satisfaction with final results
  - Correlate with configuration choices
  - Refine selection algorithms

performance_tracking:
  - Actual time vs estimated time
  - Resource usage vs predictions
  - Adjust estimation algorithms
```

---

## 🔧 Configuration Management

### User Preferences System
```yaml
PREFERENCE_CATEGORIES:
communication_style:
  - verbose: Detailed explanations
  - concise: Brief summaries
  - technical: Focus on technical details
  - business: Focus on business impact

agent_preferences:
  - min_agents: User-defined minimum (default 2)
  - max_agents: User-defined maximum (default 8)
  - preferred_coordination: User's preferred coordination style
  - specialization_bias: Preference for generalists vs specialists

workflow_preferences:
  - elicitation_depth: User's tolerance for questions
  - auto_execution: Preference for auto vs manual confirmation
  - emergency_mode_threshold: When to trigger emergency mode
  - quality_vs_speed: Bias toward quality or speed

LEARNING_USER_PATTERNS:
- Track user's typical adjustments
- Learn user's domain expertise level
- Adapt default recommendations
- Personalize interaction style
```

### System Configuration
```yaml
RESOURCE_MANAGEMENT:
agent_pool_size: Maximum concurrent agents
coordination_channels: Number of communication channels
context_memory_limit: Maximum context size per agent
execution_timeout: Maximum execution time per agent

QUALITY_THRESHOLDS:
minimum_clarity_score: 6 (emergency) / 8 (normal)
minimum_agent_score: 5 (emergency) / 7 (normal)
maximum_score_variance: 3 points between agents
confidence_threshold: 80% for auto-execution

ESCALATION_RULES:
human_oversight_triggers:
  - All agents score below threshold
  - User dissatisfaction above threshold
  - Resource exhaustion
  - Repeated failures on same problem type

fallback_strategies:
  - Single agent mode (emergency only)
  - Human expert consultation
  - External tool integration
  - Graceful degradation with partial results
```

---

## 🚨 Emergency Protocols e Failsafes

### Emergency Detection
```yaml
CRITICAL_SITUATIONS:
production_down:
  triggers: ["critical bug", "outage", "security breach"]
  response: Emergency mode with minimal elicitation
  agents: 2 specialists (diagnosis + mitigation)
  timeline: <15 minutes target

deadline_pressure:
  triggers: ["urgent delivery", "demo tomorrow", "deadline today"]
  response: Speed mode with reduced quality gates
  agents: 2-3 with accelerated coordination
  timeline: Match user deadline

resource_exhaustion:
  triggers: ["agent pool full", "timeout risks", "memory limits"]
  response: Single agent fallback or queue management
  agents: Best available configuration
  timeline: Extended but guaranteed

INTERVENTION_PROTOCOLS:
auto_intervention:
  - Stuck agents (no progress 30+ minutes)
  - Quality below emergency thresholds
  - User frustration indicators
  - Resource utilization critical

human_escalation:
  - Repeated failures on same problem
  - User explicitly requests human help
  - System confidence below 50%
  - Safety/security concerns detected
```

### Failsafe Mechanisms
```yaml
GRACEFUL_DEGRADATION:
Level 1: Reduce agent count but maintain quality
Level 2: Reduce coordination but maintain agents
Level 3: Single best agent with human oversight
Level 4: Human takeover with system assistance

RECOVERY_PROTOCOLS:
partial_success:
  - Deliver best available results
  - Clearly communicate limitations
  - Provide continuation pathway
  - Learn from partial failure

complete_failure:
  - Immediate human escalation
  - Full context preservation
  - Root cause analysis
  - System improvement pipeline

STATE_PRESERVATION:
- All intermediate results saved
- Context always recoverable
- User can resume from any point
- Learning captured even from failures
```

---

## 🎯 Integration Points

### External Systems
```yaml
CLAUDE_CODE_INTEGRATION:
- Utilize Claude Code's agent system
- Leverage existing tool ecosystem
- Maintain compatibility with workflows
- Enhance rather than replace existing capabilities

KNOWLEDGE_BASE_INTEGRATION:
- Access PRISMA knowledge repository
- Update knowledge based on learnings
- Cross-reference successful patterns
- Maintain institutional memory

USER_WORKSPACE_INTEGRATION:
- Understand existing project structure
- Respect established conventions
- Integrate with existing tools
- Minimize workflow disruption
```

### API Endpoints
```yaml
WORKFLOW_APIS:
POST /workflow/start:
  input: user_request, preferences
  output: workflow_id, elicitation_questions

POST /workflow/elicit:
  input: workflow_id, answers
  output: updated_questions, completion_status

POST /workflow/configure:
  input: workflow_id, agent_preferences
  output: execution_plan, confirmation_required

POST /workflow/execute:
  input: workflow_id, execution_confirmation
  output: execution_status, progress_tracking

GET /workflow/status/{id}:
  output: current_status, agent_progress, intermediate_results

GET /workflow/results/{id}:
  output: final_results, evaluation_report, next_steps
```

---

**O PRISMA Workflow Starter é o cérebro central que coordena elicitação profunda, sistema de juízes automático e execução paralela, garantindo que cada projeto seja executado com máxima inteligência e eficiência.**