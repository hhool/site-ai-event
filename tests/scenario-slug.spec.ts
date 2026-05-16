import { test, expect } from '@playwright/test';
import { normalizeScenarioSlug, toScenarioSlug } from '@/data/scenario-slug';

test('toScenarioSlug normalizes whitespace and casing', () => {
  expect(toScenarioSlug('  Dev Tools  ')).toBe('dev-tools');
  expect(toScenarioSlug('AI   Agent   Stack')).toBe('ai-agent-stack');
});

test('normalizeScenarioSlug handles encoded localized values', () => {
  expect(normalizeScenarioSlug('%E5%BC%80%E5%8F%91%E5%B7%A5%E5%85%B7')).toBe('开发工具');
});

test('normalizeScenarioSlug falls back for malformed encoding', () => {
  expect(normalizeScenarioSlug('%E0%A4%A')).toBe('%e0%a4%a');
});
