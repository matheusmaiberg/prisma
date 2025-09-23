<!-- Desenvolvido por BMAD™ Core -->

# Base de Conhecimento BMAD™

## Visão Geral

BMAD-METHOD™ (Método Revolucionário de Desenvolvimento Ágil Impulsionado por IA) é um framework que combina agentes de IA com metodologias de desenvolvimento Ágil. O sistema v4 introduz uma arquitetura modular com gerenciamento aprimorado de dependências, otimização de bundles e suporte para ambientes web e IDE.

### Recursos Principais

- **Sistema de Agentes Modular**: Agentes de IA especializados para cada função Ágil
- **Sistema de Construção**: Resolução automatizada de dependências e otimização
- **Suporte Duplo de Ambiente**: Otimizado para UIs web e IDEs
- **Recursos Reutilizáveis**: Modelos, tarefas e checklists portáteis
- **Integração de Comandos Slash**: Alternância rápida de agentes e controle

### Quando Usar o BMad

- **Projetos Novos (Campo Verde)**: Desenvolvimento completo de ponta a ponta
- **Projetos Existentes (Campo Marrom)**: Adições de recursos e melhorias
- **Colaboração em Equipe**: Múltiplas funções trabalhando juntas
- **Garantia de Qualidade**: Testes estruturados e validação
- **Documentação**: PRDs profissionais, documentos de arquitetura, histórias de usuário

## Como o BMad Funciona

### O Método Central

O BMad te transforma em um "CEO de Vibração" - direcionando uma equipe de agentes de IA especializados através de fluxos de trabalho estruturados. Veja como:

1. **Você Dirige, IA Executa**: Você fornece visão e decisões; agentes lidam com detalhes de implementação
2. **Agentes Especializados**: Cada agente domina uma função (PM, Desenvolvedor, Arquiteto, etc.)
3. **Fluxos de Trabalho Estruturados**: Padrões comprovados te guiam da ideia ao código implementado
4. **Transferências Limpas**: Janelas de contexto frescas garantem que os agentes permaneçam focados e eficazes

### A Abordagem de Duas Fases

#### Fase 1: Planejamento (Interface Web - Econômica)

- Use janelas de contexto grandes (1M tokens do Gemini)
- Gere documentos abrangentes (PRD, Arquitetura)
- Aproveite múltiplos agentes para brainstorming
- Crie uma vez, use durante todo o desenvolvimento

#### Fase 2: Desenvolvimento (IDE - Implementação)

- Fragmente documentos em pedaços gerenciáveis
- Execute ciclos focados SM → Dev
- Uma história por vez, progresso sequencial
- Operações de arquivos e testes em tempo real

### O Loop de Desenvolvimento

```text
1. Agente SM (Novo Chat) → Cria próxima história dos documentos fragmentados
2. Você → Revisa e aprova a história
3. Agente Dev (Novo Chat) → Implementa a história aprovada
4. Agente QA (Novo Chat) → Revisa e refatora o código
5. Você → Verifica a conclusão
6. Repita até o épico estar completo
```

### Por Que Isso Funciona

- **Otimização de Contexto**: Chats limpos = melhor desempenho da IA
- **Clareza de Função**: Agentes não mudam de contexto = maior qualidade
- **Progresso Incremental**: Histórias pequenas = complexidade gerenciável
- **Supervisão Humana**: Você valida cada etapa = controle de qualidade
- **Dirigido por Documentos**: Especificações guiam tudo = consistência

## Começando

### Opções de Início Rápido

#### Opção 1: Interface Web

**Melhor para**: Usuários do ChatGPT, Claude, Gemini que querem começar imediatamente

1. Navegue para `dist/teams/`
2. Copie o conteúdo de `team-fullstack.txt`
3. Crie uma nova Gem do Gemini ou CustomGPT
4. Carregue o arquivo com instruções: "Suas instruções operacionais críticas estão anexadas, não quebre o personagem conforme direcionado"
5. Digite `/help` para ver os comandos disponíveis

#### Opção 2: Integração IDE

**Melhor para**: Usuários do Cursor, Claude Code, Windsurf, Trae, Cline, Roo Code, Github Copilot

```bash
# Instalação interativa (recomendada)
npx bmad-method install
```

**Passos de Instalação**:

- Escolha "Instalação completa"
- Selecione seu IDE das opções suportadas:
  - **Cursor**: Integração nativa de IA
  - **Claude Code**: IDE oficial da Anthropic
  - **Windsurf**: Recursos de IA integrados
  - **Trae**: Recursos de IA integrados
  - **Cline**: Extensão do VS Code com recursos de IA
  - **Roo Code**: IDE baseado na web com suporte a agentes
  - **GitHub Copilot**: Extensão do VS Code com assistente de programação em pares de IA
  - **Auggie CLI (Augment Code)**: Ambiente de desenvolvimento impulsionado por IA

