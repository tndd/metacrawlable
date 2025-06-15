# Project Structure

## Documentation Structure

This repository contains documentation and specifications for the MetaCrawlable project:

```
.
├── README.md                    # Main project overview
├── docs/
│   ├── overview.md             # Project purpose and goals
│   ├── structure.md            # This file - project structure
│   ├── anti-crawler.md         # Anti-crawler mechanisms
│   ├── sitemap-robots.md       # Sitemap and robots.txt rules
│   └── sites/                  # Individual site specifications
│       ├── static-land.md      # StaticLand specifications
│       ├── dynamic-maze.md     # DynamicMaze specifications
│       ├── client-shadow.md    # ClientShadow specifications
│       ├── map-town.md         # MapTown specifications
│       ├── bot-warden.md       # BotWarden specifications
│       ├── link-spiral.md      # LinkSpiral specifications
│       ├── broken-web.md       # BrokenWeb specifications
│       ├── meta-lie.md         # MetaLie specifications
│       ├── no-map-zone.md      # NoMapZone specifications
│       └── half-map-site.md    # HalfMapSite specifications
```

## Implementation Structure

The Next.js implementation should follow this structure:

```
your-project/
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
└── package.json
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
