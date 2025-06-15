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
│       └── bot-warden.md       # BotWarden仕様
```

## 実装構造

Next.js実装は以下の構造に従うべきです：

```
your-project/
├── app/
│   ├── static/
│   │   ├── page.tsx
│   │   └── articles/[id]/page.tsx
│   ├── dynamic/
│   │   ├── page.tsx
│   │   └── sections/[id]/page.tsx
│   ├── client-only/
│   │   ├── page.tsx
│   │   └── profile/[id]/page.tsx
│   ├── anti-bot/
│   │   ├── page.tsx
│   │   └── protected/page.tsx
│   ├── robots.txt/route.ts      # 動的robots.txt配信
│   ├── sitemap.ts               # 統合sitemap生成
│   └── layout.tsx
├── middleware.ts                 # サイト別ルーティングとUser-Agent検出
├── next.config.js
├── tsconfig.json
└── package.json
```

## 核心モックサイト（4サイト構成）

`app/`配下の各サブディレクトリは**モックサイト**を表します。これらはページではなく、完全な敵対的テスト環境です。各サイトは特定のクローラー課題をテストするために設計されています：

| サイト名        | ルートパス      | 核心テスト課題                                                               |
| -------------- | -------------- | -------------------------------------------------------------------------- |
| `StaticLand`   | `/static`      | **構造解析**: セマンティックHTML、内部リンク巡回、静的コンテンツパース         |
| `DynamicMaze`  | `/dynamic`     | **動的対応**: Server-side生成、DOMランダム化、構造変動への適応              |
| `ClientShadow` | `/client-only` | **JavaScript実行**: CSR専用コンテンツ、useEffectレンダリング、SPA対応       |
| `BotWarden`    | `/anti-bot`    | **回避能力**: User-Agent検出、ミドルウェアブロック、アクセス制御突破         |

各サイトは**独立したテストケース**として機能し、クローラーの異なる側面を評価します。すべてのサイトが**完全に実装されなければならず**、識別可能なHTML構造を提供する必要があります。
