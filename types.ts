export enum Language {
  FR = 'fr',
  EN = 'en',
  ES = 'es',
  DE = 'de',
  AR = 'ar',
}

export type Page = 'home' | 'discover' | 'myAnalyses' | 'profile' | 'auth';
export type AnalysisTab = 'jobAnalysis' | 'cvAnalysis' | 'coverLetter' | 'interviewPrep';

// Original Job Analysis
export interface JobAnalysisResult {
  keyPoints: string[];
  dailyTasks: string[];
  tools: string[];
  dailyRoutine: string[];
  motivation: string[];
  interviewPoints: string[];
}

// CV Analysis
export interface CvAnalysisResult {
  score: number;
  summary: string;
  keywordMatch: {
    present: string[];
    missing: string[];
  };
  recommendations: string[];
}

// Cover Letter
export interface CoverLetterResult {
  letter: string;
}

export type Tone = 'formel' | 'professionnel' | 'dynamique';

// Interview Prep
export interface InterviewQuestion {
  question: string;
  answer: string;
}
export interface InterviewPrepResult {
  questions: InterviewQuestion[];
}

export interface InterviewFeedbackResult {
  feedback: string;
}