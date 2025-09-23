# Architecture Decisions - User Authentication 2FA
**Architect:** Winston (PRISMA-ARCH)
**Date:** 2025-09-23
**Story:** User Authentication 2FA v0.1

## 🏗️ **DECISÕES ARQUITETURAIS TÉCNICAS**

### **📐 SYSTEM ARCHITECTURE ANALYSIS**

**CURRENT SYSTEM ASSESSMENT:**
- Existing auth: JWT-based with Redis session store
- User management: PostgreSQL with encrypted PII
- Current scale: 10,000+ active users
- Performance requirement: <200ms auth response

### **🎯 ARCHITECTURAL DECISIONS**

#### **AD-001: 2FA Storage Strategy**
**DECISION:** Hybrid approach - Redis + PostgreSQL
- **HOT DATA (Redis):** Active 2FA sessions, rate limiting counters
- **COLD DATA (PostgreSQL):** User 2FA preferences, backup codes, audit logs
- **RATIONALE:** Balance between performance and durability

#### **AD-002: SMS Provider Integration**
**DECISION:** Abstract SMS Gateway with multiple providers
- **PRIMARY:** Twilio (reliability: 99.95%)
- **FALLBACK:** AWS SNS (cost optimization)
- **PATTERN:** Strategy Pattern for provider switching
- **RATIONALE:** Vendor lock-in prevention + cost optimization

#### **AD-003: Security Token Strategy**
**DECISION:** TOTP (Time-based One-Time Password) standard
- **ALGORITHM:** SHA-256 based HMAC
- **INTERVAL:** 30-second windows
- **BACKUP CODES:** 8-digit, single-use, encrypted storage
- **RATIONALE:** Industry standard, wide app support

#### **AD-004: Database Schema Design**
```sql
-- New tables for 2FA system
CREATE TABLE user_2fa_settings (
    user_id UUID PRIMARY KEY REFERENCES users(id),
    method ENUM('sms', 'totp', 'both'),
    phone_encrypted TEXT,
    totp_secret_encrypted TEXT,
    backup_codes_encrypted JSONB,
    enabled_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE user_2fa_attempts (
    id UUID PRIMARY KEY,
    user_id UUID REFERENCES users(id),
    attempt_type ENUM('totp', 'sms', 'backup'),
    success BOOLEAN,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### **AD-005: Migration Strategy**
**DECISION:** Phased rollout with feature flags
- **PHASE 1:** Admin users (week 1)
- **PHASE 2:** Power users opt-in (week 2-3)
- **PHASE 3:** All users gradual rollout (week 4-6)
- **MONITORING:** Real-time dashboards for adoption and issues

### **🔧 TECHNICAL SPECIFICATIONS**

#### **API Endpoints Design**
```typescript
// Core 2FA endpoints
POST /api/v1/auth/2fa/setup
POST /api/v1/auth/2fa/verify
POST /api/v1/auth/2fa/backup-codes/generate
POST /api/v1/auth/2fa/disable
GET  /api/v1/auth/2fa/status

// Admin endpoints
GET  /api/v1/admin/2fa/stats
POST /api/v1/admin/2fa/policy/update
```

#### **Event-Driven Architecture**
```typescript
// Events for system integration
interface User2FAEvents {
  '2fa.enabled': { userId: string, method: string }
  '2fa.verified': { userId: string, success: boolean }
  '2fa.backup_used': { userId: string, remaining: number }
  '2fa.attack_detected': { userId: string, attempts: number }
}
```

### **⚡ PERFORMANCE CONSIDERATIONS**

**CACHING STRATEGY:**
- Rate limiting: Redis with 5-minute TTL
- TOTP validation: In-memory cache for replay prevention
- User settings: Redis cache with 1-hour TTL

**SCALING DECISIONS:**
- Horizontal scaling: Stateless 2FA verification service
- Database: Read replicas for audit log queries
- SMS: Queue-based async processing

### **🔐 SECURITY ARCHITECTURE**

**ENCRYPTION AT REST:**
- All sensitive data: AES-256-GCM
- Key management: AWS KMS with rotation
- Backup codes: Individual encryption per user

**AUDIT & COMPLIANCE:**
- All 2FA events logged with retention: 7 years
- LGPD compliance: Encrypted PII with right to deletion
- Security monitoring: Real-time anomaly detection

### **📊 MONITORING & OBSERVABILITY**

**KEY METRICS:**
- 2FA adoption rate
- Verification success rate
- SMS delivery rate
- Security incident rate

**ALERTS:**
- Failed verification spike (>5% baseline)
- SMS delivery failure rate >2%
- Backup code exhaustion warnings

### **🎯 IMPLEMENTATION ROADMAP**

**READY FOR DEVELOPMENT:**
✅ Database migrations planned
✅ API contracts defined
✅ Security protocols established
✅ Migration strategy approved

**STATUS:** ARCHITECTURE APPROVED - READY FOR IMPLEMENTATION
**NEXT:** Hand off to Development (James) for coding tasks