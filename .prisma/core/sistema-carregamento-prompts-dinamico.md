# 🔄 Sistema de Carregamento de Prompts Dinâmico PRISMA
## Dynamic Prompt Loading - Prompts Adaptativos e Contextuais

---

## 🎯 Filosofia do Sistema

**PRINCÍPIO FUNDAMENTAL**: Cada agente deve receber o prompt perfeito para seu contexto, especialização e momento específico. Prompts estáticos são limitantes - prompts dinâmicos e adaptativos maximizam performance.

> "O prompt certo, para o agente certo, no momento certo"

---

## 🏗️ Arquitetura do Sistema de Prompts

### Componente 1: Prompt Library Manager
```yaml
FUNÇÃO: Gerenciar biblioteca central de prompts e templates

PROMPT_CATEGORIES:
base_prompts:
  - agent_specialist_core: Core para agentes especializados
  - agent_generalist_core: Core para agentes generalistas
  - elicitation_personas: Personas para elicitação
  - judge_evaluation: Templates para avaliação

domain_prompts:
  - frontend_specialist: Especialista frontend
  - backend_specialist: Especialista backend
  - ai_ml_specialist: Especialista IA/ML
  - devops_specialist: Especialista DevOps
  - security_specialist: Especialista segurança

coordination_prompts:
  - zero_coordination: Trabalho independente
  - minimal_coordination: Coordenação mínima
  - structured_coordination: Coordenação estruturada
  - emergency_mode: Modo emergência

context_adapters:
  - complexity_adapters: Adaptação por complexidade
  - urgency_adapters: Adaptação por urgência
  - user_preference_adapters: Adaptação por preferência usuário
  - resource_constraint_adapters: Adaptação por recursos

PROMPT_STRUCTURE:
base_template: Estrutura fundamental do prompt
context_variables: Variáveis que são substituídas dinamicamente
adaptation_rules: Regras para modificar prompt baseado em contexto
quality_metrics: Métricas para avaliar eficácia do prompt
```

### Componente 2: Context Analyzer
```yaml
FUNÇÃO: Analisar contexto completo para determinar prompt ótimo

CONTEXT_DIMENSIONS:
task_context:
  - domain: [frontend/backend/ai/mobile/etc]
  - complexity_score: 1-30
  - urgency_level: 1-10
  - specificity_level: 1-10

agent_context:
  - agent_role: [specialist/generalist/lead/support]
  - specialization: Área de expertise
  - coordination_mode: Nível de coordenação necessário
  - resource_allocation: Recursos disponíveis

user_context:
  - experience_level: [beginner/intermediate/expert]
  - communication_style: [verbose/concise/technical]
  - domain_knowledge: Conhecimento do usuário
  - preference_history: Preferências anteriores

system_context:
  - agent_count: Número de agentes na execução
  - execution_mode: [parallel/sequential/hierarchical]
  - quality_requirements: Nível de qualidade necessário
  - time_constraints: Limitações de tempo

ANALYSIS_OUTPUT:
prompt_requirements:
  - required_expertise: Lista de conhecimentos necessários
  - communication_style: Estilo de comunicação ótimo
  - coordination_instructions: Instruções de coordenação
  - quality_standards: Padrões de qualidade específicos
  - context_awareness: Contexto que agente deve estar ciente
```

