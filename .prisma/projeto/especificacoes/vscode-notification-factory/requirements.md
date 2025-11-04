# Requirements - VSCode Notification Factory

## Metadados

- **Nome da Feature**: vscode-notification-factory
- **Criado em**: 2025-11-02
- **Última Atualização**: 2025-11-02
- **Status**: Rascunho
- **Versão**: 0.1.0

## Visão Geral

### Propósito

Criar um sistema modular e configurável de notificações para a extensão VSCode Prisma, utilizando Factory Pattern para gerenciar diferentes tipos de notificações (info, warning, error, progress, input, confirmation) com templates personalizáveis e integração com configurações centralizadas.

### Escopo

**Incluído**:
- Factory pattern para criação de notificações
- Suporte a 6 tipos de notificações (info, warning, error, progress, input, confirmation)
- Builder pattern para API fluida e configurável
- Integração com ConfigManager para settings persistentes
- Backward compatibility total com NotificationUtils atual
- Sistema de templates configuráveis
- Command registration para configuração via paleta de comandos
- Unit tests com coverage > 85%

**Excluído (Fase 2)**:
- Notificações com sons customizados
- Histórico de notificações
- Notificações push/toast fora do VSCode
- Integração com sistemas externos de notificação
- Analytics de notificações

### Critérios de Sucesso

1. **Adoption Rate**: 80% das chamadas `vscode.window.show*` migradas para factory em 3 meses
2. **Performance**: Nenhuma regressão de performance (< 50ms display time)
3. **Zero Breaking Changes**: Código existente funciona sem modificação
4. **Test Coverage**: > 85% de cobertura de testes
5. **Configuration Flexibility**: 3+ configurações customizáveis pelo usuário

---

## Requisitos Funcionais (Formato EARS)

### RF-001: Factory Initialization

**WHEN** extension activates,
**THEN** the system **SHALL** instantiate NotificationManager using Singleton pattern,
**WHERE** the instance is registered in extension context subscriptions.

**Priority**: P0 (Critical)
**Rationale**: Manager Pattern é arquitetural constraint obrigatório. Singleton garante estado consistente.
**Dependencies**: None

**Acceptance Criteria**:
- [ ] NotificationManager implements Singleton pattern with getInstance()
- [ ] Instance is added to context.subscriptions for proper disposal
- [ ] Manager initializes in < 1ms (performance target from elicitação)
- [ ] No duplicate instances are created during extension lifecycle

---

### RF-002: Notification Type Support

**WHEN** user invokes notification method,
**IF** notification type is one of [info, warning, error, progress, input, confirmation],
**THEN** the system **SHALL** create appropriate notification using factory method,
**WHERE** each type maps to corresponding VSCode API.

**Priority**: P0 (Critical)
**Rationale**: Core functionality. 6 tipos cobrem 95% dos casos de uso identificados na análise de código (28 ocorrências de vscode.window.show*).
**Dependencies**: RF-001 (factory initialization)

**Acceptance Criteria**:
- [ ] Factory supports all 6 notification types
- [ ] Type mapping:
  - info → vscode.window.showInformationMessage
  - warning → vscode.window.showWarningMessage
  - error → vscode.window.showErrorMessage
  - progress → vscode.window.withProgress
  - input → vscode.window.showInputBox
  - confirmation → vscode.window.showInformationMessage with actions
- [ ] Each type has dedicated builder class
- [ ] Invalid type throws clear TypeScript error (compile-time)

---

### RF-003: Builder Pattern API

**WHEN** developer creates notification,
**THEN** the system **SHALL** provide fluent builder API with chainable methods,
**WHERE** methods include withDuration(), withActions(), withModal(), withProgress().

**Priority**: P0 (Critical)
**Rationale**: Builder pattern permite API intuitiva e evita parameter explosion (anti-pattern).
**Dependencies**: RF-002 (notification types)

**Acceptance Criteria**:
- [ ] All builder methods return `this` for chaining
- [ ] Example usage works:
  ```typescript
  notificationFactory
    .info('Task completed')
    .withDuration(5000)
    .withActions([{ title: 'View', action: () => {} }])
    .show();
  ```
- [ ] Optional parameters have sensible defaults (duration: 3000ms)
- [ ] show() method returns Promise<void> for async operations

---

### RF-004: Backward Compatibility

**WHEN** existing code calls NotificationUtils methods,
**THEN** the system **SHALL** maintain exact same API signature and behavior,
**WHERE** methods are showAutoDismissNotification(), showError(), showWarning(), showInfo().

**Priority**: P0 (Critical)
**Rationale**: Zero breaking changes é requisito absoluto. 13 ocorrências de NotificationUtils.* no código atual.
**Dependencies**: RF-001, RF-002

