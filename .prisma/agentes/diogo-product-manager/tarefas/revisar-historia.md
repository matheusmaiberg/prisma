<!-- Powered by PRISMA™ -->

# revisar-historia

Realizar uma revisão abrangente de arquitetura de teste com decisão de portão de qualidade. Esta revisão adaptativa e consciente de risco cria tanto uma atualização da história quanto um arquivo detalhado de portão.

## Entradas

```yaml
required:
  - story_id: '{epic}.{story}' # ex: "1.3"
  - story_path: '{devStoryLocation}/{epic}.{story}.*.md' # Caminho do core-config.yaml
  - story_title: '{title}' # Se ausente, derivar do H1 do arquivo da história
  - story_slug: '{slug}' # Se ausente, derivar do título (minúsculas, hifenizado)
```

## Pré-requisitos

- Status da história deve ser "Review"
- Desenvolvedor completou todas as tarefas e atualizou a Lista de Arquivos
- Todos os testes automatizados estão passando

## Processo de Revisão - Arquitetura de Teste Adaptativa

### 1. Avaliação de Risco (Determina Profundidade da Revisão)

**Auto-escalar para revisão profunda quando:**

- Arquivos de autenticação/pagamento/segurança tocados
- Nenhum teste adicionado à história
- Diff > 500 linhas
- Portão anterior foi FAIL/CONCERNS
- História tem > 5 critérios de aceitação

### 2. Análise Abrangente

**A. Rastreabilidade de Requisitos**

- Mapear cada critério de aceitação para seus testes validadores (documentar mapeamento com Given-When-Then, não código de teste)
- Identificar lacunas de cobertura
- Verificar se todos os requisitos têm casos de teste correspondentes

**B. Revisão de Qualidade de Código**

- Arquitetura e padrões de design
- Oportunidades de refatoração (e executá-las)
- Duplicação de código ou ineficiências
- Otimizações de performance
- Vulnerabilidades de segurança
- Aderência a melhores práticas

**C. Avaliação de Arquitetura de Teste**

- Adequação de cobertura de teste em níveis apropriados
- Adequação de nível de teste (o que deveria ser unidade vs integração vs e2e)
- Qualidade e manutenibilidade do design de teste
- Estratégia de gerenciamento de dados de teste
- Adequação do uso de mock/stub
- Cobertura de casos extremos e cenários de erro
- Tempo de execução e confiabilidade dos testes

**D. Requisitos Não-Funcionais (NFRs)**

- Segurança: Autenticação, autorização, proteção de dados
- Performance: Tempos de resposta, uso de recursos
- Confiabilidade: Tratamento de erro, mecanismos de recuperação
- Manutenibilidade: Clareza do código, documentação

**E. Avaliação de Testabilidade**

- Controlabilidade: Podemos controlar as entradas?
- Observabilidade: Podemos observar as saídas?
- Debugabilidade: Podemos debugar falhas facilmente?

**F. Identificação de Débito Técnico**

- Atalhos acumulados
- Testes ausentes
- Dependências desatualizadas
- Violações de arquitetura

### 3. Refatoração Ativa

- Refatorar código onde seguro e apropriado
- Executar testes para garantir que mudanças não quebrem funcionalidade
- Documentar todas as mudanças na seção QA Results com WHY e HOW claros
- NÃO alterar conteúdo da história além da seção QA Results
- NÃO mudar Status da história ou Lista de Arquivos; apenas recomendar próximo status

### 4. Verificação de Conformidade com Padrões

- Verificar aderência a `docs/coding-standards.md`
- Verificar conformidade com `docs/unified-project-structure.md`
- Validar abordagem de teste contra `docs/testing-strategy.md`
- Garantir que todas as diretrizes mencionadas na história sejam seguidas

### 5. Validação de Critérios de Aceitação

- Verificar se cada AC está totalmente implementado
- Verificar funcionalidade ausente
- Validar que casos extremos são tratados

### 6. Documentação e Comentários

- Verificar se o código é auto-documentado onde possível
- Adicionar comentários para lógica complexa se ausentes
- Garantir que mudanças de API são documentadas