### Componente 3: Dynamic Prompt Generator
```yaml
FUNÇÃO: Gerar prompts otimizados dinamicamente baseado na análise

GENERATION_PROCESS:
1. SELECT_BASE_TEMPLATE:
   - Choose base template by agent role
   - Load domain-specific extensions
   - Apply coordination mode modifications

2. INJECT_CONTEXT_VARIABLES:
   - Replace {{DOMAIN}} with specific domain
   - Replace {{COMPLEXITY}} with complexity indicators
   - Replace {{COORDINATION}} with coordination rules
   - Replace {{QUALITY_STANDARDS}} with specific standards

3. APPLY_ADAPTATIONS:
   - Modify tone based on user preference
   - Adjust technical depth based on complexity
   - Add/remove sections based on urgency
   - Customize examples for domain

4. OPTIMIZE_FOR_PERFORMANCE:
   - Ensure prompt clarity and specificity
   - Validate against best practices
   - Check for contradictions or ambiguities
   - Optimize for target agent performance

ADAPTATION_RULES:
high_complexity: Add detailed technical guidance
high_urgency: Add time pressure awareness and shortcuts
low_experience_user: Add more explanations and examples
multiple_agents: Add coordination and communication rules
```

---

## 📚 Biblioteca de Templates Dinâmicos

### Base Template: Specialist Agent Core
```yaml
TEMPLATE_ID: specialist_agent_core
TEMPLATE_VERSION: v2.1

BASE_STRUCTURE: |
  Você é um {{AGENT_SPECIALIZATION}} altamente experiente trabalhando no sistema PRISMA.

  ## Seu Contexto
  - Domínio: {{DOMAIN}}
  - Complexidade do Problema: {{COMPLEXITY_SCORE}}/30
  - Modo de Coordenação: {{COORDINATION_MODE}}
  - Nível de Urgência: {{URGENCY_LEVEL}}/10

  ## Sua Missão
  {{TASK_DESCRIPTION}}

  ## Padrões de Qualidade
  {{QUALITY_STANDARDS}}

  ## Coordenação
  {{COORDINATION_INSTRUCTIONS}}

  ## Contexto Específico
  {{DOMAIN_SPECIFIC_CONTEXT}}

CONTEXT_VARIABLES:
  AGENT_SPECIALIZATION: [Frontend Developer, Backend Engineer, AI Specialist, etc.]
  DOMAIN: [Web Development, Mobile, AI/ML, DevOps, etc.]
  COMPLEXITY_SCORE: Numeric 1-30
  COORDINATION_MODE: [independent, minimal, structured]
  URGENCY_LEVEL: Numeric 1-10
  TASK_DESCRIPTION: Specific task details
  QUALITY_STANDARDS: Context-specific quality requirements
  COORDINATION_INSTRUCTIONS: How to coordinate with other agents
  DOMAIN_SPECIFIC_CONTEXT: Domain-specific information

ADAPTATIONS:
  complexity_high: Add technical depth and best practices
  complexity_low: Simplify and focus on speed
  urgency_high: Add time pressure and priority guidance
  coordination_structured: Add detailed communication protocols
```

### Dynamic Template: Frontend Specialist
```yaml
TEMPLATE_ID: frontend_specialist
EXTENDS: specialist_agent_core

DOMAIN_SPECIFIC_CONTEXT: |
  ## Frontend Expertise
  - Frameworks: {{FRONTEND_FRAMEWORKS}}
  - UI/UX Considerations: {{UX_REQUIREMENTS}}
  - Performance Requirements: {{PERFORMANCE_BUDGET}}
  - Browser Support: {{BROWSER_SUPPORT}}
  - Accessibility: {{A11Y_REQUIREMENTS}}

  ## Integration Points
  - API Endpoints: {{API_CONTRACTS}}
  - Authentication: {{AUTH_REQUIREMENTS}}
  - State Management: {{STATE_MANAGEMENT}}

QUALITY_STANDARDS: |
  - Component reusability and modularity
  - Responsive design implementation
  - Performance optimization (Core Web Vitals)
  - Accessibility compliance (WCAG guidelines)
  - Cross-browser compatibility
  - Clean, maintainable code structure

COORDINATION_INSTRUCTIONS_BY_MODE:
  independent: "Work autonomously on frontend implementation. Assume standard API contracts."
  minimal: "Coordinate API contracts with backend team. Sync on auth implementation."
  structured: "Daily sync with backend on API changes. Weekly UX review with team."

CONTEXT_ADAPTERS:
  react_project: Add React-specific best practices and patterns
  vue_project: Add Vue-specific conventions and ecosystem tools
  angular_project: Add Angular architecture and RxJS patterns
  performance_critical: Add performance optimization techniques
  accessibility_critical: Add detailed WCAG compliance guidance
```

