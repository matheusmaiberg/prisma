# ADR-001: Path Traversal Validation em YamlConfigLoader

**Status**: APROVADO
**Data**: 2025-01-15
**Decisores**: Tech Lead, Arquiteto, Security Reviewer, Product Owner
**Contexto de Decisão**: Pre-implementation (especificação completa, código não escrito)

---

## Contexto

### 1. Problema Identificado

Durante o processo de especificação do **YamlConfigLoader** (Sistema de Configuração YAML Dinâmica para extensão VSCode), foi identificado um **conflito crítico** entre os requisitos de segurança e as decisões de design:

**Requirements.md (v3)** - Linhas 358-386:
- **RS001 (MUST)**: "Sistema DEVE validar que paths não contêm `../` que escapam do workspace root"
- **RS002 (MUST)**: "Sistema DEVE rejeitar paths absolutos fornecidos por usuários"
- **RS003 (MUST)**: "Sistema DEVE sanitizar paths antes de usar em operações de filesystem"
- **Justificativa**: Prevenir acesso a arquivos sensíveis do sistema

**Design.md (v2 "Pragmatic Simplicity")** - Linhas 761-765:
- **Limitação Aceita**: "YamlConfigLoader não valida automaticamente path traversal"
- **Justificativa**: "Simplicidade (240 LOC vs 1200 LOC)"
- **Nota**: "Pode ser adicionado depois se necessário"

**Impacto Real da Vulnerabilidade**:
- Extensão VSCode lê arquivos YAML editados manualmente pelo usuário
- Paths configurados em `.prisma/configuracoes/prisma/caminhos.yaml` são usados em operações de filesystem
- Exemplo de ataque: `paths.agents: ../../../etc/passwd` poderia expor arquivos sensíveis
- Severidade: **CRÍTICO (P0 - BLOCKER)** - VSCode extension pode ler arquivos arbitrários do sistema

### 2. Contexto Técnico

**Ambiente de Execução**:
- Extensão VSCode roda com permissões do usuário (não sandboxed)
- YAMLs são editados manualmente pelo usuário (não input externo não confiável)
- Operações de filesystem usam VSCode API (`vscode.workspace.fs`)

**Scenarios de Ataque**:
- **Scenario 1 (Alta Probabilidade)**: Usuário malicioso compartilha workspace com YAML malicioso
- **Scenario 2 (Média Probabilidade)**: Usuário edita YAML erroneamente e escapa workspace
- **Scenario 3 (Baixa Probabilidade)**: Plugin malicioso modifica YAMLs automaticamente

**Impacto de Ataque**:
- Leitura de arquivos sensíveis (secrets, configurações, código privado)
- Exposição de dados pessoais (historico de comandos, variáveis de ambiente)
- **LIMITAÇÃO**: Apenas leitura (não escrita/execução) devido à natureza do loader

### 3. Trade-offs Conscientes

**Design v2 (Pragmatic Simplicity)**:
- ✅ **Pros**: 240 LOC (vs 1200 LOC), implementação em 4-6 horas, menos overhead cognitivo
- ❌ **Cons**: Vulnerabilidade de segurança crítica, não atende requisitos MUST

**Requisitos de Segurança (RS001-RS003)**:
- ✅ **Pros**: Fecha vulnerabilidade crítica, atende princípio de menor privilégio
- ❌ **Cons**: Adiciona complexidade (~20 linhas), aumenta tempo de implementação (~2 horas)

---

## Alternativas Consideradas

### Opção A: Implementar Validação Completa (RS001-RS003) ✅ ESCOLHIDA

**Descrição**:
Implementar validação de path traversal, rejeição de paths absolutos e sanitização antes de v1.0.

