<!-- Powered by PRISMA™ Core -->

# Tarefa Criar História de Sistema Legado

## Propósito

Criar histórias detalhadas e prontas para implementação para projetos de sistemas legados onde documentos tradicionais fragmentados de PRD/arquitetura podem não existir. Esta tarefa conecta vários formatos de documentação (saída de document-project, PRDs de sistemas legados, épicos ou documentação de usuário) e histórias executáveis para o agente de desenvolvimento.

## Quando Usar Esta Tarefa

**Use esta tarefa quando:**

- Trabalhando em projetos de sistemas legados com documentação não-padrão
- Histórias precisam ser criadas a partir da saída de document-project
- Trabalhando com épicos de sistemas legados sem PRD/arquitetura completa
- Documentação de projeto existente não segue a estrutura PRISMA v4+
- Precisa coletar contexto adicional do usuário durante a criação da história

**Use criar-proxima-historia quando:**

- Trabalhando com documentos de PRD e arquitetura v4 devidamente fragmentados
- Seguindo fluxo padrão de greenfield ou brownfield bem documentado
- Todo contexto técnico está disponível em formato estruturado

## Instruções de Execução da Tarefa

### 0. Contexto da Documentação

Verifique a documentação disponível nesta ordem:

1. **PRD/Arquitetura Fragmentada** (docs/prd/, docs/architecture/)
   - Se encontrada, recomende usar a tarefa criar-proxima-historia em vez desta

2. **Documento de Arquitetura de Sistema Legado** (docs/brownfield-architecture.md ou similar)
   - Criado pela tarefa document-project
   - Contém estado real do sistema, débito técnico, soluções temporárias

3. **PRD de Sistema Legado** (docs/prd.md)
   - Pode conter detalhes técnicos incorporados

4. **Arquivos de Épico** (docs/epics/ ou similar)
   - Criados pela tarefa brownfield-create-epic

5. **Documentação Fornecida pelo Usuário**
   - Pergunte ao usuário para especificar localização e formato

### 1. Identificação da História e Coleta de Contexto

#### 1.1 Identificar Origem da História

Baseado na documentação disponível:

- **Do PRD de Sistema Legado**: Extrair histórias das seções de épicos
- **De Arquivos de Épico**: Ler definição do épico e lista de histórias
- **Da Direção do Usuário**: Perguntar ao usuário qual melhoria específica implementar
- **Sem Origem Clara**: Trabalhar com o usuário para definir o escopo da história

#### 1.2 Coletar Contexto Essencial

CRÍTICO: Para histórias de sistemas legados, você DEVE coletar contexto suficiente para implementação segura. Esteja preparado para pedir ao usuário informações faltantes.

**Lista de Verificação de Informações Obrigatórias:**

- [ ] Que funcionalidade existente pode ser afetada?
- [ ] Quais são os pontos de integração com o código atual?
- [ ] Que padrões devem ser seguidos (com exemplos)?
- [ ] Que restrições técnicas existem?
- [ ] Há alguma "pegadinha" ou solução temporária que devemos conhecer?

Se alguma informação obrigatória estiver faltando, liste as informações faltantes e peça ao usuário para fornecê-las.

### 2. Extrair Contexto Técnico das Fontes Disponíveis

#### 2.1 Da Saída do Document-Project

Se usando brownfield-architecture.md do document-project:

- **Seção de Débito Técnico**: Observe quaisquer soluções temporárias afetando esta história
- **Seção de Arquivos Chave**: Identifique arquivos que precisarão de modificação
- **Pontos de Integração**: Encontre padrões de integração existentes
- **Problemas Conhecidos**: Verifique se a história toca áreas problemáticas
- **Stack Técnico Real**: Verifique versões e restrições

#### 2.2 Do PRD de Sistema Legado

Se usando PRD de sistema legado:

- **Seção de Restrições Técnicas**: Extraia todas as restrições relevantes
- **Requisitos de Integração**: Note requisitos de compatibilidade
- **Organização do Código**: Siga padrões especificados
- **Avaliação de Riscos**: Entenda impactos potenciais

#### 2.3 Da Documentação do Usuário

Peça ao usuário para ajudar a identificar:

- Especificações técnicas relevantes
- Exemplos de código existentes para seguir
- Requisitos de integração
- Abordagens de teste usadas no projeto

### 3. Criação da História com Coleta Progressiva de Detalhes

#### 3.1 Criar Estrutura Inicial da História

Comece com o modelo da história, preenchendo o que é conhecido:

```markdown
# História {{Título da Melhoria}}

## Status: Rascunho

## História

Como um {{tipo_usuario}},
Eu quero {{capacidade_melhoria}},
Para que {{valor_entregue}}.

## Fonte do Contexto

- Documento Fonte: {{nome/tipo do documento}}
- Tipo de Melhoria: {{funcionalidade única/correção de bug/integração/etc}}
- Impacto no Sistema Existente: {{avaliação breve}}
```

#### 3.2 Desenvolver Critérios de Aceitação

Crítico: Para sistemas legados, SEMPRE inclua critérios sobre manter funcionalidade existente

Estrutura padrão:

1. Nova funcionalidade funciona como especificado
2. {{funcionalidade afetada}} existente continua funcionando inalterada
3. Integração com {{sistema existente}} mantém comportamento atual
4. Sem regressão em {{área relacionada}}
5. Performance permanece dentro dos limites aceitáveis

#### 3.3 Coletar Orientação Técnica

Crítico: É aqui que você precisará ser interativo com o usuário se informações estiverem faltando

Crie seção de Orientação Técnica para Desenvolvimento com informações disponíveis:

````markdown
## Orientação Técnica para Desenvolvimento

