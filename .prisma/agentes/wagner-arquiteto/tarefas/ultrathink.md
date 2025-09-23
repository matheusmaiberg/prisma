# Comando UltraThink - Resolução Profunda de Problemas em Paralelo v2.0

## Comando: *ultrathink | *ultra

**Objetivo**: Ativa o modo de pensamento ultra-profundo com capacidade de contratar múltiplos agentes especialistas em paralelo para resolver problemas complexos com máxima eficiência.

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
- ✓ Impacto em toda a base de código

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

**CRÍTICO**: O UltraThink DEVE SEMPRE usar o comando `/todos` (via TodoWrite tool) para:
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

## Métodos de Elicitação Aplicados

### Métodos Primários (Sempre Ativos):
1. **Tree of Thoughts Deep Dive** - Explore múltiplos caminhos de raciocínio
2. **Self-Consistency Validation** - Cross-validate soluções
3. **Meta-Prompting Analysis** - Otimize o próprio processo de pensamento

### Métodos Situacionais:
- **Red Team vs Blue Team** - Para problemas de segurança/robustez
- **Innovation Tournament** - Para soluções criativas
- **Stakeholder Round Table** - Para análise multi-perspectiva
- **Escape Room Challenge** - Para problemas com muitas restrições

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

## Critérios de Sucesso

- Single comprehensive ULTRATHINK execution framework criado
- Framework reflete capacidades REAIS de execução paralela
- Agentes especialistas são executados como subagentes reais via Task
- Se PRD fornecido: Análise clara de impacto mostrando o que precisa mudar
- Framework permite resolução colaborativa multi-agente de problemas complexos
- Restrições técnicas e limitações são claramente documentadas

## Notas Importantes

- Esta tarefa cria FRAMEWORK de execução que utiliza subagentes REAIS
- Usa Task tool para execução paralela verdadeira quando apropriado
- Documenta padrões de colaboração e sincronização honestamente
- Para problemas com dependências: Fornece execução sequencial clara
- O objetivo é RESOLUÇÃO PRÁTICA de problemas via múltiplos especialistas reais