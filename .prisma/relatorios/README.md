# Framework Reports Directory

## Purpose

This directory contains **diagnostic reports about the KFC framework itself** - not individual features. These reports identify structural issues, process breaks, and improvement opportunities in the specification workflow system.

## Report Location Structure

### ✅ CORRECT Structure:

```
.claude/reports/                           # Framework improvement reports
├── README.md                              # This file
├── agents-hierarchy-analysis.md           # Example: Agent role conflicts
├── workflow-consistency-report.md         # Example: Process flow issues
└── spec-compliance-patterns.md           # Example: Common framework issues

.claude/specs/{feature-name}/              # Individual feature specs
├── requirements.md
├── design.md
├── tasks.md
└── {feature-name}-compliance-report.md   # Feature-specific compliance report

docs/                                      # APPLICATION documentation (user-facing)
├── README.md                              # How to use the application
├── api/                                   # API documentation for users
├── guides/                                # User guides and tutorials
└── deployment/                            # How to deploy the application
```

### ❌ INCORRECT Structure (Fixed):

- ~~`.claude/specs/reports/framework/`~~ → **Moved to** `.claude/reports/`
- ~~`.claude/specs/{feature-name}/reports/`~~ → **Simplified to** `.claude/specs/{feature-name}/{feature-name}-compliance-report.md`

## Documentation Purpose Clarification

### `.claude/reports/` (This Directory)

- **Purpose**: KFC framework improvement
- **Content**: Framework diagnostic reports
- **Audience**: Framework developers
- **Example**: `workflow-consistency-report.md`

### `.claude/specs/{feature-name}/`

- **Purpose**: Individual feature development
- **Content**: Feature specs + compliance reports
- **Audience**: Feature developers
- **Example**: `user-auth-compliance-report.md`

### `docs/` (Application Documentation)

- **Purpose**: End-user application documentation
- **Content**: Super simplified user guides
- **Audience**: Application users
- **Example**: `README.md`, `api-guide.md`, `deployment.md`

## Framework Report Types

### 1. **Agent Analysis Reports**

- **Focus**: Agent hierarchy, role conflicts, responsibility overlaps
- **Examples**: `agents-hierarchy-analysis.md`, `role-conflict-report.md`

### 2. **Workflow Analysis Reports**

- **Focus**: Process flow issues, missing steps, logical gaps
- **Examples**: `workflow-consistency-report.md`, `phase-transition-analysis.md`

### 3. **Framework Compliance Reports**

- **Focus**: Framework-wide patterns, systematic issues
- **Examples**: `spec-compliance-patterns.md`, `framework-health-report.md`

### 4. **Documentation Consistency Reports**

- **Focus**: Inconsistencies between documentation and implementation
- **Examples**: `doc-implementation-gaps.md`, `spec-reality-misalignment.md`

## Framework Report Template

```markdown
# Framework Diagnostic Report: {Issue Category}

**Generated**: {timestamp}
**Scope**: KFC Framework Analysis
**Category**: {Agents|Workflow|Compliance|Documentation}
**Severity**: {LOW|MEDIUM|HIGH|CRITICAL}

## Issue Summary

Brief description of the framework issue identified.

## Evidence Collected

### Pattern 1: {Description}

- **Observed in**: {Multiple locations where this pattern appears}
- **Frequency**: {How often this occurs across features}
- **Impact**: {What problems this causes systemically}

## Root Cause Analysis

### Primary Cause

Description of why this framework issue exists.

### Framework Evolution Context

How this issue affects future framework development.

---

_This report contains only findings. No suggestions provided._
```

## Usage Guidelines

### When Framework Reports are Generated

1. **Cross-feature patterns**: Same issues appear in multiple feature compliance reports
2. **Systematic failures**: Framework processes consistently fail or are bypassed
3. **Architecture drift**: Framework reality diverges from documentation
4. **Evolution needs**: Framework requires enhancement or restructuring

### What Framework Reports Contain

- ✅ **Objective observations**: Evidence-based findings about framework issues
- ✅ **Pattern analysis**: Systematic problems across multiple features
- ✅ **Impact assessment**: How framework issues affect development
- ✅ **Root cause investigation**: Why framework issues exist
- ❌ **No suggestions**: Pure diagnostic information only
- ❌ **No feature-specific issues**: Those belong in feature specs

---

_This directory enables continuous improvement of the KFC framework through systematic diagnostic analysis._
