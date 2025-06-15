# 🕷️ MetaCrawlable

**効率的なクローラーテスト用モックWebサーバー** - 4つの核心的なテストサイトで主要なクローラー課題を網羅

## 🎯 概要

Next.js App Routerで実装する、実装可能で一貫したクローラーテストベッド。複雑さを管理可能なレベルに抑えつつ、重要なクローラー機能を体系的にテストします。

## 🚀 4つの核心テストサイト

| サイト | ルート | テスト領域 | ページ数 |
|--------|--------|------------|----------|
| **[StaticLand](docs/sites/static-land.md)** | `/static` | 構造解析・リンク巡回 | 37ページ |
| **[DynamicMaze](docs/sites/dynamic-maze.md)** | `/dynamic` | 動的DOM対応 | 22ページ |
| **[ClientShadow](docs/sites/client-shadow.md)** | `/client-only` | JavaScript実行 | 27ページ |
| **[BotWarden](docs/sites/bot-warden.md)** | `/anti-bot` | アクセス制御突破 | 3ページ |

**総計**: 89ページの包括的テスト環境

## 📚 ドキュメント

### 仕様書
- **[プロジェクト概要](docs/overview.md)** - 目的と4サイト設計思想
- **[実装構造](docs/structure.md)** - Next.js App Router構成
- **[実装ガイド](docs/implementation-guide.md)** - 完全なコード例と手順
- **[アンチクローラー機構](docs/anti-crawler.md)** - 各サイトのテスト戦略
- **[Sitemap/Robots.txt設定](docs/sitemap-robots.md)** - 統合配信仕様

### サイト別仕様
- **[StaticLand仕様](docs/sites/static-land.md)** - セマンティックHTML + メタデータ
- **[DynamicMaze仕様](docs/sites/dynamic-maze.md)** - Server Components動的生成
- **[ClientShadow仕様](docs/sites/client-shadow.md)** - useEffect CSR専用
- **[BotWarden仕様](docs/sites/bot-warden.md)** - middleware User-Agent検出

## ⚡ 実装要件

```bash
# 推奨技術スタック
Next.js 14+ (App Router)
TypeScript
React 18+
```

### 核心アーキテクチャ
```
app/
├── static/              # StaticLand - 静的生成
├── dynamic/             # DynamicMaze - 動的構造
├── client-only/         # ClientShadow - CSR専用
├── anti-bot/            # BotWarden - UA検出
├── robots.txt/route.ts  # 統合robots.txt
├── sitemap.ts           # 統合sitemap
└── layout.tsx

middleware.ts            # BotWarden用UA検出
```

## 🔧 特徴

✅ **実装可能性**: Next.js App Router制約に完全準拠  
✅ **一貫性**: robots.txt/sitemapの矛盾を解消  
✅ **効率性**: 重要機能に焦点を絞った4サイト構成  
✅ **スケーラビリティ**: 段階的な機能追加が可能  

## 🎮 テストケース

各サイトで以下のクローラー能力をテスト：

1. **HTML構造解析** (StaticLand)
2. **動的変化対応** (DynamicMaze)  
3. **JavaScript実行** (ClientShadow)
4. **アクセス制御回避** (BotWarden)

完全な仕様に従えば、ほとんどの実世界サイトの複雑さを上回るテスト環境を構築できます。
