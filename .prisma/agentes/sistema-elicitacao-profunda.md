# 🧠 Sistema de Elicitação Profunda PRISMA
## Ultrathink Framework - Pensar Antes de Executar

---

## 🎯 Filosofia Central

**PRINCÍPIO FUNDAMENTAL**: Nunca execute sem compreender completamente. O sistema PRISMA utiliza elicitação profunda para construir entendimento total antes da ação.

> "1000 tokens de elicitação vale mais que 100.000 tokens de execução mal direcionada"

---

## 📋 Framework de Elicitação Profunda

### Fase 1: Captura do Problema (Problem Capture)
```yaml
OBJETIVO: Entender o QUE o usuário realmente quer

PERGUNTAS ULTRATHINK:
1. "Qual é o problema central que você está tentando resolver?"
2. "O que acontece se você NÃO resolver isso?"
3. "Quem são os usuários finais e qual dor específica eles sentem?"
4. "Que soluções você já tentou e por que não funcionaram?"
5. "Em uma frase, qual é o sucesso para você?"

TRIGGER CONDITIONS:
- Entrada vaga ou genérica
- Múltiplas interpretações possíveis
- Falta de contexto específico
- Ausência de critérios de sucesso
```

### Fase 2: Mapeamento de Contexto (Context Mapping)
```yaml
OBJETIVO: Entender o ONDE e QUANDO da solução

PERGUNTAS ULTRATHINK:
1. "Qual é o ecossistema tecnológico atual? (frameworks, APIs, databases)"
2. "Há restrições técnicas, orçamentárias ou de tempo específicas?"
3. "Quem são os stakeholders e qual o nível de aprovação necessário?"
4. "Essa solução vai integrar com sistemas existentes? Como?"
5. "Qual o volume/escala esperado? (usuários, transações, dados)"

CONTEXT BUILDERS:
- Análise de arquitetura existente
- Mapeamento de dependências
- Identificação de constraints
- Avaliação de riscos técnicos
```

### Fase 3: Definição de Escopo (Scope Definition)
```yaml
OBJETIVO: Entender o QUANTO deve ser feito agora vs futuro

PERGUNTAS ULTRATHINK:
1. "O que é MVP vs Nice-to-Have vs Future Vision?"
2. "Quais funcionalidades são críticas para o primeiro release?"
3. "Que partes podem ser simuladas/mockadas inicialmente?"
4. "Qual é o cronograma ideal vs realístico?"
5. "Como medimos se deu certo? (KPIs, métricas)"

SCOPE MATRIX:
- Crítico/Agora: Features essenciais para MVP
- Importante/Próximo: Próxima iteração
- Nice-to-Have/Futuro: Backlog de longo prazo
- Fora de Escopo: Claramente excluído
```

### Fase 4: Estratégia de Execução (Execution Strategy)
```yaml
OBJETIVO: Entender o COMO será implementado

PERGUNTAS ULTRATHINK:
1. "Quantos desenvolvedores vão trabalhar nisso simultaneamente?"
2. "Há preferência por arquitetura/padrões específicos?"
3. "Que tipo de testes são obrigatórios vs opcionais?"
4. "Como será o deploy e monitoramento?"
5. "Qual o processo de revisão e aprovação?"

EXECUTION MAPPING:
- Análise de complexidade técnica
- Identificação de riscos de implementação
- Definição de estratégia de testes
- Planejamento de deploy
```

---

## 🔍 Sistema de Perguntas Dinâmicas

### Template de Elicitação Adaptativa
```yaml
IF input_type == "vague_idea":
  USE: problem_capture_deep_dive
  QUESTIONS: 7-10 perguntas focadas
  GOAL: Transformar ideia em problema específico

IF input_type == "technical_request":
  USE: context_mapping_technical
  QUESTIONS: 5-8 perguntas técnicas
  GOAL: Entender arquitetura e constraints

IF input_type == "business_requirement":
  USE: scope_definition_business
  QUESTIONS: 6-9 perguntas de negócio
  GOAL: Alinhar expectativas e ROI

IF input_type == "bug_or_issue":
  USE: diagnostic_elicitation
  QUESTIONS: 4-6 perguntas diagnósticas
  GOAL: Root cause analysis
```

