# サイトマップとRobots.txtルール

4つの核心サイトに対して以下のサイトマップ/robotsロジックを実装する必要があります：

## 設定マトリックス

| サイト名        | sitemap.xml | robots.txt内容           | 期待される結果                                     |
| -------------- | ----------- | ----------------------- | ------------------------------------------------- |
| `StaticLand`   | ✅ 完全版    | `Allow: /static`        | 完全に表示され、クロール可能                          |
| `DynamicMaze`  | ✅ 部分版    | `Allow: /dynamic`       | サイトマップに一部のみ記載、動的発見が必要              |
| `ClientShadow` | ❌ 含まれない | `Allow: /client-only`   | サイトマップなし、JSなしでは空コンテンツ               |
| `BotWarden`    | ❌ 含まれない | `Disallow: /anti-bot`   | robots.txt禁止 + ミドルウェアで二重ブロック           |

## 実装詳細

### サイトマップタイプ

**完全サイトマップ（StaticLand）**: サイトのすべての利用可能なページをリスト
- すべての有効なルートを含む
- 正確なlastmod日付を提供
- 適切な優先度値を含む

**部分的サイトマップ（DynamicMaze）**: 意図的に一部の既存ページを省略
- 実際のコンテンツの30%のみをリスト
- クローラーにリンク発見を強制
- クローラーの完全性戦略をテスト

**サイトマップなし（ClientShadow, BotWarden）**: サイトマップに含まれない
- 有機的リンク発見のみ
- クローラーの探索能力をテスト

### 統合Robots.txt実装

単一の`robots.txt`で4サイトすべてを制御：

```txt
User-agent: *
Allow: /static
Allow: /dynamic  
Allow: /client-only
Disallow: /anti-bot

Sitemap: https://example.com/sitemap.xml
```

### 動的robots.txt配信

Next.js App Routerを使用した実装：

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

### 統合Sitemap実装

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://example.com'
  
  return [
    // StaticLand - 完全版
    { url: `${baseUrl}/static`, priority: 1.0 },
    { url: `${baseUrl}/static/articles/1`, priority: 0.8 },
    { url: `${baseUrl}/static/articles/2`, priority: 0.8 },
    // ... 全30記事を含む
    
    // DynamicMaze - 部分版（30%のみ）
    { url: `${baseUrl}/dynamic`, priority: 0.7 },
    { url: `${baseUrl}/dynamic/sections/1`, priority: 0.6 },
    { url: `${baseUrl}/dynamic/sections/3`, priority: 0.6 },
    // ... 20ページ中6ページのみ含む
    
    // ClientShadow, BotWarden - 含まれない
  ]
}
```

### テストへの影響

各設定は特定のクローラー機能をテストします：
- **StaticLand**: robots.txtコンプライアンス + 完全サイトマップ活用
- **DynamicMaze**: 部分サイトマップからの有機的発見能力  
- **ClientShadow**: サイトマップなしでのリンク探索
- **BotWarden**: robots.txt禁止ルールの遵守