# Iteration 05 — Buildable Spec: Multi-Tenant Foundation for kamunity.ai

**Date:** 2026-02-13
**Type:** Buildable micro-spec — the first concrete build output from 5 iterations
**Triage outcome:** Extend (Step 3) — extend kamunity.ai with multi-tenant architecture
**Target member:** The Pack Music Co-operative
**Target executor:** FactoryK / Windy
**Tech stack:** Next.js 14 (App Router) + Supabase + Prisma + Tailwind CSS on Netlify

---

## 1. Problem Statement

The Pack Music wants a branded sovereign space on Kamunity infrastructure. They need it to look and feel like The Pack's own platform — their logo, their colours, their rooms — while benefiting from kamunity.ai's shared infrastructure, features, and development pipeline.

Currently, kamunity.ai is a single-tenant platform. All 500+ members see the same branding, the same room discovery, the same experience. There is no concept of a "tenant" — an organisation that owns a branded subset of the platform.

This spec adds the multi-tenant data foundation and subdomain routing that makes branded spaces possible.

---

## 2. What "Done" Looks Like — Acceptance Criteria

### AC1: Tenant Data Model Exists
- [ ] A `tenants` table exists in the database with: id (uuid), name (string), slug (string, unique), logo_url (string, nullable), primary_color (string, nullable), secondary_color (string, nullable), custom_domain (string, nullable), created_at, updated_at
- [ ] A `tenant_id` (uuid, nullable, foreign key to tenants) column exists on the `rooms` table
- [ ] Rooms with `tenant_id = NULL` remain public kamunity.ai rooms (backward compatible)
- [ ] Prisma schema reflects these changes and migrations run cleanly

### AC2: Subdomain Routing Works
- [ ] Visiting `thepack.kamunity.ai` resolves to the kamunity.ai application with The Pack's tenant context injected
- [ ] Visiting `kamunity.ai` (no subdomain) continues to work as the main platform
- [ ] The tenant slug is extracted from the subdomain in Next.js middleware
- [ ] If the subdomain doesn't match any tenant slug, redirect to main `kamunity.ai`
- [ ] The resolved tenant object is available to all server components and API routes via request context

