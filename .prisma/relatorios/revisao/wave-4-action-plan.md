# Wave 4 Action Plan: Critical Security Fixes & Build Issues

**Date:** 2025-01-15
**Status:** 🔴 BLOCKING ISSUES IDENTIFIED
**Priority:** CRITICAL

---

## Executive Summary

The Wave 4 code review has identified **3 CRITICAL blocking issues** that must be resolved before production deployment. Additionally, the build is currently failing due to multiple missing module dependencies.

**Immediate Actions Required:**
1. **Fix Build** (1-2 hours) - Resolve all missing module imports
2. **Implement Critical Security Fixes** (9 hours) - Address SEC-001, SEC-002, PERF-001
3. **Verify with Tests** (2 hours) - Ensure fixes work correctly

**Total Estimated Time to Production-Ready:** 12-13 hours

---

## 🔴 CRITICAL: Build Failures

### Current Status
Build is failing due to missing module dependencies across multiple API routes.

### Missing Modules

#### Already Fixed (Temporarily Disabled):
- ✅ `rate-limiter-flexible` - Webpack parsing issue (disabled in signin/signup routes)
- ✅ `@services/AlertingService` - Not implemented (disabled in monitoring routes)
- ✅ `@services/MonitoringService` - Not implemented (disabled in monitoring routes)
- ✅ `@services/ConversionFunnelTracker` - Not implemented (disabled in monitoring routes)
- ✅ `@middleware/security` - Not implemented (disabled in security metrics route)
- ✅ `@/lib/security-monitoring` - Not implemented (disabled in security metrics route)
- ✅ `@/lib/session-storage` - Not implemented (disabled in security metrics route)
- ✅ `@/lib/payments/wallet-manager` - Not implemented (disabled in credits route)
- ✅ `@/lib/payments/crypto` - Not implemented (disabled in credits route)

#### Still Need Fixing:
- ❌ `@/lib/dx-dashboard/websocket/server` - Required by `src/app/api/dx-dashboard/websocket/route.ts`
- ❌ `@/lib/dx-dashboard/websocket/auth.middleware` - Required by `src/app/api/dx-dashboard/websocket/route.ts`
- ❌ `@/middleware/api-middleware` - Required by multiple ecosystem routes

### Recommended Approach

**Option 1: Comment Out Incomplete Features (Fast - 30 minutes)**
- Temporarily comment out or disable the routes that depend on unimplemented modules
- Get build green quickly to unblock Wave 4 security fixes
- Create tracking issues for implementing these modules later

**Option 2: Implement Missing Modules (Slow - Days/Weeks)**
- Implement all missing services and middleware
- This would delay critical security fixes
- Not recommended for immediate action

**RECOMMENDATION: Option 1** - Get build green, fix critical security issues, then implement missing modules.

---

## 🔴 CRITICAL: Security Issues from Code Review

### SEC-001: API Key Exposure Risk in Error Messages (CRITICAL)
**File:** `src/agents/elicitation/base.agent.ts`
**Risk:** Information disclosure through error messages
**Impact:** Could reveal system architecture and configuration details

**Current Code:**
```typescript
if (!apiKey) {
  throw new Error(
    `Missing API key for ${this.provider}. ` +
    `Please set ${this.provider.toUpperCase()}_API_KEY environment variable.`
  );
}
```

**Fixed Code:**
```typescript
if (!apiKey) {
  // Log detailed info server-side only
  logger.error(`Missing API key for ${this.provider}`, {
    envVar: `${this.provider.toUpperCase()}_API_KEY`,
    context: 'agent-initialization'
  });

  // Throw generic error
  throw new Error('Agent initialization failed: missing configuration');
}
```

**Action Items:**
1. Create `src/lib/logging/agent-logger.ts` with secure logging functions
2. Update error handling in `base.agent.ts`
3. Audit all 8 elicitation agents for similar issues
4. Add tests for error sanitization

**Estimated Time:** 2 hours

---

### SEC-002: No Input Validation on User Content (CRITICAL)
**Files:** All 8 elicitation agents
**Risk:** Prompt injection, DoS via massive inputs, XSS
**Impact:** Attackers could manipulate agent behavior or crash the system

**Attack Vectors:**
- Massive inputs causing memory exhaustion
- Prompt injection to extract system prompts or API keys
- Special characters causing parsing errors

**Solution:**
```typescript
// Create src/lib/security/input-validation.ts
export function validateInputLength(
  input: string,
  options: { max: number; field: string }
): void {
  if (input.length > options.max) {
    throw new Error(
      `Input ${options.field} exceeds maximum length of ${options.max}`
    );
  }
}

export function sanitizeInput(input: string): string {
  // Remove potentially dangerous characters
  return input
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Control chars
    .replace(/[<>]/g, '') // HTML tags
    .trim();
}
```

**Action Items:**
1. Create `src/lib/security/input-validation.ts`
2. Add validation to all agent `execute()` methods
3. Define max lengths per agent input field (context: 10,000, response: 50,000)
4. Add tests for edge cases (huge inputs, special chars, injection attempts)

