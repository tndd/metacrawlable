# ヘルスチェック実装ガイド

## 🎯 概要

このプロジェクトでは、Docker側を軽量化してNext.js側でしっかりとしたヘルスチェックを実装しています。

## 📋 実装内容

### ヘルスチェックエンドポイント

#### `/api/health` - 包括的ヘルスチェック
全4サイトの動作状況を並行チェックし、詳細な情報を返します。

```bash
curl http://localhost:3000/api/health
```

**レスポンス例:**
```json
{
  "status": "healthy",
  "timestamp": "2025-06-16T23:33:02.698Z",
  "responseTime": 206,
  "version": "0.1.0",
  "environment": "development",
  "sites": [
    {
      "site": "static",
      "status": "healthy",
      "responseTime": 206,
      "statusCode": 200
    },
    {
      "site": "dynamic", 
      "status": "healthy",
      "responseTime": 204,
      "statusCode": 200
    },
    {
      "site": "client-only",
      "status": "healthy", 
      "responseTime": 112,
      "statusCode": 200
    },
    {
      "site": "anti-bot",
      "status": "healthy",
      "responseTime": 9,
      "statusCode": 403
    }
  ],
  "summary": {
    "total": 4,
    "healthy": 4,
    "unhealthy": 0
  }
}
```

#### `/api/ready` - 軽量Readinessチェック
アプリケーションの準備完了状態を確認します。

```bash
curl http://localhost:3000/api/ready
```

**レスポンス例:**
```json
{
  "status": "ready",
  "timestamp": "2025-06-16T23:33:10.238Z", 
  "checks": [
    {
      "component": "nextjs",
      "status": "ready",
      "details": "Development mode"
    },
    {
      "component": "static-site",
      "status": "ready", 
      "details": "HTTP 200"
    },
    {
      "component": "environment",
      "status": "ready",
      "details": "Environment: development"
    }
  ]
}
```

### Docker設定

#### 軽量化されたヘルスチェック

```yaml
# docker-compose.yml
healthcheck:
  test: ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
  interval: 15s
  timeout: 5s
  retries: 3
  start_period: 30s
```

**従来との比較:**

| 項目 | 従来（重い） | 新実装（軽量） |
|------|-------------|---------------|
| **Docker側** | 複雑なNode.js実行 | シンプルなcurl |
| **Next.js側** | なし | 詳細なヘルスチェック |
| **実行時間** | ~170ms | ~290ms（詳細チェック込み） |
| **保守性** | 低い | 高い |
| **拡張性** | 困難 | 容易 |

## 🚀 利点

### 1. 分離された関心事
- **Docker**: 軽量なHTTPチェックのみ
- **Next.js**: アプリケーション固有のロジック

### 2. 詳細な診断情報
- 各サイトの個別ステータス
- レスポンス時間測定
- エラー詳細の記録

### 3. 段階的ヘルスチェック
- **Liveness**: `/api/health` でアプリケーション全体
- **Readiness**: `/api/ready` でコンポーネント別

### 4. 開発効率向上
- ブラウザで直接確認可能
- JSON形式での構造化データ
- デバッグ情報の充実

## 🧪 テストコマンド

### Docker環境でのPlaywrightテスト

```bash
# 全テスト実行
npm run test:docker:all

# 個別サイトテスト
npm run test:docker:static    # StaticLand (6 tests)
npm run test:docker:dynamic   # DynamicMaze (6 tests)  
npm run test:docker:client    # ClientShadow (15 tests)
npm run test:docker:antibot   # BotWarden (14 tests)

# ローカル環境テスト（比較用）
npm run test:static
npm run test:dynamic
npm run test:client
npm run test:antibot
```

### テスト結果例

```bash
# npm run test:docker:dynamic
Running 6 tests using 2 workers
······
6 passed (9.1s)

# npm run test:docker:client  
Running 15 tests using 2 workers
···············
15 passed (19.5s)

# npm run test:docker:antibot
Running 14 tests using 2 workers
··············  
14 passed (11.4s)
```

