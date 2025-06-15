# MapTown

**目的:** Google MapsやLeafletなどのサードパーティJSを通じた埋め込みマップデータの可視性をテスト。

**モデル:** マップと関心地点を含む旅行/不動産サイト

**ルート:** `/map`

## 構造

```
/map                      ← マップ中心のホームページ
/map/spot/[id]           ← ロケーション詳細ページ（最低15ページ以上）
```

## 主要機能

- iframeまたは`<script>`を使用してマップを注入
- Google Maps APIまたはOpenStreetMap
- 直接リンクのないマップ専用ポイント
- マップにはダミーキーまたはトークンが必要

## Sitemap/Robots

- `sitemap.xml`: `/map/spot/**`を含む
- `robots.txt`: `Allow`

## クローラーテスト

- `<iframe>`またはcanvasからのデータ抽出
- JS注入コンテンツの可視性
- 非リンク埋め込みPOIの発見可能性

**最小ページ数:** 15ページ以上