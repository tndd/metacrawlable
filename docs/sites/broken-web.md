# BrokenWeb

**目的:** 404エラーとサイトマップと一致しないURLに対するクローラーのエラー処理をテスト。

**モデル:** メンテナンスが不十分なレガシーCMS

**ルート:** `/trap-broken`

## 構造

```
/trap-broken             ← ホームページ
/trap-broken/pages/[id] ← ページ（半分は404につながる）
```

## 主要機能

### 404生成ロジック（決定論的）

**破損ページの特定:**
```javascript
// ページIDが偶数の場合に404を返す
function shouldReturn404(pageId: string): boolean {
  const numericId = parseInt(pageId)
  return !isNaN(numericId) && numericId % 2 === 0
}
```

**404ページリスト（固定）:**
```
/trap-broken/pages/2  → 404
/trap-broken/pages/4  → 404  
/trap-broken/pages/6  → 404
/trap-broken/pages/8  → 404
/trap-broken/pages/10 → 404
... (全ての偶数ID)
```

**有効ページリスト:**
```
/trap-broken/pages/1  → 正常表示
/trap-broken/pages/3  → 正常表示
/trap-broken/pages/5  → 正常表示
/trap-broken/pages/7  → 正常表示
/trap-broken/pages/9  → 正常表示
... (全ての奇数ID)
```

### エラーレスポンス詳細

**404エラー仕様:**
- HTTPステータス: `404 Not Found`
- レスポンス本文: カスタムHTMLページ（SEO/パーサーテスト用）
- 追加ヘッダー: `X-Error-Type: intentional-404`

**404ページHTML:**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Page Not Found - BrokenWeb</title>
  <meta name="robots" content="noindex,nofollow">
</head>
<body>
  <h1>404 - Page Not Found</h1>
  <p>The requested page does not exist.</p>
  <nav>
    <a href="/trap-broken">Back to Home</a>
    <a href="/trap-broken/pages/1">Try Page 1</a>
  </nav>
</body>
</html>
```

### 内部リンク構造

- ホームページに1-30のページへのリンクを表示（全て表示、404も含む）
- 有効ページ（奇数）からは3-5個の他ページへリンク（一部は404ページ）
- 404ページは上記のHTMLのみで追加リンクなし

## Sitemap/Robots

**サイトマップ（汚染版）:**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com/trap-broken</loc></url>
  <url><loc>https://example.com/trap-broken/pages/1</loc></url>
  <url><loc>https://example.com/trap-broken/pages/2</loc></url> <!-- 404 -->
  <url><loc>https://example.com/trap-broken/pages/3</loc></url>
  <url><loc>https://example.com/trap-broken/pages/4</loc></url> <!-- 404 -->
  ... <!-- 1-30まで全て記載、偶数は404を返す -->
</urlset>
```

**robots.txt:** `Allow: /` （標準許可設定）

### クローラーテスト要件

**期待される動作:**
1. サイトマップから30ページを発見
2. 15ページ（偶数ID）で404エラーに遭遇
3. エラーハンドリング戦略のテスト:
   - 404ページの再試行回数
   - サイトマップの信頼性評価
   - エラー率の許容しきい値
4. 有効ページ（奇数ID）からのリンク発見能力

## クローラーテスト

- 404レスポンス処理
- 再試行ロジックとサイトマップ信頼性

**最小ページ数:** 30ページ以上（15ページ以上が破損）