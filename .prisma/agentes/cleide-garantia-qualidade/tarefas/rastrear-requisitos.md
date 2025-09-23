<!-- Powered by PRISMA™ -->

# rastrear-requisitos

Mapear requisitos da história para casos de teste usando padrões Given-When-Then para rastreabilidade abrangente.

## Propósito

Criar uma matriz de rastreabilidade de requisitos que garante que todo critério de aceitação tenha cobertura de teste correspondente. Esta tarefa ajuda a identificar lacunas nos testes e garante que todos os requisitos sejam validados.

**IMPORTANTE**: Given-When-Then é usado aqui para documentar o mapeamento entre requisitos e testes, NÃO para escrever o código de teste real. Testes devem seguir os padrões de teste do seu projeto (sem sintaxe BDD no código de teste).

## Pré-requisitos

- Arquivo da história com critérios de aceitação claros
- Acesso a arquivos de teste ou especificações de teste
- Entendimento da implementação

## Processo de Rastreabilidade

### 1. Extrair Requisitos

Identificar todos os requisitos testáveis de:

- Critérios de Aceitação (fonte primária)
- Declaração da história do usuário
- Tarefas/subtarefas com comportamentos específicos
- Requisitos não-funcionais mencionados
- Casos extremos documentados

### 2. Mapear para Casos de Teste

Para cada requisito, documentar quais testes o validam. Use Given-When-Then para descrever o que o teste valida (não como é escrito):

```yaml
requirement: 'AC1: Usuário pode fazer login com credenciais válidas'
test_mappings:
  - test_file: 'auth/login.test.ts'
    test_case: 'should successfully login with valid email and password'
    # Given-When-Then descreve O QUE o teste valida, não COMO é codificado
    given: 'Um usuário registrado com credenciais válidas'
    when: 'Eles submetem o formulário de login'
    then: 'Eles são redirecionados para o dashboard e sessão é criada'
    coverage: full

  - test_file: 'e2e/auth-flow.test.ts'
    test_case: 'complete login flow'
    given: 'Usuário na página de login'
    when: 'Inserindo credenciais válidas e submetendo'
    then: 'Dashboard carrega com dados do usuário'
    coverage: integration
```

### 3. Análise de Cobertura

Avaliar cobertura para cada requisito:

**Níveis de Cobertura:**

- `full`: Requisito completamente testado
- `partial`: Alguns aspectos testados, lacunas existem
- `none`: Nenhuma cobertura de teste encontrada
- `integration`: Coberto apenas em testes de integração/e2e
- `unit`: Coberto apenas em testes unitários

### 4. Identificação de Lacunas

Documentar quaisquer lacunas encontradas:

```yaml
coverage_gaps:
  - requirement: 'AC3: Email de reset de senha enviado em 60 segundos'
    gap: 'Nenhum teste para tempo de entrega do email'
    severity: medium
    suggested_test:
      type: integration
      description: 'Testar conformidade SLA do serviço de email'

  - requirement: 'AC5: Suportar 1000 usuários concorrentes'
    gap: 'Nenhum teste de carga implementado'
    severity: high
    suggested_test:
      type: performance
      description: 'Teste de carga com 1000 conexões concorrentes'
```

## Saídas

### Saída 1: Bloco YAML do Portão

**Gerar para colar no arquivo de portão sob `trace`:**

```yaml
trace:
  totals:
    requirements: X
    full: Y
    partial: Z
    none: W
  planning_ref: 'qa.qaLocation/assessments/{epic}.{story}-design-teste-{YYYYMMDD}.md'
  uncovered:
    - ac: 'AC3'
      reason: 'Nenhum teste encontrado para tempo de reset de senha'
  notes: 'Ver qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md'
```

### Saída 2: Relatório de Rastreabilidade

**Salvar em:** `qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md`

Criar um relatório de rastreabilidade com:

