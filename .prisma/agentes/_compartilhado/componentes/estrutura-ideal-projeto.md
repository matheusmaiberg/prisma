# 🏗️ Estrutura Ideal de Projeto - Framework PRISMA

## 📌 Visão Geral

Esta é a estrutura de arquivos e pastas recomendada para projetos que utilizam o framework PRISMA. Cada diretório tem propósito específico e convenções de nomenclatura para facilitar navegação dos agentes especializados.

---

## 🗂️ **Estrutura Completa do Projeto**

```
projeto/
├── 📁 docs/
│   ├── 📄 briefing-do-projeto.md
│   ├── 📄 requisitos-de-desenvolvimento-produto.md (PRD)
│   ├── 📄 index.md
│   │
│   ├── 📁 gestao/
│   │   ├── 📄 index.md
│   │   └── 📁 epicos/
│   │       ├── 📄 index.md
│   │       └── 📁 stories/
│   │           ├── 📄 index.md
│   │           ├── 📁 001-autenticacao-oauth/
│   │           │   ├── 📄 storie-definicao.md
│   │           │   ├── 📄 relatorio-validacao-po.md
│   │           │   ├── 📄 doc-decisao-tecnica.md (ADR)
│   │           │   ├── 📄 implementacao-seguranca.md
│   │           │   ├── 📄 teste-performance.md
│   │           │   ├── 📄 trace-fluxo-usuario.md
│   │           │   ├── 📄 analise-riscos.md
│   │           │   ├── 📄 portao-validacao-qa.md
│   │           │   └── 📄 index.md
│   │           │
│   │           └── 📁 002-dashboard-analytics/
│   │               ├── 📄 storie-definicao.md
│   │               ├── 📄 relatorio-validacao-po.md
│   │               └── 📄 index.md
│   │
│   ├── 📁 planejamento/
│   │   ├── 📄 index.md
│   │   ├── 📄 contorno-problemas-po.md
│   │   ├── 📄 contorno-problemas-pm.md
│   │   └── 📄 escalacoes-resolvidas.md
│   │
│   └── 📁 arquitetura/
│       ├── 📄 index.md
│       ├── 📄 README.md
│       ├── 📄 introducao.md
│       ├── 📄 arquitetura-alto-nivel.md
│       ├── 📄 stack-tecnologico.md
│       ├── 📄 arvore-codigo.md
│       │
│       ├── 📁 implementacao/
│       │   ├── 📄 especificacao-api.md
│       │   ├── 📄 arquitetura-backend.md
│       │   ├── 📄 arquitetura-frontend.md
│       │   ├── 📄 padroes-codificacao.md
│       │   ├── 📄 componentes.md
│       │   ├── 📄 modelos-dados.md
│       │   ├── 📄 schema-banco-ddl.md
│       │   ├── 📄 arquitetura-deploy.md
│       │   ├── 📄 seguranca-performance.md
│       │   ├── 📄 decisoes-tecnicas.md
│       │   ├── 📄 status-migracao.md
│       │   ├── 📄 guia-setup.md
│       │   ├── 📄 solucoes-contorno.md
│       │   │
│       │   └── 📁 decisoes/
│       │       ├── 📄 adr-001-escolha-framework.md
│       │       ├── 📄 adr-002-estrategia-autenticacao.md
│       │       ├── 📄 adr-003-oauth-integration.md
│       │       ├── 📄 adr-004-database-strategy.md
│       │       └── 📄 adr-005-deployment-platform.md
│       │
│       ├── 📄 padroes-desenvolvimento.md
│       └── 📄 decisoes-tecnologicas.md
│
├── 📁 .prisma/
│   └── 📁 agentes/
│       └── [estrutura existente dos agentes]
│
└── [resto do código do projeto]
```

---

## 📋 **Convenções de Nomenclatura**

### 🎯 **Padrão Geral**
```yaml
formato_arquivo: "{tipo}-{descricao-especifica}.md"

tipos_principais:
  - storie: "definição da história/feature"
  - relatorio: "relatórios de validação e QA"
  - doc: "documentação técnica e ADRs"
  - implementacao: "detalhes de implementação específica"
  - teste: "documentação de testes"
  - trace: "mapeamento de fluxos"
  - analise: "análises e assessments"
  - portao: "quality gates e validações"
  - contorno: "soluções para problemas"
```

### 📁 **Stories**
```yaml
formato_pasta: "{numero-story}-{nome-da-story}"

exemplos:
  - "001-autenticacao-oauth"
  - "002-dashboard-analytics"
  - "003-integracao-api-pagamento"
  - "004-sistema-notificacoes"

numeracao:
  - sempre_3_digitos: "001, 002, 003..."
  - sequencial: "ordem de criação"
  - nao_reutilizar: "mesmo se story for arquivada"
```

---

## 📄 **Templates de Arquivos**

### 🎯 **docs/index.md**
```markdown
# 📚 Documentação do Projeto

## Navegação Rápida

### 📋 **Documentos Base**
- [Briefing do Projeto](briefing-do-projeto.md)
- [PRD - Requisitos de Produto](requisitos-de-desenvolvimento-produto.md)

### 📊 **Gestão**
- [Épicos e Stories](gestao/)
- [Planejamento e Contornos](planejamento/)

### 🏗️ **Arquitetura**
- [Documentação Técnica](arquitetura/)

---

*Atualizado: {data} | Framework PRISMA*
```

