# 🕷️ MetaCrawlable

Mock web servers for adversarial crawler testing.

## 📚 Documentation

- [Project Overview](docs/overview.md) - Purpose and goals
- [Project Structure](docs/structure.md) - Directory layout and architecture
- [Mock Sites](docs/sites/) - Detailed specifications for each test site
- [Anti-Crawler Mechanisms](docs/anti-crawler.md) - Testing strategies and features
- [Sitemap & Robots.txt Rules](docs/sitemap-robots.md) - Configuration requirements

## Quick Start

All development occurs in `mock/crawled_server/` using Next.js App Router.

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

See [docs/sites/](docs/sites/) for detailed specifications.