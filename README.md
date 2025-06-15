# 🕷️ MetaCrawlable

敵対的クローラーテスト用のモックWebサーバー。

## 📚 ドキュメント

- [プロジェクト概要](docs/overview.md) - 目的と目標
- [プロジェクト構造](docs/structure.md) - ディレクトリ構成とアーキテクチャ
- [モックサイト](docs/sites/) - 各テストサイトの詳細仕様
- [アンチクローラー機構](docs/anti-crawler.md) - テスト戦略と機能
- [サイトマップ・robots.txtルール](docs/sitemap-robots.md) - 設定要件

## クイックスタート

このプロジェクトは、Next.js App Routerを使用してモックWebサーバーを実装するためのドキュメントと仕様を提供します。

## モックサイト概要

| サイト | ルート | 目的 |
|------|-------|---------|
| [StaticLand](docs/sites/static-land.md) | `/static` | 静的HTMLベースライン |
| [DynamicMaze](docs/sites/dynamic-maze.md) | `/dynamic` | サーバーサイド動的生成 |
| [ClientShadow](docs/sites/client-shadow.md) | `/client-only` | JavaScript専用レンダリング |
| [MapTown](docs/sites/map-town.md) | `/map` | 埋め込みマップテスト |
| [BotWarden](docs/sites/bot-warden.md) | `/anti-bot` | User-Agentブロック |
| [LinkSpiral](docs/sites/link-spiral.md) | `/trap/[slug]` | 再帰的リンクトラップ |
| [BrokenWeb](docs/sites/broken-web.md) | `/trap-broken` | 404エラーハンドリング |
| [MetaLie](docs/sites/meta-lie.md) | `/meta-fake` | 誤解を招くメタデータ |
| [NoMapZone](docs/sites/no-map-zone.md) | `/no-sitemap` | リンク発見のみ |
| [HalfMapSite](docs/sites/half-map-site.md) | `/partial-map` | 不完全なサイトマップ |