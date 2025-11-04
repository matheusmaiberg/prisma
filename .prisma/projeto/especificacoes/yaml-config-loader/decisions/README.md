# Architecture Decision Records (ADRs) - YamlConfigLoader

**Registro de decisões arquiteturais críticas para a feature YamlConfigLoader**

---

## Índice de ADRs

| ID | Título | Status | Data | Severidade |
|----|--------|--------|------|------------|
| [ADR-001](./ADR-001-path-traversal-validation.md) | Path Traversal Validation em YamlConfigLoader | ✅ APROVADO | 2025-01-15 | CRÍTICO (P0) |

---

## ADR-001: Path Traversal Validation

**Problema**: Conflito entre requisitos de segurança (RS001-RS003) e decisões de design (simplicidade v2).

**Decisão**: Implementar validação completa de path traversal antes de v1.0.

**Impacto**: +2 horas (+33% tempo), +20 linhas de código (+8% LOC), elimina vulnerabilidade CRÍTICA.

**Documentos**:
- 📄 [ADR Completo](./ADR-001-path-traversal-validation.md) - Análise detalhada, alternativas, implementação
- 📋 [Resumo Executivo](./ADR-001-SUMMARY.md) - TL;DR para stakeholders (3 minutos de leitura)
- 📊 [Diagramas](./ADR-001-DIAGRAMS.md) - Visualizações técnicas (fluxos, matrizes, comparações)

---

## Como Usar Este Diretório

### Para Leitores Rápidos (30 segundos)
Leia apenas: [ADR-001-SUMMARY.md](./ADR-001-SUMMARY.md) - Seção "TL;DR"

### Para Stakeholders (3 minutos)
Leia: [ADR-001-SUMMARY.md](./ADR-001-SUMMARY.md) - Completo

### Para Arquitetos/Tech Leads (15 minutos)
Leia:
1. [ADR-001-SUMMARY.md](./ADR-001-SUMMARY.md) - Contexto
2. [ADR-001-path-traversal-validation.md](./ADR-001-path-traversal-validation.md) - Seções "Decisão" e "Consequências"
3. [ADR-001-DIAGRAMS.md](./ADR-001-DIAGRAMS.md) - Matriz de Decisão

### Para Implementadores (30 minutos)
Leia:
1. [ADR-001-path-traversal-validation.md](./ADR-001-path-traversal-validation.md) - Completo
2. [ADR-001-DIAGRAMS.md](./ADR-001-DIAGRAMS.md) - Seção "Comparação de Código"

---

## Processo de ADRs

### Quando Criar um ADR?

Crie um ADR quando:
- ✅ Decisão tem impacto arquitetural significativo
- ✅ Decisão envolve trade-offs complexos entre múltiplas opções
- ✅ Decisão afeta requisitos MUST ou segurança crítica
- ✅ Decisão requer aprovação de múltiplos stakeholders
- ✅ Decisão pode ser questionada no futuro (precisa de rastreabilidade)

NÃO crie ADR para:
- ❌ Decisões triviais (escolha de biblioteca com 1 opção óbvia)
- ❌ Decisões facilmente reversíveis (nomes de variáveis, formatting)
- ❌ Decisões puramente estéticas (UI/UX sem impacto técnico)

### Template de ADR

```markdown
# ADR-XXX: [Título da Decisão]

**Status**: [PROPOSTO|APROVADO|REJEITADO|OBSOLETO|SUPERSEDIDO]
**Data**: YYYY-MM-DD
**Decisores**: [Lista de stakeholders]

---

## Contexto

[Descreva o problema que requer decisão]

---

## Alternativas Consideradas

### Opção A: [Nome]
[Descrição, prós, contras]

### Opção B: [Nome]
[Descrição, prós, contras]

---

## Decisão

[Qual opção foi escolhida e por quê]

---

## Consequências

### Positivas
[Benefícios da decisão]

### Negativas
[Custos/limitações da decisão]

---

## Aprovações

[Lista de aprovações de stakeholders]
```

---

## Histórico de Mudanças

| Data | ADR | Mudança | Autor |
|------|-----|---------|-------|
| 2025-01-15 | ADR-001 | Criado | decisor (Claude Agent) |
| 2025-01-15 | ADR-001 | Aprovado por 4 stakeholders | Tech Lead, Arquiteto, PO, Security |

---

## Referências

- **OWASP Path Traversal**: https://owasp.org/www-community/attacks/Path_Traversal
- **ADR Template (Michael Nygard)**: https://github.com/joelparkerhenderson/architecture-decision-record
- **VSCode Extension Security**: https://code.visualstudio.com/api/references/extension-guidelines#security

---

## Contato

**Dúvidas sobre ADRs?**
- Tech Lead: [Arquiteto de Segurança]
- Processo de aprovação: [Ver CLAUDE.md - Agente decisor]

---

**Este diretório mantém o histórico de decisões críticas do YamlConfigLoader para garantir rastreabilidade e transparência no processo de desenvolvimento.**
