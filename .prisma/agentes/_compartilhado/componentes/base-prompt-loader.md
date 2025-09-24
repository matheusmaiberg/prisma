# 🔄 Base Prompt Loader - Sistema Modular PRISMA

## 📌 Identificação

**Nome**: Base Prompt Loader
**Função**: Carregamento dinâmico e hierárquico de prompts por contexto
**Sistema**: PRISMA v3.0 + Universal Agent Framework
**Baseado em**: Sistema KFC de carregamento contextual

## 🎯 Missão

O Base Prompt Loader é responsável por:
- **Carregar prompts dinamicamente** baseado no contexto da tarefa
- **Combinar hierarquicamente** prompts base + agente + especialização + contexto
- **Decidir automaticamente** qual especialização usar baseado na entrada
- **Otimizar performance** com cache inteligente de prompts
- **Garantir coesão** entre todos os agentes através de base comum

## 🧠 Algoritmo de Carregamento Dinâmico

### Processo Principal
```yaml
prompt_loading_algorithm:
  input:
    - task_description: string
    - input_files: array
    - user_context: object
    - agent_id: string

  steps:
    1: analyze_context
    2: determine_specialization
    3: select_prompt_components
    4: load_hierarchical_prompts
    5: combine_prompts
    6: cache_result
    7: return_final_prompt

  output:
    - final_prompt: string
    - metadata: object (specialization, context, confidence)
```

### Análise de Contexto
```javascript
function analyzeContext(task_description, input_files, user_context) {
    const context_signals = {
        file_patterns: extractFilePatterns(input_files),
        keywords: extractKeywords(task_description),
        project_phase: detectProjectPhase(user_context),
        complexity: assessComplexity(task_description),
        domain: inferDomain(task_description, input_files)
    };

    return {
        primary_context: determinePrimaryContext(context_signals),
        secondary_contexts: determineSecondaryContexts(context_signals),
        confidence_score: calculateContextConfidence(context_signals)
    };
}
```

### Determinação de Especialização
```javascript
function determineSpecialization(agent_id, context_analysis) {
    const agent_config = loadAgentConfig(agent_id);
    const available_specializations = agent_config.especialidades;

    const specialization_scores = {};

    for (const spec of available_specializations) {
        specialization_scores[spec] = calculateSpecializationScore(
            spec,
            context_analysis,
            agent_config.specialization_triggers[spec]
        );
    }

    const best_specialization = Object.keys(specialization_scores)
        .reduce((a, b) =>
            specialization_scores[a] > specialization_scores[b] ? a : b
        );

    return {
        primary: best_specialization,
        confidence: specialization_scores[best_specialization],
        alternatives: getSortedAlternatives(specialization_scores)
    };
}
```

## 🔗 Sistema Hierárquico de Carregamento

### Hierarquia de Prompts
```yaml
hierarchia_carregamento:
  nivel_1_base:
    file: "_compartilhado/comportamentos-base.md"
    role: "Comportamentos universais de todos agentes PRISMA"
    priority: 1
    always_loaded: true

  nivel_2_agent:
    file: "{agent_id}/index.md"
    role: "Personalidade e capacidades específicas do agente"
    priority: 2
    conditional: false

  nivel_3_specialization:
    file: "{agent_id}/especialidades/{specialization}.md"
    role: "Conhecimento específico da especialização escolhida"
    priority: 3
    conditional: true
    decision_based: context_analysis

  nivel_4_context:
    file: "{agent_id}/contextos/{context}.md"
    role: "Adaptação específica para o contexto atual"
    priority: 4
    conditional: true
    decision_based: file_patterns + keywords

  nivel_5_template:
    file: "{agent_id}/templates/{response_template}.md"
    role: "Template de resposta para o tipo específico de output"
    priority: 5
    conditional: true
    decision_based: expected_output_format
```

### Algoritmo de Combinação
```javascript
function combinePrompts(prompt_components) {
    // 1. Validar todos os componentes necessários
    validatePromptComponents(prompt_components);

    // 2. Resolver conflitos entre níveis
    const resolved_components = resolvePromptConflicts(prompt_components);

    // 3. Aplicar herança e override
    const inherited_prompts = applyPromptInheritance(resolved_components);

    // 4. Combinar em ordem hierárquica
    let final_prompt = "";

    // Base behaviors (sempre incluído)
    final_prompt += inherited_prompts.base_behaviors;

    // Agent-specific prompt
    final_prompt += "\n\n" + inherited_prompts.agent_specific;

    // Specialization (se selecionada)
    if (inherited_prompts.specialization) {
        final_prompt += "\n\n## 🎯 Especialização Ativa\n";
        final_prompt += inherited_prompts.specialization;
    }

    // Context-specific adaptations
    if (inherited_prompts.context) {
        final_prompt += "\n\n## 🌟 Adaptação Contextual\n";
        final_prompt += inherited_prompts.context;
    }

    // Response template (se necessário)
    if (inherited_prompts.template) {
        final_prompt += "\n\n## 📝 Template de Resposta\n";
        final_prompt += inherited_prompts.template;
    }

    return final_prompt;
}
```

