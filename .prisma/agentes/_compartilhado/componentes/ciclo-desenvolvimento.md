# 🔄 Ciclo de Desenvolvimento PRISMA
## Core Development Cycle com Continuous Activation

## 📌 Visão Geral

O Ciclo de Desenvolvimento PRISMA é o coração do sistema, orquestrando os 5 subagents especializados em um fluxo contínuo que elimina perda de contexto e garante qualidade integrada. Diferente de abordagens tradicionais, onde fases são estanques, o PRISMA opera com **handoffs automáticos inteligentes** e **quality gates nativos**.

### 🎯 Princípios Fundamentais

```yaml
principios_core:
  continuous_activation:
    - "Subagents nunca finalizam contexto"
    - "Sempre disponíveis para handoffs"
    - "Memória persistente via documentação"

  intelligent_handoffs:
    - "Alan coordena transições automaticamente"
    - "Contexto preservado 100% entre especialistas"
    - "Decisões baseadas em estado atual + histórico"

  quality_integrated:
    - "Quality gates em cada transição"
    - "Risk assessment contínuo"
    - "NFRs validados sistematicamente"

  documentation_as_code:
    - "Cada decisão vira documentação"
    - "Rastreabilidade automática"
    - "Single source of truth mantido"
```

---

## 🎭 **Fase 1: Análise e Delegação (Alan)**

### 🎬 **Alan - Ponto de Entrada Universal**

Toda interação com PRISMA começa com Alan, que atua como **inteligência de delegação**:

#### **Ativação do Sistema**
```bash
*iniciar
```

**O que acontece internamente:**
1. **Context Discovery**: Alan escaneia projeto atual
2. **Technology Detection**: Identifica frameworks, linguagens, padrões
3. **State Assessment**: Avalia estado atual do desenvolvimento
4. **Dashboard Generation**: Cria visão consolidada
5. **Recommendation Engine**: Ativa sugestões proativas

```yaml
analise_contexto:
  discovery_automatico:
    - package.json: "detecta dependências e scripts"
    - tsconfig.json: "configurações TypeScript"
    - estrutura_pastas: "arquitetura identificada"
    - .env.example: "configurações necessárias"
    - README.md: "documentação existente"

  deteccao_patterns:
    - naming_conventions: "camelCase, kebab-case, etc"
    - component_structure: "como componentes são organizados"
    - import_patterns: "absolute vs relative imports"
    - testing_approach: "Jest, Vitest, Playwright"

  estado_projeto:
    - fase_desenvolvimento: "nascente, em_progresso, manutenção"
    - debt_tecnico: "identificado automaticamente"
    - coverage_atual: "se testes existem"
    - deployment_setup: "CI/CD configurado"
```

#### **Delegação Inteligente**
```bash
*fazer "implementar sistema de autenticação OAuth"
```

**Alan analisa e decide:**
```yaml
analise_delegacao:
  tarefa_recebida: "implementar sistema de autenticação OAuth"

  contexto_considerado:
    - projeto_detectado: "Next.js 14 + TypeScript"
    - auth_existente: "NextAuth.js já configurado"
    - database: "PostgreSQL via Prisma"
    - ui_framework: "Tailwind + Shadcn/UI"

  decisao_delegacao:
    primeira_fase: "Bob (Scrum Master)"
    justificativa: "Necessita história estruturada com contexto técnico"
    proximas_fases: ["Sarah (validação)", "James (implementação)", "Quinn (quality)"]

  handoff_automatico:
    agente_destino: "bob-scrum-master"
    contexto_transferido: "análise completa + detecção tecnológica"
    memoria_preservada: "estado atual + histórico de decisões"
```

---

## 📋 **Fase 2: Story Creation & PRP Engine (Bob)**

### 🎯 **Bob - Especialista em Histórias Executáveis**

Bob recebe o handoff do Alan e ativa o **PRP Engine** (Product Requirements Prompts):

#### **PRP Engine - Product Requirements Prompts**
O PRP Engine é a inovação central do Bob: criar histórias que são **diretamente executáveis** pelo James.