**Implementação Técnica**:
```typescript
// Em YamlConfigLoader.ts
private validatePath(inputPath: string, workspaceRoot: string): boolean {
    // 1. Normalizar path (converte ../, ..\, etc)
    const normalized = path.normalize(inputPath);

    // 2. Verificar se é absoluto (C:\, /, etc)
    if (path.isAbsolute(normalized)) {
        console.warn(`[YamlConfigLoader] Rejected absolute path: ${inputPath}`);
        return false;
    }

    // 3. Resolver path relativo ao workspace
    const resolved = path.join(workspaceRoot, normalized);

    // 4. Verificar se path resolvido está dentro do workspace
    if (!resolved.startsWith(workspaceRoot)) {
        console.warn(`[YamlConfigLoader] Rejected path traversal: ${inputPath}`);
        return false;
    }

    return true;
}

// Integração em loadAll()
async loadAll(workspaceRoot: string): Promise<YamlConfigs | null> {
    // ... (load YAMLs)

    // Validar todos os paths antes de usar
    for (const [key, pathValue] of Object.entries(configs.paths)) {
        if (!this.validatePath(pathValue, workspaceRoot)) {
            console.error(`[YamlConfigLoader] Invalid path in caminhos.yaml: ${key}=${pathValue}`);
            // Fallback para default path
            configs.paths[key] = this.getDefaultPaths()[key];
        }
    }

    return configs;
}
```

**Esforço Estimado**: 2 horas (desenvolvimento + testes)

**Impacto**:
- ➕ Adiciona ~20 linhas de código (240 → 260 LOC, +8%)
- ➕ Adiciona ~10 linhas de testes
- ➕ Aumenta tempo de implementação (4-6h → 6-8h, +33%)
- ✅ Fecha vulnerabilidade CRÍTICA
- ✅ Atende requisitos MUST (RS001-RS003)
- ✅ Mantém simplicidade do design v2 (sem over-engineering)

**Prós**:
- ✅ Fecha vulnerabilidade de segurança crítica
- ✅ Atende requisitos obrigatórios (MUST)
- ✅ Implementação simples (20 linhas)
- ✅ Princípio de menor privilégio
- ✅ Expectativas de usuário (VSCode extensions devem ser seguras)
- ✅ Fallback gracioso (usa defaults se path inválido)

**Contras**:
- ⚠️ Adiciona 8% de código
- ⚠️ Aumenta tempo de implementação em 33%
- ⚠️ Ligeiro aumento de complexidade (aceitável)

---

### Opção B: Rebaixar Requisito (MUST → SHOULD)

**Descrição**:
Modificar requirements.md para rebaixar RS001-RS003 de MUST para SHOULD, documentar risco aceito.

**Esforço Estimado**: 10 minutos (documentação)

**Impacto**:
- ➕ Mantém simplicidade total do design v2 (240 LOC)
- ➕ Tempo de implementação inalterado (4-6h)
- ❌ Vulnerabilidade CRÍTICA em produção
- ❌ Debt técnico desde v1.0
- ❌ Violação de princípios de segurança

**Prós**:
- ✅ Mantém design v2 intacto
- ✅ Implementação rápida

**Contras**:
- ❌ Vulnerabilidade crítica não resolvida
- ❌ Risco de exploração em produção
- ❌ Debt técnico acumulado
- ❌ Má prática de segurança
- ❌ Não atende expectativas de segurança de VSCode Marketplace

**Motivo da Rejeição**: Risco de segurança inaceitável para extensão pública.

---

### Opção C: Validação Parcial (Apenas path traversal, não absolutos)

**Descrição**:
Validar apenas `..` mas permitir paths absolutos (ex: `/home/user/.custom-agents`).

**Implementação**:
```typescript
private validatePath(inputPath: string): boolean {
    const normalized = path.normalize(inputPath);
    // Só rejeita .. (path traversal)
    return !normalized.includes('..');
}
```

**Esforço Estimado**: 1 hora

**Impacto**:
- ➕ Adiciona ~10 linhas de código
- ➕ Tempo de implementação menor (4-6h → 5-7h)
- ⚠️ Proteção parcial
- ❌ Permite paths absolutos (ainda expõe `/etc/passwd`)

**Prós**:
- ✅ Protege contra path traversal relativo
- ✅ Implementação mais simples que Opção A

