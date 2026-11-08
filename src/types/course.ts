export type PersonaType = 'ray' | 'insat' | 'system';

export interface DialogueItem {
  speaker: PersonaType;
  text: string;
}

export interface FormulaStep {
  label: string;
  math: string;
  explanation?: string;
}

export interface SelfCheckOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface SelfCheckQuestion {
  id: string;
  question: string;
  options: SelfCheckOption[];
  conceptualTakeaway: string;
}

export type SimulatorType =
  | 'orbit-geometry'
  | 'six-channel-sandbox'
  | 'planck-blackbody'
  | 'cloud-mask-sandbox'
  | 'gpi-rainfall'
  | 'imsra-lifecycle'
  | 'sounder-profile'
  | 'amv-tracking'
  | 'data-studio-inspector';

export interface PageSection {
  stepNumber?: number;
  headerTitle?: string;
  leadParagraph?: string;
  dialogue?: DialogueItem[];
  formulas?: FormulaStep[];
  bulletPoints?: string[];
  splatInsight?: {
    level: 'SPLAT!!!' | 'DOUBLE SPLAT!!!' | 'TRIPLE SPLAT!!!';
    summary: string;
  };
  terminologyAlert?: {
    term: string;
    definition: string;
    pitfall: string;
  };
  dataTrap?: {
    title: string;
    description: string;
    codeWarning?: string;
  };
  simulatorId?: SimulatorType;
  pythonSnippet?: {
    title: string;
    code: string;
    notes?: string;
  };
  customComponentId?: string;
}

export interface ChapterPage {
  id: string; // e.g. "1.1", "1.2", "1.5"
  tab?: string; // e.g. "Hello", "Main Ideas", "Details Part 1", "Now You Try It", "Self-Check"
  pageIndex: number;
  chapterIndex: number;
  headerBarBadge: string; // e.g. "How This Guide Works", "Why a Radar: Details Part 1"
  badgeColor?: 'blue' | 'teal' | 'amber' | 'purple' | 'rose' | 'emerald';
  title: string;
  subtitle?: string;
  sections: PageSection[];
  selfCheck?: SelfCheckQuestion;
  isSimulatorPage?: boolean;
}

export interface CourseChapter {
  id: number;
  slug: string;
  numberString: string; // "01", "02", etc.
  title: string;
  subtitle: string;
  pages: ChapterPage[];
}