### 📋 **docs/briefing-do-projeto.md**
```markdown
# 📋 Briefing do Projeto

## 🎯 Visão Geral
[Descrição sucinta do projeto - 2-3 parágrafos]

## 📌 Objetivos
- [ ] Objetivo primário
- [ ] Objetivo secundário
- [ ] Objetivo terciário

## 👥 Stakeholders
| Papel | Nome | Responsabilidade |
|-------|------|-----------------|
| Product Owner | [Nome] | [Responsabilidade] |
| Tech Lead | [Nome] | [Responsabilidade] |
| Designer | [Nome] | [Responsabilidade] |

## 🎯 Métricas de Sucesso
- **Métrica 1**: [descrição] - Target: [valor]
- **Métrica 2**: [descrição] - Target: [valor]

## ⏰ Timeline
- **Início**: [data]
- **MVP**: [data]
- **Launch**: [data]

## 🚧 Restrições e Dependências
- [Restrição técnica 1]
- [Dependência externa 1]

---

*Criado: {data} | Framework PRISMA*
```

### 📄 **docs/requisitos-de-desenvolvimento-produto.md**
```markdown
# 📋 PRD - Product Requirements Document

## 🎯 Problema a Resolver
[Descrição detalhada do problema]

## 👥 Personas e Casos de Uso
### Persona 1: [Nome]
- **Contexto**: [situação]
- **Necessidade**: [o que precisa]
- **Objetivo**: [o que quer alcançar]

## ⚡ Requisitos Funcionais
### RF001 - [Nome do Requisito]
- **Descrição**: [detalhes]
- **Prioridade**: Alta/Média/Baixa
- **Complexidade**: Alta/Média/Baixa

## 🔧 Requisitos Não-Funcionais
### RNF001 - Performance
- **Descrição**: [requisitos de performance]
- **Métrica**: [como medir]

## 🚫 Fora de Escopo
- [Item 1 explicitamente fora do escopo]
- [Item 2 explicitamente fora do escopo]

## 📊 Critérios de Aceite Globais
- [ ] [Critério 1]
- [ ] [Critério 2]

---

*Versão: 1.0 | Atualizado: {data} | Framework PRISMA*
```

### 📁 **docs/gestao/index.md**
```markdown
# 📊 Gestão do Projeto

## 📋 Status Atual
- **Sprint Atual**: [número]
- **Stories Ativas**: [quantidade]
- **Stories Completas**: [quantidade]

## 🎯 Épicos
[Lista dos épicos principais com links]

## 📈 Métricas do Sprint
- **Velocity**: [pontos]
- **Burn Rate**: [taxa]
- **Quality Gates**: [taxa de aprovação]

## 🚨 Impedimentos Ativos
- [Impedimento 1]
- [Impedimento 2]

---

*Atualizado: {data} | Framework PRISMA*
```

### 📁 **docs/gestao/epicos/index.md**
```markdown
# 🎯 Épicos do Projeto

## 📋 Lista de Épicos

### Épico 1: [Nome]
- **Status**: [Em Andamento/Concluído/Planejado]
- **Stories**: [quantidade]
- **Estimativa**: [pontos/horas]
- **Responsável**: [agente principal]

## 📊 Progresso Geral
- **Épicos Completos**: X/Y
- **Stories Completas**: X/Y
- **Estimativa Restante**: [tempo]

---

*Atualizado: {data} | Framework PRISMA*
```

### 📁 **docs/gestao/epicos/stories/index.md**
```markdown
# 📚 Stories do Projeto

## 📋 Lista de Stories

| ID | Nome | Status | Épico | Agente Responsável | Estimativa |
|----|------|--------|-------|-------------------|------------|
| 001 | Autenticação OAuth | ✅ Completa | Auth | James | 3h |
| 002 | Dashboard Analytics | 🔄 Em Andamento | Reporting | James | 5h |
| 003 | Integração Pagamento | 📋 Planejada | Commerce | - | 8h |

## 📊 Estatísticas
- **Total Stories**: [número]
- **Completas**: [número] ([porcentagem]%)
- **Em Andamento**: [número]
- **Planejadas**: [número]

## 🔍 Navegação Rápida
- [001-autenticacao-oauth/](001-autenticacao-oauth/)
- [002-dashboard-analytics/](002-dashboard-analytics/)

---

*Atualizado: {data} | Framework PRISMA*
```