```markdown
# Matriz de Rastreabilidade de Requisitos

## História: {epic}.{story} - {title}

### Resumo de Cobertura

- Total de Requisitos: X
- Totalmente Cobertos: Y (Z%)
- Parcialmente Cobertos: A (B%)
- Não Cobertos: C (D%)

### Mapeamentos de Requisitos

#### AC1: {Critério de Aceitação 1}

**Cobertura: FULL**

Mapeamentos Given-When-Then:

- **Teste Unitário**: `auth.service.test.ts::validateCredentials`
  - Given: Credenciais válidas de usuário
  - When: Método de validação chamado
  - Then: Retorna true com objeto do usuário

- **Teste de Integração**: `auth.integration.test.ts::loginFlow`
  - Given: Usuário com conta válida
  - When: API de login chamada
  - Then: Token JWT retornado e sessão criada

#### AC2: {Critério de Aceitação 2}

**Cobertura: PARTIAL**

[Continuar para todos os ACs...]

### Lacunas Críticas

1. **Requisitos de Performance**
   - Lacuna: Nenhum teste de carga para usuários concorrentes
   - Risco: Alto - Pode falhar sob carga de produção
   - Ação: Implementar testes de carga usando k6 ou similar

2. **Requisitos de Segurança**
   - Lacuna: Limitação de taxa não testada
   - Risco: Médio - Potencial vulnerabilidade DoS
   - Ação: Adicionar testes de limite de taxa à suíte de integração

### Recomendações de Design de Teste

Baseado nas lacunas identificadas, recomendar:

1. Cenários de teste adicionais necessários
2. Tipos de teste a implementar (unidade/integração/e2e/performance)
3. Requisitos de dados de teste
4. Estratégias de mock/stub

### Avaliação de Risco

- **Risco Alto**: Requisitos sem cobertura
- **Risco Médio**: Requisitos com apenas cobertura parcial
- **Risco Baixo**: Requisitos com cobertura completa unidade + integração
```

## Melhores Práticas de Rastreabilidade

### Given-When-Then para Mapeamento (Não Código de Teste)

Use Given-When-Then para documentar o que cada teste valida:

**Given**: O contexto inicial que o teste configura

- Qual estado/dados o teste prepara
- Contexto de usuário sendo simulado
- Pré-condições do sistema

**When**: A ação que o teste executa

- O que o teste executa
- Chamadas de API ou ações de usuário testadas
- Eventos disparados

**Then**: O que o teste afirma

- Resultados esperados verificados
- Mudanças de estado verificadas
- Valores validados

**Nota**: Isto é apenas para documentação. Código de teste real segue os padrões do seu projeto (ex: blocos describe/it, sem sintaxe BDD).

### Prioridade de Cobertura

Priorizar cobertura baseada em:

1. Fluxos críticos de negócio
2. Requisitos relacionados à segurança
3. Requisitos de integridade de dados
4. Recursos voltados ao usuário
5. SLAs de performance

### Granularidade de Teste

Mapear em níveis apropriados:

- Testes unitários para lógica de negócio
- Testes de integração para interação de componentes
- Testes E2E para jornadas do usuário
- Testes de performance para NFRs

## Indicadores de Qualidade

Boa rastreabilidade mostra:

- Todo AC tem pelo menos um teste
- Caminhos críticos têm múltiplos níveis de teste
- Casos extremos são explicitamente cobertos
- NFRs têm tipos de teste apropriados
- Given-When-Then claro para cada teste

## Sinais de Alerta

Observar:

- ACs sem cobertura de teste
- Testes que não mapeiam para requisitos
- Descrições vagas de teste
- Cobertura de casos extremos ausente
- NFRs sem testes específicos

## Integração com Portões

Esta rastreabilidade alimenta portões de qualidade:

- Lacunas críticas → FAIL
- Lacunas menores → CONCERNS
- Testes P0 ausentes do design-teste → CONCERNS

### Saída 3: Linha de Hook da História

**Imprimir esta linha para tarefa de revisão citar:**

```text
Matriz de trace: qa.qaLocation/assessments/{epic}.{story}-trace-{YYYYMMDD}.md
```

- Cobertura completa → contribuição PASS

## Princípios Chave

- Todo requisito deve ser testável
- Usar Given-When-Then para clareza
- Identificar tanto presença quanto ausência
- Priorizar baseado em risco
- Fazer recomendações acionáveis