# Especificação: vscode-notification-factory

**Status**: 🔄 Design Phase (COMPETIÇÃO v1 vs v2) - Aguardando Decisor
**Criado em**: 2025-11-02
**Última atualização**: 2025-11-02

---

## 📋 Resumo Executivo

Sistema modular factory de notificações para VSCode Extension que centraliza e padroniza todas as interações de notificação com o usuário através de um pattern factory configurável e testável.

**Alinhamento Arquitetural**: 95/100 ✅
**Compliance Score**: 93/100 ✅
**Risco Técnico**: 🟢 BAIXO
**Complexidade**: 🟡 MODERADA

---

## 📂 Documentos da Especificação

### ✅ Elicitação (Completa)
- [alignment-analysis.md](alignment-analysis.md) - Análise completa de alinhamento arquitetural (Score: 95/100)

### ✅ Requisitos (Aprovados)
- [requirements.md](requirements.md) - 29 requisitos EARS formalizados
- [reports/compliance-report.md](reports/compliance-report.md) - Relatório de conformidade (Score: 93%)

### 🔄 Design (COMPETIÇÃO: v1 vs v2)
- **[design-v1.md](design-v1.md)** - Design Candidato v1 (Simplicidade e Clareza) ✅ COMPLETO
- **[design-v2.md](design-v2.md)** - Design Candidato v2 (Pendente criação)

**Diferencial v1**: Prioriza arquitetura limpa com separação clara de responsabilidades (Manager, Factory, 6 Builders)

### ⏳ Tarefas (Pendente)
- `tasks.md` - Aguardando aprovação do design vencedor (decisor)

---

## 🎯 Próximo Passo

**Modo**: COMPETIÇÃO - 2 designs concorrentes
**Agente Atual**: `designer` (criando design-v2.md)
**Próximo Agente**: `decisor` (comparar v1 vs v2, selecionar vencedor)

**Processo de Decisão**:
1. ✅ Design v1 criado (Este documento)
2. ⏳ Design v2 em criação (candidato concorrente)
3. ⏳ Decisor compara ambos com scoring detalhado
4. ⏳ Vencedor aprovado → prossegue para Tasks (planejador)
5. ⏳ Perdedor arquivado → `.prisma/projeto/especificacoes/vscode-notification-factory/archive/`

---

## 🏗️ Arquitetura Design v1 (Simplicidade e Clareza)

### File Structure
```
src/features/notification/
  ├── notificationManager.ts     (Singleton, lifecycle, config management)
  ├── notificationFactory.ts     (Factory methods: info(), warning(), error(), ...)
  └── builders/                  (Builder pattern para cada tipo)
      ├── infoBuilder.ts         (Info notifications com actions)
      ├── warningBuilder.ts      (Warning notifications)
      ├── errorBuilder.ts        (Error notifications)
      ├── progressBuilder.ts     (Progress com cancellation)
      ├── inputBuilder.ts        (Input com validation)
      └── confirmationBuilder.ts (Confirmation com modal)

src/types/
  └── notification.types.ts      (Interfaces TypeScript)

src/utils/
  └── notificationUtils.ts       (REFACTORED: thin wrapper → factory)
```

### Padrões Arquiteturais
- **Manager Pattern**: NotificationManager gerencia lifecycle e configuração
- **Singleton Pattern**: Instância única do manager (getInstance())
- **Factory Pattern**: NotificationFactory cria builders apropriados
- **Builder Pattern**: API fluida com métodos chainable (withDuration(), withActions(), etc.)
- **Configuration-Driven**: Settings em prisma.settings.json via ConfigManager

### Exemplo de Uso
```typescript
// Get factory instance
const factory = NotificationManager.getInstance().getFactory();

// Simple info notification
factory.info('Task completed').show();

// Info with custom duration and actions
factory.info('Spec created')
    .withDuration(5000)
    .withActions([{ title: 'View', action: () => openFile() }])
    .show();

// Progress notification with cancellation
await factory.progress('Creating spec...')
    .withCancellable(true)
    .run(async (progress) => {
        progress.increment(50);
        await doWork();
        progress.increment(50);
    });
```

---

## 📊 Métricas de Qualidade

| Aspecto | Score | Status |
|---------|-------|--------|
| Alinhamento Arquitetural | 95/100 | ✅ ALTO |
| Compliance Score | 93/100 | ✅ COMPLIANT |
| Compatibilidade VSCode API | 100/100 | ✅ PERFEITO |
| Integração com Código Existente | 90/100 | ✅ ALTO |
| Complexidade de Implementação | 85/100 | 🟡 MODERADA |

