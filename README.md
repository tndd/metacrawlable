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
| [StaticLand](docs/sites/static-land.md) | `/static` | Static HTML baseline |
| [DynamicMaze](docs/sites/dynamic-maze.md) | `/dynamic` | Server-side randomization |
| [ClientShadow](docs/sites/client-shadow.md) | `/client-only` | JavaScript-only rendering |
| [MapTown](docs/sites/map-town.md) | `/map` | Embedded maps testing |
| [BotWarden](docs/sites/bot-warden.md) | `/anti-bot` | User-Agent blocking |
| [LinkSpiral](docs/sites/link-spiral.md) | `/trap/[slug]` | Recursive link traps |
| [BrokenWeb](docs/sites/broken-web.md) | `/trap-broken` | 404 error handling |
| [MetaLie](docs/sites/meta-lie.md) | `/meta-fake` | Misleading metadata |
| [NoMapZone](docs/sites/no-map-zone.md) | `/no-sitemap` | Link discovery only |
| [HalfMapSite](docs/sites/half-map-site.md) | `/partial-map` | Incomplete sitemaps |