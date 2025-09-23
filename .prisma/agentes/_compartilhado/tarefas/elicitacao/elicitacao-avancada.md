<!-- Desenvolvido por BMAD™ Core -->

# Tarefa: Elicitação Avançada

## Propósito

- Fornecer ações reflexivas e de brainstorming opcionais para melhorar a qualidade do conteúdo
- Permitir exploração mais profunda de ideias através de técnicas estruturadas de elicitação
- Apoiar refinamento iterativo através de múltiplas perspectivas analíticas
- Utilizável durante criação de documentos orientados por template ou qualquer conversa em chat

## Cenários de Uso

### Cenário 1: Criação de Documento Template

Após produzir uma seção durante criação de documento:

1. **Revisão da Seção**: Peça ao usuário para revisar a seção rascunhada
2. **Oferecer Elicitação**: Apresente 9 métodos de elicitação cuidadosamente selecionados
3. **Seleção Simples**: Usuário digita um número (0-8) para engajar método, ou 9 para prosseguir
4. **Executar e Repetir**: Aplique método selecionado, então reofereça escolhas até usuário prosseguir

### Cenário 2: Elicitação Geral em Chat

Usuário pode solicitar elicitação avançada em qualquer saída do agente:

- Usuário diz "faça elicitação avançada" ou similar
- Agente seleciona 9 métodos relevantes para o contexto
- Mesmo processo simples de seleção 0-9

## Instruções da Tarefa

### 1. Seleção Inteligente de Métodos

**Análise de Contexto**: Antes de apresentar opções, analise:

- **Tipo de Conteúdo**: Especificações técnicas, histórias de usuário, arquitetura, requisitos, etc.
- **Nível de Complexidade**: Conteúdo simples, moderado ou complexo
- **Necessidades dos Stakeholders**: Quem usará esta informação
- **Nível de Risco**: Decisões de alto impacto vs itens de rotina
- **Potencial Criativo**: Oportunidades para inovação ou alternativas

**Estratégia de Seleção de Métodos**:

1. **Sempre Incluir Métodos Centrais** (escolha 3-4):
   - Expandir ou Contrair para Audiência
   - Criticar e Refinar
   - Identificar Riscos Potenciais
   - Avaliar Alinhamento com Objetivos

2. **Métodos Específicos do Contexto** (escolha 4-5):
   - **Conteúdo Técnico**: Árvore de Pensamentos, ReWOO, Meta-Prompting
   - **Conteúdo Voltado ao Usuário**: Perspectiva da Equipe Ágil, Mesa Redonda de Stakeholders
   - **Conteúdo Criativo**: Torneio de Inovação, Desafio Escape Room
   - **Conteúdo Estratégico**: Time Vermelho vs Time Azul, Reflexão Retrospectiva

3. **Sempre Incluir**: "Prosseguir / Nenhuma Ação Adicional" como opção 9

### 2. Contexto da Seção e Revisão

Quando invocado após produzir uma seção:

1. **Fornecer Resumo de Contexto**: Dê um breve resumo de 1-2 frases do que o usuário deve procurar na seção recém-apresentada

2. **Explicar Elementos Visuais**: Se a seção contém diagramas, explique-os brevemente antes de oferecer opções de elicitação

3. **Esclarecer Opções de Escopo**: Se a seção contém múltiplos itens distintos, informe ao usuário que pode aplicar ações de elicitação para:
   - A seção inteira como um todo
   - Itens individuais dentro da seção (especifique qual item ao selecionar uma ação)

### 3. Apresentar Opções de Elicitação

**Processo de Solicitação de Revisão:**

- Peça ao usuário para revisar a seção rascunhada
- Na MESMA mensagem, informe que podem sugerir mudanças diretas OU selecionar um método de elicitação
- Apresente 9 métodos inteligentemente selecionados (0-8) mais "Prosseguir" (9)
- Mantenha descrições curtas - apenas o nome do método
- Aguarde seleção numérica simples

**Formato de Apresentação da Lista de Ações:**

```text
**Opções de Elicitação Avançada**
Escolha um número (0-8) ou 9 para prosseguir:

0. [Nome do Método]
1. [Nome do Método]
2. [Nome do Método]
3. [Nome do Método]
4. [Nome do Método]
5. [Nome do Método]
6. [Nome do Método]
7. [Nome do Método]
8. [Nome do Método]
9. Prosseguir / Nenhuma Ação Adicional
```

**Tratamento de Resposta:**

- **Números 0-8**: Execute o método selecionado, então reofereça a escolha
- **Número 9**: Prossiga para próxima seção ou continue conversa
- **Feedback Direto**: Aplique mudanças sugeridas pelo usuário e continue

### 4. Framework de Execução de Métodos

**Processo de Execução:**

1. **Recuperar Método**: Acesse o método específico de elicitação do arquivo de dados elicitation-methods
2. **Aplicar Contexto**: Execute o método da perspectiva do seu papel atual
3. **Fornecer Resultados**: Entregue insights, críticas ou alternativas relevantes ao conteúdo
4. **Reoferecer Escolha**: Apresente as mesmas 9 opções novamente até usuário selecionar 9 ou dar feedback direto

**Diretrizes de Execução:**

- **Seja Conciso**: Foque em insights acionáveis, não explicações longas
- **Mantenha Relevância**: Conecte toda elicitação de volta ao conteúdo específico sendo analisado
- **Identifique Personas**: Para métodos multi-persona, identifique claramente qual ponto de vista está falando
- **Mantenha o Fluxo**: Mantenha o processo avançando eficientemente