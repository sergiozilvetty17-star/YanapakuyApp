import type {
  Answer,
  Question,
  Scenario,
} from '@/domain/models';

import type { ScenarioRepository } from '@/domain/repositories';

export interface ScenarioData {
  scenario: Scenario;
  questions: Question[];
  answers: Answer[];
}

export class GetScenario {
  constructor(
    private readonly repository: ScenarioRepository
  ) {}

  async execute(
    scenarioId: number
  ): Promise<ScenarioData | null> {
    const scenario =
      await this.repository.getById(scenarioId);

    if (!scenario) {
      return null;
    }

    const questions =
      await this.repository.getQuestions(scenarioId);

    const answers: Answer[] = [];

    for (const question of questions) {
      const questionAnswers =
        await this.repository.getAnswers(question.id);

      answers.push(...questionAnswers);
    }

    return {
      scenario,
      questions,
      answers,
    };
  }
}
