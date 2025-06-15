# MapTown

**Purpose:** Tests visibility of embedded map data via third-party JS like Google Maps or Leaflet.

**Model:** Travel/realtor sites with maps and points of interest

**Route:** `/map`

## Structure

```
/map                      ← Map-centered homepage
/map/spot/[id]           ← Location detail pages (at least 15+)
```

## Key Features

- Uses iframe or `<script>` to inject maps
- Google Maps API or OpenStreetMap
- Map-only points with no direct links
- Maps require dummy keys or tokens

## Sitemap/Robots

- `sitemap.xml`: includes `/map/spot/**`
- `robots.txt`: `Allow`

## Crawler Tests

- Extraction of data from `<iframe>` or canvas
- JS-injected content visibility
- Non-link embedded POI discoverability

**Minimum Pages:** 15+