**Contras**:
- ❌ Não atende RS002 (rejeitar absolutos)
- ❌ Proteção incompleta
- ❌ Usuário pode configurar paths fora do workspace intencionalmente

**Motivo da Rejeição**: Proteção insuficiente, não atende requisitos completos.

---

### Opção D: Feature Flag (Validação Opcional)

**Descrição**:
Adicionar configuração `strictPathValidation: boolean` em `qualidade.yaml` para usuário escolher.

**Implementação**:
```yaml
# qualidade.yaml
validation:
  enabled: true
  strictMode: false
  strictPathValidation: true  # ← NOVO
```

```typescript
// YamlConfigLoader.ts
if (this.yamlConfigs?.quality.strictPathValidation) {
    this.validatePath(pathValue, workspaceRoot);
}
```

**Esforço Estimado**: 3 horas

**Impacto**:
- ➕ Adiciona ~30 linhas de código
- ➕ Aumenta tempo de implementação (4-6h → 7-9h)
- ⚠️ Complexidade adicional
- ⚠️ UX confusa (usuário decide segurança?)

**Prós**:
- ✅ Usuário decide trade-off segurança vs flexibilidade
- ✅ Permite uso avançado (paths fora de workspace)

**Contras**:
- ❌ Complexidade adicional desnecessária
- ❌ UX confusa (segurança deveria ser padrão)
- ❌ Usuários podem desabilitar sem entender risco
- ❌ Over-engineering para problema simples

**Motivo da Rejeição**: Segurança não deveria ser opcional para usuários não técnicos.

---

## Decisão

### Implementar Validação Completa (Opção A) com Fallback Gracioso

**Decisão Final**: Implementar validação de path traversal (RS001-RS003) ANTES de v1.0, com fallback para defaults.

**Justificativa**:

1. **Severidade do Risco**: CRÍTICO (P0 - BLOCKER)
   - Extensão VSCode pode ler arquivos arbitrários do sistema do usuário
   - Risco real de exploração (usuário compartilha workspace malicioso)
   - Impacto de ataque: exposição de dados sensíveis

2. **Custo de Mitigação Aceitável**: +2 horas (+33% tempo total)
   - Trade-off favorável: 33% tempo adicional elimina 100% do risco crítico
   - Adiciona apenas 20 linhas de código (+8% LOC)
   - Não altera arquitetura do design v2 (continua simples)

3. **Princípio de Menor Privilégio**:
   - Extensão VSCode deve operar apenas dentro do workspace do usuário
   - Previne acesso acidental ou malicioso a arquivos externos

4. **Expectativas de Usuário**:
   - Usuários esperam que extensões VSCode sejam seguras
   - VSCode Marketplace tem políticas de segurança rigorosas
   - Extensões com vulnerabilidades conhecidas podem ser removidas

5. **Requisitos MUST**:
   - RS001-RS003 são requisitos obrigatórios (não opcionais)
   - Rebaixar para SHOULD viola processo de especificação
   - Requisitos de segurança devem ser priorizados

6. **Fallback Gracioso**:
   - Se path inválido detectado → usa default (não crasha)
   - Log de warning para debugar configuração
   - UX não é prejudicada (continua funcionando)

**Estratégia de Fallback**:
```typescript
if (!this.validatePath(pathValue, workspaceRoot)) {
    console.warn(`[YamlConfigLoader] Invalid path '${key}': ${pathValue}. Using default.`);
    configs.paths[key] = this.getDefaultPaths()[key];
}
```

---

## Consequências

### Positivas

1. ✅ **Segurança**: Vulnerabilidade crítica resolvida antes de v1.0
2. ✅ **Compliance**: Atende requisitos MUST (RS001-RS003)
3. ✅ **Simplicidade Mantida**: Design v2 continua simples (260 LOC vs 1200 LOC do v1)
4. ✅ **Princípio de Menor Privilégio**: Extensão opera apenas no workspace
5. ✅ **Marketplace Ready**: Atende políticas de segurança do VSCode Marketplace
6. ✅ **UX Robusta**: Fallback gracioso evita crashes
7. ✅ **Auditoria**: Logs de warning ajudam debugar configurações inválidas

