export type ToolLinkPreset = {
  q?: string;
  tags?: string[];
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  priority: number;
  intent: {
    en: string;
    zh: string;
  };
};

export const toolLinkPresets: Record<string, ToolLinkPreset> = {
  llm: {
    q: 'llm',
    tags: ['language-model', 'generative'],
    priority: 1,
    intent: {
      en: 'Guide users to foundational language-model choices first.',
      zh: '优先引导用户查看基础大模型选型。',
    },
  },
  multimodal: {
    q: 'multimodal',
    tags: ['multimodal'],
    priority: 2,
    intent: {
      en: 'Focus on cross-modal generation and understanding tools.',
      zh: '聚焦多模态生成与理解能力相关工具。',
    },
  },
  'prompt-engineering': {
    q: 'prompt',
    tags: ['workflow'],
    priority: 3,
    intent: {
      en: 'Map prompt design to workflow-oriented practical tools.',
      zh: '把提示工程连接到工作流类实用工具。',
    },
  },
  rag: {
    q: 'rag',
    tags: ['retrieval', 'workflow'],
    difficulty: 'intermediate',
    priority: 4,
    intent: {
      en: 'Recommend mid-level retrieval and orchestration options.',
      zh: '推荐中等门槛的检索与编排方案。',
    },
  },
  agent: {
    q: 'agent',
    tags: ['ai-agent', 'workflow'],
    difficulty: 'advanced',
    priority: 5,
    intent: {
      en: 'Route users to advanced autonomous workflow systems.',
      zh: '把用户导向高阶智能体与自主流程系统。',
    },
  },
  diffusion: {
    q: 'diffusion',
    tags: ['image-generation', 'generative'],
    priority: 6,
    intent: {
      en: 'Surface image-generation tools for visual-content creation.',
      zh: '突出图像生成工具，支持视觉内容创作。',
    },
  },
  'fine-tuning': {
    q: 'fine tuning',
    tags: ['instruction-tuned'],
    difficulty: 'advanced',
    priority: 7,
    intent: {
      en: 'Direct users toward specialized model adaptation paths.',
      zh: '引导到更专业的模型微调与适配路径。',
    },
  },
  inference: {
    q: 'inference',
    tags: ['serving', 'inference-engine'],
    priority: 8,
    intent: {
      en: 'Highlight runtime serving and deployment capabilities.',
      zh: '强调推理服务与部署运行能力。',
    },
  },
  benchmark: {
    q: 'benchmark',
    tags: ['monitoring', 'reasoning'],
    priority: 9,
    intent: {
      en: 'Connect evaluation concepts with observability tooling.',
      zh: '将评测概念连接到可观测与效果评估工具。',
    },
  },
};
