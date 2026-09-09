import type { SimulatedCall } from '@/domain/models';

export const simulatedCalls: SimulatedCall[] = [
  {
    id: 1,
    scenarioId: 1,
    operatorName: 'Operador de emergencias',
    openingMessage:
      'Emergencias, ¿cuál es la situación?',
    requiredInformation: [
      'Indicar qué ocurrió.',
      'Indicar la ubicación del accidente.',
      'Indicar cuántas personas están afectadas.',
      'Indicar el estado aparente de las personas afectadas.',
    ],
    completed: false,
  },

{
    id: 2,
    scenarioId: 3,
    operatorName: 'Operador de emergencias',
    openingMessage:
      'Emergencias, ¿cuál es la situación?',
    requiredInformation: [
      'Indicar que se trata de un atragantamiento.',
      'Indicar la ubicación.',
      'Indicar el estado de la persona.',
      'Indicar si presenta dificultad para respirar.',
    ],
    completed: false,
  },

{
    id: 3,
    scenarioId: 5,
    operatorName: 'Operador de emergencias',
    openingMessage:
      'Emergencias, ¿cuál es la situación?',
    requiredInformation: [
      'Indicar que existe una herida con sangrado abundante.',
      'Indicar la ubicación.',
      'Indicar el estado de la persona.',
      'Indicar que el sangrado continúa.',
    ],
    completed: false,
  },
  {
    id: 4,
    scenarioId: 6,
    operatorName: 'Operador de emergencias',
    openingMessage:
      'Emergencias, ¿cuál es la situación?',
    requiredInformation: [
      'Indicar que ocurrió una descarga eléctrica.',
      'Indicar la ubicación.',
      'Indicar el estado de la persona.',
      'Indicar si la persona responde y respira.',
    ],
    completed: false,
  },
];