import { NextResponse } from 'next/server';

interface ReadinessCheck {
  component: string;
  status: 'ready' | 'not-ready';
  details?: string;
}

interface ReadinessResponse {
  status: 'ready' | 'not-ready';
  timestamp: string;
  checks: ReadinessCheck[];
}

export async function GET() {
  try {
    const checks: ReadinessCheck[] = [
      await checkNextJsReadiness(),
      await checkStaticSiteReadiness(),
      await checkEnvironmentReadiness()
    ];

    const allReady = checks.every(check => check.status === 'ready');

    const response: ReadinessResponse = {
      status: allReady ? 'ready' : 'not-ready',
      timestamp: new Date().toISOString(),
      checks
    };

    return NextResponse.json(response, { 
      status: allReady ? 200 : 503 
    });

  } catch (error) {
    return NextResponse.json({
      status: 'not-ready',
      timestamp: new Date().toISOString(),
      checks: [{
        component: 'application',
        status: 'not-ready' as const,
        details: error instanceof Error ? error.message : 'Unknown error'
      }]
    }, { status: 503 });
  }
}

async function checkNextJsReadiness(): Promise<ReadinessCheck> {
  try {
    // Next.jsの基本的な動作確認
    const isProduction = process.env.NODE_ENV === 'production';
    const hasBuildId = !!process.env.BUILD_ID || !isProduction;
    
    return {
      component: 'nextjs',
      status: hasBuildId ? 'ready' : 'not-ready',
      details: isProduction ? 'Production mode' : 'Development mode'
    };
  } catch {
    return {
      component: 'nextjs',
      status: 'not-ready',
      details: 'Next.js initialization failed'
    };
  }
}

async function checkStaticSiteReadiness(): Promise<ReadinessCheck> {
  try {
    // 最も基本的なサイト（static）の動作確認
    const baseUrl = getBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${baseUrl}/static`, {
      method: 'HEAD',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    return {
      component: 'static-site',
      status: response.ok ? 'ready' : 'not-ready',
      details: `HTTP ${response.status}`
    };
  } catch (error) {
    return {
      component: 'static-site',
      status: 'not-ready',
      details: error instanceof Error ? error.message : 'Request failed'
    };
  }
}

async function checkEnvironmentReadiness(): Promise<ReadinessCheck> {
  try {
    // 環境変数と設定の確認
    const requiredEnvs = ['NODE_ENV'];
    const missingEnvs = requiredEnvs.filter(env => !process.env[env]);
    
    if (missingEnvs.length > 0) {
      return {
        component: 'environment',
        status: 'not-ready',
        details: `Missing environment variables: ${missingEnvs.join(', ')}`
      };
    }

    return {
      component: 'environment',
      status: 'ready',
      details: `Environment: ${process.env.NODE_ENV}`
    };
  } catch {
    return {
      component: 'environment',
      status: 'not-ready',
      details: 'Environment check failed'
    };
  }
}

function getBaseUrl(): string {
  if (process.env.BASE_URL) {
    return process.env.BASE_URL;
  }
  
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  return 'http://localhost:3000';
}

// 超軽量版（Docker用）
export async function HEAD() {
  return new NextResponse(null, { 
    status: 200,
    headers: {
      'X-Ready-Status': 'ok'
    }
  });
}