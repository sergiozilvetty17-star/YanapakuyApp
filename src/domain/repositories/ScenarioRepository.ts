import type {
  Answer,
  Question,
  Scenario,
} from '@/domain/models';

export interface ScenarioRepository {
  getAll(): Promise<Scenario[]>;
  getById(id: number): Promise<Scenario | null>;
  getQuestions(scenarioId: number): Promise<Question[]>;
  getAnswers(questionId: number): Promise<Answer[]>;
}
