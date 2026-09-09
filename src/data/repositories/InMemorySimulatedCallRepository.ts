import type { SimulatedCall } from '@/domain/models';
import type { SimulatedCallRepository } from '@/domain/repositories';
import { simulatedCalls } from '@/data/seed/simulatedCalls';

export class InMemorySimulatedCallRepository
  implements SimulatedCallRepository
{
  async getByScenarioId(
    scenarioId: number
  ): Promise<SimulatedCall | null> {
    return (
      simulatedCalls.find(
        (call) => call.scenarioId === scenarioId
      ) ?? null
    );
  }
}