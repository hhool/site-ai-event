type LocalizedText = {
  en: string;
  zh: string;
};

export type KnowledgeTerm = {
  slug: string;
  term: LocalizedText;
  abbreviation?: string;
  category: LocalizedText;
  definition: LocalizedText;
  misconception: LocalizedText;
  related: string[];
};

export type KnowledgeDomain = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  keyAbilities: LocalizedText[];
};

export type IndustryApplication = {
  slug: string;
  industry: LocalizedText;
  painPoint: LocalizedText;
  aigcMapping: LocalizedText;
  representativeCases: LocalizedText[];
};

export type CrossDisciplineTopic = {
  slug: string;
  name: LocalizedText;
  relevance: LocalizedText;
  commonMethods: LocalizedText[];
};

export const knowledgeTerms: KnowledgeTerm[] = [
  {
    slug: 'aigc',
    term: { en: 'AIGC', zh: 'AIGC（生成式 AI 内容）' },
    abbreviation: 'AI-Generated Content',
    category: { en: 'Foundation', zh: '基础概念' },
    definition: {
      en: 'AIGC is the generation of text, image, audio, video, or code content by AI systems based on prompts, data, and model priors.',
      zh: 'AIGC 指 AI 系统基于提示词、数据与模型先验自动生成文本、图像、音频、视频或代码内容。',
    },
    misconception: {
      en: 'AIGC is not "one model does everything". Real products often combine multiple models and deterministic workflows.',
      zh: 'AIGC 不是“一个模型包打天下”，真实产品通常是多模型与规则流程组合。',
    },
    related: ['llm', 'multimodal', 'prompt-engineering'],
  },
  {
    slug: 'llm',
    term: { en: 'Large Language Model', zh: '大语言模型' },
    abbreviation: 'LLM',
    category: { en: 'Model', zh: '模型' },
    definition: {
      en: 'A language model trained on large-scale corpora that predicts next tokens and supports generation, reasoning, and transformation tasks.',
      zh: '在大规模语料上训练的语言模型，通过预测下一个 token 支持生成、推理与转换任务。',
    },
    misconception: {
      en: 'LLM quality is not measured by parameter count alone; data quality, alignment, and inference strategy matter equally.',
      zh: 'LLM 能力不只由参数量决定，数据质量、对齐方法和推理策略同样关键。',
    },
    related: ['inference', 'fine-tuning', 'benchmark'],
  },
  {
    slug: 'rag',
    term: { en: 'Retrieval-Augmented Generation', zh: '检索增强生成' },
    abbreviation: 'RAG',
    category: { en: 'Architecture', zh: '系统架构' },
    definition: {
      en: 'RAG retrieves external knowledge before generation so model outputs can reference fresher and domain-specific information.',
      zh: 'RAG 在生成前先检索外部知识，使输出可引用更新且更领域化的信息。',
    },
    misconception: {
      en: 'RAG is not just vector search. Data chunking, reranking, grounding, and citation strategy decide final quality.',
      zh: 'RAG 不等于“只做向量检索”，切片、重排、引用与校验策略决定最终质量。',
    },
    related: ['llm', 'embedding', 'hallucination'],
  },
  {
    slug: 'agent',
    term: { en: 'AI Agent', zh: 'AI 智能体' },
    category: { en: 'Application Pattern', zh: '应用模式' },
    definition: {
      en: 'An agent combines planning, tool-use, memory, and feedback loops to complete multi-step tasks autonomously.',
      zh: '智能体通过规划、工具调用、记忆和反馈闭环，自主完成多步骤任务。',
    },
    misconception: {
      en: 'Agent does not mean fully autonomous by default; most production agents still need guardrails and human checkpoints.',
      zh: '智能体不代表完全无人值守，生产场景仍需约束机制和人工检查点。',
    },
    related: ['workflow', 'tool-calling', 'evaluation'],
  },
  {
    slug: 'multimodal',
    term: { en: 'Multimodal Model', zh: '多模态模型' },
    category: { en: 'Model', zh: '模型' },
    definition: {
      en: 'A model that can process and/or generate multiple modalities such as text, image, audio, and video.',
      zh: '可处理或生成多种模态（文本、图像、音频、视频）的模型。',
    },
    misconception: {
      en: 'Multimodal capability is not equivalent across tasks; OCR, grounding, generation, and reasoning can vary drastically.',
      zh: '多模态能力并非均衡，OCR、定位、生成与推理表现可能差异很大。',
    },
    related: ['diffusion', 'vision-language', 'inference'],
  },
  {
    slug: 'diffusion',
    term: { en: 'Diffusion Model', zh: '扩散模型' },
    category: { en: 'Generation Model', zh: '生成模型' },
    definition: {
      en: 'A generative model that learns to denoise step by step and is widely used in image and video synthesis.',
      zh: '通过逐步去噪学习生成分布，广泛用于图像与视频合成。',
    },
    misconception: {
      en: 'Diffusion output quality depends heavily on prompt design, conditioning, and post-processing pipeline.',
      zh: '扩散模型效果高度依赖提示词设计、条件控制与后处理流程。',
    },
    related: ['multimodal', 'prompt-engineering', 'inference'],
  },
  {
    slug: 'fine-tuning',
    term: { en: 'Fine-tuning', zh: '微调' },
    category: { en: 'Model Adaptation', zh: '模型适配' },
    definition: {
      en: 'Adapting a pretrained model to domain tasks using smaller task-specific datasets and optimization methods.',
      zh: '在预训练模型基础上，用更小的任务数据与优化方法进行领域化适配。',
    },
    misconception: {
      en: 'Fine-tuning is not always necessary; prompt engineering and RAG can be lower-cost alternatives for many use cases.',
      zh: '微调并非总是必须，很多场景可先用提示工程和 RAG 降低成本。',
    },
    related: ['llm', 'alignment', 'evaluation'],
  },
  {
    slug: 'inference',
    term: { en: 'Inference', zh: '推理服务' },
    category: { en: 'Engineering', zh: '工程部署' },
    definition: {
      en: 'The runtime process of serving model predictions with constraints on latency, throughput, and cost.',
      zh: '模型在线运行并返回预测结果的过程，核心约束是延迟、吞吐和成本。',
    },
    misconception: {
      en: 'Inference optimization is not only about GPU type; batching, caching, quantization, and routing are major factors.',
      zh: '推理优化不只是换更强 GPU，批处理、缓存、量化和路由策略都很关键。',
    },
    related: ['benchmark', 'quantization', 'latency'],
  },
  {
    slug: 'benchmark',
    term: { en: 'Benchmark', zh: '基准评测' },
    category: { en: 'Evaluation', zh: '评测方法' },
    definition: {
      en: 'A standardized test set and protocol used to compare model or system performance across tasks.',
      zh: '用于比较模型或系统表现的标准化数据集和评测协议。',
    },
    misconception: {
      en: 'Benchmark scores cannot fully represent production quality; online feedback and task-specific KPIs are still required.',
      zh: '基准分数无法完全代表生产质量，仍需线上反馈与业务 KPI 联合评估。',
    },
    related: ['evaluation', 'llm', 'inference'],
  },
  {
    slug: 'prompt-engineering',
    term: { en: 'Prompt Engineering', zh: '提示工程' },
    category: { en: 'Interaction Design', zh: '交互设计' },
    definition: {
      en: 'Designing prompts, instruction structure, and context strategy to improve model output quality and controllability.',
      zh: '通过设计提示词、指令结构和上下文策略来提升输出质量与可控性。',
    },
    misconception: {
      en: 'Prompt engineering is not only wording tweaks; it includes structured context, examples, and tool constraints.',
      zh: '提示工程不只是“改措辞”，还包括上下文结构、示例和工具约束设计。',
    },
    related: ['agent', 'rag', 'evaluation'],
  },
];

