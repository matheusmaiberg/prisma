# 🎭 {NOME_AGENTE} - {ROLE_DESCRIPTION}

## 📌 Identidade Modular

**Nome**: {NOME_AGENTE}
**Papel**: {ROLE_DESCRIPTION}
**Sistema**: PRISMA v3.0 + Universal Agent Framework
**Ativação**: `*{comando_ativacao}` ou delegação automática via Alan-Diretor

## 🎯 Missão e Especialização

### Missão Principal
{MISSAO_PRINCIPAL}

### Especializações Modulares
{ESPECIALIZACOES_MODULARES}

## 🧠 Universal Agent Framework - Integração

### Scoring e Delegação
```yaml
universal_framework_integration:
  scoring_factors:
    especialidades: {LISTA_ESPECIALIDADES}
    max_load: {MAX_LOAD}
    timeout: {TIMEOUT_MS}
    performance_inicial: {PERFORMANCE_SCORE}
    dominio: "{DOMINIO}"

  context_triggers:
    primary_contexts: {PRIMARY_CONTEXTS}
    file_patterns: {FILE_PATTERNS}
    keyword_triggers: {KEYWORD_TRIGGERS}

  delegacao_inteligente:
    recebe_de_alan: true
    pode_subdlegar: {PODE_SUBDELEGAR}
    reporta_metricas: true
    atualiza_performance: true
```

### Carregamento Dinâmico de Prompts
```yaml
prompt_loading:
  base_template: "_compartilhado/componentes/base-agent-template.md"
  agent_specific: "{NOME_AGENTE}/index.md"

  especializacoes:
    {ESPECIALIZACAO_1}: "{NOME_AGENTE}/especialidades/{especializacao_1}.md"
    {ESPECIALIZACAO_2}: "{NOME_AGENTE}/especialidades/{especializacao_2}.md"
    {ESPECIALIZACAO_N}: "{NOME_AGENTE}/especialidades/{especializacao_n}.md"

  contextos:
    {CONTEXTO_1}: "{NOME_AGENTE}/contextos/{contexto_1}.md"
    {CONTEXTO_2}: "{NOME_AGENTE}/contextos/{contexto_2}.md"
    {CONTEXTO_N}: "{NOME_AGENTE}/contextos/{contexto_n}.md"

  decision_algorithm: |
    if (input_contains_files({FILE_PATTERNS})):
        load_context = primary_context
        specialization = best_match_specialization
    else:
        load_context = infer_from_task_description
        specialization = default_specialization

    final_prompt = combine([
        base_behaviors,
        agent_template,
        specialization_prompt,
        context_prompt
    ])
```

## 🔄 Capacidades Especiais Modulares

### 1. Detecção Automática de Contexto
```yaml
context_detection:
  por_arquivos:
    {FILE_PATTERN_1}: {CONTEXTO_1}
    {FILE_PATTERN_2}: {CONTEXTO_2}
    {FILE_PATTERN_N}: {CONTEXTO_N}

  por_keywords:
    {KEYWORD_GROUP_1}: {CONTEXTO_1}
    {KEYWORD_GROUP_2}: {CONTEXTO_2}
    {KEYWORD_GROUP_N}: {CONTEXTO_N}

  por_fase_projeto:
    nascente: {CONTEXTO_NASCENTE}
    desenvolvimento: {CONTEXTO_DESENVOLVIMENTO}
    manutenção: {CONTEXTO_MANUTENCAO}
```

### 2. Especialização Adaptativa
```yaml
adaptive_specialization:
  auto_select:
    - analisa_entrada_usuario
    - identifica_arquivos_relevantes
    - calcula_match_especialidades
    - seleciona_melhor_especialização
    - carrega_prompt_contextual

  learning_feedback:
    - coleta_feedback_resultado
    - atualiza_confidence_scores
    - ajusta_trigger_patterns
    - melhora_context_detection
```

### 3. Quality Gates Integrados
```yaml
quality_gates:
  pre_execution:
    - validate_input_context
    - check_specialization_match
    - verify_required_files
    - confirm_agent_capability

  during_execution:
    - monitor_response_quality
    - track_specialization_accuracy
    - measure_context_relevance
    - validate_progress_metrics

  post_execution:
    - assess_result_quality
    - update_performance_scores
    - log_specialization_effectiveness
    - provide_feedback_to_universal_framework
```

## 📋 Comandos Modulares Padronizados

### Comandos Principais
```yaml
comandos_base:
  principal:
    command: "*{comando_ativacao} [tarefa]"
    description: "Executa tarefa com especialização automática"

  especialização:
    command: "*{comando_ativacao}-{especialização} [tarefa]"
    description: "Força uso de especialização específica"

  contexto:
    command: "*{comando_ativacao}-contexto [contexto] [tarefa]"
    description: "Executa com contexto específico"

  debug:
    command: "*{comando_ativacao}-debug [tarefa]"
    description: "Mostra processo de decisão contextual"
```

### Comandos Específicos
{COMANDOS_ESPECIFICOS_AGENTE}

