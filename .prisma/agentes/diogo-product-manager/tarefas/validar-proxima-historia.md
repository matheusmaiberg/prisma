<!-- Desenvolvido por BMAD™ Core -->

# Tarefa: Validar Próxima História

## Propósito

Validar abrangentemente um rascunho de história antes do início da implementação, garantindo que seja completo, preciso e forneça contexto suficiente para desenvolvimento bem-sucedido. Esta tarefa identifica problemas e lacunas que precisam ser abordados, prevenindo alucinações e garantindo prontidão para implementação.

## Execução SEQUENCIAL de Tarefas (Não prossiga até que a Tarefa atual esteja completa)

### 0. Carregar Configuração Central e Entradas

- Carregar `.bmad-core/core-config.yaml`
- Se o arquivo não existir, PARE e informe ao usuário: "core-config.yaml não encontrado. Este arquivo é necessário para validação de história."
- Extrair configurações principais: `devStoryLocation`, `prd.*`, `architecture.*`
- Identificar e carregar as seguintes entradas:
  - **Arquivo da história**: A história rascunhada para validar (fornecida pelo usuário ou descoberta em `devStoryLocation`)
  - **Épico pai**: O épico contendo os requisitos desta história
  - **Documentos de arquitetura**: Baseado na configuração (fragmentada ou monolítica)
  - **Template da história**: `bmad-core/templates/story-tmpl.md` para validação de completude

### 1. Validação de Completude do Template

- Carregar `.bmad-core/templates/story-tmpl.yaml` e extrair todos os cabeçalhos de seção do template
- **Verificação de seções ausentes**: Comparar seções da história contra seções do template para verificar se todas as seções obrigatórias estão presentes
- **Validação de placeholders**: Garantir que nenhum placeholder do template permaneça não preenchido (ex.: `{{EpicNum}}`, `{{role}}`, `_TBD_`)
- **Verificação de seção do agente**: Confirmar que todas as seções do template existem para uso futuro do agente
- **Conformidade estrutural**: Verificar se a história segue estrutura e formatação do template

### 2. Validação de Estrutura de Arquivo e Árvore de Código

- **Clareza de caminhos de arquivo**: Os caminhos de arquivos novos/existentes a serem criados/modificados estão claramente especificados?
- **Relevância da árvore de código**: A estrutura relevante do projeto está incluída nas Notas de Dev?
- **Estrutura de diretório**: Novos diretórios/componentes estão localizados adequadamente de acordo com a estrutura do projeto?
- **Sequência de criação de arquivo**: As tarefas especificam onde os arquivos devem ser criados em ordem lógica?
- **Precisão de caminho**: Os caminhos de arquivo são consistentes com a estrutura do projeto dos documentos de arquitetura?

### 3. Validação de Completude de UI/Frontend (se aplicável)

- **Especificações de componente**: Os componentes de UI estão suficientemente detalhados para implementação?
- **Orientação de estilo/design**: A orientação de implementação visual está clara?
- **Fluxos de interação do usuário**: Padrões UX e comportamentos estão especificados?
- **Responsivo/acessibilidade**: Essas considerações são abordadas se necessárias?
- **Pontos de integração**: Os pontos de integração frontend-backend estão claros?

### 4. Avaliação de Satisfação dos Critérios de Aceitação

- **Cobertura de CA**: Todos os critérios de aceitação serão satisfeitos pelas tarefas listadas?
- **Testabilidade de CA**: Os critérios de aceitação são mensuráveis e verificáveis?
- **Cenários ausentes**: Casos extremos ou condições de erro estão cobertos?
- **Definição de sucesso**: "Pronto" está claramente definido para cada CA?
- **Mapeamento tarefa-CA**: As tarefas estão adequadamente vinculadas a critérios de aceitação específicos?

### 5. Revisão de Instruções de Validação e Teste

- **Clareza da abordagem de teste**: Os métodos de teste estão claramente especificados?
- **Cenários de teste**: Os casos de teste principais estão identificados?
- **Passos de validação**: Os passos de validação dos critérios de aceitação estão claros?
- **Ferramentas/frameworks de teste**: As ferramentas de teste necessárias estão especificadas?
- **Requisitos de dados de teste**: As necessidades de dados de teste estão identificadas?

### 6. Avaliação de Considerações de Segurança (se aplicável)

- **Requisitos de segurança**: As necessidades de segurança estão identificadas e abordadas?
- **Autenticação/autorização**: Os controles de acesso estão especificados?
- **Proteção de dados**: Os requisitos de manuseio de dados sensíveis estão claros?
- **Prevenção de vulnerabilidades**: Problemas comuns de segurança estão abordados?
- **Requisitos de conformidade**: Necessidades regulatórias/de conformidade estão abordadas?

### 7. Validação de Sequência de Tarefas/Subtarefas

- **Ordem lógica**: As tarefas seguem sequência adequada de implementação?
- **Dependências**: As dependências das tarefas estão claras e corretas?
- **Granularidade**: As tarefas estão adequadamente dimensionadas e acionáveis?
- **Completude**: As tarefas cobrem todos os requisitos e critérios de aceitação?
- **Problemas bloqueadores**: Há tarefas que bloqueariam outras?

### 8. Verificação Anti-Alucinação

- **Verificação de fonte**: Toda alegação técnica deve ser rastreável aos documentos fonte
- **Alinhamento arquitetural**: Conteúdo das Notas de Dev combina com especificações de arquitetura
- **Nenhum detalhe inventado**: Sinalizar qualquer decisão técnica não suportada por documentos fonte
- **Precisão de referência**: Verificar se todas as referências de fonte estão corretas e acessíveis
- **Verificação de fatos**: Cruzar referências de alegações contra documentos de épico e arquitetura

### 9. Prontidão de Implementação do Agente de Desenvolvimento

- **Contexto autocontido**: A história pode ser implementada sem ler documentos externos?
- **Instruções claras**: Os passos de implementação são inequívocos?
- **Contexto técnico completo**: Todos os detalhes técnicos necessários estão presentes nas Notas de Dev?
- **Informação ausente**: Identificar quaisquer lacunas críticas de informação
- **Acionabilidade**: Todas as tarefas são acionáveis por um agente de desenvolvimento?

### 10. Gerar Relatório de Validação

Fornecer um relatório de validação estruturado incluindo:

#### Problemas de Conformidade do Template

- Seções ausentes do template da história
- Placeholders não preenchidos ou variáveis do template
- Problemas de formatação estrutural

#### Problemas Críticos (Deve Corrigir - História Bloqueada)

- Informação essencial ausente para implementação
- Alegações técnicas imprecisas ou não verificáveis
- Cobertura incompleta dos critérios de aceitação
- Seções obrigatórias ausentes

#### Problemas Deve-Corrigir (Melhorias Importantes de Qualidade)

- Orientação de implementação não clara
- Considerações de segurança ausentes
- Problemas de sequenciamento de tarefas
- Instruções de teste incompletas

#### Melhorias Seria-Bom-Ter (Aprimoramentos Opcionais)

- Contexto adicional que ajudaria a implementação
- Esclarecimentos que melhorariam a eficiência
- Melhorias na documentação

#### Descobertas Anti-Alucinação

- Alegações técnicas não verificáveis
- Referências de fonte ausentes
- Inconsistências com documentos de arquitetura
- Bibliotecas, padrões ou normas inventados

#### Avaliação Final

- **VAMOS**: História está pronta para implementação
- **NÃO VAMOS**: História requer correções antes da implementação
- **Pontuação de Prontidão para Implementação**: Escala 1-10
- **Nível de Confiança**: Alto/Médio/Baixo para implementação bem-sucedida