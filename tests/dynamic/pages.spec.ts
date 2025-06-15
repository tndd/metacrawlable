import { test, expect } from '@playwright/test';

test.describe('Dynamic Maze Pages', () => {
  test('should load the main dynamic page', async ({ page }) => {
    await page.goto('/dynamic');
    await expect(page).toHaveTitle(/Dynamic Maze/);
  });

  test('should load the random page', async ({ page }) => {
    await page.goto('/dynamic/random');
    await expect(page).toHaveTitle(/Random Chaos Structure/);
  });

  test('should load a section page', async ({ page }) => {
    await page.goto('/dynamic/sections/1');
    await expect(page).toHaveTitle(/Section 1 - DynamicMaze/);
  });
});