---

## 🎯 Performance Targets (Design v1)

| Metric | Target | How Achieved |
|--------|--------|--------------|
| **Factory Instantiation** | < 1ms | Singleton pattern, cached instance |
| **Notification Display** | < 50ms (p95) | Direct VSCode API call, no sync I/O |
| **Config Loading** | < 10ms | Cached in Manager, file watcher for updates |
| **Memory Overhead** | < 100KB | Stateless builders, single Manager instance |
| **Test Coverage** | > 85% | 33 tests (27 unit + 5 integration + 1 perf) |

---

## 🔄 Migration Impact (Design v1)

### Change Impact Matrix
| Change | Files Affected | Lines Changed | Effort | Risk | Rollback Time |
|--------|---------------|---------------|--------|------|---------------|
| Add NotificationManager | 1 new file | ~200 LOC | 3h | Low | 1h |
| Add NotificationFactory | 1 new file | ~150 LOC | 2h | Low | 1h |
| Add 6 Builder classes | 6 new files | ~600 LOC | 5h | Low | 1h |
| Extend ConfigManager types | 1 file | ~50 LOC | 1h | Medium | 30min |
| Refactor NotificationUtils | 1 file | ~30 LOC | 1h | Low | 30min |
| Register in extension.ts | 1 file | ~15 LOC | 30min | Low | 15min |
| Add package.json command | 1 file | ~10 LOC | 15min | Low | 15min |
| **TOTAL** | **12 files** | **~1055 LOC** | **~13h** | **Low** | **~4.5h** |

### Breaking Changes: NONE ✅
- ✅ NotificationUtils maintains exact same API
- ✅ All existing code continues to work
- ✅ Migration is optional (gradual adoption recommended)

---

## 🧪 Testing Strategy (Design v1)

### Test Coverage: 85% Target

**Test Matrix**:
- 5 tests per builder (InfoBuilder, WarningBuilder, ErrorBuilder)
- 4 tests per builder (ProgressBuilder, InputBuilder, ConfirmationBuilder)
- 4 tests for NotificationManager
- **Total**: 33 tests (27 unit + 5 integration + 1 performance)

**File Structure**:
```
tests/
├── unit/features/notification/
│   ├── notificationManager.test.ts
│   └── builders/*.test.ts (6 files)
├── integration/
│   └── notification.integration.test.ts
└── performance/
    └── notification.perf.test.ts
```

---

## 🔗 Referências

### Documentação Técnica
- [design-v1.md](design-v1.md) - Especificação técnica completa (30KB, 850+ linhas)
- [requirements.md](requirements.md) - 29 requisitos EARS formalizados
- [alignment-analysis.md](alignment-analysis.md) - Análise de alinhamento arquitetural

### APIs e Padrões
- [VSCode Notification API](https://code.visualstudio.com/api/references/vscode-api#window.showInformationMessage)
- [VSCode Progress API](https://code.visualstudio.com/api/references/vscode-api#window.withProgress)
- [Factory Pattern (GoF)](https://refactoring.guru/design-patterns/factory-method)
- [Builder Pattern (GoF)](https://refactoring.guru/design-patterns/builder)

### Código Relacionado
- `src/utils/configManager.ts` - Padrão Singleton existente
- `src/features/spec/specManager.ts` - Padrão Manager existente
- `src/utils/notificationUtils.ts` - Implementação atual (a ser refatorada)

---

## 📅 Histórico de Alterações

| Data | Fase | Evento | Agente |
|------|------|--------|--------|
| 2025-11-02 | Elicitação | alignment-analysis.md criado (Score: 95/100) | elicitador |
| 2025-11-02 | Requirements | requirements.md criado (29 requisitos EARS) | analista |
| 2025-11-02 | Requirements | compliance-report.md criado (Score: 93%) | conformista |
| 2025-11-02 | Requirements | Requirements aprovados | decisor |
| 2025-11-02 | Design | design-v1.md criado (candidato v1 de 2) | designer |
| 2025-11-02 | Design | README.md atualizado | designer |

---

**Workflow Status**: Elicitação ✅ → Requirements ✅ → **Design 🔄 (v1 completo, v2 pendente)** → Decisão ⏳ → Tasks ⏳ → Implementação ⏳

**Status Atual**: 🔄 **Aguardando design-v2.md e decisão do decisor para prosseguir**

Para detalhes completos da arquitetura v1, consulte [design-v1.md](design-v1.md).
