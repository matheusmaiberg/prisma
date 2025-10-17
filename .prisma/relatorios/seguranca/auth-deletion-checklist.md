# ✅ Checklist: Auth Infrastructure Deletion

**Status**: ⏸️ PENDING EXECUTION
**Created**: 2025-10-01
**Agent**: Audit Agent

---

## 🎯 PRÉ-EXECUÇÃO

- [ ] Ler análise completa: `AUTH-DELETION-SURGICAL-ANALYSIS.md`
- [ ] Backup do projeto (git commit atual)
- [ ] Criar branch: `auth-infrastructure-removal`
- [ ] Confirmar que Payload CMS está funcionando
- [ ] Confirmar que não há PRs abertos conflitantes

---

## 🗑️ FASE 1: DELEÇÃO AUTOMÁTICA

### Arquivos Leaf (sem dependentes)

- [ ] `src/lib/tokens.ts` (108 linhas)
  - [ ] Verificar imports: `grep -r "tokens.ts" src/`
  - [ ] Deletar arquivo: `rm src/lib/tokens.ts`
  - [ ] Confirmar ausência: `ls src/lib/tokens.ts` (deve falhar)

- [ ] `src/lib/security/session-limiter.ts` (504 linhas)
  - [ ] Verificar imports: `grep -r "session-limiter" src/`
  - [ ] Deletar arquivo: `rm src/lib/security/session-limiter.ts`
  - [ ] Confirmar ausência

- [ ] `src/utils/csrf.ts` (280 linhas)
  - [ ] Verificar imports: `grep -r "csrf.ts" src/`
  - [ ] Deletar arquivo: `rm src/utils/csrf.ts`
  - [ ] Confirmar ausência

### Arquivos Intermediários

- [ ] `src/app/api/admin/security/metrics/route.ts` (192 linhas)
  - [ ] Verificar se rota é acessada: buscar `admin/security/metrics` no código
  - [ ] Deletar arquivo: `rm src/app/api/admin/security/metrics/route.ts`
  - [ ] Confirmar ausência

- [ ] `src/lib/session-storage.ts` (566 linhas)
  - [ ] Verificar imports: `grep -r "session-storage" src/`
  - [ ] Deletar arquivo: `rm src/lib/session-storage.ts`
  - [ ] Confirmar ausência

### Arquivos Base

- [ ] `src/types/auth-errors.ts` (235 linhas)
  - [ ] Verificar imports: `grep -r "auth-errors" src/`
  - [ ] Deletar arquivo: `rm src/types/auth-errors.ts`
  - [ ] Confirmar ausência

- [ ] `src/types/auth.ts` (73 linhas)
  - [ ] Verificar imports: `grep -r "types/auth" src/`
  - [ ] Deletar arquivo: `rm src/types/auth.ts`
  - [ ] Confirmar ausência

**Total Fase 1**: 7 arquivos, ~1,958 linhas deletadas

---

## ✏️ FASE 2: EDIÇÃO MANUAL

### Security Monitoring (Decisão: Avaliar vs Deletar)

- [ ] `src/lib/security-monitoring.ts`
  - [ ] Abrir arquivo e analisar conteúdo
  - [ ] Buscar uso non-auth: `grep -r "security-monitoring" src/`
  - [ ] **OPÇÃO A**: Deletar completamente se não usado
  - [ ] **OPÇÃO B**: Remover apenas funções auth-specific:
    - [ ] Remover `import { AuthUser } from './auth'`
    - [ ] Remover funções com parâmetro `AuthUser`
    - [ ] Manter estrutura genérica de logging

### Payment Components (Remover import auth-context)

- [ ] `src/components/payment/CheckoutModal.tsx`

  ```typescript
  // ANTES:
  import { useAuth } from '@contexts/auth-context'
  const { user } = useAuth()

  // DEPOIS:
  // TODO: Implementar Payload auth hook
  // import { usePayloadAuth } from '@/lib/payload-hooks'
  // const { user } = usePayloadAuth()

  // TEMPORÁRIO: Comentar uso de auth
  // const user = null  // TODO: Fix auth
  ```

  - [ ] Abrir arquivo
  - [ ] Remover import de `@contexts/auth-context`
  - [ ] Comentar uso de `useAuth()`
  - [ ] Adicionar TODO para Payload integration
  - [ ] Salvar

- [ ] `src/components/payment/PaymentHistory.tsx`
  - [ ] Repetir processo acima
  - [ ] Verificar outras dependências de auth