### 📄 **Story Individual - storie-definicao.md**
```markdown
# 📋 Story 001: Autenticação OAuth

## 🎯 Contexto
**Como** usuário da aplicação
**Eu quero** fazer login com Google e GitHub
**Para que** possa acessar rapidamente sem criar nova senha

## 📋 Requisitos Funcionais
- [ ] RF001: Configurar Google OAuth provider
- [ ] RF002: Configurar GitHub OAuth provider
- [ ] RF003: Criar UI components para login social
- [ ] RF004: Integrar com sessões existentes

## ✅ Critérios de Aceitação
- [ ] **DADO** que usuário clica "Login com Google"
- [ ] **QUANDO** redirect OAuth acontece
- [ ] **ENTÃO** retorna autenticado com sessão válida

## 🎯 Tasks Técnicas
1. [ ] Setup Google OAuth app + credentials
2. [ ] Setup GitHub OAuth app + credentials
3. [ ] Atualizar NextAuth config
4. [ ] Criar OAuthButtons component
5. [ ] Testar fluxos completos

## 📊 Estimativas
- **Esforço**: 3 horas
- **Complexidade**: Baixa
- **Risco**: Baixo

## 👥 Agentes Envolvidos
- **Criação**: Bob (Scrum Master)
- **Validação**: Sarah (Product Owner)
- **Implementação**: James (Developer)
- **Quality Gates**: Quinn (Test Architect)
- **Arquitetura**: Winston (se necessário)

---

*Criado: {data} | Status: {status} | Framework PRISMA*
```

### 📄 **relatorio-validacao-po.md**
```markdown
# ✅ Relatório de Validação PO - Story 001

## 💼 Análise de Valor de Negócio
- **Impacto no Usuário**: Alto
- **ROI Estimado**: 37% aumento na conversão
- **Alinhamento Estratégico**: ⭐⭐⭐⭐⭐

## 📊 Análise de Riscos de Negócio
- **Dependência Externa**: Baixo risco (Google/GitHub 99.9% uptime)
- **Privacy Concerns**: Mitigado (comunicação clara)
- **Vendor Lock**: Baixo (múltiplos providers + fallback)

## 🎯 Refinamentos Adicionados
- Analytics events para tracking de uso
- Dados OAuth read-only
- GDPR compliance mechanisms
- Fallback para email/senha sempre disponível

## ✅ Decisão Final
**APROVADO** - Score: 43/50

### Critérios Adicionais
- [ ] Rastrear qual provider é mais usado (GA events)
- [ ] Primeiro login OAuth = fluxo onboarding completo
- [ ] Avatar e nome importados automaticamente

---

*Validado por: Sarah (Product Owner) | Data: {data} | Framework PRISMA*
```

### 📄 **doc-decisao-tecnica.md (ADR)**
```markdown
# 🏗️ ADR-003: OAuth Integration Architecture

## Status
ACCEPTED

## Context
Sistema precisa de autenticação OAuth (Google + GitHub) mantendo compatibilidade com auth existente via NextAuth.js.

## Decision Options Analyzed

### Option 1: NextAuth.js OAuth Providers ✅
**Pros:**
- Integração nativa com setup existente
- Security best practices built-in
- Configuração simplificada

**Cons:**
- Dependência external library
- Vendor lock-in moderado

### Option 2: Custom OAuth Implementation
**Pros:**
- Controle total sobre implementation

**Cons:**
- Security risks
- Desenvolvimento time significativo

## Decision
**Escolhido: Option 1 - NextAuth.js OAuth Providers**

### Rationale
- Leverage existing NextAuth.js investment
- Proven security track record
- Rapid implementation (hours vs weeks)

## Implementation Strategy
```yaml
oauth_architecture:
  providers: ["google", "github"]
  session_strategy: "database sessions"
  security_measures: ["csrf_protection", "token_handling"]
```

## Success Metrics
- Implementation time < 4 hours
- Zero breaking changes to existing auth
- OAuth login success rate > 95%

---

*Criado por: Winston (Architect) | Data: {data} | Framework PRISMA*
```

### 📄 **implementacao-seguranca.md**
```markdown
# 🔒 Implementação de Segurança - Story 001

## 🛡️ Medidas de Segurança Implementadas

### Authentication Flow
- **CSRF Protection**: NextAuth.js built-in protection
- **Token Handling**: Server-side only, nunca no client
- **Redirect Validation**: Whitelisted domains apenas

### Data Protection
- **OAuth Scopes**: Mínimo necessário (user:email)
- **Data Storage**: Encrypted at rest
- **Session Security**: HTTPOnly cookies, Secure flag

### Compliance
- **GDPR**: Consentimento explícito documentado
- **Privacy**: Clear data usage communication
- **Audit Trail**: Login methods logged

## 🔍 Security Checklist
- [x] Secrets não hardcoded
- [x] Environment variables protegidas
- [x] HTTPS enforced
- [x] Rate limiting configurado
- [x] Error messages não expõem info sensível

## 🚨 Riscos Identificados
- **Risco**: Dependência de providers externos
- **Mitigação**: Fallback email/senha sempre disponível

---

*Implementado por: James (Developer) | Revisado por: Quinn (QA) | Data: {data}*
```

### 📄 **teste-performance.md**
```markdown
# ⚡ Teste de Performance - Story 001

## 🎯 Objetivos dos Testes
- OAuth flow < 5 segundos
- Page load impact < 100ms
- Concurrent users: 1000+

## 📊 Resultados dos Testes

### OAuth Flow Performance
- **Google OAuth**: 2.3s média
- **GitHub OAuth**: 2.1s média
- **Fallback to email**: 1.8s média

### Load Testing
- **Concurrent Users**: 1200 (✅ Passed)
- **Error Rate**: 0.2% (✅ Passed)
- **Response Time**: 95ms média (✅ Passed)

### Bundle Size Impact
- **Before**: 2.3MB
- **After**: 2.31MB (+10KB)
- **Impact**: Negligível

## ✅ Conclusão
Todos os requisitos de performance atendidos.

---

*Testado por: Quinn (Test Architect) | Data: {data} | Framework PRISMA*
```

