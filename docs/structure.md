# プロジェクト構造

## ドキュメント構造

このリポジトリには、MetaCrawlableプロジェクトのドキュメントと仕様が含まれています：

```
.
├── README.md                    # メインプロジェクト概要
├── docs/
│   ├── overview.md             # プロジェクトの目的と目標
│   ├── structure.md            # このファイル - プロジェクト構造
│   ├── anti-crawler.md         # アンチクローラー機構
│   ├── sitemap-robots.md       # サイトマップとrobots.txtルール
│   └── sites/                  # 個別サイト仕様
│       ├── static-land.md      # StaticLand仕様
│       ├── dynamic-maze.md     # DynamicMaze仕様
│       ├── client-shadow.md    # ClientShadow仕様
│       ├── map-town.md         # MapTown仕様
│       ├── bot-warden.md       # BotWarden仕様
│       ├── link-spiral.md      # LinkSpiral仕様
│       ├── broken-web.md       # BrokenWeb仕様
│       ├── meta-lie.md         # MetaLie仕様
│       ├── no-map-zone.md      # NoMapZone仕様
│       └── half-map-site.md    # HalfMapSite仕様
```

## 実装構造

Next.js実装は以下の構造に従うべきです：

```
your-project/
├── app/
│   ├── static/
│   ├── dynamic/
│   ├── client-only/
│   ├── map/
│   ├── anti-bot/
│   ├── trap/[slug]/
│   ├── trap-broken/
│   ├── meta-fake/
│   ├── no-sitemap/
│   ├── partial-map/
│   └── layout.tsx
├── middleware.ts         # アンチボットUser-Agent検出に必要
├── public/
│   ├── robots.txt         # 複数バージョンが条件付きで提供される場合がある
│   └── sitemap.xml        # 完全版と破損版の両方を含む必要がある
├── next.config.js         # リライトとミドルウェア条件を含む場合がある
├── tsconfig.json
└── package.json
```

## モックサイトの概要

`app/`配下の各サブディレクトリは**モックサイト**を表します。これらはページではなく、完全な敵対的テスト環境です。各サイトは`page.tsx`ファイルを含み、以下の仕様に準拠する必要があります：

| サイト名        | ルートパス      | 必要な動作                                                                        |
| -------------- | -------------- | ------------------------------------------------------------------------------- |
| `StaticLand`   | `/static`      | ハードコードされた内部リンクを持つプレーンHTMLサイト。JSなしで完全クロール可能。     |
| `DynamicMaze`  | `/dynamic`     | リクエストごとにコンテンツをランダム化するために`getServerSideProps()`を使用。     |
| `ClientShadow` | `/client-only` | 初期HTMLは空。コンテンツは**JavaScript実行後のみ**表示される。                   |
| `MapTown`      | `/map`         | Google MapsまたはOpenStreetMap JS APIを使用してマップを表示。JSなしでは非表示。  |
| `BotWarden`    | `/anti-bot`    | ミドルウェアが特定のUser-Agentに対してレスポンスをブロックまたは変更。            |
| `LinkSpiral`   | `/trap/[slug]` | 再帰的リンクを動的に生成。無限の深度が可能。                                     |
| `BrokenWeb`    | `/trap-broken` | サイトマップで参照されるページが存在しないか404を返す。                          |
| `MetaLie`      | `/meta-fake`   | メタタイトルと説明が表示されるコンテンツと異なる。                               |
| `NoMapZone`    | `/no-sitemap`  | sitemap.xmlもrobots.txtも提供されない。サイトは手動で発見する必要がある。        |
| `HalfMapSite`  | `/partial-map` | sitemap.xmlは存在するが多くのライブページを省略。クローリングヒューリスティックを誤解させる。 |

上記の各サイトは**完全に実装されなければならず**、パーサーの適応性をテストするために識別可能なHTML構造を提供する必要があります。
