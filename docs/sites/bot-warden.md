# BotWarden

**目的:** User-Agentベースのボット検出・ブロックに対するクローラーの回避能力をテスト

**テスト領域:** User-Agent偽装、アクセス制御突破、403エラー処理

**ルート:** `/anti-bot`

## 構造

```
/anti-bot                ← ホームページ（UA検査でブロック/許可）
/anti-bot/protected      ← 保護されたコンテンツページ
/anti-bot/honeypot      ← ハニーポット（ボット誘導用）
```

## 実装要件

### ミドルウェア実装
```typescript
// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    const userAgent = request.headers.get('user-agent') || ''
    
    if (isBotUserAgent(userAgent)) {
      return new Response(`
        <html>
          <head><title>Access Denied</title></head>
          <body>
            <h1>Access Denied</h1>
            <p>Automated access detected.</p>
            <a href="/anti-bot/honeypot">Click here for support</a>
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
  const blockedBots = [
    'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 
    'Baiduspider', 'YandexBot', 'facebookexternalhit'
  ]
  const blockedPatterns = ['bot', 'crawler', 'spider']
  
  return blockedBots.some(bot => userAgent.includes(bot)) ||
         blockedPatterns.some(pattern => userAgent.toLowerCase().includes(pattern)) ||
         userAgent === ''
}
```

### 許可されたページ
```typescript
// app/anti-bot/page.tsx
export default function AntiBotPage() {
  return (
    <div>
      <h1>Bot Warden - Access Control</h1>
      <p>You have successfully accessed this protected area.</p>
      <nav>
        <a href="/anti-bot/protected">Protected Content</a>
        <a href="/anti-bot/honeypot">Honeypot</a>
      </nav>
      <p>This content is only visible to non-bot user agents.</p>
    </div>
  )
}
```

### ハニーポット
```typescript
// app/anti-bot/honeypot/page.tsx
export default function HoneypotPage() {
  return (
    <div>
      <h1>Support Page</h1>
      <p>This is a honeypot page designed to detect bots.</p>
      <div style={{ display: 'none' }}>
        <a href="/anti-bot/trap1">Hidden Link 1</a>
        <a href="/anti-bot/trap2">Hidden Link 2</a>
      </div>
    </div>
  )
}
```

## Sitemap/Robots設定

- **Sitemap**: 含まれない
- **Robots.txt**: `Disallow: /anti-bot`

## クローラーテスト観点

1. **User-Agent偽装**: ボット検出を回避するUA変更能力
2. **403エラー処理**: アクセス拒否時の適切な処理
3. **ハニーポット回避**: 隠されたトラップリンクの認識
4. **robots.txt遵守**: 禁止パスへのアクセス制御

**ページ数:** 3ページ（ホーム1 + 保護1 + ハニーポット1）

## 期待される動作

- **適切なクローラー**: robots.txtを遵守し、アクセスしない
- **不適切なクローラー**: 403エラーまたはハニーポットに誘導される
- **高度なクローラー**: User-Agent変更でアクセス成功