**Acceptance Criteria**:
- [ ] All 4 existing NotificationUtils methods work unchanged
- [ ] Method signatures identical (same parameters, same return types)
- [ ] Behavior identical (same timing, same visual appearance)
- [ ] No deprecation warnings for existing methods
- [ ] Existing unit tests pass without modification

---

### RF-005: Configuration Integration

**WHEN** NotificationManager initializes,
**THEN** the system **SHALL** load notification settings from ConfigManager,
**WHERE** settings include autoDismissDuration, enableProgress, theme, per-type overrides.

**Priority**: P1 (High)
**Rationale**: Configuration-driven design é padrão arquitetural. Permite customização sem recompilação.
**Dependencies**: RF-001 (manager initialization)

**Acceptance Criteria**:
- [ ] ConfigManager extended with NotificationSettings interface
- [ ] Settings schema added to prisma.settings.json:
  ```json
  {
    "notifications": {
      "defaults": {
        "autoDismissDuration": 3000,
        "showIcons": true
      },
      "types": {
        "spec.created": { "duration": 5000, "severity": "info" }
      }
    }
  }
  ```
- [ ] Runtime configuration changes apply immediately (no restart)
- [ ] Invalid config values fallback to safe defaults

---

### RF-006: Command Registration

**WHEN** user opens command palette,
**IF** user types "prisma notification",
**THEN** the system **SHALL** show command "prisma.notification.configure",
**WHERE** command opens notification settings in prisma.settings.json.

**Priority**: P2 (Medium)
**Rationale**: Facilita discoverability de configurações. Segue padrão de outros comandos prisma.*.
**Dependencies**: RF-005 (configuration)

**Acceptance Criteria**:
- [ ] Command registered in extension.ts activate()
- [ ] Command added to package.json contributes.commands
- [ ] Command opens .claude/settings/prisma.settings.json
- [ ] Focus jumps to "notifications" section if exists
- [ ] Command appears in command palette search

---

### RF-007: Auto-Dismiss Notification

**WHEN** user invokes auto-dismiss notification,
**THEN** the system **SHALL** display notification that disappears after configured duration,
**WHERE** default duration is 3000ms and can be overridden per-call or via configuration.

**Priority**: P0 (Critical)
**Rationale**: Já implementado em NotificationUtils. Factory deve replicar funcionalidade exata + adicionar flexibilidade.
**Dependencies**: RF-002, RF-003

**Acceptance Criteria**:
- [ ] Uses vscode.window.withProgress with ProgressLocation.Notification
- [ ] Respects duration parameter (milliseconds)
- [ ] Cannot be dismissed manually (cancellable: false)
- [ ] Promise resolves after duration expires
- [ ] Visual appearance matches current NotificationUtils implementation

---

### RF-008: Progress Notification

**WHEN** user invokes progress notification,
**THEN** the system **SHALL** display notification with progress bar and percentage,
**WHERE** developer provides increment callback or uses indeterminate mode.

**Priority**: P1 (High)
**Rationale**: Critical para operações de longa duração (spec creation, agent invocation). Elicitação identificou como high-value feature.
**Dependencies**: RF-002, RF-003

**Acceptance Criteria**:
- [ ] Supports determinate progress (0-100%)
- [ ] Supports indeterminate progress (spinner)
- [ ] Allows cancellation (cancellable: true optional)
- [ ] Provides increment(amount: number) method
- [ ] Example usage:
  ```typescript
  await notificationFactory
    .progress('Creating spec...')
    .withCancellable(true)
    .run(async (progress) => {
      progress.increment(50);
      await doWork();
      progress.increment(50);
    });
  ```

---

### RF-009: Input Notification

**WHEN** user invokes input notification,
**THEN** the system **SHALL** display input box with optional validation,
**WHERE** validation errors are shown in real-time and invalid input prevents submission.

**Priority**: P1 (High)
**Rationale**: Reduz código boilerplate. Usado em spec creation, steering docs, etc (6+ ocorrências de showInputBox).
**Dependencies**: RF-002, RF-003

**Acceptance Criteria**:
- [ ] Uses vscode.window.showInputBox
- [ ] Supports validation function returning error string or undefined
- [ ] Placeholder text configurable
- [ ] Prompt text configurable
- [ ] Returns Promise<string | undefined> (undefined if cancelled)
- [ ] Example usage:
  ```typescript
  const name = await notificationFactory
    .input('Enter spec name')
    .withPlaceholder('my-feature')
    .withValidation((value) =>
      /^[a-z0-9-]+$/.test(value) ? undefined : 'Use kebab-case'
    )
    .show();
  ```

---

### RF-010: Confirmation Notification

**WHEN** user invokes confirmation notification,
**IF** notification requires explicit user choice (Yes/No, Confirm/Cancel),
**THEN** the system **SHALL** display notification with action buttons,
**WHERE** clicking button resolves Promise with selected action.

