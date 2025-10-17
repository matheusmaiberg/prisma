# Autonomous Agent Execution Plan

**Date**: 2025-10-01
**Agent**: Ultra Correction Mode
**Branch**: legacy-auth-cleanup
**Estimated Duration**: 2-3 hours

---

## Executive Summary

### Current Situation

- **Payload CMS**: 100% removed from project
- **Code Status**: Compiling in dev mode but has 5 blocker issues
- **Dead Code**: ~40-50% estimated (empty dirs, orphaned components, unused auth)
- **Auth Infrastructure**: ~2,000 lines of orphaned auth code

### Identified Blocker Issues

1. Missing `src/services/analysisAdapter.ts` - 3 files affected
2. Missing `src/services/ValidationService.ts` - 3 API routes broken
3. Broken imports from deleted `@/interfaces/` directory - 6 files
4. Error variable naming mismatch in catch blocks - 8 locations
5. Missing `await` in metadata generation - 1 file

### Strategy

Execute 4 phases sequentially:

1. **FASE 1**: Fix all blockers to ensure clean compilation (CRITICAL)
2. **FASE 2**: Remove dead code and empty directories
3. **FASE 3**: Delete orphaned auth infrastructure
4. **FASE 4**: Generate comprehensive execution report

---

## FASE 1: Correções Bloqueadoras (CRITICAL)

### Objective

Make code compile cleanly with `tsc --noEmit` and `pnpm build`

### Tasks

#### Task 1.1: Create Missing Services

**Estimated Time**: 15 minutes

**Files to Create**:

1. `src/services/analysisAdapter.ts` - Analysis adapter stub
2. `src/services/ValidationService.ts` - Validation service stub

**Approach**:

- Use exact templates from CODE-FIX-TEMPLATES.md
- Implement as working stubs with console.warn for visibility
- Ensure all imports are satisfied

**Verification**:

```bash
ls -la src/services/analysisAdapter.ts
ls -la src/services/ValidationService.ts
```

---

#### Task 1.2: Create Missing Type Files

**Estimated Time**: 15 minutes

**Files to Create**:

1. `src/types/validation.ts` - Validation types
2. `src/types/project.ts` - Project management types
3. `src/types/roi.ts` - ROI dashboard types
4. `src/types/tier.ts` - Tier system types

**Approach**:

- Check if `src/types/` directory exists
- Create directory if needed
- Use exact templates from CODE-FIX-TEMPLATES.md
- Ensure imports reference existing types correctly

**Verification**:

```bash
ls -la src/types/validation.ts
ls -la src/types/project.ts
ls -la src/types/roi.ts
ls -la src/types/tier.ts
```

---

#### Task 1.3: Fix Broken Imports (9 files)

**Estimated Time**: 30 minutes

**Files to Edit**:

1. `src/components/configuration/TierNotificationBar.tsx:24`
   - Change: `@/interfaces/IParameterConfigurationService` → `@/types/tier`

2. `src/components/dashboard/ProjectsDashboard.tsx:12-17`
   - Change: `@/interfaces/IProjectService` → `@/types/project`
   - Also fix error variable at line 153

3. `src/components/roi/ROIDashboard.tsx:53`
   - Change: `@/interfaces/IROITracker` → `@/types/roi`
   - Also fix error variables at lines 192-194, 228-229

4. `src/app/api/validation/route.ts:10-11`
   - Change: `@/interfaces/IValidationService` → `@/types/validation`
   - Change: `@/interfaces/IFabricPatternController` → `@/types/fabric`

5. `src/app/api/validation/components/route.ts:10`
   - Change: `@/interfaces/IFabricPatternController` → `@/types/fabric`

6. `src/app/api/validation/components/academic-methods/route.ts:7`
   - Change: `@/interfaces/IFabricPatternController` → `@/types/fabric`

7. `src/app/(app)/share/[token]/page.tsx`
   - Fix import if needed
   - Fix await in generateMetadata (line 69)

8. `src/app/(app)/results/[id]/page.tsx`
   - Fix import if needed
   - Fix error variables (lines 37-38, 75-76)

9. `src/components/results/ResultsPage.tsx`
   - Fix import if needed
   - Fix error variables (lines 75-76, 89-90, 124-126)

**Approach**:

- Read each file first
- Use Edit tool for surgical changes
- Fix both imports AND error variables in same edit pass

**Verification**:

```bash
grep -r "@/interfaces/" src/ --exclude-dir=node_modules
# Should return no results
```

---

#### Task 1.4: Fix Catch Block Error Variables

**Estimated Time**: 15 minutes

**Pattern to Fix**:

```typescript
// BEFORE
} catch (_error) {
    console.error('...', error);  // or err

// AFTER
} catch (error) {
    console.error('...', error);
```

**Files Already Covered in Task 1.3**:

- Most will be fixed during import edits
- Double-check all are resolved

**Additional Files to Check**:

