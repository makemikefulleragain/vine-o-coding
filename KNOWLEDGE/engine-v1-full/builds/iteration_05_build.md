# Iteration 05 — Build Instructions: Multi-Tenant Foundation

**Date:** 2026-02-13
**Confidence:** 91/100 — Autonomous routing
**Target executor:** FactoryK / Windy
**Platform:** kamunity.ai (live, 500+ members, 100+ rooms)
**Stack:** Next.js 14 (App Router) + Supabase + Prisma + Tailwind CSS on Netlify

---

## Pre-Build Checklist

Before writing any code:

- [ ] **Verify Netlify wildcard subdomain support.** Set up a `*.kamunity.ai` DNS record and confirm Netlify serves the app for `test.kamunity.ai`. If Netlify doesn't support this on the current plan, the subdomain approach needs adjustment (could use path-based routing as fallback: `kamunity.ai/t/thepack/`).
- [ ] **Confirm Prisma schema.** Read the current `schema.prisma` file. Verify the `Room` model exists and identify any existing fields/relations that might conflict with adding `tenantId`.
- [ ] **Confirm Supabase RLS state.** Check which RLS policies already exist on the `rooms` table. New policies must not conflict with existing ones.
- [ ] **Share AC1-AC7 with Mike / The Pack.** Confirm the acceptance criteria match The Pack's expectations for Step 1 of the multi-tenant rollout.
- [ ] **Clarify tenant membership model.** Before build: who can see tenant rooms? Options:
  - (a) Anyone visiting the subdomain sees tenant rooms (public within subdomain)
  - (b) Only members who have been invited/added to the tenant can see rooms
  - (c) Tenant rooms are publicly discoverable but joining requires approval
  - Recommend starting with (a) — simplest, and The Pack can use room-level privacy (already exists) for access control.

---

## Build Steps (Sequential)

### Step 1: Prisma Schema — Add Tenant Model (~2 hours)

**File:** `prisma/schema.prisma`

Add `Tenant` model:
```prisma
model Tenant {
  id             String   @id @default(uuid())
  name           String
  slug           String   @unique
  logoUrl        String?  @map("logo_url")
  primaryColor   String?  @map("primary_color")
  secondaryColor String?  @map("secondary_color")
  customDomain   String?  @unique @map("custom_domain")
  ownerId        String   @map("owner_id")
  createdAt      DateTime @default(now()) @map("created_at")
  updatedAt      DateTime @updatedAt @map("updated_at")
  rooms          Room[]
  @@map("tenants")
}
```

Add `tenantId` to existing `Room` model:
```prisma
model Room {
  // ... existing fields ...
  tenantId  String?  @map("tenant_id")
  tenant    Tenant?  @relation(fields: [tenantId], references: [id])
}
```

Run: `npx prisma migrate dev --name add-tenants`

**Verify:** Migration runs cleanly. All existing rooms have `tenant_id = NULL`. No existing tests break.

---

### Step 2: Subdomain Middleware (~2 hours)

**File:** `middleware.ts` (or `src/middleware.ts` depending on project structure)

```typescript
import { NextRequest, NextResponse } from 'next/server'

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'kamunity.ai'

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || ''
  
  // Strip port for local development
  const host = hostname.replace(/:\d+$/, '')
  
  // Determine if we're on a subdomain
  const isSubdomain = host.endsWith(`.${ROOT_DOMAIN}`) && host !== ROOT_DOMAIN && host !== `www.${ROOT_DOMAIN}`
  
  if (!isSubdomain) {
    // Main site — no tenant context
    return NextResponse.next()
  }
  
  // Extract subdomain slug
  const slug = host.replace(`.${ROOT_DOMAIN}`, '')
  
  // Pass tenant slug via header for server components to read
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-tenant-slug', slug)
  
  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}

export const config = {
  matcher: [
    // Match all paths except static assets and API routes that shouldn't be tenant-scoped
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
```

**Local development:** Add to `.env.local`:
```
NEXT_PUBLIC_ROOT_DOMAIN=localhost
```

Test locally with `/etc/hosts` entry: `127.0.0.1 thepack.localhost`

**Verify:** `thepack.kamunity.ai` passes `x-tenant-slug: thepack` header. `kamunity.ai` passes no tenant header.

---

