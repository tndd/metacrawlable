# Anti-Crawler Mechanisms

Each site implements specific anti-crawler features to test different aspects of crawler resilience.

## Implementation Requirements

| Feature                  | Applies To    | Implementation Requirement                                              |
| ------------------------ | ------------- | ----------------------------------------------------------------------- |
| JS-only content          | `client-only` | Use `useEffect()` to render content post-load. Empty SSR output.        |
| SSR + DOM randomization  | `dynamic`     | Random number generation + DOM reshuffling on each load.                |
| Bot middleware           | `anti-bot`    | Use `middleware.ts` to inspect headers and block known bot UAs.         |
| sitemap poisoning        | `trap-broken` | Include non-existent pages in sitemap.xml intentionally.                |
| recursive link trap      | `trap/[slug]` | Slugs should link to more slugs, forming an infinite navigational loop. |
| metadata mismatch        | `meta-fake`   | HTML content must differ drastically from head metadata.                |
| robots.txt inconsistency | varies        | Some paths explicitly disallowed; others not mentioned at all.          |

Any deviation from these behaviors must be considered a **critical error**.

## Testing Strategies

### JavaScript Execution Testing
- Pages with no server-side content
- Dynamic content injection
- Map rendering requirements

### User-Agent Detection
- Middleware-based blocking
- Different responses per User-Agent
- Header inspection and filtering

### Structural Challenges
- Changing DOM layouts
- Dynamic class names and IDs
- Randomized content positioning

### Navigation Traps
- Infinite recursion paths
- Broken link handling
- Misleading sitemap entries

### Metadata Inconsistency
- False meta descriptions
- Misleading JSON-LD schema
- Title/content mismatches