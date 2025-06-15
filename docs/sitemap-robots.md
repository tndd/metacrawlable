# サイトマップとRobots.txtルール

各モックサイトに対して以下のサイトマップ/robotsロジックを実装する必要があります：

## 設定マトリックス

| サイト名        | sitemap.xml | robots.txt内容  | 期待される結果                                                            |
| -------------- | ----------- | ----------- | ------------------------------------------------------------------------ |
| `StaticLand`   | ✅ 完全版    | `Allow: /`   | 完全に表示されクロール可能                                                  |
| `DynamicMaze`  | ❌ 含まれない | `Disallow: /dynamic` | robots.txtルールによってインデックシングから除外                             |
| `ClientShadow` | ✅ 完全版    | **ファイルなし** | サイトマップにリストされているがJSなしではコンテンツが不可視                      |
| `MapTown`      | ✅ 完全版    | `Allow: /`   | マップAPIコンテンツ、JS必須でレンダリング                                     |
| `BotWarden`    | ❌ 含まれない | `Disallow: /anti-bot` + ミドルウェア拒否 | robots.txt+ミドルウェアで二重ブロック |
| `LinkSpiral`   | ✅ 部分版    | `Allow: /`   | サイトマップに基本パスのみ、無限深度は発見要                                   |
| `BrokenWeb`    | ✅ 汚染版    | `Allow: /`   | サイトマップに存在しないページを含み、404を返す                               |
| `MetaLie`      | ✅ 完全版    | `Allow: /`   | 正常アクセス可能だが、メタデータと実コンテンツが不一致                          |
| `NoMapZone`    | ❌ 含まれない | **ファイルなし** | 完全に有機的発見が必要、ガイダンスなし                                       |
| `HalfMapSite`  | ✅ 部分版    | `Allow: /`   | 50%のページのみサイトマップ記載、残りはリンク発見要                           |

## 実装詳細

### サイトマップタイプ

**完全サイトマップ**: サイトのすべての利用可能なページをリスト
- すべての有効なルートを含む
- 正確なlastmod日付を提供
- 適切な優先度値を含む

**部分的サイトマップ**: 意図的に一部の既存ページを省略
- 実際のコンテンツの50%のみをリスト
- クローラーにリンク発見を強制
- クローラーの完全性戦略をテスト

**汚染サイトマップ**: 無効または存在しないURLを含む
- 意図的にデッドリンクを含む
- エラーハンドリング機能をテスト
- リトライロジックを検証

### Robots.txtバリエーション

**すべて許可**: 標準的な許可設定（StaticLand, MapTown, LinkSpiral, BrokenWeb, MetaLie, HalfMapSite）
```
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

**特定パス禁止**: 特定のパスへのアクセスをブロック（DynamicMaze, BotWarden）
```
User-agent: *
Disallow: /dynamic
Disallow: /anti-bot
Allow: /
```

**robots.txtファイルなし**: HTTPステータス404を返す（ClientShadow, NoMapZone）
- ファイルは存在せず、`/robots.txt`アクセス時に404エラー
- デフォルトクローラー動作をテスト（通常は全許可として扱われる）
- 有機的発見方法を強制

### 動的robots.txt配信

実装では、アクセスされたパスに基づいてrobots.txtの内容を動的に変更する必要があります：

```javascript
// middleware.ts または api/robots.txt
if (pathname === '/robots.txt') {
  // リクエストのRefererやUser-Agentに基づいて
  // 異なるrobots.txtを配信
}
```

### テストへの影響

各設定は特定のクローラー機能をテストします：
- **コンプライアンス**: robots.txtディレクティブの遵守
- **発見**: サイトマップのガイダンスなしでページを発見
- **エラーハンドリング**: 404やブロークンリンクの管理
- **完全性**: すべての利用可能なコンテンツの発見