**Nota para Usuários do VS Code**: O BMAD-METHOD™ assume que quando você menciona "VS Code" está usando-o com uma extensão impulsionada por IA como GitHub Copilot, Cline ou Roo. O VS Code padrão sem recursos de IA não pode executar agentes BMad. O instalador inclui suporte integrado para Cline e Roo.

**Verificar Instalação**:

- Pasta `.bmad-core/` criada com todos os agentes
- Arquivos de integração específicos do IDE criados
- Todos os comandos/regras/modos de agentes disponíveis

**Lembre-se**: Em seu núcleo, o BMAD-METHOD™ é sobre dominar e aproveitar a engenharia de prompts. Qualquer IDE com suporte a agentes de IA pode usar o BMad - o framework fornece os prompts estruturados e fluxos de trabalho que tornam o desenvolvimento de IA eficaz

### Guia de Seleção de Ambiente

**Use Interface Web para**:

- Planejamento inicial e documentação (PRD, arquitetura)
- Criação de documentos econômica (especialmente com Gemini)
- Fases de brainstorming e análise
- Consulta multi-agente e planejamento

**Use IDE para**:

- Desenvolvimento ativo e codificação
- Operações de arquivo e integração de projeto
- Fragmentação de documentos e gerenciamento de histórias
- Fluxo de trabalho de implementação (ciclos SM/Dev)

**Dica de Economia de Custos**: Crie documentos grandes (PRDs, arquitetura) na interface web, depois copie para `docs/prd.md` e `docs/architecture.md` em seu projeto antes de mudar para IDE para desenvolvimento.

### Considerações de Fluxo de Trabalho Apenas IDE

**Você pode fazer tudo no IDE?** Sim, mas entenda as trocas:

**Prós do Apenas IDE**:

- Fluxo de trabalho de ambiente único
- Operações de arquivo diretas desde o início
- Sem copiar/colar entre ambientes
- Integração imediata do projeto

**Contras do Apenas IDE**:

- Custos de token maiores para criação de documentos grandes
- Janelas de contexto menores (varia por IDE/modelo)
- Pode atingir limites durante fases de planejamento
- Menos econômico para brainstorming

**Usando Agentes Web no IDE**:

- **NÃO RECOMENDADO**: Agentes web (PM, Arquiteto) têm dependências ricas projetadas para contextos grandes
- **Por que importa**: Agentes Dev são mantidos enxutos para maximizar o contexto de codificação
- **O princípio**: "Agentes Dev codificam, agentes de planejamento planejam" - misturar quebra essa otimização

**Sobre bmad-master e bmad-orchestrator**:

- **bmad-master**: PODE fazer qualquer tarefa sem trocar agentes, MAS...
- **Ainda use agentes especializados para planejamento**: PM, Arquiteto e UX Expert têm personas ajustadas que produzem melhores resultados
- **Por que a especialização importa**: A personalidade e foco de cada agente cria saídas de maior qualidade
- **Se usando bmad-master/orchestrator**: Bom para fases de planejamento, mas...

**REGRA CRÍTICA para Desenvolvimento**:

- **SEMPRE use agente SM para criação de histórias** - Nunca use bmad-master ou bmad-orchestrator
- **SEMPRE use agente Dev para implementação** - Nunca use bmad-master ou bmad-orchestrator
- **Por que isso importa**: Agentes SM e Dev são especificamente otimizados para o fluxo de trabalho de desenvolvimento
- **Sem exceções**: Mesmo se usando bmad-master para tudo mais, mude para SM → Dev para implementação

**Melhor Prática para Apenas IDE**:

1. Use agentes PM/Arquiteto/UX para planejamento (melhor que bmad-master)
2. Crie documentos diretamente no projeto
3. Fragmente imediatamente após criação
4. **DEVE mudar para agente SM** para criação de histórias
5. **DEVE mudar para agente Dev** para implementação
6. Mantenha planejamento e codificação em sessões de chat separadas
## Configuração Central (core-config.yaml)

**Novo na V4**: O arquivo `bmad-core/core-config.yaml` é uma inovação crítica que permite ao BMad trabalhar perfeitamente com qualquer estrutura de projeto, fornecendo máxima flexibilidade e compatibilidade com versões anteriores.

### O que é core-config.yaml?

Este arquivo de configuração atua como um mapa para agentes BMad, dizendo-lhes exatamente onde encontrar seus documentos de projeto e como eles estão estruturados. Ele permite:

- **Flexibilidade de Versão**: Trabalhe com estruturas de documentos V3, V4 ou personalizadas
- **Locais Personalizados**: Defina onde seus documentos e fragmentos residem
- **Contexto do Desenvolvedor**: Especifique quais arquivos o agente dev deve sempre carregar
- **Suporte de Debug**: Log integrado para solução de problemas

### Áreas de Configuração Principais

#### Configuração PRD

