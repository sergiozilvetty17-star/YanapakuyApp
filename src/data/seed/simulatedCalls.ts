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
];