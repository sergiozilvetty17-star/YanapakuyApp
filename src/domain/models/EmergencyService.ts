export interface EmergencyService {
  id: number;
  name: string;
  description: string;
  phoneNumber: string;
  type: 'ambulancia' | 'policia' | 'bomberos';
  active: boolean;
}
