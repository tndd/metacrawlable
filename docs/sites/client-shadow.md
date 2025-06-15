# ClientShadow

**Purpose:** Simulates JavaScript-only rendering. Pages appear empty in HTML and populate content client-side.

**Model:** Single Page Applications (SPAs), Next.js CSR-only setups

**Route:** `/client-only`

## Structure

```
/client-only               ← Top page
/client-only/profile/[id] ← User profiles (at least 25+)
```

## Key Features

- Initial HTML is blank or placeholder only
- All content rendered via `useEffect`
- Hydration-only structure
- No server-side markup
- Internal navigation dynamically injected

## Sitemap/Robots

- `sitemap.xml`: available but content mismatch
- `robots.txt`: undefined

## Crawler Tests

- JavaScript execution ability
- Visibility of client-injected elements
- JS-only routes, link injection

**Minimum Pages:** 25+