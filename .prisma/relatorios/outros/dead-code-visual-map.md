# Mapa Visual de Dead Code - Projeto TestAgnt

```
📁 src/
│
├── 📁 app/
│   ├── 📁 (app)/                              ✅ MANTÉM
│   │   ├── layout.tsx                         ✅ USADO
│   │   ├── page.tsx                           ✅ USADO (Landing)
│   │   ├── providers.tsx                      ✅ USADO
│   │   ├── 📁 dashboard-bi/                   ❌ DELETE (import quebrado)
│   │   │   └── page.tsx                       ❌ AdminDashboard não existe
│   │   ├── 📁 transactions-admin/             ❌ DELETE (import quebrado)
│   │   │   └── page.tsx                       ❌ TransactionsDashboard não existe
│   │   ├── 📁 results/[id]/                   ⚠️ REFACTOR ou DELETE
│   │   │   └── page.tsx                       ⚠️ analysisAdapter não existe
│   │   └── 📁 share/[token]/                  ⚠️ REFACTOR ou DELETE
│   │       └── page.tsx                       ⚠️ analysisAdapter não existe
│   │
│   ├── 📁 api/
│   │   ├── 📁 [...slug]/                      ❌ DELETE (vazio)
│   │   ├── 📁 admin/                          ✅ MANTÉM (4 routes)
│   │   ├── 📁 credits/                        ✅ MANTÉM
│   │   ├── 📁 dx-dashboard/                   ✅ MANTÉM
│   │   ├── 📁 ecosystem/                      ✅ MANTÉM
│   │   ├── 📁 feature-flags/                  ✅ MANTÉM
│   │   ├── 📁 monitoring/                     ✅ MANTÉM
│   │   ├── 📁 transactions/                   ✅ MANTÉM
│   │   └── 📁 validation/                     ✅ MANTÉM
│   │
│   ├── layout.tsx                             ✅ USADO (root)
│   └── globals.css                            ✅ USADO
│
├── 📁 components/
│   ├── 📁 admin/                              ❌ NÃO EXISTE (mas referenciado)
│   │   ├── AdminDashboard.tsx                 ❌ CRIAR STUB ou DELETE página
│   │   └── TransactionsDashboard.tsx          ❌ CRIAR STUB ou DELETE página
│   │
│   ├── 📁 auth/                               ❌ DELETE (vazio)
│   ├── 📁 configuration/                      ❌ DELETE (0 imports)
│   │   ├── AutoSaveConfigurationForm.tsx     ❌
│   │   ├── ConfigurationWizard.tsx           ❌
│   │   └── TierNotificationBar.tsx           ❌
│   │
│   ├── 📁 dashboard/                          ❌ DELETE (0 imports)
│   │   └── ProjectsDashboard.tsx             ❌
│   │
│   ├── 📁 landing/                            ✅ MANTÉM (usado por page.tsx)
│   │   ├── Header.tsx                         ✅
│   │   ├── HeroSection.tsx                    ✅
│   │   ├── BenefitsSection.tsx                ✅
│   │   ├── SocialProofSection.tsx             ✅
│   │   ├── PricingSection.tsx                 ✅
│   │   ├── FAQSection.tsx                     ✅
│   │   ├── CTASection.tsx                     ✅
│   │   └── Footer.tsx                         ✅
│   │
│   ├── 📁 notifications/                      ✅ MANTÉM
│   │
│   ├── 📁 payment/                            📦 ARCHIVE (não DELETE)
│   │   ├── BoletoPayment.tsx                 📦 Bem implementado
│   │   ├── CheckoutModal.tsx                 📦 Pode ser útil
│   │   ├── CreditCardForm.tsx                📦 Sistema completo
│   │   ├── PaymentExample.tsx                📦 11 componentes
│   │   ├── PaymentHistory.tsx                📦 PagSeguro
│   │   ├── PaymentMethodSelector.tsx         📦 Movê para
│   │   ├── PixPayment.tsx                    📦 .archive/
│   │   ├── SubscriptionManager.tsx           📦
│   │   ├── WalletDisplay.tsx                 📦
│   │   ├── index.ts                          📦
│   │   └── payment-components.md             📦
│   │
│   ├── 📁 project-init/                       ❌ DELETE (0 imports)
│   │   ├── ProjectInitializationWizard.tsx   ❌
│   │   └── MobileProjectWizard.tsx           ❌
│   │
│   ├── 📁 providers/                          ❌ DELETE (vazio)
│   │
│   ├── 📁 results/                            ⚠️ MANTÉM se results page for mantida
│   │   ├── ResultsPage.tsx                   ✅ Usado por results/[id]/page
│   │   ├── ScoreHeader.tsx                   ✅ Usado por ResultsPage
│   │   ├── SuggestionsPanel.tsx              ⚠️ Verificar
│   │   ├── IssuesList.tsx                    ⚠️ Verificar
│   │   ├── ImprovedPromptSection.tsx         ⚠️ Verificar
│   │   ├── HistorySidebar.tsx                ⚠️ Verificar
│   │   └── ActionButtons.tsx                 ⚠️ Verificar
│   │
│   ├── 📁 roi/                                ❌ DELETE (0 imports, APIs deletadas)
│   │   └── ROIDashboard.tsx                  ❌
│   │
│   └── 📁 ui/                                 ✅ MANTÉM (componentes base)
│
├── 📁 contexts/                               ❌ DELETE (vazio)
│
├── 📁 domains/                                ❌ DELETE (vazio)
│
├── 📁 hooks/
│   ├── useToast.ts                            ⚠️ KEEP (avaliar uso)
│   └── useToast.tsx                           ❌ DELETE (duplicado)
│
├── 📁 lib/
│   ├── 📁 fabric-logging/                     ✅ MANTÉM (44 arquivos, essencial)
│   │   ├── 📁 application/                    ❌ DELETE (vazio)
│   │   ├── 📁 core/                           ✅ MANTÉM
│   │   ├── 📁 infrastructure/                 ✅ MANTÉM
│   │   └── 📁 types/                          ✅ MANTÉM
│   │
│   ├── 📁 payload/                            ❌ DELETE (vazio)
│   ├── 📁 security/                           ✅ MANTÉM
│   │
│   ├── circuit-breaker.ts                     ✅ USADO
│   ├── elicitation.ts                         ❌ DELETE (0 imports)
│   ├── email.ts                               ❌ DELETE (0 imports)
│   ├── external-api-manager.ts                ❌ DELETE (0 imports)
│   ├── logger.ts                              ✅ USADO
│   ├── performance-monitor.ts                 ❌ DELETE (0 imports)
│   ├── rate-limiter.ts                        ✅ USADO
│   ├── redis.ts                               ✅ USADO
│   ├── redis-cache-utils.ts                   ✅ USADO
│   ├── redis-enhanced.ts                      ✅ USADO
│   ├── redis-health-monitor.ts                ✅ USADO
│   ├── security-monitoring.ts                 ⚠️ Usado apenas por 1 API
│   ├── session-storage.ts                     ⚠️ Usado apenas por 1 API
│   ├── tokens.ts                              ✅ USADO
│   ├── utils.ts                               ✅ USADO
│   └── validation.ts                          ✅ USADO
│
├── 📁 services/                               ❌ NÃO EXISTE (mas referenciado)
│   └── analysisAdapter.ts                     ❌ CRIAR se mantém results/share
│
├── 📁 types/                                  ✅ MANTÉM (6 arquivos)
├── 📁 utils/                                  ✅ MANTÉM
└── 📁 i18n/                                   ✅ MANTÉM

```

