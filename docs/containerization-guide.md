# MetaCrawlable コンテナ化実装ガイド

## 概要

MetaCrawlableプロジェクトのDockerコンテナ化を段階的に実装するためのガイドラインです。3つのフェーズに分けて、基本的なコンテナ化から本格運用まで対応します。

## 実装フェーズ

### Phase 1: 基本コンテナ化

#### 目標
- 基本的なDockerfileの作成
- 4サイト全体の動作確認
- 最小構成での安定動作

#### Phase 1.1: Dockerfile作成

**設計方針**: マルチステージビルド（将来のPhase 3を見据えて）

```dockerfile
# Multi-stage build for Next.js optimization
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Dependencies stage
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Builder stage
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Runner stage
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

#### Phase 1.2: .dockerignoreの設定

```dockerignore
# Development
node_modules
npm-debug.log*
.npm

# Testing
coverage
.nyc_output
tests/*/result

# Next.js
.next/
out/

# Production
build

# Misc
.DS_Store
*.log
.env*.local

# IDE
.vscode
.idea

# Git
.git
.gitignore
README.md
```

#### Phase 1.3: Next.js設定の最適化

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // コンテナ化に最適
  experimental: {
    outputFileTracingRoot: process.cwd(),
  },
  // middleware.tsが正常動作することを確認
  async rewrites() {
    return []
  }
}

module.exports = nextConfig
```

### Phase 2: テスト実行環境統合（簡素化版）

#### 目標
**現状のシンプルな構成を維持しつつ、テスト実行環境のみを統合**
- 既存のdocker-compose.ymlベース
- Playwrightテストのコンテナ実行
- 最小限の設定変更

#### Phase 2.1: 現状維持 + テストサービス追加

**既存のdocker-compose.ymlに最小限の追加のみ**

```yaml
# 既存のservices.appはそのまま維持
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development

  # テスト実行用サービスのみ追加
  playwright-test:
    image: mcr.microsoft.com/playwright:v1.53.0-focal
    depends_on:
      - app
    volumes:
      - ./tests:/workspace/tests
      - ./playwright.config.ts:/workspace/playwright.config.ts
      - ./package.json:/workspace/package.json
    working_dir: /workspace
    command: |
      sh -c "
        npm install @playwright/test &&
        npx playwright test --base-url=http://app:3000
      "
    environment:
      - CI=true
```

#### Phase 2.2: テスト実行コマンドの追加

**package.jsonに追加（既存のテストスクリプトを活用）**

```json
{
  "scripts": {
    "test:docker": "docker-compose run --rm playwright-test",
    "test:docker:static": "docker-compose run --rm playwright-test npx playwright test --project=static-land",
    "test:docker:all": "docker-compose up -d app && docker-compose run --rm playwright-test && docker-compose down"
  }
}
```

#### Phase 2.3: 実行方法

```bash
# 開発サーバー起動（従来通り）
docker-compose up app

# テスト実行（新機能）
npm run test:docker:all

# 個別テスト実行
npm run test:docker:static
```

### Phase 3: 本格運用

#### 目標
- 最適化されたプロダクションイメージ
- CI/CD統合
- イメージレジストリ公開

#### Phase 3.1: イメージサイズ最適化

```dockerfile
# Additional optimizations
FROM node:18-alpine AS runner
# ... existing runner stage ...

# Remove unnecessary files
RUN rm -rf /app/.next/cache
RUN rm -rf /tmp/*

# Security improvements
RUN chown -R nextjs:nodejs /app
USER nextjs

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/static || exit 1
```

#### Phase 3.2: GitHub Actions統合

```yaml
# .github/workflows/docker.yml
name: Docker Build and Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build Docker image
      run: docker build -t metacrawlable:test .
    
    - name: Run container tests
      run: |
        docker run -d --name test-container -p 3000:3000 metacrawlable:test
        sleep 10
        curl -f http://localhost:3000/static || exit 1
        curl -f http://localhost:3000/dynamic || exit 1
        curl -f http://localhost:3000/client-only || exit 1
        curl -f http://localhost:3000/anti-bot || exit 1
        docker stop test-container

  build:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Build and push to registry
      run: |
        docker build -t ghcr.io/${{ github.repository }}:latest .
        docker push ghcr.io/${{ github.repository }}:latest
```

#### Phase 3.3: レジストリ公開

```bash
# GitHub Container Registry
docker build -t ghcr.io/username/metacrawlable:latest .
docker push ghcr.io/username/metacrawlable:latest

# Docker Hub
docker build -t username/metacrawlable:latest .
docker push username/metacrawlable:latest
```

## 技術的考慮事項

### 1. Next.js Middlewareの動作保証

```typescript
// middleware.tsの動作確認項目
export function middleware(request: NextRequest) {
  // BotWarden用User-Agent検出が正常動作するか
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    // standalone出力でも正常に動作することを確認
  }
}
```

### 2. 4サイト同時動作の確認

```bash
# 各サイトのアクセステスト
curl http://localhost:3000/static      # StaticLand
curl http://localhost:3000/dynamic     # DynamicMaze
curl http://localhost:3000/client-only # ClientShadow
curl http://localhost:3000/anti-bot    # BotWarden
```

### 3. テスト環境の統合

```yaml
# テスト用のcomposeファイル
version: '3.8'
services:
  metacrawlable:
    build: .
    ports:
      - "3000:3000"
  
  playwright-tests:
    image: mcr.microsoft.com/playwright:latest
    depends_on:
      - metacrawlable
    volumes:
      - ./tests:/app/tests
    command: npx playwright test --base-url=http://metacrawlable:3000
```

### 4. パフォーマンス最適化

- **イメージサイズ**: alpine baseで約200MB以下を目標
- **起動時間**: 5秒以内での応答開始
- **メモリ使用量**: 256MB以下での安定動作

### 5. セキュリティ考慮

```dockerfile
# Security best practices
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Non-root user execution
COPY --chown=nextjs:nodejs . .
```

## トラブルシューティング

### よくある問題

1. **middleware.tsが動作しない**
   - `output: 'standalone'`設定を確認
   - ビルド時のファイルトレースを確認

2. **静的ファイルが見つからない**
   - `public`フォルダのコピーを確認
   - `.next/static`の権限設定を確認

3. **テストが失敗する**
   - ネットワーク設定を確認
   - ベースURLの設定を確認

### デバッグ方法

```bash
# コンテナ内部の確認
docker run -it --entrypoint /bin/sh metacrawlable:latest

# ログの確認
docker logs container-name

# ネットワーク確認
docker network ls
docker network inspect network-name
```

## 実装チェックリスト

### Phase 1
- [ ] Dockerfile作成（マルチステージビルド）
- [ ] .dockerignore設定
- [ ] next.config.js最適化（standalone出力）
- [ ] 基本イメージのビルド成功
- [ ] 4サイト全体の動作確認
- [ ] middleware.tsの動作確認

### Phase 2
- [ ] docker-compose.yml作成
- [ ] 開発用サービス定義
- [ ] ホットリロード動作確認
- [ ] テスト実行環境の準備
- [ ] ネットワーク設定

### Phase 3
- [ ] プロダクションイメージの最適化
- [ ] GitHub Actions設定
- [ ] ヘルスチェック実装
- [ ] セキュリティ強化
- [ ] レジストリ公開準備

---

このガイドに従って段階的に実装することで、MetaCrawlableの安定したコンテナ化が実現できます。