### 📄 **trace-fluxo-usuario.md**
```markdown
# 🔍 Trace de Fluxo de Usuário - Story 001

## 🎯 User Journey Mapeado

### Fluxo Principal: Google OAuth
1. **Início**: Usuário clica "Login com Google"
2. **Redirect**: Sistema redireciona para Google
3. **Autorização**: Usuário autoriza no Google
4. **Callback**: Google retorna com authorization code
5. **Token Exchange**: Sistema troca code por tokens
6. **Session**: Sistema cria sessão do usuário
7. **Redirect**: Usuário redirecionado para dashboard

### Pontos de Falha Identificados
- **Ponto 2**: Redirect pode falhar se configuração incorreta
- **Ponto 4**: Callback pode falhar se URL errada
- **Ponto 5**: Token exchange pode falhar se secrets incorretos

### Error Handling
- **Connection Error**: Fallback para email/senha
- **Authorization Denied**: Mensagem clara + fallback
- **Invalid Configuration**: Error logging + admin alert

## 🧪 Cenários Testados
- [x] Fluxo completo Google - ✅ Passed
- [x] Fluxo completo GitHub - ✅ Passed
- [x] Cancelamento de autorização - ✅ Handled
- [x] Network failure - ✅ Graceful degradation

---

*Mapeado por: Quinn (Test Architect) | Data: {data} | Framework PRISMA*
```

### 📄 **analise-riscos.md**
```markdown
# ⚠️ Análise de Riscos - Story 001

## 🎯 Matriz de Riscos (3x3)

| Risco | Probabilidade | Impacto | Score | Mitigação |
|-------|--------------|---------|-------|-----------|
| Google/GitHub downtime | Baixa | Médio | 2 | Fallback email/senha |
| OAuth misconfiguration | Média | Alto | 6 | Testes automatizados |
| User privacy concerns | Média | Baixo | 2 | Comunicação clara |
| Vendor lock-in | Baixa | Médio | 2 | Múltiplos providers |

## 🚨 Riscos Críticos (Score ≥ 6)
### OAuth Misconfiguration
- **Descrição**: Configuração incorreta impede login
- **Impacto**: Usuários não conseguem acessar sistema
- **Mitigação**:
  - Testes automatizados em CI/CD
  - Checklist de configuração
  - Monitoring de error rates

## ✅ Riscos Aceitos (Score < 4)
- Provider downtime (raro, fallback disponível)
- Privacy concerns (comunicação resolve)
- Vendor lock-in (padrão da indústria)

## 📋 Plano de Contingência
1. **Provider Down**: Automatic fallback para email/senha
2. **Config Error**: Rollback automático + alertas
3. **High Error Rate**: Circuit breaker + investigação

---

*Analisado por: Quinn (Test Architect) | Data: {data} | Framework PRISMA*
```

### 📄 **portao-validacao-qa.md**
```markdown
# 🚪 Portão de Validação QA - Story 001

## 📋 Critérios de Quality Gate

### ✅ PASS Criteria
- [ ] Todos testes unitários passing (100%)
- [ ] Todos testes integração passing (100%)
- [ ] Coverage ≥ 80%
- [ ] Performance requirements met
- [ ] Security checklist completo
- [ ] No vulnerabilidades críticas
- [ ] Error handling adequado

### ⚠️ CONCERNS Criteria
- [ ] Coverage entre 70-79%
- [ ] Performance próximo do limite
- [ ] Vulnerabilidades baixas identificadas
- [ ] Error handling parcial

### ❌ FAIL Criteria
- [ ] Qualquer teste crítico falhando
- [ ] Coverage < 70%
- [ ] Vulnerabilidades médias/altas
- [ ] Performance abaixo requisitos

## 📊 Resultados da Validação

### Testes Automatizados
- **Unit Tests**: 24/24 ✅ (100%)
- **Integration Tests**: 8/8 ✅ (100%)
- **E2E Tests**: 6/6 ✅ (100%)
- **Coverage**: 87% ✅

### Segurança
- **Vulnerabilities**: 0 críticas, 0 médias ✅
- **Security Checklist**: 12/12 ✅
- **Penetration Test**: Passed ✅

### Performance
- **OAuth Flow**: 2.3s ✅ (< 5s requirement)
- **Load Test**: 1200 users ✅ (> 1000 requirement)
- **Bundle Size**: +10KB ✅ (negligível)

## 🏆 Decisão Final: **PASS**

Todos os critérios atendidos. Story aprovada para produção.

### Observações
- Excelente cobertura de testes
- Performance acima das expectativas
- Implementação de segurança robusta

---

*Validado por: Quinn (Test Architect) | Data: {data} | Framework PRISMA*
```

