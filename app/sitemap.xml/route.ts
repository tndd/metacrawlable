import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { protocol, host } = new URL(request.url)
  const baseUrl = `${protocol}//${host}`
  
  const currentDate = new Date().toISOString()

  // StaticLand URLs (37 pages)
  const staticUrls = [
    // Home page
    { url: `${baseUrl}/static`, lastmod: currentDate, changefreq: 'weekly', priority: '1.0' },
    
    // Articles (30 pages)
    ...Array.from({ length: 30 }, (_, i) => ({
      url: `${baseUrl}/static/articles/${i + 1}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.8'
    })),
    
    // Categories (6 pages)
    ...[
      'technology', 'science', 'business', 'entertainment', 'sports', 'lifestyle'
    ].map(category => ({
      url: `${baseUrl}/static/categories/${category}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: '0.7'
    }))
  ]

  // DynamicMaze URLs (22 pages)
  const dynamicUrls = [
    // Home page
    { url: `${baseUrl}/dynamic`, lastmod: currentDate, changefreq: 'daily', priority: '0.9' },
    
    // Random page
    { url: `${baseUrl}/dynamic/random`, lastmod: currentDate, changefreq: 'always', priority: '0.6' },
    
    // Sections (20 pages)
    ...Array.from({ length: 20 }, (_, i) => ({
      url: `${baseUrl}/dynamic/sections/${i + 1}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.7'
    }))
  ]

  // ClientShadow URLs (27 pages)
  const clientUrls = [
    // Home page
    { url: `${baseUrl}/client-only`, lastmod: currentDate, changefreq: 'weekly', priority: '0.8' },
    
    // Dashboard
    { url: `${baseUrl}/client-only/dashboard`, lastmod: currentDate, changefreq: 'weekly', priority: '0.7' },
    
    // Profiles (25 pages)
    ...Array.from({ length: 25 }, (_, i) => ({
      url: `${baseUrl}/client-only/profile/${i + 1}`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: '0.6'
    }))
  ]

  // BotWarden URLs (3 pages)
  const botWardenUrls = [
    // Home page (accessible)
    { url: `${baseUrl}/anti-bot`, lastmod: currentDate, changefreq: 'weekly', priority: '0.5' },
    
    // Protected page (restricted)
    { url: `${baseUrl}/anti-bot/protected`, lastmod: currentDate, changefreq: 'never', priority: '0.1' },
    
    // Honeypot (trap)
    { url: `${baseUrl}/anti-bot/honeypot`, lastmod: currentDate, changefreq: 'never', priority: '0.1' }
  ]

  // Root page
  const rootUrls = [
    { url: baseUrl, lastmod: currentDate, changefreq: 'weekly', priority: '1.0' }
  ]

  // Combine all URLs
  const allUrls = [...rootUrls, ...staticUrls, ...dynamicUrls, ...clientUrls, ...botWardenUrls]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(({ url, lastmod, changefreq, priority }) => `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}