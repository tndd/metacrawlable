import { test, expect } from '@playwright/test';

test.describe('DynamicMaze Pages', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/dynamic');
    await expect(page.locator('h1')).toContainText('Dynamic Maze');
  });

  test('first section page exists', async ({ page }) => {
    await page.goto('/dynamic/sections/1');
    await expect(page.locator('h1')).toContainText('Section 1');
  });

  test('random structure page loads', async ({ page }) => {
    await page.goto('/dynamic/random');
    await expect(page.getByRole('heading', { name: /Random Chaos Structure/i })).toBeVisible();
  });
});
