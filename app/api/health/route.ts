import { NextResponse } from 'next/server';

interface HealthCheckResult {
  site: string;
  status: 'healthy' | 'unhealthy';
  responseTime: number;
  statusCode?: number;
  error?: string;
}

interface HealthResponse {
  status: 'healthy' | 'unhealthy' | 'degraded';
  timestamp: string;
  responseTime: number;
  version: string;
  environment: string;
  sites: HealthCheckResult[];
  summary: {
    total: number;
    healthy: number;
    unhealthy: number;
  };
}

export async function GET() {
  const startTime = Date.now();
  
  try {
    // 4つのサイトを並行チェック
    const sites = ['static', 'dynamic', 'client-only', 'anti-bot'];
    const healthChecks = await Promise.allSettled(
      sites.map(site => checkSite(site))
    );

    const results: HealthCheckResult[] = healthChecks.map((check, index) => {
      if (check.status === 'fulfilled') {
        return check.value;
      } else {
        return {
          site: sites[index],
          status: 'unhealthy' as const,
          responseTime: 0,
          error: check.reason?.message || 'Unknown error'
        };
      }
    });

    const summary = {
      total: results.length,
      healthy: results.filter(r => r.status === 'healthy').length,
      unhealthy: results.filter(r => r.status === 'unhealthy').length
    };

    // 全体のステータス判定
    let overallStatus: 'healthy' | 'unhealthy' | 'degraded';
    if (summary.unhealthy === 0) {
      overallStatus = 'healthy';
    } else if (summary.healthy === 0) {
      overallStatus = 'unhealthy';
    } else {
      overallStatus = 'degraded';
    }

    const response: HealthResponse = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      sites: results,
      summary
    };

    // HTTPステータスコードも適切に設定
    const httpStatus = overallStatus === 'healthy' ? 200 : 
                      overallStatus === 'degraded' ? 207 : 503;

    return NextResponse.json(response, { status: httpStatus });

  } catch (error) {
    // 予期しないエラー
    const errorResponse: HealthResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      responseTime: Date.now() - startTime,
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      sites: [],
      summary: { total: 0, healthy: 0, unhealthy: 4 }
    };

    console.error('Health check failed:', error);
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

async function checkSite(site: string): Promise<HealthCheckResult> {
  const startTime = Date.now();
  const baseUrl = getBaseUrl();
  
  try {
    // anti-botは特別処理（User-Agent制限のため）
    if (site === 'anti-bot') {
      return await checkAntiBotSite(baseUrl, startTime);
    }

    // 通常のサイトチェック
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒タイムアウト

    const response = await fetch(`${baseUrl}/${site}`, {
      method: 'HEAD', // HEADリクエストで軽量化
      signal: controller.signal,
      headers: {
        'User-Agent': 'MetaCrawlable-HealthCheck/1.0'
      }
    });

    clearTimeout(timeoutId);

    return {
      site,
      status: response.ok ? 'healthy' : 'unhealthy',
      responseTime: Date.now() - startTime,
      statusCode: response.status
    };

  } catch (error) {
    return {
      site,
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Request failed'
    };
  }
}

async function checkAntiBotSite(baseUrl: string, startTime: number): Promise<HealthCheckResult> {
  try {
    // anti-botサイトは403が正常（ボット検知機能が動作中）
    const response = await fetch(`${baseUrl}/anti-bot`, {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
      headers: {
        'User-Agent': 'MetaCrawlable-Bot/1.0' // 意図的にボットUAを使用
      }
    });

    // 403 または 200 なら正常動作
    const isHealthy = response.status === 403 || response.status === 200;

    return {
      site: 'anti-bot',
      status: isHealthy ? 'healthy' : 'unhealthy',
      responseTime: Date.now() - startTime,
      statusCode: response.status
    };

  } catch (error) {
    return {
      site: 'anti-bot',
      status: 'unhealthy',
      responseTime: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Request failed'
    };
  }
}

function getBaseUrl(): string {
  // Docker環境での内部通信用URL
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  // ローカル開発環境
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  // 本番環境（Vercel等）
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // フォールバック
  return 'http://localhost:3000';
}

// 軽量版ヘルスチェック（Docker用）
export async function HEAD() {
  try {
    // 最小限のチェック（アプリが応答可能かのみ）
    return new NextResponse(null, { 
      status: 200,
      headers: {
        'X-Health-Status': 'ok',
        'X-Timestamp': new Date().toISOString()
      }
    });
  } catch {
    return new NextResponse(null, { status: 503 });
  }
}