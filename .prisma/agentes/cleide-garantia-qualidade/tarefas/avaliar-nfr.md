<!-- Powered by PRISMA™ -->

# avaliar-nfr

Validação rápida de NFR focada nos quatro principais: segurança, performance, confiabilidade, manutenibilidade.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # ex: "1.3"
  - story_path: `bmad-core/core-config.yaml` para o `devStoryLocation`

optional:
  - architecture_refs: `bmad-core/core-config.yaml` para o `architecture.architectureFile`
  - technical_preferences: `bmad-core/core-config.yaml` para o `technicalPreferences`
  - acceptance_criteria: Do arquivo da história
```

## Propósito

Avaliar requisitos não-funcionais para uma história e gerar:

1. Bloco YAML para a seção `nfr_validation` do arquivo de portão
2. Avaliação breve em markdown salva em `qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md`

## Processo

### 0. Fail-safe para Entradas Ausentes

Se story_path ou arquivo da história não puder ser encontrado:

- Ainda criar arquivo de avaliação com nota: "História fonte não encontrada"
- Definir todos os NFRs selecionados como CONCERNS com notas: "Alvo desconhecido / evidência ausente"
- Continuar com avaliação para fornecer valor

### 1. Elicitar Escopo

**Modo interativo:** Perguntar quais NFRs avaliar
**Modo não-interativo:** Padrão para os quatro principais (segurança, performance, confiabilidade, manutenibilidade)

```text
Quais NFRs devo avaliar? (Digite números ou pressione Enter para padrão)
[1] Segurança (padrão)
[2] Performance (padrão)
[3] Confiabilidade (padrão)
[4] Manutenibilidade (padrão)
[5] Usabilidade
[6] Compatibilidade
[7] Portabilidade
[8] Adequação Funcional

