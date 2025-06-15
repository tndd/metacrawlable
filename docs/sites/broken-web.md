# BrokenWeb

**Purpose:** Tests crawler error handling for 404s and sitemap-inconsistent URLs.

**Model:** Poorly maintained legacy CMS

**Route:** `/trap-broken`

## Structure

```
/trap-broken             ← Homepage
/trap-broken/pages/[id] ← Pages (half lead to 404)
```

## Key Features

- Sitemap lists all pages
- 50% of pages return 404 intentionally
- Some internal links point to missing pages

## Sitemap/Robots

- Full sitemap (including dead URLs)
- `robots.txt`: `Allow`

## Crawler Tests

- 404 response handling
- Retry logic and sitemap trust

**Minimum Pages:** 30+ (15+ are broken)