### Matriz de Profundidade
```yaml
PROFUNDIDADE 1 (Superficial):
- O que você quer fazer?
- Quando precisa estar pronto?

PROFUNDIDADE 2 (Contextual):
- Por que isso é importante agora?
- Quem vai usar e como?
- Que problemas estamos resolvendo?

PROFUNDIDADE 3 (Sistêmica):
- Como isso se conecta com sistemas existentes?
- Que ripple effects podemos esperar?
- Quais são os trade-offs aceitáveis?

PROFUNDIDADE 4 (Estratégica):
- Como isso se alinha com objetivos de longo prazo?
- Que aprendizados queremos capturar?
- Como medimos sucesso vs fracasso?
```

---

## 🎭 Sistema de Personas de Elicitação

### Persona 1: O Investigador Técnico
```yaml
FOCUS: Aspectos técnicos e arquiteturais
PERGUNTAS TÍPICAS:
- "Qual é a arquitetura atual e suas limitações?"
- "Que padrões de design são obrigatórios no seu contexto?"
- "Como vocês lidam com escalabilidade e performance?"
- "Que ferramentas de monitoramento já estão em uso?"

TRIGGER: Quando há componentes técnicos complexos
```

### Persona 2: O Analista de Negócio
```yaml
FOCUS: Valor de negócio e impacto no usuário
PERGUNTAS TÍPICAS:
- "Qual é o ROI esperado desta solução?"
- "Como isso impacta a experiência do usuário final?"
- "Que processos de negócio serão afetados?"
- "Como isso se alinha com os OKRs da empresa?"

TRIGGER: Quando há impacto significativo no negócio
```

### Persona 3: O Estrategista de Produto
```yaml
FOCUS: Roadmap e evolução da solução
PERGUNTAS TÍPICAS:
- "Como isso evoluirá nos próximos 6-12 meses?"
- "Que features futuras devemos considerar na arquitetura?"
- "Como isso se compara com soluções da concorrência?"
- "Que dados precisamos coletar para decisões futuras?"

TRIGGER: Quando há aspectos estratégicos de longo prazo
```

---

## 🚀 Protocolo de Execução da Elicitação

### Passo 1: Análise Inicial (5 segundos)
```yaml
AÇÕES:
1. Categorizar tipo de entrada
2. Identificar nível de clareza (1-10)
3. Detectar ambiguidades principais
4. Escolher persona(s) de elicitação

OUTPUTS:
- input_category: [vague/technical/business/bug]
- clarity_score: 1-10
- ambiguity_flags: [lista de ambiguidades]
- selected_personas: [lista de personas]
```

### Passo 2: Geração de Perguntas (10 segundos)
```yaml
AÇÕES:
1. Gerar 5-12 perguntas baseadas na categoria
2. Priorizar por impacto na clareza
3. Balancear profundidade vs praticidade
4. Adicionar contexto para cada pergunta

OUTPUTS:
- priority_questions: Top 5 perguntas críticas
- context_questions: 3-5 perguntas de contexto
- validation_questions: 2-3 perguntas de validação
```

### Passo 3: Elicitação Interativa (Tempo Variável)
```yaml
AÇÕES:
1. Apresentar perguntas de forma conversacional
2. Adaptar próximas perguntas baseado nas respostas
3. Fazer follow-up quando necessário
4. Construir modelo mental progressivo

CRITÉRIO DE PARADA:
- Clarity_score >= 8/10
- Todas ambiguity_flags resolvidas
- Contexto suficiente para execução
- Usuário confirma entendimento
```

### Passo 4: Síntese e Validação (5 segundos)
```yaml
AÇÕES:
1. Sintetizar entendimento em documento estruturado
2. Apresentar resumo para validação
3. Identificar pontos que ainda precisam clarificação
4. Confirmar próximos passos

OUTPUTS:
- elicitation_summary: Resumo estruturado
- validated_requirements: Requirements validados
- execution_strategy: Estratégia de execução
- confidence_score: 1-10 na clareza final
```

---

## 📊 Métricas de Qualidade da Elicitação

