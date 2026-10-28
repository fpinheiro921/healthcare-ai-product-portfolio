export enum RiskLevel {
  LOW = 'Low',
  MODERATE = 'Moderate',
  HIGH = 'High',
  CRITICAL = 'Critical'
}

export enum Zone {
  GREEN = 'Green',
  YELLOW = 'Yellow',
  RED = 'Red'
}

export interface DailyLog {
  date: string;
  pef: number; // Peak Expiratory Flow in L/min
  spO2: number; // Oxygen Saturation %
  breathlessness: number; // 1-10 scale
  coughSeverity: number; // 1-10 scale
  sputumColor: 'Clear' | 'White' | 'Yellow' | 'Green' | 'Brown';
  steps: number;
  rescueInhalerPuffs: number;
  notes: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  type: 'Maintenance' | 'Rescue';
  lastTaken?: string;
  remainingDoses: number;
  instructions?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  copdStage: 'GOLD 1' | 'GOLD 2' | 'GOLD 3' | 'GOLD 4';
  baselinePEF: number;
  logs: DailyLog[];
  medications: Medication[];
  riskScore: number; // 0-100
  riskTrend: 'stable' | 'improving' | 'worsening';
  nextCheckup: string;
}

export interface AIAnalysisResult {
  riskScore: number;
  riskLevel: RiskLevel;
  reasoning: string;
  recommendation: string;
  urgentActionRequired: boolean;
}

export interface WeatherData {
  aqi: number;
  pm25: number;
  temperature: number;
  humidity: number;
  windSpeed: number; // Added
  isDay: boolean; // Added
  weatherCode: number; // Added
  pollen: string; // Changed to string to support "High (Grass)"
  condition: string;
}

export type AppView = 'patient' | 'provider' | 'overview' | 'manager';