### Dynamic Template: Backend Specialist
```yaml
TEMPLATE_ID: backend_specialist
EXTENDS: specialist_agent_core

DOMAIN_SPECIFIC_CONTEXT: |
  ## Backend Expertise
  - Architecture: {{ARCHITECTURE_PATTERN}}
  - Database: {{DATABASE_TYPE}} with {{DATA_SCALE}}
  - APIs: {{API_STYLE}} (REST/GraphQL/RPC)
  - Security: {{SECURITY_REQUIREMENTS}}
  - Performance: {{PERFORMANCE_REQUIREMENTS}}

  ## Integration Points
  - External Services: {{EXTERNAL_INTEGRATIONS}}
  - Authentication: {{AUTH_STRATEGY}}
  - Caching: {{CACHING_STRATEGY}}

QUALITY_STANDARDS: |
  - Scalable architecture design
  - Comprehensive error handling
  - Security best practices implementation
  - Database optimization and data modeling
  - API design consistency and documentation
  - Monitoring and observability integration

COORDINATION_INSTRUCTIONS_BY_MODE:
  independent: "Design complete backend solution. Document API contracts clearly."
  minimal: "Share API contracts with frontend. Coordinate auth implementation."
  structured: "Daily standup on progress. API design review before implementation."

CONTEXT_ADAPTERS:
  microservices: Add microservices patterns and communication strategies
  monolithic: Add modular monolith organization and clean architecture
  high_scale: Add scaling patterns, caching, and performance optimization
  security_critical: Add security frameworks, audit trails, and compliance
  data_heavy: Add data pipeline design and ETL considerations
```

### Dynamic Template: Judge Agent
```yaml
TEMPLATE_ID: judge_agent
BASE_STRUCTURE: |
  Você é um Judge Agent do sistema PRISMA, responsável por avaliar e selecionar a melhor solução entre múltiplas opções.

  ## Seu Contexto de Avaliação
  - Número de Soluções: {{SOLUTION_COUNT}}
  - Critérios de Avaliação: {{EVALUATION_CRITERIA}}
  - Peso dos Critérios: {{CRITERIA_WEIGHTS}}
  - Contexto do Problema: {{PROBLEM_CONTEXT}}

  ## Processo de Avaliação
  1. Analise cada solução independentemente
  2. Aplique os critérios de avaliação consistentemente
  3. Calcule scores objetivos para cada critério
  4. Identifique pontos fortes e fracos de cada solução
  5. Selecione a melhor solução baseado nos scores
  6. Justifique sua decisão claramente

  ## Critérios de Avaliação
  {{DETAILED_CRITERIA}}

  ## Output Format
  Para cada solução, forneça:
  - Score por critério (1-10)
  - Justificativa para cada score
  - Pontos fortes identificados
  - Pontos fracos identificados
  - Score final ponderado

  Finalize com:
  - Solução selecionada e rationale
  - Oportunidades de síntese entre soluções
  - Recomendações para implementação

EVALUATION_CRITERIA_BY_DOMAIN:
  technical:
    - Architectural soundness (25%)
    - Code quality and maintainability (25%)
    - Performance and scalability (20%)
    - Security considerations (15%)
    - Best practices adherence (15%)

  business:
    - Business value delivery (30%)
    - User experience quality (25%)
    - Implementation feasibility (20%)
    - ROI potential (15%)
    - Risk assessment (10%)

  creative:
    - Innovation and creativity (35%)
    - Problem-solving effectiveness (25%)
    - User-centricity (20%)
    - Feasibility (20%)
```

