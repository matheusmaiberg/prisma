<!-- Desenvolvido por BMAD™ Core -->

# Tarefa: Criar Prompt de Pesquisa Profunda

Esta tarefa ajuda a criar prompts de pesquisa abrangentes para vários tipos de análise profunda. Pode processar entradas de sessões de brainstorming, briefs de projeto, pesquisa de mercado ou perguntas específicas de pesquisa para gerar prompts direcionados para investigação mais profunda.

## Propósito

Gerar prompts de pesquisa bem estruturados que:

- Definem objetivos e escopo claros de pesquisa
- Especificam metodologias de pesquisa apropriadas
- Delineiam entregáveis e formatos esperados
- Guiam investigação sistemática de tópicos complexos
- Garantem que insights acionáveis sejam capturados

## Seleção do Tipo de Pesquisa

CRÍTICO: Primeiro, ajude o usuário a selecionar o foco de pesquisa mais apropriado baseado em suas necessidades e quaisquer documentos de entrada que tenham fornecido.

### 1. Opções de Foco de Pesquisa

Apresente estas opções numeradas ao usuário:

1. **Pesquisa de Validação de Produto**
   - Validar hipóteses de produto e adequação ao mercado
   - Testar suposições sobre necessidades dos usuários e soluções
   - Avaliar viabilidade técnica e de negócio
   - Identificar riscos e estratégias de mitigação

2. **Pesquisa de Oportunidade de Mercado**
   - Analisar tamanho e potencial de crescimento do mercado
   - Identificar segmentos e dinâmicas de mercado
   - Avaliar estratégias de entrada no mercado
   - Avaliar timing e prontidão do mercado

3. **Pesquisa de Usuário e Cliente**
   - Mergulho profundo em personas e comportamentos de usuário
   - Entender jobs-to-be-done e pontos de dor
   - Mapear jornadas e pontos de contato do cliente
   - Analisar disposição a pagar e percepção de valor

4. **Pesquisa de Inteligência Competitiva**
   - Análise detalhada de concorrentes e posicionamento
   - Comparações de recursos e capacidades
   - Análise de modelo de negócio e estratégia
   - Identificar vantagens competitivas e lacunas

5. **Pesquisa de Tecnologia e Inovação**
   - Avaliar tendências e possibilidades tecnológicas
   - Avaliar abordagens e arquiteturas técnicas
   - Identificar tecnologias emergentes e disrupções
   - Analisar opções construir vs. comprar vs. parceria

6. **Pesquisa de Indústria e Ecossistema**
   - Mapear cadeias de valor e dinâmicas da indústria
   - Identificar principais players e relacionamentos
   - Analisar fatores regulatórios e de conformidade
   - Entender oportunidades de parceria

7. **Pesquisa de Opções Estratégicas**
   - Avaliar diferentes direções estratégicas
   - Avaliar alternativas de modelo de negócio
   - Analisar estratégias de go-to-market
   - Considerar caminhos de expansão e escalabilidade

8. **Pesquisa de Risco e Viabilidade**
   - Identificar e avaliar vários fatores de risco
   - Avaliar desafios de implementação
   - Analisar requisitos de recursos
   - Considerar implicações regulatórias e legais

9. **Foco de Pesquisa Personalizado**
   - Objetivos de pesquisa definidos pelo usuário
   - Investigação de domínio especializado
   - Necessidades de pesquisa multifuncionais

### 2. Processamento de Entrada

**Se Brief de Projeto fornecido:**

- Extrair conceitos e objetivos chave do produto
- Identificar usuários-alvo e casos de uso
- Notar restrições técnicas e preferências
- Destacar incertezas e suposições

**Se Resultados de Brainstorming fornecidos:**

- Sintetizar ideias e temas principais
- Identificar áreas que precisam de validação
- Extrair hipóteses para testar
- Notar direções criativas para explorar

**Se Pesquisa de Mercado fornecida:**

- Construir sobre oportunidades identificadas
- Aprofundar insights específicos de mercado
- Validar descobertas iniciais
- Explorar possibilidades adjacentes

**Se Começando do Zero:**

- Coletar contexto essencial através de perguntas
- Definir o espaço do problema
- Clarificar objetivos de pesquisa
- Estabelecer critérios de sucesso

## Processo

### 3. Estrutura do Prompt de Pesquisa

CRÍTICO: desenvolver colaborativamente um prompt de pesquisa abrangente com estes componentes.

#### A. Objetivos de Pesquisa

