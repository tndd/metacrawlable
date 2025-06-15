# StaticLand

**目的:** セマンティックHTML解析とリンク巡回の基礎能力を評価するベースラインテストサイト

**テスト領域:** 構造解析、内部リンク巡回、メタデータ抽出

**ルート:** `/static`

## 構造

```
/static                    ← ホームページ（記事一覧、ナビゲーション）
/static/articles/[id]      ← 個別記事ページ（30ページ）
/static/categories/[name]  ← カテゴリ別記事一覧（5カテゴリ）
```

## 実装要件

### 静的生成
```typescript
// app/static/articles/[id]/page.tsx
export async function generateStaticParams() {
  return Array.from({ length: 30 }, (_, i) => ({
    id: (i + 1).toString()
  }))
}
```

### セマンティック構造
- `<article>` - 各記事コンテンツ
- `<nav>` - サイト内ナビゲーション
- `<footer>` - サイト情報、リンク集
- 適切な見出し階層（`<h1>`, `<h2>`, `<h3>`）
- 内部リンク網（各記事から3-5記事へリンク）

### メタデータ
```typescript
export const metadata: Metadata = {
  title: 'Article Title',
  description: 'Article description',
  openGraph: {
    title: 'Article Title',
    description: 'Article description',
  }
}
```

## Sitemap/Robots設定

- **Sitemap**: 全ページ含む（完全版）
- **Robots.txt**: `Allow: /static`

## クローラーテスト観点

1. **HTML構造解析**: セマンティック要素の認識
2. **リンク巡回**: 内部リンクの完全発見
3. **メタデータ抽出**: title, description, OpenGraphの取得
4. **サイトマップ活用**: sitemap.xmlとの整合性確認

**ページ数:** 37ページ（ホーム1 + 記事30 + カテゴリ5 + about1）