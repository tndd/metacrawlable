import { test, expect } from '@playwright/test';

test.describe('Dynamic Maze Pages', () => {
  test('should load the main dynamic page and have correct title', async ({ page }) => {
    await page.goto('/dynamic');
    await expect(page).toHaveTitle(/Dynamic Maze/);
  });

  test('should load the random page and have correct title', async ({ page }) => {
    await page.goto('/dynamic/random');
    await expect(page).toHaveTitle(/Random Chaos Structure/);
  });

  test('should load a section page and have correct title', async ({ page }) => {
    await page.goto('/dynamic/sections/1');
    await expect(page).toHaveTitle(/Section 1 - DynamicMaze/);
  });

  test.describe('Dynamic Page Layout Variations', () => {
    const loadCounts = 5; // Number of times to load the page to check for variations

    test('should have varying layout classes', async ({ page }) => {
      const layoutClasses = new Set<string>();
      for (let i = 0; i < loadCounts; i++) {
        await page.goto('/dynamic');
        const layoutClass = await page.locator('body > div').first().getAttribute('class');
        if (layoutClass) {
          const match = layoutClass.match(/layout-v\d+/);
          if (match) {
            layoutClasses.add(match[0]);
          }
        }
        if (layoutClasses.size > 1) break; // Found multiple variations
      }
      expect(layoutClasses.size).toBeGreaterThan(1, `Expected more than one layout class variation after ${loadCounts} loads, but only found: ${Array.from(layoutClasses).join(', ')}`);
    });

    test('should have varying section orders', async ({ page }) => {
      const sectionOrders = new Set<string>();
      for (let i = 0; i < loadCounts; i++) {
        await page.goto('/dynamic');
        const sections = await page.locator('section[class*="section-"]').evaluateAll(elements =>
          elements.map(el => el.className.match(/section-(news|featured|trending)/)?.[1]).filter(Boolean).join(',')
        );
        if (sections) {
          sectionOrders.add(sections);
        }
        if (sectionOrders.size > 1) break;
      }
      expect(sectionOrders.size).toBeGreaterThan(1, `Expected more than one section order variation after ${loadCounts} loads, but only found: ${Array.from(sectionOrders).join(' | ')}`);
    });

    test('should show and hide sidebar', async ({ page }) => {
      let sidebarVisible = false;
      let sidebarHidden = false;
      for (let i = 0; i < loadCounts; i++) {
        await page.goto('/dynamic');
        const sidebar = await page.locator('aside[class*="sidebar-"]');
        if (await sidebar.isVisible()) {
          sidebarVisible = true;
        } else {
          sidebarHidden = true;
        }
        if (sidebarVisible && sidebarHidden) break;
      }
      expect(sidebarVisible).toBe(true, `Sidebar was not visible after ${loadCounts} loads.`);
      expect(sidebarHidden).toBe(true, `Sidebar was not hidden after ${loadCounts} loads.`);
    });
  });

  test.describe('Dynamic Section Page Content Variations', () => {
    test('should display different content variations based on section ID', async ({ page }) => {
      // Check section 1 (expected: content-long, id % 3 === 1)
      await page.goto('/dynamic/sections/1');
      await expect(page.locator('article[class*="content-long"]')).toBeVisible();
      await expect(page.locator('article[class*="content-medium"]')).not.toBeVisible();
      await expect(page.locator('article[class*="content-short"]')).not.toBeVisible();

      // Check section 2 (expected: content-medium, id % 3 === 2)
      await page.goto('/dynamic/sections/2');
      await expect(page.locator('article[class*="content-long"]')).not.toBeVisible();
      await expect(page.locator('article[class*="content-medium"]')).toBeVisible();
      await expect(page.locator('article[class*="content-short"]')).not.toBeVisible();

      // Check section 3 (expected: content-short, id % 3 === 0)
      await page.goto('/dynamic/sections/3');
      await expect(page.locator('article[class*="content-long"]')).not.toBeVisible();
      await expect(page.locator('article[class*="content-medium"]')).not.toBeVisible();
      await expect(page.locator('article[class*="content-short"]')).toBeVisible();
    });

    test('should display special content on specific section IDs', async ({ page }) => {
      // Section 4 should have special content (id % 4 === 0)
      await page.goto('/dynamic/sections/4');
      await expect(page.locator('div[class*="special-content-"]')).toBeVisible();
      await expect(page.getByText('Special Content')).toBeVisible();

      // Section 5 should NOT have special content
      await page.goto('/dynamic/sections/5');
      await expect(page.locator('div[class*="special-content-"]')).not.toBeVisible();
    });
  });

  test.describe('Dynamic Page Navigation Links', () => {
    test('should have correct URLs for header links', async ({ page }) => {
      await page.goto('/dynamic');
      await expect(page.locator('header nav a:has-text("Home")')).toHaveAttribute('href', '/dynamic');
      await expect(page.locator('header nav a:has-text("Random Structure")')).toHaveAttribute('href', '/dynamic/random');
    });

    test('should have correct URLs for footer quick links', async ({ page }) => {
      await page.goto('/dynamic');
      await expect(page.locator('footer nav a:has-text("Home")')).toHaveAttribute('href', '/dynamic');
      await expect(page.locator('footer nav a:has-text("Random Structure")')).toHaveAttribute('href', '/dynamic/random');
      // Assuming there's always a link to Section 1 in the footer for this test
      await expect(page.locator('footer nav a:has-text("Section 1")')).toHaveAttribute('href', '/dynamic/sections/1');
    });

    test('should have correct URLs for all available sections links in main content', async ({ page }) => {
      await page.goto('/dynamic');
      const allSectionsTitle = page.getByRole('heading', { name: 'All Available Sections' });
      await expect(allSectionsTitle).toBeVisible();

      const sectionLinks = page.locator('div:has(> h3:has-text("All Available Sections")) + div a');
      const count = await sectionLinks.count();
      expect(count).toBe(20); // Assuming 20 sections are always listed

      for (let i = 0; i < count; i++) {
        const link = sectionLinks.nth(i);
        const expectedHref = `/dynamic/sections/${i + 1}`;
        await expect(link).toHaveAttribute('href', expectedHref);
        await expect(link.getByText(`Section ${i + 1}`)).toBeVisible();
      }
    });
  });

  test.describe('Dynamic Random Page Structure', () => {
    test('should have the main title "Random Chaos Structure"', async ({ page }) => {
      await page.goto('/dynamic/random');
      // The title is already checked in a previous test, but good to have it grouped if more specific checks are added.
      await expect(page).toHaveTitle(/Random Chaos Structure/);
      await expect(page.getByRole('heading', { name: 'Random Chaos Structure', level: 1 })).toBeVisible();
    });

    test('should contain key structural headings', async ({ page }) => {
      await page.goto('/dynamic/random');
      await expect(page.getByRole('heading', { name: 'Completely Random Structure', level: 1 })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Random Navigation Matrix' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Chaotic Content Generation' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Generation Metadata' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Random Cross-references' })).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Extreme Chaos Testing' })).toBeVisible();
    });

    test('should have regenerate and home links in header', async ({ page }) => {
        await page.goto('/dynamic/random');
        await expect(page.locator('header nav a:has-text("Home")')).toHaveAttribute('href', '/dynamic');
        await expect(page.locator('header nav a:has-text("Regenerate")')).toHaveAttribute('href', '/dynamic/random');
    });
  });
});
