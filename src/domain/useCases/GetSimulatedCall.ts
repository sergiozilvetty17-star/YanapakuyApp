import type { SimulatedCall } from '@/domain/models';
import type { SimulatedCallRepository } from '@/domain/repositories';

export class GetSimulatedCall {
  constructor(
    private readonly repository: SimulatedCallRepository
  ) {}

  async execute(
    scenarioId: number
  ): Promise<SimulatedCall | null> {
    return this.repository.getByScenarioId(scenarioId);
  }
}