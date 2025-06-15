import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html'],
    ['json']
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'static-land',
      testDir: './tests/static',
      outputDir: './tests/static/result/',
      use: { ...devices['Desktop Chrome'] },
    },
    // Future projects for other sites:
    // {
    //   name: 'dynamic-maze',
    //   testDir: './tests/dynamic',
    //   outputDir: './tests/dynamic/result/',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'client-shadow',
    //   testDir: './tests/client-only',
    //   outputDir: './tests/client-only/result/',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    // {
    //   name: 'bot-warden',
    //   testDir: './tests/anti-bot',
    //   outputDir: './tests/anti-bot/result/',
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});