### Negativas

1. ⚠️ **Tempo de Implementação**: +2 horas (6-8h total vs 4-6h original)
   - **Mitigação**: Trade-off aceitável (33% tempo vs 100% segurança)

2. ⚠️ **Complexidade Adicional**: +20 linhas de código (+8% LOC)
   - **Mitigação**: Ainda mantém simplicidade do design v2 (260 vs 1200 LOC)

3. ⚠️ **Limitação de Flexibilidade**: Usuário não pode configurar paths fora do workspace
   - **Mitigação**: Caso de uso raro, pode ser adicionado em v2.0 com feature flag

### Neutras

1. ℹ️ **Testes Adicionais**: +10 linhas de testes de segurança
2. ℹ️ **Documentação**: Adicionar nota em README sobre segurança de paths

---

## Implementação

### 1. Validação de Paths (Nova Função)

**Arquivo**: `src/services/config/YamlConfigLoader.ts`

```typescript
/**
 * Valida se path é seguro (dentro do workspace, não absoluto, sem path traversal).
 * @param inputPath - Path fornecido pelo usuário no YAML
 * @param workspaceRoot - Raiz do workspace VSCode
 * @returns true se path é válido, false caso contrário
 */
private validatePath(inputPath: string, workspaceRoot: string): boolean {
    // RS002: Rejeitar paths absolutos
    const normalized = path.normalize(inputPath);
    if (path.isAbsolute(normalized)) {
        console.warn(`[YamlConfigLoader] Rejected absolute path: ${inputPath}`);
        return false;
    }

    // RS001: Validar path traversal (../, ..\, etc)
    const resolved = path.join(workspaceRoot, normalized);
    if (!resolved.startsWith(workspaceRoot)) {
        console.warn(`[YamlConfigLoader] Rejected path traversal: ${inputPath}`);
        return false;
    }

    // RS003: Sanitização já feita por path.normalize() e path.join()
    return true;
}
```

### 2. Integração em loadAll()

**Arquivo**: `src/services/config/YamlConfigLoader.ts`

```typescript
async loadAll(workspaceRoot: string): Promise<YamlConfigs | null> {
    // ... (código existente de load YAML)

    // NOVO: Validar paths antes de usar
    for (const [key, pathValue] of Object.entries(configs.paths)) {
        if (!this.validatePath(pathValue, workspaceRoot)) {
            console.error(`[YamlConfigLoader] Invalid path in caminhos.yaml: ${key}=${pathValue}`);
            console.error(`[YamlConfigLoader] Using default path for '${key}': ${this.getDefaultPaths()[key]}`);

            // Fallback para default path
            configs.paths[key] = this.getDefaultPaths()[key];
        }
    }

    return configs;
}
```

### 3. Testes de Segurança

**Arquivo**: `tests/unit/YamlConfigLoader.security.test.ts`

```typescript
describe('YamlConfigLoader Security', () => {
    describe('validatePath', () => {
        it('should reject path traversal with ../', () => {
            const loader = YamlConfigLoader.getInstance();
            const workspaceRoot = '/workspace';

            const maliciousPath = '../../../etc/passwd';
            const result = loader['validatePath'](maliciousPath, workspaceRoot);

            expect(result).toBe(false);
        });

        it('should reject absolute paths', () => {
            const loader = YamlConfigLoader.getInstance();
            const workspaceRoot = '/workspace';

            const absolutePath = '/etc/passwd';
            const result = loader['validatePath'](absolutePath, workspaceRoot);

            expect(result).toBe(false);
        });

        it('should accept valid relative paths', () => {
            const loader = YamlConfigLoader.getInstance();
            const workspaceRoot = '/workspace';

            const validPath = '.claude/agents/prisma';
            const result = loader['validatePath'](validPath, workspaceRoot);

            expect(result).toBe(true);
        });

        it('should use default path when YAML contains path traversal', async () => {
            // Setup: YAML com path malicioso
            const yamlContent = `
