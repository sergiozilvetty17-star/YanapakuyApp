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
    title: 'Quemadura domástica',
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
];