---

## Legenda

| Símbolo | Significado           | Ação                               |
| ------- | --------------------- | ---------------------------------- |
| ✅      | Usado/Essencial       | KEEP - Manter sem mudanças         |
| ❌      | Dead code confirmado  | DELETE - Remover imediatamente     |
| ⚠️      | Precisa atenção       | REFACTOR/INVESTIGATE - Avaliar uso |
| 📦      | Valioso mas não usado | ARCHIVE - Mover para .archive/     |

---

## Resumo Numérico

| Categoria               | Quantidade      | Ação               |
| ----------------------- | --------------- | ------------------ |
| **Diretórios vazios**   | 7               | DELETE             |
| **Páginas quebradas**   | 4               | DELETE ou REFACTOR |
| **Componentes payment** | 11              | ARCHIVE            |
| **Componentes órfãos**  | ~15             | DELETE             |
| **Libs órfãs**          | 4               | DELETE             |
| **Hooks duplicados**    | 1               | DELETE             |
| **Backups temporários** | 1               | DELETE             |
| **Total de limpeza**    | ~40-50 arquivos | -30-40%            |

---

## Ordem de Prioridade de Limpeza

### 🔴 Prioridade ALTA (faça primeiro)

1. Remover 7 diretórios vazios
2. Remover arquivo backup
3. Remover hook duplicado

### 🟡 Prioridade MÉDIA (faça depois)

1. Arquivar componentes payment
2. Remover componentes órfãos (roi, configuration, project-init, dashboard)
3. Remover libs órfãs (4 arquivos)

### 🟢 Prioridade BAIXA (avaliar com cuidado)

1. Decidir sobre páginas quebradas (dashboard-bi, transactions-admin)
2. Refatorar ou deletar results/share
3. Avaliar uso de session-storage.ts e security-monitoring.ts

---

## Árvore Pós-Limpeza (Estimada)

```
📁 src/ (APÓS LIMPEZA)
│
├── 📁 app/
│   ├── 📁 (app)/
│   │   ├── layout.tsx ✅
│   │   ├── page.tsx ✅
│   │   ├── providers.tsx ✅
│   │   └── 📁 results/[id]/ (se mantido)
│   │
│   ├── 📁 api/ (28 routes essenciais)
│   ├── layout.tsx ✅
│   └── globals.css ✅
│
├── 📁 components/
│   ├── 📁 landing/ (8 componentes)
│   ├── 📁 notifications/
│   ├── 📁 results/ (se mantido)
│   └── 📁 ui/
│
├── 📁 hooks/ (avaliar necessidade)
│
├── 📁 lib/
│   ├── 📁 fabric-logging/ (essencial)
│   ├── 📁 security/
│   └── 10 arquivos essenciais (.ts)
│
├── 📁 types/ (6 arquivos)
├── 📁 utils/
└── 📁 i18n/

Total estimado: 100-110 arquivos (-30-40%)
```

---

## Script de Limpeza

Execute:

```bash
bash scripts/cleanup-dead-code.sh
```

Ou veja o relatório completo:

```bash
cat .claude/reports/AUDITORIA-ESTRUTURA-SRC-COMPLETA.md
```

---

**Status:** Pronto para execução
**Risco:** Baixo a Médio (com validações)
**Tempo estimado:** 30-60 minutos
**ROI:** +30-40% de redução de código, build mais rápido, codebase mais limpo
