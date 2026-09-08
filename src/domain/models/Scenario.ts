export interface Scenario {
  id: number;
  emergencyId: number;
  title: string;
  description: string;
  difficulty: 'facil' | 'medio' | 'dificil';
  estimatedTime: number;
  requiresEmergencyCall: boolean;
  active: boolean;
}