### Step 3: Tenant Context Utility (~1 hour)

**File:** `lib/tenant.ts`

```typescript
import { cache } from 'react'
import { prisma } from '@/lib/prisma'
import { headers } from 'next/headers'

export type Tenant = {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  primaryColor: string | null
  secondaryColor: string | null
  customDomain: string | null
  ownerId: string
}

export const getCurrentTenant = cache(async (): Promise<Tenant | null> => {
  const headersList = await headers()
  const slug = headersList.get('x-tenant-slug')
  
  if (!slug) return null
  
  const tenant = await prisma.tenant.findUnique({
    where: { slug },
  })
  
  return tenant
})

export const getTenantId = cache(async (): Promise<string | null> => {
  const tenant = await getCurrentTenant()
  return tenant?.id ?? null
})
```

**Verify:** `getCurrentTenant()` returns null on main site, returns tenant object on subdomain.

---

### Step 4: Tenant-Scoped Room Queries (~1 hour)

Find the existing room discovery/listing query. Amend it to filter by tenant:

```typescript
// Wherever rooms are fetched for discovery/listing:
const tenantId = await getTenantId()

const rooms = await prisma.room.findMany({
  where: {
    tenantId: tenantId, // null = public rooms, string = tenant rooms
    // ... keep all existing filters
  },
  // ... keep existing ordering, pagination, includes
})
```

**Verify:** On `kamunity.ai`, only rooms with `tenant_id IS NULL` appear. On `thepack.kamunity.ai`, only rooms with `tenant_id = <pack_tenant_id>` appear.

---

### Step 5: Tenant Theming (~2 hours)

**File:** `components/TenantThemeProvider.tsx` (new)

```typescript
import { getCurrentTenant } from '@/lib/tenant'

export async function TenantThemeProvider({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const tenant = await getCurrentTenant()
  
  if (!tenant) {
    return <>{children}</>
  }
  
  const style = {
    '--brand-primary': tenant.primaryColor || 'var(--kamunity-primary)',
    '--brand-secondary': tenant.secondaryColor || 'var(--kamunity-secondary)',
  } as React.CSSProperties
  
  return <div style={style}>{children}</div>
}
```

**File:** Root layout (e.g., `app/layout.tsx`)

Wrap children with `<TenantThemeProvider>`. Update header/nav to show tenant logo and name:

```typescript
import { getCurrentTenant } from '@/lib/tenant'

export default async function RootLayout({ children }) {
  const tenant = await getCurrentTenant()
  const siteName = tenant?.name || 'Kamunity'
  const logoUrl = tenant?.logoUrl || '/default-logo.svg'
  
  return (
    <html>
      <body>
        <TenantThemeProvider>
          <Header siteName={siteName} logoUrl={logoUrl} />
          {children}
        </TenantThemeProvider>
      </body>
    </html>
  )
}
```

Update CSS to use `var(--brand-primary)` and `var(--brand-secondary)` where appropriate. Keep campfire defaults as fallbacks.

**Verify:** On `thepack.kamunity.ai`, Pack logo appears, Pack colors apply. On `kamunity.ai`, default Kamunity branding unchanged.

---

### Step 6: Tenant Admin Settings Page (~3 hours)

**File:** `app/tenant/settings/page.tsx` (new)

Simple form allowing tenant owner to update:
- Tenant name
- Logo URL (or file upload)
- Primary color (hex picker)
- Secondary color (hex picker)

Protected by auth: only the user whose `id` matches `tenants.owner_id` can access.

```typescript
import { getCurrentTenant } from '@/lib/tenant'
import { redirect } from 'next/navigation'

export default async function TenantSettingsPage() {
  const tenant = await getCurrentTenant()
  if (!tenant) redirect('/')
  
  // Check ownership via Supabase auth
  // ... auth check ...
  
  return (
    <form action={updateTenantSettings}>
      <input name="name" defaultValue={tenant.name} />
      <input name="logoUrl" defaultValue={tenant.logoUrl || ''} />
      <input name="primaryColor" type="color" defaultValue={tenant.primaryColor || '#FF6B35'} />
      <input name="secondaryColor" type="color" defaultValue={tenant.secondaryColor || '#1A1A2E'} />
      <button type="submit">Save</button>
    </form>
  )
}
```

