# Documentar Projeto Existente

## Objetivo

Gerar documentação abrangente para projetos existentes otimizada para agentes de desenvolvimento AI. Esta tarefa cria materiais de referência estruturados que permitem agentes AI compreender contexto do projeto, convenções e padrões para contribuição efetiva em qualquer base de código.

## Instruções da Tarefa

### 1. Análise Inicial do Projeto

**CRÍTICO:** Primeiro, verifique se existe um PRD ou documento de requisitos no contexto. Se sim, use-o para focar seus esforços de documentação apenas nas áreas relevantes.

**SE PRD EXISTE**:

- Revise o PRD para entender que melhoria/funcionalidade está planejada
- Identifique quais módulos, serviços ou áreas serão afetados
- Foque a documentação APENAS nessas áreas relevantes
- Pule partes não relacionadas da base de código para manter docs enxutos

**SE NÃO EXISTE PRD**:
Pergunte ao usuário:

"Percebi que você não forneceu um PRD ou documento de requisitos. Para criar documentação mais focada e útil, recomendo uma dessas opções:

1. **Criar um PRD primeiro** - Gostaria que eu ajudasse a criar um PRD brownfield antes de documentar? Isso ajuda a focar a documentação em áreas relevantes.

2. **Fornecer requisitos existentes** - Você tem um documento de requisitos, épico ou descrição de funcionalidade que pode compartilhar?

3. **Descrever o foco** - Pode descrever brevemente que melhoria ou funcionalidade está planejando? Por exemplo:
   - 'Adicionando processamento de pagamento ao serviço de usuário'
   - 'Refatorando o módulo de autenticação'
   - 'Integrando com uma nova API de terceiros'

4. **Documentar tudo** - Ou devo prosseguir com documentação abrangente de toda a base de código? (Nota: Isso pode criar documentação excessiva para projetos grandes)

Por favor me informe sua preferência, ou posso prosseguir com documentação completa se preferir."

Baseado na resposta deles:

- Se escolherem opção 1-3: Use esse contexto para focar a documentação
- Se escolherem opção 4 ou recusarem: Prossiga com análise abrangente abaixo

Comece conduzindo análise do projeto existente. Use ferramentas disponíveis para:

1. **Descoberta da Estrutura do Projeto**: Examine a estrutura do diretório raiz, identifique pastas principais e entenda a organização geral
2. **Identificação da Stack Tecnológica**: Procure por package.json, requirements.txt, Cargo.toml, pom.xml, etc. para identificar linguagens, frameworks e dependências
3. **Análise do Sistema de Build**: Encontre scripts de build, configurações CI/CD e comandos de desenvolvimento
4. **Revisão de Documentação Existente**: Verifique arquivos README, pastas docs e qualquer documentação existente
5. **Análise de Padrões de Código**: Examine arquivos-chave para entender padrões de codificação, convenções de nomeação e abordagens arquiteturais

Faça essas perguntas de elicitação ao usuário para melhor entender suas necessidades:

- Qual é o propósito principal deste projeto?
- Há áreas específicas da base de código que são particularmente complexas ou importantes para agentes entenderem?
- Que tipos de tarefas você espera que agentes AI executem neste projeto? (ex: correção de bugs, adição de funcionalidades, refatoração, testes)
- Há padrões ou formatos de documentação existentes que você prefere?
- Que nível de detalhe técnico a documentação deve ter como alvo? (desenvolvedores júnior, sênior, equipe mista)
- Há uma funcionalidade ou melhoria específica que você está planejando? (Isso ajuda a focar a documentação)

### 2. Análise Profunda da Base de Código

CRÍTICO: Antes de gerar documentação, conduza análise extensiva da base de código existente:

1. **Explore Áreas-Chave**:
   - Pontos de entrada (arquivos main, arquivos index, inicializadores de app)
   - Arquivos de configuração e setup de ambiente
   - Dependências de pacotes e versões
   - Configurações de build e deployment
   - Suítes de teste e cobertura

2. **Faça Perguntas Esclarecedoras**:
   - "Vejo que você está usando [tecnologia X]. Há padrões ou convenções customizados que devo documentar?"
   - "Quais são as partes mais críticas/complexas deste sistema com que desenvolvedores lutam?"
   - "Há áreas de 'conhecimento tribal' não documentado que devo capturar?"
   - "Que débito técnico ou problemas conhecidos devo documentar?"
   - "Que partes da base de código mudam mais frequentemente?"

3. **Mapear a Realidade**:
   - Identifique padrões REAIS usados (não melhores práticas teóricas)
   - Encontre onde vive a lógica de negócio principal
   - Localize pontos de integração e dependências externas
   - Documente workarounds e débito técnico
   - Note áreas que diferem de padrões standard

**SE PRD FORNECIDO**: Também analise o que precisaria mudar para a melhoria

### 3. Geração de Documentação Principal

Gere um documento abrangente de arquitetura BROWNFIELD que reflita o estado REAL da base de código.

**CRÍTICO**: Este NÃO é um documento aspiracional de arquitetura. Documente o que EXISTE, incluindo:

