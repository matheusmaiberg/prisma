<!-- Desenvolvido por PRISMA™ Core -->

# aplicar-correcoes-qa

Implementar correções baseadas nos resultados de QA (portão e avaliações) para uma história específica. Esta tarefa é para o agente Dev consumir sistematicamente os resultados de QA e aplicar mudanças de código/testes, atualizando apenas as seções permitidas no arquivo da história.

## Propósito

- Ler resultados de QA para uma história (portão YAML + markdowns de avaliação)
- Criar um plano de correção priorizado e determinístico
- Aplicar mudanças de código e testes para fechar lacunas e resolver problemas
- Atualizar apenas as seções permitidas da história para o agente Dev

## Entradas

```yaml
obrigatório:
  - story_id: '{épico}.{história}' # ex: "2.2"
  - qa_root: do `bmad-core/core-config.yaml` chave `qa.qaLocation` (ex: `docs/project/qa`)
  - story_root: do `bmad-core/core-config.yaml` chave `devStoryLocation` (ex: `docs/project/stories`)

opcional:
  - story_title: '{título}' # derivar do H1 da história se ausente
  - story_slug: '{slug}' # derivar do título (minúsculo, hifenizado) se ausente
```

## Fontes de QA para Ler

- Portão (YAML): `{qa_root}/gates/{épico}.{história}-*.yml`
  - Se múltiplos, usar o mais recente por tempo de modificação
- Avaliações (Markdown):
  - Design de Testes: `{qa_root}/assessments/{épico}.{história}-test-design-*.md`
  - Rastreabilidade: `{qa_root}/assessments/{épico}.{história}-trace-*.md`
  - Perfil de Risco: `{qa_root}/assessments/{épico}.{história}-risk-*.md`
  - Avaliação NFR: `{qa_root}/assessments/{épico}.{história}-nfr-*.md`

## Pré-requisitos

- Repositório constrói e testes executam localmente (Deno 2)
- Comandos de lint e teste disponíveis:
  - `deno lint`
  - `deno test -A`

## Processo (Não pule etapas)

### 0) Carregar Configuração Core & Localizar História

- Ler `bmad-core/core-config.yaml` e resolver `qa_root` e `story_root`
- Localizar arquivo da história em `{story_root}/{épico}.{história}.*.md`
  - PARAR se ausente e pedir o id/caminho correto da história

### 1) Coletar Achados de QA

- Analisar o YAML do portão mais recente:
  - `gate` (PASS|CONCERNS|FAIL|WAIVED)
  - `top_issues[]` com `id`, `severity`, `finding`, `suggested_action`
  - `nfr_validation.*.status` e notas
  - `trace` resumo de cobertura/lacunas
  - `test_design.coverage_gaps[]`
  - `risk_summary.recommendations.must_fix[]` (se presente)
- Ler qualquer markdown de avaliação presente e extrair lacunas/recomendações explícitas

### 2) Construir Plano de Correção Determinístico (Ordem de Prioridade)

Aplicar em ordem, prioridade mais alta primeiro:

1. Itens de alta severidade em `top_issues` (segurança/perf/confiabilidade/manutenibilidade)
2. Status NFR: todos os FAIL devem ser corrigidos → depois CONCERNS
3. `coverage_gaps` do Design de Testes (priorizar cenários P0 se especificados)
4. Requisitos não cobertos por rastreamento (nível AC)
5. Recomendações `must_fix` de risco
6. Problemas de severidade média, depois baixa

Orientação:

- Preferir testes fechando lacunas de cobertura antes/com mudanças de código
- Manter mudanças mínimas e direcionadas; seguir arquitetura do projeto e regras TS/Deno

### 3) Aplicar Mudanças

- Implementar correções de código conforme plano
- Adicionar testes ausentes para fechar lacunas de cobertura (unidade primeiro; integração onde requerido pelo AC)
- Manter importações centralizadas via `deps.ts` (ver `docs/project/typescript-rules.md`)
- Seguir limites de DI em `src/core/di.ts` e padrões existentes

### 4) Validar

- Executar `deno lint` e corrigir problemas
- Executar `deno test -A` até todos os testes passarem
- Iterar até ficar limpo

### 5) Atualizar História (Seções Permitidas APENAS)

CRÍTICO: O agente Dev está APENAS autorizado a atualizar estas seções do arquivo da história. Não modifique outras seções (ex: Resultados QA, História, Critérios de Aceitação, Notas Dev, Testes):

- Checkboxes de Tarefas / Subtarefas (marcar qualquer subtarefa de correção que você adicionou como feita)
- Registro do Agente Dev →
  - Modelo do Agente Usado (se mudou)
  - Referências do Log de Debug (comandos/resultados, ex: lint/testes)
  - Lista de Notas de Conclusão (o que mudou, por que, como)
  - Lista de Arquivos (todos os arquivos adicionados/modificados/deletados)
- Log de Mudanças (nova entrada datada descrevendo correções aplicadas)
- Status (ver Regra abaixo)

Regra de Status:

- Se o portão era PASS e todas as lacunas identificadas estão fechadas → definir `Status: Pronto para Finalização`
- Caso contrário → definir `Status: Pronto para Revisão` e notificar QA para re-executar a revisão

### 6) NÃO Editar Arquivos de Portão

- Dev não modifica YAML do portão. Se as correções resolvem problemas, solicitar QA para re-executar `review-story` para atualizar o portão

## Condições de Bloqueio

- `bmad-core/core-config.yaml` ausente
- Arquivo da história não encontrado para `story_id`
- Nenhum artefato de QA encontrado (nem portão nem avaliações)
  - PARAR e solicitar QA para gerar pelo menos um arquivo de portão (ou prosseguir apenas com lista de correções clara fornecida pelo desenvolvedor)

## Checklist de Conclusão

- deno lint: 0 problemas
- deno test -A: todos os testes passam
- Todos os `top_issues` de alta severidade resolvidos
- NFR FAIL → resolvido; CONCERNS minimizados ou documentados
- Lacunas de cobertura fechadas ou explicitamente documentadas com justificativa
- História atualizada (seções permitidas apenas) incluindo Lista de Arquivos e Log de Mudanças
- Status definido conforme Regra de Status

## Exemplo: História 2.2

Dado o portão `docs/project/qa/gates/2.2-*.yml` mostra

- `coverage_gaps`: Comportamento da ação Voltar não testado (AC2)
- `coverage_gaps`: Aplicação de dependências centralizadas não testada (AC4)

Plano de correção:

- Adicionar um teste garantindo que a ação "Voltar" do Menu de Ferramentas retorna ao Menu Principal
- Adicionar um teste estático verificando importações para service/view passam por `deps.ts`
- Re-executar lint/testes e atualizar Registro do Agente Dev + Lista de Arquivos adequadamente

## Princípios Chave

- Priorização determinística, primeiro o risco
- Mudanças mínimas e manuteníveis
- Testes validam comportamento e fecham lacunas
- Aderência estrita às áreas de atualização permitidas da história
- Propriedade do portão permanece com QA; Dev sinaliza prontidão via Status