**Verify:** Tenant owner can update branding. Changes reflect immediately on the subdomain.

---

### Step 7: Supabase RLS Policies (~2 hours)

**File:** Supabase SQL editor or migration

```sql
-- Enable RLS on tenants table
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;

-- Anyone can read tenant info (needed for theming/branding on public pages)
CREATE POLICY "tenants_public_read" ON tenants
  FOR SELECT USING (true);

-- Only tenant owner can update their tenant
CREATE POLICY "tenants_owner_update" ON tenants
  FOR UPDATE USING (owner_id = auth.uid()::text);

-- Room tenant isolation (if using RLS for room queries)
-- Note: If room queries already use Prisma with WHERE clauses,
-- RLS may be a second layer of defense rather than the primary filter.
-- Implement based on existing auth pattern in the codebase.
```

**Important:** Test RLS policies thoroughly against existing room queries before deploying to production. Existing rooms (`tenant_id IS NULL`) must remain accessible.

**Verify:** A user on `thepack.kamunity.ai` cannot query rooms from another tenant via Supabase client. Existing rooms remain accessible on main site.

---

### Step 8: Seed The Pack Music Tenant (~30 min)

```sql
INSERT INTO tenants (id, name, slug, logo_url, primary_color, secondary_color, owner_id, created_at, updated_at)
VALUES (
  gen_random_uuid(),
  'The Pack Music',
  'thepack',
  'https://packmusic.au/logo.png',  -- Update with actual logo URL
  '#FF6B35',                          -- Update with Pack's brand color
  '#1A1A2E',                          -- Update with Pack's secondary
  '<mike_or_pack_owner_user_id>',     -- Supabase auth user ID
  now(),
  now()
);
```

**Verify:** `thepack.kamunity.ai` resolves, shows Pack branding, shows empty room list (no rooms assigned yet).

---

### Step 9: Integration Test (~2 hours)

Full flow test on staging:
1. Visit `kamunity.ai` — default branding, all existing rooms visible ✓
2. Visit `thepack.kamunity.ai` — Pack branding, no rooms yet ✓
3. Create a room on `thepack.kamunity.ai` — room gets Pack's `tenant_id` ✓
4. Visit `kamunity.ai` — new Pack room NOT visible ✓
5. Visit `thepack.kamunity.ai` — new Pack room IS visible ✓
6. Update Pack branding via admin settings — changes reflect ✓
7. Visit `nonexistent.kamunity.ai` — redirects to `kamunity.ai` ✓
8. Existing member logs in on `kamunity.ai` — all their existing rooms still work ✓

---

### Step 10: Deploy (~1 hour)

1. Backup production database
2. Deploy migration (adds `tenants` table + `tenant_id` column)
3. Deploy application code (middleware, tenant context, theming, admin)
4. Configure DNS: `*.kamunity.ai` → Netlify
5. Seed The Pack Music tenant record
6. Verify production: run Step 9 integration test on live site

---

## Post-Build: Next Steps

After multi-tenant foundation is stable and The Pack confirms it meets Step 1 expectations:

1. **Outbound cross-posting** — Add Mastodon API + @atproto/api integration for posting room content to The Pack's social accounts
2. **Tenant member management** — Define who belongs to a tenant, invite flows, roles
3. **Full ActivityPub federation** — Fedify @fedify/next for full fediverse citizenship
4. **Data portability** — Export mechanism for tenant data (sovereignty requirement)
5. **Custom domains** — `rooms.packmusic.au` pointing to The Pack's tenant

---

## Estimated Effort: 16-24 hours

| Step | Estimated | Notes |
|------|----------|-------|
| 1. Prisma schema | 2h | Schema + migration |
| 2. Subdomain middleware | 2h | Including local dev setup |
| 3. Tenant context | 1h | Utility functions |
| 4. Room query scoping | 1h | Amend existing queries |
| 5. Tenant theming | 2h | CSS variables + layout changes |
| 6. Tenant admin | 3h | Settings page + auth check |
| 7. RLS policies | 2h | SQL + testing |
| 8. Seed tenant | 0.5h | One SQL insert |
| 9. Integration test | 2h | Full flow verification |
| 10. Deploy | 1h | Migration + DNS + verification |
| **Total** | **16.5h** | **Budget 24h for codebase surprises** |