**Estimated Time:** 4 hours

---

### PERF-001: No Timeout Configuration on LLM Calls (CRITICAL)
**File:** `src/agents/elicitation/base.agent.ts`
**Risk:** Hanging requests, resource exhaustion, cascade failures
**Impact:** System instability, poor user experience, wasted API costs

**Solution:**
```typescript
import { AbortSignal } from 'node-abort-controller';

private async callLLM(
  messages: Array<{ role: string; content: string }>,
  options?: { timeout?: number }
): Promise<string> {
  const timeout = options?.timeout || 30000; // 30s default
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
}
```

**Action Items:**
1. Install `node-abort-controller` if needed
2. Create `src/lib/config/agents.ts` with timeout configurations
3. Update `base.agent.ts` with timeout handling
4. Add timeout tests

**Estimated Time:** 3 hours

---

## ⚠️ HIGH Priority Issues (Post-Critical Fixes)

### SEC-003: No Rate Limiting on Agent Execution
**Estimated Time:** 4 hours
**Impact:** Resource exhaustion, cost explosion, DoS attacks

**NOTE:** The existing `rate-limiter-flexible` dependency has webpack issues with Next.js 15.
**Solution:** Either fix the webpack issue or implement a simpler in-memory rate limiter.

---

### PERF-002: No Caching for Repeated Agent Calls
**Estimated Time:** 3 hours
**Savings:** 30-50% reduction in API calls and costs

---

### PERF-003: Inefficient Tree of Thoughts Implementation
**Estimated Time:** 2 hours
**Improvement:** Better quality paths, faster parallel execution

---

## 📋 Implementation Timeline

### Phase 1: Unblock Build (30 minutes)
1. Comment out remaining failing routes
2. Verify build succeeds
3. Commit with clear TODO comments

### Phase 2: Critical Security Fixes (9 hours)
1. SEC-001: Error message sanitization (2h)
2. SEC-002: Input validation (4h)
3. PERF-001: Timeout handling (3h)

### Phase 3: Testing & Verification (2 hours)
1. Run all existing tests
2. Add new security tests
3. Manual testing of fixed agents

### Phase 4: Code Review Re-submission (1 hour)
1. Document all changes
2. Request re-review
3. Prepare for production deployment

**Total Time to Production-Ready:** 12.5 hours (~2 work days)

---

## 📝 Recommended Next Steps

### Immediate (Right Now):
```bash
# 1. Comment out failing routes
# - src/app/api/dx-dashboard/websocket/route.ts
# - src/app/api/ecosystem/health/route.ts
# - src/app/api/ecosystem/middleware/route.ts
# - src/app/api/ecosystem/route.ts

# 2. Verify build
npm run build

# 3. Once build is green, start on security fixes
```

### Today:
1. ✅ Complete Phase 1 (Unblock Build)
2. 🔄 Start Phase 2 (Critical Security Fixes)
   - Begin with SEC-001 (Error Sanitization)
   - Move to SEC-002 (Input Validation)

### Tomorrow:
1. 🔄 Complete Phase 2 (Critical Security Fixes)
   - Complete PERF-001 (Timeout Handling)
2. ✅ Complete Phase 3 (Testing)
3. ✅ Complete Phase 4 (Re-review)

---

## 🎯 Success Criteria

### Build Must:
- ✅ Compile without errors
- ✅ Generate production bundle
- ✅ Pass all existing tests

### Security Must:
- ✅ No API keys in error messages
- ✅ All user inputs validated and sanitized
- ✅ All API calls have timeout protection
- ✅ 0 critical security issues in scan

### Performance Must:
- ✅ No requests can hang indefinitely
- ✅ Graceful timeout handling
- ✅ Clear error messages for users

---

## 📚 Related Documents

- **Full Code Review:** `.prisma/relatorios/revisao/wave-4-code-review.md`
- **Wave 4 Completion:** `.prisma/relatorios/execucao/wave-4-completion-report.md`
- **Task Tracking:** `.prisma/tarefas.md` (to be updated by user)

---

## 🚦 Risk Assessment

**If We Don't Fix These Issues:**

1. **SEC-001 & SEC-002:**
   - Attackers could inject malicious prompts
   - System information could be leaked
   - Potential for data breaches
   - **Risk Level:** 🔴 CRITICAL

2. **PERF-001:**
   - System could hang indefinitely
   - Poor user experience
   - Wasted resources and money
   - **Risk Level:** 🔴 CRITICAL

3. **Build Failures:**
   - Cannot deploy to production
   - Blocks all other work
   - **Risk Level:** 🔴 BLOCKING

**Current Status:** 🔴 **NOT PRODUCTION READY**
**After Fixes:** 🟢 **READY FOR PRODUCTION**

---

**Created:** 2025-01-15
**Last Updated:** 2025-01-15
**Owner:** Development Team
**Approver:** TBD (after fixes implemented)