- **prdVersion**: Informa aos agentes se o PRD segue convenções v3 ou v4
- **prdSharded**: Se épicos estão incorporados (false) ou em arquivos separados (true)
- **prdShardedLocation**: Onde encontrar arquivos de épicos fragmentados
- **epicFilePattern**: Padrão para nomes de arquivos de épicos (ex: `epic-{n}*.md`)

#### Configuração de Arquitetura

- **architectureVersion**: v3 (monolítica) ou v4 (fragmentada)
- **architectureSharded**: Se a arquitetura está dividida em componentes
- **architectureShardedLocation**: Onde os arquivos de arquitetura fragmentados residem

#### Arquivos do Desenvolvedor

- **devLoadAlwaysFiles**: Lista de arquivos que o agente dev carrega para cada tarefa
- **devDebugLog**: Onde o agente dev registra falhas repetidas
- **agentCoreDump**: Local de exportação para conversas de chat

### Por Que Importa

1. **Sem Migrações Forçadas**: Mantenha sua estrutura de documento existente
2. **Adoção Gradual**: Comece com V3 e migre para V4 no seu ritmo
3. **Fluxos de Trabalho Personalizados**: Configure o BMad para corresponder ao processo da sua equipe
4. **Agentes Inteligentes**: Agentes se adaptam automaticamente à sua configuração

### Configurações Comuns

**Projeto Legacy V3**:

```yaml
prdVersion: v3
prdSharded: false
architectureVersion: v3
architectureSharded: false
```

**Projeto Otimizado V4**:

```yaml
prdVersion: v4
prdSharded: true
prdShardedLocation: docs/prd
architectureVersion: v4
architectureSharded: true
architectureShardedLocation: docs/architecture
```

## Filosofia Central

### CEO de Vibração

Você é o "CEO de Vibração" - pensando como um CEO com recursos ilimitados e uma visão singular. Seus agentes de IA são sua equipe de alto poder, e seu papel é:

- **Dirigir**: Fornecer instruções e objetivos claros
- **Refinar**: Iterar saídas para alcançar qualidade
- **Supervisionar**: Manter alinhamento estratégico entre todos os agentes

### Princípios Centrais

1. **MAXIMIZE_AI_LEVERAGE**: Force a IA a entregar mais. Desafie as saídas e itere.
2. **QUALITY_CONTROL**: Você é o árbitro final da qualidade. Revise todas as saídas.
3. **STRATEGIC_OVERSIGHT**: Mantenha a visão de alto nível e garanta o alinhamento.
4. **ITERATIVE_REFINEMENT**: Espere revisitar etapas. Este não é um processo linear.
5. **CLEAR_INSTRUCTIONS**: Solicitações precisas levam a melhores saídas.
6. **DOCUMENTATION_IS_KEY**: Boas entradas (briefings, PRDs) levam a boas saídas.
7. **START_SMALL_SCALE_FAST**: Teste conceitos, depois expanda.
8. **EMBRACE_THE_CHAOS**: Adapte-se e supere desafios.

### Princípios Principais do Fluxo de Trabalho

1. **Especialização de Agentes**: Cada agente tem expertise e responsabilidades específicas
2. **Transferências Limpas**: Sempre comece do zero ao alternar entre agentes
3. **Rastreamento de Status**: Mantenha status das histórias (Rascunho → Aprovado → EmAndamento → Concluído)
4. **Desenvolvimento Iterativo**: Complete uma história antes de começar a próxima
5. **Documentação Primeiro**: Sempre comece com PRD e arquitetura sólidos

## Sistema de Agentes

### Equipe de Desenvolvimento Central

| Agente      | Função             | Funções Principais                       | Quando Usar                            |
| ----------- | ------------------ | --------------------------------------- | -------------------------------------- |
| `analyst`   | Analista de Negócios | Pesquisa de mercado, coleta de requisitos | Planejamento de projeto, análise competitiva |
| `pm`        | Gerente de Produto | Criação de PRD, priorização de recursos | Planejamento estratégico, roadmaps     |
| `architect` | Arquiteto de Solução | Design de sistema, arquitetura técnica | Sistemas complexos, planejamento de escalabilidade |
| `dev`       | Desenvolvedor      | Implementação de código, debugging     | Todas as tarefas de desenvolvimento    |
| `qa`        | Especialista QA    | Planejamento de testes, garantia de qualidade | Estratégias de teste, validação de bugs |
| `ux-expert` | Designer UX        | Design UI/UX, protótipos              | Experiência do usuário, design de interface |
| `po`        | Product Owner      | Gerenciamento de backlog, validação de histórias | Refinamento de histórias, critérios de aceitação |
| `sm`        | Scrum Master       | Planejamento de sprint, criação de histórias | Gerenciamento de projeto, fluxo de trabalho |

### Meta Agentes

