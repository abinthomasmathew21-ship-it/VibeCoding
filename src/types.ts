export type ChallengeCategory = "Finance & Arrangements" | "Campus Problems" | "Real-World Problems";

export interface TeamMember {
  id: string;
  name: string;
  year: "1st Year" | "2nd Year";
  role: "Problem Analysis" | "UI/UX Design" | "Development" | "AI-Assisted Dev" | "Testing & Debugging" | "Presentation";
  avatarColor: string;
}

export interface TeamProfile {
  teamName: string;
  teamNumber?: string;
  members: TeamMember[];
  selectedCategory: ChallengeCategory;
  projectTitle: string;
  tagline: string;
  problemStatement: string;
  targetUsers: string;
  proposedSolution: string;
  techStack: string[];
  aiToolsUsed: string[];
  repoUrl: string;
  demoUrl: string;
  presentationNotes: string;
}

export interface ProblemPreset {
  id: string;
  category: ChallengeCategory;
  title: string;
  targetUsers: string;
  painPoint: string;
  mvpScope: string[];
  impactMetric: string;
  suggestedStack: string[];
  aiPromptStarter: string;
}

export interface EvaluationCriterion {
  id: string;
  name: string;
  focus: string;
  maxScore: number;
  weightDescription: string;
  guidingQuestions: string[];
}

export interface TaskItem {
  id: string;
  phase: "morning_plan" | "morning_mvp" | "afternoon_enhance" | "afternoon_demo";
  title: string;
  description: string;
  completed: boolean;
  assignedTo?: string;
}

export interface VibeRuleItem {
  id: string;
  title: string;
  description: string;
  tip: string;
}
