# Phase 4 Spec: Make It Findable

**Date:** 2026-02-14

---

## Acceptance Criteria

1. ✅ App is deployed to a live Netlify URL with HTTPS
2. ✅ Direct links to the app don't 404 (SPA redirect rule works)
3. ✅ Page title and meta description contain target keywords
4. ✅ Open Graph tags present (og:title, og:description, og:type)
5. ✅ Structured data (JSON-LD SoftwareApplication) present in page source
6. ✅ robots.txt allows crawling
7. ✅ sitemap.xml lists the app URL
8. ✅ First-time visitors (no grants) see a landing hero explaining the tool
9. ✅ Build passes (0 errors), smoke tests pass (13/13)

---

## Technical Design

### 1. index.html — Meta Tags

```html
<html lang="en-AU">
<head>
  <title>Grant Acquittal Helper — Free Grant Reporting Tool for Australian Nonprofits</title>
  <meta name="description" content="Free grant acquittal reporting tool for small Australian nonprofits and community groups. Track grant spending, manage budgets, import bank statements, and generate acquittal reports. By Kamunity.">
  <meta name="theme-color" content="#4338ca">
  
  <!-- Open Graph -->
  <meta property="og:title" content="Grant Acquittal Helper">
  <meta property="og:description" content="Free tool to track grant spending and generate acquittal reports for Australian nonprofits.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://[DEPLOY_URL]">
  <meta property="og:locale" content="en_AU">
  
  <!-- Twitter -->
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="Grant Acquittal Helper">
  <meta name="twitter:description" content="Free tool to track grant spending and generate acquittal reports for Australian nonprofits.">
  
  <!-- JSON-LD Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Grant Acquittal Helper",
    "description": "Free grant acquittal reporting tool for small Australian nonprofits and community groups.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "AUD" },
    "author": { "@type": "Organization", "name": "Kamunity", "url": "https://kamunity.ai" }
  }
  </script>
</head>
```

### 2. public/_redirects (Netlify SPA routing)

```
/*    /index.html   200
```

### 3. public/robots.txt

```
User-agent: *
Allow: /

Sitemap: https://[DEPLOY_URL]/sitemap.xml
```

### 4. public/sitemap.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://[DEPLOY_URL]/</loc>
    <lastmod>2026-02-14</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 5. netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 6. Landing Hero (GrantListView empty state replacement)

When grants.length === 0, show a marketing-style hero:
- Headline: "Track Your Grant Spending. Generate Acquittal Reports."
- Subhead: "A free tool for small Australian nonprofits and community groups."
- Feature bullets: budget tracking, bank CSV import, narrative guidance, printable reports
- CTA: "Create Your First Grant" button
- Trust signals: "No sign-up required · Your data stays yours · Built by Kamunity"

### 7. No Schema Changes

No database changes required.

### 8. Human Actions Required

- **Deploy URL decision:** subdomain choice (e.g. grants.kamunity.ai or grants-hub.netlify.app)
- **DNS:** If using custom domain, human must configure DNS
- **OG image:** Optional — a social sharing image would help but can be deferred
