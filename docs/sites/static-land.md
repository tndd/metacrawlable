# StaticLand

**Purpose:** A baseline testbed for evaluating crawler performance in semantically rich, fully static HTML environments. This confirms whether a crawler can parse standard markup and traverse internal links.

**Real-world Model:** Static blogs using Jekyll, Hugo, GitHub Pages, etc.

**Route:** `/static`

## Structure

```
/static                  ← Homepage with article list and tag links
/static/articles/[id]   ← Individual articles (at least 30+ pages)
/static/tags/[tag]      ← Article listing by tag
```

## Key Features

- All pages are statically generated using `generateStaticParams`
- `<title>` and `<meta>` tags provided for each article
- Semantic elements: `<h1>`, `<h2>`, `<p>`, `<ul>`, `<a>`, etc.
- Each article links to 3–5 related articles
- Tags used across articles (1–3 per post)
- Global `<nav>` and `<footer>` with tag cloud, copyright
- All links are valid, no 404s

## Sitemap/Robots

- `sitemap.xml`: all `/static/**` pages
- `robots.txt`: `Allow`

## Crawler Tests

- Structural HTML parsing
- Recursive internal link traversal
- Sitemap vs DOM discovery comparison
- Relative vs absolute link handling
- Anchor (`#section`) navigation parsing

**Minimum Pages:** 30+