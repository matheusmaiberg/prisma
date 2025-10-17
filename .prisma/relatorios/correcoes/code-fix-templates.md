# Code Fix Templates - Copy & Paste Ready

**Date**: 2025-10-01
**Purpose**: Quick reference for fixing blocker issues

---

## 📁 File 1: `src/services/analysisAdapter.ts` (CREATE NEW FILE)

```typescript
/**
 * Analysis Adapter Service
 * Handles prompt analysis, history, and improvements
 *
 * @status STUB - Needs full implementation
 * @todo Connect to real backend API
 */

import type { AnalysisResult, AnalysisRequest, HistoryItem } from '@/types/analysis'

/**
 * Analysis Adapter
 * Provides interface for prompt analysis operations
 */
class AnalysisAdapter {
  /**
   * Analyze a prompt using specified method
   */
  async analyze(request: AnalysisRequest): Promise<AnalysisResult> {
    // TODO: Implement real analysis logic
    // For now, return mock data or throw error
    throw new Error('Analysis service not yet implemented')
  }

  /**
   * Retrieve analysis result by ID
   */
  async getAnalysisResult(id: string): Promise<AnalysisResult | null> {
    // TODO: Fetch from database or API
    console.warn('[STUB] getAnalysisResult called with id:', id)
    return null
  }

  /**
   * Get user's analysis history
   */
  async getAnalysisHistory(): Promise<HistoryItem[]> {
    // TODO: Fetch from database or API
    console.warn('[STUB] getAnalysisHistory called')
    return []
  }

  /**
   * Generate improved prompt based on suggestions
   */
  async generateImprovedPrompt(originalPrompt: string, suggestions: any[]): Promise<string> {
    // TODO: Implement prompt improvement logic using AI
    console.warn('[STUB] generateImprovedPrompt called')
    return originalPrompt // Return original for now
  }
}

// Export singleton instance
export const analysisAdapter = new AnalysisAdapter()
```

**Location**: `src/services/analysisAdapter.ts`
**Status**: NEW FILE - Create this
**Size**: ~1 KB

---

## 📁 File 2: `src/services/ValidationService.ts` (CREATE NEW FILE)

```typescript
/**
 * Validation Service
 * System health checks and component validation
 *
 * @status STUB - Needs full implementation
 * @todo Implement actual validation logic
 */

import type { UserTier } from '@/types/fabric'

// ============================================================================
// INTERFACES
// ============================================================================

export interface ValidationConfig {
  includeAPITests?: boolean
  includeAcademicTests?: boolean
  includeSemanticBenchmark?: boolean
  includeROITests?: boolean
  userTier?: UserTier
  testTimeout?: number
  parallel?: boolean
  quickMode?: boolean
}

export interface ValidationReport {
  status: 'passed' | 'failed' | 'warning'
  timestamp: string
  totalTests: number
  passedTests: number
  failedTests: number
  warnings: number
  executionTime: number
  results: ValidationResult[]
}

export interface ValidationResult {
  component: string
  status: 'passed' | 'failed' | 'warning'
  message: string
  executionTime: number
  details?: any
}

export interface APIConnectivityResult {
  apiName: string
  isConnected: boolean
  responseTime?: number
  error?: string
}

export interface AcademicMethodResult {
  methodName: string
  isWorking: boolean
  qualityScore: number
  executionTime: number
  error?: string
}

export interface SemanticBenchmarkResult {
  modelName: string
  isValid: boolean
  accuracy: number
  precision: number
  recall: number
  f1Score: number
}

export interface ROIPipelineResult {
  agentType: string
  isWorking: boolean
  dataAccuracy: number
  pipelineTime: number
  webhookStatus: boolean
  error?: string
}

// ============================================================================
// SERVICE CLASS
// ============================================================================

/**
 * Validation Service
 * Performs system health checks and component validation
 */
export class ValidationService {
  /**
   * Run full system validation
   */
  async validateSystem(config: ValidationConfig): Promise<ValidationReport> {
    console.warn('[STUB] ValidationService.validateSystem called with config:', config)

    // Return stub response
    return {
      status: 'warning',
      timestamp: new Date().toISOString(),
      totalTests: 0,
      passedTests: 0,
      failedTests: 0,
      warnings: 1,
      executionTime: 0,
      results: [
        {
          component: 'validation_service',
          status: 'warning',
          message: 'ValidationService is using stub implementation',
          executionTime: 0,
        },
      ],
    }
  }

  /**
   * Run quick validation (faster, less comprehensive)
   */
  async quickValidation(): Promise<ValidationReport> {
    return this.validateSystem({ quickMode: true })
  }

  /**
   * Test connectivity to external APIs
   */
  async testAPIConnectivity(timeout: number): Promise<APIConnectivityResult[]> {
    console.warn('[STUB] ValidationService.testAPIConnectivity called with timeout:', timeout)
    return []
  }

  /**
   * Test academic methods (BMAD, semantic, etc.)
   */
  async testAcademicMethods(userTier: UserTier): Promise<AcademicMethodResult[]> {
    console.warn('[STUB] ValidationService.testAcademicMethods called for tier:', userTier)
    return []
  }

  /**
   * Benchmark semantic analysis models
   */
  async benchmarkSemanticAnalysis(models: string[]): Promise<SemanticBenchmarkResult[]> {
    console.warn('[STUB] ValidationService.benchmarkSemanticAnalysis called for models:', models)
    return []
  }

  /**
   * Test ROI pipeline for agent types
   */
  async testROIPipeline(agentTypes: string[]): Promise<ROIPipelineResult[]> {
    console.warn('[STUB] ValidationService.testROIPipeline called for agents:', agentTypes)
    return []
  }

  /**
   * Run self-diagnostic and attempt repairs
   */
  async selfDiagnoseAndRepair(): Promise<ValidationResult[]> {
    console.warn('[STUB] ValidationService.selfDiagnoseAndRepair called')
    return [
      {
        component: 'self_diagnose',
        status: 'warning',
        message: 'Self-diagnose is using stub implementation',
        executionTime: 0,
      },
    ]
  }
}
```

