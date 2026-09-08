import type { Guide, GuideStep } from '@/domain/models';
import { guides } from '@/data/seed/guides';
import { guideSteps } from '@/data/seed/guideSteps';
import type { GuideRepository } from '@/domain/repositories';

export class InMemoryGuideRepository implements GuideRepository {
  async getByEmergencyId(emergencyId: number): Promise<Guide | null> {
    return guides.find(
      (guide) => guide.emergencyId === emergencyId
    ) ?? null;
  }

  async getSteps(guideId: number): Promise<GuideStep[]> {
    return guideSteps
      .filter((step) => step.guideId === guideId)
      .sort((a, b) => a.order - b.order);
  }
}