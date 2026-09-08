import type { Answer, Question, Scenario } from '@/domain/models';

export interface SimulationState {
  scenario: Scenario;
  currentQuestionIndex: number;
  score: number;
  maxScore: number;
  correctAnswers: number;
  incorrectAnswers: number;
  criticalErrors: number;
  elapsedTime: number;
  completed: boolean;
  emergencyCallRequired: boolean;
  emergencyCallCompleted: boolean;
  selectedAnswers: number[];
}