**Priority**: P1 (High)
**Rationale**: Operações destrutivas (delete spec, reset permissions) requerem confirmação explícita. Safety-critical.
**Dependencies**: RF-002, RF-003

**Acceptance Criteria**:
- [ ] Uses showInformationMessage with action items
- [ ] Supports 2+ action buttons
- [ ] Returns Promise<string | undefined> with clicked action title
- [ ] Modal option forces user decision (blocks other actions)
- [ ] Example usage:
  ```typescript
  const choice = await notificationFactory
    .confirmation('Delete spec?')
    .withActions(['Delete', 'Cancel'])
    .withModal(true)
    .show();

  if (choice === 'Delete') { /* proceed */ }
  ```

---

### RF-011: Notification Actions

**WHEN** notification is displayed,
**IF** notification includes action buttons,
**THEN** the system **SHALL** render buttons and execute associated callbacks,
**WHERE** actions are defined as { title: string, action: () => void } objects.

**Priority**: P1 (High)
**Rationale**: Rich notifications com contexto acionável. Exemplo: "Spec created" → ["Open", "Dismiss"].
**Dependencies**: RF-003 (builder API)

**Acceptance Criteria**:
- [ ] Action buttons rendered in notification
- [ ] Action callback executed when button clicked
- [ ] Supports 1-3 action buttons (VSCode limitation)
- [ ] Action execution does not block UI
- [ ] Errors in action callbacks logged but don't crash extension

---

### RF-012: Type-Specific Templates

**WHEN** notification of specific type is created,
**IF** user configured custom template for that type,
**THEN** the system **SHALL** apply template overrides from configuration,
**WHERE** templates can override duration, severity, icon, actions.

**Priority**: P2 (Medium)
**Rationale**: Permite customização avançada sem mudança de código. Exemplo: "spec.created" sempre dura 5s, "permission.denied" nunca dismisses.
**Dependencies**: RF-005 (configuration)

**Acceptance Criteria**:
- [ ] Configuration supports per-type overrides:
  ```json
  "types": {
    "spec.created": { "duration": 5000, "severity": "info" },
    "permission.denied": { "duration": 0, "severity": "error" }
  }
  ```
- [ ] Type identifier passed as optional parameter to factory methods
- [ ] Template overrides configuration defaults
- [ ] Undefined types fallback to global defaults

---

## Requisitos Não-Funcionais (Formato EARS)

### RNF-001: Performance - Display Time

**WHEN** notification is invoked,
**THEN** the system **SHALL** display notification in less than 50 milliseconds,
**WHERE** measurement starts from method invocation to VSCode API call.

**Priority**: P0 (Critical)
**Rationale**: Elicitação especificou < 50ms como target. Notificações síncronas críticas para UX.
**Measurement**: Automated performance tests with console.time()

**Acceptance Criteria**:
- [ ] 95th percentile display time < 50ms
- [ ] No synchronous file I/O in hot path
- [ ] Configuration loaded once and cached
- [ ] Performance test suite validates timing

---

### RNF-002: Performance - Factory Instantiation

**WHEN** NotificationManager.getInstance() is called,
**THEN** the system **SHALL** return instance in less than 1 millisecond,
**WHERE** subsequent calls return cached instance.

**Priority**: P1 (High)
**Rationale**: Singleton deve ser zero-cost abstraction. Elicitação target < 1ms.
**Measurement**: Performance tests measure getInstance() execution time

**Acceptance Criteria**:
- [ ] First call (instantiation) < 1ms
- [ ] Subsequent calls (cache hit) < 0.01ms
- [ ] No lazy dependencies (ConfigManager already initialized)
- [ ] Singleton instance stored in static private field

---

### RNF-003: Maintainability - Manager Pattern

**WHEN** new notification type is added,
**THEN** the system **SHALL** require changes only to factory and builder classes,
**WHERE** no changes to extension.ts or NotificationUtils are needed.

**Priority**: P1 (High)
**Rationale**: Manager Pattern obrigatório por constraint arquitetural. Open/Closed Principle.
**Measurement**: Code review, architecture validation

**Acceptance Criteria**:
- [ ] NotificationManager in src/features/notification/
- [ ] Follows pattern of SpecManager, SteeringManager, PermissionManager
- [ ] Builder classes in src/features/notification/builders/
- [ ] New types added by creating new builder (no modification to existing)

---

### RNF-004: Testability - Unit Test Coverage

**WHEN** tests are executed,
**THEN** the system **SHALL** achieve at least 85% code coverage,
**WHERE** coverage includes all factory methods, builders, and edge cases.

**Priority**: P1 (High)
**Rationale**: Notificações são UI-critical. Bugs afetam todos usuários. Elicitação especificou > 85% target.
**Measurement**: Jest coverage report (npm run test:coverage)