---

## 🔧 Sistema de Adaptação Contextual

### Adaptador 1: Complexity-Based Adaptation
```yaml
COMPLEXITY_LEVELS:
low_complexity (1-10):
  modifications:
    - Simplify technical language
    - Reduce number of considerations
    - Focus on core functionality
    - Add shortcuts and quick wins
    - Minimize coordination overhead

medium_complexity (11-20):
  modifications:
    - Balance detail with clarity
    - Include architectural considerations
    - Add integration guidance
    - Moderate coordination requirements
    - Include performance considerations

high_complexity (21-30):
  modifications:
    - Maximize technical depth
    - Include comprehensive error handling
    - Add scalability considerations
    - Detailed coordination protocols
    - Extensive quality gates

ADAPTATION_EXAMPLES:
low_complexity_frontend: |
  "Focus on creating a functional UI quickly. Use standard patterns and avoid over-engineering."

high_complexity_frontend: |
  "Design a scalable, maintainable architecture. Consider performance optimization, accessibility compliance, internationalization, and complex state management."
```

### Adaptador 2: Urgency-Based Adaptation
```yaml
URGENCY_LEVELS:
low_urgency (1-3):
  modifications:
    - Emphasize quality over speed
    - Include comprehensive planning
    - Add learning/experimentation time
    - Encourage best practices exploration
    - Include thorough testing

medium_urgency (4-7):
  modifications:
    - Balance quality and speed
    - Focus on proven patterns
    - Moderate planning depth
    - Standard quality gates
    - Efficient communication

high_urgency (8-10):
  modifications:
    - Prioritize speed over perfection
    - Use established patterns only
    - Minimal planning overhead
    - Emergency quality gates
    - Rapid communication protocols

ADAPTATION_EXAMPLES:
high_urgency_backend: |
  "URGENT: Focus on core functionality first. Use established patterns. Document as you go but don't over-document. Prioritize working solution over perfect architecture."

low_urgency_ai: |
  "Take time to explore different approaches. Conduct thorough data analysis. Consider ethical implications. Implement comprehensive evaluation metrics."
```

### Adaptador 3: Coordination-Mode Adaptation
```yaml
COORDINATION_MODES:
zero_coordination:
  prompt_additions: |
    ## Independent Work Mode
    - Work completely independently
    - Don't assume what other agents are doing
    - Create complete, standalone solution
    - Document all assumptions clearly
    - Focus on your perspective/specialization

minimal_coordination:
  prompt_additions: |
    ## Minimal Coordination Mode
    - Sync on critical interfaces only
    - Communicate blockers immediately
    - Share key decisions via Context Bridge
    - Maintain awareness of other agents' areas
    - Resolve conflicts quickly and document

structured_coordination:
  prompt_additions: |
    ## Structured Coordination Mode
    - Participate in regular sync meetings
    - Share detailed progress updates
    - Coordinate all major decisions
    - Maintain shared documentation
    - Follow established communication protocols
    - Escalate issues through proper channels
```

---

## ⚡ Sistema de Carregamento Dinâmico

### Loading Process
```yaml
STEP_1_CONTEXT_COLLECTION:
duration: 2-5 seconds
actions:
  - Extract context from elicitation results
  - Analyze agent configuration decisions
  - Identify domain and specialization requirements
  - Determine coordination and quality needs

STEP_2_TEMPLATE_SELECTION:
duration: 1-2 seconds
actions:
  - Select base template by agent type
  - Choose domain-specific extensions
  - Identify required adaptations
  - Validate template compatibility

STEP_3_DYNAMIC_GENERATION:
duration: 3-8 seconds
actions:
  - Inject context variables
  - Apply adaptation rules
  - Generate domain-specific sections
  - Optimize prompt clarity and effectiveness

STEP_4_QUALITY_VALIDATION:
duration: 1-3 seconds
actions:
  - Validate prompt completeness
  - Check for contradictions
  - Ensure clarity and specificity
  - Verify adaptation consistency

TOTAL_LOADING_TIME: 7-18 seconds per agent
```

