# ClientShadow

**目的:** JavaScript実行を必須とするSPAスタイルサイトでのクローラー対応能力をテスト

**テスト領域:** JavaScript実行、CSR専用コンテンツ、動的ナビゲーション

**ルート:** `/client-only`

## 構造

```
/client-only               ← ホームページ（JS後にコンテンツ表示）
/client-only/profile/[id]  ← プロフィールページ（25ページ）
/client-only/dashboard     ← ダッシュボード（複雑なJS操作）
```

## 実装要件

### クライアント専用レンダリング
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
        articles: Array.from({ length: 10 }, (_, i) => ({
          id: i + 1,
          title: `Article ${i + 1}`,
          url: `/client-only/profile/${i + 1}`
        }))
      })
      
      setNavigation([
        { label: 'Home', url: '/client-only' },
        { label: 'Dashboard', url: '/client-only/dashboard' },
        { label: 'Profiles', url: '/client-only/profile/1' }
      ])
    }, 100) // わずかな遅延でJS実行を明確化
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
          {content.articles.map((article: any) => (
            <li key={article.id}>
              <a href={article.url}>{article.title}</a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  )
}
```

### プロフィールページ
```typescript
// app/client-only/profile/[id]/page.tsx
'use client'
import { useEffect, useState } from 'react'

export default function ProfilePage({ params }: { params: { id: string } }) {
  const [profile, setProfile] = useState<any>(null)
  
  useEffect(() => {
    // API風のデータ取得をシミュレート
    setTimeout(() => {
      setProfile({
        id: params.id,
        name: `User ${params.id}`,
        bio: `Biography for user ${params.id}`,
        posts: [`Post A by User ${params.id}`, `Post B by User ${params.id}`]
      })
    }, 150)
  }, [params.id])
  
  if (!profile) {
    return <div>Loading profile...</div>
  }
  
  return (
    <article>
      <h1>{profile.name}</h1>
      <p>{profile.bio}</p>
      <ul>
        {profile.posts.map((post: string, index: number) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </article>
  )
}
```

## Sitemap/Robots設定

- **Sitemap**: 含まれない（有機的発見のみ）
- **Robots.txt**: `Allow: /client-only`

## クローラーテスト観点

1. **JavaScript実行**: useEffectによるコンテンツ生成の検出
2. **動的ナビゲーション**: JS生成リンクの発見と巡回
3. **遅延レンダリング**: setTimeout後のコンテンツ取得
4. **SPA対応**: クライアントサイドルーティングの処理

**ページ数:** 27ページ（ホーム1 + プロフィール25 + ダッシュボード1）