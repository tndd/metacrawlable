# MetaLie

**Purpose:** Pages with misleading metadata—title and description contradict content.

**Model:** SEO spam, phishing, and fake portals

**Route:** `/meta-fake`

## Structure

```
/meta-fake              ← Landing
/meta-fake/articles/[id] ← Article pages (at least 20+)
```

## Key Features

- Titles and meta descriptions are false
- JSON-LD provides misleading schema
- Human vs bot perception divergence

## Sitemap/Robots

- Full sitemap
- `robots.txt`: `Allow`

## Crawler Tests

- Metadata vs content inconsistency
- Schema.org / JSON-LD interpretation

**Minimum Pages:** 20+