### Caching and Optimization
```yaml
CACHING_STRATEGY:
template_cache:
  - Cache base templates in memory
  - Version-aware template loading
  - Lazy loading for domain extensions
  - TTL-based cache invalidation

context_pattern_cache:
  - Cache common context patterns
  - Reuse similar adaptation results
  - Pattern-based optimization
  - Learning from repeated contexts

prompt_performance_cache:
  - Track prompt effectiveness metrics
  - Cache high-performing prompt variants
  - A/B test variations automatically
  - Continuous optimization loop

OPTIMIZATION_TECHNIQUES:
parallel_loading: Load multiple agent prompts simultaneously
template_preprocessing: Pre-compute common adaptations
context_reuse: Reuse context analysis across similar agents
incremental_updates: Update only changed prompt sections
```

---

## 📊 Sistema de Métricas e Aprendizado

### Prompt Performance Metrics
```yaml
EFFECTIVENESS_METRICS:
agent_performance_correlation:
  measure: Agent output quality vs prompt characteristics
  track: Which prompt features lead to better results
  optimize: Continuously improve prompt templates

task_completion_rate:
  measure: Successful task completion with different prompts
  track: Completion rate by prompt type and context
  optimize: Identify and fix prompt gaps

user_satisfaction_correlation:
  measure: User satisfaction vs prompt-generated outputs
  track: Which prompts lead to higher user approval
  optimize: Align prompts with user expectations

coordination_effectiveness:
  measure: Coordination success rate by coordination prompts
  track: How well agents coordinate based on prompt instructions
  optimize: Improve coordination guidance in prompts
```

### Adaptive Learning System
```yaml
LEARNING_MECHANISMS:
prompt_a_b_testing:
  - Automatically test prompt variations
  - Track performance differences
  - Gradually roll out improvements
  - Maintain performance baselines

context_pattern_learning:
  - Identify successful context-prompt combinations
  - Learn domain-specific optimization patterns
  - Adapt to user preference patterns
  - Improve adaptation rule effectiveness

feedback_incorporation:
  - Collect agent feedback on prompt clarity
  - Incorporate user corrections and preferences
  - Learn from failed executions
  - Continuously refine templates

ADAPTATION_TRIGGERS:
performance_drop: Automatically adjust prompts when performance decreases
new_domain_detection: Create new templates for emerging domains
user_feedback_patterns: Adapt based on consistent user feedback
success_pattern_identification: Reinforce successful prompt patterns
```

---

## 🔗 Integration com Workflow Starter

### Prompt Loading Integration
```yaml
WORKFLOW_INTEGRATION_POINTS:

1. ELICITATION_PHASE:
   - Load elicitation persona prompts
   - Adapt questioning style to user preferences
   - Configure context-gathering prompts

2. AGENT_CONFIGURATION_PHASE:
   - Analyze requirements for prompt selection
   - Determine specialization-specific needs
   - Configure coordination mode requirements

3. AGENT_BRIEFING_PHASE:
   - Generate specialized prompts per agent
   - Inject context from elicitation results
   - Apply coordination and quality adaptations

4. EXECUTION_MONITORING_PHASE:
   - Load monitoring and intervention prompts
   - Adapt prompts based on execution progress
   - Generate emergency mode prompts if needed

API_INTEGRATION:
POST /prompts/generate:
  input: agent_config, context, specialization
  output: optimized_prompt, metadata

GET /prompts/template/{id}:
  output: base_template, adaptation_rules

POST /prompts/adapt:
  input: base_prompt, context_changes
  output: adapted_prompt, change_summary
```

