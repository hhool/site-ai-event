export type ToolLinkPreset = {
  q?: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
};

export const toolLinkPresets: Record<string, ToolLinkPreset> = {
  llm: { q: 'llm', tags: ['language-model', 'generative'] },
  multimodal: { q: 'multimodal', tags: ['multimodal'] },
  'prompt-engineering': { q: 'prompt', tags: ['workflow'] },
  rag: { q: 'rag', tags: ['retrieval', 'workflow'], difficulty: 'intermediate' },
  agent: { q: 'agent', tags: ['ai-agent', 'workflow'], difficulty: 'advanced' },
  diffusion: { q: 'diffusion', tags: ['image-generation', 'generative'] },
  'fine-tuning': { q: 'fine tuning', tags: ['instruction-tuned'], difficulty: 'advanced' },
  inference: { q: 'inference', tags: ['serving', 'inference-engine'] },
  benchmark: { q: 'benchmark', tags: ['monitoring', 'reasoning'] },
};
