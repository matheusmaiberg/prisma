# 💡 Recomendações ao Usuário - Framework PRISMA

## 📌 Sobre Este Documento

Este documento contém recomendações contextuais para diferentes situações de uso do framework PRISMA. Use-o como referência para otimizar sua experiência com os agentes especializados.

---

## 🎯 **Contextos de Recomendações**

### 🚀 **Iniciando um Novo Projeto**

#### **Preparação Inicial**
```yaml
contexto: "primeiro uso do PRISMA em projeto novo"

recomendacoes:
  estrutura_base:
    - criar_docs_folder: "mkdir docs para histórias e documentação"
    - configurar_git: "git init e .gitignore adequado"
    - package_json: "configurar scripts básicos (build, test, lint)"

  configuracao_ambiente:
    - env_example: "criar .env.example com variáveis necessárias"
    - readme_projeto: "README básico explicando setup"
    - editor_config: ".editorconfig para consistência"

  primeiro_contato:
    comandos_iniciais:
      - "*analisar-projeto" # Alan faz assessment completo
      - "*detectar-contexto" # Bob identifica tecnologias
      - "*configurar-metricas" # Quinn define quality gates
```

#### **Ordem Recomendada de Ativação**
1. **Alan** → Análise geral e definição de escopo
2. **Bob** → Detecção de contexto técnico
3. **Winston** → Definições arquiteturais se necessário
4. **Sarah** → Validação de valor e priorização
5. **James** → Implementação sequencial
6. **Quinn** → Quality gates e validação final

---

### 📋 **Planejamento de Features**

#### **Para Features Simples (< 4 horas)**
```yaml
contexto: "feature pequena com escopo claro"

recomendacoes:
  fluxo_rapido:
    - usar_bob_direto: "Bob → Sarah → James → Quinn"
    - pular_winston: "só se não houver decisões arquiteturais"
    - james_sequencial: "máximo 3-4 tasks"

  comandos_eficientes:
    - "*criar-historia [feature]" # Bob
    - "*validar-historia [id]" # Sarah
    - "*implementar-historia [id]" # James
    - "*gate [id]" # Quinn
```

#### **Para Features Complexas (> 4 horas)**
```yaml
contexto: "feature grande ou com impacto arquitetural"

recomendacoes:
  planejamento_completo:
    - incluir_winston: "sempre para ADRs"
    - quebrar_epic: "Bob divide em histórias menores"
    - risk_assessment: "Quinn analisa riscos cedo"

  comandos_estruturados:
    - "*analisar-sistema [componente]" # Winston primeiro
    - "*quebrar-epic [épico]" # Bob
    - "*risk [feature]" # Quinn
    - "*validar-historia [id]" # Sarah para cada história
```

---

### 🐛 **Resolução de Bugs**

#### **Bugs Críticos (Produção)**
```yaml
contexto: "bug afetando usuários em produção"

recomendacoes:
  resposta_rapida:
    prioridade: "máxima"
    fluxo: "Alan → James → Quinn → Deploy"

  comandos_emergencia:
    - "*debug-problema [issue]" # James direto
    - "*hotfix-review" # Quinn rápido
    - pular_sarah: "só se não afetar usuários"

  documentacao_pos:
    - "*criar-adr [decisão]" # Winston para lições aprendidas
    - "*post-mortem" # Alan coordena análise
```

#### **Bugs Não-Críticos**
```yaml
contexto: "bugs que podem seguir fluxo normal"

recomendacoes:
  fluxo_padrao:
    - seguir_ciclo_completo: "todos agentes participam"
    - priorizar_qualidade: "Quinn foca em prevenção"

  analise_root_cause:
    - "*analisar-sistema [componente]" # Winston
    - "*design [solução]" # Quinn
    - "*implementar-historia [fix]" # James
```

---

### ⚡ **Performance e Otimização**

#### **Problemas de Performance**
```yaml
contexto: "aplicação lenta ou com gargalos"

recomendacoes:
  investigacao:
    agentes_chave: ["Winston", "Quinn", "James"]

  comandos_especializados:
    - "*analisar-sistema [performance]" # Winston
    - "*nfr [performance_requirements]" # Quinn
    - "*debug-problema [slowness]" # James

  iteracao_otimizacao:
    - small_improvements: "James faz otimizações incrementais"
    - measure_impact: "Quinn valida melhorias"
    - architectural_changes: "Winston se necessário"
```

---

### 🔒 **Segurança e Compliance**