export const knowledgeDomains: KnowledgeDomain[] = [
  {
    slug: 'model-layer',
    name: { en: 'Model Layer', zh: '模型层' },
    description: {
      en: 'Core model families and adaptation strategies that decide generation capability and ceiling.',
      zh: '决定生成能力上限的核心模型家族与模型适配策略。',
    },
    keyAbilities: [
      { en: 'Text, image, audio generation', zh: '文本、图像、音频生成' },
      { en: 'Reasoning and instruction following', zh: '推理与指令遵循' },
      { en: 'Domain adaptation via fine-tuning', zh: '通过微调进行领域适配' },
    ],
  },
  {
    slug: 'system-layer',
    name: { en: 'System Layer', zh: '系统层' },
    description: {
      en: 'Infrastructure and middleware that make AIGC usable in production systems.',
      zh: '让 AIGC 真正可生产化的基础设施与中间层。',
    },
    keyAbilities: [
      { en: 'Inference serving and scaling', zh: '推理服务与扩缩容' },
      { en: 'RAG pipeline orchestration', zh: 'RAG 流程编排' },
      { en: 'Observability and guardrails', zh: '可观测性与安全约束' },
    ],
  },
  {
    slug: 'application-layer',
    name: { en: 'Application Layer', zh: '应用层' },
    description: {
      en: 'User-facing products and workflows built on top of model/system capabilities.',
      zh: '基于模型与系统能力构建的用户可感知产品和工作流。',
    },
    keyAbilities: [
      { en: 'Co-pilot experiences', zh: 'Copilot 助手体验' },
      { en: 'Content automation workflows', zh: '内容自动化工作流' },
      { en: 'Industry-specific decision support', zh: '行业决策支持' },
    ],
  },
];