**Location**: `src/services/ValidationService.ts`
**Status**: NEW FILE - Create this
**Size**: ~3 KB

---

## 📁 File 3: `src/types/validation.ts` (CREATE NEW FILE)

```typescript
/**
 * Validation System Types
 * Types for system health checks and component validation
 */

import type { UserTier } from './fabric'

export interface ValidationConfig {
  includeAPITests?: boolean
  includeAcademicTests?: boolean
  includeSemanticBenchmark?: boolean
  includeROITests?: boolean
  userTier?: UserTier
  testTimeout?: number
  parallel?: boolean
  quickMode?: boolean
}

export interface ValidationReport {
  status: 'passed' | 'failed' | 'warning'
  timestamp: string
  totalTests: number
  passedTests: number
  failedTests: number
  warnings: number
  executionTime: number
  results: ValidationResult[]
}

export interface ValidationResult {
  component: string
  status: 'passed' | 'failed' | 'warning'
  message: string
  executionTime: number
  details?: any
}
```

**Location**: `src/types/validation.ts`
**Status**: NEW FILE - Create this

---

## 📁 File 4: `src/types/project.ts` (CREATE NEW FILE)

```typescript
/**
 * Project Management Types
 * Types for project lifecycle, dashboard, and management
 */

import type { Template } from './project-templates'

export interface ProjectsDashboardData {
  projects: ProjectLifecycleStatus[]
  quota: ProjectQuota
  availableTemplates: Template[]
  statistics: ProjectStatistics
  pagination: PaginationInfo
}

export interface ProjectLifecycleStatus {
  id: string
  name: string
  status: 'active' | 'draft' | 'paused' | 'completed' | 'archived'
  createdAt: Date
  updatedAt: Date
  template: string
  setupProgress: number
  metrics?: ProjectMetrics
}

export interface ProjectMetrics {
  totalAnalyses: number
  lastActivity: Date
  conversionRate?: number
}

export interface ProjectQuota {
  maxProjects: number
  activeProjects: number
  canCreateMore: boolean
  remaining: number
}

export interface ProjectStatistics {
  totalProjects: number
  activeProjects: number
  completedProjects: number
  averageSetupTime: number
  conversionRate: number
}

export interface PaginationInfo {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProjectManagementOptions {
  page?: number
  limit?: number
  sortBy?: 'updated' | 'created' | 'name' | 'status'
  sortOrder?: 'asc' | 'desc'
  statusFilter?: ProjectLifecycleStatus['status'][]
}

export interface ProjectConfig {
  name: string
  description: string
  templateId: string
  tags?: string[]
  isPrivate?: boolean
}

export interface ProjectCreationResult {
  success: boolean
  message: string
  projectId?: string
}
```

**Location**: `src/types/project.ts`
**Status**: NEW FILE - Create this

---

## 📁 File 5: `src/types/roi.ts` (CREATE NEW FILE)

