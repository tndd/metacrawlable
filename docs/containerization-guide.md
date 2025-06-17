# MetaCrawlable コンテナ化実装ガイド

## 概要

MetaCrawlableプロジェクトのDockerコンテナ化を段階的に実装するためのガイドラインです。3つのフェーズに分けて基本的なコンテナ化から本格運用まで対応し、**Phase 1-2は完全実装済み**、Phase 3は拡張機能として定義されています。

## 実装状況サマリー

- ✅ **Phase 1**: マルチステージDocker build（完全実装済み）
- ✅ **Phase 2**: docker-compose + health checks + Playwright統合（完全実装済み）
- ⏳ **Phase 3**: 本格運用・CI/CD統合（計画中）

## Phase 1: 基本コンテナ化 ✅ **実装完了**

### 実装状況
完全実装済み。マルチステージビルドでdevelopment/testステージを提供。

### 実装済みDockerfile

```dockerfile
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat curl
WORKDIR /app

# Development stage
FROM base AS development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV NODE_ENV=development
CMD ["npm", "run", "dev"]

# Test stage with Playwright
FROM mcr.microsoft.com/playwright:v1.53.0 AS test
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npx playwright install
COPY . .
CMD ["npx", "playwright", "test"]
```

### 特徴
- **軽量Alpine base**: セキュリティとサイズ最適化
- **curl統合**: ヘルスチェック対応
- **公式Playwright image**: 安定したテスト実行環境
- **開発専用設計**: ホットリロード対応

### 動作確認
```bash
# Dockerビルド確認
docker build --target development -t metacrawlable:dev .
docker build --target test -t metacrawlable:test .

# 4サイト動作確認
curl http://localhost:3000/static      # StaticLand ✅
curl http://localhost:3000/dynamic     # DynamicMaze ✅
curl http://localhost:3000/client-only # ClientShadow ✅
curl http://localhost:3000/anti-bot    # BotWarden ✅
```

## Phase 2: テスト実行環境統合 ✅ **実装完了**

### 実装状況
完全実装済み。ヘルスチェック統合、ネットワーク分離、自動テスト実行を提供。

### 実装済みdocker-compose.yml

```yaml
networks:
  metacrawlable-network:
    driver: bridge

services:
  app:
    build:
      context: .
      target: development
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    networks:
      - metacrawlable-network
    container_name: metacrawlable-app
    healthcheck:
      test: ["CMD-SHELL", "curl -f http://localhost:3000/api/health || exit 1"]
      interval: 15s
      timeout: 5s
      retries: 3
      start_period: 30s

  playwright-test:
    build:
      context: .
      target: test
    depends_on:
      app:
        condition: service_healthy
    volumes:
      - ./tests:/app/tests
    working_dir: /app
    environment:
      - CI=true
      - PLAYWRIGHT_WORKERS=2
      - BASE_URL=http://metacrawlable-app:3000
    networks:
      - metacrawlable-network
    mem_limit: 2g
    shm_size: 1g
```

### 実装済みヘルスチェック機能

#### `/api/health` - 包括的ヘルスチェック
```typescript
// app/api/health/route.ts
// 4サイト並行チェック、詳細メトリクス、エラー詳細
{
  "status": "healthy",
  "sites": [
    {"site": "static", "status": "healthy", "responseTime": 182},
    {"site": "dynamic", "status": "healthy", "responseTime": 127},
    {"site": "client-only", "status": "healthy", "responseTime": 149},
    {"site": "anti-bot", "status": "healthy", "responseTime": 7}
  ],
  "summary": {"total": 4, "healthy": 4, "unhealthy": 0}
}
```

#### `/api/ready` - 軽量レディネスチェック
```typescript
// app/api/ready/route.ts
// コンテナオーケストレーション用
{
  "status": "ready",
  "checks": [
    {"component": "nextjs", "status": "ready"},
    {"component": "static-site", "status": "ready"},
    {"component": "environment", "status": "ready"}
  ]
}
```

### 実装済みテストスクリプト