| Agente              | Função           | Funções Principais                    | Quando Usar                      |
| ------------------- | ---------------- | ------------------------------------- | -------------------------------- |
| `bmad-orchestrator` | Coordenador de Equipe | Fluxos de trabalho multi-agente, mudança de funções | Tarefas complexas multi-função |
| `bmad-master`       | Especialista Universal | Todas as capacidades sem mudança   | Trabalho abrangente de sessão única |

### Comandos de Interação de Agentes

#### Sintaxe Específica do IDE

**Carregamento de Agente por IDE**:

- **Claude Code**: `/nome-agente` (ex: `/bmad-master`)
- **Cursor**: `@nome-agente` (ex: `@bmad-master`)
- **Windsurf**: `/nome-agente` (ex: `/bmad-master`)
- **Trae**: `@nome-agente` (ex: `@bmad-master`)
- **Roo Code**: Selecione modo do seletor de modo (ex: `bmad-master`)
- **GitHub Copilot**: Abra a visualização de Chat (`⌃⌘I` no Mac, `Ctrl+Alt+I` no Windows/Linux) e selecione **Agent** do seletor de modo de chat.

**Diretrizes de Gerenciamento de Chat**:

- **Claude Code, Cursor, Windsurf, Trae**: Inicie novos chats ao alternar agentes
- **Roo Code**: Mude modos dentro da mesma conversa

**Comandos de Tarefas Comuns**:

- `*help` - Mostrar comandos disponíveis
- `*status` - Mostrar contexto/progresso atual
- `*exit` - Sair do modo agente
- `*shard-doc docs/prd.md prd` - Fragmentar PRD em pedaços gerenciáveis
- `*shard-doc docs/architecture.md architecture` - Fragmentar documento de arquitetura
- `*create` - Executar tarefa create-next-story (agente SM)

**Na Interface Web**:

```text
/pm create-doc prd
/architect review system design
/dev implement story 1.2
/help - Mostrar comandos disponíveis
/switch nome-agente - Mudar agente ativo (se orchestrator disponível)
```

## Configurações de Equipe

### Equipes Pré-Construídas

#### Team All

- **Inclui**: Todos os 10 agentes + orchestrator
- **Caso de Uso**: Projetos completos que requerem todas as funções
- **Bundle**: `team-all.txt`

#### Team Fullstack

- **Inclui**: PM, Arquiteto, Desenvolvedor, QA, UX Expert
- **Caso de Uso**: Desenvolvimento web/mobile de ponta a ponta
- **Bundle**: `team-fullstack.txt`

#### Team No-UI

- **Inclui**: PM, Arquiteto, Desenvolvedor, QA (sem UX Expert)
- **Caso de Uso**: Serviços backend, APIs, desenvolvimento de sistema
- **Bundle**: `team-no-ui.txt`

## Arquitetura Central

### Visão Geral do Sistema

O BMAD-METHOD™ é construído em torno de uma arquitetura modular centrada no diretório `bmad-core`, que serve como o cérebro de todo o sistema. Este design permite que o framework opere efetivamente tanto em ambientes IDE (como Cursor, VS Code) quanto em interfaces de IA baseadas na web (como ChatGPT, Gemini).

### Componentes Arquiteturais Principais

#### 1. Agentes (`bmad-core/agents/`)

- **Propósito**: Cada arquivo markdown define um agente de IA especializado para uma função Ágil específica (PM, Dev, Arquiteto, etc.)
- **Estrutura**: Contém cabeçalhos YAML especificando a persona, capacidades e dependências do agente
- **Dependências**: Listas de tarefas, modelos, checklists e arquivos de dados que o agente pode usar
- **Instruções de Inicialização**: Pode carregar documentação específica do projeto para contexto imediato

#### 2. Equipes de Agentes (`bmad-core/agent-teams/`)

- **Propósito**: Definem coleções de agentes agrupados para propósitos específicos
- **Exemplos**: `team-all.yaml` (bundle abrangente), `team-fullstack.yaml` (desenvolvimento full-stack)
- **Uso**: Cria contextos pré-empacotados para ambientes de interface web

#### 3. Fluxos de Trabalho (`bmad-core/workflows/`)

- **Propósito**: Arquivos YAML definindo sequências prescritas de etapas para tipos específicos de projeto
- **Tipos**: Greenfield (novos projetos) e Brownfield (projetos existentes) para desenvolvimento UI, serviço e fullstack
- **Estrutura**: Define interações de agentes, artefatos criados e condições de transição

#### 4. Recursos Reutilizáveis

- **Modelos** (`bmad-core/templates/`): Modelos Markdown para PRDs, especificações de arquitetura, histórias de usuário
- **Tarefas** (`bmad-core/tasks/`): Instruções para ações específicas repetíveis como "shard-doc" ou "create-next-story"
- **Checklists** (`bmad-core/checklists/`): Checklists de garantia de qualidade para validação e revisão
- **Dados** (`bmad-core/data/`): Base de conhecimento central e preferências técnicas

### Arquitetura de Ambiente Duplo

#### Ambiente IDE

