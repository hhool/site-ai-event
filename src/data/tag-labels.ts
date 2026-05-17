export type Locale = 'en' | 'zh';

const TAG_LABEL_MAP: Record<string, { en: string; zh: string }> = {
  advanced: { en: 'Advanced Reasoning', zh: '高级推理' },
  'ai-agent': { en: 'AI Agent', zh: '智能体' },
  'ai-platform': { en: 'AI Platform', zh: 'AI 平台' },
  automation: { en: 'Automation', zh: '自动化' },
  chinese: { en: 'Chinese', zh: '中文' },
  'code-generation': { en: 'Code Generation', zh: '代码生成' },
  'developer-tool': { en: 'Developer Tool', zh: '开发工具' },
  edge: { en: 'Edge AI', zh: '边缘 AI' },
  efficient: { en: 'Efficient', zh: '高效率' },
  fast: { en: 'Fast Inference', zh: '快速推理' },
  generative: { en: 'Generative AI', zh: '生成式 AI' },
  'image-generation': { en: 'Image Generation', zh: '图像生成' },
  'inference-engine': { en: 'Inference Engine', zh: '推理引擎' },
  'instruction-tuned': { en: 'Instruction Tuned', zh: '指令微调' },
  integration: { en: 'Integration', zh: '系统集成' },
  'language-model': { en: 'Language Model', zh: '语言模型' },
  lightweight: { en: 'Lightweight', zh: '轻量化' },
  'llm-ops': { en: 'LLM Ops', zh: 'LLM 运维' },
  'low-code': { en: 'Low Code', zh: '低代码' },
  monitoring: { en: 'Monitoring', zh: '监控观测' },
  multilingual: { en: 'Multilingual', zh: '多语言' },
  multimodal: { en: 'Multimodal', zh: '多模态' },
  'next-gen': { en: 'Next Generation', zh: '新一代' },
  'open-source': { en: 'Open Source', zh: '开源' },
  performance: { en: 'Performance', zh: '高性能' },
  powerful: { en: 'High Capability', zh: '高能力' },
  rag: { en: 'RAG', zh: '检索增强' },
  reasoning: { en: 'Reasoning', zh: '推理' },
  research: { en: 'Research', zh: '研究向' },
  retrieval: { en: 'Retrieval', zh: '检索' },
  serving: { en: 'Model Serving', zh: '模型服务' },
  'video-generation': { en: 'Video Generation', zh: '视频生成' },
  'vision-language': { en: 'Vision-Language', zh: '视觉语言' },
  workflow: { en: 'Workflow', zh: '工作流' },
  'workflow-builder': { en: 'Workflow Builder', zh: '流程编排' },
};

function toTitleCase(value: string) {
  return value
    .split('-')
    .map((part) => part.slice(0, 1).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getTagDisplay(tag: string, locale: Locale) {
  const mapped = TAG_LABEL_MAP[tag];
  if (!mapped) {
    const fallback = toTitleCase(tag);
    return locale === 'zh' ? `${fallback} / ${fallback}` : `${fallback} / ${fallback}`;
  }

  return locale === 'zh' ? `${mapped.zh} / ${mapped.en}` : `${mapped.en} / ${mapped.zh}`;
}