### Contexto do Sistema Existente

[Extrair da documentação disponível]

### Abordagem de Integração

[Baseado em padrões encontrados ou perguntar ao usuário]

### Restrições Técnicas

[Da documentação ou entrada do usuário]

### Informações Faltantes

Crítico: Liste qualquer coisa que você não conseguiu encontrar que o desenvolvimento precisará e peça as informações faltantes

### 4. Geração de Tarefas com Verificações de Segurança

#### 4.1 Gerar Tarefas de Implementação

Baseado no contexto coletado, crie tarefas que:

- Incluam tarefas de exploração se o entendimento do sistema estiver incompleto
- Adicionem tarefas de verificação para funcionalidade existente
- Incluam considerações de rollback
- Referenciem arquivos/padrões específicos quando conhecidos

Exemplo de estrutura de tarefa para sistema legado:

```markdown
## Tarefas / Subtarefas

- [ ] Tarefa 1: Analisar implementação existente de {{componente/funcionalidade}}
  - [ ] Revisar {{arquivos específicos}} para padrões atuais
  - [ ] Documentar pontos de integração
  - [ ] Identificar impactos potenciais

- [ ] Tarefa 2: Implementar {{nova funcionalidade}}
  - [ ] Seguir padrão do {{arquivo exemplo}}
  - [ ] Integrar com {{componente existente}}
  - [ ] Manter compatibilidade com {{restrição}}

- [ ] Tarefa 3: Verificar funcionalidade existente
  - [ ] Testar {{funcionalidade existente 1}} ainda funciona
  - [ ] Verificar comportamento de {{ponto de integração}} inalterado
  - [ ] Verificar impacto na performance

- [ ] Tarefa 4: Adicionar testes
  - [ ] Testes unitários seguindo {{padrão de teste do projeto}}
  - [ ] Teste de integração para {{ponto de integração}}
  - [ ] Atualizar testes existentes se necessário
```
````

### 5. Avaliação de Riscos e Mitigação

CRÍTICO: para sistemas legados - sempre incluir avaliação de riscos

Adicione seção para riscos específicos de sistemas legados:

```markdown
## Avaliação de Riscos

### Riscos de Implementação

- **Risco Primário**: {{risco principal ao sistema existente}}
- **Mitigação**: {{como abordar}}
- **Verificação**: {{como confirmar segurança}}

### Plano de Rollback

- {{Passos simples para desfazer mudanças se necessário}}

### Verificações de Segurança

- [ ] {{funcionalidade}} existente testada antes das mudanças
- [ ] Mudanças podem ser isoladas por feature flag
- [ ] Procedimento de rollback documentado
```

### 6. Validação Final da História

Antes de finalizar:

1. **Verificação de Completude**:
   - [ ] História tem escopo claro e critérios de aceitação
   - [ ] Contexto técnico é suficiente para implementação
   - [ ] Abordagem de integração está definida
   - [ ] Riscos são identificados com mitigação

2. **Verificação de Segurança**:
   - [ ] Proteção de funcionalidade existente incluída
   - [ ] Plano de rollback é viável
   - [ ] Testes cobrem funcionalidades novas e existentes

3. **Lacunas de Informação**:
   - [ ] Todas informações críticas faltantes coletadas do usuário
   - [ ] Incógnitas restantes documentadas para agente de desenvolvimento
   - [ ] Tarefas de exploração adicionadas onde necessário

### 7. Formato de Saída da História

Salve a história com nomenclatura apropriada:

- Se de épico: `docs/stories/epic-{n}-story-{m}.md`
- Se standalone: `docs/stories/brownfield-{nome-funcionalidade}.md`
- Se sequencial: Siga numeração de histórias existente

Inclua cabeçalho notando contexto da documentação:

```markdown
# História: {{Título}}

<!-- Fonte: {{tipo de documentação usado}} -->
<!-- Contexto: Melhoria de sistema legado para {{sistema existente}} -->

## Status: Rascunho

[Resto do conteúdo da história...]
```

### 8. Comunicação de Handoff

Forneça handoff claro ao usuário:

```text
História de sistema legado criada: {{título da história}}

Documentação Fonte: {{o que foi usado}}
Localização da História: {{caminho do arquivo}}

Pontos de Integração Chave Identificados:
- {{ponto de integração 1}}
- {{ponto de integração 2}}

Riscos Observados:
- {{risco primário}}

{{Se informação faltante}}:
Nota: Alguns detalhes técnicos não estavam claros. A história inclui tarefas de exploração para coletar informações necessárias durante a implementação.

Próximos Passos:
1. Revisar história para precisão
2. Verificar se abordagem de integração se alinha com seu sistema
3. Aprovar história ou solicitar ajustes
4. Agente de desenvolvimento pode então implementar com verificações de segurança
```

## Critérios de Sucesso

A criação da história de sistema legado é bem-sucedida quando:

1. História pode ser implementada sem exigir que desenvolvimento busque múltiplos documentos
2. Abordagem de integração é clara e segura para sistema existente
3. Todo contexto técnico disponível foi extraído e organizado
4. Informações faltantes foram identificadas e abordadas
5. Riscos são documentados com estratégias de mitigação
6. História inclui verificação de funcionalidade existente
7. Abordagem de rollback está definida

## Notas Importantes

- Esta tarefa é especificamente para projetos de sistemas legados com documentação não-padrão
- Sempre priorize estabilidade do sistema existente sobre novas funcionalidades
- Quando em dúvida, adicione tarefas de exploração e verificação
- É melhor perguntar ao usuário para esclarecimento do que fazer suposições
- Cada história deve ser autocontida para o agente de desenvolvimento
- Inclua referências a padrões de código existentes quando disponíveis