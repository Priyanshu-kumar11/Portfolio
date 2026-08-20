export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'data-analytics' | 'business-analysis' | 'automation' | 'all';
  techStack: string[];
  image: string;
  fallbackGradient: string;
  description: string;
  highlights: string[];
  impactMetrics: { label: string; value: string }[];
  codeSnippet?: {
    language: string;
    title: string;
    code: string;
  };
  demoType: 'crypto-sheets' | 'hr-powerbi' | 'none';
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location?: string;
  period: string;
  type: string;
  summary: string;
  responsibilities: string[];
  keyAchievements: string[];
  toolsUsed: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  coursework?: string[];
}

export interface SkillCategory {
  categoryName: string;
  iconName: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1 - 100
    tags: string[];
    highlight?: boolean;
  }[];
}

export interface ProfileData {
  name: string;
  titles: string[];
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  summary: string;
  stats: { label: string; value: string; helper: string }[];
}