- Débito técnico e workarounds
- Padrões inconsistentes entre diferentes partes
- Código legado que não pode ser alterado
- Restrições de integração
- Gargalos de performance

**Estrutura do Documento**:

# Documento de Arquitetura Brownfield [Nome do Projeto]

## Introdução

Este documento captura o ESTADO ATUAL da base de código [Nome do Projeto], incluindo débito técnico, workarounds e padrões do mundo real. Serve como referência para agentes AI trabalhando em melhorias.

### Escopo do Documento

[Se PRD fornecido: "Focado em áreas relevantes para: {descrição da melhoria}"]
[Se sem PRD: "Documentação abrangente de todo o sistema"]

### Log de Mudanças

| Data   | Versão | Descrição                    | Autor     |
| ------ | ------ | ---------------------------- | --------- |
| [Data] | 1.0    | Análise brownfield inicial   | [Analista]|

## Referência Rápida - Arquivos e Pontos de Entrada Principais

### Arquivos Críticos para Entender o Sistema

- **Entrada Principal**: `src/index.js` (ou ponto de entrada real)
- **Configuração**: `config/app.config.js`, `.env.example`
- **Lógica de Negócio Principal**: `src/services/`, `src/domain/`
- **Definições de API**: `src/routes/` ou link para spec OpenAPI
- **Modelos de Banco**: `src/models/` ou link para arquivos de schema
- **Algoritmos-Chave**: [Listar arquivos específicos com lógica complexa]

### Se PRD Fornecido - Áreas de Impacto da Melhoria

[Destacar quais arquivos/módulos serão afetados pela melhoria planejada]

## Arquitetura de Alto Nível

### Resumo Técnico

### Stack Tecnológica Real (do package.json/requirements.txt)

| Categoria | Tecnologia | Versão | Notas                      |
| --------- | ---------- | ------ | -------------------------- |
| Runtime   | Node.js    | 16.x   | [Quaisquer restrições]     |
| Framework | Express    | 4.18.2 | [Middleware customizado?]  |
| Banco     | PostgreSQL | 13     | [Setup de pool de conexão]|

etc...

### Verificação da Realidade da Estrutura do Repositório

- Tipo: [Monorepo/Polyrepo/Híbrido]
- Gerenciador de Pacotes: [npm/yarn/pnpm]
- Notável: [Quaisquer decisões estruturais incomuns]

## Árvore de Código e Organização de Módulos

### Estrutura do Projeto (Real)

```text
raiz-do-projeto/
├── src/
│   ├── controllers/     # Handlers de requisição HTTP
│   ├── services/        # Lógica de negócio (NOTA: padrões inconsistentes entre serviços de usuário e pagamento)
│   ├── models/          # Modelos de banco (Sequelize)
│   ├── utils/           # Miscelânea - precisa refatoração
│   └── legacy/          # NÃO MODIFICAR - sistema de pagamento antigo ainda em uso
├── tests/               # Testes Jest (60% cobertura)
├── scripts/             # Scripts de build e deployment
└── config/              # Configs de ambiente
```

### Módulos-Chave e Seus Propósitos

- **Gerenciamento de Usuário**: `src/services/userService.js` - Lida com todas operações de usuário
- **Autenticação**: `src/middleware/auth.js` - Baseado em JWT, implementação customizada
- **Processamento de Pagamento**: `src/legacy/payment.js` - CRÍTICO: Não refatorar, fortemente acoplado
- **[Listar outros módulos-chave com seus arquivos reais]**

## Modelos de Dados e APIs

### Modelos de Dados

Em vez de duplicar, referencie arquivos de modelo reais:

- **Modelo de Usuário**: Ver `src/models/User.js`
- **Modelo de Pedido**: Ver `src/models/Order.js`
- **Tipos Relacionados**: Definições TypeScript em `src/types/`

### Especificações de API

- **Spec OpenAPI**: `docs/api/openapi.yaml` (se existe)
- **Coleção Postman**: `docs/api/postman-collection.json`
- **Endpoints Manuais**: [Listar quaisquer endpoints não documentados descobertos]

## Débito Técnico e Problemas Conhecidos

### Débito Técnico Crítico

1. **Serviço de Pagamento**: Código legado em `src/legacy/payment.js` - fortemente acoplado, sem testes
2. **Serviço de Usuário**: Padrão diferente de outros serviços, usa callbacks em vez de promises
3. **Migrações de Banco**: Rastreadas manualmente, sem ferramenta de migração adequada
4. **[Outro débito significativo]**

### Workarounds e Pegadinhas

- **Variáveis de Ambiente**: Deve definir `NODE_ENV=production` mesmo para staging (razão histórica)
- **Conexões de Banco**: Pool de conexão hardcoded em 10, alterar quebra serviço de pagamento
- **[Outros workarounds que desenvolvedores precisam saber]**

## Pontos de Integração e Dependências Externas

### Serviços Externos

