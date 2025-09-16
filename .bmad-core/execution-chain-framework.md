# Execution Chain Framework v2.0 - Meta-Framework Complete

## Meta-Framework para Execução Hierárquica com FASES, TASKS e CHECKPOINTS

**CRITICAL**: Todos os agentes DEVEM carregar este documento antes de executar qualquer comando e seguir a estrutura hierárquica definida abaixo. Este framework implementa o padrão completo de execução com validações obrigatórias, mitigação de riscos e rastreamento visual de progresso.

## Framework Overview

### Core Principles:
1. **Hierarchical Structure**: FASES → TASKS → CHECKPOINTS → SUBTASKS
2. **Visual Progress Tracking**: Real-time status with tree structure
3. **Risk Mitigation**: Built-in safety mechanisms
4. **Flexible Execution**: AUTO/MANUAL/HYBRID modes
5. **Persistent State**: Progress saved across sessions

## Hierarquia Visual Obrigatória - WINDOWS TERMINAL

### CRITICAL: Esta estrutura é para WINDOWS TERMINAL - Use caracteres de árvore que funcionam no Windows:

```
🔧 FASE 1: [DEV] Story Analysis & Setup
├── CHECKPOINT 1: Prerequisites validated
│   ├── TASK 1: Load prerequisites and validate story
│   │   ├── SUBTASK 1.1: Load tech stack info
│   │   ├── SUBTASK 1.2: Load coding standards
│   │   └── SUBTASK 1.3: Validate story requirements
│   └── TASK 2: Setup development environment
│       ├── SUBTASK 2.1: Branch creation
│       └── SUBTASK 2.2: Dependencies installation
└── CHECKPOINT 2: Environment ready

🔧 FASE 2: [DEV] Core Implementation
├── CHECKPOINT 3: Database ready
│   └── TASK 1: Fix database schema migration
│       ├── SUBTASK 1.1: Resolve email_verified column issue
│       └── SUBTASK 1.2: Execute Payload migrations
└── CHECKPOINT 4: Authentication working
    └── TASK 2: Create test user and validate auth flow
        ├── SUBTASK 2.1: Create user via script
        ├── SUBTASK 2.2: Test login endpoint
        └── SUBTASK 2.3: Validate JWT tokens

🧪 FASE 3: [QA] Integration & Testing
└── CHECKPOINT 5: Ready for QA
    ├── TASK 1: Test complete auth flow
    └── TASK 2: Update documentation
```

### WINDOWS TERMINAL - Caracteres de Árvore:

**OBRIGATÓRIO**: Use estes caracteres EXATOS para Windows Terminal:
- `├──` para itens no meio (branch)
- `└──` para último item (end)
- `│   ` para linha vertical de continuação
- `    ` para espaços após último item

### REGRAS PARA WINDOWS:

1. **AMBIENTE**: Windows Terminal / Git Bash / PowerShell
2. **ENCODING**: UTF-8 (suporta caracteres de árvore)
3. **CARACTERES**:
   ```
   ├── Item do meio
   │   ├── Sub-item
   │   └── Último sub-item
   └── Último item
       └── Sub-item final
   ```

4. **NOVA HIERARQUIA**:
   - 0 TAB: `🔧 FASE X: [AGENT] Description` (sem árvore)
   - 1 TAB: `├── CHECKPOINT X: Description` ou `└── CHECKPOINT X:`
   - 2 TAB: `│   ├── TASK X: Description` ou `    └── TASK X:`
   - 3 TAB: `│   │   ├── SUBTASK X.X:` ou `        └── SUBTASK X.X:`

5. **LÓGICA**:
   - CHECKPOINT agrupa as TASKS que são necessárias para validá-lo
   - TASKS executam as ações práticas
   - SUBTASKS detalham cada TASK