```typescript
/**
 * ROI Dashboard Types
 * Types for ROI tracking, metrics, and dashboard visualization
 */

export enum AgentType {
  SDR = 'sdr',
  VENDAS = 'vendas',
  SUPORTE = 'suporte',
  ONBOARDING = 'onboarding',
}

export interface DashboardData {
  metrics: DashboardMetrics
  trends: DashboardTrends
  alerts?: DashboardAlert[]
}

export interface DashboardMetrics {
  conversion: ConversionMetrics
  responseTime: ResponseTimeMetrics
  satisfaction: SatisfactionMetrics
  roi: ROIMetrics
}

export interface ConversionMetrics {
  conversionRate: number
  totalInteractions: number
  conversions: number
  averageTimeToConversion: number
  revenueGenerated: number
}

export interface ResponseTimeMetrics {
  averageResponseTime: number
  medianResponseTime: number
  p95ResponseTime: number
  totalRequests: number
}

export interface SatisfactionMetrics {
  averageScore: number
  totalRatings: number
  distribution: Record<number, number>
}

export interface ROIMetrics {
  investmentAmount: number
  roiPercentage: number
  ltv: number
  cac: number
}

export interface DashboardTrends {
  weekly: WeeklyTrend[]
  monthly?: MonthlyTrend[]
}

export interface WeeklyTrend {
  week: string
  conversions: number
  satisfaction: number
}

export interface MonthlyTrend {
  month: string
  conversions: number
  revenue: number
}

export interface DashboardAlert {
  type: 'critical' | 'warning' | 'info'
  message: string
  currentValue: number
  threshold: number
}
```

**Location**: `src/types/roi.ts`
**Status**: NEW FILE - Create this

---

## 📁 File 6: `src/types/tier.ts` (CREATE NEW FILE)

```typescript
/**
 * Tier System Types
 * Types for tier restrictions, configurations, and notifications
 */

export interface TierRestriction {
  feature: string
  requiredTier: 'FREE' | 'PREMIUM' | 'ENTERPRISE'
  reason?: string
}

export interface TierConfig {
  name: string
  color: string
  bgColor: string
  borderColor: string
  textColor: string
  price?: string
}
```

**Location**: `src/types/tier.ts`
**Status**: NEW FILE - Create this

---

## 🔧 Find & Replace Patterns

### Pattern 1: Fix Error Variable Names

**Find:**

```typescript
} catch (_error) {
    console.error('
```

**Replace with:**

```typescript
} catch (error) {
    console.error('
```

**Files Affected**: 8 files
**Tool**: VS Code Find & Replace (Regex mode OFF)

---

### Pattern 2: Update Interface Imports

**Find:**

```typescript
from '@/interfaces/
```

**Replace with:**

```typescript
from '@/types/
```

**Files Affected**: 6 files
**Tool**: VS Code Find & Replace (Regex mode OFF)

---

### Pattern 3: Fix Async Params

**Find:**

```typescript
export async function generateMetadata({ params }:
```

**Look for pattern:**

```typescript
const { token } = params
```

**Replace with:**

```typescript
const { token } = await params
```

**Files Affected**: 1 file (`src/app/(app)/share/[token]/page.tsx`)

---

## 🔍 Specific File Edits

### Edit 1: `src/components/configuration/TierNotificationBar.tsx`

**Line 24 - BEFORE:**

```typescript
import { TierRestriction } from '@/interfaces/IParameterConfigurationService'
```

**Line 24 - AFTER:**

```typescript
import { TierRestriction } from '@/types/tier'
```

---

### Edit 2: `src/components/dashboard/ProjectsDashboard.tsx`

**Lines 12-17 - BEFORE:**

```typescript
import {
  ProjectsDashboardData,
  ProjectLifecycleStatus,
  ProjectManagementOptions,
  ProjectConfig,
  ProjectCreationResult,
} from '@/interfaces/IProjectService'
```

**Lines 12-17 - AFTER:**

```typescript
import {
  ProjectsDashboardData,
  ProjectLifecycleStatus,
  ProjectManagementOptions,
  ProjectConfig,
  ProjectCreationResult,
} from '@/types/project'
```

**Line 153 - BEFORE:**

```typescript
    } catch (_error) {
      setError('Erro ao carregar dados do dashboard')
      console.error('Erro no dashboard:', err)
```

**Line 153 - AFTER:**

```typescript
    } catch (error) {
      setError('Erro ao carregar dados do dashboard')
      console.error('Erro no dashboard:', error)
```

---

### Edit 3: `src/components/roi/ROIDashboard.tsx`

**Line 53 - BEFORE:**

```typescript
import { AgentType, DashboardData } from '@/interfaces/IROITracker'
```

**Line 53 - AFTER:**

```typescript
import { AgentType, DashboardData } from '@/types/roi'
```

**Lines 192-194 - BEFORE:**

```typescript
    } catch (_error) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      console.error('Erro ao carregar dashboard:', err);
```

**Lines 192-194 - AFTER:**

```typescript
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Erro desconhecido');
      console.error('Erro ao carregar dashboard:', error);
```

**Lines 228-229 - BEFORE:**

```typescript
    } catch (_error) {
      console.error('Erro ao baixar relatório:', err);
```