| Serviço  | Propósito | Tipo Integração | Arquivos-Chave                 |
| -------- | --------- | --------------- | ------------------------------ |
| Stripe   | Pagamentos| REST API        | `src/integrations/stripe/`     |
| SendGrid | Emails    | SDK             | `src/services/emailService.js` |

etc...

### Pontos de Integração Internos

- **Comunicação Frontend**: REST API na porta 3000, espera headers específicos
- **Jobs em Background**: Fila Redis, ver `src/workers/`
- **[Outras integrações]**

## Desenvolvimento e Deployment

### Setup de Desenvolvimento Local

1. Passos reais que funcionam (não passos ideais)
2. Problemas conhecidos com setup
3. Variáveis de ambiente necessárias (ver `.env.example`)

### Processo de Build e Deployment

- **Comando de Build**: `npm run build` (config webpack em `webpack.config.js`)
- **Deployment**: Deployment manual via `scripts/deploy.sh`
- **Ambientes**: Dev, Staging, Prod (ver `config/environments/`)

## Realidade dos Testes

### Cobertura Atual de Testes

- Testes Unitários: 60% cobertura (Jest)
- Testes de Integração: Mínimos, em `tests/integration/`
- Testes E2E: Nenhum
- Testes Manuais: Método primário de QA

### Executando Testes

```bash
npm test           # Executa testes unitários
npm run test:integration  # Executa testes de integração (requer BD local)
```

## Se PRD de Melhoria Fornecido - Análise de Impacto

### Arquivos Que Precisarão Modificação

Baseado nos requisitos de melhoria, estes arquivos serão afetados:

- `src/services/userService.js` - Adicionar novos campos de usuário
- `src/models/User.js` - Atualizar schema
- `src/routes/userRoutes.js` - Novos endpoints
- [etc...]

### Novos Arquivos/Módulos Necessários

- `src/services/newFeatureService.js` - Nova lógica de negócio
- `src/models/NewFeature.js` - Novo modelo de dados
- [etc...]

### Considerações de Integração

- Precisará integrar com middleware de auth existente
- Deve seguir formato de resposta existente em `src/utils/responseFormatter.js`
- [Outros pontos de integração]

## Apêndice - Comandos e Scripts Úteis

### Comandos Frequentemente Usados

```bash
npm run dev         # Iniciar servidor de desenvolvimento
npm run build       # Build de produção
npm run migrate     # Executar migrações de banco
npm run seed        # Semear dados de teste
```

### Debug e Troubleshooting

- **Logs**: Verificar `logs/app.log` para logs da aplicação
- **Modo Debug**: Definir `DEBUG=app:*` para logging verboso
- **Problemas Comuns**: Ver `docs/troubleshooting.md`

### 4. Entrega do Documento

1. **Em Interface Web (Gemini, ChatGPT, Claude)**:
   - Apresentar todo o documento em uma resposta (ou múltiplas se muito longo)
   - Dizer ao usuário para copiar e salvar como `docs/brownfield-architecture.md` ou `docs/project-architecture.md`
   - Mencionar que pode ser fragmentado depois na IDE se necessário

2. **Em Ambiente IDE**:
   - Criar o documento como `docs/brownfield-architecture.md`
   - Informar usuário que este documento único contém toda informação arquitetural
   - Pode ser fragmentado depois usando agente PO se desejado

O documento deve ser abrangente o suficiente para que futuros agentes possam entender:

- O estado real do sistema (não idealizado)
- Onde encontrar arquivos e lógica principais
- Que débito técnico existe
- Que restrições devem ser respeitadas
- Se PRD fornecido: O que precisa mudar para a melhoria

### 5. Garantia de Qualidade

CRÍTICO: Antes de finalizar o documento:

1. **Verificação de Precisão**: Verificar que todos detalhes técnicos correspondem à base de código real
2. **Revisão de Completude**: Assegurar que todos componentes principais do sistema estão documentados
3. **Validação de Foco**: Se usuário forneceu escopo, verificar que áreas relevantes são enfatizadas
4. **Avaliação de Clareza**: Verificar que explicações são claras para agentes AI
5. **Navegação**: Assegurar que documento tem estrutura de seção clara para referência fácil

Aplique a tarefa de elicitação avançada após seções principais para refinar baseado no feedback do usuário.

## Critérios de Sucesso

- Documento único abrangente de arquitetura brownfield criado
- Documento reflete REALIDADE incluindo débito técnico e workarounds
- Arquivos e módulos principais são referenciados com caminhos reais
- Modelos/APIs referenciam arquivos fonte em vez de duplicar conteúdo
- Se PRD fornecido: Análise clara de impacto mostrando o que precisa mudar
- Documento permite agentes AI navegar e entender a base de código real
- Restrições técnicas e "pegadinhas" são claramente documentadas

## Notas

- Esta tarefa cria UM documento que captura o estado VERDADEIRO do sistema
- Referencia arquivos reais em vez de duplicar conteúdo quando possível
- Documenta débito técnico, workarounds e restrições honestamente
- Para projetos brownfield com PRD: Fornece análise clara de impacto de melhoria
- O objetivo é documentação PRÁTICA para agentes AI fazendo trabalho real