5. **IMPORTANTE PARA WINDOWS**:
   - Estes caracteres funcionam em: CMD, PowerShell, Windows Terminal, Git Bash
   - NÃO use caracteres Unix-only
   - Testado e validado no Windows 10/11

## Fluxo de Execução Obrigatório

### STEP 1: AGENT INITIALIZATION
Todo agente deve executar na ativação:

1. **Load Framework**: Carregar este documento (execution-chain-framework.md)
2. **Collect Prerequisites**: Coletar informações específicas do tipo de agente
3. **Offer Options**: Apresentar opções de execução ao usuário
4. **User Selection**: Aguardar seleção do modo de execução
5. **Execute**: Executar com mitigações de risco ativas

### STEP 2: PREREQUISITE COLLECTION

#### DEV Prerequisites:
```yaml
DEV_PREREQUISITES:
  required:
    - tech_stack_info: "package.json + dependencies analysis"
    - coding_standards: "docs/architecture/coding-standards.md"
    - story_requirements: "assigned story file validation"
    - test_framework: "vitest|jest|playwright detection"
    - branch_status: "git status + working directory clean"

  validation_criteria:
    - code_compiles: true
    - tests_pass: ">80% coverage required"
    - lint_clean: true
    - no_security_vulns: true
    - story_approved: "status != 'Draft'"
```

#### PM Prerequisites:
```yaml
PM_PREREQUISITES:
  required:
    - stakeholder_context: "who are the decision makers"
    - business_impact: "what value this delivers"
    - timeline_constraints: "deadlines and dependencies"
    - success_metrics: "measurable success criteria"
    - risk_tolerance: "acceptable failure scenarios"

  validation_criteria:
    - requirements_clear: true
    - stakeholders_aligned: true
    - timeline_realistic: true
    - metrics_defined: true
    - risks_assessed: true
```

#### QA Prerequisites:
```yaml
QA_PREREQUISITES:
  required:
    - test_scenarios: "acceptance criteria breakdown"
    - quality_gates: "performance/security/usability standards"
    - regression_scope: "existing features impact analysis"
    - environment_setup: "staging/prod environment access"
    - automation_coverage: "what can be automated vs manual"

  validation_criteria:
    - all_scenarios_covered: true
    - performance_benchmarks_defined: true
    - security_scan_configured: true
    - regression_tests_identified: true
    - automation_plan_ready: true
```

### STEP 3: EXECUTION OPTIONS

O agente deve oferecer estas opções ao usuário com base na complexidade e risco:

```yaml
EXECUTION_MODES:
  AUTO:
    description: "Checkpoints automáticos com timeout de 2h"
    when_to_use: "Simple features, bug fixes, well-defined requirements"
    risk_level: "Low"

  MANUAL:
    description: "Aprovação manual obrigatória em cada checkpoint"
    when_to_use: "Complex features, new architecture, critical systems"
    risk_level: "High"

  HYBRID:
    description: "Auto para low-risk, manual para high-risk checkpoints"
    when_to_use: "Most common - balanced approach"
    risk_level: "Medium"

APPROVAL_LEVELS:
  SELF: "Agent decides autonomously"
  PEER: "Another agent of same type validates"
  LEAD: "Senior agent validates"
  USER: "User always approves manually"

EXTEND_BEHAVIOR:
  AUTO_EXTEND: "Automatically extends phase if validation fails"
  PROMPT_EXTEND: "Asks user if want to extend phase"
  NO_EXTEND: "Fails and stops execution"
```

### STEP 4: RISK MITIGATIONS (Always Active)

