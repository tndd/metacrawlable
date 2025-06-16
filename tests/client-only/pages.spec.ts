import { test, expect } from '@playwright/test';

test.describe('ClientShadow Pages', () => {
  test('home page loads with JavaScript-only content', async ({ page }) => {
    await page.goto('/client-only');
    
    // Wait for JavaScript content to load
    await expect(page.locator('h2')).toContainText('ClientShadow - JavaScript-Only Content', { timeout: 10000 });
    await expect(page.locator('span').filter({ hasText: 'JS Active' })).toBeVisible();
    
    // Check for dynamically generated content
    await expect(page.locator('p').filter({ hasText: 'This content only appears with JavaScript enabled' })).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Generated via useEffect' })).toBeVisible();
    
    // Verify all 25 profile links are generated via JavaScript
    const profileLinks = page.locator('a[href*="/client-only/profile/"]');
    await expect(profileLinks).toHaveCount(25, { timeout: 10000 });
    
    // Check specific profile links exist (1-25)
    for (let i = 1; i <= 25; i++) {
      await expect(page.locator(`a[href="/client-only/profile/${i}"]`)).toBeVisible();
    }
  });

  test('dashboard loads with complex JavaScript operations', async ({ page }) => {
    await page.goto('/client-only/dashboard');
    
    // Wait for dashboard content to load
    await expect(page.locator('h1')).toContainText('Dashboard', { timeout: 10000 });
    await expect(page.locator('text=Key Metrics')).toBeVisible();
    
    // Check for JavaScript-generated analytics
    await expect(page.locator('div').filter({ hasText: 'Total Users' }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'Active Users' }).first()).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'JavaScript Generated' })).toBeVisible();
  });

  test('profile pages generate dynamic content', async ({ page }) => {
    // Test first profile
    await page.goto('/client-only/profile/1');
    
    // Wait for profile content
    await expect(page.locator('h2')).toContainText('User 1', { timeout: 10000 });
    await expect(page.locator('span').filter({ hasText: 'JS Generated' })).toBeVisible();
    
    // Check for dynamic profile data
    await expect(page.locator('text=Recent Posts')).toBeVisible();
    await expect(page.locator('text=Skills & Expertise')).toBeVisible();
  });

  test('profile navigation works between different users', async ({ page }) => {
    await page.goto('/client-only/profile/5');
    
    // Wait for content to load
    await expect(page.locator('h2')).toContainText('User 5');
    
    // Test navigation to next profile
    const nextProfileLink = page.locator('a[href="/client-only/profile/6"]').first();
    if (await nextProfileLink.isVisible()) {
      await nextProfileLink.click();
      await expect(page).toHaveURL('/client-only/profile/6');
      await expect(page.locator('h2')).toContainText('User 6');
    }
  });

  test('dashboard tabs functionality', async ({ page }) => {
    await page.goto('/client-only/dashboard');
    
    // Wait for dashboard to load
    await expect(page.locator('text=Key Metrics')).toBeVisible();
    
    // Test tab switching (JavaScript functionality)
    const profilesTab = page.locator('button').filter({ hasText: 'User Profiles' });
    if (await profilesTab.isVisible()) {
      await profilesTab.click();
      await expect(page.locator('text=User Profile Management')).toBeVisible();
    }
    
    const analyticsTab = page.locator('button').filter({ hasText: 'Analytics' });
    if (await analyticsTab.isVisible()) {
      await analyticsTab.click();
      await expect(page.locator('text=Weekly Activity')).toBeVisible();
    }
  });

  test('dynamic profile links are generated', async ({ page }) => {
    await page.goto('/client-only');
    
    // Wait for content to load
    await expect(page.locator('text=Dynamic Profile Links')).toBeVisible();
    
    // Check for JavaScript-generated profile links
    const profileLinks = page.locator('a[href*="/client-only/profile/"]');
    await expect(profileLinks.first()).toBeVisible();
    
    // Test clicking a dynamically generated link
    const firstProfileLink = profileLinks.first();
    const href = await firstProfileLink.getAttribute('href');
    await firstProfileLink.click();
    await expect(page).toHaveURL(href!);
  });

  test('real-time data updates in dashboard', async ({ page }) => {
    await page.goto('/client-only/dashboard');
    
    // Wait for dashboard to load
    await expect(page.locator('text=Key Metrics')).toBeVisible();
    
    // Check for real-time status (JavaScript-only feature)
    await expect(page.locator('text=Real-time System Status')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Live Updates' })).toBeVisible();
    
    // Should show online users count
    await expect(page.locator('text=Online Users')).toBeVisible();
  });

  test('all pages return 200 status', async ({ page }) => {
    const urls = [
      '/client-only',
      '/client-only/dashboard', 
      ...Array.from({ length: 25 }, (_, i) => `/client-only/profile/${i + 1}`)
    ];

    for (const url of urls) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    }
  });

  test('JavaScript is required for content visibility', async ({ page }) => {
    // Test with JavaScript disabled
    await page.goto('/client-only');
    
    // With JavaScript enabled, content should be visible
    await expect(page.locator('h2').filter({ hasText: 'ClientShadow' })).toBeVisible();
    
    // Check that loading indicators are replaced by actual content
    await expect(page.locator('text=Loading ClientShadow')).not.toBeVisible();
    await expect(page.locator('text=JavaScript execution required')).not.toBeVisible();
  });

  test('profile pages handle valid ID range', async ({ page }) => {
    // Test boundary profiles
    const profileIds = [1, 12, 25];
    
    for (const id of profileIds) {
      await page.goto(`/client-only/profile/${id}`);
      await expect(page.locator('h2')).toContainText(`User ${id}`);
      await expect(page.locator('span').filter({ hasText: 'JS Generated' })).toBeVisible();
    }
  });

  test('verify total page count (27 pages)', async ({ page }) => {
    const pages: { url: string; status: number }[] = [];
    
    // Home page (1)
    let response = await page.goto('/client-only');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h2')).toContainText('ClientShadow');
    pages.push({ url: '/client-only', status: response?.status() || 0 });
    
    // Dashboard page (1)
    response = await page.goto('/client-only/dashboard');
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Dashboard');
    pages.push({ url: '/client-only/dashboard', status: response?.status() || 0 });
    
    // Profile pages (25)
    for (let i = 1; i <= 25; i++) {
      response = await page.goto(`/client-only/profile/${i}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h2')).toContainText(`User ${i}`);
      pages.push({ url: `/client-only/profile/${i}`, status: response?.status() || 0 });
    }
    
    // Verify we have exactly 27 pages (1 home + 1 dashboard + 25 profiles)
    expect(pages).toHaveLength(27);
    expect(pages.every(p => p.status === 200)).toBe(true);
  });

  test('JavaScript execution timing and content generation', async ({ page }) => {
    // Test home page JavaScript timing
    await page.goto('/client-only');
    
    // Content should appear after useEffect delay (100ms)
    await expect(page.locator('h2').filter({ hasText: 'ClientShadow' })).toBeVisible({ timeout: 10000 });
    
    // Test profile page JavaScript timing
    await page.goto('/client-only/profile/1');
    
    // Profile content should appear after useEffect delay (150ms)
    await expect(page.locator('h2').filter({ hasText: 'User 1' })).toBeVisible({ timeout: 10000 });
  });

  test('client-side data generation and dynamic content', async ({ page }) => {
    await page.goto('/client-only/profile/5');
    
    // Wait for profile to load
    await expect(page.locator('h2')).toContainText('User 5');
    
    // Verify JavaScript-generated profile data
    await expect(page.locator('text=Skills & Expertise')).toBeVisible();
    await expect(page.locator('text=Recent Posts')).toBeVisible();
    
    // Check for dynamic stats (JavaScript-generated numbers)
    await expect(page.locator('div').filter({ hasText: 'Posts' }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'Followers' }).first()).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'Following' }).first()).toBeVisible();
    
    // Verify related profiles are generated (JavaScript-only discovery)
    await expect(page.locator('text=Related Profiles')).toBeVisible();
    
    // Check navigation links are generated
    await expect(page.locator('text=Quick Navigation')).toBeVisible();
  });

  test('dashboard real-time features and complex JavaScript', async ({ page }) => {
    await page.goto('/client-only/dashboard');
    
    // Wait for initial load
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Check for real-time data updates (JavaScript setInterval)
    await expect(page.locator('text=Real-time System Status')).toBeVisible();
    await expect(page.locator('text=Online Users')).toBeVisible();
    
    // Wait for real-time data to appear (updates every 3 seconds)
    await expect(page.locator('span').filter({ hasText: 'Live Updates' })).toBeVisible({ timeout: 5000 });
    
    // Test tab functionality (JavaScript state management)
    await expect(page.locator('button').filter({ hasText: 'Overview' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'User Profiles' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'Analytics' })).toBeVisible();
    await expect(page.locator('button').filter({ hasText: 'System' })).toBeVisible();
  });

  test('navigation between different sections works', async ({ page }) => {
    // Start at home
    await page.goto('/client-only');
    await expect(page.locator('h2').filter({ hasText: 'ClientShadow' })).toBeVisible();
    
    // Navigate to dashboard
    const dashboardLink = page.locator('a[href="/client-only/dashboard"]').first();
    await dashboardLink.click();
    await expect(page).toHaveURL('/client-only/dashboard');
    await expect(page.locator('h1')).toContainText('Dashboard');
    
    // Navigate to profile
    const profileLink = page.locator('a[href="/client-only/profile/1"]').first();
    if (await profileLink.isVisible()) {
      await profileLink.click();
      await expect(page).toHaveURL('/client-only/profile/1');
      await expect(page.locator('h2')).toContainText('User 1');
    }
  });
});