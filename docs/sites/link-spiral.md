# LinkSpiral

**Purpose:** Tests recursion handling and infinite-link scenarios.

**Model:** CMSs with repeated profiles, infinite reply chains

**Route:** `/trap/[slug]`

## Structure

```
/trap/[slug]            ← Recursive links (at least 50+ slugs)
```

## Key Features

- Recursive links between pages
- Loopbacks and redirects
- Random paths linking back into structure

## Sitemap/Robots

- Sitemap includes only part of total paths
- `robots.txt`: undefined

## Crawler Tests

- Infinite traversal protection
- Loop detection and deduplication

**Minimum Pages:** 50+