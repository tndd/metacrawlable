# BotWarden (Anti-Bot) システム

## 概要

BotWardenは、MetaCrawlableプロジェクトの4つ目のコアサイトで、**User-Agentブロッキング + アクセス制御回避**のテスト環境を提供します。自動化されたクローラーやボットを検出・ブロックし、正当なユーザーのみにアクセスを許可する仕組みを実装しています。

## アーキテクチャ

### ページ構成（3ページ）

```
/anti-bot/
├── page.tsx           # ホーム - セキュリティ情報とアクセス制御
├── protected/         # 保護されたコンテンツ - 機密文書表示
│   └── page.tsx
└── honeypot/          # ハニーポット - ボット検出トラップ
    └── page.tsx
```

### 技術実装

#### 1. **Middleware によるボット検出**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    const userAgent = request.headers.get('user-agent') || ''
    
    if (isBotUserAgent(userAgent)) {
      return new Response(/* 403 Access Denied */, {
        status: 403,
        headers: { 
          'content-type': 'text/html',
          'X-Bot-Detected': 'true' 
        }
      })
    }
  }
}
```

#### 2. **ボット検出ロジック**
```typescript
function isBotUserAgent(userAgent: string): boolean {
  const blockedBots = [
    'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot', 
    'Baiduspider', 'YandexBot', 'facebookexternalhit'
  ]
  const blockedPatterns = ['bot', 'crawler', 'spider']
  
  return blockedBots.some(bot => userAgent.includes(bot)) ||
         blockedPatterns.some(pattern => userAgent.toLowerCase().includes(pattern)) ||
         userAgent === ''
}
```

## 各ページの機能

### 🛡️ ホームページ (`/anti-bot`)

**目的**: セキュリティステータスの表示とアクセス制御情報

**主要機能**:
- リアルタイムセキュリティステータス表示
- ブロックされたUser-Agent一覧
- アクセス統計とボット検出率
- 保護されたエリアへのナビゲーション

**表示内容**:
```
🔒 Protection Level: Maximum
🛡️ Bots Blocked: 2,847
✅ Your Status: Verified
📊 Detection Rate: 94.8%
```

### 🔐 保護ページ (`/anti-bot/protected`)

**目的**: 機密文書と内部情報の表示

**主要機能**:
- 認証済みユーザーのみアクセス可能
- 機密文書の分類表示
- セキュリティレポート
- アクセス統計の詳細表示

**機密文書例**:
- Security Report Q4 2024
- API Access Logs
- Bot Detection Analysis
- Real-time Alerts

### 🍯 ハニーポットページ (`/anti-bot/honeypot`)

**目的**: ボット検出用のトラップページ

**主要機能**:
- 隠されたトラップリンク（ボット検出用）
- サポートセンターとしての偽装
- ボット行動分析
- 隠しフォーム要素

**隠されたトラップ要素**:
```html
<!-- ボットのみが発見・アクセスするリンク -->
<div style="display: none">
  <a href="/anti-bot/trap1">Hidden Administrative Panel</a>
  <a href="/anti-bot/admin-backup">Backup Administration</a>
  <form action="/anti-bot/submit-trap">...</form>
</div>
```

## ボット検出の仕組み

### 1. **User-Agent検証**
- 既知のボットUA文字列をブロック
- パターンマッチング（'bot', 'crawler', 'spider'）
- 空のUser-Agentをブロック

### 2. **アクセス制御**
- `/anti-bot`パスのみに適用（他のサイトには影響なし）
- 403ステータスコードでブロック
- `X-Bot-Detected: true`ヘッダー付与

### 3. **ハニーポット機能**
- 人間には見えない隠しリンク
- ボットが辿りやすいトラップパス
- アクセスパターンの分析

## テスト環境

### クローラーテスト項目

1. **User-Agentスプーフィング**: 正当なブラウザのUAに偽装してアクセス
2. **403エラーハンドリング**: ブロック時の適切な処理
3. **robots.txt準拠**: `/anti-bot`エリアの`Disallow`ルール遵守
4. **ハニーポット回避**: 隠しリンクを踏まない設計

### 動作検証

```bash
# 正当なユーザー（アクセス許可）
curl -H "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
     http://localhost:3000/anti-bot
# → 200 OK

# ボット（ブロック）
curl -H "User-Agent: Googlebot/2.1" \
     http://localhost:3000/anti-bot
# → 403 Forbidden
```

## 実装のポイント

### セキュリティ設計
- **最小権限原則**: `/anti-bot`パスのみに制限を適用
- **多層防御**: User-Agent + ハニーポット + 隠しトラップ
- **透明性**: 正当なユーザーには制限を意識させない

### パフォーマンス
- **軽量なMiddleware**: 簡単な文字列マッチングのみ
- **早期リターン**: ボット検出時は即座に403を返却
- **キャッシュフレンドリー**: 静的コンテンツは影響を受けない

### 拡張性
- **設定可能なUA**: ブロックリストは容易に変更可能
- **ログ統合**: 検出イベントのログ出力に対応
- **カスタマイズ**: 企業固有のボット検出ルール追加可能

## 開発・運用

### ローカル開発
```bash
npm run dev
npm run test:antibot  # BotWardenテスト実行
```

### 本番環境での注意点
- 正当なクローラー（SEO）への影響を考慮
- ログ監視によるfalse positiveの検出
- User-Agentブロックリストの定期的な見直し

---

BotWardenは、実際のWebサイトで使用される**ボット対策技術の縮図**として設計されており、クローラー開発者が現実的なアクセス制御回避技術を学習・テストできる環境を提供します。