#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const toolFilters = require('./tool-filters.js');

const toolsPath = path.join(__dirname, '../src/data/tools.ts');
let content = fs.readFileSync(toolsPath, 'utf-8');

// Use regex to find each tool object and its slug
// Then insert the filter fields before detail

let result = content;
const toolObjectRegex = /(\{\s*slug:\s*'([^']+)'[^}]*categories:\s*\{[^}]*\},)\s*(\n\s*detail:)/g;

let match;
while ((match = toolObjectRegex.exec(content)) !== null) {
  const fullMatch = match[0];
  const beforeDetail = match[1];
  const slug = match[2];
  const detailLine = match[3];

  const filters = toolFilters[slug];
  if (!filters) {
    console.warn(`No filters for ${slug}`);
    continue;
  }

  const newFields = `${beforeDetail}
    tags: ${JSON.stringify(filters.tags)},
    difficulty: '${filters.difficulty}' as const,
    communitySize: '${filters.communitySize}' as const,${detailLine}`;

  result = result.replace(fullMatch, newFields);
}

if (result === content) {
  console.error('No changes made');
  process.exit(1);
}

fs.writeFileSync(toolsPath, result, 'utf-8');
console.log('✓ Updated tools.ts');
