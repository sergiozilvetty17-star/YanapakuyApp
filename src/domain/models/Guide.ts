export interface Guide {
  id: number;
  emergencyId: number;
  title: string;
  summary: string;
  warningSigns: string[];
  whatToDo: string[];
  whatNotToDo: string[];
  whenToCall: string;
}