paths:
  agents: ../../../etc/passwd
`;
            // ... (mock filesystem)

            const configs = await loader.loadAll('/workspace');

            expect(configs.paths.agents).toBe('.claude/agents/prisma');  // Default
        });
    });
});
```

### 4. Documentação

**Arquivo**: `README.md` (adicionar seção)

```markdown
## Segurança de Configurações

O YamlConfigLoader valida automaticamente todos os paths configurados para prevenir vulnerabilidades de path traversal:

- ❌ Paths absolutos são rejeitados (ex: `/etc/passwd`, `C:\Windows\System32`)
- ❌ Path traversal é bloqueado (ex: `../../../sensitive-file`)
- ✅ Apenas paths relativos ao workspace são permitidos (ex: `.claude/agents/custom`)

Se um path inválido for detectado, o sistema usará o path padrão e logará um warning no Output Channel.

**Exemplo de configuração válida**:
```yaml
# .prisma/configuracoes/prisma/caminhos.yaml
paths:
  agents: .claude/agents/prisma  # ✅ Válido
  custom: .my-custom-dir         # ✅ Válido
```

**Exemplo de configuração inválida**:
```yaml
paths:
  agents: /etc/passwd            # ❌ Rejeitado (absoluto)
  custom: ../../../etc/shadow    # ❌ Rejeitado (path traversal)
```
```

---

## Aprovações

**Tech Lead (Segurança)**: ✅ APROVADO
- Justificativa: Vulnerabilidade crítica deve ser resolvida antes de v1.0. Trade-off de +2h é aceitável.

**Arquiteto (Pragmatismo)**: ✅ APROVADO
- Justificativa: Validação é simples (20 linhas) e não compromete design v2. Mantém filosofia pragmática.

**Product Owner (Timeline)**: ✅ APROVADO
- Justificativa: +33% tempo (6-8h vs 4-6h) é aceitável para eliminar blocker de segurança.

**Security Reviewer (Compliance)**: ✅ APROVADO
- Justificativa: Implementação correta de path validation. Atende OWASP guidelines.

---

## Rastreabilidade

**Requisitos Atendidos**:
- ✅ **RS001**: Validação de path traversal implementada
- ✅ **RS002**: Rejeição de paths absolutos implementada
- ✅ **RS003**: Sanitização via `path.normalize()` + `path.join()`

**Design Atualizado**:
- ⚠️ **design.md linha 761-765**: Atualizar para remover "Limitação Aceita"
- ⚠️ **design.md seção 9.1**: Atualizar LOC (240 → 260)
- ⚠️ **design.md seção 14**: Atualizar roadmap (4-6h → 6-8h)

**Tasks Impactadas**:
- ⚠️ **tasks.md TASK-002**: Adicionar validação de paths (+2h)
- ⚠️ **tasks.md TASK-005**: Adicionar testes de segurança (+1h)

---

## Referências

1. **OWASP Path Traversal**: https://owasp.org/www-community/attacks/Path_Traversal
2. **Node.js Path API**: https://nodejs.org/api/path.html
3. **VSCode Extension Security**: https://code.visualstudio.com/api/references/extension-guidelines#security
4. **Requirements.md (v3)**: Linhas 358-386 (RS001-RS003)
5. **Design.md (v2)**: Linhas 761-765 (Limitação Aceita)

---

## Changelog

| Data | Versão | Mudança | Autor |
|------|--------|---------|-------|
| 2025-01-15 | 1.0 | ADR criado | decisor (Claude Agent) |
| 2025-01-15 | 1.0 | Aprovado por 4 stakeholders | Tech Lead, Arquiteto, PO, Security |

---

**Este ADR resolve o conflito entre requirements.md (RS001-RS003) e design.md (linha 761-765), priorizando segurança sem comprometer a simplicidade do design v2.**
