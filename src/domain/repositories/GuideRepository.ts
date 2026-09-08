import type { Guide, GuideStep } from '@/domain/models';

export interface GuideRepository {
  getByEmergencyId(emergencyId: number): Promise<Guide | null>;
  getSteps(guideId: number): Promise<GuideStep[]>;
}
