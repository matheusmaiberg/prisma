<!-- Powered by PRISMA™ Core -->

# Tarefa Criar Próxima História

## Propósito

Identificar a próxima história lógica baseada no progresso do projeto e definições de épicos, e então preparar um arquivo de história abrangente, autocontido e acionável usando o `Modelo de História`. Esta tarefa garante que a história seja enriquecida com todo contexto técnico necessário, requisitos e critérios de aceitação, tornando-a pronta para implementação eficiente por um Agente Desenvolvedor com necessidade mínima de pesquisa adicional ou busca de seu próprio contexto.

## Execução SEQUENCIAL de Tarefas (Não prossiga até que a Tarefa atual esteja completa)

### 0. Carregar Configuração Central e Verificar Fluxo de Trabalho

- Carregue `.prisma-core/core-config.yaml` da raiz do projeto
- Se o arquivo não existir, PARE e informe o usuário: "core-config.yaml não encontrado. Este arquivo é obrigatório para criação de histórias. Você pode: 1) Copiá-lo do GITHUB prisma-core/core-config.yaml e configurá-lo para seu projeto OU 2) Executar o instalador PRISMA contra seu projeto para atualizar e adicionar o arquivo automaticamente. Por favor, adicione e configure core-config.yaml antes de prosseguir."
- Extraia configurações chave: `devStoryLocation`, `prd.*`, `architecture.*`, `workflow.*`

### 1. Identificar Próxima História para Preparação

#### 1.1 Localizar Arquivos de Épico e Revisar Histórias Existentes

- Baseado em `prdSharded` da configuração, localize arquivos de épico (localização/padrão fragmentado ou seções de PRD monolítico)
- Se `devStoryLocation` tem arquivos de história, carregue o arquivo `{epicNum}.{storyNum}.story.md` mais alto
- **Se a história mais alta existir:**
  - Verifique se o status é 'Concluído'. Se não, alerte o usuário: "ALERTA: História incompleta encontrada! Arquivo: {lastEpicNum}.{lastStoryNum}.story.md Status: [status atual] Você deve corrigir esta história primeiro, mas gostaria de aceitar o risco e sobrescrever para criar a próxima história em rascunho?"
  - Se prosseguindo, selecione a próxima história sequencial no épico atual
  - Se o épico estiver completo, pergunte ao usuário: "Épico {epicNum} Completo: Todas as histórias no Épico {epicNum} foram completadas. Gostaria de: 1) Iniciar Épico {epicNum + 1} com história 1 2) Selecionar uma história específica para trabalhar 3) Cancelar criação de história"
  - **CRÍTICO**: NUNCA pule automaticamente para outro épico. Usuário DEVE instruir explicitamente qual história criar.
- **Se nenhum arquivo de história existir:** A próxima história é SEMPRE 1.1 (primeira história do primeiro épico)
- Anuncie a história identificada ao usuário: "História identificada para preparação: {epicNum}.{storyNum} - {Título da História}"

### 2. Coletar Requisitos da História e Contexto da História Anterior

- Extraia requisitos da história do arquivo de épico identificado
- Se a história anterior existir, revise seções de Registro do Agente Dev para:
  - Notas de Conclusão e Referências de Log de Debug
  - Desvios de implementação e decisões técnicas
  - Desafios encontrados e lições aprendidas
- Extraia insights relevantes que informam a preparação da história atual

### 3. Coletar Contexto de Arquitetura

#### 3.1 Determinar Estratégia de Leitura de Arquitetura

- **Se `architectureVersion: >= v4` e `architectureSharded: true`**: Leia `{architectureShardedLocation}/index.md` então siga ordem de leitura estruturada abaixo
- **Caso contrário**: Use `architectureFile` monolítico para seções similares

#### 3.2 Ler Documentos de Arquitetura Baseado no Tipo de História

**Para TODAS as Histórias:** tech-stack.md, unified-project-structure.md, coding-standards.md, testing-strategy.md

**Para Histórias Backend/API, adicionalmente:** data-models.md, database-schema.md, backend-architecture.md, rest-api-spec.md, external-apis.md

**Para Histórias Frontend/UI, adicionalmente:** frontend-architecture.md, components.md, core-workflows.md, data-models.md

**Para Histórias Full-Stack:** Leia seções Backend e Frontend acima

#### 3.3 Extrair Detalhes Técnicos Específicos da História