### 📄 **docs/planejamento/index.md**
```markdown
# 📋 Planejamento e Contornos

## 🎯 Objetivo desta Seção
Esta área documenta soluções para problemas identificados por Product Owners (PO) e Project Managers (PM) durante o desenvolvimento.

## 📂 Tipos de Documentos
- **Contorno Problemas PO**: Issues relacionados a valor de negócio
- **Contorno Problemas PM**: Issues relacionados a gestão/timeline
- **Escalações Resolvidas**: Conflitos resolvidos pelo Alan (Diretor)

## 🚨 Problemas Ativos
[Lista de problemas em aberto]

## ✅ Problemas Resolvidos
[Lista de problemas já solucionados]

---

*Atualizado: {data} | Framework PRISMA*
```

### 📄 **docs/arquitetura/index.md**
```markdown
# 🏗️ Arquitetura do Projeto

## 📋 Navegação Rápida

### 📚 Documentação Base
- [README](README.md) - Visão geral
- [Introdução](introducao.md) - Contexto e objetivos
- [Arquitetura Alto Nível](arquitetura-alto-nivel.md) - Visão macro
- [Stack Tecnológico](stack-tecnologico.md) - Tecnologias utilizadas
- [Árvore de Código](arvore-codigo.md) - Estrutura de código

### 🔧 Detalhes de Implementação
- [Especificação da API](implementacao/especificacao-api.md)
- [Arquitetura Backend](implementacao/arquitetura-backend.md)
- [Arquitetura Frontend](implementacao/arquitetura-frontend.md)
- [Componentes](implementacao/componentes.md)
- [Modelos de Dados](implementacao/modelos-dados.md)
- [Schema do Banco DDL](implementacao/schema-banco-ddl.md)
- [Arquitetura de Deploy](implementacao/arquitetura-deploy.md)
- [Segurança e Performance](implementacao/seguranca-performance.md)
- [Padrões de Codificação](implementacao/padroes-codificacao.md)
- [Decisões Técnicas](implementacao/decisoes-tecnicas.md)
- [Status de Migração](implementacao/status-migracao.md)
- [Guia de Setup](implementacao/guia-setup.md)
- [Soluções de Contorno](implementacao/solucoes-contorno.md)

### 📄 Registros de Decisões Arquiteturais (ADRs)
- [ADR-001: Escolha do Framework](implementacao/decisoes/adr-001-escolha-framework.md)
- [ADR-002: Estratégia de Autenticação](implementacao/decisoes/adr-002-estrategia-autenticacao.md)
- [ADR-003: Integração OAuth](implementacao/decisoes/adr-003-integracao-oauth.md)
- [ADR-004: Estratégia de Banco de Dados](implementacao/decisoes/adr-004-estrategia-banco-dados.md)
- [ADR-005: Plataforma de Deploy](implementacao/decisoes/adr-005-plataforma-deploy.md)

### 📚 Padrões e Convenções
- [Padrões de Desenvolvimento](padroes-desenvolvimento.md)
- [Decisões Tecnológicas](decisoes-tecnologicas.md)

## 🎯 Status Arquitetural
- **ADRs Ativos**: [número]
- **Decisões Pendentes**: [número]
- **Reviews Necessários**: [lista]

---

*Mantido por: Winston (Architect) | Atualizado: {data} | Framework PRISMA*
```

### 📄 **docs/arquitetura/README.md**
```markdown
# 🏗️ Documentação de Arquitetura

## Visão Geral
Este diretório contém a documentação técnica completa da arquitetura do projeto, incluindo decisões de design, detalhes de implementação e padrões arquiteturais.

## Estrutura
- **Nível Raiz**: Documentos de arquitetura de alto nível
- **implementacao/**: Especificações detalhadas de implementação
- **implementacao/decisoes/**: Registros de Decisões Arquiteturais (ADRs)

## Links Rápidos
- [Comece Aqui - Introdução](introducao.md)
- [Visão Geral da Arquitetura](arquitetura-alto-nivel.md)
- [Guia de Implementação](implementacao/)

## Mantenedores
- **Winston**: Decisões arquiteturais e ADRs
- **James**: Detalhes de implementação
- **Quinn**: Especificações de segurança e performance

---

*Framework PRISMA - Documentação de Arquitetura*
```

### 📄 **docs/arquitetura/arquitetura-alto-nivel.md**
```markdown
# 🏗️ Arquitetura de Alto Nível

## Visão Geral do Sistema
[Diagrama arquitetural macro do sistema]

## Princípios Arquiteturais
1. **Separação de Responsabilidades**: Limites claros entre camadas
2. **Escalabilidade Primeiro**: Design para crescimento desde o início
3. **Segurança por Design**: Segurança não é uma reflexão tardia
4. **Experiência do Desenvolvedor**: Simples de entender e modificar

## Componentes do Sistema
### Frontend
- Tecnologia: [React/Next.js/Vue]
- Padrão: [SPA/SSR/SSG]
- Gerenciamento de Estado: [Redux/Zustand/Context]

### Backend
- Tecnologia: [Node.js/Python/Go]
- Padrão: [REST/GraphQL/gRPC]
- Framework: [Express/FastAPI/Gin]

### Banco de Dados
- Primário: [PostgreSQL/MySQL/MongoDB]
- Cache: [Redis/Memcached]
- Busca: [Elasticsearch/Algolia]

### Infraestrutura
- Hospedagem: [AWS/GCP/Azure/Vercel]
- Container: [Docker/Kubernetes]
- CI/CD: [GitHub Actions/GitLab CI]

## Fluxo de Dados
[Diagrama de fluxo de dados]

## Camadas de Segurança
[Diagrama de camadas de segurança]

---

*Mantido por: Winston (Arquiteto) | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/especificacao-api.md**
```markdown
# 📡 Especificação da API