**Acceptance Criteria**:
- [ ] Line coverage > 85%
- [ ] Branch coverage > 80%
- [ ] Tests in tests/unit/utils/notificationFactory.test.ts
- [ ] Mock vscode.window API for isolated testing
- [ ] Tests validate behavior, not implementation

---

### RNF-005: Compatibility - VSCode Version

**WHEN** extension is installed,
**IF** VSCode version is 1.84.0 or higher,
**THEN** the system **SHALL** function with all notification features,
**WHERE** no features degrade or fail on minimum version.

**Priority**: P0 (Critical)
**Rationale**: package.json engines specifies ^1.84.0. Elicitação validou todas APIs disponíveis desde 1.10.0.
**Measurement**: Manual testing on VSCode 1.84.0, automated compatibility checks

**Acceptance Criteria**:
- [ ] All notification APIs available in VSCode 1.84.0
- [ ] No use of APIs newer than 1.84.0
- [ ] Extension activates successfully on minimum version
- [ ] No runtime errors or warnings on 1.84.0

---

### RNF-006: Usability - API Discoverability

**WHEN** developer types "notificationFactory.",
**THEN** the system **SHALL** show IntelliSense with all available notification types,
**WHERE** each method has clear JSDoc with examples.

**Priority**: P1 (High)
**Rationale**: API deve ser self-documenting. Reduz onboarding time para novos desenvolvedores.
**Measurement**: Manual review of IntelliSense, JSDoc completeness

**Acceptance Criteria**:
- [ ] All public methods have JSDoc comments
- [ ] JSDoc includes @param, @returns, @example tags
- [ ] Example code in JSDoc is executable (copy-pasteable)
- [ ] TypeScript types fully annotated (no `any`)

---

### RNF-007: Security - Input Sanitization

**WHEN** notification message contains untrusted user input,
**THEN** the system **SHALL** sanitize HTML/script tags to prevent injection,
**WHERE** sanitization applies to message text, not action titles.

**Priority**: P2 (Low)
**Rationale**: VSCode API não renderiza HTML, mas defense-in-depth. Elicitação classificou como low priority.
**Measurement**: Security test cases with malicious input

**Acceptance Criteria**:
- [ ] HTML tags in message are escaped or stripped
- [ ] Script tags are completely removed
- [ ] Markdown is NOT processed (plain text only)
- [ ] Action titles limited to 50 characters max
- [ ] No user input used in eval() or Function()

---

### RNF-008: Reliability - Graceful Degradation

**WHEN** notification display fails,
**IF** error occurs in VSCode API,
**THEN** the system **SHALL** log error and fallback to console.error,
**WHERE** extension continues functioning normally.

**Priority**: P1 (High)
**Rationale**: Notification failures must not crash extension. UI errors são recoverable.
**Measurement**: Error injection tests, manual failure simulation

**Acceptance Criteria**:
- [ ] All notification calls wrapped in try-catch
- [ ] Errors logged to outputChannel (extension.ts)
- [ ] Fallback: vscode.window.showErrorMessage for critical messages
- [ ] Extension does not throw unhandled rejection
- [ ] User sees error notification explaining failure

---

## Requisitos de Integração (Formato EARS)

### RI-001: Extension Activation

**WHEN** extension activates,
**THEN** the system **SHALL** register NotificationManager in activate() function,
**WHERE** manager is passed outputChannel and context dependencies.

**Priority**: P0 (Critical)
**Rationale**: Lifecycle management é responsabilidade de extension.ts (padrão arquitetural).
**Dependencies**: RF-001

**Acceptance Criteria**:
- [ ] NotificationManager registered in src/extension.ts activate()
- [ ] Instance added to context.subscriptions
- [ ] Dependencies injected: outputChannel (for logging)
- [ ] Manager disposed correctly in deactivate()

---

### RI-002: ConfigManager Integration

**WHEN** NotificationManager initializes,
**THEN** the system **SHALL** retrieve notification settings via ConfigManager.getInstance(),
**WHERE** settings are loaded from .claude/settings/prisma.settings.json.

**Priority**: P0 (Critical)
**Rationale**: ConfigManager é single source of truth para settings. Evita config duplication.
**Dependencies**: RF-005

**Acceptance Criteria**:
- [ ] ConfigManager.getInstance().getSettings() called
- [ ] PrismaSettings interface extended with notifications?: NotificationSettings
- [ ] Settings cached in NotificationManager (not re-read per call)
- [ ] File watcher updates cache when prisma.settings.json changes

---

### RI-003: Package.json Command

**WHEN** extension is installed,
**THEN** the system **SHALL** register command in package.json contributes.commands,
**WHERE** command is prisma.notification.configure with icon $(gear).

**Priority**: P2 (Medium)
**Rationale**: Segue padrão de outros comandos (prisma.permission.*, prisma.spec.*).
**Dependencies**: RF-006

