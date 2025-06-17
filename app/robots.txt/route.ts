import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { protocol, host } = new URL(request.url)
  const baseUrl = `${protocol}//${host}`

  const robotsTxt = `User-agent: *

# StaticLand - 完全にクロール可能
Allow: /static/
Allow: /static/articles/
Allow: /static/categories/

# DynamicMaze - 基本的にクロール可能だが構造が動的
Allow: /dynamic/
Allow: /dynamic/sections/
Allow: /dynamic/random/

# ClientShadow - JavaScriptクローラー向け
Allow: /client-only/
Allow: /client-only/profile/
Allow: /client-only/dashboard/

# BotWarden - 特定のボットのみアクセス許可（User-Agent制限あり）
Disallow: /anti-bot/protected/
Disallow: /anti-bot/honeypot/
Allow: /anti-bot/

# API エンドポイント
Allow: /api/health
Allow: /api/ready
Disallow: /api/

# システムファイル
Disallow: /_next/
Disallow: /favicon.ico
Disallow: /robots.txt
Disallow: /sitemap.xml

# サイトマップの場所
Sitemap: ${baseUrl}/sitemap.xml

# クロール頻度制限
Crawl-delay: 1`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}