- [ ] `src/components/payment/SubscriptionManager.tsx`
  - [ ] Repetir processo acima
  - [ ] Verificar outras dependências de auth

- [ ] `src/components/payment/WalletDisplay.tsx`
  - [ ] Repetir processo acima
  - [ ] Verificar outras dependências de auth

### Redis Keys Cleanup

- [ ] `src/lib/redis.ts`
  - [ ] Abrir arquivo
  - [ ] Localizar objeto `RedisKeys`
  - [ ] Verificar keys definidos:
    - [ ] `session(sessionId)` - DELETAR se existe
    - [ ] `csrf(sessionId)` - DELETAR se existe
    - [ ] `userSessions(userId)` - DELETAR se existe
  - [ ] Manter outros keys (cache, rate-limit, etc)
  - [ ] Salvar

**Total Fase 2**: 6 arquivos editados manualmente

---

## 🔍 FASE 3: VERIFICAÇÃO

### Build & Lint

- [ ] Executar build:

  ```bash
  pnpm build
  # ou
  npm run build
  ```

  - [ ] Build completou com sucesso?
  - [ ] Se erros, anotar lista de erros

- [ ] Executar lint:
  ```bash
  pnpm lint
  # ou
  npm run lint
  ```

  - [ ] Lint passou sem erros de import?
  - [ ] Se warnings, são aceitáveis?

### Import Verification

- [ ] Verificar imports órfãos:

  ```bash
  grep -r "session-storage\|auth-errors\|session-limiter\|tokens.ts\|csrf.ts" src/ \
    --include="*.ts" --include="*.tsx" | \
    grep -v "node_modules"
  ```

  - [ ] Resultado: vazio (✅) ou tem imports? (❌)
  - [ ] Se tem imports, anotar arquivos

- [ ] Verificar auth-context órfão:
  ```bash
  grep -r "@contexts/auth-context" src/ --include="*.ts" --include="*.tsx"
  ```

  - [ ] Resultado: vazio (✅) ou tem imports? (❌)
  - [ ] Se tem imports, são os TODOs que deixamos?

### File Existence Check

- [ ] Confirmar arquivos deletados:
  ```bash
  ls src/lib/tokens.ts 2>/dev/null && echo "ERRO: Ainda existe" || echo "OK: Deletado"
  ls src/lib/session-storage.ts 2>/dev/null && echo "ERRO: Ainda existe" || echo "OK: Deletado"
  ls src/utils/csrf.ts 2>/dev/null && echo "ERRO: Ainda existe" || echo "OK: Deletado"
  ls src/types/auth.ts 2>/dev/null && echo "ERRO: Ainda existe" || echo "OK: Deletado"
  ls src/types/auth-errors.ts 2>/dev/null && echo "ERRO: Ainda existe" || echo "OK: Deletado"
  ```

  - [ ] Todos os arquivos confirmados como deletados?

---

## 🧪 FASE 4: TESTES FUNCIONAIS

### Payment Flow (se aplicável)

- [ ] Testar checkout modal:
  - [ ] Modal abre sem erros de console?
  - [ ] Seleção de método de pagamento funciona?
  - [ ] (Auth desabilitado temporariamente é esperado)

- [ ] Testar payment history:
  - [ ] Página carrega sem crash?
  - [ ] Console sem erros de imports?

- [ ] Testar subscription manager:
  - [ ] Componente renderiza?
  - [ ] Sem erros de módulos faltando?

### API Routes

- [ ] Testar `/api/credits/balance`:
  - [ ] Ainda responde? (deve falhar auth, mas não crash)
  - [ ] Retorna 401 ou erro esperado?

- [ ] Verificar `/api/admin/security/metrics`:
  - [ ] Rota foi deletada? (deve retornar 404)

### Admin Dashboard

- [ ] Acessar admin dashboard:
  - [ ] Carrega sem erros?
  - [ ] Se tinha página de security metrics, foi removida?

---

## 📝 FASE 5: DOCUMENTAÇÃO

### Criar Entry no Changelog

- [ ] Editar `CHANGELOG.md` (se existe):

  ```markdown
  ## [Unreleased]

  ### Removed

  - Over-engineered authentication infrastructure (2,158 lines)
    - Session management system (no backend implementation)
    - CSRF protection utilities (unused)
    - Token generation system (no email flows)
    - Security monitoring for auth events (no auth system)
    - Auth types and error handling (no usage)

  ### Changed

  - Payment components: Temporarily disabled auth integration
    - TODO: Implement Payload CMS auth hooks
  ```