**Acceptance Criteria**:
- [ ] Command added to package.json commands array:
  ```json
  {
    "command": "prisma.notification.configure",
    "title": "%cmd.notification.configure%",
    "category": "Prisma",
    "icon": "$(gear)"
  }
  ```
- [ ] Command handler registered in extension.ts
- [ ] Command appears in command palette (Ctrl+Shift+P)

---

### RI-004: NotificationUtils Refactoring

**WHEN** NotificationUtils methods are called,
**THEN** the system **SHALL** delegate to NotificationFactory internally,
**WHERE** public API remains unchanged (backward compatibility).

**Priority**: P1 (High)
**Rationale**: Consolidation reduces duplication. NotificationUtils vira thin wrapper.
**Dependencies**: RF-004

**Acceptance Criteria**:
- [ ] NotificationUtils methods delegate to factory:
  ```typescript
  static showInfo(msg: string) {
    return NotificationFactory.getInstance().info(msg).show();
  }
  ```
- [ ] No behavioral changes (same timing, same visual)
- [ ] All existing tests pass without modification
- [ ] NotificationUtils marked as legacy in JSDoc (recommend factory)

---

### RI-005: TypeScript Types

**WHEN** developer imports notification types,
**THEN** the system **SHALL** provide type definitions in src/types/notification.types.ts,
**WHERE** types include NotificationConfig, NotificationType, NotificationAction.

**Priority**: P1 (High)
**Rationale**: Projeto usa src/types/ para type definitions (padrão: prompt.types.ts).
**Dependencies**: RF-002, RF-003

**Acceptance Criteria**:
- [ ] File created: src/types/notification.types.ts
- [ ] Exports:
  ```typescript
  export type NotificationType =
    | 'info' | 'warning' | 'error'
    | 'progress' | 'input' | 'confirmation';

  export interface NotificationConfig {
    duration?: number;
    severity?: 'info' | 'warning' | 'error';
    modal?: boolean;
    actions?: NotificationAction[];
  }

  export interface NotificationAction {
    title: string;
    action: () => void | Promise<void>;
  }

  export interface NotificationSettings {
    defaults: {
      autoDismissDuration: number;
      showIcons: boolean;
    };
    types?: Record<string, Partial<NotificationConfig>>;
  }
  ```
- [ ] All interfaces exported from index (if applicable)

---

## Requisitos de Configuração (Formato EARS)

### RC-001: Default Configuration

**WHEN** user does not provide custom notification config,
**THEN** the system **SHALL** use default values for all settings,
**WHERE** defaults are autoDismissDuration: 3000, showIcons: true.

**Priority**: P0 (Critical)
**Rationale**: Sensible defaults permitem uso imediato sem configuração. Elicitação recomendou simplicidade.
**Dependencies**: RF-005

**Acceptance Criteria**:
- [ ] Default config defined in NotificationManager:
  ```typescript
  private static readonly DEFAULT_CONFIG: NotificationSettings = {
    defaults: {
      autoDismissDuration: 3000,
      showIcons: true
    }
  };
  ```
- [ ] Defaults applied when prisma.settings.json missing
- [ ] Defaults applied when notifications section missing
- [ ] Partial configs merged with defaults (user overrides only specified)

---

### RC-002: User Configuration Overrides

**WHEN** user defines custom notification settings in prisma.settings.json,
**THEN** the system **SHALL** apply user values overriding defaults,
**WHERE** unspecified fields fallback to defaults.

**Priority**: P1 (High)
**Rationale**: Permite customização por power users sem afetar usuários comuns.
**Dependencies**: RC-001

**Acceptance Criteria**:
- [ ] User config partially overrides defaults:
  ```json
  {
    "notifications": {
      "defaults": {
        "autoDismissDuration": 5000  // overrides 3000
      }
      // showIcons: true inherited from default
    }
  }
  ```
- [ ] Deep merge applied (nested object merge, not replace)
- [ ] Invalid values ignored with warning logged
- [ ] Config changes hot-reload (no extension restart)

---

### RC-003: Per-Type Configuration

**WHEN** notification with specific type identifier is invoked,
**IF** user configured override for that type,
**THEN** the system **SHALL** apply type-specific settings,
**WHERE** type config overrides both defaults and user defaults.

**Priority**: P2 (Medium)
**Rationale**: Fine-grained control para notificações críticas (errors never dismiss, success dismiss fast).
**Dependencies**: RC-002, RF-012

**Acceptance Criteria**:
- [ ] Type config precedence: type > user defaults > system defaults
- [ ] Example config:
  ```json
  {
    "notifications": {
      "defaults": { "autoDismissDuration": 3000 },
      "types": {
        "spec.created": { "duration": 5000, "severity": "info" },
        "permission.denied": { "duration": 0, "severity": "error" }
      }
    }
  }
  ```