## Saída 1: Atualizar Arquivo da História - APENAS Seção QA Results

**CRÍTICO**: Você está APENAS autorizado a atualizar a seção "QA Results" do arquivo da história. NÃO modifique outras seções.

**Regra de Âncora QA Results:**

- Se `## QA Results` não existe, anexar no final do arquivo
- Se existe, anexar nova entrada datada abaixo das entradas existentes
- Nunca editar outras seções

Após revisão e qualquer refatoração, anexar seus resultados ao arquivo da história na seção QA Results:

```markdown
## QA Results

### Data da Revisão: [Data]

### Revisado Por: Quinn (Arquiteto de Testes)

### Avaliação de Qualidade de Código

[Avaliação geral da qualidade da implementação]

### Refatoração Realizada

[Listar qualquer refatoração que você realizou com explicações]

- **Arquivo**: [nome do arquivo]
  - **Mudança**: [o que foi mudado]
  - **Por quê**: [razão para mudança]
  - **Como**: [como melhora o código]

### Verificação de Conformidade

- Padrões de Codificação: [✓/✗] [notas se houver]
- Estrutura do Projeto: [✓/✗] [notas se houver]
- Estratégia de Teste: [✓/✗] [notas se houver]
- Todos os ACs Atendidos: [✓/✗] [notas se houver]

### Checklist de Melhorias

[Marcar itens que você mesmo tratou, deixar desmarcado para dev abordar]

- [x] Refatorou serviço de usuário para melhor tratamento de erro (services/user.service.ts)
- [x] Adicionou testes de caso extremo ausentes (services/user.service.test.ts)
- [ ] Considerar extrair lógica de validação para classe validadora separada
- [ ] Adicionar teste de integração para cenários de erro
- [ ] Atualizar documentação da API para novos códigos de erro

### Revisão de Segurança

[Quaisquer preocupações de segurança encontradas e se abordadas]

### Considerações de Performance

[Quaisquer problemas de performance encontrados e se abordados]

### Arquivos Modificados Durante Revisão

[Se você modificou arquivos, listá-los aqui - pedir ao Dev para atualizar Lista de Arquivos]

### Status do Portão

Gate: {STATUS} → qa.qaLocation/gates/{epic}.{story}-{slug}.yml
Perfil de risco: qa.qaLocation/assessments/{epic}.{story}-risco-{YYYYMMDD}.md
Avaliação NFR: qa.qaLocation/assessments/{epic}.{story}-nfr-{YYYYMMDD}.md

# Nota: Caminhos devem referenciar core-config.yaml para configurações customizadas

### Status Recomendado

[✓ Pronto para Done] / [✗ Mudanças Requeridas - Ver itens desmarcados acima]
(Proprietário da história decide status final)
```

## Saída 2: Criar Arquivo de Portão de Qualidade

**Template e Diretório:**

- Renderizar de `../templates/qa-gate-tmpl.yaml`
- Criar diretório definido em `qa.qaLocation/gates` (ver `bmad-core/core-config.yaml`) se ausente
- Salvar em: `qa.qaLocation/gates/{epic}.{story}-{slug}.yml`

Estrutura do arquivo de portão:

```yaml
schema: 1
story: '{epic}.{story}'
story_title: '{título da história}'
gate: PASS|CONCERNS|FAIL|WAIVED
status_reason: 'Explicação de 1-2 sentenças da decisão do portão'
reviewer: 'Quinn (Arquiteto de Testes)'
updated: '{timestamp ISO-8601}'

top_issues: [] # Vazio se não houver problemas
waiver: { active: false } # Definir active: true apenas se WAIVED

# Campos estendidos (opcionais mas recomendados):
quality_score: 0-100 # 100 - (20*FAILs) - (10*CONCERNS) ou usar pesos do technical-preferences.md
expires: '{timestamp ISO-8601}' # Tipicamente 2 semanas da revisão

evidence:
  tests_reviewed: { count }
  risks_identified: { count }
  trace:
    ac_covered: [1, 2, 3] # Números AC com cobertura de teste
    ac_gaps: [4] # Números AC faltando cobertura

nfr_validation:
  security:
    status: PASS|CONCERNS|FAIL
    notes: 'Achados específicos'
  performance:
    status: PASS|CONCERNS|FAIL
    notes: 'Achados específicos'
  reliability:
    status: PASS|CONCERNS|FAIL
    notes: 'Achados específicos'
  maintainability:
    status: PASS|CONCERNS|FAIL
    notes: 'Achados específicos'

recommendations:
  immediate: # Deve corrigir antes da produção
    - action: 'Adicionar limitação de taxa'
      refs: ['api/auth/login.ts']
  future: # Pode ser abordado depois
    - action: 'Considerar cache'
      refs: ['services/data.ts']
```