## Princípios de Design da API
- RESTful conventions
- Consistent naming
- Comprehensive error handling
- Versioning strategy

## Autenticação
### Endpoints OAuth 2.0
```yaml
POST /api/auth/signin
POST /api/auth/signout
GET  /api/auth/session
GET  /api/auth/providers
```

## Recursos Principais
### Usuários
```yaml
GET    /api/users          # List users
GET    /api/users/:id      # Get user
POST   /api/users          # Create user
PATCH  /api/users/:id      # Update user
DELETE /api/users/:id      # Delete user
```

## Formato de Requisição/Resposta
### Resposta de Sucesso
```json
{
  "success": true,
  "data": {},
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### Resposta de Erro
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

## Limitação de Taxa
- Authenticated: 1000 req/hour
- Unauthenticated: 100 req/hour

## Documentação da API
- OpenAPI/Swagger spec available at `/api/docs`

---

*Mantido por: James (Desenvolvedor) | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/schema-banco-ddl.md**
```markdown
# 🗄️ Schema do Banco de Dados DDL

## Configuração do Banco de Dados
```sql
-- Database: production
-- Encoding: UTF-8
-- Timezone: UTC
```

## Tabelas Principais

### Tabela de Usuários
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255),
    avatar_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
```

### Tabela de Sessões
```sql
CREATE TABLE sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    token TEXT UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_user_id ON sessions(user_id);
```

### Tabela de Contas OAuth
```sql
CREATE TABLE oauth_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    provider VARCHAR(50) NOT NULL,
    provider_account_id VARCHAR(255) NOT NULL,
    access_token TEXT,
    refresh_token TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(provider, provider_account_id)
);

CREATE INDEX idx_oauth_provider ON oauth_accounts(provider, provider_account_id);
```

## Migrações
- Migration files stored in `/migrations`
- Versioned using timestamps
- Rollback scripts included

---

*Mantido por: James (Desenvolvedor) | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/seguranca-performance.md**
```markdown
# 🔒 Segurança e Performance

## Medidas de Segurança

### Autenticação e Autorização
- OAuth 2.0 implementation
- JWT tokens with short expiry
- Refresh token rotation
- Session management

### Proteção de Dados
- Criptografia at rest (AES-256)
- Encryption in transit (TLS 1.3)
- PII data masking
- Secure cookie flags

### Cabeçalhos de Segurança
```javascript
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000",
  "Content-Security-Policy": "default-src 'self'"
}
```

### Validação de Entrada
- SQL injection prevention
- XSS protection
- CSRF tokens
- Rate limiting

## Otimização de Performance

### Estratégia de Cache
- Redis for session cache
- CDN for static assets
- Database query cache
- API response cache

### Otimização de Banco de Dados
- Indexed queries
- Connection pooling
- Query optimization
- Pagination implementation

### Performance do Frontend
- Code splitting
- Lazy loading
- Image optimization
- Bundle size monitoring

### Monitoramento
- APM integration
- Error tracking
- Performance metrics
- Real User Monitoring (RUM)

## Metas de Performance
- Page Load: < 3s
- API Response: < 200ms (p95)
- Uptime: 99.9%
- Error Rate: < 0.1%

---

