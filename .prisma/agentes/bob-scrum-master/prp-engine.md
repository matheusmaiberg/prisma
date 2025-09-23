# 🧠 PRP Engine - Bob's Story Creation Engine

## 📌 Integração PRP com Bob (Scrum Master)

O **PRP Engine** é uma especialização exclusiva do Bob para transformar requisitos em prompts executáveis, otimizando a criação de histórias e épicos.

## 🎯 Context Engineering vs Prompt Engineering

### ❌ Abordagem Tradicional
```yaml
problema:
  - PRDs estáticos
  - Perda de contexto entre sessões
  - Retrabalho em especificações
  - Histórias inconsistentes
```

### ✅ Abordagem PRP (Bob's Engine)
```yaml
solucao:
  - Histórias com contexto completo
  - Estado persistente de requisitos
  - Aprendizado acumulativo de padrões
  - Evolução contínua de templates
```

## 🔄 Pipeline PRP para Histórias

```mermaid
graph LR
    A[Bob Detecta Épico] --> B[Analisa Contexto Técnico]
    B --> C[Identifica Padrões]
    C --> D[Gera História PRP]
    D --> E[Valida com Sarah PO]
    E --> F[Executa com James Dev]
    F --> G[Aprende Padrões]
```

## 📋 Template PRP para História

### Estrutura Base (Bob's Template)
```markdown
# PRP-HISTÓRIA: [Epic.Story] - [Título]

## Contexto Descoberto (Auto-detection)
- Framework: [detectado automaticamente]
- Linguagem: [detectado automaticamente]
- Padrões: [detectado automaticamente]
- Convenções: [detectado automaticamente]

## Persona & Valor
**Como** [role detectado no projeto],
**Eu quero** [funcionalidade específica],
**Para que** [valor de negócio claro]

## Requisitos Funcionais (PRP Format)
1. [RF001] - [Requisito testável 1]
2. [RF002] - [Requisito testável 2]
3. [RF003] - [Requisito testável 3]

## Critérios de Aceitação (Executable)
- [ ] **DADO** [contexto específico]
- [ ] **QUANDO** [ação do usuário]
- [ ] **ENTÃO** [resultado mensurável]

## Tasks Sequenciais (Para James)
1. [ ] **Task 1**: [implementação específica]
2. [ ] **Task 2**: [implementação específica]
3. [ ] **Task 3**: [implementação específica]

## Prompt de Execução (Para James)
"Como James (Developer), implemente [objetivo] seguindo os requisitos acima,
respeitando o contexto [contexto] e garantindo [critérios de aceitação]."

## Validação Automática (Para Quinn)
- Riscos: [comandos *risk]
- Testes: [comandos *design]
- Qualidade: [comandos *review]
```

## 🚀 Comandos PRP do Bob

### Comandos Especializados
```yaml
bob_prp_commands:
  "*criar-historia-prp":
    input: "épico ou funcionalidade"
    output: "história com PRP engine integrado"

  "*gerar-contexto":
    input: "análise de projeto"
    output: "contexto técnico descoberto"

  "*template-historia":
    input: "padrão de história"
    output: "template PRP personalizado"

  "*aprender-padroes":
    input: "histórias implementadas"
    output: "padrões aprendidos e cache atualizado"
```

## 🧠 Motor de Contexto (Bob's Intelligence)

### Descoberta Automática
```yaml
bob_analisa:
  codigo_base:
    - package.json: detecta dependências
    - tsconfig.json: detecta configurações
    - estrutura_pastas: detecta arquitetura
    - imports: detecta padrões de uso
    - commits_recentes: detecta convenções

  padroes_historia:
    - historias_anteriores: aprende estrutura
    - criterios_sucesso: replica padrões
    - vocabulario_negocio: mantém consistência
    - dependencias_tecnicas: mapeia complexidade
```

### Cache de Contexto Bob
```yaml
bob_context_cache:
  projeto_atual:
    tecnologias: []
    padroes_codigo: []
    convenções_nomenclatura: []
    estrutura_preferida: []

  historias_sucesso:
    templates_eficazes: []
    criterios_que_funcionam: []
    patterns_implementacao: []

  aprendizado:
    erros_evitar: []
    melhorias_identificadas: []
    feedback_sarah_po: []
    feedback_james_dev: []
```

## 📊 Exemplos PRP do Bob

### História PRP - Sistema de Login
```markdown
# PRP-HISTÓRIA: AUTH.001 - Sistema de Login

## Contexto Descoberto
- Framework: Next.js 14
- Auth: NextAuth.js detectado
- DB: PostgreSQL via Prisma
- UI: Tailwind + Shadcn/UI

## Persona & Valor
**Como** usuário da aplicação,
**Eu quero** fazer login de forma segura,
**Para que** possa acessar funcionalidades protegidas

## Prompt de Execução (Para James)
"Como James, implemente sistema de login usando NextAuth.js
com PostgreSQL, seguindo padrões Tailwind + Shadcn/UI do projeto,
garantindo autenticação segura e UX fluida."
```

## 🔧 Integração com Workflow Bob

### Pre-PRP (Análise)
```yaml
antes_gerar_prp:
  - analisar_epic_completo
  - detectar_contexto_tecnico
  - identificar_patterns_existentes
  - carregar_historias_similares
```

### Post-PRP (Validação)
```yaml
apos_gerar_prp:
  - validar_completude_historia
  - verificar_criterios_testáveis
  - atualizar_cache_contexto
  - preparar_handoff_sarah
```

## 📈 Métricas PRP do Bob

```yaml
kpis_prp:
  eficiencia:
    - tempo_criacao_historia: "< 10min"
    - taxa_aprovacao_sarah: "> 90%"
    - implementacao_sem_refinamento: "> 80%"

  qualidade:
    - criterios_testáveis: "100%"
    - contexto_preservado: "100%"
    - consistencia_patterns: "> 95%"

  aprendizado:
    - patterns_descobertos: "tracked"
    - cache_context_growth: "tracked"
    - feedback_loop_speed: "< 1 iteração"
```

## 🎯 Filosofia PRP do Bob

**Context-First**: Contexto é tudo, prompt é consequência
**Executable Stories**: Histórias que James pode implementar diretamente
**Learning Loop**: Cada história melhora as próximas
**Seamless Handoff**: Handoffs automáticos sem perda de contexto

---

*PRP Engine - Bob transformando épicos em histórias executáveis*
*"A melhor história é aquela que se implementa sozinha"*