- [ ] Type identifier passed via builder:
  ```typescript
  notificationFactory.info('Spec created')
    .withType('spec.created')
    .show();
  ```
- [ ] Undefined types fallback to defaults

---

### RC-004: Configuration Validation

**WHEN** NotificationManager loads configuration,
**IF** configuration contains invalid values,
**THEN** the system **SHALL** log validation errors and use fallback values,
**WHERE** validation checks type, range, and required fields.

**Priority**: P1 (High)
**Rationale**: Corrupt config não deve crashar extension. Graceful degradation.
**Dependencies**: RC-001, RC-002

**Acceptance Criteria**:
- [ ] Validation rules:
  - autoDismissDuration: number >= 0
  - showIcons: boolean
  - severity: one of ['info', 'warning', 'error']
- [ ] Invalid values logged to outputChannel:
  ```
  [Prisma] Invalid notification config: autoDismissDuration must be >= 0, got -100. Using default 3000.
  ```
- [ ] Extension continues with safe defaults
- [ ] User notified of config errors (one-time warning)

---

## Restrições

### Restrições Técnicas

- **Manager Pattern Obrigatório**: NotificationManager deve seguir padrão de SpecManager, SteeringManager, PermissionManager (src/features/{feature}/manager.ts)
- **Singleton Pattern**: NotificationFactory deve implementar getInstance() conforme ConfigManager
- **VSCode API Limits**: Máximo 3 action buttons por notificação (limitação da API)
- **No External Dependencies**: Não adicionar novas dependências npm (usar apenas vscode API + built-ins)
- **TypeScript Strict Mode**: Código deve compilar com strictNullChecks: true (tsconfig.json)
- **File Structure**:
  - Manager: `src/features/notification/notificationManager.ts`
  - Factory: `src/features/notification/notificationFactory.ts`
  - Builders: `src/features/notification/builders/*.ts`
  - Types: `src/types/notification.types.ts`
  - Tests: `tests/unit/utils/notificationFactory.test.ts`

### Restrições de Negócio

- **Zero Breaking Changes**: Toda API existente de NotificationUtils deve funcionar sem modificação
- **Backward Compatibility Window**: 6 meses mínimo antes de deprecar NotificationUtils (se aplicável)
- **Configuration Simplicity**: Máximo 5 configurações top-level em defaults (evitar complexity creep)
- **Performance Budget**: Notification display não pode adicionar > 10ms overhead vs chamada direta VSCode API

### Restrições de Tempo

- **MVP Scope**: Implementação deve focar em 6 tipos básicos (defer advanced features para Phase 2)
- **Testing**: Unit tests obrigatórios antes de merge (não postpone)
- **Documentation**: JSDoc completo obrigatório (não "TODO: add docs")

---

## Dependências

### Dependências Internas

- **ConfigManager** (src/utils/configManager.ts):
  - Requer extensão de PrismaSettings interface
  - Adicionar seção notifications com schema NotificationSettings
- **Extension.ts** (src/extension.ts):
  - Registrar NotificationManager em activate()
  - Passar outputChannel para logging
  - Registrar command prisma.notification.configure
- **Package.json**:
  - Adicionar command definition
  - Nenhuma nova dependency npm necessária
- **NotificationUtils** (src/utils/notificationUtils.ts):
  - Refatorar para usar factory internamente (optional, P2)
  - Manter backward compatibility

### Dependências Externas

- **VSCode API**:
  - vscode.window.showInformationMessage
  - vscode.window.showWarningMessage
  - vscode.window.showErrorMessage
  - vscode.window.withProgress
  - vscode.window.showInputBox
  - vscode.window.showQuickPick
- **TypeScript**: ^5.3.0 (já instalado)
- **Jest**: ^29.7.0 (já instalado para testes)

---

## Premissas

- ConfigManager já está funcional e testado (não requer modificação além de extensão de schema)
- OutputChannel é passado corretamente para NotificationManager (seguir padrão de outros Managers)
- VSCode 1.84.0+ está instalado (engines requirement em package.json)
- Desenvolvedores seguirão migration guide para adotar factory (não forçar migração automática)
- File watchers já existem para hot-reload de settings (ConfigManager responsibility)
- Jest está configurado corretamente para VSCode extension testing (vscode mock disponível)

---

## Riscos

### Risco 1: Adoption Resistance

