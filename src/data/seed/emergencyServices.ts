import type { EmergencyService } from '@/domain/models';

export const emergencyServices: EmergencyService[] = [
  {
    id: 1,
    name: 'Emergencias de salud',
    description:
      'Atención de emergencias y urgencias de salud. Utiliza este servicio cuando una persona necesite asistencia médica urgente.',
    phoneNumber: '168',
    type: 'ambulancia',
    active: true,
  },
  {
    id: 2,
    name: 'Policía',
    description:
      'Solicita asistencia policial ante situaciones que requieran intervención de la Policía Boliviana.',
    phoneNumber: '110',
    type: 'policia',
    active: true,
  },
  {
    id: 3,
    name: 'Bomberos',
    description:
      'Solicita asistencia ante incendios, rescates y otras situaciones que requieran intervención de bomberos.',
    phoneNumber: '119',
    type: 'bomberos',
    active: true,
  },
];