```yaml
RISK_MITIGATIONS:
  bottleneck_prevention:
    - sla_timeout: "2h maximum per checkpoint"
    - escalation_chain: ["peer", "lead", "user"]
    - auto_approve_after: "4h for low-risk items"
    - emergency_bypass: "Available with user confirmation"

  scope_creep_protection:
    - scope_freeze: "No new requirements during checkpoints"
    - new_requirements_backlog: "Captured for next iteration"
    - change_request_required: "Formal process for scope changes"
    - timebox_enforcement: "Strict time limits on checkpoint sessions"

  rollback_safety:
    - git_snapshot: "Before each phase execution"
    - state_backup: "Persistent state in .bmad-core/phase-state.yaml"
    - auto_recovery: "Automatic rollback on critical failures"
    - dependency_validation: "Check prerequisites before execution"

  consistency_enforcement:
    - standard_checklists: "Same criteria for all agents"
    - peer_calibration: "Regular consistency reviews"
    - metrics_tracking: "Success/failure rate monitoring"
    - template_adherence: "Mandatory use of approved templates"
```

## Phase Execution Structure

### Template para Todas as Fases:
```yaml
PHASE_TEMPLATE:
  phase_start:
    - validate_prerequisites: "Ensure all required info collected"
    - confirm_execution_mode: "AUTO/MANUAL/HYBRID"
    - create_git_snapshot: "Before starting implementation"
    - update_phase_state: "Log start time and parameters"

  task_execution:
    - present_hierarchical_todo: "Visual hierarchy with status"
    - execute_subtasks: "Granular implementation steps"
    - validate_task_completion: "Meet acceptance criteria"
    - update_progress: "Real-time status updates"

  checkpoint_validation:
    - apply_validation_criteria: "Agent-specific quality gates"
    - escalate_if_needed: "Follow escalation chain if blocked"
    - document_decisions: "Record approval/rejection reasons"
    - update_phase_state: "Persistent checkpoint status"

  phase_completion:
    - validate_all_checkpoints: "Ensure no skipped validations"
    - update_artifacts: "Documentation, code, test results"
    - prepare_handoff: "Next phase prerequisites ready"
    - commit_phase_state: "Final state persistence"
```

## State Persistence

### File: `.bmad-core/phase-state.yaml`
```yaml
current_execution:
  agent: "DEV"
  phase: "FASE_2_IMPLEMENTATION"
  story: "story-1.2-authentication.md"
  execution_mode: "HYBRID"
  started_at: "2025-01-14T10:30:00Z"

  collected_prerequisites:
    tech_stack: "Next.js 14, TypeScript, Vitest"
    coding_standards: "loaded from docs/architecture/"
    story_validation: "approved"

  user_choices:
    checkpoint_mode: "HYBRID"
    approval_level: "PEER"
    extend_behavior: "PROMPT_EXTEND"

  phase_progress:
    - task: "Setup and environment"
      status: "COMPLETED"
      completed_at: "2025-01-14T10:45:00Z"
    - task: "Core implementation"
      status: "IN_PROGRESS"
      progress: "60%"

  checkpoints:
    - checkpoint: "CHECKPOINT_1"
      status: "PASSED"
      validator: "AUTO"
      passed_at: "2025-01-14T10:45:00Z"
    - checkpoint: "CHECKPOINT_2"
      status: "PENDING"

execution_history:
  - phase: "FASE_1_STORY_CREATION"
    agent: "SM"
    completed_at: "2025-01-14T10:00:00Z"
    status: "COMPLETED"
    checkpoints_passed: 1

prerequisite_cache:
  DEV:
    last_updated: "2025-01-14T10:30:00Z"
    cached_data:
      tech_stack: "Next.js 14 + TypeScript"
      coding_standards: "ESLint + Prettier configured"
      test_framework: "Vitest detected"
```

## Complete Implementation Examples

### Real-World Example: JWT Authentication Feature

