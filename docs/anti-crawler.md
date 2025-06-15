# アンチクローラー機構

4つの核心サイトは、クローラーの回復力の異なる側面をテストするために、特定のアンチクローラー機能を実装します。

## 実装要件

| 機能                     | 適用対象      | 実装要件                                                          |
| ------------------------ | ------------- | ----------------------------------------------------------------------- |
| **静的構造解析**          | `static`      | セマンティックHTML、内部リンク、標準的なマークアップ構造                 |
| **動的DOMランダム化**      | `dynamic`     | Server Components で毎リクエスト時にDOM構造を変更                      |
| **JavaScript専用コンテンツ** | `client-only` | `useEffect()`でクライアントサイドのみレンダリング、SSR出力は空           |
| **ボットミドルウェア**      | `anti-bot`    | `middleware.ts`でUser-Agent検査、既知ボットをブロック                  |

これらの動作からの逸脱はすべて**重大なエラー**とみなされなければなりません。

## テスト戦略

### 1. StaticLand - 構造解析テスト
- **目的**: セマンティックHTML解析能力
- **テスト内容**: 
  - 内部リンク巡回
  - `<article>`, `<nav>`, `<footer>`要素認識
  - 相対/絶対リンク処理
  - メタデータ抽出

### 2. DynamicMaze - 動的対応テスト

**DOMランダム化アルゴリズム（修正版）:**

```typescript
// Server Component内で実行（sessionStorage依存を削除）
export default function DynamicPage() {
  // リクエスト毎に異なる構造を生成
  const layoutVariant = Math.floor(Math.random() * 3) + 1
  const sectionOrder = ['intro', 'main', 'conclusion'].sort(() => Math.random() - 0.5)
  const showSidebar = Math.random() > 0.4
  
  return (
    <div className={`layout-variant-${layoutVariant}`}>
      {sectionOrder.map((section, index) => (
        <section key={section} className={`section-${section} order-${index}`}>
          {/* コンテンツ */}
        </section>
      ))}
      {showSidebar && <aside className="sidebar">...</aside>}
    </div>
  )
}
```

### 3. ClientShadow - JavaScript実行テスト

```typescript
'use client'
import { useEffect, useState } from 'react'

export default function ClientOnlyPage() {
  const [content, setContent] = useState<string>('')
  
  useEffect(() => {
    // JavaScript実行後のみコンテンツ表示
    setContent('This content only appears with JavaScript enabled.')
  }, [])
  
  // SSR時は空のHTMLを返す
  return <div>{content}</div>
}
```

### 4. BotWarden - User-Agent検出テスト

**実装例（middleware.ts）:**
```typescript
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    const userAgent = request.headers.get('user-agent') || ''
    
    if (isBotUserAgent(userAgent)) {
      return new Response('<h1>Access Denied</h1><p>Automated access detected.</p>', {
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
```

**ブロック時のレスポンス:**
- HTTPステータス: `403 Forbidden`
- レスポンス本文: `<h1>Access Denied</h1><p>Automated access detected.</p>`
- 追加ヘッダー: `X-Bot-Detected: true`