> [Enter para 1-4]
```

### 2. Verificar Limites

Procurar requisitos NFR em:

- Critérios de aceitação da história
- Arquivos `docs/architecture/*.md`
- `docs/technical-preferences.md`

**Modo interativo:** Perguntar por limites ausentes
**Modo não-interativo:** Marcar como CONCERNS com "Alvo desconhecido"

```text
Nenhum requisito de performance encontrado. Qual é seu tempo de resposta alvo?
> 200ms para chamadas de API

Nenhum requisito de segurança encontrado. Método de autenticação requerido?
> JWT com tokens de refresh
```

**Política de alvos desconhecidos:** Se um alvo está ausente e não fornecido, marcar status como CONCERNS com notas: "Alvo desconhecido"

### 3. Avaliação Rápida

Para cada NFR selecionado, verificar:

- Há evidência de que está implementado?
- Podemos validá-lo?
- Há lacunas óbvias?

### 4. Gerar Saídas

## Saída 1: Bloco YAML do Portão

Gerar APENAS para NFRs realmente avaliados (sem placeholders):

```yaml
# Gate YAML (copiar/colar):
nfr_validation:
  _assessed: [security, performance, reliability, maintainability]
  security:
    status: CONCERNS
    notes: 'Sem limitação de taxa em endpoints de autenticação'
  performance:
    status: PASS
    notes: 'Tempos de resposta < 200ms verificados'
  reliability:
    status: PASS
    notes: 'Tratamento de erro e tentativas implementados'
  maintainability:
    status: CONCERNS
    notes: 'Cobertura de teste em 65%, alvo é 80%'
```

## Regras Determinísticas de Status

- **FAIL**: Qualquer NFR selecionado tem lacuna crítica ou alvo claramente não atendido
- **CONCERNS**: Nenhum FAIL, mas qualquer NFR é desconhecido/parcial/evidência ausente
- **PASS**: Todos os NFRs selecionados atendem alvos com evidência

## Cálculo de Pontuação de Qualidade

```
quality_score = 100
- 20 para cada atributo FAIL
- 10 para cada atributo CONCERNS
Piso em 0, teto em 100
```

Se `technical-preferences.md` define pesos customizados, usar esses em vez disso.

## Saída 2: Relatório de Avaliação Breve

**SEMPRE salvar em:** `qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md`

```markdown
# Avaliação NFR: {epic}.{story}

Data: {date}
Revisor: Quinn

<!-- Nota: História fonte não encontrada (se aplicável) -->

## Resumo

- Segurança: CONCERNS - Falta limitação de taxa
- Performance: PASS - Atende requisito <200ms
- Confiabilidade: PASS - Tratamento adequado de erro
- Manutenibilidade: CONCERNS - Cobertura de teste abaixo do alvo

## Problemas Críticos

1. **Sem limitação de taxa** (Segurança)
   - Risco: Ataques de força bruta possíveis
   - Correção: Adicionar middleware de limitação de taxa aos endpoints de autenticação

2. **Cobertura de teste 65%** (Manutenibilidade)
   - Risco: Caminhos de código não testados
   - Correção: Adicionar testes para branches não cobertas

## Vitórias Rápidas

- Adicionar limitação de taxa: ~2 horas
- Aumentar cobertura de teste: ~4 horas
- Adicionar monitoramento de performance: ~1 hora
```

## Saída 3: Linha de Atualização da História

**Terminar com esta linha para a tarefa de revisão citar:**

```
Avaliação NFR: qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md
```

## Saída 4: Linha de Integração do Portão

**Sempre imprimir no final:**

```
Bloco NFR do portão pronto → colar em qa.qaLocation/gates/{epic}.{story}-{slug}.yml sob nfr_validation
```

## Critérios de Avaliação

### Segurança

**PASS se:**

- Autenticação implementada
- Autorização enforçada
- Validação de entrada presente
- Sem segredos hardcoded

**CONCERNS se:**

- Falta limitação de taxa
- Criptografia fraca
- Autorização incompleta

**FAIL se:**

- Sem autenticação
- Credenciais hardcoded
- Vulnerabilidades de injeção SQL

### Performance

**PASS se:**

- Atende alvos de tempo de resposta
- Sem gargalos óbvios
- Uso razoável de recursos

**CONCERNS se:**

- Próximo aos limites
- Índices ausentes
- Sem estratégia de cache

**FAIL se:**

- Excede limites de tempo de resposta
- Vazamentos de memória
- Consultas não otimizadas

### Confiabilidade

**PASS se:**

- Tratamento de erro presente
- Degradação elegante
- Lógica de retry onde necessário

**CONCERNS se:**

- Alguns casos de erro não tratados
- Sem circuit breakers
- Health checks ausentes

**FAIL se:**

- Sem tratamento de erro
- Crashes em erros
- Sem mecanismos de recuperação

### Manutenibilidade

**PASS se:**

- Cobertura de teste atende alvo
- Código bem estruturado
- Documentação presente

**CONCERNS se:**

- Cobertura de teste abaixo do alvo
- Alguma duplicação de código
- Documentação ausente

**FAIL se:**

- Sem testes
- Código altamente acoplado
- Sem documentação

## Referência Rápida

### O que Verificar

```yaml
security:
  - Mecanismo de autenticação
  - Verificações de autorização
  - Validação de entrada
  - Gerenciamento de segredos
  - Limitação de taxa

performance:
  - Tempos de resposta
  - Consultas de banco de dados
  - Uso de cache
  - Consumo de recursos

reliability:
  - Tratamento de erro
  - Lógica de retry
  - Circuit breakers
  - Health checks
  - Logging

maintainability:
  - Cobertura de teste
  - Estrutura do código
  - Documentação
  - Dependências
```

## Princípios Chave

- Focar nos quatro NFRs principais por padrão
- Avaliação rápida, não análise profunda
- Formato de saída pronto para portão
- Achados breves e acionáveis
- Pular o que não se aplica
- Regras determinísticas de status para consistência
- Alvos desconhecidos → CONCERNS, não palpites

---

## Apêndice: Referência ISO 25010

<details>
<summary>Modelo de Qualidade ISO 25010 Completo (clique para expandir)</summary>

### Todas as 8 Características de Qualidade

1. **Adequação Funcional**: Completude, correção, adequação
2. **Eficiência de Performance**: Comportamento temporal, uso de recurso, capacidade
3. **Compatibilidade**: Coexistência, interoperabilidade
4. **Usabilidade**: Capacidade de aprendizado, operabilidade, acessibilidade
5. **Confiabilidade**: Maturidade, disponibilidade, tolerância a falhas
6. **Segurança**: Confidencialidade, integridade, autenticidade
7. **Manutenibilidade**: Modularidade, reusabilidade, testabilidade
8. **Portabilidade**: Adaptabilidade, instalabilidade

Use estes ao avaliar além dos quatro principais.

</details>

<details>
<summary>Exemplo: Análise Profunda de Performance (clique para expandir)</summary>

```yaml
performance_deep_dive:
  response_times:
    p50: 45ms
    p95: 180ms
    p99: 350ms
  database:
    slow_queries: 2
    missing_indexes: ['users.email', 'orders.user_id']
  caching:
    hit_rate: 0%
    recommendation: 'Adicionar Redis para dados de sessão'
  load_test:
    max_rps: 150
    breaking_point: 200 rps
```

</details>