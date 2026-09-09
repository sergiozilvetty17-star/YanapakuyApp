import type { Scenario } from '@/domain/models';

export const scenarios: Scenario[] = [
  {
    id: 1,
    emergencyId: 1,
    title: 'Accidente en una avenida',
    description:
      'Vas caminando por una avenida cuando observas una motocicleta que acaba de sufrir un accidente. Hay una persona en el suelo y el tráfico continúa circulando.',
    difficulty: 'medio',
    estimatedTime: 180,
    requiresEmergencyCall: true,
    active: true,
  },
  {
    id: 2,
    emergencyId: 2,
    title: 'Quemadura doméstica',
    description:
      'Una persona acaba de sufrir una quemadura mientras cocinaba. La lesión se encuentra en uno de sus brazos.',
    difficulty: 'facil',
    estimatedTime: 120,
    requiresEmergencyCall: false,
    active: true,
  },
  {
    id: 3,
    emergencyId: 3,
    title: 'Atragantamiento durante una comida',
    description:
      'Durante una comida observas que una persona comienza a presentar signos de atragantamiento.',
    difficulty: 'dificil',
    estimatedTime: 150,
    requiresEmergencyCall: true,
    active: true,
  },

{
    id: 4,
    emergencyId: 4,
    title: 'Desmayo en un espacio público',
    description:
      'Mientras estás en un espacio público, observas que una persona pierde el conocimiento y cae al suelo.',
    difficulty: 'facil',
    estimatedTime: 120,
    requiresEmergencyCall: false,
    active: true,
  },
  {
    id: 5,
    emergencyId: 1,
    title: 'Herida con sangrado abundante',
    description:
      'Una persona sufre una herida que provoca un sangrado abundante mientras se encuentra en un lugar público.',
    difficulty: 'medio',
    estimatedTime: 180,
    requiresEmergencyCall: true,
    active: true,
  },
  {
    id: 6,
    emergencyId: 1,
    title: 'Descarga eléctrica doméstica',
    description:
      'En una vivienda, una persona entra en contacto con una fuente eléctrica y queda afectada por una descarga.',
    difficulty: 'dificil',
    estimatedTime: 180,
    requiresEmergencyCall: true,
    active: true,
  },
];
