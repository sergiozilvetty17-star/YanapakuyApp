import type { Guide, GuideStep } from '@/domain/models';
import type { GuideRepository } from '@/domain/repositories';

export interface EmergencyGuideResult {
  guide: Guide;
  steps: GuideStep[];
}

export class GetEmergencyGuide {
  constructor(
    private readonly repository: GuideRepository
  ) {}

  async execute(
    emergencyId: number
  ): Promise<EmergencyGuideResult | null> {
    const guide =
      await this.repository.getByEmergencyId(emergencyId);

    if (!guide) {
      return null;
    }

    const steps =
      await this.repository.getSteps(guide.id);

    return {
      guide,
      steps,
    };
  }
}
