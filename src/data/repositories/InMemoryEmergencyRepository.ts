import type { Emergency } from '@/domain/models';
import type { EmergencyRepository } from '@/domain/repositories';
import { emergencies } from '@/data/seed';

export class InMemoryEmergencyRepository
  implements EmergencyRepository
{
  async getAll(): Promise<Emergency[]> {
    return emergencies;
  }

  async getById(id: number): Promise<Emergency | null> {
    return (
      emergencies.find(
        emergency => emergency.id === id
      ) ?? null
    );
  }
}
