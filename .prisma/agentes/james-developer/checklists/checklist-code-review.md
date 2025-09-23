# 🔍 Checklist de Code Review - James

## 🎯 Filosofia PRISMA Code Review
**Quality First**: Code review é sobre elevar qualidade, não encontrar falhas
**Collaborative Learning**: Oportunidade de aprender e ensinar
**User Focus**: Código deve servir aos usuários finais

---

## 👥 Tipos de Code Review

### 🪞 Self Review (Antes do Handoff)
**Quando**: Antes de enviar para Quinn ou solicitar review de Wagner/Cleide
**Objetivo**: Garantir qualidade básica antes de ocupar tempo dos colegas

### 👨‍💻 Peer Review com Wagner/Cleide
**Quando**: Durante desenvolvimento de features complexas
**Objetivo**: Validação técnica e compartilhamento de conhecimento

### 🏃‍♂️ Review Input para Bob
**Quando**: Bob solicita feedback técnico sobre stories/tasks
**Objetivo**: Contribuir com perspectiva de implementação

### ✅ Quinn Quality Gates
**Quando**: Após completar implementação
**Objetivo**: Validação final antes de merge

---

## 🪞 Self Review Checklist

### 🔍 Análise Geral do Código

#### 📐 Estrutura e Organização
- [ ] 📁 **Arquitetura de arquivos**: Seguindo convenções do projeto
- [ ] 🏗️ **Separation of Concerns**: Cada arquivo tem responsabilidade clara
- [ ] 📦 **Imports organizados**: Agrupados e ordenados logicamente
- [ ] 🗂️ **Folder structure**: Novos arquivos nos diretórios corretos

#### 🔤 Naming & Conventions
- [ ] 🎯 **Nomes descritivos**: Variáveis/funções explicam sua intenção
- [ ] 📏 **Consistência**: Seguindo padrões de nomenclatura do projeto
- [ ] 🔄 **CamelCase/kebab-case**: Convenções específicas respeitadas
- [ ] 🏷️ **Type names**: TypeScript types bem nomeados

#### 💻 Clean Code Principles
- [ ] 📏 **Funções pequenas**: Máximo 20 linhas, foco único
- [ ] 🎯 **Single Responsibility**: Uma responsabilidade por função
- [ ] 🔄 **DRY**: Código não duplicado desnecessariamente
- [ ] 📝 **Comments**: Apenas quando necessário para explicar "porquê"
- [ ] 🧩 **Modularidade**: Código bem modularizado e reutilizável

### 🏗️ SOLID Principles Review

#### 🎯 Single Responsibility Principle (SRP)
- [ ] ✅ **Uma razão para mudar**: Cada classe/função tem uma responsabilidade
- [ ] 🔍 **Cohesão alta**: Elementos relacionados ficam juntos
- [ ] 📦 **Separação clara**: Lógica de negócio separada de apresentação

#### 🔓 Open/Closed Principle (OCP)
- [ ] ➕ **Extensível**: Fácil adicionar novas funcionalidades
- [ ] 🔒 **Fechado para modificação**: Mudanças não quebram código existente
- [ ] 🔌 **Interfaces bem definidas**: Abstrações permitem extensibilidade

#### 🔄 Liskov Substitution Principle (LSP)
- [ ] 🔄 **Substituibilidade**: Subtipos podem substituir tipos base
- [ ] 📋 **Contratos mantidos**: Precondições/postcondições respeitadas
- [ ] 🎭 **Comportamento consistente**: Subclasses não surpreendem

#### 🎭 Interface Segregation Principle (ISP)
- [ ] 🎯 **Interfaces específicas**: Não forço implementação de métodos desnecessários
- [ ] 📦 **Separação por responsabilidade**: Interfaces focadas em uma responsabilidade
- [ ] 🔌 **Composição**: Prefiro composição de interfaces pequenas

#### ⬇️ Dependency Inversion Principle (DIP)
- [ ] 🏗️ **Abstrações**: Dependo de interfaces, não implementações
- [ ] 🔄 **Injeção de dependência**: Dependencies injetadas, não criadas
- [ ] 🎯 **Inversão de controle**: High-level modules não dependem de low-level

### 🧪 Testing Review

#### 🔬 Unit Tests
- [ ] ✅ **Coverage adequado**: Mínimo 80% das linhas testadas
- [ ] 🎯 **Testa comportamento**: Não apenas implementação
- [ ] 🔄 **Test cases completos**: Happy path + edge cases + error cases
- [ ] ⚡ **Tests rápidos**: Cada test < 100ms
- [ ] 📝 **Nomes descritivos**: Test names explicam o comportamento esperado

#### 🔗 Integration Tests
- [ ] 🌐 **API contracts**: Endpoints testados com payloads reais
- [ ] 🗄️ **Database interactions**: Queries testadas com dados reais
- [ ] 🔌 **External services**: Mocks apropriados para services externos
- [ ] 🔄 **End-to-end flows**: Jornadas críticas cobertas