- Usuários interagem diretamente com arquivos markdown de agentes
- Agentes podem acessar todas as dependências dinamicamente
- Suporte para operações de arquivo em tempo real e integração de projeto
- Otimizado para execução de fluxo de trabalho de desenvolvimento

#### Ambiente Interface Web

- Usa bundles pré-construídos de `dist/teams` para arquivos únicos de upload com todos os agentes e seus ativos com um agente orquestrador
- Arquivos de texto únicos contendo todas as dependências de agentes estão em `dist/agents/` - estes são desnecessários a menos que você queira criar um agente web que seja apenas um único agente e não uma equipe
- Criado pela ferramenta web-builder para upload para interfaces web
- Fornece contexto completo em um pacote

### Sistema de Processamento de Modelos

BMad emprega um sistema de modelos sofisticado com três componentes principais:

1. **Formato de Modelo** (`utils/bmad-doc-template.md`): Define linguagem de marcação para substituição de variáveis e diretivas de processamento de IA de modelos yaml
2. **Criação de Documento** (`tasks/create-doc.md`): Orquestra seleção de modelos e interação do usuário para transformar especificação yaml em saída markdown final
3. **Elicitação Avançada** (`tasks/advanced-elicitation.md`): Fornece refinamento interativo através de brainstorming estruturado

### Integração de Preferências Técnicas

O arquivo `technical-preferences.md` serve como um perfil técnico persistente que:

- Garante consistência entre todos os agentes e projetos
- Elimina especificação repetitiva de tecnologia
- Fornece recomendações personalizadas alinhadas com preferências do usuário
- Evolui ao longo do tempo com lições aprendidas

### Processo de Construção e Entrega

A ferramenta `web-builder.js` cria bundles prontos para web:

1. Lendo arquivos de definição de agente ou equipe
2. Resolvendo recursivamente todas as dependências
3. Concatenando conteúdo em arquivos de texto únicos com separadores claros
4. Produzindo bundles prontos para upload para interfaces de IA web

Esta arquitetura permite operação sem costura entre ambientes enquanto mantém o ecossistema de agentes rico e interconectado que torna o BMad poderoso.

## Fluxo de Trabalho de Desenvolvimento Completo

### Fase de Planejamento (Interface Web Recomendada - Especialmente Gemini!)

**Ideal para eficiencia de custo com o contexto massivo do Gemini:**

**Para Projetos Brownfield - Comece Aqui!**:

1. **Carregue todo o projeto para Gemini Web** (URL do GitHub, arquivos ou zip)
2. **Documente sistema existente**: `/analyst` → `*document-project`
3. **Cria docs abrangentes** a partir da analise completa do codigo

**Para Todos os Projetos**:

1. **Analise Opcional**: `/analyst` - Pesquisa de mercado, analise competitiva
2. **Briefing do Projeto**: Crie documento de fundacao (Analista ou usuario)
3. **Criacao de PRD**: `/pm create-doc prd` - Requisitos abrangentes do produto
4. **Design de Arquitetura**: `/architect create-doc architecture` - Fundacao tecnica
5. **Validacao e Alinhamento**: `/po` execute checklist mestre para garantir consistencia de documentos
6. **Preparacao de Documentos**: Copie documentos finais para projeto como `docs/prd.md` e `docs/architecture.md`

#### Exemplos de Prompts de Planejamento

**Para Criacao de PRD**:

```text
"Quero construir uma aplicacao [tipo] que [proposito central].
Me ajude a fazer brainstorming de recursos e criar um PRD abrangente."
```

**Para Design de Arquitetura**:

```text
"Baseado neste PRD, projete uma arquitetura tecnica escalavel
que possa lidar com [requisitos especificos]."
```

### Transicao Critica: Interface Web para IDE

**Uma vez que o planejamento esteja completo, voce DEVE mudar para IDE para desenvolvimento:**

- **Por que**: Fluxo de trabalho de desenvolvimento requer operacoes de arquivo, integracao de projeto em tempo real e fragmentacao de documentos
- **Beneficio de Custo**: Interface web e mais economica para criacao de documentos grandes; IDE e otimizado para tarefas de desenvolvimento
- **Arquivos Necessarios**: Garanta que `docs/prd.md` e `docs/architecture.md` existam em seu projeto

### Fluxo de Trabalho de Desenvolvimento IDE

**Pre-requisitos**: Documentos de planejamento devem existir na pasta `docs/`

1. **Fragmentacao de Documentos** (ETAPA CRITICA):
   - Documentos criados por PM/Arquiteto (na Web ou IDE) DEVEM ser fragmentados para desenvolvimento
   - Dois metodos para fragmentar:
     a) **Manual**: Arraste tarefa `shard-doc` + arquivo de documento para chat
     b) **Agente**: Peca a `@bmad-master` ou `@po` para fragmentar documentos
   - Fragmenta `docs/prd.md` → pasta `docs/prd/`
   - Fragmenta `docs/architecture.md` → pasta `docs/architecture/`
   - **AVISO**: NAO fragmente na Interface Web - copiar muitos arquivos pequenos e doloroso!