```yaml
📝 FASE 1: [SM] Story Creation & Planning                                    [OK]
├── CHECKPOINT 1: Story approved                                            [OK]
│   ├── TASK 1: Requirements analysis                                       [OK]
│   ├── TASK 2: Draft story creation (*draft)                              [OK]
│   └── TASK 3: Story validation and approval                              [OK]
└── Output: story-1.2-authentication.md                                    [CREATED]

🔧 FASE 2: [DEV] Story Implementation                                       [IN_PROGRESS]
├── CHECKPOINT 2: Environment ready                                         [OK]
│   ├── TASK 1: Setup and environment preparation                          [OK]
│   │   ├── SUBTASK 1.1: Load prerequisites                                [OK]
│   │   ├── SUBTASK 1.2: Validate story requirements                       [OK]
│   │   └── SUBTASK 1.3: Setup development environment                     [OK]
├── CHECKPOINT 3: Core implementation                                       [IN_PROGRESS]
│   └── TASK 2: Core implementation (*develop-story)                       [IN_PROGRESS]
│       ├── SUBTASK 2.1: JWT utilities implementation                      [OK]
│       ├── SUBTASK 2.2: Unit tests                                        [80%]
│       └── SUBTASK 2.3: Integration middleware                            [PENDING]
└── CHECKPOINT 4: Ready for QA                                             [PENDING]
    └── TASK 3: Final integration                                          [PENDING]

🧪 FASE 3: [QA] Quality Assurance & Testing                                [PENDING]
└── All checkpoints pending development completion                         [WAITING]

🚀 FASE 4: [TEAM] Deployment & Completion                                  [PENDING]
└── CHECKPOINT FINAL: Feature live in production                           [WAITING]
```

## Agent-Specific Implementation Examples

### DEV Agent Execution:
```yaml
🔧 FASE 1: [DEV] Story Analysis & Setup                                    [OK]
    ○ TASK 1: Load prerequisites and validate story                       [OK]
        • SUBTASK 1.1: Load tech stack info                               [OK]
        • SUBTASK 1.2: Load coding standards                              [OK]
        • SUBTASK 1.3: Validate story requirements                        [OK]
        ◦ CHECKPOINT 1: Prerequisites validated                           [OK]
    ○ TASK 2: Setup development environment                               [OK]
        • SUBTASK 2.1: Branch creation/validation                         [OK]
        • SUBTASK 2.2: Dependencies installation                          [OK]
        ◦ CHECKPOINT 2: Environment ready                                 [OK]

🔧 FASE 2: [DEV] Core Implementation                                      [OK]
    ○ TASK 1: Implement acceptance criteria                               [OK]
        • SUBTASK 1.1: Core logic implementation                          [OK]
        • SUBTASK 1.2: Error handling                                     [OK]
        ◦ CHECKPOINT 3: Logic complete                                    [OK]
    ○ TASK 2: Write tests                                                 [OK]
        • SUBTASK 2.1: Unit tests                                         [OK]
        • SUBTASK 2.2: Integration tests                                  [OK]
        ◦ CHECKPOINT 4: Tests passing                                     [OK]

🔧 FASE 3: [DEV] Integration & Documentation                              [OK]
    ○ TASK 1: Final integration                                           [OK]
    ○ TASK 2: Documentation update                                        [OK]
        ◦ CHECKPOINT 5: Ready for QA                                      [OK]
```

### QA Agent Execution:
```yaml
🧪 FASE 1: [QA] Test Planning                                             [OK]
    ○ TASK 1: Risk assessment (*risk command)                             [OK]
    ○ TASK 2: Test strategy (*design command)                             [OK]
        ◦ CHECKPOINT 1: Test plan approved                                [OK]

🧪 FASE 2: [QA] Test Execution                                            [OK]
    ○ TASK 1: Requirements tracing (*trace command)                       [OK]
    ○ TASK 2: Non-functional testing (*nfr command)                       [OK]
        ◦ CHECKPOINT 2: Tests executed                                    [OK]

🧪 FASE 3: [QA] Final Validation                                          [OK]
    ○ TASK 1: Comprehensive review (*review command)                      [OK]
    ○ TASK 2: Quality gate decision (*gate command)                       [OK]
        ◦ CHECKPOINT 3: QA approval (PASS/CONCERNS/FAIL/WAIVED)          [OK]
```

