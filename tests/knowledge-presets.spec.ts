import { expect, test } from '@playwright/test';
import { knowledgeTerms } from '@/data/knowledge';
import { toolLinkPresets } from '@/data/knowledge-tool-presets';
import { tools } from '@/data/tools';

test('knowledge tool presets only reference existing tool tags', () => {
  const toolTags = new Set(tools.flatMap((tool) => tool.tags));

  for (const [key, preset] of Object.entries(toolLinkPresets)) {
    for (const tag of preset.tags ?? []) {
      expect(toolTags.has(tag), `Preset "${key}" references unknown tag "${tag}"`).toBeTruthy();
    }
  }
});

test('knowledge tool preset keys are connected to knowledge terms', () => {
  const termSlugs = new Set(knowledgeTerms.map((term) => term.slug));
  const relatedKeys = new Set(knowledgeTerms.flatMap((term) => term.related));

  for (const key of Object.keys(toolLinkPresets)) {
    expect(
      termSlugs.has(key) || relatedKeys.has(key),
      `Preset key "${key}" is not referenced by term.slug or term.related`,
    ).toBeTruthy();
  }
});

test('knowledge tool preset priorities are unique positive integers', () => {
  const priorities = Object.values(toolLinkPresets).map((preset) => preset.priority);
  const unique = new Set(priorities);

  expect(unique.size).toBe(priorities.length);
  expect(priorities.every((value) => Number.isInteger(value) && value > 0)).toBeTruthy();
});
