# DynamicMaze

**Purpose:** Tests how crawlers handle DOM randomness, structural variation, and inconsistent layout.

**Model:** CMS-driven or server-rendered news sites with changing rankings, ads, etc.

**Route:** `/dynamic`

## Structure

```
/dynamic                 ← Homepage (layout changes every request)
/dynamic/sections/[id]  ← Dynamic section pages (at least 20+)
```

## Key Features

- Uses `getServerSideProps` to return dynamic content each time
- Varying DOM structure and class names
- Dynamic ads, quotes, section layouts
- Consistent URLs but different page content
- Tricky DOM selectors, changing IDs/classes

## Sitemap/Robots

- `sitemap.xml`: none
- `robots.txt`: `Disallow: /dynamic`

## Crawler Tests

- Structural diff detection between runs
- Selector robustness
- Handling of contradicting robots and actual navigation

**Minimum Pages:** 20+