#### **Implementação de Segurança**
```yaml
contexto: "features relacionadas à autenticação, autorização, dados sensíveis"

recomendacoes:
  obrigatorio_winston:
    - sempre_criar_adr: "decisões de segurança são críticas"
    - security_review: "Quinn foca em testes de segurança"

  comandos_security:
    - "*avaliar-tecnologia [auth_solution]" # Winston
    - "*nfr [security]" # Quinn
    - "*review [security_focus]" # Quinn

  best_practices:
    - never_hardcode_secrets: "James sempre usa env vars"
    - audit_trail: "Sarah define compliance requirements"
```

---

### 🧪 **Qualidade e Testes**

#### **Cobertura de Testes Baixa**
```yaml
contexto: "projeto com < 70% cobertura de testes"

recomendacoes:
  foco_quinn:
    - "*trace [user_journeys]" # mapear fluxos críticos
    - "*design [test_strategy]" # estratégia de testes
    - "*nfr [coverage_requirements]" # definir metas

  implementacao_james:
    - uma_feature_por_vez: "James adiciona testes incrementalmente"
    - unit_tests_primeiro: "depois integration tests"

  validacao_continua:
    - "*gate [cada_PR]" # Quinn valida tudo
    - fail_fast: "bloquear se testes falharem"
```

#### **Refatoração de Código**
```yaml
contexto: "código legacy ou com débito técnico alto"

recomendacoes:
  assessment_inicial:
    - "*debt-assessment" # Winston analisa débito
    - "*analisar-valor [refactor]" # Sarah valida ROI

  estrategia_incremental:
    - small_refactors: "James faz melhorias pequenas"
    - maintain_functionality: "Quinn garante não quebra nada"
    - document_changes: "Winston documenta decisões"
```

---

### 📊 **Monitoramento e Métricas**

#### **Implementação de Analytics**
```yaml
contexto: "adicionar tracking e métricas ao produto"

recomendacoes:
  business_first:
    - sarah_define_metricas: "quais eventos são importantes"
    - privacy_compliance: "Winston define estratégia GDPR"

  implementacao_tecnica:
    - "*implementar-historia [analytics]" # James
    - "*nfr [performance_impact]" # Quinn garante não afeta UX

  validacao_dados:
    - test_events: "Quinn valida eventos corretos"
    - verify_privacy: "Quinn testa compliance"
```

---

### 🔄 **Integração com APIs Externas**

#### **Nova Integração**
```yaml
contexto: "conectar com API/serviço terceiro"

recomendacoes:
  decisoes_arquiteturais:
    - "*avaliar-tecnologia [api_client]" # Winston
    - "*criar-adr [integration_strategy]" # Winston

  risk_management:
    - "*risk [external_dependency]" # Quinn
    - fallback_strategy: "Winston define plano B"

  implementacao_robusta:
    - error_handling: "James implementa retry logic"
    - timeout_management: "James configura timeouts"
    - "*trace [integration_flow]" # Quinn testa fluxos
```

---

### 🚦 **CI/CD e Deploy**

#### **Setup Pipeline**
```yaml
contexto: "configurar integração contínua"

recomendacoes:
  quality_gates_automatizados:
    - "*configurar-pipeline" # Quinn define stages
    - automated_testing: "todos testes executam no CI"
    - security_scanning: "Winston define security checks"

  deployment_strategy:
    - "*criar-adr [deployment]" # Winston
    - blue_green_ou_rolling: "baseado em risk assessment"
    - rollback_plan: "Quinn define critérios de rollback"
```

---

### 🎨 **UI/UX e Frontend**

#### **Componentes de Interface**
```yaml
contexto: "desenvolvimento de interface de usuário"

recomendacoes:
  design_system:
    - consistent_components: "James segue padrões existentes"
    - accessibility: "Quinn testa a11y compliance"

  user_experience:
    - sarah_validacao_ux: "impacto na experiência usuário"
    - loading_states: "James implementa feedback visual"
    - error_states: "James trata cenários de erro"

  performance_frontend:
    - bundle_size: "Winston analisa impacto performance"
    - lazy_loading: "James otimiza carregamento"
```

---

### 📱 **Mobile e Responsividade**

#### **Implementação Responsiva**
```yaml
contexto: "adaptação para dispositivos móveis"

recomendacoes:
  cross_device_testing:
    - "*nfr [mobile_performance]" # Quinn
    - "*trace [mobile_user_journey]" # Quinn

  implementation_approach:
    - mobile_first: "James desenvolve mobile-first"
    - progressive_enhancement: "funcionalidades desktop depois"

  performance_mobile:
    - "*analisar-sistema [mobile_performance]" # Winston
    - optimize_images: "James otimiza assets"
```

---

### 🔧 **Manutenção e Atualizações**