export const industryApplications: IndustryApplication[] = [
  {
    slug: 'education',
    industry: { en: 'Education', zh: '教育' },
    painPoint: {
      en: 'Personalized tutoring is expensive and difficult to scale.',
      zh: '个性化辅导成本高，难以规模化。',
    },
    aigcMapping: {
      en: 'Use tutoring assistants, adaptive exercises, and automated feedback generation.',
      zh: '使用智能辅导助手、自适应练习和自动反馈生成。',
    },
    representativeCases: [
      { en: 'AI lesson draft generation', zh: 'AI 教案初稿生成' },
      { en: 'Homework review co-pilot', zh: '作业批改辅助' },
    ],
  },
  {
    slug: 'healthcare',
    industry: { en: 'Healthcare', zh: '医疗健康' },
    painPoint: {
      en: 'Clinical documentation and patient communication consume excessive clinician time.',
      zh: '临床文书与患者沟通占用大量医生时间。',
    },
    aigcMapping: {
      en: 'Use summarization, decision-support retrieval, and patient-facing explanation generation.',
      zh: '使用病历摘要、决策支持检索与患者解释生成。',
    },
    representativeCases: [
      { en: 'Consultation summary assistant', zh: '门诊摘要助手' },
      { en: 'Discharge instruction generation', zh: '出院指导生成' },
    ],
  },
  {
    slug: 'finance',
    industry: { en: 'Finance', zh: '金融' },
    painPoint: {
      en: 'Regulatory updates and risk analysis require high manual review effort.',
      zh: '监管更新与风险分析需要大量人工复核。',
    },
    aigcMapping: {
      en: 'Use report drafting, policy parsing, and anomaly explanation assistance.',
      zh: '使用报告起草、政策解析和异常解释辅助。',
    },
    representativeCases: [
      { en: 'Research report first draft', zh: '研报初稿生成' },
      { en: 'Compliance rule interpretation bot', zh: '合规条款解读助手' },
    ],
  },
  {
    slug: 'manufacturing',
    industry: { en: 'Manufacturing', zh: '制造业' },
    painPoint: {
      en: 'Knowledge silos across design, operations, and maintenance slow down issue response.',
      zh: '设计、运维、维护知识孤岛导致问题响应慢。',
    },
    aigcMapping: {
      en: 'Use troubleshooting copilots, SOP generation, and maintenance recommendation systems.',
      zh: '使用故障排查助手、SOP 生成与维护建议系统。',
    },
    representativeCases: [
      { en: 'Equipment fault diagnosis assistant', zh: '设备故障诊断助手' },
      { en: 'Work-order generation automation', zh: '工单生成自动化' },
    ],
  },
];

export const crossDisciplineTopics: CrossDisciplineTopic[] = [
  {
    slug: 'hci',
    name: { en: 'Human-Computer Interaction', zh: '人机交互（HCI）' },
    relevance: {
      en: 'AIGC products succeed or fail largely based on interaction design, feedback loops, and trust calibration.',
      zh: 'AIGC 产品成败高度依赖交互设计、反馈闭环与信任校准。',
    },
    commonMethods: [
      { en: 'Prompt UX patterns', zh: '提示词交互模式设计' },
      { en: 'Human-in-the-loop flow design', zh: '人在回路流程设计' },
    ],
  },
  {
    slug: 'cognitive-science',
    name: { en: 'Cognitive Science', zh: '认知科学' },
    relevance: {
      en: 'Understanding attention, memory, and reasoning patterns helps design better explanation and correction mechanisms.',
      zh: '理解注意力、记忆与推理规律，有助于设计更好的解释与纠错机制。',
    },
    commonMethods: [
      { en: 'Cognitive load analysis', zh: '认知负荷分析' },
      { en: 'Reasoning trace inspection', zh: '推理链路观察' },
    ],
  },
  {
    slug: 'law-ethics',
    name: { en: 'Law & AI Ethics', zh: '法学与 AI 伦理' },
    relevance: {
      en: 'AIGC deployment needs legal compliance, IP clarity, and responsible AI governance.',
      zh: 'AIGC 落地必须满足合规、版权和负责任 AI 治理要求。',
    },
    commonMethods: [
      { en: 'Risk classification matrix', zh: '风险分级矩阵' },
      { en: 'Policy-by-design controls', zh: '合规前置设计' },
    ],
  },
  {
    slug: 'design',
    name: { en: 'Design Studies', zh: '设计学' },
    relevance: {
      en: 'AIGC shifts design from static output to iterative co-creation workflows.',
      zh: 'AIGC 让设计从静态产出转向“人机协同迭代”。',
    },
    commonMethods: [
      { en: 'Prompt-based ideation', zh: '提示驱动创意发散' },
      { en: 'Rapid prototype loops', zh: '快速原型迭代' },
    ],
  },
];
