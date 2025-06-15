# DynamicMaze

**目的:** 動的DOM構造変更に対するクローラーの適応能力をテスト

**テスト領域:** 動的構造対応、セレクター堅牢性、部分サイトマップからの発見

**ルート:** `/dynamic`

## 構造

```
/dynamic                  ← ホームページ（毎回異なるレイアウト）
/dynamic/sections/[id]    ← セクションページ（20ページ）
/dynamic/random           ← 完全ランダム構造ページ
```

## 実装要件

### 動的構造生成
```typescript
// app/dynamic/page.tsx (Server Component)
export default function DynamicPage() {
  // リクエスト毎に異なる構造
  const layoutVariant = Math.floor(Math.random() * 3) + 1
  const sectionOrder = ['news', 'featured', 'trending'].sort(() => Math.random() - 0.5)
  const showSidebar = Math.random() > 0.3
  
  return (
    <div className={`layout-v${layoutVariant}`}>
      <header className="header">Dynamic Maze</header>
      {sectionOrder.map((section, index) => (
        <section key={section} className={`section-${section} order-${index}`}>
          <h2>Section: {section}</h2>
          {/* 動的コンテンツ */}
        </section>
      ))}
      {showSidebar && (
        <aside className={`sidebar-${Math.floor(Math.random() * 5)}`}>
          Sidebar Content
        </aside>
      )}
    </div>
  )
}
```

### 変動要素
- **レイアウトパターン**: 3種類のCSSレイアウト
- **セクション順序**: ランダムシャッフル
- **サイドバー表示**: 70%確率で表示
- **CSS クラス名**: 動的サフィックス（`-1`〜`-5`）
- **広告スロット**: 0-3個のランダム配置

### セクションページ
```typescript
// app/dynamic/sections/[id]/page.tsx
export default function SectionPage({ params }: { params: { id: string } }) {
  const contentVariations = ['long', 'short', 'medium']
  const selectedVariation = contentVariations[parseInt(params.id) % 3]
  
  return (
    <article className={`content-${selectedVariation}`}>
      <h1>Section {params.id}</h1>
      {/* 可変長コンテンツ */}
    </article>
  )
}
```

## Sitemap/Robots設定

- **Sitemap**: 部分版（20ページ中6ページのみ記載）
- **Robots.txt**: `Allow: /dynamic`

## クローラーテスト観点

1. **構造変動対応**: 毎回異なるDOM構造への適応
2. **セレクター堅牢性**: 動的クラス名での要素発見
3. **有機的発見**: サイトマップにない14ページの発見能力
4. **コンテンツ一貫性**: 構造変化でも同一コンテンツの認識

**ページ数:** 22ページ（ホーム1 + セクション20 + ランダム1）