2. **Verificar Conteudo Fragmentado**:
   - Pelo menos um arquivo `epic-n.md` em `docs/prd/` com historias em ordem de desenvolvimento
   - Documento de arvore fonte e padroes de codificacao para referencia do agente dev
   - Documentos fragmentados para criacao de historias do agente SM

Estrutura de Pastas Resultante:

- `docs/prd/` - Secoes do PRD fragmentadas
- `docs/architecture/` - Secoes da arquitetura fragmentadas
- `docs/stories/` - Historias de usuario geradas

3. **Ciclo de Desenvolvimento** (Sequencial, uma historia por vez):

   **GERENCIAMENTO CRITICO DE CONTEXTO**:
   - **Janelas de contexto importam!** Sempre use janelas de contexto frescas e limpas
   - **Selecao de modelo importa!** Use o modelo de pensamento mais poderoso para criacao de historias SM
   - **SEMPRE inicie novo chat entre trabalho SM, Dev e QA**

   **Etapa 1 - Criacao de Historia**:
   - **NOVO CHAT LIMPO** → Selecione modelo poderoso → `@sm` → `*create`
   - SM executa tarefa create-next-story
   - Revise historia gerada em `docs/stories/`
   - Atualize status de "Draft" para "Approved"

   **Etapa 2 - Implementacao de Historia**:
   - **NOVO CHAT LIMPO** → `@dev`
   - Agente pergunta qual historia implementar
   - Inclua conteudo do arquivo de historia para economizar tempo de busca do agente dev
   - Dev segue tarefas/subtarefas, marcando conclusao
   - Dev mantem Lista de Arquivos de todas as mudancas
   - Dev marca historia como "Review" quando completa com todos os testes passando

   **Etapa 3 - Revisao Senior QA**:
   - **NOVO CHAT LIMPO** → `@qa` → execute tarefa review-story
   - QA executa revisao de codigo de desenvolvedor senior
   - QA pode refatorar e melhorar codigo diretamente
   - QA anexa resultados a secao de Resultados QA da historia
   - Se aprovado: Status → "Done"
   - Se mudancas necessarias: Status permanece "Review" com itens nao marcados para dev

   **Etapa 4 - Repetir**: Continue ciclo SM → Dev → QA ate todas as historias do epico estarem completas

**Importante**: Apenas 1 historia em progresso por vez, trabalhada sequencialmente ate todas as historias do epico estarem completas.

### Fluxo de Trabalho de Rastreamento de Status

Historias progridem atraves de status definidos:

- **Draft** → **Approved** → **InProgress** → **Done**

Cada mudanca de status requer verificacao e aprovacao do usuario antes de prosseguir.

### Tipos de Fluxo de Trabalho

#### Desenvolvimento Greenfield

- Analise de negocios e pesquisa de mercado
- Requisitos do produto e definicao de recursos
- Arquitetura do sistema e design
- Execucao do desenvolvimento
- Testes e implantacao

#### Melhoria Brownfield (Projetos Existentes)

**Conceito Chave**: Desenvolvimento brownfield requer documentacao abrangente do seu projeto existente para que agentes de IA entendam contexto, padroes e restricoes.

**Opcoes Completas de Fluxo de Trabalho Brownfield**:

**Opcao 1: PRD-Primeiro (Recomendado para Grandes Bases de Codigo/Monorepos)**:

1. **Carregue projeto para Gemini Web** (URL do GitHub, arquivos ou zip)
2. **Crie PRD primeiro**: `@pm` → `*create-doc brownfield-prd`
3. **Documentacao focada**: `@analyst` → `*document-project`
   - Analista pergunta sobre foco se nenhum PRD fornecido
   - Escolha formato "documento unico" para Interface Web
   - Usa PRD para documentar APENAS areas relevantes
   - Cria um arquivo markdown abrangente
   - Evita inchar docs com codigo nao usado

**Opcao 2: Documento-Primeiro (Bom para Projetos Menores)**:

1. **Carregue projeto para Gemini Web**
2. **Documente tudo**: `@analyst` → `*document-project`
3. **Entao crie PRD**: `@pm` → `*create-doc brownfield-prd`
   - Mais completo mas pode criar documentacao excessiva

4. **Coleta de Requisitos**:
   - **PRD Brownfield**: Use agente PM com `brownfield-prd-tmpl`
   - **Analisa**: Sistema existente, restricoes, pontos de integracao
   - **Define**: Escopo de melhoria, requisitos de compatibilidade, avaliacao de risco
   - **Cria**: Estrutura de epico e historia para mudancas

5. **Planejamento de Arquitetura**:
   - **Arquitetura Brownfield**: Use agente Arquiteto com `brownfield-architecture-tmpl`
   - **Estrategia de Integracao**: Como novos recursos se integram com sistema existente
   - **Planejamento de Migracao**: Rollout gradual e compatibilidade com versoes anteriores
   - **Mitigacao de Riscos**: Abordando mudancas potencialmente quebradoras