### Atualizar README

- [ ] Verificar se README menciona auth system:
  - [ ] Se sim, remover ou atualizar para Payload CMS
  - [ ] Adicionar nota sobre auth strategy

### Criar Migration Notes

- [ ] Documentar breaking changes:
  - [ ] Payment components precisam Payload integration
  - [ ] Credits API precisa header `x-user-id` via Payload
  - [ ] Admin security metrics removido (não funcional)

---

## 🎯 FASE 6: COMMIT & PR

### Stage Changes

- [ ] Verificar status:

  ```bash
  git status
  ```

  - [ ] Listar todos arquivos modificados/deletados

- [ ] Stage deletions:
  ```bash
  git add -A
  ```

### Commit Message

- [ ] Criar commit estruturado:

  ```bash
  git commit -m "refactor: remove over-engineered auth infrastructure

  Remove 2,158 lines of unused authentication code that was
  prepared for features never implemented. Payload CMS handles
  all authentication concerns.

  DELETED:
  - src/types/auth.ts (73 lines)
  - src/types/auth-errors.ts (235 lines)
  - src/lib/session-storage.ts (566 lines)
  - src/lib/security/session-limiter.ts (504 lines)
  - src/utils/csrf.ts (280 lines)
  - src/lib/tokens.ts (108 lines)
  - src/app/api/admin/security/metrics/route.ts (192 lines)

  MODIFIED:
  - src/components/payment/*.tsx: Remove useAuth imports
  - src/lib/redis.ts: Remove unused auth key namespaces
  - src/lib/security-monitoring.ts: Remove auth-specific functions

  BREAKING CHANGES:
  - Payment components need Payload auth integration
  - /api/credits/balance needs Payload session validation
  - Admin security metrics endpoint removed (was non-functional)

  Ref: .claude/reports/AUTH-DELETION-SURGICAL-ANALYSIS.md"
  ```

### Push & PR (se aplicável)

- [ ] Push branch:

  ```bash
  git push origin auth-infrastructure-removal
  ```

- [ ] Criar Pull Request:
  - [ ] Título: "Refactor: Remove Over-Engineered Auth Infrastructure"
  - [ ] Descrição: Link para `AUTH-DELETION-SURGICAL-ANALYSIS.md`
  - [ ] Labels: `refactor`, `tech-debt`, `breaking-change`
  - [ ] Reviewers: Tech lead ou architect

---

## 📊 MÉTRICAS FINAIS

### Código Removido

- [ ] Linhas deletadas: **\_\_\_\_** (esperado: ~2,158)
- [ ] Arquivos deletados: **\_\_\_\_** (esperado: 7)
- [ ] Arquivos modificados: **\_\_\_\_** (esperado: 5-6)

### Build Status

- [ ] Build time antes: **\_\_\_\_** segundos
- [ ] Build time depois: **\_\_\_\_** segundos
- [ ] Melhoria: **\_\_\_\_**%

### Bundle Size (se aplicável)

- [ ] Bundle size antes: **\_\_\_\_** KB
- [ ] Bundle size depois: **\_\_\_\_** KB
- [ ] Redução: **\_\_\_\_** KB

---

## ⚠️ ROLLBACK PLAN

Se algo der errado:

```bash
# Opção 1: Resetar branch
git reset --hard HEAD~1

# Opção 2: Voltar para branch anterior
git checkout main  # ou master

# Opção 3: Deletar branch de cleanup
git branch -D auth-infrastructure-removal
```

---

## ✅ APROVAÇÃO FINAL

- [ ] Todos os testes passaram?
- [ ] Build está verde?
- [ ] Nenhum import órfão encontrado?
- [ ] Documentação atualizada?
- [ ] Commit criado com mensagem descritiva?

**Aprovador**: **********\_\_\_**********

**Data**: **********\_\_\_**********

**Status**: ⏸️ PENDING → ✅ COMPLETED

---

## 📌 NOTAS ADICIONAIS

### Descobertas Durante Execução

```
(Anotar aqui qualquer descoberta ou problema encontrado)

-
-
-
```

### TODOs Criados

```
(Listar TODOs que precisam ser endereçados depois)

- [ ] Implementar Payload auth hooks para payment components
- [ ] Migrar credits balance API para Payload session
- [ ]
```

### Lições Aprendidas

```
(Insights para prevenir over-engineering futuro)

-
-
-
```

---

**Audit Agent** | Checklist Completo | 2025-10-01