**Probabilidade**: Média
**Impacto**: Médio
**Mitigação**:
- Manter NotificationUtils funcionando lado-a-lado (não remover)
- Criar migration guide com exemplos de before/after
- Adicionar JSDoc warnings em NotificationUtils recomendando factory
- Migrar código interno (src/*) como exemplo de best practice

### Risco 2: Configuration Complexity Creep

**Probabilidade**: Alta
**Impacto**: Médio
**Mitigação**:
- Limitar a 5 configurações em defaults (hard limit)
- Defer advanced features (sounds, history, analytics) para Phase 2
- Code review obrigatório para novas config options
- User testing com desenvolvedores antes de adicionar settings

### Risco 3: Performance Regression

**Probabilidade**: Baixa
**Impacto**: Alto
**Mitigação**:
- Automated performance tests em CI (fail se > 50ms)
- Benchmark vs VSCode API direta (overhead < 10ms)
- Lazy loading de config (carregar uma vez, cache)
- Profiling com VSCode DevTools antes de merge

### Risco 4: Breaking Changes em VSCode API

**Probabilidade**: Muito Baixa
**Impacto**: Alto
**Mitigação**:
- Usar apenas APIs stable desde VSCode 1.10.0 (exceto progress)
- Monitorar VSCode release notes para deprecations
- Fallback para simpler APIs se novos métodos falharem
- Wrapper layer permite swap de implementação sem mudar API pública

### Risco 5: Test Coverage Inadequada

**Probabilidade**: Média
**Impacto**: Alto
**Mitigação**:
- Enforce 85% coverage em CI (fail build se < 85%)
- Mock vscode.window para isolated testing
- Test matrix: 6 tipos x 3 configs (defaults, user, type-specific) = 18 cases
- Manual QA checklist antes de release

---

## Histórias de Usuário (Opcional)

### HU-001: Notification com Auto-Dismiss

**Como** desenvolvedor da extensão Prisma,
**Eu quero** mostrar notificações que desaparecem automaticamente,
**Para que** usuários vejam feedback de ações sem precisar dismissar manualmente.

**Critérios de Aceitação**:
- [ ] Notificação aparece imediatamente após ação (ex: spec created)
- [ ] Notificação desaparece após 3 segundos (ou configurado)
- [ ] Usuário não consegue dismissar antes do tempo (não tem X button)
- [ ] Múltiplas notificações aparecem em sequência (não sobrepõem)

**Priority**: P0 (Critical)

---

### HU-002: Notificação com Ações

**Como** usuário da extensão,
**Eu quero** ver botões de ação em notificações,
**Para que** eu possa rapidamente abrir arquivos ou executar comandos relacionados.

**Critérios de Aceitação**:
- [ ] Notificação mostra botões "Open" e "Dismiss"
- [ ] Clicar "Open" abre o arquivo relevante
- [ ] Clicar "Dismiss" fecha a notificação
- [ ] Notificação permanece até eu clicar em algo

**Priority**: P1 (High)

---

### HU-003: Configuração de Duração

**Como** power user,
**Eu quero** configurar quanto tempo notificações ficam visíveis,
**Para que** eu possa ajustar conforme minha velocidade de leitura.

**Critérios de Aceitação**:
- [ ] Posso editar prisma.settings.json com autoDismissDuration: 5000
- [ ] Notificações usam nova duração imediatamente (sem restart)
- [ ] Valor inválido (negativo) resulta em warning + fallback para default
- [ ] Posso configurar duração diferente por tipo de notificação

**Priority**: P2 (Medium)

---

### HU-004: Progress Notification para Spec Creation

**Como** usuário criando spec complexa,
**Eu quero** ver barra de progresso durante criação,
**Para que** eu saiba que o sistema está trabalhando e quanto tempo resta.

**Critérios de Aceitação**:
- [ ] Barra de progresso aparece com texto "Creating spec..."
- [ ] Progresso avança de 0% → 100% conforme etapas completam
- [ ] Posso cancelar operação clicando botão cancel
- [ ] Notificação desaparece automaticamente quando completa

**Priority**: P1 (High)

---

### HU-005: Confirmação Antes de Deletar Spec

**Como** usuário,
**Eu quero** confirmar antes de deletar uma spec,
**Para que** eu não apague acidentalmente trabalho importante.

**Critérios de Aceitação**:
- [ ] Ao clicar "Delete Spec", aparece modal de confirmação
- [ ] Modal bloqueia outras ações até eu decidir
- [ ] Clicar "Delete" executa deleção
- [ ] Clicar "Cancel" ou ESC cancela operação
- [ ] Notificação não pode ser dismissada clicando fora (modal: true)

**Priority**: P1 (High)

---

## Questões em Aberto

- [ ] **Configuration UI**: Devemos criar UI visual para configurar notificações ou apenas editar JSON?
  - **Decisão**: JSON first, UI em Phase 2 se demanda
  - **Deadline**: Decidido em 2025-11-02 (RESOLVIDO - não é escopo MVP)

- [ ] **Notification History**: Usuários querem ver histórico de notificações passadas?
  - **Decisão**: Defer para Phase 2, não é MVP
  - **Deadline**: Reavaliar após 3 meses de uso (2026-02-02)
  - **Owner**: Product Owner

- [ ] **Sound Effects**: Devemos suportar sons customizados?
  - **Decisão**: Defer para Phase 2, complexidade alta
  - **Deadline**: Reavaliar se 30%+ usuários solicitarem via issues (2026-05-02)
  - **Owner**: Lead Developer

- [ ] **Notification Grouping**: Múltiplas notificações similares devem ser agrupadas?
  - **Decisão**: Defer para Phase 2, VSCode API não suporta nativamente
  - **Deadline**: Aguardar VSCode upstream support (monitor release notes)
  - **Owner**: Technical Lead

- [ ] **Internationalization**: Mensagens de notificação devem ser i18n?
  - **Decisão**: Not in scope para factory (usar l10n do VSCode se necessário em chamadas)
  - **Deadline**: Decidido em 2025-11-02 (RESOLVIDO - responsabilidade do caller)
  - **Owner**: Architecture Team

---

## Aprovação

### Revisores

- [x] Stakeholder: Product Owner (aprovar scope e prioridades) - **APROVADO** em 2025-11-02
- [x] Stakeholder: Lead Developer (aprovar constraints arquiteturais) - **APROVADO** em 2025-11-02
- [x] Stakeholder: QA/Test Engineer (aprovar acceptance criteria) - **APROVADO** em 2025-11-02

### Data de Aprovação

**2025-11-02** - Aprovação automática (modo full auto, desenvolvimento solo)

---

## Success Metrics

### Adoption Metrics
- **Target**: 80% das notificações VSCode migradas para factory em 3 meses
- **Medição**:
  - Baseline: 28 ocorrências de `vscode.window.show*` no código atual
  - Target: < 6 ocorrências diretas (apenas casos edge)
  - Tracking: Automated grep count em CI weekly report
- **Measurement Tooling**:
  - Script: `npm run metrics:adoption` (grep + count vscode.window.show*)
  - CI integration: GitHub Actions weekly cron job
  - Report format: JSON output to `.prisma/projeto/reports/adoption-metrics.json`

### User Experience
- **Target**: Zero reclamações de notificações "ruidosas" ou invasivas
- **Medição**:
  - User feedback em GitHub issues
  - Telemetry de notification frequency (se implementado)
  - Developer survey após 1 mês de uso
- **Measurement Tooling**:
  - GitHub Issues labels: `feedback:notifications`, `ux:notifications`
  - Survey platform: Google Forms ou TypeForm
  - Telemetry: VSCode telemetry API (vscode.env.isTelemetryEnabled)

### Code Quality
- **Target**: Zero regressões em notificações existentes
- **Medição**:
  - All existing tests pass
  - Manual QA checklist (28 notification sites testados)
  - No new bugs reported relacionados a notificações
- **Measurement Tooling**:
  - Test framework: Jest (npm run test)
  - CI: GitHub Actions on PR + push
  - QA checklist: `.prisma/projeto/especificacoes/vscode-notification-factory/artifacts/qa-checklist.md`

### Configuration Flexibility
- **Target**: 3+ configurações usadas por pelo menos 20% dos usuários
- **Medição**:
  - Analytics de settings modificadas (se implementado)
  - GitHub repo search por "prisma.settings.json" + "notifications"
- **Measurement Tooling**:
  - GitHub Code Search API
  - Optional telemetry event: `notification.config.modified` (opt-in only)
  - Manual sampling: Review public repos usando extension

### Performance
- **Target**: < 50ms display time (95th percentile)
- **Medição**:
  - Automated performance tests em CI
  - Benchmark: `console.time()` em torno de `notificationFactory.*.show()`
  - Comparison: VSCode API direta vs factory (overhead < 10ms)
- **Measurement Tooling**:
  - Performance suite: `tests/performance/notification.perf.test.ts`
  - Profiler: Node.js `perf_hooks` (PerformanceObserver)
  - CI threshold: Fail build if p95 > 50ms
  - Reporting: Console output + JSON artifact for trending

---

**Notas**:

- Este documento segue o formato EARS (Easy Approach to Requirements Syntax)
- Todos os requisitos são testáveis e mensuráveis
- Prioridades definidas baseadas em elicitação e constraints arquiteturais
- Formato EARS mantém palavras-chave em inglês (WHEN, THEN, SHALL, WHERE, IF)
- Este arquivo é criado pelo agente **analista** e está localizado em `.prisma/projeto/especificacoes/vscode-notification-factory/requirements.md`
- Documentos relacionados: `design.md` (próximo), `tasks.md` (após design)
- Relatórios são salvos em `.prisma/projeto/especificacoes/vscode-notification-factory/reports/`
- Decisões são registradas em `.prisma/projeto/especificacoes/vscode-notification-factory/decisions/`
- Artefatos são armazenados em `.prisma/projeto/especificacoes/vscode-notification-factory/artifacts/`
