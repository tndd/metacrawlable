import { defineConfig, devices } from '@playwright/test';

// Generate timestamp for unique output directories
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5); // YYYY-MM-DDTHH-MM-SS

// Determine output directory based on project being run
const getOutputDir = () => {
  const project = process.env.PLAYWRIGHT_PROJECT || 'static-land';
  const projectDirs: Record<string, string> = {
    'static-land': `./tests/static/result/${timestamp}/`,
    'dynamic-maze': `./tests/dynamic/result/${timestamp}/`,
    'client-shadow': `./tests/client-only/result/${timestamp}/`,
    'bot-warden': `./tests/anti-bot/result/${timestamp}/`,
  };
  return projectDirs[project] || `./test-results/${timestamp}/`;
};

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.PLAYWRIGHT_WORKERS ? parseInt(process.env.PLAYWRIGHT_WORKERS) : undefined,
  reporter: [
    ['html', { outputFolder: `${getOutputDir()}reports/html` }],
    ['json', { outputFile: `${getOutputDir()}reports/results.json` }]
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    navigationTimeout: process.env.CI ? 60000 : 30000, // Docker環境では60秒
    actionTimeout: process.env.CI ? 30000 : 15000,     // アクション待機時間
  },
  timeout: process.env.CI ? 120000 : 60000, // テスト全体のタイムアウト
  projects: [
    {
      name: 'static-land',
      testDir: './tests/static',
      outputDir: `${getOutputDir()}artifacts/`,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'dynamic-maze',
      testDir: './tests/dynamic',
      outputDir: `${getOutputDir()}artifacts/`,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'client-shadow',
      testDir: './tests/client-only',
      outputDir: `${getOutputDir()}artifacts/`,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'bot-warden',
      testDir: './tests/anti-bot',
      outputDir: `${getOutputDir()}artifacts/`,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: process.env.CI ? undefined : {
    command: 'npm run dev',
    url: process.env.BASE_URL || 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});