### AC3: Tenant-Scoped Room Discovery
- [ ] When visiting `thepack.kamunity.ai`, room discovery shows only rooms where `tenant_id` matches The Pack's tenant
- [ ] When visiting `kamunity.ai`, room discovery shows rooms where `tenant_id IS NULL` (public rooms) — existing behaviour unchanged
- [ ] Rooms can be created within a tenant context (assigned the tenant's `tenant_id`)
- [ ] Existing rooms (500+ members' rooms) continue to work with `tenant_id = NULL`

### AC4: Tenant Theming Applies
- [ ] When visiting `thepack.kamunity.ai`, the platform displays The Pack's logo (from `tenants.logo_url`)
- [ ] Primary and secondary colors from the tenant config are applied via CSS custom properties
- [ ] The platform name in the header/nav reflects the tenant name ("The Pack" not "Kamunity")
- [ ] When visiting `kamunity.ai`, default Kamunity branding applies (campfire aesthetic unchanged)
- [ ] Theming is CSS-variable-driven, not hardcoded — any tenant can configure their own colors

### AC5: Tenant Admin Basics
- [ ] A tenant owner can update their tenant's name, logo, and colors from a settings page
- [ ] Tenant ownership is linked to a Supabase auth user (the person who created the tenant or was assigned ownership)
- [ ] Only the tenant owner can modify tenant settings

### AC6: Data Isolation
- [ ] Supabase Row Level Security policies ensure that tenant-scoped rooms are only visible to users within that tenant's context
- [ ] A user visiting `thepack.kamunity.ai` cannot see rooms belonging to a different tenant
- [ ] A user visiting `kamunity.ai` cannot see tenant-scoped rooms (only public rooms)
- [ ] RLS policies do not break existing functionality for the 500+ members on the main platform

### AC7: Zero Regression
- [ ] All existing rooms, members, events, chat, files, polls continue to work exactly as before
- [ ] No data loss during migration
- [ ] No breaking changes to existing API routes
- [ ] Existing URLs continue to resolve correctly

---

## 3. Technical Design

### 3.1 Database Schema Changes (Prisma)

```prisma
model Tenant {
  id             String   @id @default(uuid())
  name           String
  slug           String   @unique
  logoUrl        String?  @map("logo_url")
  primaryColor   String?  @map("primary_color")   // hex, e.g. "#FF6B35"
  secondaryColor String?  @map("secondary_color") // hex
  customDomain   String?  @unique @map("custom_domain")
  ownerId        String   @map("owner_id")        // Supabase auth user id
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")
  
  rooms          Room[]
  
  @@map("tenants")
}
```

**Rooms table addition:**
```prisma
model Room {
  // ... existing fields ...
  tenantId  String?  @map("tenant_id")
  tenant    Tenant?  @relation(fields: [tenantId], references: [id])
}
```

### 3.2 Supabase Row Level Security

```sql
-- Tenant isolation for rooms
-- When app.current_tenant is set (subdomain visit), show only that tenant's rooms
-- When app.current_tenant is not set (main site), show only public rooms (tenant_id IS NULL)

CREATE POLICY "tenant_room_isolation" ON rooms
FOR SELECT USING (
  CASE
    WHEN current_setting('app.current_tenant', true) IS NOT NULL 
      AND current_setting('app.current_tenant', true) != ''
    THEN tenant_id = current_setting('app.current_tenant')::uuid
    ELSE tenant_id IS NULL
  END
);

-- Tenant owners can manage their tenant
CREATE POLICY "tenant_owner_manage" ON tenants
FOR ALL USING (
  owner_id = auth.uid()::text
);
```

### 3.3 Next.js Middleware (Subdomain Routing)

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  const mainDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'kamunity.ai'
  
  // Extract subdomain
  const subdomain = hostname
    .replace(`.${mainDomain}`, '')
    .replace(`:${process.env.PORT || 3000}`, '') // dev support
  
  // No subdomain or www — main site
  if (subdomain === mainDomain || subdomain === 'www' || subdomain === hostname) {
    return NextResponse.next()
  }
  
  // Rewrite to tenant route with subdomain context
  const url = request.nextUrl.clone()
  url.pathname = `/tenant/${subdomain}${url.pathname}`
  
  const response = NextResponse.rewrite(url)
  response.headers.set('x-tenant-slug', subdomain)
  return response
}

export const config = {
  matcher: ['/((?!api|_next|static|favicon.ico).*)'],
}
```

### 3.4 Tenant Context Provider

```typescript
// lib/tenant.ts
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export const getCurrentTenant = cache(async () => {
  const headersList = headers()
  const tenantSlug = headersList.get('x-tenant-slug')
  
  if (!tenantSlug) return null
  
  const tenant = await prisma.tenant.findUnique({
    where: { slug: tenantSlug }
  })
  
  return tenant
})
```

### 3.5 Tenant Theming (CSS Variables)

```typescript
// components/TenantThemeProvider.tsx
import { getCurrentTenant } from '@/lib/tenant'

export async function TenantThemeProvider({ children }: { children: React.ReactNode }) {
  const tenant = await getCurrentTenant()
  
  const style = tenant ? {
    '--brand-primary': tenant.primaryColor || 'var(--kamunity-primary)',
    '--brand-secondary': tenant.secondaryColor || 'var(--kamunity-secondary)',
  } as React.CSSProperties : {}
  
  return (
    <div style={style}>
      {children}
    </div>
  )
}
```

### 3.6 Tenant-Scoped Room Queries

```typescript
// Existing room discovery query, amended:
async function discoverRooms(tenantId: string | null) {
  return prisma.room.findMany({
    where: {
      tenantId: tenantId, // null = public rooms, uuid = tenant rooms
      // ... existing filters (public, active, etc.)
    },
    // ... existing ordering, pagination
  })
}
```

---

## 4. Migration Strategy (Live Platform Safety)

kamunity.ai has 500+ members and 100+ rooms. Migration must be zero-downtime and zero-regression.

### Step 1: Add schema, don't change behaviour
1. Add `tenants` table (empty — no tenants yet)
2. Add `tenant_id` column to rooms as **nullable** with default `NULL`
3. Run migration — all existing rooms get `tenant_id = NULL` automatically
4. Deploy — zero behaviour change. All existing rooms remain visible as before.

### Step 2: Add middleware, inactive by default
1. Deploy subdomain middleware — but with no tenant records in the database, no subdomain will match, so middleware is effectively a no-op for unrecognised subdomains
2. Deploy tenant context provider and theming — no tenant to load, so defaults apply

### Step 3: Create The Pack's tenant record
1. Insert one row in `tenants`: name="The Pack Music", slug="thepack", logo_url, colors, owner_id
2. `thepack.kamunity.ai` now resolves — but shows no rooms (no rooms assigned to this tenant yet)

### Step 4: Assign rooms
1. The Pack creates new rooms within their tenant context — these get `tenant_id = thepack_uuid`
2. Or: existing rooms that belong to Pack Music can be migrated by updating their `tenant_id`

### Step 5: Enable RLS
1. Add Supabase RLS policies for tenant isolation
2. Test thoroughly — existing rooms must remain visible on main site, Pack rooms visible only on Pack subdomain

---

## 5. What This Spec Does NOT Cover

| Out of Scope | Why | When |
|-------------|-----|------|
| **Outbound cross-posting** (Mastodon/Bluesky) | Separate workstream; needs tenant foundation first | Step 2 — after multi-tenant is stable |
| **Full ActivityPub federation** | High complexity; cross-posting delivers 80% value first | Step 3 — after cross-posting proves the model |
| **Custom domains** (e.g., `rooms.packmusic.au`) | Requires DNS config and Netlify custom domain setup | Future — subdomain first, custom domain later |
| **Tenant billing** | Pricing model for tenants not yet defined | Business decision, not technical |
| **Inter-tenant room sharing** | Rooms shared across tenants adds complexity | Future — single-tenant isolation first |
| **Tenant member management** | Who belongs to a tenant, invites, roles | Next micro-spec after foundation |
| **Mobile/PWA subdomain handling** | PWA scope may need adjustment per tenant | Testing phase |
| **Other member requests** (notifications, permissions, file mgmt) | Separate specs; benefit from multi-tenant architecture | Separate iterations |

---

## 6. Risks and Mitigations

| Risk | Severity | Mitigation |
|------|----------|-----------|
| **Database migration breaks existing data** | High | Nullable `tenant_id` with default NULL — zero change to existing rows. Test on staging first. |
| **Subdomain routing conflicts with Netlify** | Medium | Netlify supports wildcard subdomains on custom domains. Test with `*.kamunity.ai` DNS record. |
| **RLS policies lock out existing users** | High | Deploy RLS AFTER verifying schema changes are stable. Test policies against existing queries. |
| **Performance hit from tenant resolution per request** | Low | Tenant lookup is cached via React `cache()`. Slug-based lookup is indexed. |
| **The Pack's needs evolve during build** | Medium | This spec is Step 1 of multiple. Ship foundation, get feedback, iterate. |
| **Prisma migration on live Supabase** | Medium | Use Prisma `db push` or `migrate deploy` — standard process. Backup database before migration. |

---

## 7. Implementation Order (for FactoryK/Windy)

```
1. Prisma schema: Add Tenant model + tenant_id to Room       [~2 hours]
2. Run migration on development/staging                       [~30 min]
3. Next.js middleware: Subdomain detection + rewrite          [~2 hours]
4. Tenant context: getCurrentTenant() + TenantThemeProvider   [~2 hours]
5. Room discovery: Tenant-scoped query filter                 [~1 hour]
6. Tenant admin: Settings page for name/logo/colors           [~3 hours]
7. RLS policies: Tenant isolation on rooms table              [~2 hours]
8. Seed The Pack Music tenant record                          [~30 min]
9. Test: Full flow on staging (subdomain → theming → rooms)   [~2 hours]
10. Deploy to production                                      [~1 hour]
```

**Estimated total: ~16 hours of focused development.**

---

## 8. Triage Summary

| Step | Assessment | Outcome |
|------|-----------|---------|
| 1. Find | No existing platform combines rooms + calendar + files + polls + white-label + federation | Not resolved |
| 2. Connect | Connecting Pack Music to partial solutions recreates integration gap | Not resolved |
| **3. Extend** | **kamunity.ai can be extended with proven multi-tenant patterns (Next.js subdomain + Supabase RLS + Prisma tenant_id)** | **RESOLVED** |
| 4. Integrate | N/A — extending one platform, not connecting separate tools | Skipped |
| 5. Build | N/A — kamunity.ai exists. This is Extend, not Build. | Skipped |

**Triage is honest.** This resolves at Extend because kamunity.ai exists with real users and real features, and the extension uses proven patterns that don't require novel engineering. This is not Build dressed up as Extend — the multi-tenant patterns (Next.js middleware, Supabase RLS, Prisma schema) are standard and documented.

---

## 9. Constitutional Check (Inline)

- **Sovereignty First:** Multi-tenant architecture gives The Pack their own space, their own branding, their own room scoping. They don't depend on Kamunity's branding or discovery. Their data is isolated by RLS. ✓
- **Triage Before Build:** Resolved at Extend after honest evaluation of Steps 1-2. ✓
- **Real Voices:** The Pack articulated this need directly. It wasn't assumed. ✓
- **The Illegible Matters:** The branded space gives The Pack IDENTITY — belonging, ownership, "this is ours." These are illegible but real. ✓
- **Harm Prevention:** Data isolation prevents cross-tenant leakage. No surveillance, no extraction. ✓
- **Transparency:** Full Triage walk-through, all alternatives evaluated, risks documented. ✓
