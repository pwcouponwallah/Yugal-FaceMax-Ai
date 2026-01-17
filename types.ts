
export interface AnalysisResult {
  jawlineScore: number;
  skinQuality: number;
  potential: number;
  overallRating: number;
  analysis: string;
  recommendations: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  isLoggedIn: boolean;
  lastAnalysis?: AnalysisResult;
}

export enum Page {
  LANDING = 'landing',
  DASHBOARD = 'dashboard',
  SCAN = 'scan',
  TIPS = 'tips',
  PROFILE = 'profile'
}
