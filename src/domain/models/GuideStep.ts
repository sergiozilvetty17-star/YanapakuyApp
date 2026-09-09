export interface GuideStep {
  id: number;
  guideId: number;
  order: number;
  title: string;
  description: string;
  important: boolean;
  mediaKey?: string;
}