#### 🤔 Test Quality
- [ ] 🏗️ **Arrange-Act-Assert**: Estrutura clara dos tests
- [ ] 🎭 **Mocks apropriados**: Não uso mocks desnecessários
- [ ] 🔍 **Assertions específicas**: Verifico exatamente o que preciso
- [ ] 🧹 **Test cleanup**: Tests não deixam side effects

### 🔒 Security Review

#### 🛡️ Input Validation
- [ ] ✅ **Sanitização**: Todos inputs sanitizados
- [ ] 🔍 **Validation**: Dados validados antes do processamento
- [ ] 🚨 **Error handling**: Errors não vazam informações sensíveis
- [ ] 📝 **Logging seguro**: Não logo dados sensíveis

#### 🔐 Authentication & Authorization
- [ ] 🔑 **Auth required**: Endpoints protegidos adequadamente
- [ ] 👤 **User context**: Verifico permissões do usuário
- [ ] 🎫 **Token handling**: JWT/sessions manejados corretamente
- [ ] ⏰ **Session management**: Timeouts e refresh apropriados

#### 🗝️ Secrets Management
- [ ] 🔒 **Environment variables**: Secrets em .env, nunca hardcoded
- [ ] 🗂️ **Git safety**: Nenhum secret commitado
- [ ] 🔐 **Encryption**: Dados sensíveis criptografados
- [ ] 🔑 **API keys**: Keys rotacionáveis e com escopo limitado

### ⚡ Performance Review

#### 🚀 Frontend Performance
- [ ] 📦 **Bundle size**: Novo código não inflaciona bundle
- [ ] 🖼️ **Image optimization**: Imagens otimizadas e lazy loaded
- [ ] 🔄 **Code splitting**: Routes e components lazy loaded
- [ ] 📊 **React optimization**: useMemo/useCallback onde apropriado

#### 🔗 Backend Performance
- [ ] 🗄️ **Database queries**: N+1 problems evitados
- [ ] 📊 **Indexing**: Queries otimizadas com índices adequados
- [ ] 💾 **Caching**: Cache strategies implementadas onde apropriado
- [ ] ⚡ **Response times**: APIs respondem em < 200ms

#### 🌐 Network Performance
- [ ] 📡 **API calls**: Minimizo number of requests
- [ ] 📦 **Payload size**: Responses enxutas, sem dados desnecessários
- [ ] 🔄 **Retry logic**: Fallbacks para failures de rede
- [ ] 📊 **Monitoring**: Metrics de performance implementadas

---

## 👨‍💻 Peer Review com Wagner/Cleide

### 🤝 Preparação para Review

#### 📝 Context Setting
- [ ] 📋 **PR Description**: Descrevo claramente o que foi implementado
- [ ] 🎯 **Why not What**: Explico decisões arquiteturais tomadas
- [ ] 🔗 **Links relevantes**: Stories, designs, docs relacionadas
- [ ] 🧪 **Test evidence**: Screenshots/videos de testes manuais

#### 🎯 Áreas de Foco
- [ ] 🏗️ **Architecture decisions**: Solicito feedback sobre estrutura
- [ ] 🔒 **Security concerns**: Peço review de aspectos de segurança
- [ ] ⚡ **Performance impacts**: Questiono sobre otimizações
- [ ] 🎨 **Code style**: Solicito feedback sobre padrões

### 💬 Dando Feedback (Para Wagner/Cleide)

#### 🎯 Feedback Principles
- [ ] 💖 **Kindness first**: Feedback construtivo e respeitoso
- [ ] 🎯 **Specific**: Aponto linhas específicas, não generalizo
- [ ] 💡 **Suggest solutions**: Ofereço alternativas, não apenas críticas
- [ ] 📚 **Learning opportunity**: Explico o porquê das sugestões

#### 📝 Comment Categories
- [ ] 🔴 **Must fix**: Bugs, security issues, breaking changes
- [ ] 🟡 **Should consider**: Performance, maintainability improvements
- [ ] 🟢 **Nice to have**: Code style, minor optimizations
- [ ] 💬 **Question**: Entendo a abordagem, peço clarificação
- [ ] 👏 **Praise**: Reconheço código bem escrito

### 📥 Recebendo Feedback

#### 🧠 Mindset
- [ ] 🙏 **Gratidão**: Agradeço tempo investido pelo reviewer
- [ ] 🤔 **Open mind**: Considero genuinamente as sugestões
- [ ] 💬 **Clarification**: Pergunto quando não entendo sugestão
- [ ] 🔄 **Follow through**: Implemento feedback acordado