```markdown
# PRP-HISTÓRIA: AUTH.002 - OAuth Integration

## Contexto Descoberto (Auto-detection por Alan)
- Framework: Next.js 14
- Auth Framework: NextAuth.js v4 (detectado em package.json)
- Database: PostgreSQL via Prisma ORM
- UI Framework: Tailwind CSS + Shadcn/UI
- Deploy: Vercel (detectado em vercel.json)

## Persona & Valor
**Como** desenvolvedor da aplicação,
**Eu quero** integrar OAuth com Google e GitHub,
**Para que** usuários possam fazer login social seguro

## Requisitos Funcionais (PRP Format)
1. [RF001] - Configurar providers OAuth (Google + GitHub)
2. [RF002] - Implementar callback handlers seguros
3. [RF003] - Persistir sessões no PostgreSQL
4. [RF004] - UI components com Shadcn/UI patterns

## Critérios de Aceitação (Executable)
- [ ] **DADO** que usuário clica em "Login com Google"
- [ ] **QUANDO** redirect para OAuth flow acontece
- [ ] **ENTÃO** retorna com token válido e cria sessão

## Tasks Sequenciais (Para James)
1. [ ] **Task 1**: Configurar Google OAuth app + credentials
2. [ ] **Task 2**: Configurar GitHub OAuth app + credentials
3. [ ] **Task 3**: Atualizar NextAuth config com providers
4. [ ] **Task 4**: Criar UI components para login social
5. [ ] **Task 5**: Testar flows completos

## Prompt de Execução (Para James)
"Como James (Developer), implemente integração OAuth completa seguindo:
- NextAuth.js v4 patterns do projeto atual
- Shadcn/UI components para botões de login
- PostgreSQL session persistence via Prisma
- Environment variables seguindo .env.example
- Error handling robusto para failed auth"

## Validação Automática (Para Quinn)
- Riscos: comando *risk para OAuth security
- Testes: comando *design para auth flows
- Qualidade: comando *review para implementação final
```

#### **Context Discovery Automático**
```yaml
bob_intelligence:
  analise_codebase:
    - le_package_json: "detecta NextAuth.js instalado"
    - examina_env_example: "vê GOOGLE_CLIENT_ID placeholder"
    - verifica_prisma_schema: "encontra User model já configurado"
    - analisa_componentes: "identifica pattern Shadcn/UI"

  adaptacao_automatica:
    - usa_patterns_existentes: "mantém consistência"
    - aproveita_configuracoes: "não duplica setup"
    - segue_convenções: "nomenclatura e estrutura"
    - integra_com_existente: "não quebra nada"
```

#### **Handoff para Sarah (Validação PO)**
```yaml
bob_to_sarah_handoff:
  trigger: "história PRP completa"
  contexto_transferido:
    - historia_estruturada: "AUTH.002 completa"
    - contexto_tecnico: "detectado e documentado"
    - criteria_aceitacao: "testáveis e mensuráveis"
    - business_context: "valor para usuários"

  sarah_recebe:
    - foco_validacao: "valor de negócio + viabilidade"
    - criterios_claros: "para aprovação/refinamento"
    - contexto_preservado: "sem perda de informação"
```

---

## ✅ **Fase 3: Business Validation (Sarah)**

### 💼 **Sarah - Product Owner Specialist**

Sarah recebe a história do Bob e aplica **validação de valor de negócio**:

#### **Business Value Assessment**
```yaml
sarah_validation_process:
  analise_valor:
    impacto_usuario:
      - facilita_onboarding: "login social é mais rápido"
      - reduz_fricao: "sem necessidade criar senha"
      - aumenta_conversao: "menor abandono no signup"

    impacto_negocio:
      - dados_ricos: "perfis completos via OAuth"
      - reducao_suporte: "menos problemas de senha"
      - compliance: "delega autenticação para providers"

    riscos_negocio:
      - dependencia_externa: "Google/GitHub podem ter issues"
      - privacy_concerns: "usuários podem rejeitar"
      - vendor_lock: "dependência dos providers"

  criterios_aprovacao:
    - valor_claro: ✅ "login social é bem aceito"
    - risco_aceitavel: ✅ "providers são confiáveis"
    - esforco_justificado: ✅ "implementação padrão"
    - alinhamento_roadmap: ✅ "parte da estratégia auth"
```

