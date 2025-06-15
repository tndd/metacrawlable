# Sitemap & Robots.txt Rules

You must implement the following sitemap/robots logic for each mock site:

## Configuration Matrix

| Site Name      | sitemap.xml | robots.txt  | Expected Outcome                                                         |
| -------------- | ----------- | ----------- | ------------------------------------------------------------------------ |
| `StaticLand`   | ✅ Complete | ✅ Allow    | Fully visible and crawlable                                              |
| `DynamicMaze`  | ❌ None     | ✅ Disallow | Excluded from indexing by rule                                           |
| `ClientShadow` | ✅ Present  | ❌ None     | Sitemap listed but content is invisible without JS                       |
| `BotWarden`    | ❌ None     | ❌ Disallow | Crawler banned; no site map; dynamic rejection via middleware            |
| `BrokenWeb`    | ✅ Present  | ✅ Allow    | Sitemap links lead to 404s                                               |
| `HalfMapSite`  | ✅ Partial  | ✅ Allow    | Only partial site listed, requires link traversal to find full structure |
| `NoMapZone`    | ❌ None     | ❌ None     | Crawler must discover all pages organically                              |

## Implementation Details

### Sitemap Types

**Complete Sitemap**: Lists all available pages for the site
- Includes all valid routes
- Provides accurate lastmod dates
- Contains proper priority values

**Partial Sitemap**: Intentionally omits some existing pages
- Lists only 50% of actual content
- Forces crawlers to use link discovery
- Tests crawler completeness strategies

**Poisoned Sitemap**: Contains invalid or non-existent URLs
- Includes dead links intentionally
- Tests error handling capabilities
- Verifies retry logic

### Robots.txt Variations

**Allow All**: Standard permissive configuration
```
User-agent: *
Allow: /
```

**Disallow Specific**: Blocks access to certain paths
```
User-agent: *
Disallow: /dynamic
Disallow: /anti-bot
```

**No robots.txt**: File should not exist
- Tests default crawler behavior
- Forces organic discovery methods

### Testing Implications

Each configuration tests specific crawler capabilities:
- **Compliance**: Following robots.txt directives
- **Discovery**: Finding pages without sitemap guidance
- **Error Handling**: Managing 404s and broken links
- **Completeness**: Discovering all available content