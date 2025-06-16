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
    ignoreHTTPSErrors: true,
    bypassCSP: true,
    extraHTTPHeaders: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    },
  },
  projects: [
    {
      name: 'static-land',
      testDir: './tests/static',
      outputDir: `${getOutputDir()}artifacts/`,
      use: { 
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-web-security',
            '--disable-features=VizDisplayCompositor',
            '--disable-extensions',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-renderer-backgrounding'
          ]
        }
      },
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
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});