#### **Requirements Refinement**
Sarah pode refinar critérios baseado em expertise de negócio:

```markdown
## Refinamentos Sarah (Business-focused)

### Critérios Adicionais
- [ ] **Analytics**: Rastrear qual provider é mais usado
- [ ] **Fallback**: Manter opção de email/senha
- [ ] **Terms**: Usuário deve aceitar termos no primeiro login
- [ ] **Profile**: Importar avatar e nome automaticamente

### Business Rules
- Primeiro login via OAuth = fluxo de onboarding completo
- Dados do profile OAuth são read-only no sistema
- Usuário pode desvincular OAuth e usar email/senha

### Success Metrics
- Taxa de signup via OAuth > 60%
- Tempo médio de onboarding < 2 minutos
- Abandono no login < 5%
```

#### **Decisão de Aprovação**
```yaml
sarah_decision:
  status: "APPROVED"
  justificativa: "Alto valor, baixo risco, esforço justificado"

  handoff_to_james:
    trigger: "aprovação automática"
    context_enriched:
      - business_rules: "adicionadas por Sarah"
      - success_metrics: "definidas para tracking"
      - refinements: "critérios aprimorados"

  skip_conditions:
    - historia_simples: "sem impacto significativo de negócio"
    - contexto_claro: "sem ambiguidades nos requisitos"
    - baixo_risco: "implementação padrão"
```

---

## 💻 **Fase 4: Sequential Implementation (James)**

### ⚡ **James - Developer Specialist**

James recebe a história aprovada e implementa **sequencialmente, uma task por vez**:

#### **Sequential Task Execution**
```yaml
james_philosophy:
  uma_tarefa_por_vez:
    - foco_total: "deep work em cada task"
    - qualidade_desde_inicio: "código limpo sempre"
    - context_preservation: "não perde foco mudando tasks"

  implementation_approach:
    - segue_patterns_projeto: "mantém consistência"
    - usa_contexto_detectado: "aproveita setup existente"
    - qualidade_pre_integration: "código pronto para produção"
```

#### **Task 1: Configurar Google OAuth App**
```bash
# James executa:
*executar-tarefa "configurar Google OAuth app + credentials"
```

**James implementa:**
```typescript
// 1. Cria Google OAuth app no console
// 2. Adiciona environment variables
// 3. Documenta processo

// .env.local (adicionado)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

// docs/setup/oauth-setup.md (criado)
# OAuth Setup Instructions
## Google OAuth Configuration
1. Acesse Google Cloud Console
2. Crie novo projeto ou use existente
3. Ative Google+ API
4. Configure OAuth consent screen
5. Crie credenciais OAuth 2.0
6. Adicione redirect URI: http://localhost:3000/api/auth/callback/google
```

#### **Task 2: Atualizar NextAuth Config**
```typescript
// pages/api/auth/[...nextauth].ts (editado)
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'database',
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      return session
    },
  },
})
```

#### **Task 3: UI Components (Shadcn/UI Pattern)**
```typescript
// components/auth/oauth-buttons.tsx (criado)
'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/icons'

export function OAuthButtons() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="outline"
        onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        disabled={isLoading}
      >
        <Icons.google className="mr-2 h-4 w-4" />
        Google
      </Button>

      <Button
        variant="outline"
        onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
        disabled={isLoading}
      >
        <Icons.gitHub className="mr-2 h-4 w-4" />
        GitHub
      </Button>
    </div>
  )
}
```

#### **Quality Pre-Check (James Internal)**
```yaml
james_quality_check:
  antes_handoff_quinn:
    - code_review_proprio: "lê próprio código criticamente"
    - testa_localmente: "todos os flows funcionando"
    - verifica_patterns: "consistente com codebase"
    - documenta_mudancas: "que arquivos foram alterados"

  criteria_handoff:
    - implementacao_completa: ✅ "todas as tasks executadas"
    - testes_passando: ✅ "npm run test passou"
    - build_funcionando: ✅ "npm run build sucesso"
    - flows_testados: ✅ "login manual testado"
```