```json
{
  "scripts": {
    "test:docker": "docker-compose run --rm playwright-test",
    "test:docker:static": "docker-compose run --rm playwright-test npx playwright test --project=static-land",
    "test:docker:dynamic": "docker-compose run --rm playwright-test npx playwright test --project=dynamic-maze",
    "test:docker:client": "docker-compose run --rm playwright-test npx playwright test --project=client-shadow",
    "test:docker:antibot": "docker-compose run --rm playwright-test npx playwright test --project=bot-warden",
    "test:docker:all": "docker-compose up -d app && docker-compose run --rm playwright-test && docker-compose down"
  }
}
```

### 動作確認済み機能

```bash
# ヘルスチェック機能
curl -s http://localhost:3000/api/health | jq '.status'    # → "healthy"
curl -s http://localhost:3000/api/ready | jq '.status'     # → "ready"

# Docker状態確認
docker-compose ps                          # → (healthy)
docker inspect metacrawlable-app | jq '.[0].State.Health.Status'  # → "healthy"

# テスト実行（全41テスト）
npm run test:docker:static    # 6 passed
npm run test:docker:dynamic   # 6 passed  
npm run test:docker:client    # 15 passed
npm run test:docker:antibot   # 14 passed
npm run test:docker:all       # 41 passed total
```

### 技術的特徴

#### ネットワーク分離
- **カスタムブリッジネットワーク**: `metacrawlable-network`
- **サービス間通信**: コンテナ名による名前解決
- **ポート公開**: アプリケーションのみ外部公開(3000)

#### リソース管理
- **メモリ制限**: 2GB (Chromium安定動作)
- **共有メモリ**: 1GB (ブラウザプロセス用)
- **CPU制限**: なし（開発環境優先）

#### 依存関係管理
- **`service_healthy`**: アプリ完全準備後にテスト開始
- **自動起動順序**: ヘルスチェック成功後の依存サービス起動
- **graceful shutdown**: 適切なコンテナ停止処理

## Phase 3: 本格運用 ⏳ **計画中**

### 目標
- 本番環境最適化
- CI/CD統合  
- イメージレジストリ公開
- 監視・アラート統合

### Phase 3.1: 本番用Dockerfile最適化

```dockerfile
# Production stage (新規追加予定)
FROM base AS production
ENV NODE_ENV=production
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY . .
RUN npm run build

# Security hardening
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=2 \
  CMD curl -f http://localhost:3000/api/ready || exit 1

CMD ["npm", "start"]
```

### Phase 3.2: GitHub Actions統合

```yaml
# .github/workflows/ci-cd.yml (予定)
name: MetaCrawlable CI/CD

on:
  push: [main, develop]
  pull_request: [main]

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Health Check
        run: |
          docker-compose up -d app
          timeout 120 bash -c 'until [ "$(docker inspect --format="{{.State.Health.Status}}" metacrawlable-app)" == "healthy" ]; do sleep 5; done'
          
  test-matrix:
    needs: health-check
    strategy:
      matrix:
        site: [static, dynamic, client, antibot]
    runs-on: ubuntu-latest
    steps:
      - name: Test ${{ matrix.site }}
        run: npm run test:docker:${{ matrix.site }}
        
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - name: Trivy Security Scan
        uses: aquasecurity/trivy-action@master
        with:
          image-ref: 'metacrawlable:latest'
```

### Phase 3.3: 監視統合

#### Prometheus Metrics
```typescript
// app/api/metrics/route.ts (予定)
export async function GET() {
  const healthData = await getHealthData();
  const metrics = [
    '# HELP metacrawlable_health_status Site health status',
    '# TYPE metacrawlable_health_status gauge',
    ...healthData.sites.map(site => 
      `metacrawlable_health_status{site="${site.site}"} ${site.status === 'healthy' ? 1 : 0}`
    ),
    '# HELP metacrawlable_response_time Response time in milliseconds',
    '# TYPE metacrawlable_response_time gauge', 
    ...healthData.sites.map(site =>
      `metacrawlable_response_time{site="${site.site}"} ${site.responseTime}`
    )
  ].join('\n');
  
  return new Response(metrics, {
    headers: { 'Content-Type': 'text/plain' }
  });
}
```

