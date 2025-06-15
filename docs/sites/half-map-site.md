# HalfMapSite

**Purpose:** Sitemap exists but only covers half the actual content.

**Model:** Partial auto-generated CMS

**Route:** `/partial-map`

## Structure

```
/partial-map             ← Homepage
/partial-map/pages/[id] ← Pages (at least 40+, sitemap has 20)
```

## Key Features

- Only a subset listed in sitemap.xml
- Rest discoverable via internal links

## Sitemap/Robots

- Partial sitemap
- `robots.txt`: `Allow`

## Crawler Tests

- DOM-first vs sitemap-first strategy
- Page discovery completeness

**Minimum Pages:** 40+ (only 20 in sitemap)