#### **Handoff Automático para Quinn**
```yaml
james_to_quinn_handoff:
  trigger: "implementação completa + quality pre-check passed"

  contexto_transferido:
    - codigo_implementado: "arquivos alterados + novos"
    - testes_executados: "resultados dos testes locais"
    - flows_funcionais: "login Google + GitHub testados"
    - documentacao: "setup instructions criadas"

  quinn_recebe:
    - foco_quality_gates: "análise de risco + design"
    - codigo_review: "padrões e security"
    - test_strategy: "cobertura e edge cases"
```

---

## 🧪 **Fase 5: Quality Gates & Risk Assessment (Quinn)**

### 🎯 **Quinn - Test Architect & Quality Gatekeeper**

Quinn recebe o handoff do James e executa **quality gates determinísticos**:

#### **Comando *risk - Risk Assessment**
```bash
*risk "AUTH.002 - OAuth Integration"
```

**Quinn Analysis:**
```yaml
risk_assessment:
  historia: "AUTH.002 - OAuth Integration"
  data: "2025-01-23"

  riscos_identificados:
    oauth_security:
      categoria: "segurança"
      probabilidade: 2  # média
      impacto: 3       # alto
      score: 6         # CONCERNS
      descricao: "OAuth flows podem ter vulnerabilidades"

    provider_dependency:
      categoria: "operacional"
      probabilidade: 1  # baixa
      impacto: 2       # médio
      score: 2         # PASS
      descricao: "Dependência de Google/GitHub"

    session_management:
      categoria: "técnico"
      probabilidade: 2  # média
      impacto: 2       # médio
      score: 4         # PASS
      descricao: "Gerenciamento de sessões complexo"

  risk_score_total: 6  # CONCERNS
  decision: "CONCERNS - requer mitigação"
```

#### **Comando *design - Test Strategy Design**
```bash
*design "AUTH.002 - OAuth Integration"
```

**Quinn Test Strategy:**
```yaml
test_strategy:
  historia: "AUTH.002 - OAuth Integration"

  test_categories:
    unit_tests:
      - oauth_config_validation: "configurações válidas"
      - callback_handlers: "handlers processam tokens"
      - session_creation: "sessões criadas corretamente"

    integration_tests:
      - oauth_flow_google: "fluxo completo Google"
      - oauth_flow_github: "fluxo completo GitHub"
      - database_persistence: "sessões salvas no banco"
      - error_handling: "errors tratados gracefully"

    e2e_tests:
      - user_journey_signup: "novo usuário via OAuth"
      - user_journey_login: "usuário existente via OAuth"
      - logout_flow: "logout limpa sessão"

    security_tests:
      - csrf_protection: "CSRF tokens válidos"
      - session_security: "sessões não expostas"
      - redirect_validation: "redirects seguros apenas"

  coverage_target: "90%"
  critical_paths: ["oauth_flows", "session_management"]
```

#### **Comando *trace - Requirements Traceability**
```bash
*trace "AUTH.002 - OAuth Integration"
```

**Quinn Traceability:**
```yaml
requirements_traceability:
  historia: "AUTH.002 - OAuth Integration"

  mapping:
    RF001_oauth_providers:
      requirement: "Configurar providers OAuth (Google + GitHub)"
      implementation: "pages/api/auth/[...nextauth].ts"
      tests:
        - "unit: oauth_config_validation"
        - "e2e: user_journey_signup"

    RF002_callback_handlers:
      requirement: "Implementar callback handlers seguros"
      implementation: "NextAuth.js built-in callbacks"
      tests:
        - "integration: oauth_flow_google"
        - "security: csrf_protection"

    RF003_session_persistence:
      requirement: "Persistir sessões no PostgreSQL"
      implementation: "PrismaAdapter configuration"
      tests:
        - "integration: database_persistence"
        - "unit: session_creation"

    RF004_ui_components:
      requirement: "UI components com Shadcn/UI patterns"
      implementation: "components/auth/oauth-buttons.tsx"
      tests:
        - "e2e: user_journey_login"
        - "unit: component_rendering"

  coverage: "100% - todos requisitos cobertos"
  gaps: "nenhum gap identificado"
```

#### **Comando *nfr - Non-Functional Requirements**
```bash
*nfr "AUTH.002 - OAuth Integration"
```

