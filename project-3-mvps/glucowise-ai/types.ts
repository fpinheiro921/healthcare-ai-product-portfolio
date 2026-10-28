export enum UserRole {
  PATIENT = 'PATIENT',
  PROVIDER = 'PROVIDER',
  OVERVIEW = 'OVERVIEW',
  MANAGER = 'MANAGER'
}

export enum GlucoseContext {
  FASTING = 'Fasting',
  PRE_MEAL = 'Pre-Meal',
  POST_MEAL = 'Post-Meal',
  BEDTIME = 'Bedtime'
}

export enum RiskLevel {
  LOW = 'LOW',     // Green
  MEDIUM = 'MEDIUM', // Yellow
  HIGH = 'HIGH'    // Red
}

export interface GlucoseReading {
  id: string;
  value: number; // mg/dL
  timestamp: string; // ISO string
  context: GlucoseContext;
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  takenToday: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  type: 'Type 1' | 'Type 2';
  latestA1C: number;
  lastVisit: string;
  riskLevel: RiskLevel;
  timeInRange: number; // Percentage
  readings: GlucoseReading[];
}

export interface FoodLogEntry {
  foodItem: string;
  carbs: number;
  calories: number;
  timestamp: string;
  confidence?: string;
}

export interface AIInsight {
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  actionable?: string;
}