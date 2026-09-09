import type { SimulatedCall } from '@/domain/models';

export interface SimulatedCallRepository {
  getByScenarioId(
    scenarioId: number
  ): Promise<SimulatedCall | null>;
}