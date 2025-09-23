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