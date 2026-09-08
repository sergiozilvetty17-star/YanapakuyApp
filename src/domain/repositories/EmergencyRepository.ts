import type { Emergency } from '@/domain/models';

export interface EmergencyRepository {
  getAll(): Promise<Emergency[]>;
  getById(id: number): Promise<Emergency | null>;
}
