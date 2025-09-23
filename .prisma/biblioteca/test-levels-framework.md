<!-- Powered by BMAD™ Core -->

# Framework de Níveis de Teste

Guia abrangente para determinar os níveis de teste apropriados (unitário, integração, E2E) para diferentes cenários.

## Matriz de Decisão de Níveis de Teste

### Testes Unitários

**Quando usar:**

- Testando funções puras e lógica de negócio
- Correção de algoritmos
- Validação de entrada e transformação de dados
- Tratamento de erros em componentes isolados
- Cálculos complexos ou máquinas de estado

**Características:**

- Execução rápida (feedback imediato)
- Sem dependências externas (DB, API, sistema de arquivos)
- Altamente mantível e estável
- Fácil de debugar falhas

**Cenários de exemplo:**

```yaml
teste_unitario:
  componente: 'CalculadoraPreco'
  cenario: 'Calcular desconto com múltiplas regras'
  justificativa: 'Lógica de negócio complexa com múltiplas ramificações'
  requisitos_mock: 'Nenhum - função pura'
```

### Testes de Integração

**Quando usar:**

- Verificação de interação entre componentes
- Operações de banco de dados e transações
- Contratos de endpoints de API
- Comunicação entre serviços
- Comportamento de middleware e interceptadores

**Características:**

- Tempo de execução moderado
- Testa limites de componentes
- Pode usar bancos de dados de teste ou containers
- Valida pontos de integração do sistema

**Cenários de exemplo:**

```yaml
teste_integracao:
  componentes: ['ServicoUsuario', 'RepositorioAuth']
  cenario: 'Criar usuário com atribuição de papel'
  justificativa: 'Fluxo de dados crítico entre serviço e persistência'
  ambiente_teste: 'Banco de dados em memória'
```

### Testes End-to-End

**Quando usar:**

- Jornadas críticas do usuário
- Fluxos de trabalho entre sistemas
- Testes de regressão visual
- Requisitos de conformidade e regulamentação
- Validação final antes do lançamento

**Características:**

- Execução mais lenta
- Testa fluxos de trabalho completos
- Requer configuração completa do ambiente
- Mais realista, mas mais frágil

**Cenários de exemplo:**

```yaml
teste_e2e:
  jornada: 'Processo completo de checkout'
  cenario: 'Usuário compra com método de pagamento salvo'
  justificativa: 'Caminho crítico de receita requerendo validação completa'
  ambiente: 'Staging com gateway de pagamento de teste'
```

## Regras de Seleção de Níveis de Teste

### Favoreça Testes Unitários Quando:

- A lógica pode ser isolada
- Nenhum efeito colateral envolvido
- Feedback rápido necessário
- Alta complexidade ciclomática

### Favoreça Testes de Integração Quando:

- Testando camada de persistência
- Validando contratos de serviço
- Testando middleware/interceptadores
- Limites de componentes críticos

### Favoreça Testes E2E Quando:

- Caminhos críticos voltados ao usuário
- Interações multi-sistema
- Cenários de conformidade regulatória
- Regressão visual importante

## Anti-padrões a Evitar

- Testes E2E para validação de lógica de negócio
- Testes unitários de comportamento de framework
- Testes de integração de bibliotecas de terceiros
- Cobertura duplicada entre níveis

## Proteção Contra Cobertura Duplicada

**Antes de adicionar qualquer teste, verifique:**

1. Isso já é testado em um nível inferior?
2. Um teste unitário pode cobrir isso ao invés de integração?
3. Um teste de integração pode cobrir isso ao invés de E2E?

**Sobreposição de cobertura só é aceitável quando:**

- Testando aspectos diferentes (unitário: lógica, integração: interação, e2e: experiência do usuário)
- Caminhos críticos requerendo defesa em profundidade
- Prevenção de regressão para funcionalidade anteriormente quebrada

## Convenções de Nomenclatura de Testes

- Unitário: `teste_{componente}_{cenario}`
- Integração: `teste_{fluxo}_{interacao}`
- E2E: `teste_{jornada}_{resultado}`

## Formato do ID de Teste

`{ÉPICO}.{HISTÓRIA}-{NÍVEL}-{SEQ}`

Exemplos:

- `1.3-UNIT-001`
- `1.3-INT-002`
- `1.3-E2E-001`
