import type {
  Answer,
  Question,
  Scenario,
} from '@/domain/models';

import type { ScenarioRepository } from '@/domain/repositories';
import { SimulationEngine } from '@/features/simulador/engine';

export class StartSimulation {
  constructor(
    private readonly repository: ScenarioRepository
  ) {}

  async execute(
    scenarioId: number
  ): Promise<SimulationEngine> {
    const scenario =
      await this.repository.getById(scenarioId);

    if (!scenario) {
      throw new Error(
        `No se encontró el escenario con ID ${scenarioId}.`
      );
    }

    const questions: Question[] =
      await this.repository.getQuestions(scenarioId);

    const answers: Answer[] = [];

    for (const question of questions) {
      const questionAnswers =
        await this.repository.getAnswers(question.id);

      answers.push(...questionAnswers);
    }

    const engine = new SimulationEngine();

    engine.start(
      scenario,
      questions,
      answers
    );

    return engine;
  }
}
