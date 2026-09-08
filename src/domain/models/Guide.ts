export interface Guide {
  id: number;
  emergencyId: number;
  title: string;
  summary: string;
  whatToDo: string[];
  whatNotToDo: string[];
  whenToCall: string;
}
