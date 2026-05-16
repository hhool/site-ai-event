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

test('Chinese scenario page resolves localized slug', async ({ page }) => {
  await page.goto('/zh/scenarios/开发工具');
  await expect(page).toHaveURL(/\/zh\/scenarios\/.+/);
  await expect(page.getByRole('heading', { level: 1, name: '开发工具' })).toBeVisible();
  await expect(page.getByText('高频技术标签')).toBeVisible();
});

test('detail page opens from English list and shows key blocks', async ({ page }) => {
  await page.goto('/en/tool/llama-2');
  await expect(page).toHaveURL(/\/en\/tool\/llama-2$/);
  await expect(page.getByRole('link', { name: 'Official Demo' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Highlights' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Community' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Audience' })).toBeVisible();
});