**Recursos Especificos Brownfield**:

**Modelos**:

- `brownfield-prd-tmpl.md`: Planejamento abrangente de melhoria com analise de sistema existente
- `brownfield-architecture-tmpl.md`: Arquitetura focada em integracao para sistemas existentes

**Tarefas**:

- `document-project`: Gera documentacao abrangente de base de codigo existente
- `brownfield-create-epic`: Cria epico unico para melhorias focadas (quando PRD completo e excessivo)
- `brownfield-create-story`: Cria historia individual para mudancas pequenas e isoladas

**Quando Usar Cada Abordagem**:

**Fluxo de Trabalho Brownfield Completo** (Recomendado para):

- Adicoes de recursos principais
- Modernizacao de sistema
- Integracoes complexas
- Multiplas mudancas relacionadas

**Criacao Rapida de Epico/Historia** (Use quando):

- Melhoria unica e focada
- Correcoes de bugs isoladas
- Adicoes de recursos pequenos
- Sistema existente bem documentado

**Fatores Criticos de Sucesso**:

1. **Documentacao Primeiro**: Sempre execute `document-project` se docs estao desatualizados/ausentes
2. **Contexto Importa**: Forneca aos agentes acesso a secoes relevantes do codigo
3. **Foco na Integracao**: Enfatize compatibilidade e mudancas nao quebradoras
4. **Abordagem Incremental**: Planeje para rollout gradual e testes

**Para guia detalhado**: Veja `docs/working-in-the-brownfield.md`

## Melhores Praticas para Criacao de Documentos

### Nomenclatura de Arquivos Obrigatoria para Integracao do Framework

- `docs/prd.md` - Documento de Requisitos do Produto
- `docs/architecture.md` - Documento de Arquitetura do Sistema

**Por Que Esses Nomes Importam**:

- Agentes referenciam automaticamente esses arquivos durante desenvolvimento
- Tarefas de fragmentacao esperam esses nomes de arquivo especificos
- Automacao de fluxo de trabalho depende de nomenclatura padrao

### Fluxo de Trabalho de Criacao de Documentos Economico

**Recomendado para Documentos Grandes (PRD, Arquitetura):**

1. **Use Interface Web**: Crie documentos na interface web para eficiencia de custo
2. **Copie Saida Final**: Salve markdown completo em seu projeto
3. **Nomes Padrao**: Salve como `docs/prd.md` e `docs/architecture.md`
4. **Mude para IDE**: Use agentes IDE para desenvolvimento e documentos menores

### Fragmentacao de Documentos

Modelos com cabecalhos Nivel 2 (`##`) podem ser automaticamente fragmentados:

**PRD Original**:

```markdown
## Objetivos e Contexto de Fundo

## Requisitos

## Objetivos de Design da Interface do Usuario

## Metricas de Sucesso
```

**Apos Fragmentacao**:

- `docs/prd/objetivos-e-contexto-de-fundo.md`
- `docs/prd/requisitos.md`
- `docs/prd/objetivos-de-design-da-interface-do-usuario.md`
- `docs/prd/metricas-de-sucesso.md`

Use a tarefa `shard-doc` ou ferramenta `@kayvan/markdown-tree-parser` para fragmentacao automatica.

## Padroes de Uso e Melhores Praticas

### Uso Especifico do Ambiente

**Interface Web Melhor Para**:

- Fases iniciais de planejamento e documentacao
- Criacao de documentos grandes economica
- Consulta de agentes e brainstorming
- Fluxos de trabalho multi-agente com orchestrator

**IDE Melhor Para**:

- Desenvolvimento ativo e implementacao
- Operacoes de arquivo e integracao de projeto
- Gerenciamento de historias e ciclos de desenvolvimento
- Revisao de codigo e debugging

### Garantia de Qualidade

- Use agentes apropriados para tarefas especializadas
- Siga cerimonias Ageis e processos de revisao
- Mantenha consistencia de documentos com agente PO
- Validacao regular com checklists e modelos

### Otimizacao de Performance

- Use agentes especificos vs. `bmad-master` para tarefas focadas
- Escolha tamanho de equipe apropriado para necessidades do projeto
- Aproveite preferencias tecnicas para consistencia
- Gerenciamento regular de contexto e limpeza de cache

## Dicas de Sucesso

- **Use Gemini para planejamento do quadro geral** - O bundle team-fullstack fornece expertise colaborativa
- **Use bmad-master para organizacao de documentos** - Fragmentacao cria pedacos gerenciaveis
- **Siga o ciclo SM → Dev religiosamente** - Isso garante progresso sistematico
- **Mantenha conversas focadas** - Um agente, uma tarefa por conversa
- **Revise tudo** - Sempre revise e aprove antes de marcar como completo

