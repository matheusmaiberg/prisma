# /kfc Command

Ativa o workflow KFC para desenvolvimento orientado a especificações formais.

## Uso

```bash
/kfc                    # Inicia workflow com spec-decision como orquestrador
/kfc init               # Inicializa a estrutura de diretórios e configuração do KFC
/kfc decision           # Executa spec-decision diretamente (comando principal)
/kfc requirements      # Força geração de requisitos EARS
/kfc design           # Força criação de design técnico
/kfc tasks            # Força geração de lista de tarefas
/kfc tests            # Força geração de estratégias de teste
/kfc docs             # Força geração de documentação estruturada
/kfc compliance       # Força validação de conformidade e padrões
```

## O que é KFC?

KFC (Keep Features Clean) é o framework de especificação formal que:

- **Gera requisitos** em formato EARS estruturado
- **Cria design técnico** detalhado com arquitetura
- **Produz tarefas executáveis** com dependências mapeadas
- **Valida qualidade** através de quality gates
- **Documenta automaticamente** em estrutura profissional
- **Garante conformidade** com padrões do projeto

## Workflow KFC

```
User Request → spec-decision (analisa e decide próximo passo)
            ↓
spec-decision → requirements/design/tasks/impl/test/docs/compliance
            ↓
spec-decision (valida e orienta próxima fase com hierarquia 1-7)
```

**Novo Modelo**: spec-decision é o coração que orquestra todo o workflow, tomando decisões inteligentes sobre qual fase executar e validando qualidade em cada etapa.

## Quando Usar

Use `/kfc` quando:

- ✅ Precisa de especificações formais e documentação
- ✅ Projeto requer rastreabilidade completa
- ✅ Quality gates são necessários entre fases
- ✅ Documentação automática é importante
- ✅ Compliance e padrões devem ser validados

## Agentes KFC Disponíveis

### Core Workflow

- **spec-requirements**: Geração de requisitos em formato EARS
- **spec-design**: Design técnico e arquitetural
- **spec-tasks**: Planejamento detalhado de tarefas
- **spec-impl**: Implementação baseada em especificações
- **spec-test**: Geração e execução de testes

### Quality & Governance

- **spec-decision**: 🧠 **CORAÇÃO DO SISTEMA** - Orquestra workflow com hierarquia 1-7
- **code-review**: Revisão especializada de código implementado
- **spec-docs**: Documentação automática estruturada
- **spec-compliance**: Validação de conformidade e padrões
- **spec-judge**: Avaliação e seleção quando múltiplas opções
- **spec-system-prompt-loader**: Carregamento de contexto

### Hierarquia spec-decision (1-7):

1. **Análise** → 2. **Requirements** → 3. **Design** → 4. **Tasks** → 5. **Implementação** → 6. **Testes** → 7. **Documentação**

## Fluxo Típico Completo

```bash
# 1. Iniciar desenvolvimento (spec-decision orquestra tudo)
/kfc "adicionar sistema de notificações"

# Processo automático com spec-decision:
# → spec-decision analisa request e decide fase inicial
# → executa requirements/design/tasks conforme hierarquia 1-7
# → spec-decision valida cada fase e decide próximo passo
# → continua até conclusão completa

# 2. Comandos diretos (força fases específicas)
/kfc decision               # Executar orquestrador diretamente
/kfc requirements "feature" # Forçar apenas requirements
/kfc design "feature"       # Forçar apenas design técnico
```

## Features Principais

### 🎯 **Specification-Driven**

- Todo código é precedido por especificações formais
- Requirements em formato EARS com acceptance criteria
- Design técnico com diagramas e arquitectura

### ⚡ **Quality Gates com spec-decision**

- spec-decision é o orquestrador central que valida cada fase
- Hierarquia 1-7 garante ordem lógica de desenvolvimento
- Decisões: ADVANCE, REVISE, ROLLBACK, RESTART
- Métricas de qualidade automáticas integradas

### 📚 **Documentation First**

- spec-docs gera documentação em docs/ automaticamente
- User guides, API reference, troubleshooting
- Sincronização automática com implementação

### ✅ **Compliance & Standards**

- spec-compliance valida naming conventions
- Verifica estrutura de arquivos e conteúdo
- Padrões de código e processo

### 🔀 **Parallel Support**

- Suporte a 1-128 agentes em paralelo
- spec-judge para seleção entre alternativas
- Party mode para decisões colaborativas

## Configuração e Personalização

O workflow KFC é configurado através de:

- `.claude/workflows/kfc-spec-dev.md` - Definição do processo
- `.claude/agents/kfc/` - Agentes especializados
- `.claude/specs/` - Especificações geradas

## Quality Metrics

- **Requirements Coverage**: % de requirements implementados
- **Design Adherence**: Implementação segue design
- **Task Completion**: Todas as tasks concluídas
- **Test Coverage**: Testes para todos os requirements
- **Documentation**: Completude da documentação
- **Compliance**: Aderência aos padrões

## Quick Start

```bash
# Desenvolvimento completo de feature
/kfc "implementar dashboard de analytics"

# Sistema guiará através de:
# 1. Requirements gathering
# 2. Technical design
# 3. Task planning
# 4. Implementation
# 5. Testing
# 6. Documentation
# 7. Compliance validation
```

---

**KFC**: Desenvolvimento orientado a especificações com quality gates, documentação automática e compliance validation integrados.
