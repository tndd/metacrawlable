# Project Structure

All development must occur inside this directory.

## Directory Layout

```
.
├── app/
│   ├── static/
│   ├── dynamic/
│   ├── client-only/
│   ├── map/
│   ├── anti-bot/
│   ├── trap/[slug]/
│   ├── trap-broken/
│   ├── meta-fake/
│   ├── no-sitemap/
│   ├── partial-map/
│   └── layout.tsx
├── middleware.ts         # Required for anti-bot User-Agent detection
├── public/
│   ├── robots.txt         # Multiple versions may be conditionally served
│   └── sitemap.xml        # Must include both complete and corrupted examples
├── next.config.js         # May include rewrites and middleware conditions
├── tsconfig.json
└── README.md              # This file
```

## Mock Site Summary

Each subdirectory under `app/` represents a **mock site**. These are not pages, but full adversarial test environments. Each must include a `page.tsx` file and conform to the following specifications:

| Site Name      | Route Path     | Required Behavior                                                               |
| -------------- | -------------- | ------------------------------------------------------------------------------- |
| `StaticLand`   | `/static`      | Plain HTML site with hardcoded internal links. Fully crawlable without JS.      |
| `DynamicMaze`  | `/dynamic`     | Uses `getServerSideProps()` to randomize content on each request.               |
| `ClientShadow` | `/client-only` | Initial HTML is empty. Content appears **only after JavaScript execution**.     |
| `MapTown`      | `/map`         | Displays a map via Google Maps or OpenStreetMap JS API. Hidden without JS.      |
| `BotWarden`    | `/anti-bot`    | Middleware blocks or alters response for specific User-Agents.                  |
| `LinkSpiral`   | `/trap/[slug]` | Generates recursive links dynamically. Infinite depth possible.                 |
| `BrokenWeb`    | `/trap-broken` | Pages referenced in sitemap do not exist or return 404.                         |
| `MetaLie`      | `/meta-fake`   | Meta title and description differ from visible content.                         |
| `NoMapZone`    | `/no-sitemap`  | Neither sitemap.xml nor robots.txt is served. Site must be discovered manually. |
| `HalfMapSite`  | `/partial-map` | Sitemap.xml exists but omits many live pages. Misleads crawling heuristics.     |

Each of the above sites **must be implemented completely** and serve distinguishable HTML structures for testing parser adaptability.
