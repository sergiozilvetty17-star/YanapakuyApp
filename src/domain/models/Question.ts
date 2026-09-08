export interface Question {
  id: number;
  scenarioId: number;
  order: number;
  text: string;
  timeLimit?: number;
  critical: boolean;
}
