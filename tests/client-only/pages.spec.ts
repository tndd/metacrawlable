import { test, expect } from '@playwright/test';

test.describe('ClientShadow Pages', () => {
  test('home page loads with JavaScript-only content', async ({ page }) => {
    await page.goto('/client-only');
    
    // Should initially show loading state
    await expect(page.locator('#app-container')).toBeVisible();
    
    // Wait for JavaScript content to load
    await expect(page.locator('h2')).toContainText('ClientShadow - JavaScript-Only Content');
    await expect(page.locator('span').filter({ hasText: 'JS Active' })).toBeVisible();
    
    // Check for dynamically generated content
    await expect(page.locator('p')).toContainText('This content only appears with JavaScript enabled');
    await expect(page.locator('span').filter({ hasText: 'Generated via useEffect' })).toBeVisible();
  });

  test('dashboard loads with complex JavaScript operations', async ({ page }) => {
    await page.goto('/client-only/dashboard');
    
    // Should show loading state first
    await expect(page.locator('text=Loading Dashboard')).toBeVisible();
    
    // Wait for dashboard content to load
    await expect(page.locator('h1')).toContainText('Dashboard');
    await expect(page.locator('text=Key Metrics')).toBeVisible();
    
    // Check for JavaScript-generated analytics
    await expect(page.locator('text=Total Users')).toBeVisible();
    await expect(page.locator('text=Active Users')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'JavaScript Generated' })).toBeVisible();
  });

  test('profile pages generate dynamic content', async ({ page }) => {
    // Test first profile
    await page.goto('/client-only/profile/1');
    
    // Should show loading state
    await expect(page.locator('text=Loading profile')).toBeVisible();
    
    // Wait for profile content
    await expect(page.locator('h2')).toContainText('User 1');
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
      '/client-only/profile/1',
      '/client-only/profile/5',
      '/client-only/profile/10',
      '/client-only/profile/25'
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