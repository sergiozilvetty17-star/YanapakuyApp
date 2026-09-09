import type {
  Answer,
  Question,
  Scenario,
  SimulatedCall,
  SimulatedCallQuestion,
} from '@/domain/models';

import type {
  ScenarioRepository,
  SimulatedCallRepository,
  SimulatedCallQuestionRepository,
} from '@/domain/repositories';

import { SimulationEngine } from '@/features/simulador/engine';

export class StartSimulation {
  constructor(
    private readonly repository: ScenarioRepository,
    private readonly simulatedCallRepository: SimulatedCallRepository,
    private readonly simulatedCallQuestionRepository: SimulatedCallQuestionRepository
  ) {}

  async execute(
    scenarioId: number
  ): Promise<{
    engine: SimulationEngine;
    simulatedCall: SimulatedCall | null;
  }> {
    const scenario =
      await this.repository.getById(scenarioId);

    if (!scenario) {
      throw new Error(
        `No se encontró el escenario con ID ${scenarioId}.`
      );
    }

    const questions: Question[] =
      await this.repository.getQuestions(
        scenarioId
      );

    const answers: Answer[] = [];

    for (const question of questions) {
      const questionAnswers =
        await this.repository.getAnswers(
          question.id
        );

      answers.push(...questionAnswers);
    }

    const simulatedCall =
      scenario.requiresEmergencyCall
        ? await this.simulatedCallRepository.getByScenarioId(
            scenarioId
          )
        : null;

    let simulatedCallQuestions: SimulatedCallQuestion[] =
      [];

    if (simulatedCall) {
      simulatedCallQuestions =
        await this.simulatedCallQuestionRepository.getByCallId(
          simulatedCall.id
        );
    }

    const engine = new SimulationEngine();

    engine.start(
      scenario,
      questions,
      answers
    );

    if (simulatedCall) {
      engine.startSimulatedCall(
        simulatedCall,
        simulatedCallQuestions
      );
    }

    return {
      engine,
      simulatedCall,
    };
  }
}