**Quinn NFR Validation:**
```yaml
nfr_validation:
  historia: "AUTH.002 - OAuth Integration"

  performance:
    oauth_flow_time:
      requirement: "< 5s para login completo"
      measurement: "tempo redirect + callback + session"
      target: "4.2s average"
      status: "PASS"

    session_load_time:
      requirement: "< 200ms para verificar sessão"
      measurement: "database query + validation"
      target: "120ms average"
      status: "PASS"

  security:
    data_encryption:
      requirement: "tokens OAuth nunca expostos"
      implementation: "environment variables + HTTPS"
      status: "PASS"

    session_security:
      requirement: "sessões expiram automaticamente"
      implementation: "NextAuth.js default expiration"
      status: "PASS"

  usability:
    error_messages:
      requirement: "erros OAuth têm mensagens claras"
      implementation: "error handling + user feedback"
      status: "PASS"

    mobile_responsive:
      requirement: "botões OAuth funcionam em mobile"
      implementation: "Tailwind responsive classes"
      status: "PASS"

  reliability:
    provider_fallback:
      requirement: "falha de um provider não quebra sistema"
      implementation: "try/catch + graceful degradation"
      status: "PASS"
```

#### **Comando *review - Code Quality Review**
```bash
*review "AUTH.002 - OAuth Integration"
```

**Quinn Code Review:**
```yaml
code_review:
  historia: "AUTH.002 - OAuth Integration"

  quality_metrics:
    code_complexity:
      metric: "Cyclomatic complexity"
      threshold: "< 10 per function"
      actual: "6.2 average"
      status: "PASS"

    test_coverage:
      metric: "Line coverage"
      threshold: "> 80%"
      actual: "87%"
      status: "PASS"

    code_duplication:
      metric: "Duplicated code"
      threshold: "< 5%"
      actual: "2.1%"
      status: "PASS"

  security_review:
    secrets_exposure:
      check: "secrets em código ou logs"
      finding: "nenhum secret hardcoded"
      status: "PASS"

    input_validation:
      check: "validação de inputs OAuth"
      finding: "NextAuth.js valida automaticamente"
      status: "PASS"

    error_information:
      check: "errors não expõem informação sensível"
      finding: "error messages são genéricos"
      status: "PASS"

  architecture_review:
    pattern_consistency:
      check: "segue patterns do projeto"
      finding: "Shadcn/UI patterns seguidos"
      status: "PASS"

    separation_concerns:
      check: "responsabilidades bem separadas"
      finding: "auth logic isolado"
      status: "PASS"
```

#### **Comando *gate - Quality Gate Decision**
```bash
*gate "AUTH.002 - OAuth Integration"
```

**Quinn Gate Decision:**
```yaml
quality_gate_decision:
  historia: "AUTH.002 - OAuth Integration"
  data: "2025-01-23"

  inputs_considerados:
    - risk_assessment: "score 6 - CONCERNS"
    - test_strategy: "90% coverage planned"
    - requirements_traceability: "100% coberto"
    - nfr_validation: "todos NFRs PASS"
    - code_review: "todas métricas PASS"

  gate_criteria_evaluation:
    riscos_criticos: false      # score 6 < 9
    testes_passando: true       # todos passaram
    cobertura_adequada: true    # 87% > 80%
    nfrs_atendidos: true        # todos PASS
    code_quality: true          # métricas OK

  decision: "PASS com CONCERNS"

  justificativa: |
    Implementação atende todos os critérios de qualidade.
    Risk score 6 indica concerns de segurança que foram
    adequadamente mitigados na implementação.

  acoes_pos_gate:
    - documentar_security_considerations
    - monitorar_oauth_flows_producao
    - setup_alertas_falhas_auth

  release_approval: "APPROVED"

  handoff_to_alan:
    status: "história completa e aprovada"
    ready_for: "próxima história ou deployment"
```

---

## 🎬 **Fase 6: Coordenação de Próximo Ciclo (Alan)**

### ♻️ **Alan - Continuous Coordination**

Alan recebe o quality gate PASS do Quinn e **coordena próximo ciclo**:

