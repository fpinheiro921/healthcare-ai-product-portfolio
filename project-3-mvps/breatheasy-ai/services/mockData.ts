import { Patient, RiskLevel, WeatherData, DailyLog } from '../types';

const generateLogs = (days: number, baselinePEF: number, trend: 'stable' | 'declining'): DailyLog[] => {
  const logs: DailyLog[] = [];
  const now = new Date();

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(date.getDate() - (days - 1 - i));
    
    let pef = baselinePEF + (Math.random() * 20 - 10);
    let breathlessness = 2 + Math.floor(Math.random() * 2);
    let spO2 = 96 + Math.floor(Math.random() * 3);
    let rescuePuffs = 0;

    if (trend === 'declining' && i > days - 5) {
      // Simulate worsening condition
      pef -= (i - (days - 5)) * 15;
      breathlessness += (i - (days - 5));
      spO2 -= (i - (days - 5)) * 0.5;
      rescuePuffs += Math.floor(Math.random() * 2) + 1;
    }

    logs.push({
      date: date.toISOString().split('T')[0],
      pef: Math.round(pef),
      spO2: Math.round(spO2),
      breathlessness: Math.min(10, breathlessness),
      coughSeverity: trend === 'declining' ? 4 + (i > days - 5 ? 2 : 0) : 2,
      sputumColor: trend === 'declining' && i > days - 3 ? 'Yellow' : 'Clear',
      steps: trend === 'declining' ? 2000 : 4500,
      rescueInhalerPuffs: rescuePuffs,
      notes: trend === 'declining' && i === days -1 ? "Feeling tight chested today." : ""
    });
  }
  return logs;
};

export const mockPatients: Patient[] = [
  {
    id: 'p1',
    name: 'John Doe',
    age: 68,
    gender: 'Male',
    copdStage: 'GOLD 3',
    baselinePEF: 350,
    riskScore: 65,
    riskTrend: 'worsening',
    nextCheckup: '2023-11-15',
    medications: [
      { 
        id: 'm1', 
        name: 'Tiotropium (Spiriva)', 
        dosage: '18mcg', 
        frequency: 'Once Daily', 
        type: 'Maintenance', 
        remainingDoses: 12,
        instructions: 'Inhale the contents of one capsule once daily using the HandiHaler device at the same time each day.' 
      },
      { 
        id: 'm2', 
        name: 'Albuterol HFA', 
        dosage: '90mcg', 
        frequency: 'As needed', 
        type: 'Rescue', 
        remainingDoses: 45,
        instructions: 'Take 2 puffs every 4-6 hours as needed for shortness of breath.' 
      }
    ],
    logs: generateLogs(14, 350, 'declining')
  },
  {
    id: 'p2',
    name: 'Sarah Jenkins',
    age: 72,
    gender: 'Female',
    copdStage: 'GOLD 2',
    baselinePEF: 280,
    riskScore: 15,
    riskTrend: 'stable',
    nextCheckup: '2023-12-01',
    medications: [
      { 
        id: 'm3', 
        name: 'Fluticasone/Salmeterol', 
        dosage: '250/50mcg', 
        frequency: 'Twice Daily', 
        type: 'Maintenance', 
        remainingDoses: 8,
        instructions: 'Inhale 1 puff by mouth twice daily, approximately 12 hours apart. Rinse mouth after use.' 
      }
    ],
    logs: generateLogs(14, 280, 'stable')
  }
];

export const mockWeather: WeatherData = {
  aqi: 45,
  pm25: 12,
  temperature: 72,
  humidity: 45,
  windSpeed: 8,
  isDay: true,
  weatherCode: 2,
  pollen: 'Medium',
  condition: 'Partly Cloudy'
};