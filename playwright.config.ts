import { defineConfig, devices } from '@playwright/test';

// Determine output directory based on project being run
const getOutputDir = () => {
  const project = process.env.PLAYWRIGHT_PROJECT || 'static-land';
  const projectDirs: Record<string, string> = {
    'static-land': './tests/static/result/',
    'dynamic-maze': './tests/dynamic/result/',
    'client-shadow': './tests/client-only/result/',
    'bot-warden': './tests/anti-bot/result/',
  };
  return projectDirs[project] || './test-results/';
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
      outputDir: './tests/static/result/artifacts/',
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