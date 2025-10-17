# Sumário Executivo - Auditoria de Dead Code

**Data:** 2025-10-01
**Branch:** legacy-auth-cleanup
**Status:** 🟡 LIMPEZA PARCIAL - Ação Necessária

---

## 📊 Estatísticas Gerais

| Métrica                  | Valor      |
| ------------------------ | ---------- |
| Arquivos TS/TSX ativos   | 163        |
| Arquivos deletados (git) | 333        |
| Diretórios vazios        | **7**      |
| Dead code estimado       | **40-50%** |
| Potencial de redução     | **30-40%** |

---

## 🚨 Problemas Críticos

### 1. Páginas com Imports Quebrados (4 páginas)

| Página                        | Problema                           | Ação         |
| ----------------------------- | ---------------------------------- | ------------ |
| `dashboard-bi/page.tsx`       | `AdminDashboard` não existe        | **DELETE**   |
| `transactions-admin/page.tsx` | `TransactionsDashboard` não existe | **DELETE**   |
| `results/[id]/page.tsx`       | `analysisAdapter` não existe       | **REFACTOR** |
| `share/[token]/page.tsx`      | `analysisAdapter` não existe       | **REFACTOR** |

### 2. Diretórios Vazios (7)

- `src/app/api/[...slug]`
- `src/components/auth`
- `src/components/providers`
- `src/contexts`
- `src/domains`
- `src/lib/payload`
- `src/lib/fabric-logging/application`

### 3. Dead Code Confirmado

| Tipo                | Quantidade    | Ação                     |
| ------------------- | ------------- | ------------------------ |
| Componentes Payment | 11 arquivos   | **ARCHIVE** (não DELETE) |
| Componentes Admin   | 2 componentes | **DELETE**               |
| Componentes órfãos  | 4 diretórios  | **DELETE**               |
| Libs órfãs          | 4 arquivos    | **DELETE**               |

---

## ✅ Plano de Ação em 3 Fases

### Fase 1: Limpeza Imediata (5 min) - RISCO BAIXO

```bash
# Execute o script:
bash scripts/cleanup-dead-code.sh

# Ou manualmente:
rm -rf src/app/api/[...slug]
rm -rf src/components/{auth,providers}
rm -rf src/{contexts,domains}
rm -rf src/lib/payload
rm -rf src/lib/fabric-logging/application
rm src/app/(app)/layout.tsx.backup-*
rm src/hooks/useToast.tsx
```

**Impacto:** Remove 7 diretórios + 2 arquivos sem risco

---

### Fase 2: Dead Code (15 min) - RISCO MÉDIO

```bash
# IMPORTANTE: Arquivar (não deletar) componentes payment
mkdir -p .archive/components
mv src/components/payment .archive/components/

# Remover componentes órfãos
rm -rf src/components/{roi,configuration,project-init,dashboard}

# Remover libs órfãs
rm src/lib/{elicitation,email,performance-monitor,external-api-manager}.ts
```

**Impacto:** Reduz ~30 arquivos, mantém componentes payment para reuso futuro

---

### Fase 3: Refatorar Páginas (30-60 min) - RISCO ALTO

**Opção A: Deletar páginas quebradas**

```bash
rm -rf src/app/(app)/{dashboard-bi,transactions-admin,results,share}
```

**Opção B: Criar stubs mínimos**

Criar `src/services/analysisAdapter.ts`:

```typescript
export const analysisAdapter = {
  getAnalysisResult: async (id: string) => null,
  getAnalysisHistory: async () => [],
}
```

Criar `src/components/admin/AdminDashboard.tsx`:

```typescript
export default function AdminDashboard() {
  return <div>Em Desenvolvimento</div>
}
```

**Recomendação:** Opção B (criar stubs) para manter rotas

---

## 🎯 Impacto Esperado

### Antes

- 163 arquivos TS/TSX
- 7 diretórios vazios
- 40-50% dead code
- Build time: X segundos

### Depois (Estimado)

- ~100-110 arquivos TS/TSX (-30-40%)
- 0 diretórios vazios
- <5% dead code
- Build time: mais rápido
- Codebase mais navegável

---

## 📋 Checklist de Execução

### Pré-requisitos

- [ ] Commit/push de mudanças atuais
- [ ] Backup do branch atual
- [ ] Rodar testes antes da limpeza

### Execução

- [ ] **Fase 1:** Remover diretórios vazios e backups
- [ ] **Validação:** `pnpm build` (deve passar)
- [ ] **Fase 2:** Arquivar payment, remover dead code
- [ ] **Validação:** `pnpm build` (deve passar)
- [ ] **Fase 3:** Decidir sobre páginas quebradas
- [ ] **Validação Final:** `pnpm build` e testar landing page

### Pós-limpeza

- [ ] Commit das mudanças em blocos lógicos
- [ ] Atualizar documentação de arquitetura
- [ ] Informar equipe sobre componentes arquivados

---

## 🔧 Comando Rápido (One-liner)

### Apenas Fase 1 (mais seguro):

```bash
rm -rf src/app/api/\[...slug\] src/components/{auth,providers} src/{contexts,domains} src/lib/payload src/lib/fabric-logging/application src/app/\(app\)/layout.tsx.backup-* src/hooks/useToast.tsx
```

### Script Interativo (recomendado):

```bash
bash scripts/cleanup-dead-code.sh
```

---

## 📌 Decisões Pendentes

1. **Componentes Payment:**
   - [ ] Arquivar ou deletar?
   - **Recomendação:** ARQUIVAR (bem implementados, podem ser úteis)

2. **Páginas Results/Share:**
   - [ ] Criar `analysisAdapter` stub ou deletar páginas?
   - **Recomendação:** Criar stub (manter funcionalidade de rotas)

3. **Páginas Admin:**
   - [ ] Deletar ou criar stubs?
   - **Recomendação:** DELETAR (sem uso previsto)

---

## 📊 Métricas de Sucesso

| Métrica           | Meta      |
| ----------------- | --------- |
| Diretórios vazios | 0         |
| Build time        | <baseline |
| Imports quebrados | 0         |
| Dead code         | <5%       |
| LOC reduzido      | 30-40%    |

---

## 🔗 Documentação Completa

Ver relatório completo em:
`.claude/reports/AUDITORIA-ESTRUTURA-SRC-COMPLETA.md`

---

## ⚡ Quick Start

```bash
# 1. Fazer backup
git add . && git commit -m "pre-cleanup checkpoint"

# 2. Rodar script interativo
bash scripts/cleanup-dead-code.sh

# 3. Selecionar opções:
#    - Fase 1: Yes (remover diretórios vazios)
#    - Fase 2: Archive payment, remove orphans
#    - Fase 3: Skip (decidir depois)

# 4. Validar
pnpm build

# 5. Testar landing page
pnpm dev
# Abrir http://localhost:3000
```

---

**Próximo Passo:** Execute `bash scripts/cleanup-dead-code.sh` e siga o menu interativo.
