<!-- Powered by PRISMA™ -->

# design-testes

Criar cenários de teste abrangentes com recomendações de nível de teste apropriadas para implementação da história.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # ex: "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # Caminho do core-config.yaml
  - story_title: '{title}' # Se ausente, derivar do H1 do arquivo da história
  - story_slug: '{slug}' # Se ausente, derivar do título (minúsculas, hifenizado)
```

## Propósito

Projetar uma estratégia de teste completa que identifica o que testar, em qual nível (unidade/integração/e2e), e por quê. Isso garante cobertura de teste eficiente sem redundância mantendo limites apropriados de teste.

## Dependências

```yaml
data:
  - test-levels-framework.md # Critérios de decisão Unidade/Integração/E2E
  - test-priorities-matrix.md # Sistema de classificação P0/P1/P2/P3
```

## Processo

### 1. Analisar Requisitos da História

Quebrar cada critério de aceitação em cenários testáveis. Para cada AC:

- Identificar a funcionalidade principal a ser testada
- Determinar variações de dados necessárias
- Considerar condições de erro
- Notar casos extremos

### 2. Aplicar Framework de Nível de Teste

**Referência:** Carregar `test-levels-framework.md` para critérios detalhados

Regras rápidas:

- **Unidade**: Lógica pura, algoritmos, cálculos
- **Integração**: Interações de componentes, operações de BD
- **E2E**: Jornadas críticas do usuário, conformidade

### 3. Atribuir Prioridades

**Referência:** Carregar `test-priorities-matrix.md` para classificação

Atribuição rápida de prioridade:

- **P0**: Crítico para receita, segurança, conformidade
- **P1**: Jornadas principais do usuário, frequentemente usado
- **P2**: Recursos secundários, funções de admin
- **P3**: Nice-to-have, raramente usado

### 4. Projetar Cenários de Teste

Para cada necessidade de teste identificada, criar:

```yaml
test_scenario:
  id: '{epic}.{story}-{LEVEL}-{SEQ}'
  requirement: 'Referência AC'
  priority: P0|P1|P2|P3
  level: unit|integration|e2e
  description: 'O que está sendo testado'
  justification: 'Por que este nível foi escolhido'
  mitigates_risks: ['RISK-001'] # Se perfil de risco existir
```

### 5. Validar Cobertura

Garantir:

- Todo AC tem pelo menos um teste
- Nenhuma cobertura duplicada entre níveis
- Caminhos críticos têm múltiplos níveis
- Mitigações de risco são abordadas

## Saídas

### Saída 1: Documento de Design de Teste

**Salvar em:** `qa.qaLocation/assessments/{epic}.{story}-design-teste-{YYYYMMDD}.md`

```markdown
# Design de Teste: História {epic}.{story}

Data: {date}
Designer: Quinn (Arquiteto de Testes)

## Visão Geral da Estratégia de Teste

- Total de cenários de teste: X
- Testes de unidade: Y (A%)
- Testes de integração: Z (B%)
- Testes E2E: W (C%)
- Distribuição de prioridade: P0: X, P1: Y, P2: Z

## Cenários de Teste por Critérios de Aceitação

### AC1: {description}

#### Cenários

| ID           | Nível       | Prioridade | Teste                     | Justificativa            |
| ------------ | ----------- | ---------- | ------------------------- | ------------------------ |
| 1.3-UNIT-001 | Unidade     | P0         | Validar formato entrada   | Lógica pura validação    |
| 1.3-INT-001  | Integração  | P0         | Serviço processa request  | Fluxo multi-componente   |
| 1.3-E2E-001  | E2E         | P1         | Usuário completa jornada  | Validação caminho crítico|

[Continuar para todos os ACs...]

## Cobertura de Risco

[Mapear cenários de teste para riscos identificados se perfil de risco existir]

## Ordem de Execução Recomendada

1. Testes P0 Unidade (falha rápida)
2. Testes P0 Integração
3. Testes P0 E2E
4. Testes P1 em ordem
5. P2+ conforme tempo permitir
```

### Saída 2: Bloco YAML do Portão

Gerar para inclusão no portão de qualidade:

```yaml
test_design:
  scenarios_total: X
  by_level:
    unit: Y
    integration: Z
    e2e: W
  by_priority:
    p0: A
    p1: B
    p2: C
  coverage_gaps: [] # Listar quaisquer ACs sem testes
```

### Saída 3: Referências de Rastreamento

Imprimir para uso pela tarefa rastrear-requisitos:

```text
Matriz de design de teste: qa.qaLocation/assessments/{epic}.{story}-design-teste-{YYYYMMDD}.md
Testes P0 identificados: {count}
```

## Checklist de Qualidade

Antes de finalizar, verificar:

- [ ] Todo AC tem cobertura de teste
- [ ] Níveis de teste são apropriados (não sobre-testando)
- [ ] Nenhuma cobertura duplicada entre níveis
- [ ] Prioridades alinham com risco de negócio
- [ ] IDs de teste seguem convenção de nomenclatura
- [ ] Cenários são atômicos e independentes

## Princípios Chave

- **Shift left**: Preferir unidade sobre integração, integração sobre E2E
- **Baseado em risco**: Focar no que pode dar errado
- **Cobertura eficiente**: Testar uma vez no nível certo
- **Manutenibilidade**: Considerar manutenção de teste a longo prazo
- **Feedback rápido**: Testes rápidos executam primeiro