## Execution Mode Selection Guide

### When to Use Each Mode:

| **Scenario** | **AUTO** | **MANUAL** | **HYBRID** | **Reasoning** |
|-------------|----------|------------|------------|---------------|
| Simple bug fix | ✓ Recommended | ✗ Overkill | ⚠ Optional | Low risk, clear scope |
| New feature | ⚠ Risky | ⚠ Slow | ✓ Recommended | Balance speed & safety |
| Brownfield change | ✗ Dangerous | ✓ Safe | ✓ Good option | High regression risk |
| API modification | ✗ Avoid | ✓ Required | ✓ Acceptable | Breaking change risk |
| Data migration | ✗ Never | ✓ Always | ⚠ If experienced | Data loss risk |
| Performance critical | ⚠ Careful | ✓ Preferred | ✓ Recommended | Needs validation |
| Security feature | ✗ Never | ✓ Always | ✗ Avoid | Critical validation |

### Risk-Based Testing Priority:

| **Risk Score** | **Calculation** | **Testing Priority** | **Gate Impact** |
|----------------|-----------------|---------------------|------------------|
| **9** | High probability × High impact | P0 - Must test thoroughly | FAIL if untested |
| **6** | Medium-high combinations | P1 - Should test well | CONCERNS if gaps |
| **4** | Medium combinations | P1 - Should test | CONCERNS if notable gaps |
| **2-3** | Low-medium combinations | P2 - Nice to have | Note in review |
| **1** | Minimal risk | P2 - Minimal | Note in review |

## QA Command Integration

### Complete QA Command Reference:

| **Command** | **Purpose** | **Output** | **When to Use** | **Priority** |
|-------------|-------------|------------|-----------------|-------------|
| `*risk` | Risk assessment | `docs/qa/assessments/` | Complex/brownfield | P0 for high-risk |
| `*design` | Test strategy | `docs/qa/assessments/` | New features | P0 for new work |
| `*trace` | Coverage verification | `docs/qa/assessments/` | During development | P1 always |
| `*nfr` | Quality validation | `docs/qa/assessments/` | Critical features | P0 for critical |
| `*review` | Final assessment | QA Results + gate files | **Always required** | P0 mandatory |
| `*gate` | Decision update | Updated gate files | After fixes | P1 for updates |

### Gate Decision Matrix:

| **Status** | **Meaning** | **Action Required** | **Can Proceed?** | **Escalation** |
|------------|-------------|-------------------|------------------|----------------|
| **PASS** | All critical requirements met | None | ✓ Yes | None |
| **CONCERNS** | Non-critical issues found | Team review recommended | ⚠ With caution | Optional |
| **FAIL** | Critical issues (security, missing P0 tests) | Must fix | ✗ No | Required |
| **WAIVED** | Issues acknowledged and accepted | Document reasoning | ✓ With approval | Manager |

## Implementation Guidelines

### TodoWrite Implementation - WINDOWS TERMINAL:

**OBRIGATÓRIO PARA WINDOWS**: Use caracteres de árvore do Windows:

```javascript
// NOVA HIERARQUIA PARA WINDOWS TERMINAL:
TodoWrite({
  todos: [
    {
      content: "🔧 FASE 2: [DEV] Core Implementation",
      activeForm: "🔧 FASE 2: [DEV] Implementing Core",
      status: "in_progress"
    },
    {
      content: "├── CHECKPOINT 1: Database ready",
      activeForm: "├── CHECKPOINT 1: Validating database",
      status: "in_progress"
    },
    {
      content: "│   └── TASK 1: Fix database schema migration",
      activeForm: "│   └── TASK 1: Fixing database schema",
      status: "completed"
    },
    {
      content: "│       ├── SUBTASK 1.1: Resolve column issue",
      activeForm: "│       ├── SUBTASK 1.1: Resolving issue",
      status: "completed"
    },
    {
      content: "│       └── SUBTASK 1.2: Run migrations",
      activeForm: "│       └── SUBTASK 1.2: Running migrations",
      status: "completed"
    },
    {
      content: "└── CHECKPOINT 2: Auth working",
      activeForm: "└── CHECKPOINT 2: Validating auth",
      status: "pending"
    },
    {
      content: "    └── TASK 2: Create test user",
      activeForm: "    └── TASK 2: Creating test user",
      status: "pending"
    }
  ]
})
```