**Lines 228-229 - AFTER:**

```typescript
    } catch (error) {
      console.error('Erro ao baixar relatório:', error);
```

---

### Edit 4: `src/app/api/validation/route.ts`

**Lines 10-11 - BEFORE:**

```typescript
import type { ValidationConfig } from '@/interfaces/IValidationService'
import type { UserTier } from '@/interfaces/IFabricPatternController'
```

**Lines 10-11 - AFTER:**

```typescript
import type { ValidationConfig } from '@/types/validation'
import type { UserTier } from '@/types/fabric'
```

---

### Edit 5: `src/app/api/validation/components/route.ts`

**Line 10 - BEFORE:**

```typescript
import type { UserTier } from '@/interfaces/IFabricPatternController'
```

**Line 10 - AFTER:**

```typescript
import type { UserTier } from '@/types/fabric'
```

---

### Edit 6: `src/app/api/validation/components/academic-methods/route.ts`

**Line 7 - BEFORE:**

```typescript
import type { UserTier } from '@/interfaces/IFabricPatternController'
```

**Line 7 - AFTER:**

```typescript
import type { UserTier } from '@/types/fabric'
```

---

### Edit 7: `src/app/(app)/results/[id]/page.tsx`

**Lines 37-38 - BEFORE:**

```typescript
  } catch (_error) {
    console.error('Error loading analysis result:', error);
```

**Lines 37-38 - AFTER:**

```typescript
  } catch (error) {
    console.error('Error loading analysis result:', error);
```

**Lines 75-76 - BEFORE:**

```typescript
  } catch (_error) {
    console.error('Error generating metadata:', error);
```

**Lines 75-76 - AFTER:**

```typescript
  } catch (error) {
    console.error('Error generating metadata:', error);
```

---

### Edit 8: `src/app/(app)/share/[token]/page.tsx`

**Line 69 - BEFORE:**

```typescript
export async function generateMetadata({ params }: SharePageProps) {
  const { token } = params;
```

**Line 69 - AFTER:**

```typescript
export async function generateMetadata({ params }: SharePageProps) {
  const { token } = await params;
```

---

### Edit 9: `src/components/results/ResultsPage.tsx`

**Multiple catch blocks - Replace all instances:**

**BEFORE:**

```typescript
} catch (_error) {
  console.error('...', err);
```

**AFTER:**

```typescript
} catch (error) {
  console.error('...', error);
```

**Affected Lines**: 75-76, 89-90, 124-126

---

## ✅ Verification Commands

After making all changes, run these commands in order:

```bash
# 1. Check if new files were created
ls -la src/services/analysisAdapter.ts
ls -la src/services/ValidationService.ts
ls -la src/types/validation.ts
ls -la src/types/project.ts
ls -la src/types/roi.ts
ls -la src/types/tier.ts

# 2. Check for remaining broken imports
grep -r "@/interfaces/" src/ --exclude-dir=node_modules

# Expected: No results (or only comments)

# 3. Check for error variable issues
grep -rn "} catch (_error)" src/ --exclude-dir=node_modules | grep -E "(err\b|error\b)" | grep -v "_error"

# Expected: No results

# 4. TypeScript compilation
pnpm run type-check
# or
tsc --noEmit

# Expected: No errors (warnings OK)

# 5. Build test
pnpm run build

# Expected: Build succeeds

# 6. Start dev server
pnpm run dev

# Expected: Server starts, no compilation errors
```

---

## 📝 Checklist

Copy this to track your progress:

```markdown
### Files Created:

- [ ] `src/services/analysisAdapter.ts`
- [ ] `src/services/ValidationService.ts`
- [ ] `src/types/validation.ts`
- [ ] `src/types/project.ts`
- [ ] `src/types/roi.ts`
- [ ] `src/types/tier.ts`

### Imports Fixed:

- [ ] TierNotificationBar.tsx
- [ ] ProjectsDashboard.tsx
- [ ] ROIDashboard.tsx
- [ ] validation/route.ts
- [ ] validation/components/route.ts
- [ ] validation/components/academic-methods/route.ts

### Error Variables Fixed:

- [ ] results/[id]/page.tsx (2 locations)
- [ ] share/[token]/page.tsx (1 location)
- [ ] ResultsPage.tsx (3 locations)
- [ ] ProjectsDashboard.tsx (1 location)
- [ ] ROIDashboard.tsx (2 locations)

### Async Params Fixed:

- [ ] share/[token]/page.tsx (generateMetadata)

### Verification:

- [ ] No @/interfaces/ imports remain
- [ ] TypeScript compiles without errors
- [ ] Build succeeds
- [ ] Dev server starts
```

---

**End of Code Fix Templates**