### Critérios de Decisão do Portão

**Regra determinística (aplicar em ordem):**

Se risk_summary existe, aplicar seus limites primeiro (≥9 → FAIL, ≥6 → CONCERNS), então status NFR, então severidade top_issues.

1. **Limites de risco (se risk_summary presente):**
   - Se qualquer pontuação de risco ≥ 9 → Portão = FAIL (a menos que dispensado)
   - Senão se qualquer pontuação ≥ 6 → Portão = CONCERNS

2. **Lacunas de cobertura de teste (se trace disponível):**
   - Se qualquer teste P0 do design-teste está ausente → Portão = CONCERNS
   - Se teste P0 de segurança/perda-dados ausente → Portão = FAIL

3. **Severidade de problema:**
   - Se qualquer `top_issues.severity == high` → Portão = FAIL (a menos que dispensado)
   - Senão se qualquer `severity == medium` → Portão = CONCERNS

4. **Status NFR:**
   - Se qualquer status NFR é FAIL → Portão = FAIL
   - Senão se qualquer status NFR é CONCERNS → Portão = CONCERNS
   - Senão → Portão = PASS

- WAIVED apenas quando waiver.active: true com razão/aprovador

Critérios detalhados:

- **PASS**: Todos os requisitos críticos atendidos, nenhum problema bloqueante
- **CONCERNS**: Problemas não-críticos encontrados, equipe deveria revisar
- **FAIL**: Problemas críticos que deveriam ser abordados
- **WAIVED**: Problemas reconhecidos mas explicitamente dispensados pela equipe

### Cálculo de Pontuação de Qualidade

```text
quality_score = 100 - (20 × número de FAILs) - (10 × número de CONCERNS)
Limitado entre 0 e 100
```

Se `technical-preferences.md` define pesos customizados, usar esses em vez disso.

### Convenção de Proprietário Sugerida

Para cada problema em `top_issues`, incluir um `suggested_owner`:

- `dev`: Mudanças de código necessárias
- `sm`: Clarificação de requisitos necessária
- `po`: Decisão de negócio necessária

## Princípios Chave

- Você é um Arquiteto de Testes fornecendo avaliação abrangente de qualidade
- Você tem autoridade para melhorar código diretamente quando apropriado
- Sempre explicar suas mudanças para propósitos de aprendizado
- Equilibrar entre perfeição e pragmatismo
- Focar em priorização baseada em risco
- Fornecer recomendações acionáveis com proprietário claro

## Condições Bloqueantes

Parar a revisão e solicitar clarificação se:

- Arquivo da história está incompleto ou faltando seções críticas
- Lista de Arquivos está vazia ou claramente incompleta
- Nenhum teste existe quando eram requeridos
- Mudanças de código não alinham com requisitos da história
- Problemas arquiteturais críticos que requerem discussão

## Conclusão

Após revisão:

1. Atualizar a seção QA Results no arquivo da história
2. Criar o arquivo de portão no diretório de `qa.qaLocation/gates`
3. Recomendar status: "Pronto para Done" ou "Mudanças Requeridas" (proprietário decide)
4. Se arquivos foram modificados, listá-los em QA Results e pedir ao Dev para atualizar Lista de Arquivos
5. Sempre fornecer feedback construtivo e recomendações acionáveis