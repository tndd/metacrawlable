# 実装ガイド

## 技術要件

### 必須技術スタック
- **Next.js 14+** (App Router必須)
- **TypeScript** (型安全性のため推奨)
- **React 18+** (Server Componentsサポート)

### プロジェクト構造

```
your-project/
├── app/
│   ├── static/
│   │   ├── page.tsx                    # StaticLand ホーム
│   │   ├── articles/[id]/page.tsx      # 記事ページ (30ページ)
│   │   └── categories/[name]/page.tsx  # カテゴリページ (5ページ)
│   ├── dynamic/
│   │   ├── page.tsx                    # DynamicMaze ホーム  
│   │   ├── sections/[id]/page.tsx      # セクションページ (20ページ)
│   │   └── random/page.tsx             # ランダム構造ページ
│   ├── client-only/
│   │   ├── page.tsx                    # ClientShadow ホーム
│   │   ├── profile/[id]/page.tsx       # プロフィールページ (25ページ)
│   │   └── dashboard/page.tsx          # ダッシュボード
│   ├── anti-bot/
│   │   ├── page.tsx                    # BotWarden ホーム
│   │   ├── protected/page.tsx          # 保護されたページ
│   │   └── honeypot/page.tsx           # ハニーポット
│   ├── robots.txt/route.ts             # 統合robots.txt
│   ├── sitemap.ts                      # 統合sitemap
│   └── layout.tsx                      # ルートレイアウト
├── middleware.ts                       # User-Agent検出
├── next.config.js
├── tsconfig.json
└── package.json
```

## 実装手順

### 1. 基本プロジェクトセットアップ

```bash
npx create-next-app@latest metacrawlable --typescript --app
cd metacrawlable
```

### 2. ミドルウェア実装

```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // BotWarden用User-Agent検出
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    const userAgent = request.headers.get('user-agent') || ''
    
    if (isBotUserAgent(userAgent)) {
      return new Response(`
        <html>
          <head><title>Access Denied</title></head>
          <body>
            <h1>Access Denied</h1>
            <p>Automated access detected.</p>
          </body>
        </html>
      `, {
        status: 403,
        headers: { 
          'content-type': 'text/html',
          'X-Bot-Detected': 'true' 
        }
      })
    }
  }
  
  return NextResponse.next()
}

function isBotUserAgent(userAgent: string): boolean {
  const blockedBots = ['Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot']
  const blockedPatterns = ['bot', 'crawler', 'spider']
  
  return blockedBots.some(bot => userAgent.includes(bot)) ||
         blockedPatterns.some(pattern => userAgent.toLowerCase().includes(pattern)) ||
         userAgent === ''
}

export const config = {
  matcher: '/anti-bot/:path*'
}
```

### 3. 統合robots.txt

```typescript
// app/robots.txt/route.ts
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const robotsTxt = `User-agent: *
Allow: /static
Allow: /dynamic
Allow: /client-only
Disallow: /anti-bot

Sitemap: ${request.nextUrl.origin}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain' }
  })
}
```

### 4. 統合sitemap

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
  return [
    // StaticLand - 完全版
    { url: `${baseUrl}/static`, priority: 1.0, lastModified: new Date() },
    ...Array.from({ length: 30 }, (_, i) => ({
      url: `${baseUrl}/static/articles/${i + 1}`,
      priority: 0.8,
      lastModified: new Date()
    })),
    ...['tech', 'business', 'health', 'science', 'culture'].map(category => ({
      url: `${baseUrl}/static/categories/${category}`,
      priority: 0.7,
      lastModified: new Date()
    })),
    
    // DynamicMaze - 部分版（6/22ページのみ）
    { url: `${baseUrl}/dynamic`, priority: 0.7, lastModified: new Date() },
    { url: `${baseUrl}/dynamic/sections/1`, priority: 0.6, lastModified: new Date() },
    { url: `${baseUrl}/dynamic/sections/3`, priority: 0.6, lastModified: new Date() },
    { url: `${baseUrl}/dynamic/sections/7`, priority: 0.6, lastModified: new Date() },
    { url: `${baseUrl}/dynamic/sections/12`, priority: 0.6, lastModified: new Date() },
    { url: `${baseUrl}/dynamic/sections/18`, priority: 0.6, lastModified: new Date() },
    
    // ClientShadow, BotWarden - サイトマップに含まれない
  ]
}
```

## サイト別実装詳細

### StaticLand (静的生成)

