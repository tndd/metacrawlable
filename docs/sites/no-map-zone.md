# NoMapZone

**Purpose:** Has no sitemap or robots.txt, only reachable through in-site link discovery.

**Model:** Hobbyist or legacy company pages

**Route:** `/no-sitemap`

## Structure

```
/no-sitemap             ← Homepage
/no-sitemap/pages/[id] ← Deeply linked pages (at least 40+)
```

## Key Features

- Entire site reachable via internal links only
- Multi-level structure, unclear nav paths

## Sitemap/Robots

- None

## Crawler Tests

- Full graph reconstruction from DOM only
- Link-following accuracy

**Minimum Pages:** 40+