## 🎛️ Sistema de Decisão Contextual

### Mapeamento de Contextos por Padrões
```yaml
context_patterns:
  desenvolvimento_codigo:
    file_extensions: [".js", ".ts", ".py", ".java", ".cs", ".go", ".rs"]
    keywords: ["implementar", "código", "função", "classe", "método"]
    complexity_threshold: 0.6
    primary_agents: ["james-developer"]

  analise_requisitos:
    file_extensions: [".md", ".doc", ".pdf"]
    filenames: ["requirements", "stories", "backlog"]
    keywords: ["requisito", "funcionalidade", "usuario", "negócio"]
    complexity_threshold: 0.4
    primary_agents: ["sarah-product-owner"]

  arquitetura_design:
    file_extensions: [".md", ".adr"]
    filenames: ["architecture", "design", "adr-"]
    keywords: ["arquitetura", "design", "padrão", "decisão"]
    complexity_threshold: 0.8
    primary_agents: ["winston-arquiteto"]

  testes_qualidade:
    file_extensions: [".test.js", ".spec.js", ".test.py"]
    keywords: ["teste", "qualidade", "validação", "cobertura"]
    complexity_threshold: 0.5
    primary_agents: ["quinn-qa"]

  gestao_projetos:
    file_extensions: [".md", ".csv", ".xlsx"]
    filenames: ["sprint", "backlog", "planning"]
    keywords: ["sprint", "história", "épico", "planning"]
    complexity_threshold: 0.3
    primary_agents: ["bob-scrum-master"]
```

### Engine de Decisão
```javascript
class ContextDecisionEngine {
    constructor() {
        this.patterns = loadContextPatterns();
        this.agent_configs = loadAgentConfigs();
        this.universal_framework = loadUniversalFramework();
    }

    decide(task_description, input_files, user_context) {
        // 1. Análise de padrões
        const pattern_matches = this.analyzePatterns(input_files, task_description);

        // 2. Scoring via Universal Framework
        const agent_scores = this.universal_framework.calculateScores(
            task_description,
            pattern_matches
        );

        // 3. Seleção de agente
        const selected_agent = this.selectBestAgent(agent_scores);

        // 4. Determinação de especialização
        const specialization = this.determineSpecialization(
            selected_agent,
            pattern_matches
        );

        // 5. Seleção de contexto
        const context = this.selectContext(pattern_matches, specialization);

        return {
            agent: selected_agent,
            specialization: specialization,
            context: context,
            confidence: agent_scores[selected_agent],
            prompt_path: this.constructPromptPath(selected_agent, specialization, context)
        };
    }

    analyzePatterns(input_files, task_description) {
        const matches = {};

        for (const [context_name, patterns] of Object.entries(this.patterns)) {
            matches[context_name] = {
                file_match: this.matchFilePatterns(input_files, patterns),
                keyword_match: this.matchKeywords(task_description, patterns),
                overall_score: 0
            };

            // Calcular score combinado
            matches[context_name].overall_score =
                matches[context_name].file_match * 0.6 +
                matches[context_name].keyword_match * 0.4;
        }

        return matches;
    }
}
```

## ⚡ Sistema de Cache Inteligente

### Cache de Prompts
```yaml
cache_system:
  cache_levels:
    L1_memory:
      type: "in_memory"
      ttl: 300 # 5 minutos
      max_entries: 50
      key_format: "{agent}_{specialization}_{context_hash}"

    L2_disk:
      type: "file_system"
      ttl: 3600 # 1 hora
      max_entries: 200
      location: "_compartilhado/cache/prompts/"

  cache_strategy:
    - "Cache final prompts após combinação"
    - "Invalidar cache quando arquivos fonte mudam"
    - "Cache especializations mais usadas"
    - "Pre-load contextos mais comuns"

  cache_keys:
    prompt_combination: "{agent}_{spec}_{context}_{files_hash}"
    specialization_decision: "{agent}_{task_hash}"
    context_analysis: "{files_hash}_{keywords_hash}"
```

### Algoritmo de Cache
```javascript
class PromptCache {
    constructor() {
        this.memory_cache = new Map();
        this.disk_cache_path = "_compartilhado/cache/prompts/";
        this.cache_stats = { hits: 0, misses: 0 };
    }

    async getCachedPrompt(cache_key) {
        // 1. Tentar cache em memória
        if (this.memory_cache.has(cache_key)) {
            this.cache_stats.hits++;
            return this.memory_cache.get(cache_key);
        }

        // 2. Tentar cache em disco
        const disk_cached = await this.loadFromDisk(cache_key);
        if (disk_cached) {
            this.cache_stats.hits++;
            // Promover para cache em memória
            this.memory_cache.set(cache_key, disk_cached);
            return disk_cached;
        }

        this.cache_stats.misses++;
        return null;
    }

    setCachedPrompt(cache_key, prompt_data) {
        // Cache em memória
        this.memory_cache.set(cache_key, prompt_data);

        // Cache em disco (async)
        this.saveToDisk(cache_key, prompt_data);

        // Limpeza automática se necessário
        this.cleanupCacheIfNeeded();
    }
}
```