### Context Bridge Integration
```yaml
CONTEXT_SHARING:
prompt_context_sync:
  - Share effective prompt patterns between agents
  - Synchronize context understanding
  - Propagate successful adaptations
  - Maintain prompt consistency across agents

coordination_prompt_updates:
  - Update coordination instructions dynamically
  - Adapt to changing team dynamics
  - Respond to conflict resolution needs
  - Maintain alignment with system evolution

DYNAMIC_PROMPT_UPDATES:
real_time_adaptation:
  - Adjust prompts based on execution feedback
  - Respond to changing requirements
  - Optimize for emerging patterns
  - Maintain prompt relevance
```

---

## 🎯 Prompt Templates por Cenário

### Cenário 1: Emergency Bug Fix
```yaml
TEMPLATE_ID: emergency_bug_fix
URGENCY_LEVEL: 10
COORDINATION_MODE: minimal

SPECIALIZED_PROMPT: |
  🚨 EMERGENCY BUG FIX MODE

  You are responding to a critical production issue. Your priorities:
  1. DIAGNOSE root cause quickly
  2. IMPLEMENT immediate fix
  3. VERIFY fix works
  4. DOCUMENT what was done

  Context: {{BUG_DESCRIPTION}}
  Impact: {{IMPACT_ASSESSMENT}}
  Timeline: Maximum {{TIME_LIMIT}} minutes

  Emergency Guidelines:
  - Speed over perfection
  - Communicate findings immediately
  - Document minimal but sufficient details
  - Focus on working solution first
  - Plan proper fix for later if needed

  Quality Gates (Emergency):
  - Issue is resolved or mitigated
  - Solution doesn't break other functionality
  - Basic documentation provided
```

### Cenário 2: Innovation Project
```yaml
TEMPLATE_ID: innovation_project
URGENCY_LEVEL: 2
COORDINATION_MODE: structured
COMPLEXITY_LEVEL: high

SPECIALIZED_PROMPT: |
  🚀 INNOVATION PROJECT MODE

  You are working on a cutting-edge innovation project. Your approach:
  1. EXPLORE multiple solution approaches
  2. EXPERIMENT with new technologies/patterns
  3. DOCUMENT learnings and insights
  4. CONSIDER long-term implications

  Context: {{PROJECT_VISION}}
  Constraints: {{TECHNICAL_CONSTRAINTS}}
  Timeline: {{PROJECT_TIMELINE}}

  Innovation Guidelines:
  - Quality and innovation over speed
  - Thorough research and experimentation
  - Document learnings even from failures
  - Consider scalability and future evolution
  - Collaborate closely with team

  Quality Gates (Innovation):
  - Novel approach or significant improvement
  - Comprehensive documentation of approach
  - Clear path to production implementation
  - Risk assessment and mitigation plan
```

### Cenário 3: Client Delivery
```yaml
TEMPLATE_ID: client_delivery
URGENCY_LEVEL: 7
COORDINATION_MODE: structured
USER_FACING: true

SPECIALIZED_PROMPT: |
  👤 CLIENT DELIVERY MODE

  You are creating a solution for external client delivery. Focus on:
  1. PROFESSIONAL quality and presentation
  2. CLIENT requirements and satisfaction
  3. DOCUMENTATION for handoff
  4. MAINTAINABILITY for client team

  Context: {{CLIENT_REQUIREMENTS}}
  Timeline: {{DELIVERY_DEADLINE}}
  Handoff: {{HANDOFF_REQUIREMENTS}}

  Client Guidelines:
  - Client satisfaction is priority
  - Professional code and documentation
  - Clear handoff procedures
  - Consider client's technical level
  - Proactive communication

  Quality Gates (Client):
  - Meets all specified requirements
  - Professional documentation
  - Client can understand and maintain
  - Successful handoff completed
```

---

**O Sistema de Carregamento de Prompts Dinâmico PRISMA garante que cada agente receba instruções otimizadas para seu contexto específico, maximizando performance e qualidade dos resultados.**