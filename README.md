# 🕷️ MetaCrawlable

敵対的クローラーテスト用のモック Web サーバー。

## 📚 ドキュメント

- [目的と目標](docs/overview.md)
- [プロジェクト構造](docs/structure.md)
- [各サイトの仕様一覧](docs/sites/)
- [アンチクローラー機構](docs/anti-crawler.md)
- [サイトマップ・robots.txt ルール](docs/sitemap-robots.md)

## クイックスタート

このプロジェクトは、Next.js App Router を使用してモック Web サーバーを実装するためのドキュメントと仕様を提供します。

## 各サイト概要

| サイト                                      | ルート         | 目的                        |
| ------------------------------------------- | -------------- | --------------------------- |
| [StaticLand](docs/sites/static-land.md)     | `/static`      | 静的 HTML ベースライン      |
| [DynamicMaze](docs/sites/dynamic-maze.md)   | `/dynamic`     | サーバーサイド動的生成      |
| [ClientShadow](docs/sites/client-shadow.md) | `/client-only` | JavaScript 専用レンダリング |
| [MapTown](docs/sites/map-town.md)           | `/map`         | 埋め込みマップテスト        |
| [BotWarden](docs/sites/bot-warden.md)       | `/anti-bot`    | User-Agent ブロック         |
| [LinkSpiral](docs/sites/link-spiral.md)     | `/trap/[slug]` | 再帰的リンクトラップ        |
| [BrokenWeb](docs/sites/broken-web.md)       | `/trap-broken` | 404 エラーハンドリング      |
| [MetaLie](docs/sites/meta-lie.md)           | `/meta-fake`   | 誤解を招くメタデータ        |
| [NoMapZone](docs/sites/no-map-zone.md)      | `/no-sitemap`  | リンク発見のみ              |
| [HalfMapSite](docs/sites/half-map-site.md)  | `/partial-map` | 不完全なサイトマップ        |