**WINDOWS COPY-PASTE REFERENCE**:
```
├── (branch) = Alt+195 Alt+196 Alt+196
└── (end)    = Alt+192 Alt+196 Alt+196
│   (pipe)   = Alt+179 + spaces
```

### For Agent Authors:
1. **Load this document first** - before any other initialization
2. **Use TodoWrite with simple indentation** - 2 spaces per level
3. **Keep it visual** - apenas tabs/espaços para mostrar hierarquia
4. **Collect prerequisites** - use the YAML specifications above
5. **Present hierarchical todos** - use the visual format exactly
6. **Implement checkpoints** - never skip validation steps

### For Users:
1. **Specify execution mode** - choose AUTO/MANUAL/HYBRID based on complexity
2. **Approve checkpoints promptly** - avoid blocking the pipeline
3. **Review phase state regularly** - monitor progress via visual hierarchy
4. **Use extend options wisely** - extend when needed, don't over-engineer

## Success Metrics

The Meta-Framework helps achieve:

- ✓ **Zero regression defects** in production
- ✓ **100% requirements coverage** with tests
- ✓ **Clear quality gates** for go/no-go decisions
- ✓ **Documented risk acceptance** for technical debt
- ✓ **Consistent execution** across all agents
- ✓ **Visual progress tracking** for transparency
- ✓ **Automated safety nets** to prevent failures

---

## Quick Decision Flowchart

```
Start → Is it a simple bug fix?
  ├─ Yes → Use AUTO mode
  └─ No → Is it security/data critical?
      ├─ Yes → Use MANUAL mode
      └─ No → Is it a new feature?
          ├─ Yes → Use HYBRID mode
          └─ No → Is it brownfield?
              ├─ Yes → Use MANUAL mode
              └─ No → Use HYBRID mode
```

## Special Situations & Best Practices

### High-Risk or Brownfield Stories
```bash
# ALWAYS run this sequence:
@qa *risk {story}    # First - identify dangers
@qa *design {story}  # Second - plan defense
# Then during dev:
@qa *trace {story}   # Verify regression coverage
@qa *nfr {story}     # Check performance impact
# Finally:
@qa *review {story}  # Deep integration analysis
```

### Complex Integrations
- Run `*trace` multiple times during development
- Focus on integration test coverage
- Use `*nfr` to validate cross-system performance
- Review with extra attention to API contracts

### Performance-Critical Features
- Run `*nfr` early and often (not just at review)
- Establish performance baselines before changes
- Document acceptable performance degradation
- Consider load testing requirements in `*design`

### Test Quality Standards Enforced

All tests must meet these standards:
- **No Flaky Tests**: Proper async handling, explicit waits
- **No Hard Waits**: Dynamic strategies only (polling, events)
- **Stateless**: Tests run independently and in parallel
- **Self-Cleaning**: Tests manage their own test data
- **Appropriate Levels**: Unit for logic, integration for interactions, E2E for journeys
- **Clear Assertions**: Keep assertions in tests, not buried in helpers

---

**CRITICAL**: This framework is mandatory for all agents. Non-compliance will result in unpredictable execution and potential quality issues. When in doubt, default to MANUAL mode and escalate to USER approval.

**REMEMBER**: The Meta-Framework is not just a process - it's a safety net that ensures quality, consistency, and predictability across all development activities.