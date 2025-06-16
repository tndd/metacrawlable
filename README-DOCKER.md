# MetaCrawlable Docker セットアップガイド

## クイックスタート

### 1. 基本的な使用方法

```bash
# ヘルプを表示
make help

# 開発環境を起動（ホットリロード付き）
make dev

# 本番環境を起動
make prod

# 全テストを実行
make test

# デモを実行（全機能の動作確認）
make demo
```

### 2. 開発環境

```bash
# 開発サーバーを起動（http://localhost:3000）
docker-compose up metacrawlable-dev

# または
make dev

# ログを確認
make logs-dev

# 開発環境のシェルにアクセス
make shell-dev
```

### 3. 本番環境テスト

```bash
# 本番環境を起動（http://localhost:3001）
docker-compose up -d metacrawlable-prod

# または
make prod

# ヘルスチェック
make health

# 4サイトすべてのアクセステスト
curl http://localhost:3001/static      # StaticLand
curl http://localhost:3001/dynamic     # DynamicMaze
curl http://localhost:3001/client-only # ClientShadow
curl http://localhost:3001/anti-bot    # BotWarden
```

### 4. テスト実行

```bash
# 全テスト実行
make test

# 個別サイトのテスト
make test-static    # StaticLandのみ
make test-dynamic   # DynamicMazeのみ
make test-client    # ClientShadowのみ
make test-antibot   # BotWardenのみ
```

## サービス構成

| サービス名 | ポート | 用途 | URL |
|------------|--------|------|-----|
| `metacrawlable-dev` | 3000 | 開発環境（ホットリロード） | http://localhost:3000 |
| `metacrawlable-prod` | 3001 | 本番環境（テスト用） | http://localhost:3001 |
| `test-runner` | - | 全テスト実行 | - |
| `test-*` | - | 個別テスト実行 | - |

## 利用可能なコマンド

```bash
# 基本操作
make build          # 全イメージをビルド
make dev            # 開発環境起動
make prod           # 本番環境起動
make stop           # 全サービス停止
make clean          # コンテナ・ボリューム削除

# テスト関連
make test           # 全テスト実行
make test-static    # StaticLandテスト
make test-dynamic   # DynamicMazeテスト
make test-client    # ClientShadowテスト
make test-antibot   # BotWardenテスト

# 監視・デバッグ
make logs           # 全サービスのログ
make logs-dev       # 開発環境のログ
make logs-prod      # 本番環境のログ
make health         # サービス状態確認
make shell-dev      # 開発環境シェル
make shell-prod     # 本番環境シェル

# デモ
make demo           # 全機能デモ実行
```

## トラブルシューティング

### ポート競合
```bash
# ポート使用状況確認
lsof -i :3000
lsof -i :3001

# プロセス停止
kill $(lsof -ti:3000)
```

### コンテナリセット
```bash
# 完全リセット
make clean
docker system prune -a
```

### ログ確認
```bash
# 特定サービスのログ
docker-compose logs metacrawlable-dev
docker-compose logs metacrawlable-prod
docker-compose logs test-runner
```

## 開発ワークフロー

### 1. 日常開発
```bash
# 開発環境起動
make dev

# コード編集 → 自動リロード

# テスト実行
make test
```

### 2. 本番テスト
```bash
# 本番環境で動作確認
make prod
make health

# 全テスト実行
make test
```

### 3. デプロイ前チェック
```bash
# 完全テスト
make clean
make build
make demo
```

## Next.js特有の注意点

- `output: 'standalone'`設定により最適化されたコンテナサイズ
- middleware.tsが本番環境でも正常動作
- ホットリロードは開発環境でのみ有効
- 本番環境は`node server.js`で起動

## Playwright統合

- テスト環境は独立したコンテナで実行
- ヘルスチェック完了後にテスト開始
- 各サイト個別のテスト実行が可能
- CI/CD環境での実行に最適化