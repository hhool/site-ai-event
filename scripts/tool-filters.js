#!/usr/bin/env node

// Mapping of tool slugs to filter properties
const toolFilters = {
  'llama-2': {
    tags: ['language-model', 'generative', 'open-source'],
    difficulty: 'intermediate',
    communitySize: 'large',
  },
  'autogpt': {
    tags: ['ai-agent', 'autonomous', 'workflow'],
    difficulty: 'advanced',
    communitySize: 'large',
  },
  'chatglm2': {
    tags: ['language-model', 'generative', 'chinese'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'sdxl': {
    tags: ['image-generation', 'generative', 'multimodal'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'langsmith': {
    tags: ['development-tool', 'llm-ops', 'monitoring'],
    difficulty: 'intermediate',
    communitySize: 'medium',
  },
  'mistral-7b': {
    tags: ['language-model', 'generative', 'efficient'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'vicuna': {
    tags: ['language-model', 'generative', 'instruction-tuned'],
    difficulty: 'beginner',
    communitySize: 'medium',
  },
  'starcoder': {
    tags: ['code-generation', 'language-model', 'developer-tool'],
    difficulty: 'intermediate',
    communitySize: 'medium',
  },
  'falcon': {
    tags: ['language-model', 'generative', 'efficient'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'code-llama': {
    tags: ['code-generation', 'language-model', 'developer-tool'],
    difficulty: 'intermediate',
    communitySize: 'large',
  },
  'llama-3': {
    tags: ['language-model', 'generative', 'multimodal'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'deepseek-v2': {
    tags: ['language-model', 'generative', 'reasoning'],
    difficulty: 'intermediate',
    communitySize: 'large',
  },
  'qwen-2': {
    tags: ['language-model', 'generative', 'multilingual'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'mistral-large': {
    tags: ['language-model', 'generative', 'powerful'],
    difficulty: 'intermediate',
    communitySize: 'large',
  },
  'dify': {
    tags: ['ai-platform', 'low-code', 'workflow-builder'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'gemma': {
    tags: ['language-model', 'generative', 'lightweight'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'stable-diffusion-3': {
    tags: ['image-generation', 'generative', 'multimodal'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'command-r': {
    tags: ['language-model', 'generative', 'retrieval'],
    difficulty: 'intermediate',
    communitySize: 'medium',
  },
  'phi-3': {
    tags: ['language-model', 'generative', 'lightweight'],
    difficulty: 'beginner',
    communitySize: 'medium',
  },
  'groq': {
    tags: ['inference-engine', 'fast', 'edge'],
    difficulty: 'intermediate',
    communitySize: 'medium',
  },
  'deepseek-r1': {
    tags: ['language-model', 'reasoning', 'advanced'],
    difficulty: 'advanced',
    communitySize: 'large',
  },
  'qwen3': {
    tags: ['language-model', 'generative', 'multilingual'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'llama-4': {
    tags: ['language-model', 'generative', 'next-gen'],
    difficulty: 'intermediate',
    communitySize: 'large',
  },
  'mistral-small-3': {
    tags: ['language-model', 'generative', 'efficient'],
    difficulty: 'beginner',
    communitySize: 'medium',
  },
  'gemma-3': {
    tags: ['language-model', 'generative', 'lightweight'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'phi-4': {
    tags: ['language-model', 'generative', 'research'],
    difficulty: 'intermediate',
    communitySize: 'medium',
  },
  'n8n-ai': {
    tags: ['automation', 'workflow', 'integration'],
    difficulty: 'beginner',
    communitySize: 'medium',
  },
  'dify-1x': {
    tags: ['ai-platform', 'rag', 'low-code'],
    difficulty: 'beginner',
    communitySize: 'large',
  },
  'smolagents': {
    tags: ['ai-agent', 'lightweight', 'developer-tool'],
    difficulty: 'intermediate',
    communitySize: 'small',
  },
  'wan-video': {
    tags: ['video-generation', 'generative', 'multimodal'],
    difficulty: 'intermediate',
    communitySize: 'medium',
  },
};

module.exports = toolFilters;