Extraia APENAS informações diretamente relevantes para implementar a história atual. NÃO invente novas bibliotecas, padrões ou padrões não presentes nos documentos fonte.

Extraia:

- Modelos de dados específicos, esquemas ou estruturas que a história usará
- Endpoints de API que a história deve implementar ou consumir
- Especificações de componentes para elementos UI na história
- Caminhos de arquivo e convenções de nomenclatura para novo código
- Requisitos de teste específicos para funcionalidades da história
- Considerações de segurança ou performance afetando a história

SEMPRE cite documentos fonte: `[Fonte: architecture/{filename}.md#{section}]`

### 4. Verificar Alinhamento da Estrutura do Projeto

- Faça referência cruzada dos requisitos da história com o Guia de Estrutura do Projeto de `docs/architecture/unified-project-structure.md`
- Garanta que caminhos de arquivo, localizações de componentes ou nomes de módulos se alinhem com estruturas definidas
- Documente quaisquer conflitos estruturais na seção "Notas de Estrutura do Projeto" dentro do rascunho da história

### 5. Preencher Modelo de História com Contexto Completo

- Crie novo arquivo de história: `{devStoryLocation}/{epicNum}.{storyNum}.story.md` usando Modelo de História
- Preencha informações básicas da história: Título, Status (Rascunho), Declaração da história, Critérios de Aceitação do Épico
- **Seção `Notas do Dev` (CRÍTICO):**
  - CRÍTICO: Esta seção DEVE conter APENAS informações extraídas dos documentos de arquitetura. NUNCA invente ou assuma detalhes técnicos.
  - Inclua TODOS os detalhes técnicos relevantes dos Passos 2-3, organizados por categoria:
    - **Insights da História Anterior**: Aprendizados chave da história anterior
    - **Modelos de Dados**: Esquemas específicos, regras de validação, relacionamentos [com referências fonte]
    - **Especificações de API**: Detalhes de endpoint, formatos de request/response, requisitos de autenticação [com referências fonte]
    - **Especificações de Componentes**: Detalhes de componente UI, props, gerenciamento de estado [com referências fonte]
    - **Localizações de Arquivo**: Caminhos exatos onde novo código deve ser criado baseado na estrutura do projeto
    - **Requisitos de Teste**: Casos de teste específicos ou estratégias de testing-strategy.md
    - **Restrições Técnicas**: Requisitos de versão, considerações de performance, regras de segurança
  - Todo detalhe técnico DEVE incluir sua referência fonte: `[Fonte: architecture/{filename}.md#{section}]`
  - Se informações para uma categoria não forem encontradas nos docs de arquitetura, declare explicitamente: "Nenhuma orientação específica encontrada nos docs de arquitetura"
- **Seção `Tarefas / Subtarefas`:**
  - Gere lista detalhada e sequencial de tarefas técnicas baseada APENAS em: Requisitos do Épico, AC da História, Informações de Arquitetura Revisadas
  - Cada tarefa deve referenciar documentação de arquitetura relevante
  - Inclua testes unitários como subtarefas explícitas baseadas na Estratégia de Teste
  - Vincule tarefas aos ACs onde aplicável (ex.: `Tarefa 1 (AC: 1, 3)`)
- Adicione notas sobre alinhamento da estrutura do projeto ou discrepâncias encontradas no Passo 4

### 6. Conclusão e Revisão do Rascunho da História

- Revise todas as seções para completude e precisão
- Verifique se todas as referências fonte estão incluídas para detalhes técnicos
- Garanta que tarefas se alinhem com requisitos do épico e restrições de arquitetura
- Atualize status para "Rascunho" e salve o arquivo da história
- Execute `.prisma-core/tasks/execute-checklist` `.prisma-core/checklists/story-draft-checklist`
- Forneça resumo ao usuário incluindo:
  - História criada: `{devStoryLocation}/{epicNum}.{storyNum}.story.md`
  - Status: Rascunho
  - Componentes técnicos chave incluídos dos docs de arquitetura
  - Quaisquer desvios ou conflitos notados entre épico e arquitetura
  - Resultados do Checklist
  - Próximos passos: Para histórias Complexas, sugira que o usuário revise cuidadosamente o rascunho da história e opcionalmente tenha o PO executando a tarefa `.prisma-core/tasks/validate-next-story`