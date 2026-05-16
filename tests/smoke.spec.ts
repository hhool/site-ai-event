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

test('Chinese scenario page resolves percent-encoded localized slug', async ({ page }) => {
  await page.goto('/zh/scenarios/%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7');
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

test('knowledge page supports search and filtering', async ({ page }) => {
  await page.goto('/en/knowledge');
  await expect(page.getByRole('heading', { level: 1, name: 'AIGC Connected Knowledge Hub' })).toBeVisible();

  const search = page.getByPlaceholder('Search concepts, domains, and industries...');
  await search.fill('RAG');

  await expect(page.getByRole('heading', { level: 3, name: 'Retrieval-Augmented Generation' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Diffusion Model' })).toHaveCount(0);
  await expect(page.getByText('Matched items:')).toBeVisible();

  await page.getByRole('button', { name: 'Reset' }).click();
  await expect(page.getByRole('heading', { level: 3, name: 'Diffusion Model' })).toBeVisible();
});

test('Chinese knowledge page supports search and reset', async ({ page }) => {
  await page.goto('/zh/knowledge');
  await expect(page.getByRole('heading', { level: 1, name: 'AIGC 关联知识普及站' })).toBeVisible();

  const search = page.getByPlaceholder('搜索术语、领域或行业...');
  await search.fill('检索增强生成');

  await expect(page.getByRole('heading', { level: 3, name: '检索增强生成' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: '扩散模型' })).toHaveCount(0);
  await expect(page.getByText('匹配条目:')).toBeVisible();

  await page.getByRole('button', { name: '重置' }).click();
  await expect(page.getByRole('heading', { level: 3, name: '扩散模型' })).toBeVisible();
});

test('knowledge term related link navigates to list search', async ({ page }) => {
  await page.goto('/en/knowledge');
  await page.getByRole('link', { name: 'llm' }).first().click();
  await expect(page).toHaveURL(/\/en\?q=llm&tags=language-model%2Cgenerative/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