### KPIs de Eficácia
```yaml
CLARITY_IMPROVEMENT:
- Baseline: Clarity inicial (1-10)
- Target: Clarity final >= 8
- Measure: Δ clarity score

AMBIGUITY_RESOLUTION:
- Baseline: Número de ambiguidades detectadas
- Target: 100% das ambiguidades resolvidas
- Measure: % ambiguidades resolvidas

EXECUTION_CONFIDENCE:
- Baseline: Confiança inicial na execução
- Target: Confiança >= 8/10
- Measure: Self-reported confidence score

STAKEHOLDER_ALIGNMENT:
- Baseline: Alinhamento percebido
- Target: 100% stakeholders alinhados
- Measure: Confirmation rate
```

### Thresholds de Qualidade
```yaml
READY_FOR_EXECUTION:
  - clarity_score >= 8/10
  - ambiguity_flags == []
  - confidence_score >= 8/10
  - user_confirmation == true

NEEDS_MORE_ELICITATION:
  - clarity_score < 6/10
  - ambiguity_flags > 3
  - confidence_score < 6/10

REQUIRES_DOMAIN_EXPERT:
  - technical_complexity >= 8/10
  - business_impact >= 8/10
  - regulatory_constraints == true
```

---

## 🔧 Templates de Elicitação por Domínio

### Template: Sistema Web/Frontend
```yaml
PERGUNTAS ESSENCIAIS:
1. "Que dispositivos e browsers devem ser suportados?"
2. "Há design system ou guidelines visuais específicos?"
3. "Como será a autenticação e autorização?"
4. "Que integrações com APIs externas são necessárias?"
5. "Há requisitos de performance específicos (carregamento, etc)?"
6. "Como será o deploy e versionamento?"
7. "Que analytics/tracking são obrigatórios?"

CONTEXTO CRÍTICO:
- Framework preferido (React/Vue/Angular)
- Estado global vs local
- SEO requirements
- Accessibility requirements
- Multi-language support
```

### Template: Sistema Backend/API
```yaml
PERGUNTAS ESSENCIAIS:
1. "Qual é o volume esperado de requests/segundo?"
2. "Que tipos de dados serão armazenados e como?"
3. "Há integrações com serviços externos específicos?"
4. "Que níveis de logging e monitoramento são necessários?"
5. "Como será feita autenticação e autorização?"
6. "Há requisitos específicos de segurança ou compliance?"
7. "Como será o processo de deploy e rollback?"

CONTEXTO CRÍTICO:
- Database strategy (SQL/NoSQL)
- Caching strategy
- Rate limiting
- Data migration needs
- Backup and recovery
```

### Template: Sistema IA/ML
```yaml
PERGUNTAS ESSENCIAIS:
1. "Que dados estão disponíveis para treino/inferência?"
2. "Qual é a latência aceitável para as predições?"
3. "Como será medida a acurácia do modelo?"
4. "Há requisitos de explainability/interpretability?"
5. "Como será feito o retreinamento e versionamento?"
6. "Que bias considerations devem ser levados em conta?"
7. "Como será a integração com sistemas existentes?"

CONTEXTO CRÍTICO:
- Tipo de problema (classificação/regressão/NLP)
- Volume de dados disponíveis
- Constraints computacionais
- Regulatory requirements
```

---

## 🎯 Integração com Sistema de Agentes

### Handoff para Múltiplos Agentes
```yaml
QUANDO ELICITAÇÃO COMPLETA:
1. Gerar brief estruturado para agentes
2. Identificar especialidades necessárias
3. Determinar número ótimo de agentes (min 2)
4. Definir critérios de coordenação
5. Estabelecer quality gates

BRIEF STRUCTURE:
- validated_requirements: Requirements claros
- technical_context: Contexto técnico
- business_context: Contexto de negócio
- constraints: Limitações identificadas
- success_criteria: Critérios de sucesso
- coordination_strategy: Como agentes coordenam
```

### Continuous Elicitation
```yaml
DURANTE EXECUÇÃO:
- Monitorar ambiguidades emergentes
- Detectar quando nova elicitação é necessária
- Facilitar comunicação entre agentes e usuário
- Capturar decisions e rationale
- Atualizar contexto conforme evolução

TRIGGER CONDITIONS:
- Agente reporta informação insuficiente
- Conflict entre agentes sobre interpretação
- New requirements emergem durante execução
- Quality gates falham por ambiguidade
```

---

**O Sistema de Elicitação Profunda PRISMA garante que cada execução seja baseada em entendimento completo, reduzindo drasticamente retrabalho e aumentando a qualidade final das soluções.**