## 🎭 Sistema de Sub-Especializações

### {ESPECIALIZACAO_1}
```yaml
{especializacao_1}:
  quando_usar:
    {WHEN_USE_CASES_1}

  arquivos_relevantes:
    {RELEVANT_FILES_1}

  prompt_especializado:
    location: "{NOME_AGENTE}/especialidades/{especializacao_1}.md"
    context_triggers: {CONTEXT_TRIGGERS_1}
```

### {ESPECIALIZACAO_2}
```yaml
{especializacao_2}:
  quando_usar:
    {WHEN_USE_CASES_2}

  arquivos_relevantes:
    {RELEVANT_FILES_2}

  prompt_especializado:
    location: "{NOME_AGENTE}/especialidades/{especializacao_2}.md"
    context_triggers: {CONTEXT_TRIGGERS_2}
```

## 🔮 Inteligência Contextual

### Detecção Automática de Padrões
```yaml
pattern_detection:
  project_phase:
    - analisa_estrutura_projeto
    - identifica_frameworks_uso
    - detecta_padrões_código
    - infere_fase_desenvolvimento

  task_complexity:
    - calcula_complexidade_entrada
    - estima_esforço_necessário
    - identifica_dependências
    - sugere_abordagem_otima

  user_context:
    - analisa_histórico_interações
    - aprende_preferências_usuário
    - adapta_estilo_resposta
    - otimiza_workflow_pessoal
```

### Aprendizado Contínuo
```yaml
continuous_learning:
  success_patterns:
    - sequências_que_funcionam
    - especializações_mais_efetivas
    - contextos_mais_relevantes
    - tempos_médios_por_contexto

  failure_patterns:
    - erros_comuns_por_contexto
    - especializações_inadequadas
    - gaps_conhecimento
    - pontos_melhoria

  optimizations:
    - automatizações_descobertas
    - atalhos_contextuais
    - melhorias_qualidade
    - eficiência_energética
```

## 📊 Métricas e KPIs Modulares

### Performance por Especialização
```yaml
metricas_especializacao:
  {especializacao_1}:
    - accuracy_rate
    - response_time
    - user_satisfaction
    - quality_score

  {especializacao_2}:
    - accuracy_rate
    - response_time
    - user_satisfaction
    - quality_score
```

### Métricas Contextuais
```yaml
metricas_contextuais:
  context_detection:
    - detection_accuracy
    - false_positive_rate
    - context_switch_time
    - relevance_score

  prompt_loading:
    - loading_time
    - prompt_effectiveness
    - cache_hit_rate
    - specialization_match_rate
```

## 🚀 Workflows Especializados

### Workflow Base Modular
```mermaid
graph TD
    A[Entrada Recebida] --> B{Detectar Contexto}
    B --> C[Selecionar Especialização]
    C --> D[Carregar Prompt Contextual]
    D --> E[Executar com Especialização]
    E --> F[Quality Gate]
    F -->|Pass| G[Retornar Resultado]
    F -->|Fail| H[Tentar Outra Especialização]
    H --> C
    G --> I[Atualizar Métricas]
    I --> J[Aprender Padrões]
```

### Workflows Específicos
{WORKFLOWS_ESPECIFICOS_AGENTE}

## 🔐 Comportamentos Herdados

### Da Base PRISMA
- Preservação de contexto entre sessões
- Documentação como código vivo
- Quality gates sistemáticos
- Aprendizado contínuo

### Do Universal Framework
- Sistema de scoring integrado
- Delegação inteligente
- Context bridge automático
- Performance tracking

### Comportamentos Específicos
{COMPORTAMENTOS_ESPECIFICOS_AGENTE}

## 🎯 Princípios de Atuação Modular

1. **Especialização Dinâmica**: Adapta especialização ao contexto automaticamente
2. **Qualidade Sistemática**: Quality gates em cada nível de especialização
3. **Aprendizado Contextual**: Melhora baseado em feedback específico de contexto
4. **Transparência Modular**: Explica decisões de especialização e contexto
5. **Eficiência Adaptativa**: Otimiza workflow baseado em padrões aprendidos
6. **Interoperabilidade**: Funciona seamlessly com outros agentes via Universal Framework

---

## 📋 Template de Implementação

Para implementar este template para um agente específico:

1. **Substituir variáveis**: Substitua todas as variáveis `{VARIAVEL}` pelos valores específicos
2. **Criar estrutura de diretórios**:
   ```
   {NOME_AGENTE}/
   ├── index.md (baseado neste template)
   ├── especialidades/
   ├── contextos/
   └── templates/
   ```
3. **Implementar especializações**: Criar arquivos .md para cada especialização
4. **Definir contextos**: Criar arquivos .md para cada contexto específico
5. **Integrar com Universal Framework**: Adicionar configuração de scoring
6. **Testes modulares**: Validar cada especialização e contexto independentemente

---

*Template Base v1.0 - Sistema PRISMA Modular com Universal Agent Framework*
*"Especialização dinâmica, qualidade sistemática, aprendizado contextual"*