## 📊 使用例

### 開発時のヘルスチェック確認

```bash
# 全体の健康状態確認
curl -s http://localhost:3000/api/health | jq '.status'

# 特定サイトの確認  
curl -s http://localhost:3000/api/health | jq '.sites[] | select(.site=="anti-bot")'

# レスポンス時間監視
curl -s http://localhost:3000/api/health | jq '.sites[] | {site: .site, time: .responseTime}'
```

### Docker環境での確認

```bash
# コンテナヘルスステータス
docker-compose ps

# 詳細ヘルスログ
docker inspect metacrawlable-app | jq '.[0].State.Health'

# リアルタイムログ監視
docker-compose logs -f app
```

### 監視・アラート統合

```bash
# Prometheus metrics形式での出力例
curl -s http://localhost:3000/api/health | jq -r '.sites[] | "metacrawlable_site_health{site=\"" + .site + "\"} " + (if .status == "healthy" then "1" else "0" end)'

# アラート用閾値チェック
RESPONSE_TIME=$(curl -s http://localhost:3000/api/health | jq '.responseTime')
if [ "$RESPONSE_TIME" -gt 1000 ]; then
  echo "High response time detected: ${RESPONSE_TIME}ms"
fi
```

## 🔧 カスタマイズ

### 独自ヘルスチェック項目の追加

```typescript
// app/api/health/route.ts内のcheckSite関数を拡張
async function checkSite(site: string): Promise<HealthCheckResult> {
  // 既存のチェックに加えて独自ロジックを追加
  
  // 例: データベース接続チェック
  if (site === 'dynamic') {
    await checkDatabaseConnection();
  }
  
  // 例: 外部API接続チェック
  if (site === 'client-only') {
    await checkExternalAPI();
  }
}
```

### 環境別設定

```typescript
// 本番環境での設定例
if (process.env.NODE_ENV === 'production') {
  // より厳格なチェック
  timeout = 3000; // 短いタイムアウト
  retries = 1;    // 少ないリトライ
}
```

## 🔍 トラブルシューティング

### よくある問題と解決策

#### 1. ヘルスチェックが失敗する

```bash
# 手動確認
curl -v http://localhost:3000/api/health

# Docker内からの確認
docker exec metacrawlable-app curl -f http://localhost:3000/api/health
```

#### 2. 特定サイトがunhealthyになる

```bash
# 個別サイト確認
curl http://localhost:3000/static
curl http://localhost:3000/dynamic
curl http://localhost:3000/client-only
curl http://localhost:3000/anti-bot
```

#### 3. レスポンス時間が遅い

```bash
# 詳細タイミング
curl -w "Total: %{time_total}s\n" -s http://localhost:3000/api/health > /dev/null
```

### ログ確認方法

```bash
# アプリケーションログ
docker-compose logs app

# ヘルスチェック専用ログ
docker events --filter container=metacrawlable-app --filter event=health_status

# Next.jsコンソールログ
docker-compose logs app | grep -E "(Health|Error)"
```

## 📈 パフォーマンス最適化

### 設定調整指針

```yaml
# 高頻度チェック（開発環境）
healthcheck:
  interval: 10s
  timeout: 3s
  retries: 2

# 低頻度チェック（本番環境）  
healthcheck:
  interval: 30s
  timeout: 10s
  retries: 3
```

### メトリクス収集

```typescript
// app/api/metrics/route.ts
export async function GET() {
  const healthData = await getHealthData();
  
  // Prometheus形式での出力
  return new Response(formatPrometheusMetrics(healthData), {
    headers: { 'Content-Type': 'text/plain' }
  });
}
```

このヘルスチェック実装により、安定したDocker環境でのPlaywright実行と、本格的な監視・運用が可能になります。