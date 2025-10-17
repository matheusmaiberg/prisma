# Auditoria de Dead Code - Documentação

**Data:** 2025-10-01
**Branch:** legacy-auth-cleanup
**Status:** ✅ Completo e Pronto para Execução

---

## 📚 Documentos da Auditoria

### 🎯 Ponto de Entrada

**Comece aqui:** `AUDITORIA-INDEX.md`

Este índice master contém:

- Overview de todos os 5 documentos gerados
- Fluxo de trabalho recomendado por persona
- Navegação rápida por tópico
- Comandos úteis
- Checklist de segurança

---

## 📋 Documentos Gerados (5)

### 1. AUDITORIA-INDEX.md

**Tipo:** Índice Master e Guia de Navegação
**Tamanho:** ~500 linhas
**Quando usar:** Primeiro acesso, navegação entre docs

### 2. AUDITORIA-ESTRUTURA-SRC-COMPLETA.md

**Tipo:** Relatório Técnico Completo
**Tamanho:** ~800 linhas
**Quando usar:** Análise profunda, justificativas técnicas

### 3. CLEANUP-SUMMARY-EXECUTIVO.md

**Tipo:** Sumário Executivo e Quick Start
**Tamanho:** ~200 linhas
**Quando usar:** Overview rápido, comandos prontos

### 4. DEAD-CODE-VISUAL-MAP.md

**Tipo:** Mapa Visual de Diretórios
**Tamanho:** ~250 linhas
**Quando usar:** Referência visual, navegação de código

### 5. DECISOES-PENDENTES-DETALHADAS.md

**Tipo:** Análise de Decisões Críticas
**Tamanho:** ~800 linhas
**Quando usar:** Avaliar trade-offs, decisões difíceis

---

## 🚀 Quick Start

### Para Desenvolvedores (30-60 min)

```bash
# 1. Ler sumário executivo
cat .claude/reports/CLEANUP-SUMMARY-EXECUTIVO.md

# 2. Executar script interativo
bash scripts/cleanup-dead-code.sh

# 3. Seguir menu e validar
pnpm build
```

### Para Tech Leads (1-2 horas)

```bash
# 1. Ler relatório completo
less .claude/reports/AUDITORIA-ESTRUTURA-SRC-COMPLETA.md

# 2. Avaliar decisões
less .claude/reports/DECISOES-PENDENTES-DETALHADAS.md

# 3. Aprovar/ajustar recomendações
# 4. Delegar execução
```

### Para Stakeholders (10-15 min)

```bash
# Ler sumário executivo apenas
cat .claude/reports/CLEANUP-SUMMARY-EXECUTIVO.md
```

---

## 📊 Achados Principais

### Estatísticas

- **Arquivos TS/TSX:** 163
- **Diretórios vazios:** 7
- **Dead code estimado:** 40-50%
- **Potencial de redução:** 30-40%

### Problemas Críticos

- ❌ 4 páginas com imports quebrados
- ❌ 7 diretórios vazios
- ❌ 11 componentes payment órfãos (mas arquivar, não deletar)
- ❌ ~15 componentes órfãos diversos
- ❌ 4 libs órfãs

---

## 🎯 Recomendações em 3 Fases

### Fase 1: Limpeza Imediata (5-10 min) - RISCO BAIXO ✅

- Remover 7 diretórios vazios
- Remover arquivo backup
- Remover hook duplicado

### Fase 2: Dead Code (15-30 min) - RISCO MÉDIO ⚠️

- ARQUIVAR componentes payment (não deletar)
- Remover componentes órfãos
- Remover libs órfãs

### Fase 3: Refatorar Páginas (30-60 min) - RISCO ALTO 🔴

- Criar stubs ou deletar páginas quebradas
- Decidir sobre results/share pages
- Validar funcionalidades

---

## 🛠️ Scripts Disponíveis

### Script Interativo Principal

```bash
bash scripts/cleanup-dead-code.sh
```

**Recursos:**

- Menu interativo
- Execução em fases
- Confirmações de segurança
- Validação de build

### Script de Decisões Recomendadas

**Localização:** Embedded em `DECISOES-PENDENTES-DETALHADAS.md`

**Extrair e usar:**

```bash
tail -80 .claude/reports/DECISOES-PENDENTES-DETALHADAS.md > scripts/apply-recommended-decisions.sh
chmod +x scripts/apply-recommended-decisions.sh
bash scripts/apply-recommended-decisions.sh
```

