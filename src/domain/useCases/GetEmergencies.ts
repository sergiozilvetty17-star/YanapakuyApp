import type { Emergency } from '@/domain/models';
import type { EmergencyRepository } from '@/domain/repositories';

export class GetEmergencies {
  constructor(
    private readonly repository: EmergencyRepository
  ) {}

  async execute(): Promise<Emergency[]> {
    return this.repository.getAll();
  }
}
