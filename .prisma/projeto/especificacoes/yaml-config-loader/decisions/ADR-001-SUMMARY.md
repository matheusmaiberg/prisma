# ADR-001: Path Traversal Validation - Resumo Executivo

**Status**: ✅ APROVADO
**Data**: 2025-01-15
**Tipo**: Decisão de Segurança Crítica

---

## TL;DR (30 segundos)

**Conflito**: Requirements.md exige validação de path traversal (MUST), mas Design.md omite por simplicidade.

**Decisão**: Implementar validação completa antes de v1.0.

**Custo**: +2 horas (+33% tempo), +20 linhas de código (+8% LOC)

**Benefício**: Elimina vulnerabilidade CRÍTICA (P0 - BLOCKER) que permitiria ler arquivos arbitrários do sistema.

---

## O Problema (1 minuto)

**Vulnerabilidade Identificada**:
```yaml
# Usuário malicioso edita .prisma/configuracoes/prisma/caminhos.yaml
paths:
  agents: ../../../etc/passwd  # ← LÊ ARQUIVO SENSÍVEL
```

**Impacto**:
- Extensão VSCode pode ler qualquer arquivo do sistema do usuário
- Exposição de secrets, configurações, dados pessoais
- Risco real: usuário compartilha workspace malicioso

**Severidade**: CRÍTICO (P0 - BLOCKER)

---

## A Decisão (2 minutos)

### Implementar Validação Completa (Opção A)

**O que fazemos**:
```typescript
// Validar TODOS os paths antes de usar
if (path contém "../" ou é absoluto) {
    console.warn("Path inválido detectado");
    usar default path;  // ← Fallback gracioso (não crasha)
}
```

**Alternativas Rejeitadas**:
- ❌ **Opção B**: Rebaixar requisito (MUST → SHOULD) → Risco inaceitável
- ❌ **Opção C**: Validação parcial → Proteção incompleta
- ❌ **Opção D**: Feature flag (validação opcional) → UX confusa

---

## Trade-offs

| Aspecto | Antes | Depois | Delta |
|---------|-------|--------|-------|
| **Linhas de código** | 240 LOC | 260 LOC | +8% |
| **Tempo de implementação** | 4-6 horas | 6-8 horas | +33% |
| **Vulnerabilidades críticas** | 1 (P0) | 0 | -100% |
| **Requisitos MUST atendidos** | 8/11 | 11/11 | +27% |
| **Simplicidade do design** | Mantida | Mantida | 0% |

**Conclusão**: +33% tempo elimina 100% do risco crítico → Trade-off extremamente favorável.

---

## Impacto em Stakeholders

### Tech Lead (Segurança)
✅ **Aprovado**: Vulnerabilidade crítica resolvida antes de v1.0.

### Arquiteto (Pragmatismo)
✅ **Aprovado**: Validação simples (20 linhas) não compromete design v2.

### Product Owner (Timeline)
✅ **Aprovado**: +2h (6-8h total) aceitável para eliminar blocker de segurança.

### Security Reviewer (Compliance)
✅ **Aprovado**: Implementação correta, atende OWASP guidelines.

---

## Próximos Passos

### Implementação (Checklist)

- [ ] Adicionar função `validatePath()` em `YamlConfigLoader.ts` (+20 linhas)
- [ ] Integrar validação em `loadAll()` com fallback (+10 linhas)
- [ ] Adicionar testes de segurança (+10 linhas)
- [ ] Atualizar `design.md` para remover "Limitação Aceita" (linha 761-765)
- [ ] Atualizar `tasks.md` para refletir +2h em TASK-002

### Tempo Estimado
**Total**: 2 horas (1h implementação + 0.5h testes + 0.5h documentação)

---

## Exemplo de Implementação

### Antes (Vulnerável)
```typescript
// YamlConfigLoader.ts
async loadAll(workspaceRoot: string): Promise<YamlConfigs | null> {
    const configs = await this.loadYamls();
    return configs;  // ← SEM VALIDAÇÃO
}
```

### Depois (Seguro)
```typescript
// YamlConfigLoader.ts
async loadAll(workspaceRoot: string): Promise<YamlConfigs | null> {
    const configs = await this.loadYamls();

    // ✅ Validar paths
    for (const [key, pathValue] of Object.entries(configs.paths)) {
        if (!this.validatePath(pathValue, workspaceRoot)) {
            console.warn(`Invalid path '${key}': ${pathValue}. Using default.`);
            configs.paths[key] = this.getDefaultPaths()[key];  // ← FALLBACK
        }
    }

    return configs;
}

private validatePath(inputPath: string, workspaceRoot: string): boolean {
    const normalized = path.normalize(inputPath);
    if (path.isAbsolute(normalized)) return false;  // ← Rejeita absolutos

    const resolved = path.join(workspaceRoot, normalized);
    return resolved.startsWith(workspaceRoot);  // ← Rejeita path traversal
}
```

---

## Documentação Completa

📄 **ADR Completo**: `ADR-001-path-traversal-validation.md`
- Contexto detalhado (3 páginas)
- Análise de 4 alternativas
- Implementação técnica
- Testes de segurança
- Aprovações de stakeholders

---

## Métricas de Sucesso

**Após Implementação**:
- ✅ 0 vulnerabilidades críticas
- ✅ 100% requisitos MUST atendidos (11/11)
- ✅ Cobertura de testes de segurança ≥ 90%
- ✅ Extensão aprovada para VSCode Marketplace

---

**Decisão Final**: Implementar validação completa antes de v1.0. Segurança > Simplicidade.
