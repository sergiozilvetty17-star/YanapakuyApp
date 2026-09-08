export interface Answer {
  id: number;
  questionId: number;
  text: string;
  correct: boolean;
  points: number;
  consequence?: string;
  feedback: string;
  criticalError: boolean;
}
