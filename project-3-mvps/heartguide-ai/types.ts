export enum RiskLevel {
  LOW = 'LOW', // < 30%
  MODERATE = 'MODERATE', // 30-59%
  HIGH = 'HIGH', // >= 60%
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  takenToday: boolean;
  lastTaken?: string;
}

export interface SymptomLog {
  date: string;
  weight: number;
  shortnessOfBreath: number; // 1-10
  swelling: boolean;
  chestPain: boolean;
  notes: string;
}

export interface FoodEntry {
  id: string;
  name: string;
  sodiumMg: number;
  timestamp: string;
  confidence?: string;
}

export type AppView = 'patient' | 'provider' | 'overview' | 'manager';

export interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string; // e.g., "HFpEF"
  riskScore: number; // 0-100
  riskLevel: RiskLevel;
  weightHistory: { date: string; weight: number }[];
  medications: Medication[];
  logs: SymptomLog[];
  foodLogs: FoodEntry[];
  lastCheckIn?: string;
  alerts: string[];
}

export interface SodiumEstimationResponse {
  sodiumMg: number;
  advice: string;
  riskAnalysis: string;
}

export interface RiskAssessmentResponse {
  riskScore: number;
  riskAnalysis: string;
  recommendation: string;
}