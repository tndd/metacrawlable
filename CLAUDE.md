# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MetaCrawlable is a documentation and specification project for creating adversarial web crawler testing environments. This is **NOT** an implemented codebase - it contains only markdown documentation that specifies how to build mock web servers using Next.js App Router.

### Purpose

The project provides specifications for 10 different mock websites that simulate various anti-crawler challenges, including:

- JavaScript-only content rendering
- Dynamic DOM manipulation
- User-Agent blocking
- Sitemap inconsistencies and traps
- Recursive link generation
- 404 error handling

## Architecture Overview

### Documentation Structure

- `docs/overview.md` - Project goals and requirements (all features are mandatory)
- `docs/structure.md` - Implementation architecture for Next.js App Router
- `docs/anti-crawler.md` - Anti-crawler mechanism specifications
- `docs/sitemap-robots.md` - Sitemap and robots.txt configuration matrix
- `docs/sites/` - Individual specifications for 10 mock sites

### Mock Site Categories

Each site targets specific crawler testing scenarios:

1. **StaticLand** (`/static`) - Baseline static HTML
2. **DynamicMaze** (`/dynamic`) - Server-side randomization
3. **ClientShadow** (`/client-only`) - JavaScript-only rendering
4. **MapTown** (`/map`) - Embedded map testing
5. **BotWarden** (`/anti-bot`) - User-Agent blocking
6. **LinkSpiral** (`/trap/[slug]`) - Recursive link traps
7. **BrokenWeb** (`/trap-broken`) - 404 error generation
8. **MetaLie** (`/meta-fake`) - Misleading metadata
9. **NoMapZone** (`/no-sitemap`) - No sitemap/robots.txt
10. **HalfMapSite** (`/partial-map`) - Incomplete sitemaps

## Key Implementation Requirements

### Technology Stack

- **Next.js App Router** (NOT Pages Router)
- TypeScript recommended
- Middleware required for User-Agent detection
- Dynamic and static route generation

### Critical Technical Notes

✅ **RESOLVED ISSUES:**

- Next.js App Router patterns now correctly specified (Server Components, dynamic generation)
- Sitemap/robots.txt configuration matrix updated with logical consistency
- Bot detection specifications added with concrete User-Agent lists and response codes
- Dynamic content generation algorithms specified with detailed implementation requirements
- Error handling specifications detailed with deterministic 404 generation logic

⚠️ **IMPLEMENTATION REQUIREMENTS:**

- All sites must use Next.js App Router patterns (no Pages Router)
- User-Agent detection must follow exact specifications in anti-crawler.md
- DOM randomization must implement specified algorithms for DynamicMaze
- 404 errors must follow deterministic logic (even page IDs return 404)

### Implementation Architecture

```
app/
├── static/             # StaticLand implementation
├── dynamic/            # DynamicMaze (server components)
├── client-only/        # ClientShadow (useEffect rendering)
├── map/                # MapTown (map API integration)
├── anti-bot/           # BotWarden (middleware integration)
├── trap/[slug]/        # LinkSpiral (dynamic routing)
├── trap-broken/        # BrokenWeb (404 generation)
├── meta-fake/          # MetaLie (metadata mismatches)
├── no-sitemap/         # NoMapZone (discovery testing)
├── partial-map/        # HalfMapSite (incomplete sitemaps)
└── layout.tsx

middleware.ts           # User-Agent detection logic
public/
├── robots.txt          # Conditional serving logic
└── sitemap.xml         # Complete/corrupted versions
```

## Development Guidelines

### Documentation Updates

- **Literal interpretation required** - specs must be followed exactly as written
- All 10 sites are **mandatory** - no optional implementations
- Minimum page requirements specified per site (20-30+ pages each)
- Each site must provide distinguishable HTML structures

### Consistency Requirements

- Cross-reference all site specifications with the sitemap-robots configuration matrix
- Ensure middleware integrates properly across all routes
- Verify that anti-crawler mechanisms work independently

### Testing Validation

Each implemented site should validate against its specific crawler challenges:

- Structure parsing, link traversal, error handling
- JavaScript execution requirements
- User-Agent detection and blocking
- Sitemap compliance vs. actual content discovery

## Important Notes

1. **This is specification-only** - no actual Next.js code exists yet
2. **All features are mandatory** - nothing is optional per `docs/overview.md`
3. **App Router required** - ignore any Pages Router references in current docs
4. **Exact compliance needed** - specifications must be implemented literally without assumptions
5. **Cross-site integration** - sites must work together within single Next.js application

When implementing, prioritize resolving the Next.js App Router inconsistencies before beginning development.