## Contribuindo para BMAD-METHOD™

### Diretrizes Rapidas de Contribuicao

Para detalhes completos, veja `CONTRIBUTING.md`. Pontos principais:

**Fluxo de Trabalho Fork**:

1. Fork do repositorio
2. Crie branches de recursos
3. Envie PRs para branch `next` (padrao) ou `main` apenas para correcoes criticas
4. Mantenha PRs pequenos: 200-400 linhas ideal, 800 linhas maximo
5. Um recurso/correcao por PR

**Requisitos de PR**:

- Descricoes claras (max 200 palavras) com O que/Por que/Como/Testes
- Use commits convencionais (feat:, fix:, docs:)
- Commits atomicos - uma mudanca logica por commit
- Deve alinhar com principios orientadores

**Principios Centrais** (de docs/GUIDING-PRINCIPLES.md):

- **Agentes Dev Devem Ser Enxutos**: Minimize dependencias, economize contexto para codigo
- **Linguagem Natural Primeiro**: Tudo em markdown, sem codigo no nucleo
- **Nucleo vs Pacotes de Expansao**: Nucleo para necessidades universais, pacotes para dominios especializados
- **Filosofia de Design**: "Agentes Dev codificam, agentes de planejamento planejam"

## Pacotes de Expansao

### O Que Sao Pacotes de Expansao?

Pacotes de expansao estendem BMAD-METHOD™ alem do desenvolvimento de software tradicional para QUALQUER dominio. Eles fornecem equipes de agentes especializados, modelos e fluxos de trabalho mantendo o framework central enxuto e focado no desenvolvimento.

### Por Que Usar Pacotes de Expansao?

1. **Manter Nucleo Enxuto**: Agentes Dev mantem contexto maximo para codificacao
2. **Expertise de Dominio**: Conhecimento profundo e especializado sem inchar o nucleo
3. **Inovacao da Comunidade**: Qualquer um pode criar e compartilhar pacotes
4. **Design Modular**: Instale apenas o que voce precisa

### Pacotes de Expansao Disponiveis

**Pacotes Tecnicos**:

- **Infraestrutura/DevOps**: Arquitetos de nuvem, especialistas SRE, especialistas em seguranca
- **Desenvolvimento de Jogos**: Designers de jogos, designers de nivel, escritores narrativos
- **Desenvolvimento Mobile**: Especialistas iOS/Android, especialistas UX mobile
- **Ciencia de Dados**: Engenheiros ML, cientistas de dados, especialistas em visualizacao

**Pacotes Nao-Tecnicos**:

- **Estrategia de Negocios**: Consultores, analistas financeiros, estrategistas de marketing
- **Escrita Criativa**: Arquitetos de enredo, desenvolvedores de personagens, construtores de mundos
- **Saude e Bem-Estar**: Treinadores fitness, nutricionistas, engenheiros de habitos
- **Educacao**: Designers de curriculo, especialistas em avaliacao
- **Suporte Legal**: Analistas de contratos, verificadores de conformidade

**Pacotes Especializados**:

- **Criador de Expansao**: Ferramentas para construir seus proprios pacotes de expansao
- **Mestre de RPG**: Assistencia para jogos de mesa
- **Planejamento de Eventos da Vida**: Planejadores de casamento, coordenadores de eventos
- **Pesquisa Cientifica**: Revisores de literatura, designers de metodologia

### Usando Pacotes de Expansao

1. **Navegue Pacotes Disponiveis**: Verifique diretorio `expansion-packs/`
2. **Obtenha Inspiracao**: Veja `docs/expansion-packs.md` para exemplos detalhados e ideias
3. **Instale via CLI**:

   ```bash
   npx bmad-method install
   # Selecione opcao "Install expansion pack"
   ```

4. **Use em Seu Fluxo de Trabalho**: Pacotes instalados se integram perfeitamente com agentes existentes

### Criando Pacotes de Expansao Personalizados

Use o pacote **expansion-creator** para construir o seu proprio:

1. **Defina Dominio**: Que expertise voce esta capturando?
2. **Projete Agentes**: Crie funcoes especializadas com limites claros
3. **Construa Recursos**: Tarefas, modelos, checklists para seu dominio
4. **Teste e Compartilhe**: Valide com casos de uso reais, compartilhe com a comunidade

**Principio Chave**: Pacotes de expansao democratizam expertise tornando conhecimento especializado acessivel atraves de agentes de IA.

## Obtendo Ajuda

- **Comandos**: Use `*/*help` em qualquer ambiente para ver comandos disponiveis
- **Mudanca de Agente**: Use `*/*switch nome-agente` com orchestrator para mudancas de funcao
- **Documentacao**: Verifique pasta `docs/` para contexto especifico do projeto
- **Comunidade**: Recursos Discord e GitHub disponiveis para suporte
- **Contribuindo**: Veja `CONTRIBUTING.md` para diretrizes completas
