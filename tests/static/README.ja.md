# StaticLand テスト結果

## 概要
このディレクトリには、全StaticLandページの存在と適切な機能を検証する包括的なテストが含まれています。

## テスト対象

### 検証されたページ（36ページ総計）
✅ **1 ホームページ**
- `/static` - StaticLand ホームページ

✅ **30 記事ページ**
- `/static/articles/1` から `/static/articles/30`
- 各記事は独自のタイトルとコンテンツを持つ
- 全記事が適切にカテゴリ分類されている

✅ **5 カテゴリページ**
- `/static/categories/technology` - テクノロジー記事（6記事）
- `/static/categories/science` - サイエンス記事（6記事）
- `/static/categories/business` - ビジネス記事（6記事）
- `/static/categories/sports` - スポーツ記事（7記事）
- `/static/categories/entertainment` - エンターテイメント記事（5記事）

## テスト結果
全テストが合格：
- ✅ ホームページが正しいタイトルと見出しで読み込み
- ✅ 30記事ページ全てが正しいタイトルで存在
- ✅ 5カテゴリページ全てが正しい名前で存在
- ✅ ナビゲーションリンクが正しく動作
- ✅ 全ページがHTTP 200ステータスを返す
- ✅ 総ページ数が検証済み（36ページ）

## テストの実行
```bash
# StaticLandテストのみ実行
npm run test:static

# 全テスト実行（全サイト）
npm run test

# StaticLandテストレポート表示
npm run test:report:static

# 統合テストレポート表示（全サイト）
npm run test:report
```

## テスト出力構造
```
tests/
├── static/
│   ├── pages.spec.ts     # テストファイル
│   ├── README.md         # 英語ドキュメント
│   ├── README.ja.md      # 日本語ドキュメント
│   └── result/           # テスト結果（git無視）
│       └── {timestamp}/  # タイムスタンプ付きテスト実行（YYYY-MM-DDTHH-MM-SS）
│           ├── artifacts/    # スクリーンショット、動画、トレース
│           └── reports/      # HTMLとJSONレポート
│               ├── html/     # HTMLテストレポート
│               └── results.json
└── (今後のサイト)/
    ├── dynamic/
    │   └── result/
    │       └── {timestamp}/  # DynamicMaze タイムスタンプ結果
    ├── client-only/
    │   └── result/
    │       └── {timestamp}/  # ClientShadow タイムスタンプ結果
    └── anti-bot/
        └── result/
            └── {timestamp}/  # BotWarden タイムスタンプ結果
```

**タイムスタンプ構造の利点：**
- ✅ テスト実行間のファイル競合なし
- ✅ 過去のテスト結果が保持される
- ✅ 各タイムスタンプ内でシンプルなフラット構造
- ✅ gitignoreパターンによる自動クリーンアップ

## テストフレームワーク
- **Playwright** - エンドツーエンドテストフレームワーク
- **TypeScript** - 型安全なテスト定義
- **Chromium** - テスト用ブラウザエンジン

このテストは、StaticLandがMetaCrawlableプロジェクトの包括的な静的HTMLテスト環境仕様を満たすことを検証します。