```typescript
// app/static/articles/[id]/page.tsx
export async function generateStaticParams() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString()
  }))
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  return {
    title: `Article ${params.id} - StaticLand`,
    description: `Detailed content for article ${params.id}`,
  }
}

export default function ArticlePage({ params }: { params: { id: string } }) {
  const relatedArticles = [
    Math.max(1, parseInt(params.id) - 1),
    Math.min(30, parseInt(params.id) + 1),
    Math.floor(Math.random() * 30) + 1
  ].filter((id, index, arr) => arr.indexOf(id) === index)

  return (
    <article>
      <header>
        <h1>Article {params.id}</h1>
        <meta name="description" content={`Content for article ${params.id}`} />
      </header>
      <main>
        <p>This is the content for article {params.id}.</p>
        <section>
          <h2>Related Articles</h2>
          <ul>
            {relatedArticles.map(id => (
              <li key={id}>
                <a href={`/static/articles/${id}`}>Article {id}</a>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <footer>
        <nav>
          <a href="/static">Back to Home</a>
        </nav>
      </footer>
    </article>
  )
}
```

### DynamicMaze (動的構造)

```typescript
// app/dynamic/page.tsx
export default function DynamicPage() {
  // リクエスト毎に異なる構造を生成
  const layoutVariant = Math.floor(Math.random() * 3) + 1
  const sectionOrder = ['news', 'featured', 'trending'].sort(() => Math.random() - 0.5)
  const showSidebar = Math.random() > 0.3
  
  return (
    <div className={`layout-v${layoutVariant}`}>
      <header className="header">
        <h1>Dynamic Maze</h1>
        <p>Layout variant: {layoutVariant}</p>
      </header>
      
      {sectionOrder.map((section, index) => (
        <section key={section} className={`section-${section} order-${index}`}>
          <h2>Section: {section}</h2>
          <ul>
            {Array.from({ length: 4 }, (_, i) => (
              <li key={i}>
                <a href={`/dynamic/sections/${i * 5 + index + 1}`}>
                  {section} item {i + 1}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
      
      {showSidebar && (
        <aside className={`sidebar-${Math.floor(Math.random() * 5)}`}>
          <h3>Dynamic Sidebar</h3>
          <p>This sidebar appears randomly</p>
        </aside>
      )}
    </div>
  )
}
```

### ClientShadow (JavaScript専用)

```typescript
// app/client-only/page.tsx
'use client'
import { useEffect, useState } from 'react'

export default function ClientOnlyPage() {
  const [content, setContent] = useState<any>(null)
  const [navigation, setNavigation] = useState<any[]>([])
  
  useEffect(() => {
    // JavaScript実行後のみコンテンツを生成
    setTimeout(() => {
      setContent({
        title: 'Client-Side Generated Content',
        description: 'This content only appears with JavaScript enabled.',
        profiles: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          name: `User ${i + 1}`,
          url: `/client-only/profile/${i + 1}`
        }))
      })
      
      setNavigation([
        { label: 'Home', url: '/client-only' },
        { label: 'Dashboard', url: '/client-only/dashboard' },
        { label: 'All Profiles', url: '/client-only/profile/1' }
      ])
    }, 100)
  }, [])
  
  // SSR時は空のコンテナのみ
  if (!content) {
    return <div id="app-container">Loading...</div>
  }
  
  return (
    <div id="app-container">
      <nav>
        {navigation.map(item => (
          <a key={item.url} href={item.url}>{item.label}</a>
        ))}
      </nav>
      <main>
        <h1>{content.title}</h1>
        <p>{content.description}</p>
        <ul>
          {content.profiles.map((profile: any) => (
            <li key={profile.id}>
              <a href={profile.url}>{profile.name}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
```

## テスト方法

### 開発サーバー起動
```bash
npm run dev
```

### 各サイトへのアクセス
- StaticLand: http://localhost:3000/static
- DynamicMaze: http://localhost:3000/dynamic  
- ClientShadow: http://localhost:3000/client-only
- BotWarden: http://localhost:3000/anti-bot (User-Agent次第でブロック)

### クローラーテスト例
```bash
# 正常なクローラー (User-Agent偽装)
curl -H "User-Agent: Mozilla/5.0 (compatible; TestCrawler/1.0)" http://localhost:3000/anti-bot

# ブロックされるクローラー
curl -H "User-Agent: Googlebot/2.1" http://localhost:3000/anti-bot
```

この実装ガイドに従うことで、仕様書に完全準拠した4サイト構成のMetaCrawlableを構築できます。