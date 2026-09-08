export interface Emergency {
  id: number;
  name: string;
  category: string;
  description: string;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'critico';
  active: boolean;
}