CRÍTICO: colaborar com o usuário para articular objetivos claros e específicos para a pesquisa.

- Meta e propósito primário da pesquisa
- Decisões chave que a pesquisa informará
- Critérios de sucesso para a pesquisa
- Restrições e limites

#### B. Perguntas de Pesquisa

CRÍTICO: colaborar com o usuário para desenvolver perguntas específicas e acionáveis de pesquisa organizadas por tema.

**Perguntas Centrais:**

- Perguntas centrais que devem ser respondidas
- Classificação de prioridade das perguntas
- Dependências entre perguntas

**Perguntas de Apoio:**

- Perguntas adicionais de construção de contexto
- Insights seria-bom-ter
- Considerações voltadas ao futuro

#### C. Metodologia de Pesquisa

**Métodos de Coleta de Dados:**

- Fontes de pesquisa secundária
- Abordagens de pesquisa primária (se aplicável)
- Requisitos de qualidade de dados
- Critérios de credibilidade da fonte

**Frameworks de Análise:**

- Frameworks específicos para aplicar
- Critérios de comparação
- Metodologias de avaliação
- Abordagens de síntese

#### D. Requisitos de Saída

**Especificações de Formato:**

- Requisitos de resumo executivo
- Estrutura de descobertas detalhadas
- Apresentações visuais/tabulares
- Documentação de apoio

**Entregáveis Chave:**

- Seções e insights imprescindíveis
- Elementos de apoio à decisão
- Recomendações orientadas à ação
- Documentação de risco e incerteza

### 4. Geração de Prompt

**Template de Prompt de Pesquisa:**

```markdown
## Objetivo da Pesquisa

[Declaração clara do que esta pesquisa visa alcançar]

## Contexto de Background

[Informação relevante de brief de projeto, brainstorming ou outras entradas]

## Perguntas de Pesquisa

### Perguntas Primárias (Deve Responder)

1. [Pergunta específica e acionável]
2. [Pergunta específica e acionável]
   ...

### Perguntas Secundárias (Seria Bom Ter)

1. [Pergunta de apoio]
2. [Pergunta de apoio]
   ...

## Metodologia de Pesquisa

### Fontes de Informação

- [Tipos de fonte específicos e prioridades]

### Frameworks de Análise

- [Frameworks específicos para aplicar]

### Requisitos de Dados

- [Necessidades de qualidade, atualidade, credibilidade]

## Entregáveis Esperados

### Resumo Executivo

- Descobertas e insights chave
- Implicações críticas
- Ações recomendadas

### Análise Detalhada

[Seções específicas necessárias baseadas no tipo de pesquisa]

### Materiais de Apoio

- Tabelas de dados
- Matrizes de comparação
- Documentação de fontes

## Critérios de Sucesso

[Como avaliar se a pesquisa alcançou seus objetivos]

## Cronograma e Prioridade

[Se aplicável, quaisquer restrições de tempo ou faseamento]
```

### 5. Revisão e Refinamento

1. **Apresentar Prompt Completo**
   - Mostrar o prompt completo de pesquisa
   - Explicar elementos chave e justificativa
   - Destacar quaisquer suposições feitas

2. **Coletar Feedback**
   - Os objetivos estão claros e corretos?
   - As perguntas abordam todas as preocupações?
   - O escopo é apropriado?
   - Os requisitos de saída são suficientes?

3. **Refinar Conforme Necessário**
   - Incorporar feedback do usuário
   - Ajustar escopo ou foco
   - Adicionar elementos ausentes
   - Clarificar ambiguidades

### 6. Orientação de Próximos Passos

**Opções de Execução:**

1. **Usar com Assistente de Pesquisa IA**: Fornecer este prompt a um modelo de IA com capacidades de pesquisa
2. **Guiar Pesquisa Humana**: Usar como framework para esforços de pesquisa manual
3. **Abordagem Híbrida**: Combinar pesquisa de IA e humana usando esta estrutura

**Pontos de Integração:**

- Como descobertas alimentarão próximas fases
- Quais membros da equipe devem revisar resultados
- Como validar descobertas
- Quando revisitar ou expandir pesquisa

## Notas Importantes

- A qualidade do prompt de pesquisa impacta diretamente a qualidade dos insights coletados
- Seja específico ao invés de geral nas perguntas de pesquisa
- Considere tanto estado atual quanto implicações futuras
- Balance abrangência com foco
- Documente suposições e limitações claramente
- Planeje refinamento iterativo baseado em descobertas iniciais