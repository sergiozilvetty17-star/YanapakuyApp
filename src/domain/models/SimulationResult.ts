export interface SimulationResult {
  id: string;
  scenarioId: number;
  score: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  criticalErrors: number;
  elapsedTime: number;
  completed: boolean;
  emergencyCallRequired: boolean;
  emergencyCallCompleted: boolean;
  createdAt: string;
}
