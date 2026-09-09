export interface SimulatedCall {
  id: number;
  scenarioId: number;
  operatorName: string;
  openingMessage: string;
  requiredInformation: string[];
  completed: boolean;
}