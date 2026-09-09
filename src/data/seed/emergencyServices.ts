import type { EmergencyService } from '@/domain/models';

export const emergencyServices: EmergencyService[] = [
  {
    id: 1,
    name: 'Ambulancia',
    description:
      'Servicio destinado a atender y trasladar personas que requieren asistencia médica de emergencia.',
    phoneNumber: '',
    type: 'ambulancia',
    active: true,
  },
  {
    id: 2,
    name: 'Policía',
    description:
      'Servicio de seguridad y atención de situaciones que requieren intervención policial.',
    phoneNumber: '',
    type: 'policia',
    active: true,
  },
  {
    id: 3,
    name: 'Bomberos',
    description:
      'Servicio especializado en incendios, rescates y otras situaciones de emergencia.',
    phoneNumber: '',
    type: 'bomberos',
    active: true,
  },
];