#### **Upgrade de Dependencies**
```yaml
contexto: "atualizar bibliotecas e frameworks"

recomendacoes:
  risk_assessment:
    - "*risk [dependency_update]" # Quinn
    - breaking_changes_analysis: "Winston analisa impacto"

  staged_updates:
    - dev_first: "James testa em desenvolvimento"
    - comprehensive_testing: "Quinn executa test suite completo"
    - gradual_rollout: "deploy incremental"

  rollback_preparation:
    - backup_strategy: "Winston define plano rollback"
    - monitoring_alerts: "Quinn configura alertas"
```

---

## 🎯 **Contextos Especiais**

### 🏢 **Projetos Enterprise**

#### **Compliance e Governança**
```yaml
contexto: "projetos com requirements corporativos rígidos"

recomendacoes:
  documentation_heavy:
    - todos_adrs_obrigatorios: "Winston documenta tudo"
    - audit_trail_completo: "Sarah rastreia decisões business"
    - comprehensive_testing: "Quinn executa todos quality gates"

  change_management:
    - stakeholder_approval: "Sarah valida com múltiplos stakeholders"
    - risk_mitigation: "Quinn foca em risk assessment detalhado"
    - gradual_rollout: "deploy controlado e monitorado"
```

### 🚀 **Startups e MVP**

#### **Velocidade vs Qualidade**
```yaml
contexto: "necessidade de entregar rapidamente mantendo qualidade mínima"

recomendacoes:
  mvp_approach:
    - core_features_only: "Sarah prioriza rigorosamente"
    - technical_debt_aceitavel: "Winston permite algumas shortcuts"
    - essential_testing: "Quinn foca nos fluxos críticos"

  scale_preparation:
    - document_shortcuts: "Winston documenta débito técnico"
    - monitoring_early: "Quinn implementa observability cedo"
    - refactor_roadmap: "Alan planeja melhorias futuras"
```

### 🎓 **Projetos de Aprendizado**

#### **Foco em Educação**
```yaml
contexto: "projetos para aprender tecnologias ou padrões"

recomendacoes:
  learning_oriented:
    - explain_decisions: "Winston explica rationale de cada ADR"
    - multiple_approaches: "Bob cria histórias explorando alternativas"
    - comprehensive_testing: "Quinn ensina diferentes tipos de teste"

  best_practices:
    - code_review_educativo: "Quinn foca em ensinar padrões"
    - architectural_evolution: "Winston mostra evolução arquitetural"
    - incremental_complexity: "James implementa complexity crescente"
```

---

## 🏆 **Padrões de Sucesso**

### ✅ **Indicadores de Uso Eficiente**

```yaml
voce_esta_usando_bem_quando:
  agentes_especializados:
    - bob_cria_historias_executaveis: "James implementa sem voltar para Bob"
    - sarah_aprovacoes_certeiras: ">90% histórias aprovadas são realmente valiosas"
    - james_implementacao_limpa: "Quinn passa histórias com poucos ajustes"
    - quinn_gates_eficazes: "poucos bugs chegam em produção"
    - winston_decisoes_duraveis: "ADRs não precisam ser revistos constantemente"

  fluxo_otimizado:
    - handoffs_limpos: "cada agente tem contexto completo do anterior"
    - escalacoes_adequadas: "agentes sabem quando pedir ajuda"
    - alan_coordenacao: "diretor resolve conflitos rapidamente"
```

### ⚠️ **Sinais de Alerta**

```yaml
revisar_abordagem_quando:
  ineficiencias:
    - historias_voltam_muito: "Bob não está capturando requisitos"
    - sarah_rejeita_frequente: "desalinhamento valor vs implementação"
    - james_escalacoes_constantes: "histórias não executáveis"
    - quinn_sempre_fail: "quality gates inadequados para contexto"
    - winston_ausente_decisoes: "decisões arquiteturais não documentadas"

  antipatterns:
    - pular_agentes_importantes: "todos têm papel específico"
    - handoffs_incompletos: "contexto perdido entre agentes"
    - micro_management: "deixar agentes trabalharem em sua especialidade"
```

---

## 🎯 **Recomendação Final**

### 💡 **Princípio Fundamental**

> **"Confie na especialização de cada agente, mas mantenha Alan coordenando o fluxo geral. Cada agente tem expertise única - use-a adequadamente."**

### 🚀 **Para Máxima Eficiência**

1. **Comece sempre com Alan** para análise geral
2. **Respeite as especializações** de cada agente
3. **Documente decisões importantes** via Winston
4. **Valide valor de negócio** sempre com Sarah
5. **Implemente sequencialmente** com James
6. **Garanta qualidade** em todos quality gates Quinn
7. **Coordene conflitos** através do Alan

---

*Framework PRISMA - Recomendações contextuais para uso otimizado dos agentes especializados*
*"O agente certo, no momento certo, com o contexto certo"*