#### ⚡ Response Actions
- [ ] ✅ **Address feedback**: Implemento ou respondo cada comment
- [ ] 📝 **Explain decisions**: Justifico quando não sigo sugestão
- [ ] 🔄 **Re-request review**: Solicito novo review após changes
- [ ] 📚 **Document learnings**: Anoto learnings para futuras implementações

---

## 🏃‍♂️ Review Input para Bob (Scrum Master)

### 📋 Technical Feasibility Review

#### ⏰ Estimation Accuracy
- [ ] 📊 **Breakdown realista**: Tasks realmente fazíveis nos tempos estimados
- [ ] 🔍 **Complexidade hidden**: Identifico complexidades não óbvias
- [ ] 🔗 **Dependencies**: Aponto dependências técnicas não consideradas
- [ ] 🚨 **Technical debt**: Identifico impact de debt existente

#### 🏗️ Architecture Implications
- [ ] 🔄 **Refactoring needs**: Aponto onde refactoring pode ser necessário
- [ ] 📦 **New dependencies**: Reviso necessidade de libs/tools novas
- [ ] 🔒 **Security requirements**: Identifico needs de security review
- [ ] ⚡ **Performance impact**: Avalio impacto em performance

### 🎯 Implementation Strategy
- [ ] 📝 **Approach suggestions**: Sugiro diferentes abordagens técnicas
- [ ] 🧪 **Testing strategy**: Recomendo tipos de testes necessários
- [ ] 🚀 **Deployment considerations**: Identifico needs especiais de deploy
- [ ] 🔄 **Rollback plans**: Sugiro estratégias de rollback

---

## ✅ Review para Quinn (Quality Gates)

### 🎯 Pre-Quality Gates Self Check

#### 📋 Completeness Check
- [ ] ✅ **All tasks completed**: Todas tasks da história implementadas
- [ ] 🎯 **Acceptance criteria**: Todos critérios atendidos
- [ ] 🧪 **Test coverage**: Cobertura adequada de testes
- [ ] 📝 **Documentation**: Docs atualizadas conforme necessário

#### 🏗️ Technical Quality
- [ ] 🔧 **Build success**: Build passa sem warnings
- [ ] 🎨 **Linting clean**: ESLint e Prettier sem issues
- [ ] 📊 **Type safety**: TypeScript sem erros
- [ ] ⚡ **Performance**: Sem degradação identificada

#### 🔒 Security & Compliance
- [ ] 🛡️ **Security scan**: Dependências sem vulnerabilidades
- [ ] 🔐 **Secrets safe**: Nenhum secret exposto
- [ ] 📊 **GDPR/LGPD**: Compliance requirements atendidos
- [ ] 🔍 **Audit trail**: Logs adequados para auditoria

### 📝 Handoff Documentation for Quinn

#### 🎯 Implementation Summary
- [ ] 📋 **What was built**: Resumo claro das funcionalidades
- [ ] 🏗️ **How it works**: Explicação da arquitetura implementada
- [ ] 🧪 **Test strategy**: Cobertura de testes implementada
- [ ] 🔍 **Review evidence**: Self-review checklist completo

#### 🚨 Risk Assessment
- [ ] ⚠️ **Known limitations**: Limitações conscientes documentadas
- [ ] 🔍 **Areas needing attention**: Pontos que podem precisar review extra
- [ ] 📊 **Performance considerations**: Impactos de performance documentados
- [ ] 🔒 **Security considerations**: Aspectos de segurança para Quinn revisar

---

## 📊 Code Review Metrics (James)

### 🎯 Personal KPIs

#### 📈 Review Quality
- [ ] 🔍 **Self-review effectiveness**: % de issues encontrados antes do peer review
- [ ] ⏰ **Review turnaround**: Tempo para review de PRs dos colegas
- [ ] 💬 **Feedback quality**: Feedback construtivo e específico
- [ ] 🔄 **Learning application**: Aplico feedback recebido em futuras implementações

#### 🤝 Collaboration Metrics
- [ ] 👥 **Review participation**: Participo ativamente de reviews
- [ ] 📚 **Knowledge sharing**: Compartilho conhecimento via reviews
- [ ] 🎯 **Mentoring**: Ajudo junior developers via review comments
- [ ] 💖 **Team culture**: Contribuo para cultura de review positiva

---

## 🔄 Continuous Improvement

### 📚 Learning from Reviews

#### 🧠 Pattern Recognition
- [ ] 📊 **Common issues**: Identifico padrões nos meus code issues
- [ ] 🔄 **Process improvements**: Melhoro meu processo baseado em feedback
- [ ] 📚 **Skill gaps**: Identifico áreas para estudo e melhoria
- [ ] 🎯 **Best practices**: Atualizo meus standards baseado em learnings

