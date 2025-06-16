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
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: `${getOutputDir()}reports/html` }],
    ['json', { outputFile: `${getOutputDir()}reports/results.json` }]
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
    // {
    //   name: 'bot-warden',
    //   testDir: './tests/anti-bot',
    //   outputDir: `./tests/anti-bot/result/${timestamp}/`,
    //   use: { ...devices['Desktop Chrome'] },
    // },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});