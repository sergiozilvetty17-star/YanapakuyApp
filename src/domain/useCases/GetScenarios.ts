import type { Scenario } from '@/domain/models';
import type { ScenarioRepository } from '@/domain/repositories';

export class GetScenarios {
  constructor(
    private readonly repository: ScenarioRepository
  ) {}

  async execute(): Promise<Scenario[]> {
    return this.repository.getAll();
  }
}