- Search for remaining `} catch (_error)` patterns
- Fix any missed ones

**Verification**:

```bash
grep -rn "} catch (_error)" src/ --exclude-dir=node_modules
# Should find only instances where _error is correctly used or commented
```

---

#### Task 1.5: Fix Async Params in Metadata

**Estimated Time**: 5 minutes

**File**: `src/app/(app)/share/[token]/page.tsx:69`

**Change**:

```typescript
// BEFORE
export async function generateMetadata({ params }: SharePageProps) {
  const { token } = params;

// AFTER
export async function generateMetadata({ params }: SharePageProps) {
  const { token } = await params;
```

**Approach**:

- Will be done as part of Task 1.3
- Verify change is correct

---

#### Task 1.6: Verify Compilation

**Estimated Time**: 10 minutes

**Commands**:

```bash
# TypeScript compilation
tsc --noEmit

# Full build
pnpm build

# Check for import errors
grep -r "@/interfaces/" src/ --exclude-dir=node_modules
grep -r "@/services/" src/ --exclude-dir=node_modules | grep -v "analysisAdapter\|ValidationService"
```

**Expected Outcome**:

- Zero TypeScript errors
- Build completes successfully
- All imports resolve
- No error variable mismatches

**Contingency**:

- If errors persist, document in execution report
- Continue to Phase 2 if non-blocking
- Stop if critical compilation failures

---

## FASE 2: Dead Code Removal

### Objective

Remove empty directories and orphaned components

### Tasks

#### Task 2.1: Delete Empty Directories

**Estimated Time**: 5 minutes

**Directories to Check and Delete**:

```bash
# First, verify they're empty or contain only index files
ls -la src/app/api/[...slug]
ls -la src/components/auth
ls -la src/components/providers
ls -la src/contexts
ls -la src/domains
ls -la src/lib/payload
ls -la src/lib/fabric-logging/application
```

**Deletion Commands**:

```bash
rm -rf src/app/api/[...slug]
rm -rf src/components/auth
rm -rf src/components/providers
rm -rf src/contexts
rm -rf src/domains
rm -rf src/lib/payload
rm -rf src/lib/fabric-logging/application
```

**Verification**:

```bash
# Ensure no imports reference these directories
grep -r "from '@/contexts" src/
grep -r "from '@/domains" src/
grep -r "from '@/lib/payload" src/
```

---

#### Task 2.2: Delete Orphaned Components

**Estimated Time**: 10 minutes

**Components to Check**:

1. `src/components/roi/` - Verify no dependencies
2. `src/components/configuration/` - Check TierNotificationBar first
3. `src/components/project-init/` - Verify unused
4. `src/components/dashboard/` - Check ProjectsDashboard first

**Approach**:

- Search for imports of each component
- If no imports found, delete
- If imports exist, document and skip

**Commands**:

```bash
# Check usage before deletion
grep -r "from.*roi/ROIDashboard" src/
grep -r "from.*configuration/TierNotificationBar" src/
grep -r "from.*project-init/" src/
grep -r "from.*dashboard/ProjectsDashboard" src/
```

**Note**: May need to skip some if actively used

---

#### Task 2.3: Delete Orphaned Lib Files

**Estimated Time**: 10 minutes

**Files to Delete**:

```bash
rm src/lib/elicitation.ts
rm src/lib/email.ts
rm src/lib/performance-monitor.ts
rm src/lib/external-api-manager.ts
```

**Verification**:

```bash
# Check for imports
grep -r "elicitation" src/
grep -r "from '@/lib/email'" src/
grep -r "performance-monitor" src/
grep -r "external-api-manager" src/
```

---

#### Task 2.4: Archive Payment Components

**Estimated Time**: 5 minutes

**DO NOT DELETE** - Archive for future use

**Commands**:

```bash
mkdir -p .archive/components
mv src/components/payment .archive/components/
```

**Documentation**:

```bash
echo "Payment components archived $(date)" >> .archive/README.md
echo "Location: .archive/components/payment" >> .archive/README.md
echo "Reason: Pending Stripe integration" >> .archive/README.md
```

---

#### Task 2.5: Verify Build Still Passes

**Estimated Time**: 5 minutes

**Commands**:

```bash
pnpm build
```

**Expected**: Build succeeds with no errors

---

## FASE 3: Auth Infrastructure Removal

### Objective

Remove ~2,000 lines of orphaned auth code

### Tasks

#### Task 3.1: Delete Auth Files

**Estimated Time**: 5 minutes

**Files to Delete**:

```bash
rm src/types/auth.ts
rm src/types/auth-errors.ts
rm src/lib/session-storage.ts
rm src/lib/security/session-limiter.ts
rm src/utils/csrf.ts
rm src/lib/tokens.ts
rm -rf src/app/api/admin/security/metrics
```

**Verification**:

```bash
# Check for imports
grep -r "from '@/types/auth'" src/
grep -r "session-storage" src/
grep -r "session-limiter" src/
grep -r "from '@/utils/csrf'" src/
grep -r "from '@/lib/tokens'" src/
```

---

#### Task 3.2: Edit Payment Components (If Not Archived)

**Estimated Time**: 10 minutes

**If payment components were archived, skip this task**

**Files to Edit** (if exist):

- `src/components/payment/CheckoutModal.tsx`
- `src/components/payment/PaymentHistory.tsx`
- `src/components/payment/SubscriptionManager.tsx`
- `src/components/payment/WalletDisplay.tsx`

**Changes**:
Comment out auth imports with TODO:

```typescript
// TODO: Reintegrar auth quando Payload voltar
// import { useAuth } from '@/hooks/useAuth';
```

---

#### Task 3.3: Clean Redis Auth Keys

**Estimated Time**: 5 minutes

**File**: `src/lib/redis.ts`

**Approach**:

- Read file
- Find auth-related constants
- Comment out with TODO markers
- Verify no breaking changes

**Pattern**:

```typescript
// TODO: Auth keys - restore when Payload returns
// export const AUTH_SESSION_KEY = 'session:';
// export const AUTH_TOKEN_KEY = 'token:';
```

---

#### Task 3.4: Verify Build

**Estimated Time**: 5 minutes

**Commands**:

```bash
pnpm build
```

**Expected**: Build succeeds

---

## FASE 4: Final Report

### Objective

Document everything that was done

### Tasks

#### Task 4.1: Create Execution Report

**Estimated Time**: 15 minutes

**File**: `.claude/reports/AUTONOMOUS-AGENT-EXECUTION-REPORT.md`

**Contents**:

- Metadata (date, duration, status)
- Phase 1 checklist with status
- Phase 2 checklist with status
- Phase 3 checklist with status
- Statistics (files created/edited/deleted)
- Lines of code removed
- Problems encountered
- Decisions made
- Verification commands
- Next steps recommendations

---

#### Task 4.2: Run Final Verification Suite

**Estimated Time**: 5 minutes

**Commands**:

```bash
# Count TypeScript files
find src -name "*.ts" -o -name "*.tsx" | wc -l

# Check compilation
tsc --noEmit

# Build
pnpm build

# Look for remaining issues
grep -r "@/interfaces/" src/
grep -r "} catch (_error)" src/ | grep -E "(err\b|error\b)" | grep -v "_error"
```

---

## Risk Assessment

### High Risk Items

1. **Deleting wrong directories**: Mitigated by checking imports first
2. **Breaking active features**: Mitigated by verifying builds after each phase
3. **Removing needed auth code**: Mitigated by archiving instead of deleting

### Rollback Plan

- All work on `legacy-auth-cleanup` branch
- Can revert individual commits if needed
- Critical files archived, not deleted

---

## Success Criteria

### Must Have (Blocker)

- [ ] `tsc --noEmit` passes with zero errors
- [ ] `pnpm build` completes successfully
- [ ] No broken imports in codebase
- [ ] Dev server starts without errors

### Should Have (Important)

- [ ] Empty directories removed
- [ ] Dead code cleaned up
- [ ] Auth infrastructure archived/removed
- [ ] Execution report complete

### Nice to Have (Optional)

- [ ] Console.log statements removed
- [ ] Error handling improved
- [ ] Documentation updated

---

## Execution Timeline

| Phase | Task               | Duration | Cumulative |
| ----- | ------------------ | -------- | ---------- |
| 0     | Planning           | 10 min   | 0:10       |
| 1.1   | Create services    | 15 min   | 0:25       |
| 1.2   | Create types       | 15 min   | 0:40       |
| 1.3   | Fix imports        | 30 min   | 1:10       |
| 1.4   | Fix catch blocks   | 15 min   | 1:25       |
| 1.5   | Fix async params   | 5 min    | 1:30       |
| 1.6   | Verify compilation | 10 min   | 1:40       |
| 2.1   | Delete empty dirs  | 5 min    | 1:45       |
| 2.2   | Delete components  | 10 min   | 1:55       |
| 2.3   | Delete lib files   | 10 min   | 2:05       |
| 2.4   | Archive payments   | 5 min    | 2:10       |
| 2.5   | Verify build       | 5 min    | 2:15       |
| 3.1   | Delete auth files  | 5 min    | 2:20       |
| 3.2   | Edit payment comps | 10 min   | 2:30       |
| 3.3   | Clean Redis keys   | 5 min    | 2:35       |
| 3.4   | Verify build       | 5 min    | 2:40       |
| 4.1   | Create report      | 15 min   | 2:55       |
| 4.2   | Final verification | 5 min    | 3:00       |

**Total Estimated Time**: 3 hours

---

## Execution Status

**Plan Created**: 2025-10-01
**Execution Status**: READY TO EXECUTE
**Next Step**: Begin FASE 1 - Task 1.1

---

**Agent Ready. Proceeding with autonomous execution.**