---

## 🔍 Navegação Rápida por Tópico

| Procurando por...     | Documento            | Seção               |
| --------------------- | -------------------- | ------------------- |
| Diretórios vazios     | AUDITORIA-COMPLETA   | Seção 1.1           |
| Componentes payment   | DECISOES-PENDENTES   | Decisão 1           |
| Páginas results/share | DECISOES-PENDENTES   | Decisão 2           |
| Páginas admin         | DECISOES-PENDENTES   | Decisão 3           |
| Hooks duplicados      | DECISOES-PENDENTES   | Decisão 4           |
| Libs órfãs            | DECISOES-PENDENTES   | Decisão 5           |
| Mapa visual completo  | DEAD-CODE-VISUAL-MAP | Todo documento      |
| Quick start           | CLEANUP-SUMMARY      | Seção "Quick Start" |

---

## ✅ Checklist de Execução

### Pré-requisitos

- [ ] Commit/push mudanças atuais
- [ ] Backup do branch (tag ou branch)
- [ ] Build passa ANTES da limpeza: `pnpm build`

### Execução

- [ ] Fase 1: Diretórios vazios e backups
- [ ] Validação: `pnpm build` (deve passar)
- [ ] Fase 2: Arquivar payment, remover dead code
- [ ] Validação: `pnpm build` (deve passar)
- [ ] Fase 3: Decidir sobre páginas quebradas
- [ ] Validação Final: `pnpm build && pnpm dev`

### Pós-limpeza

- [ ] Commit em blocos lógicos
- [ ] Atualizar docs de arquitetura
- [ ] Informar equipe sobre componentes arquivados

---

## 📈 Métricas de Sucesso

| Métrica           | Antes  | Meta Depois |
| ----------------- | ------ | ----------- |
| Arquivos TS/TSX   | 163    | 100-110     |
| Diretórios vazios | 7      | 0           |
| Dead code         | 40-50% | <5%         |
| Imports quebrados | 4+     | 0           |

---

## 🔗 Links Importantes

### Documentação da Auditoria

- [Índice Master](./AUDITORIA-INDEX.md)
- [Relatório Completo](./AUDITORIA-ESTRUTURA-SRC-COMPLETA.md)
- [Sumário Executivo](./CLEANUP-SUMMARY-EXECUTIVO.md)
- [Mapa Visual](./DEAD-CODE-VISUAL-MAP.md)
- [Decisões Pendentes](./DECISOES-PENDENTES-DETALHADAS.md)

### Scripts

- [Cleanup Script](../../scripts/cleanup-dead-code.sh)

### Documentação Relacionada

- [README Principal](../../README.md)
- [Auth Cleanup Plan](../.claude/docs/AUTH-OVER-ENGINEERING-REMOVAL-PLAN.md)

---

## 💡 Comandos Úteis

### Validação

```bash
# Build deve passar
pnpm build

# Contar arquivos
find src -name "*.ts*" | wc -l

# Verificar diretórios vazios
find src -type d -empty

# Verificar imports quebrados
pnpm build 2>&1 | grep -i "cannot find"
```

### Busca

```bash
# Procurar termo em docs de auditoria
grep -r "termo" .claude/reports/AUDITORIA-*.md

# Verificar uso de componente
grep -r "ComponentName" src/
```

---

## 🎬 Comece Agora

**Escolha seu caminho:**

1. **Quick Start (30 min):**

   ```bash
   cat .claude/reports/CLEANUP-SUMMARY-EXECUTIVO.md
   bash scripts/cleanup-dead-code.sh
   ```

2. **Análise Completa (2 horas):**

   ```bash
   less .claude/reports/AUDITORIA-ESTRUTURA-SRC-COMPLETA.md
   less .claude/reports/DECISOES-PENDENTES-DETALHADAS.md
   # Executar manualmente ou adaptar scripts
   ```

3. **Overview Executivo (10 min):**
   ```bash
   cat .claude/reports/CLEANUP-SUMMARY-EXECUTIVO.md | head -100
   ```

---

**Status:** ✅ Pronto para execução
**Última atualização:** 2025-10-01
**Contato:** Ver documentação para dúvidas específicas

**Boa limpeza! 🧹✨**
