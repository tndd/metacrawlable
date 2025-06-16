import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  // BotWarden用User-Agent検出
  if (request.nextUrl.pathname.startsWith('/anti-bot')) {
    const userAgent = request.headers.get('user-agent') || ''
    
    if (isBotUserAgent(userAgent)) {
      return new Response(`
        <html>
          <head><title>Access Denied</title></head>
          <body>
            <h1>Access Denied</h1>
            <p>Automated access detected.</p>
            <a href="/anti-bot/honeypot">Click here for support</a>
          </body>
        </html>
      `, {
        status: 403,
        headers: { 
          'content-type': 'text/html',
          'X-Bot-Detected': 'true' 
        }
      })
    }
  }
  
  return NextResponse.next()
}

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

export const config = {
  matcher: [
    '/anti-bot/:path*',
    '/anti-bot'
  ]
}