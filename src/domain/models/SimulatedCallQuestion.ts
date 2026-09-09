export interface SimulatedCallOption {
  id: number;
  text: string;
  correct: boolean;
  points: number;
  feedback: string;
}

export interface SimulatedCallQuestion {
  id: number;
  callId: number;
  order: number;
  prompt: string;
  options: SimulatedCallOption[];
}