import { test, expect } from '@playwright/test';

test.describe('StaticLand Pages', () => {
  test('home page exists and loads', async ({ page }) => {
    await page.goto('/static');
    await expect(page).toHaveTitle(/StaticLand/);
    await expect(page.locator('h1')).toContainText('StaticLand');
  });

  test('all 30 article pages exist and load', async ({ page }) => {
    const expectedTitles = [
      'Introduction to Web Crawling', 'Understanding HTML Structure', 'CSS Selectors for Data Extraction',
      'JavaScript and Dynamic Content', 'Advanced HTML Parsing Techniques', 'Web Scraping Ethics and Legal Considerations',
      'Data Science Fundamentals', 'Statistical Analysis Methods', 'Research Methodology in Digital Age',
      'Experimental Design Principles', 'Bioinformatics and Computational Biology', 'Machine Learning in Data Science',
      'Digital Transformation Strategies', 'E-commerce Platform Optimization', 'Data-Driven Decision Making',
      'Supply Chain Management', 'Customer Relationship Management', 'Business Intelligence Trends',
      'Performance Analytics in Sports', 'Training Optimization Techniques', 'Injury Prevention and Recovery',
      'Team Strategy and Game Theory', 'Sports Psychology and Mental Performance', 'Technology in Sports Broadcasting',
      'Sports Analytics Revolution', 'Digital Media and Content Creation', 'Streaming Services and Consumer Behavior',
      'Gaming Industry Trends', 'Social Media and Influencer Marketing', 'Entertainment Industry Digital Transformation'
    ];
    
    for (let i = 1; i <= 30; i++) {
      await page.goto(`/static/articles/${i}`);
      await expect(page.locator('h1')).toContainText(expectedTitles[i - 1]);
      await expect(page).toHaveURL(`/static/articles/${i}`);
    }
  });

  test('all 5 category pages exist and load', async ({ page }) => {
    const categories = [
      { slug: 'technology', name: 'Technology' },
      { slug: 'science', name: 'Science' },
      { slug: 'business', name: 'Business' },
      { slug: 'sports', name: 'Sports' },
      { slug: 'entertainment', name: 'Entertainment' }
    ];
    
    for (const category of categories) {
      await page.goto(`/static/categories/${category.slug}`);
      await expect(page.locator('h1')).toContainText(category.name);
      await expect(page).toHaveURL(`/static/categories/${category.slug}`);
    }
  });

  test('verify total page count (36 pages)', async ({ page }) => {
    const pages: { url: string; title: string }[] = [];
    
    // Home page
    await page.goto('/static');
    await expect(page).toHaveTitle(/StaticLand/);
    pages.push({ url: '/static', title: await page.title() });
    
    // 30 article pages
    const expectedTitles = [
      'Introduction to Web Crawling', 'Understanding HTML Structure', 'CSS Selectors for Data Extraction',
      'JavaScript and Dynamic Content', 'Advanced HTML Parsing Techniques', 'Web Scraping Ethics and Legal Considerations',
      'Data Science Fundamentals', 'Statistical Analysis Methods', 'Research Methodology in Digital Age',
      'Experimental Design Principles', 'Bioinformatics and Computational Biology', 'Machine Learning in Data Science',
      'Digital Transformation Strategies', 'E-commerce Platform Optimization', 'Data-Driven Decision Making',
      'Supply Chain Management', 'Customer Relationship Management', 'Business Intelligence Trends',
      'Performance Analytics in Sports', 'Training Optimization Techniques', 'Injury Prevention and Recovery',
      'Team Strategy and Game Theory', 'Sports Psychology and Mental Performance', 'Technology in Sports Broadcasting',
      'Sports Analytics Revolution', 'Digital Media and Content Creation', 'Streaming Services and Consumer Behavior',
      'Gaming Industry Trends', 'Social Media and Influencer Marketing', 'Entertainment Industry Digital Transformation'
    ];
    
    for (let i = 1; i <= 30; i++) {
      await page.goto(`/static/articles/${i}`);
      await expect(page.locator('h1')).toContainText(expectedTitles[i - 1]);
      pages.push({ url: `/static/articles/${i}`, title: await page.title() });
    }
    
    // 5 category pages  
    const categories = [
      { slug: 'technology', name: 'Technology' },
      { slug: 'science', name: 'Science' },
      { slug: 'business', name: 'Business' },
      { slug: 'sports', name: 'Sports' },
      { slug: 'entertainment', name: 'Entertainment' }
    ];
    
    for (const category of categories) {
      await page.goto(`/static/categories/${category.slug}`);
      await expect(page.locator('h1')).toContainText(category.name);
      pages.push({ url: `/static/categories/${category.slug}`, title: await page.title() });
    }
    
    // Verify we have exactly 36 pages (1 + 30 + 5)
    expect(pages).toHaveLength(36); // 1 home + 30 articles + 5 categories = 36
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/static');
    
    // Check navigation to first article
    const articleLink = page.getByRole('link', { name: /article 1/i });
    if (await articleLink.isVisible()) {
      await articleLink.click();
      await expect(page).toHaveURL('/static/articles/1');
    }
    
    // Go back to home
    await page.goto('/static');
    
    // Check navigation to first category
    const categoryLink = page.getByRole('link', { name: /technology/i });
    if (await categoryLink.isVisible()) {
      await categoryLink.click();
      await expect(page).toHaveURL('/static/categories/technology');
    }
  });

  test('all pages return 200 status', async ({ page }) => {
    const urls = [
      '/static',
      ...Array.from({ length: 30 }, (_, i) => `/static/articles/${i + 1}`),
      '/static/categories/technology',
      '/static/categories/science', 
      '/static/categories/business',
      '/static/categories/sports',
      '/static/categories/entertainment'
    ];

    for (const url of urls) {
      const response = await page.goto(url);
      expect(response?.status()).toBe(200);
    }
  });
});