#### **Cycle Completion Analysis**
```yaml
alan_cycle_analysis:
  historia_completada: "AUTH.002 - OAuth Integration"
  gate_result: "PASS com CONCERNS"

  metricas_ciclo:
    tempo_total: "4.2 horas"
    handoffs_realizados: 4
    context_loss: 0%
    rework_necessario: 0

  aprendizados:
    - oauth_flows_bem_conhecidos: "patterns aprendidos"
    - shadcn_ui_integration: "componentes reutilizáveis"
    - nexauth_setup: "configuração otimizada"

  proximos_passos:
    - considerar_2fa: "enhancement futuro"
    - monitorar_metricas: "usage analytics"
    - documentar_troubleshooting: "para suporte"
```

#### **Next Cycle Coordination**
```yaml
alan_next_coordination:
  backlog_analysis:
    - historias_pendentes: "AUTH.003 - Two-Factor Auth"
    - dependencias: "AUTH.002 deve estar deployed"
    - prioridade: "alta - security enhancement"

  resource_availability:
    - bob: "disponível para nova história"
    - sarah: "disponível para validação"
    - james: "disponível para implementação"
    - quinn: "disponível para quality gates"
    - winston: "disponível se necessário ADR"

  delegation_decision:
    proxima_tarefa: "iniciar AUTH.003"
    agente_inicial: "Bob (historia creation)"
    trigger: "*criar-historia 'Two-Factor Authentication'"
```

---

## 🔄 **Handoffs Automáticos: A Magia do PRISMA**

### 🎯 **Anatomia de um Handoff Perfeito**

```yaml
handoff_anatomy:
  trigger_conditions:
    - fase_anterior_completa: "output válido produzido"
    - quality_criteria_met: "critérios mínimos atendidos"
    - context_prepared: "contexto estruturado para próximo"

  context_transfer:
    preserved_elements:
      - historical_decisions: "todas decisões anteriores"
      - technical_context: "tecnologias e padrões"
      - business_context: "valor e objetivos"
      - quality_context: "riscos e mitigation"

    enriched_elements:
      - specialist_insights: "expertise do agente atual"
      - refined_requirements: "requisitos aprimorados"
      - identified_risks: "riscos descobertos"
      - implementation_notes: "notas técnicas"

  seamless_transition:
    - zero_context_loss: "100% informação preservada"
    - intelligent_prioritization: "próximo agente sabe foco"
    - automatic_activation: "sem intervenção manual"
    - continuous_memory: "documentação como estado"
```

### 🧠 **Inteligência dos Handoffs**

#### **Bob → Sarah Handoff**
```yaml
bob_to_sarah:
  quando: "história PRP estruturada completa"

  contexto_transferido:
    - historia_executavel: "pronta para implementação"
    - contexto_tecnico: "descoberto automaticamente"
    - assumptions_made: "suposições que precisam validação"

  sarah_focuses_on:
    - business_value_validation: "valor real para usuários"
    - stakeholder_alignment: "alinhamento com objetivos"
    - requirement_refinement: "critérios mais precisos"
```

#### **Sarah → James Handoff**
```yaml
sarah_to_james:
  quando: "validação de negócio aprovada"

  contexto_transferido:
    - business_approved_story: "história validada"
    - refined_criteria: "critérios aprimorados"
    - success_metrics: "métricas de sucesso"

  james_focuses_on:
    - sequential_implementation: "uma task por vez"
    - quality_from_start: "código limpo sempre"
    - pattern_consistency: "seguir padrões projeto"
```

#### **James → Quinn Handoff**
```yaml
james_to_quinn:
  quando: "implementação completa + pre-check"

  contexto_transferido:
    - implemented_code: "código funcionando"
    - local_testing_results: "testes executados"
    - implementation_decisions: "decisões técnicas tomadas"

  quinn_focuses_on:
    - risk_assessment: "análise de riscos"
    - quality_gates: "decisão determinística"
    - comprehensive_testing: "cobertura completa"
```

#### **Quinn → Alan Handoff**
```yaml
quinn_to_alan:
  quando: "quality gate decision tomada"

  contexto_transferido:
    - gate_result: "PASS/CONCERNS/FAIL/WAIVED"
    - quality_evidence: "evidências de qualidade"
    - identified_improvements: "melhorias futuras"

  alan_focuses_on:
    - cycle_completion: "fechamento do ciclo"
    - next_coordination: "próximos passos"
    - learning_integration: "aprendizados para sistema"
```

