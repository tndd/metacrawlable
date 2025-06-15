# 🕷️ MetaCrawlable

Mock web servers for adversarial crawler testing.

## 📚 Documentation

- [Project Overview](docs/overview.md) - Purpose and goals
- [Project Structure](docs/structure.md) - Directory layout and architecture
- [Mock Sites](docs/sites/) - Detailed specifications for each test site
- [Anti-Crawler Mechanisms](docs/anti-crawler.md) - Testing strategies and features
- [Sitemap & Robots.txt Rules](docs/sitemap-robots.md) - Configuration requirements

## Quick Start

This project provides documentation and specifications for implementing mock web servers using Next.js App Router.

## Mock Sites Overview

| Site | Route | Purpose |
|------|-------|---------|
| StaticLand | `/static` | Static HTML baseline |
| DynamicMaze | `/dynamic` | Server-side randomization |
| ClientShadow | `/client-only` | JavaScript-only rendering |
| MapTown | `/map` | Embedded maps testing |
| BotWarden | `/anti-bot` | User-Agent blocking |
| LinkSpiral | `/trap/[slug]` | Recursive link traps |
| BrokenWeb | `/trap-broken` | 404 error handling |
| MetaLie | `/meta-fake` | Misleading metadata |
| NoMapZone | `/no-sitemap` | Link discovery only |
| HalfMapSite | `/partial-map` | Incomplete sitemaps |

## Detailed Site Specifications

- [StaticLand](docs/sites/static-land.md) - Static HTML baseline testing
- [DynamicMaze](docs/sites/dynamic-maze.md) - Server-side randomization
- [ClientShadow](docs/sites/client-shadow.md) - JavaScript-only rendering
- [MapTown](docs/sites/map-town.md) - Embedded maps testing
- [BotWarden](docs/sites/bot-warden.md) - User-Agent blocking
- [LinkSpiral](docs/sites/link-spiral.md) - Recursive link traps
- [BrokenWeb](docs/sites/broken-web.md) - 404 error handling
- [MetaLie](docs/sites/meta-lie.md) - Misleading metadata
- [NoMapZone](docs/sites/no-map-zone.md) - Link discovery only
- [HalfMapSite](docs/sites/half-map-site.md) - Incomplete sitemaps