## 🔍 Sistema de Debugging e Monitoramento

### Debug Mode
```yaml
debug_features:
  trace_decision_path:
    enabled_via: "DEBUG_PROMPT_LOADING=true"
    outputs:
      - context_analysis_details
      - specialization_scoring
      - prompt_combination_steps
      - cache_hit_miss_info

  performance_tracking:
    metrics:
      - prompt_loading_time
      - context_analysis_time
      - cache_hit_ratio
      - specialization_accuracy

  validation_checks:
    - verify_all_required_prompts_exist
    - validate_prompt_syntax
    - check_specialization_consistency
    - confirm_context_relevance
```

### Logging Estruturado
```javascript
class PromptLoaderLogger {
    constructor() {
        this.log_level = process.env.PROMPT_LOADER_LOG_LEVEL || 'INFO';
    }

    logDecision(decision_data) {
        const log_entry = {
            timestamp: new Date().toISOString(),
            level: 'INFO',
            component: 'prompt_loader',
            event: 'context_decision',
            data: {
                selected_agent: decision_data.agent,
                specialization: decision_data.specialization,
                context: decision_data.context,
                confidence: decision_data.confidence,
                alternatives: decision_data.alternatives
            }
        };

        this.writeLog(log_entry);
    }

    logPromptCombination(combination_data) {
        const log_entry = {
            timestamp: new Date().toISOString(),
            level: 'DEBUG',
            component: 'prompt_loader',
            event: 'prompt_combination',
            data: {
                components_loaded: combination_data.components,
                final_prompt_size: combination_data.size,
                cache_key: combination_data.cache_key
            }
        };

        this.writeLog(log_entry);
    }
}
```

## 🚀 Integração com Universal Agent Framework

### Ponte com Sistema de Scoring
```javascript
class UniversalFrameworkBridge {
    constructor(prompt_loader) {
        this.prompt_loader = prompt_loader;
        this.scoring_system = loadUniversalFramework();
    }

    enhanceDecisionWithScoring(context_analysis, available_agents) {
        // 1. Usar análise de contexto do prompt loader
        const task_requirements = this.extractRequirements(context_analysis);

        // 2. Aplicar scoring do Universal Framework
        const agent_scores = this.scoring_system.calculateScores(
            task_requirements,
            available_agents
        );

        // 3. Combinar com análise contextual
        const enhanced_decision = this.combineScores(
            context_analysis,
            agent_scores
        );

        return enhanced_decision;
    }

    updatePerformanceMetrics(decision_result, execution_result) {
        // Feedback para otimização futura
        this.scoring_system.updatePerformance(
            decision_result.agent,
            {
                context_match_accuracy: execution_result.context_relevance,
                specialization_effectiveness: execution_result.specialization_success,
                prompt_quality: execution_result.prompt_effectiveness
            }
        );
    }
}
```

## 📋 API e Interfaces

### Interface Principal
```typescript
interface PromptLoader {
    loadPrompt(params: PromptLoadParams): Promise<LoadedPrompt>;
    analyzeContext(task: string, files: string[]): ContextAnalysis;
    determineSpecialization(agent: string, context: ContextAnalysis): Specialization;
    getCacheStats(): CacheStats;
    invalidateCache(pattern?: string): void;
}

interface PromptLoadParams {
    agent_id: string;
    task_description: string;
    input_files?: string[];
    user_context?: object;
    force_specialization?: string;
    force_context?: string;
}

interface LoadedPrompt {
    final_prompt: string;
    metadata: {
        agent: string;
        specialization: string;
        context: string;
        confidence: number;
        load_time_ms: number;
        cache_hit: boolean;
    };
}
```

---

## 🎯 Status de Implementação

```yaml
implementacao_status:
  arquitetura_definida: true
  algoritmos_especificados: true
  interfaces_definidas: true
  cache_system_designed: true
  debugging_planned: true
  universal_framework_integration: true

proximos_passos:
  1: "Implementar ContextDecisionEngine"
  2: "Criar sistema de cache"
  3: "Integrar com Universal Framework"
  4: "Implementar debugging/logging"
  5: "Testes de performance e precisão"
```

---

*Base Prompt Loader v1.0 - Sistema de Carregamento Dinâmico*
*"Especialização automática, contexto inteligente, performance otimizada"*