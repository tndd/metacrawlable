import { test, expect } from '@playwright/test';

test.describe('BotWarden Pages', () => {
  // Test with legitimate User-Agent (should allow access)
  test('legitimate user agent can access all pages', async ({ page }) => {
    // Set a legitimate browser User-Agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    });

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
  });

  // Test with bot User-Agent (should be blocked)
  test('bot user agent gets blocked with 403', async ({ page }) => {
    // Set a bot User-Agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Googlebot/2.1 (+http://www.google.com/bot.html)'
    });

    // Try to access anti-bot home page
    const response = await page.goto('/anti-bot', { waitUntil: 'load' });
    expect(response?.status()).toBe(403);
    
    // Check for blocked content
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
    await expect(page.locator('a[href="/anti-bot/honeypot"]')).toBeVisible();
  });

  test('crawler user agent gets blocked with 403', async ({ page }) => {
    // Set a crawler User-Agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (compatible; web-crawler/1.0; +http://example.com/bot)'
    });

    const response = await page.goto('/anti-bot/protected');
    expect(response?.status()).toBe(403);
    
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
  });

  test('spider user agent gets blocked with 403', async ({ page }) => {
    // Set a spider User-Agent
    await page.setExtraHTTPHeaders({
      'User-Agent': 'SpiderBot/1.0 (Web Spider; http://example.com/spider)'
    });

    const response = await page.goto('/anti-bot/honeypot');
    expect(response?.status()).toBe(403);
    
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
  });

  test('empty user agent gets blocked with 403', async ({ page }) => {
    // Set empty User-Agent
    await page.setExtraHTTPHeaders({
      'User-Agent': ''
    });

    const response = await page.goto('/anti-bot');
    expect(response?.status()).toBe(403);
    
    await expect(page.locator('h1')).toContainText('Access Denied');
    await expect(page.getByText('Automated access detected')).toBeVisible();
  });

  // Test specific bot detection patterns
  test('known bot user agents are blocked', async ({ page }) => {
    const botUserAgents = [
      'Bingbot/2.0 (+http://www.bing.com/bingbot.htm)',
      'DuckDuckBot/1.0 (+http://duckduckgo.com/duckduckbot.html)',
      'Slurp/3.0 (slurp@inktomi.com; http://www.inktomi.com/slurp.html)',
      'Baiduspider+(+http://www.baidu.com/search/spider.htm)',
      'YandexBot/3.0 (+http://yandex.com/bots)',
      'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)'
    ];

    for (const userAgent of botUserAgents) {
      await page.setExtraHTTPHeaders({ 'User-Agent': userAgent });
      
      const response = await page.goto('/anti-bot');
      expect(response?.status()).toBe(403);
      await expect(page.locator('h1')).toContainText('Access Denied');
    }
  });

  // Test blocked response headers
  test('blocked requests include X-Bot-Detected header', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Googlebot/2.1'
    });

    const response = await page.goto('/anti-bot');
    expect(response?.status()).toBe(403);
    expect(response?.headers()['x-bot-detected']).toBe('true');
    expect(response?.headers()['content-type']).toBe('text/html');
  });

  // Test navigation between pages with legitimate access
  test('legitimate users can navigate between all anti-bot pages', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
    });

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
  });

  // Test honeypot detection features
  test('honeypot page contains hidden trap links', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });

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
  });

  // Test middleware scope - only affects /anti-bot paths
  test('middleware only applies to anti-bot paths', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Googlebot/2.1'
    });

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
    response = await page.goto('/anti-bot');
    expect(response?.status()).toBe(403);
  });

  // Test page count verification (3 pages total)
  test('verify total page count (3 pages)', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });

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
  });

  // Test security features
  test('security features are prominently displayed', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });

    await page.goto('/anti-bot');
    
    // Check for security-related content
    await expect(page.getByText('Protection Level')).toBeVisible();
    await expect(page.getByText('Bots Blocked')).toBeVisible();
    await expect(page.getByText('Your Status')).toBeVisible();
    await expect(page.getByText('Verified')).toBeVisible();
    
    // Check for blocked User-Agents information
    await expect(page.getByText('Blocked User Agents:')).toBeVisible();
    await expect(page.getByText('Googlebot, Bingbot, DuckDuckBot')).toBeVisible();
    await expect(page.getByText('bot\', \'crawler\', \'spider')).toBeVisible();
  });

  // Test protected content features
  test('protected page displays sensitive information', async ({ page }) => {
    await page.setExtraHTTPHeaders({
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    });

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
  });

  // Test various bot pattern detection
  test('various bot patterns are correctly identified', async ({ page }) => {
    const botPatterns = [
      'MyBot/1.0',
      'WebCrawler/2.0',
      'SiteSpider/1.5',
      'DataBot crawler',
      'spider-bot/1.0',
      'crawler-agent/2.1'
    ];

    for (const userAgent of botPatterns) {
      await page.setExtraHTTPHeaders({ 'User-Agent': userAgent });
      
      const response = await page.goto('/anti-bot');
      expect(response?.status()).toBe(403);
      await expect(page.locator('h1')).toContainText('Access Denied');
      await expect(page.getByText('Automated access detected')).toBeVisible();
    }
  });
});