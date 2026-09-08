import type {
  Answer,
  Question,
  Scenario,
} from '@/domain/models';

import type { ScenarioRepository } from '@/domain/repositories';

import {
  answers,
  questions,
  scenarios,
} from '@/data/seed';

export class InMemoryScenarioRepository
  implements ScenarioRepository
{
  async getAll(): Promise<Scenario[]> {
    return scenarios;
  }

  async getById(id: number): Promise<Scenario | null> {
    return (
      scenarios.find(
        scenario => scenario.id === id
      ) ?? null
    );
  }

  async getQuestions(
    scenarioId: number
  ): Promise<Question[]> {
    return questions
      .filter(
        question =>
          question.scenarioId === scenarioId
      )
      .sort(
        (a, b) => a.order - b.order
      );
  }

  async getAnswers(
    questionId: number
  ): Promise<Answer[]> {
    return answers.filter(
      answer =>
        answer.questionId === questionId
    );
  }
}
