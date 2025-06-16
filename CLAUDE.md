# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MetaCrawlable is a **streamlined documentation and specification project** for creating efficient adversarial web crawler testing environments. This is **NOT** an implemented codebase - it contains only markdown documentation that specifies how to build mock web servers using Next.js App Router.

### Purpose - Focused 4-Site Architecture

The project provides specifications for **4 core mock websites** that efficiently cover the main anti-crawler challenges:

1. **StaticLand** (`/static`) - Baseline static HTML + semantic structure testing
2. **DynamicMaze** (`/dynamic`) - Server-side DOM randomization + partial sitemap discovery  
3. **ClientShadow** (`/client-only`) - JavaScript-only rendering + CSR content detection
4. **BotWarden** (`/anti-bot`) - User-Agent blocking + access control evasion

This **4-site design eliminates previous specification conflicts** while maintaining comprehensive crawler testing capabilities.

## Architecture Overview

### Documentation Structure

- `docs/overview.md` - Project goals and 4-site design rationale
- `docs/structure.md` - Next.js App Router implementation architecture  
- `docs/anti-crawler.md` - Streamlined anti-crawler mechanisms for 4 sites
- `docs/sitemap-robots.md` - Unified sitemap/robots.txt configuration (no conflicts)
- `docs/implementation-guide.md` - Complete implementation guide with code examples
- `docs/sites/` - Individual specifications for 4 core sites only

### Removed Complexity

**Previous 10-site issues resolved:**
- ❌ Conflicting robots.txt requirements → ✅ Single unified robots.txt
- ❌ Impossible sitemap matrix → ✅ Logical sitemap distribution  
- ❌ SessionStorage server-side contradiction → ✅ Pure server-side randomization
- ❌ External API dependencies → ✅ Self-contained implementations
- ❌ Infinite recursion impossibilities → ✅ Practical finite implementations

## Key Implementation Requirements

### Technology Stack

- **Next.js 14+ App Router** (NOT Pages Router)
- **TypeScript** recommended for type safety
- **React 18+** for Server Components support
- **No external API dependencies** (self-contained)

### Unified Architecture (CONSISTENT & IMPLEMENTABLE)

```
app/
├── static/                     # StaticLand (37 pages total)
│   ├── page.tsx               # Home
│   ├── articles/[id]/page.tsx # Articles (30 pages)
│   └── categories/[name]/page.tsx # Categories (5 pages)
├── dynamic/                    # DynamicMaze (22 pages total)  
│   ├── page.tsx               # Home (randomized structure)
│   ├── sections/[id]/page.tsx # Sections (20 pages)
│   └── random/page.tsx        # Fully random structure
├── client-only/                # ClientShadow (27 pages total)
│   ├── page.tsx               # Home (useEffect rendering)
│   ├── profile/[id]/page.tsx  # Profiles (25 pages)
│   └── dashboard/page.tsx     # Dashboard
├── anti-bot/                   # BotWarden (3 pages total)
│   ├── page.tsx               # Home (UA-gated)
│   ├── protected/page.tsx     # Protected content
│   └── honeypot/page.tsx      # Bot trap
├── robots.txt/route.ts         # Unified robots.txt (Route Handler)
├── sitemap.ts                  # Unified sitemap generation
└── layout.tsx

middleware.ts                   # BotWarden User-Agent detection only
```

### Critical Technical Requirements

✅ **IMPLEMENTATION READY:**

- All 4 sites use standard Next.js App Router patterns
- User-Agent detection follows exact middleware.ts specifications
- DOM randomization uses Server Components (no sessionStorage dependency)
- Unified robots.txt/sitemap eliminates conflicts
- No external API dependencies or infinite recursion

⚠️ **MANDATORY COMPLIANCE:**

- **Exact TypeScript code** provided in `docs/implementation-guide.md`
- **Sitemap distribution**: StaticLand (full), DynamicMaze (partial), others (none)
- **Robots.txt rules**: Allow static/dynamic/client-only, Disallow anti-bot
- **Middleware scope**: Only `/anti-bot` path prefix

## Development Guidelines

### Documentation Authority

- **All 4 sites are mandatory** - streamlined but comprehensive
- **Follow implementation-guide.md exactly** - complete code examples provided
- **No assumptions or modifications** - specifications are implementation-ready
- **Page count requirements**: StaticLand(37) + DynamicMaze(22) + ClientShadow(27) + BotWarden(3) = 89 pages total

### Containerization Guidelines

- **Follow containerization-guide.md** - 3-phase Docker implementation approach
- **Phase 1**: Basic containerization with multi-stage build
- **Phase 2**: Development environment with docker-compose
- **Phase 3**: Production optimization and CI/CD integration
- **Next.js configuration**: Use `output: 'standalone'` for optimal container support
- **Testing integration**: Playwright tests should run in containerized environment

### Testing Validation

Each site tests specific crawler capabilities:

1. **StaticLand**: HTML parsing, link traversal, metadata extraction, sitemap utilization
2. **DynamicMaze**: Dynamic structure adaptation, partial sitemap discovery, selector robustness  
3. **ClientShadow**: JavaScript execution, useEffect content detection, organic link discovery
4. **BotWarden**: User-Agent spoofing, 403 error handling, robots.txt compliance

## Important Notes

1. **This is specification-only** - provides complete implementation blueprint
2. **4-site architecture is final** - eliminates all previous specification conflicts
3. **App Router required** - all code examples use App Router patterns
4. **Implementation guide included** - complete TypeScript code provided
5. **Self-contained design** - no external dependencies or impossible requirements

When implementing, follow `docs/implementation-guide.md` exactly for conflict-free development.