#### 📝 Documentation & Knowledge
- [ ] 📖 **Personal standards**: Documento padrões pessoais de qualidade
- [ ] 💡 **Tips & tricks**: Compartilho descobertas com o time
- [ ] 🔧 **Tool improvements**: Sugiro ferramentas que facilitam reviews
- [ ] 📊 **Metrics tracking**: Monitoro métricas de qualidade pessoais

### 🎯 Review Process Optimization

#### ⚡ Efficiency Improvements
- [ ] 🤖 **Automation**: Uso ferramentas para automatizar checks básicos
- [ ] 📋 **Checklists**: Mantenho checklists atualizados
- [ ] 🔧 **IDE setup**: Configuro IDE para detectar issues cedo
- [ ] 📊 **Metrics**: Uso métricas para guiar melhorias

---

## 🚨 Red Flags During Reviews

### ⚠️ Immediate Escalation Triggers

#### 🔒 Security Concerns
- [ ] ❌ **Credentials exposed**: Qualquer secret hardcoded
- [ ] ❌ **SQL injection**: Queries vulneráveis identificadas
- [ ] ❌ **XSS vulnerabilities**: Input não sanitizado
- [ ] ❌ **Authentication bypass**: Flaws de autenticação

#### 🏗️ Architecture Violations
- [ ] ❌ **Breaking changes**: Mudanças que quebram backward compatibility
- [ ] ❌ **Performance degradation**: Implementação que degrada performance
- [ ] ❌ **Dependency hell**: Adição de dependências problemáticas
- [ ] ❌ **Anti-patterns**: Violações claras de design patterns

### 🛑 When to Reject PR
- [ ] ❌ **Tests failing**: PR com tests quebrados
- [ ] ❌ **Build broken**: Código não compila
- [ ] ❌ **Security issues**: Vulnerabilidades identificadas
- [ ] ❌ **No tests**: Funcionalidade sem testes adequados
- [ ] ❌ **Acceptance criteria**: Critérios não atendidos

---

## 💎 Review Philosophy & Culture

### 🎯 PRISMA Review Values

#### 💖 Human-Centered
- [ ] 🤝 **Respectful communication**: Feedback sempre construtivo
- [ ] 📚 **Learning opportunity**: Reviews são momentos de aprendizado
- [ ] 🎯 **Shared ownership**: Código é responsabilidade de todos
- [ ] 💡 **Innovation encouraged**: Novas ideias são bem-vindas

#### 🔄 Continuous Improvement
- [ ] 📈 **Quality focus**: Sempre buscando elevar qualidade
- [ ] 🎯 **User impact**: Consideramos impacto nos usuários finais
- [ ] 🔧 **Process evolution**: Adaptamos processo conforme aprendemos
- [ ] 📊 **Data-driven**: Decisões baseadas em evidências

### 🌟 Excellence Standards

#### 🏆 Code Excellence
> **"Code is read much more often than it is written"**
- [ ] 📖 **Readable**: Código auto-documentado
- [ ] 🧹 **Clean**: Sem code smells
- [ ] 🎯 **Intentional**: Cada linha tem propósito claro
- [ ] 🔄 **Maintainable**: Fácil de modificar e estender

#### 🤝 Collaboration Excellence
> **"Great code comes from great teamwork"**
- [ ] 💬 **Open communication**: Discussões abertas e honestas
- [ ] 🎓 **Continuous learning**: Sempre dispostos a aprender
- [ ] 🙏 **Humility**: Reconhecemos que sempre podemos melhorar
- [ ] 💪 **Shared success**: Sucesso é coletivo, não individual

---

## 📋 Quick Reference Commands

### ⚡ Review Commands for James
```bash
# Self-review commands
*code-review-proprio        # Auto-review completo
*check-quality             # Verificação de qualidade
*prepare-handoff           # Preparação para Quinn

# Collaboration commands
*review-request [Wagner|Cleide]  # Solicitar peer review
*provide-feedback [PR-ID]        # Dar feedback estruturado
*incorporate-feedback            # Aplicar feedback recebido
```

### 📊 Quality Metrics Commands
```bash
*review-metrics            # Métricas pessoais de review
*team-review-status        # Status de reviews em andamento
*quality-trends            # Tendências de qualidade do time
```

---

## 🎯 Remember: James Review Principles

### 💎 Core Values
1. **Quality First**: Code review é sobre elevar qualidade
2. **Learning Together**: Oportunidade de crescer em equipe
3. **User Focus**: Código deve servir aos usuários
4. **Continuous Improvement**: Sempre buscando melhorar

### 🔄 PRISMA Integration
```
Self Review → Peer Review → Quinn Quality Gates → Continuous Learning
     ↑                                              ↓
Wagner/Cleide Collaboration ←→ Bob Technical Input
```

### ⚡ Success Mantra
> **"Great code reviews create great code, great developers, and great teams"**

---

*James - Code reviewer que eleva qualidade através da colaboração*
*"Review é sobre construir juntos, não encontrar falhas"*