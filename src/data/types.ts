export interface ToolHighlight {
  title: string;
  desc: string;
}

export interface ToolAudience {
  label: string;
  desc: string;
}

export interface ToolDetail {
  background: string;
  highlights: ToolHighlight[];
  community: string;
  audience: ToolAudience[];
  coverImage?: string;
}

export interface Tool {
  slug: string;
  year: 2023 | 2024 | 2025;
  name: string;
  logoUrl: string;
  tagline: { en: string; zh: string };
  githubUrl: string;
  websiteUrl: string;
  demoUrl: string;
  stars: string;
  categories: { en: string[]; zh: string[] };
  tags: string[]; // e.g., ['generative', 'multimodal', 'vision']
  difficulty: 'beginner' | 'intermediate' | 'advanced'; // For adoption complexity
  communitySize: 'small' | 'medium' | 'large'; // GitHub stars or activity-based
  detail: {
    en: ToolDetail;
    zh: ToolDetail;
  };
}