---

## 📊 **Métricas e Observabilidade do Ciclo**

### 🎯 **KPIs Operacionais**

```yaml
cycle_metrics:
  performance:
    cycle_time:
      target: "< 6 horas para história média"
      measurement: "início análise → gate decision"
      current: "4.2 horas average"

    handoff_efficiency:
      target: "< 5 minutos entre handoffs"
      measurement: "tempo entre fases"
      current: "2.3 minutos average"

    context_preservation:
      target: "100% context preserved"
      measurement: "informação perdida em handoffs"
      current: "99.7% preserved"

  quality:
    first_time_pass:
      target: "> 80% histórias PASS primeira vez"
      measurement: "gate decisions"
      current: "87% first time PASS"

    rework_rate:
      target: "< 15% histórias precisam rework"
      measurement: "FAIL → correção → PASS"
      current: "8% rework rate"

    bug_leakage:
      target: "< 1 bug por história em produção"
      measurement: "bugs reportados pós-deploy"
      current: "0.3 bugs per story"
```

### 📈 **Continuous Improvement**

```yaml
learning_loop:
  pattern_recognition:
    - successful_handoffs: "o que funcionou bem"
    - failed_handoffs: "onde houve perda de contexto"
    - optimization_opportunities: "melhorias identificadas"

  system_evolution:
    - template_refinement: "templates de história melhorados"
    - handoff_optimization: "transições mais eficientes"
    - quality_criteria_tuning: "gates mais precisos"

  feedback_integration:
    - user_satisfaction: "feedback dos desenvolvedores"
    - stakeholder_feedback: "feedback de negócio"
    - system_performance: "métricas automáticas"
```

---

## 🎯 **Troubleshooting Common Issues**

### ⚠️ **Handoff Failures**

```yaml
handoff_troubleshooting:
  context_loss:
    sintomas: "próximo agente não entende contexto"
    causas: "documentação incompleta, assumptions não explícitas"
    solucao: "alan re-analisa e reconstrói contexto"

  quality_gate_fail:
    sintomas: "quinn decide FAIL repetidamente"
    causas: "implementação inadequada, riscos altos"
    solucao: "james refatora com foco nos critérios específicos"

  business_rejection:
    sintomas: "sarah rejeita história válida"
    causas: "valor não claro, alinhamento perdido"
    solucao: "bob refina com mais contexto de negócio"
```

### 🔧 **Recovery Mechanisms**

```yaml
recovery_strategies:
  context_reconstruction:
    - alan_reanalysis: "análise completa do estado atual"
    - documentation_review: "revisão de documentação existente"
    - stakeholder_input: "input adicional quando necessário"

  quality_improvement:
    - iterative_refinement: "refinamento incremental"
    - expert_consultation: "winston para decisões arquiteturais"
    - additional_testing: "testes extras quando necessário"

  process_optimization:
    - handoff_criteria_tuning: "ajuste dos critérios"
    - documentation_enhancement: "melhoria da documentação"
    - tool_integration: "ferramentas para suporte"
```

---

## 🚀 **Evolução do Ciclo**

### 🔮 **Roadmap de Melhorias**

```yaml
cycle_evolution:
  fase_atual:
    - handoffs_manuais_supervisionados: "alan coordena"
    - quality_gates_determinísticos: "critérios claros"
    - context_preservation_manual: "via documentação"

  proximas_evolucoes:
    - handoffs_completamente_automaticos: "sem intervenção"
    - ml_powered_risk_assessment: "quinn usa ML"
    - predictive_quality_gates: "predição de problemas"
    - adaptive_cycle_optimization: "auto-otimização"

  visao_futura:
    - self_healing_cycles: "auto-correção de problemas"
    - continuous_learning: "melhoria constante"
    - zero_human_intervention: "completamente autônomo"
```

---

*Ciclo de Desenvolvimento PRISMA v3.0.0*
*Continuous Activation + Intelligent Handoffs + Quality Gates*
*"Onde 5 especialistas trabalham como uma mente única"*