#### Grafana Dashboard (予定)
- サイト別ヘルス状況
- レスポンス時間トレンド
- エラー率監視
- コンテナリソース使用量

### Phase 3.4: Production Compose

```yaml
# docker-compose.prod.yml (予定)
version: '3.8'

services:
  app:
    build:
      target: production
    restart: unless-stopped
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4G
        reservations:
          cpus: '1.0'  
          memory: 2G
    healthcheck:
      interval: 30s
      timeout: 10s
      retries: 2
      start_period: 60s
    
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./monitoring/prometheus.yml:/etc/prometheus/prometheus.yml
      
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin
```

## パフォーマンス指標

### 現在の性能 (Phase 2)
- **ヘルスチェック応答**: ~200ms平均
- **コンテナ起動時間**: 30s（health ready）
- **テスト実行時間**: 
  - StaticLand: ~36s (6 tests)
  - DynamicMaze: ~9s (6 tests)
  - ClientShadow: ~19s (15 tests)
  - BotWarden: ~11s (14 tests)

### Phase 3 目標
- **ヘルスチェック応答**: <100ms
- **コンテナ起動時間**: <15s
- **イメージサイズ**: <200MB
- **メモリ使用量**: <512MB

## トラブルシューティング

### 実装済み解決方法

#### 1. ヘルスチェック失敗
```bash
# 手動確認
curl -f http://localhost:3000/api/health

# Docker内確認  
docker exec metacrawlable-app curl -f http://localhost:3000/api/health

# ログ確認
docker-compose logs app
```

#### 2. ネットワーク問題
```bash
# ネットワーク状態確認
docker network inspect metacrawlable_metacrawlable-network

# コンテナ間通信確認
docker exec metacrawlable-app ping metacrawlable-app
```

#### 3. テスト失敗
```bash
# 個別サイト確認
curl http://localhost:3000/static
curl http://localhost:3000/dynamic  
curl http://localhost:3000/client-only
curl http://localhost:3000/anti-bot

# Playwright詳細ログ
DEBUG=pw:api npm run test:docker:static
```

### 実装されたデバッグツール

#### ヘルスチェック監視
```bash
# リアルタイム監視スクリプト
./scripts/test-summary.sh

# 継続監視
while true; do
  curl -s http://localhost:3000/api/health | jq '.status'
  sleep 10
done
```

#### Docker Events監視
```bash
# ヘルスチェックイベント
docker events --filter container=metacrawlable-app --filter event=health_status

# 全Dockerイベント
docker events --filter container=metacrawlable-app
```

## 実装チェックリスト

### Phase 1 ✅ **完了**
- ✅ Dockerfile作成（マルチステージビルド）
- ✅ .dockerignore設定
- ✅ 基本イメージのビルド成功
- ✅ 4サイト全体の動作確認
- ✅ middleware.tsの動作確認

### Phase 2 ✅ **完了**
- ✅ docker-compose.yml完成
- ✅ ヘルスチェック統合（/api/health, /api/ready）
- ✅ ネットワーク分離（カスタムブリッジ）
- ✅ Playwright統合（41テスト実行可能）
- ✅ 依存関係管理（service_healthy）
- ✅ リソース制限（メモリ・共有メモリ）
- ✅ テストスクリプト完備

### Phase 3 ⏳ **計画中**
- [ ] 本番用Dockerfile最適化
- [ ] GitHub Actions設定
- [ ] Prometheus metrics実装
- [ ] Grafana dashboard作成
- [ ] セキュリティスキャン統合
- [ ] イメージレジストリ公開

---

## まとめ

MetaCrawlableのコンテナ化は**Phase 1-2が完全実装済み**で、本格的な開発・テスト環境として機能しています。

**現在利用可能:**
- ✅ 完全自動化されたDockerテスト実行環境
- ✅ ヘルスチェック統合による安定したコンテナオーケストレーション  
- ✅ 4サイト89ページ全ての動作保証
- ✅ 41テスト全てのDockerized実行

**Phase 3により追加予定:**
- ⏳ エンタープライズ級の監視・運用機能
- ⏳ CI/CD統合による自動化ワークフロー
- ⏳ 本番環境最適化とセキュリティ強化