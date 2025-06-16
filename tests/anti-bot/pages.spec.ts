import { test, expect } from '@playwright/test';

test.describe('BotWarden Pages', () => {
  // Test with legitimate User-Agent (should allow access)
  test('legitimate user agent can access all pages', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });
    const page = await context.newPage();

    // Test home page access
    await page.goto('/anti-bot');
    await expect(page.locator('h2')).toContainText('Bot Warden - Access Control', { timeout: 10000 });
    await expect(page.locator('span').filter({ hasText: 'Access Granted' })).toBeVisible();
    await expect(page.getByText('You have successfully accessed this protected area')).toBeVisible();

    // Test protected page access
    await page.goto('/anti-bot/protected');
    await expect(page.locator('h2')).toContainText('Secure Document Access', { timeout: 10000 });
    await expect(page.locator('span').filter({ hasText: 'Authentication Verified - Access Granted' })).toBeVisible();
    await expect(page.getByText('Welcome to the protected content area')).toBeVisible();

    // Test honeypot page access
    await page.goto('/anti-bot/honeypot');
    await expect(page.locator('h2')).toContainText('Customer Support Center', { timeout: 10000 });
    await expect(page.getByText('Welcome to our support center')).toBeVisible();
    await expect(page.getByText('This is a honeypot page designed to detect and analyze automated bot behavior')).toBeVisible();
    
    await context.close();
  });

  // Test with bot User-Agent (should be blocked)
  test('bot user agent gets blocked with 403', async ({ browser }) => {
    // Create a new context with bot User-Agent
    const context = await browser.newContext({
      userAgent: 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    });
    const page = await context.newPage();

    // Try to access anti-bot home page
    const response = await page.goto('/anti-bot', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(403);
    
    // Check for blocked content
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
    await expect(page.locator('a[href="/anti-bot/honeypot"]')).toBeVisible();
    
    await context.close();
  });

  test('crawler user agent gets blocked with 403', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (compatible; web-crawler/1.0; +http://example.com/bot)'
    });
    const page = await context.newPage();

    const response = await page.goto('/anti-bot/protected', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(403);
    
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
    
    await context.close();
  });

  test('spider user agent gets blocked with 403', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'SpiderBot/1.0 (Web Spider; http://example.com/spider)'
    });
    const page = await context.newPage();

    const response = await page.goto('/anti-bot/honeypot', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(403);
    
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
    
    await context.close();
  });

  test('minimal user agent gets blocked with 403', async ({ browser }) => {
    // Test with a very minimal user agent that contains 'bot' pattern
    const context = await browser.newContext({
      userAgent: 'bot'
    });
    const page = await context.newPage();

    const response = await page.goto('/anti-bot', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(403);
    
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
    
    await context.close();
  });

  // Test specific bot detection patterns
  test('known bot user agents are blocked', async ({ browser }) => {
    const botUserAgents = [
      'Bingbot/2.0 (+http://www.bing.com/bingbot.htm)',
      'DuckDuckBot/1.0 (+http://duckduckgo.com/duckduckbot.html)',
      'Slurp/3.0 (slurp@inktomi.com; http://www.inktomi.com/slurp.html)',
      'Baiduspider+(+http://www.baidu.com/search/spider.htm)',
      'YandexBot/3.0 (+http://yandex.com/bots)',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
    ];

    for (const userAgent of botUserAgents) {
      const context = await browser.newContext({ userAgent });
      const page = await context.newPage();
      
      const response = await page.goto('/anti-bot', { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(403);
      await expect(page.locator('h1')).toContainText('Access Denied');
      
      await context.close();
    }
  });

  // Test blocked response headers
  test('blocked requests include X-Bot-Detected header', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Googlebot/2.1'
    });
    const page = await context.newPage();

    const response = await page.goto('/anti-bot', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(403);
    expect(response?.headers()['x-bot-detected']).toBe('true');
    expect(response?.headers()['content-type']).toBe('text/html');
    
    await context.close();
  });

  // Test navigation between pages with legitimate access
  test('legitimate users can navigate between all anti-bot pages', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    // Start at home
    await page.goto('/anti-bot');
    await expect(page.locator('h2')).toContainText('Bot Warden - Access Control');
    
    // Navigate to protected page
    const protectedLink = page.locator('a[href="/anti-bot/protected"]').first();
    await protectedLink.click();
    await expect(page).toHaveURL('/anti-bot/protected');
    await expect(page.locator('h2')).toContainText('Secure Document Access');
    
    // Navigate to honeypot page
    const honeypotLink = page.locator('a[href="/anti-bot/honeypot"]').first();
    await honeypotLink.click();
    await expect(page).toHaveURL('/anti-bot/honeypot');
    await expect(page.locator('h2')).toContainText('Customer Support Center');
    
    // Return to home
    const homeLink = page.locator('a[href="/anti-bot"]').first();
    await homeLink.click();
    await expect(page).toHaveURL('/anti-bot');
    await expect(page.locator('h2')).toContainText('Bot Warden - Access Control');
    
    await context.close();
  });

  // Test honeypot detection features
  test('honeypot page contains hidden trap links', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    await page.goto('/anti-bot/honeypot');
    
    // Check for hidden honeypot links (they should exist in DOM but be hidden)
    await expect(page.locator('a[href="/anti-bot/trap1"]')).toBeAttached();
    await expect(page.locator('a[href="/anti-bot/trap2"]')).toBeAttached();
    await expect(page.locator('a[href="/anti-bot/trap3"]')).toBeAttached();
    await expect(page.locator('a[href="/anti-bot/admin-backup"]')).toBeAttached();
    await expect(page.locator('a[href="/anti-bot/debug-console"]')).toBeAttached();
    
    // Verify they are hidden from normal users
    await expect(page.locator('a[href="/anti-bot/trap1"]')).not.toBeVisible();
    await expect(page.locator('a[href="/anti-bot/trap2"]')).not.toBeVisible();
    
    // Check for hidden form
    await expect(page.locator('form[action="/anti-bot/submit-trap"]')).toBeAttached();
    await expect(page.locator('form[action="/anti-bot/submit-trap"]')).not.toBeVisible();
    
    await context.close();
  });

  // Test middleware scope - only affects /anti-bot paths
  test('middleware only applies to anti-bot paths', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Googlebot/2.1'
    });
    const page = await context.newPage();

    // Bot user agent should be able to access other sites
    let response = await page.goto('/static');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('StaticLand');
    
    response = await page.goto('/dynamic');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Dynamic Maze');
    
    response = await page.goto('/client-only');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h2')).toContainText('ClientShadow');
    
    // But should be blocked from anti-bot
    response = await page.goto('/anti-bot', { waitUntil: 'domcontentloaded' });
    expect(response?.status()).toBe(403);
    
    await context.close();
  });

  // Test page count verification (3 pages total)
  test('verify total page count (3 pages)', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    const pages: { url: string; status: number }[] = [];
    
    // Home page (1)
    let response = await page.goto('/anti-bot');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h2')).toContainText('Bot Warden - Access Control');
    pages.push({ url: '/anti-bot', status: response?.status() || 0 });
    
    // Protected page (1)
    response = await page.goto('/anti-bot/protected');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h2')).toContainText('Secure Document Access');
    pages.push({ url: '/anti-bot/protected', status: response?.status() || 0 });
    
    // Honeypot page (1)
    response = await page.goto('/anti-bot/honeypot');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h2')).toContainText('Customer Support Center');
    pages.push({ url: '/anti-bot/honeypot', status: response?.status() || 0 });
    
    // Verify we have exactly 3 pages (1 home + 1 protected + 1 honeypot)
    expect(pages).toHaveLength(3);
    expect(pages.every(p => p.status === 200)).toBe(true);
    
    await context.close();
  });

  // Test security features
  test('security features are prominently displayed', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    await page.goto('/anti-bot');
    
    // Check for security-related content
    await expect(page.getByText('Protection Level')).toBeVisible();
    await expect(page.getByText('Bots Blocked')).toBeVisible();
    await expect(page.getByText('Your Status')).toBeVisible();
    await expect(page.getByText('Verified', { exact: true })).toBeVisible();
    
    // Check for blocked User-Agents information
    await expect(page.getByText('Blocked User Agents:')).toBeVisible();
    await expect(page.getByText('Googlebot, Bingbot, DuckDuckBot')).toBeVisible();
    await expect(page.getByText('bot\', \'crawler\', \'spider')).toBeVisible();
    
    await context.close();
  });

  // Test protected content features
  test('protected page displays sensitive information', async ({ browser }) => {
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });
    const page = await context.newPage();

    await page.goto('/anti-bot/protected');
    
    // Check for protected documents
    await expect(page.getByText('Confidential Documents')).toBeVisible();
    await expect(page.getByText('Security Report Q4 2024')).toBeVisible();
    await expect(page.getByText('API Access Logs')).toBeVisible();
    await expect(page.getByText('Bot Detection Analysis')).toBeVisible();
    await expect(page.getByText('Real-time Alerts')).toBeVisible();
    
    // Check for access statistics
    await expect(page.getByText('Access Statistics')).toBeVisible();
    await expect(page.getByText('Blocked Attempts')).toBeVisible();
    await expect(page.getByText('Verified Access')).toBeVisible();
    await expect(page.getByText('Detection Rate')).toBeVisible();
    
    await context.close();
  });

  // Test various bot pattern detection
  test('various bot patterns are correctly identified', async ({ browser }) => {
    const botPatterns = [
      'MyBot/1.0',
      'WebCrawler/2.0',
      'SiteSpider/1.5',
      'DataBot crawler',
      'spider-bot/1.0',
      'crawler-agent/2.1'
    ];

    for (const userAgent of botPatterns) {
      const context = await browser.newContext({ userAgent });
      const page = await context.newPage();
      
      const response = await page.goto('/anti-bot', { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(403);
      await expect(page.locator('h1')).toContainText('Access Denied');
      await expect(page.getByText('Automated access detected')).toBeVisible();
      
      await context.close();
    }
  });
});