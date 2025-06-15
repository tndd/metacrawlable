# BotWarden

**Purpose:** Evaluates crawler resilience against User-Agent blocking, header filtering, and IP-based traps.

**Model:** Login portals, analytic systems, anti-bot strategies

**Route:** `/anti-bot`

## Structure

```
/anti-bot                ← Homepage (different behavior per UA)
/anti-bot/trap           ← Crawler-only trap page
```

## Key Features

- Middleware blocks known bots via User-Agent, IP, Referrer
- Sends 403 or deceptive HTML to bots
- Redirects bots to dead-end loops

## Sitemap/Robots

- No sitemap
- `robots.txt`: `Disallow: /anti-bot`

## Crawler Tests

- User-Agent spoofing
- Middleware rejection handling
- Trap link recognition

**Minimum Pages:** 10+