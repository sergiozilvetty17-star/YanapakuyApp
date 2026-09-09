import type { SimulatedCallQuestion } from '@/domain/models';
import type { SimulatedCallQuestionRepository } from '@/domain/repositories';
import { simulatedCallQuestions } from '@/data/seed/simulatedCallQuestions';

export class InMemorySimulatedCallQuestionRepository
  implements SimulatedCallQuestionRepository
{
  async getByCallId(
    callId: number
  ): Promise<SimulatedCallQuestion[]> {
    return simulatedCallQuestions
      .filter((question) => question.callId === callId)
      .sort((a, b) => a.order - b.order);
  }
}