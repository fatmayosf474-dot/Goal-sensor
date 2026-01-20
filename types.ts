
export interface User {
  id: string;
  name: string;
  avatar?: string;
}

export interface AnalysisResult {
  score: number;
  breakdown: {
    skill: number;
    accuracy: number;
    difficulty: number;
    aesthetics: number;
  };
  title: string;
  verdict: string;
  evidence: string[];
  tips: string[];
}

export enum AnalysisStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}