*Mantido por: Quinn (Arquiteto de Testes) | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/decisoes-tecnicas.md**
```markdown
# 🎯 Decisões Técnicas

## Stack Tecnológico

### Tecnologias Principais
| Categoria | Tecnologia | Versão | Justificativa |
|----------|------------|---------|---------------|
| Runtime | Node.js | LTS | Estabilidade e ecossistema |
| Framework | [Next.js/Express] | latest | [reasoning] |
| Database | [PostgreSQL/MongoDB] | latest | [reasoning] |
| Cache | [Redis/Memcached] | latest | [reasoning] |
| Queue | [BullMQ/RabbitMQ] | latest | [reasoning] |

### Stack Frontend
| Categoria | Tecnologia | Justificativa |
|----------|------------|---------------|
| Framework | [React/Vue/Angular] | [reasoning] |
| State | [Redux/Zustand] | [reasoning] |
| Styling | [Tailwind/Styled] | [reasoning] |
| Components | [shadcn/MUI] | [reasoning] |

## Padrões Arquiteturais

### Decisões de Padrões
1. **[Pattern Name]**
   - **Contexto**: [quando usar]
   - **Decisão**: [o que escolhemos]
   - **Justificativa**: [por quê]
   - **Trade-offs**: [prós/contras]

## Organização de Módulos

### Estrutura do Projeto
```text
project/
├── src/
│   ├── modules/     # Domain modules
│   ├── shared/      # Shared code
│   ├── infra/       # Infrastructure
│   └── config/      # Configuration
```

### Limites de Módulos
- **Princípio**: Separação clara de responsabilidades
- **Comunicação**: Através de interfaces definidas
- **Dependências**: Fluxo unidirecional

## Decisões de Design da API

### Estilo da API
- **REST** vs **GraphQL** vs **gRPC**
- **Decision**: [chosen style]
- **Rationale**: [reasoning]

### Estratégia de Versionamento
- **Padrão**: [URL/Header/Accept]
- **Migração**: [abordagem]

## Decisões de Segurança

### Autenticação
- **Método**: [JWT/Session/OAuth]
- **Armazenamento**: [abordagem]
- **Rotação**: [estratégia]

### Autorização
- **Modelo**: [RBAC/ABAC]
- **Implementação**: [abordagem]

## Decisões de Performance

### Estratégia de Cache
- **Níveis**: [CDN/App/DB]
- **Invalidação**: [estratégia]
- **TTL**: [abordagem]

### Otimização
- **Banco de Dados**: [estratégia de indexação]
- **API**: [abordagem de paginação]
- **Frontend**: [técnicas de otimização]

## Estratégia de Testes

### Pirâmide de Testes
- **Unitários**: 70%
- **Integração**: 20%
- **E2E**: 10%

### Ferramentas
- **Framework**: [Jest/Vitest]
- **E2E**: [Playwright/Cypress]
- **Cobertura**: [meta]

---

*Mantido por: Winston (Arquiteto) | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/status-migracao.md**
```markdown
# 🔄 Status de Migração

## Visão Geral do Status Atual

| Componente | Versão Legada | Versão Alvo | Status | Progresso |
|-----------|---------------|----------------|--------|----------|
| Frontend | [versão] | [versão] | 🔄 Em Progresso | 60% |
| Backend | [versão] | [versão] | ✅ Completo | 100% |
| Banco de Dados | [versão] | [versão] | 📋 Planejado | 0% |

## Fases de Migração

### Fase 1: Fundação (✅ Completa)
- [x] Setup de ambiente
- [x] Atualização de dependências
- [x] Configuração de build
- [x] Roteamento básico

### Fase 2: Funcionalidades Principais (🔄 Em Progresso)
- [x] Migração de autenticação
- [ ] Gerenciamento de usuários
- [ ] Endpoints da API
- [ ] Modelos de dados

### Fase 3: Funcionalidades Avançadas (📋 Planejada)
- [ ] Integração de analytics
- [ ] Sistema de pagamento
- [ ] Serviço de notificações
- [ ] Painel administrativo

## Bloqueadores de Migração

### Problemas Críticos
1. **[Nome do Bloqueador]**
   - **Impacto**: [descrição]
   - **Solução**: [abordagem]
   - **Status**: [status]

## Plano de Rollback

### Gatilhos de Rollback
- Bug crítico em produção
- Degradação de performance > 30%
- Corrupção de dados

### Passos de Rollback
1. [Step 1]
2. [Step 2]
3. [Step 3]

## Tarefas Pós-Migração
- [ ] Benchmarking de performance
- [ ] Auditoria de segurança
- [ ] Atualização de documentação
- [ ] Treinamento da equipe

---

*Atualizado: {data} | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/guia-setup.md**
```markdown
# 🚀 Guia de Setup

## Pré-requisitos

### Requisitos do Sistema
- Node.js >= 18.0.0
- npm/pnpm/yarn
- Docker (optional)
- Git

### Configuração do Ambiente
```bash
# Clonar repositório
git clone [url-repo]
cd projeto

# Instalar dependências
pnpm install

# Configurar ambiente
cp .env.example .env.local
```

## Setup de Desenvolvimento

### 1. Setup do Banco de Dados
```bash
# Usando Docker
docker-compose up -d postgres redis

# Ou instalação local
# PostgreSQL: [instructions]
# Redis: [instructions]
```

### 2. Configuração Inicial
```bash
# Rodar migrações
pnpm db:migrate

# Popular banco (opcional)
pnpm db:seed

# Gerar tipos
pnpm generate:types
```

### 3. Iniciar Desenvolvimento
```bash
# Servidor de desenvolvimento
pnpm dev

# Com ambiente específico
NODE_ENV=development pnpm dev
```

## Setup de Produção

### Processo de Build
```bash
# Buildar aplicação
pnpm build

# Rodar produção
pnpm start
```

### Deploy com Docker
```dockerfile
# Veja Dockerfile para configuração
docker build -t app .
docker run -p 3000:3000 app
```

## Problemas Comuns

### Problema: Build falha com [erro]
**Solução**: [passos para corrigir]

### Problema: Erro de conexão com banco
**Solução**: Verificar string de conexão no .env

## Passos de Verificação

### Verificações de Saúde
- [ ] Endpoint da API: `http://localhost:3000/api/health`
- [ ] Conexão com banco: Verificar logs
- [ ] Conexão Redis: Verificar operações de cache

---

