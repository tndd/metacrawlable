# アンチクローラー機構

各サイトは、クローラーの回復力の異なる側面をテストするために、特定のアンチクローラー機能を実装します。

## 実装要件

| 機能                     | 適用対象      | 実装要件                                                          |
| ------------------------ | ------------- | ----------------------------------------------------------------------- |
| JavaScript専用コンテンツ    | `client-only` | `useEffect()`を使用してロード後にコンテンツをレンダリング。SSR出力は空。    |
| SSR + DOMランダム化     | `dynamic`     | ロード毎に乱数生成 + DOMシャッフル。                                  |
| ボットミドルウェア         | `anti-bot`    | `middleware.ts`を使用してヘッダーを検査し、既知ボットUAをブロック。        |
| サイトマップ汚染          | `trap-broken` | sitemap.xmlに意図的に存在しないページを含める。                    |
| 再帰的リンクトラップ     | `trap/[slug]` | スラッグはさらなるスラッグにリンクし、無限ナビゲーションループを形成。  |
| メタデータ不一致        | `meta-fake`   | HTMLコンテンツはheadメタデータと大きく異なる必要がある。            |
| robots.txt不一致       | varies        | 一部のパスは明示的に禁止、他は全く言及されない。                       |

これらの動作からの逸脱はすべて**重大なエラー**とみなされなければなりません。

## テスト戦略

### JavaScript実行テスト
- サーバーサイドコンテンツがないページ
- 動的コンテンツインジェクション
- マップレンダリング要件

### User-Agent検出

**BotWardenで実装する具体的Bot検出ロジック:**

**ブロック対象User-Agent（完全一致）:**
```
Googlebot
Bingbot
Slurp
DuckDuckBot
Baiduspider
YandexBot
facebookexternalhit
Twitterbot
```

**ブロック対象User-Agent（部分一致）:**
```
- 文字列に "bot" を含む（大文字小文字無視）
- 文字列に "crawler" を含む（大文字小文字無視）
- 文字列に "spider" を含む（大文字小文字無視）
- User-Agentが空または未設定
```

**ブロック時のレスポンス:**
- HTTPステータス: `403 Forbidden`
- レスポンス本文: `<h1>Access Denied</h1><p>Automated access detected.</p>`
- 追加ヘッダー: `X-Bot-Detected: true`

**許可されるUser-Agent（テスト用）:**
```
Mozilla/5.0 (compatible; TestCrawler/1.0)
curl/7.x.x
wget/1.x.x
```

**実装例（middleware.ts）:**
```javascript
import { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    const userAgent = request.headers.get('user-agent') || ''
    
    // Bot検出ロジック
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
}
```

### 構造的課題（DynamicMaze実装詳細）

**DOMランダム化アルゴリズム:**

**1. 動的クラス名/ID生成:**
```javascript
// Server Component内で実行
const sessionId = Math.random().toString(36).substring(2, 15)
const randomSuffix = Date.now() % 1000

// 動的クラス名例
const containerClass = `container-${sessionId}`
const articleClass = `article-${randomSuffix}`
const sidebarId = `sidebar-${Math.floor(Math.random() * 100)}`
```

**2. コンテンツ要素シャッフル:**
```javascript
// 記事セクションの順序をランダム化
const sections = ['intro', 'main', 'conclusion', 'related']
const shuffledSections = sections.sort(() => Math.random() - 0.5)

// DOMに反映
shuffledSections.forEach((section, index) => {
  // order-${index} クラスで位置制御
})
```

**3. 広告プレースホルダー動的配置:**
```javascript
// 1-5個のランダム広告スロット
const adCount = Math.floor(Math.random() * 5) + 1
const adPositions = Array.from({length: adCount}, () => 
  Math.floor(Math.random() * 10) // 0-9の位置
)
```

**4. 必須変動要素:**
- ナビゲーションメニューの順序（毎回5パターンからランダム選択）
- サイドバー要素の表示/非表示（60%確率で表示）
- フッターリンクの並び順
- 見出しのh1/h2レベルランダム変更（内容は同じ、タグレベルのみ変更）
- CSSクラス名に`-v1`〜`-v5`のバリエーション追加

**5. 一貫性要件:**
- 同一セッション内では同じ構造を維持（sessionStorageベース）
- コンテンツの意味は変更しない（SEOテスト用）
- 全ての要素は15秒以内にレンダリング完了

### ナビゲーショントラップ
- 無限再帰パス
- ブロークンリンクハンドリング
- 誤解を招くサイトマップエントリ

### メタデータ不一致
- 偽のメタ説明
- 誤解を招くJSON-LDスキーマ
- タイトル/コンテンツの不一致