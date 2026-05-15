import { test, expect } from '@playwright/test';

test('root redirects to English list page', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/en$/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('Chinese list page renders year sections', async ({ page }) => {
  await page.goto('/zh');
  await expect(page.getByText('年份: 2025')).toBeVisible();
  await expect(page.getByText('年份: 2024')).toBeVisible();
  await expect(page.getByText('年份: 2023')).toBeVisible();
});

test('detail page opens from English list and shows key blocks', async ({ page }) => {
  await page.goto('/en');
  const cardLink = page.getByRole('link', { name: 'Read Deep Dive' }).first();
  await cardLink.click();

  await expect(page).toHaveURL(/\/en\/tool\//);
  await expect(page.getByRole('link', { name: 'Back to List' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Highlights' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Community' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Audience' })).toBeVisible();
});