*Mantido por: James (Desenvolvedor) | Framework PRISMA*
```

### 📄 **docs/arquitetura/implementacao/solucoes-contorno.md**
```markdown
# 🔧 Soluções de Contorno e Problemas Conhecidos

## Soluções de Contorno Atuais

### 1. Problema de Build com [Componente]
**Problema**: [descrição]
**Solução de Contorno**:
```bash
# Correção temporária
[comando ou código]
```
**Correção Permanente**: Planejada para versão [X.Y.Z]
**Rastreamento**: Issue #[número]

### 2. Problema de Performance com [Funcionalidade]
**Problema**: Tempos de resposta lentos > 2s
**Solução de Contorno**:
- Implementada camada de cache
- Tamanho do payload reduzido
- Adicionada paginação
**Correção Permanente**: Otimização de banco em progresso

### 3. Problema de Compatibilidade com [Biblioteca]
**Problema**: Conflito de versão com dependências
**Solução de Contorno**:
```json
// overrides no package.json
"overrides": {
  "pacote": "versão"
}
```

## Limitações Conhecidas

### Débito Técnico
1. **[Componente]**: Precisa de refatoração
2. **[Funcionalidade]**: Falta cobertura de testes
3. **[API]**: Não segue padrões REST

### Problemas Específicos do Ambiente

#### Desenvolvimento no Windows
- Limitações de tamanho de caminho
- Problemas de case sensitivity
- Compatibilidade de scripts

#### Docker no Mac
- Problemas de performance com volume mounts
- Usar mounts delegados para melhor performance

## Log de Soluções Temporárias

| Data | Problema | Solução | Responsável | Status |
|------|----------|----------|-------------|--------|
| 2024-01-15 | [problema] | [solução] | James | Ativo |
| 2024-01-10 | [problema] | [solução] | Quinn | Resolvido |

## Monitoramento e Alertas

### Soluções Críticas
- **Alerta**: Se [condição], então [ação]
- **Monitorar**: [métrica] para degradação
- **Escalação**: Contatar [equipe] se [condição]

---

*Maintained by: James (Developer) | Updated: {date} | Framework PRISMA*
```

---

## 🎯 **Comandos dos Agentes para Estrutura**

### 📋 **Bob (Scrum Master)**
```bash
*criar-historia [epic]          # Cria pasta story + storie-definicao.md
*gerar-template [tipo]          # Cria templates baseados em padrões
*organizar-sprint               # Atualiza index.md das stories
*validar-estrutura              # Verifica se estrutura está correta
```

### 💼 **Sarah (Product Owner)**
```bash
*criar-relatorio-po [story]     # Cria relatorio-validacao-po.md
*definir-criterios [story]      # Adiciona critérios à story
*validar-valor [story]          # Documenta análise de valor
*aprovar-historia [story]       # Finaliza validação
```

### 💻 **James (Developer)**
```bash
*implementar-historia [story]   # Atualiza progresso da story
*documentar-implementacao [story] # Cria docs técnicos
*reportar-problemas [story]     # Documenta blockers
*finalizar-desenvolvimento [story] # Marca como pronto para QA
```

### 🧪 **Quinn (Test Architect)**
```bash
*criar-analise-riscos [story]   # Cria analise-riscos.md
*executar-trace [story]         # Cria trace-fluxo-usuario.md
*teste-performance [story]      # Cria teste-performance.md
*gate [story]                   # Cria portao-validacao-qa.md
*implementar-seguranca [story]  # Cria implementacao-seguranca.md
```

### 🏗️ **Winston (Architect)**
```bash
*criar-adr [decisao]           # Cria novo ADR em docs/arquitetura/
*documentar-decisao [story]    # Cria doc-decisao-tecnica.md
*atualizar-arquitetura         # Atualiza docs/arquitetura/index.md
*revisar-padroes              # Atualiza padroes-desenvolvimento.md
```

### 🎯 **Alan (Diretor)**
```bash
*inicializar-projeto          # Cria estrutura completa
*criar-briefing              # Cria briefing-do-projeto.md
*criar-prd                   # Cria requisitos-de-desenvolvimento-produto.md
*organizar-documentacao      # Atualiza todos index.md
*resolver-escalacao [issue]  # Documenta em planejamento/
```

---

## 🏆 **Benefícios da Estrutura**

### ✅ **Para os Agentes**
- **Navegação Rápida**: index.md em cada pasta
- **Contexto Completo**: tudo sobre uma story em uma pasta
- **Padronização**: nomenclatura consistente
- **Rastreabilidade**: histórico completo de decisões

### 🎯 **Para o Projeto**
- **Organização Clara**: cada tipo de documento tem lugar específico
- **Escalabilidade**: estrutura cresce com o projeto
- **Colaboração**: fácil para novos membros entenderem
- **Auditoria**: trilha completa de decisões e validações

### 📊 **Para Gestão**
- **Visibilidade**: status claro de cada story
- **Métricas**: fácil extrair dados de progresso
- **Compliance**: documentação adequada para auditorias
- **Conhecimento**: preservação de contexto e decisões

---

*Framework PRISMA - Estrutura ideal para máxima eficiência dos agentes especializados*
*"Um lugar para cada coisa, cada coisa em seu lugar"*