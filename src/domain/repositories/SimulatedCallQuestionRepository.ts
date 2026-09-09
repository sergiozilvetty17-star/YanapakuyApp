import type { SimulatedCallQuestion } from '@/domain/models';

export interface SimulatedCallQuestionRepository {
  getByCallId(
    callId: number
  ): Promise<SimulatedCallQuestion[]>;
}