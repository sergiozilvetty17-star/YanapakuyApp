import type { SimulatedCallQuestion } from '@/domain/models';

export const simulatedCallQuestions: SimulatedCallQuestion[] = [
  {
    id: 1,
    callId: 1,
    order: 1,
    prompt: '¿Qué ocurrió?',
    options: [
      {
        id: 1,
        text: 'Hubo un accidente de tránsito.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El operador necesita saber qué tipo de emergencia está ocurriendo.',
      },
      {
        id: 2,
        text: 'Una persona está descansando.',
        correct: false,
        points: 0,
        feedback:
          'Esta información no describe la emergencia que está ocurriendo.',
      },
      {
        id: 3,
        text: 'Estoy realizando una práctica.',
        correct: false,
        points: 0,
        feedback:
          'Aunque la actividad sea una simulación, debes comunicar al operador qué ocurrió dentro del escenario.',
      },
    ],
  },

  {
    id: 2,
    callId: 1,
    order: 2,
    prompt: '¿Dónde ocurrió el accidente?',
    options: [
      {
        id: 4,
        text: 'En una avenida, cerca de una intersección.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La ubicación permite que los servicios de emergencia puedan llegar al lugar.',
      },
      {
        id: 5,
        text: 'No sé dónde ocurrió.',
        correct: false,
        points: 0,
        feedback:
          'La ubicación es un dato fundamental para solicitar ayuda.',
      },
      {
        id: 6,
        text: 'En una vivienda.',
        correct: false,
        points: 0,
        feedback:
          'La información no coincide con la ubicación del escenario.',
      },
    ],
  },

  {
    id: 3,
    callId: 1,
    order: 3,
    prompt: '¿Cuántas personas están afectadas?',
    options: [
      {
        id: 7,
        text: 'Una persona.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La cantidad de personas afectadas ayuda a dimensionar la emergencia.',
      },
      {
        id: 8,
        text: 'No sé cuántas personas hay.',
        correct: false,
        points: 0,
        feedback:
          'Debes observar la situación y comunicar la cantidad de personas afectadas cuando sea posible.',
      },
      {
        id: 9,
        text: 'No hay personas afectadas.',
        correct: false,
        points: 0,
        feedback:
          'La situación descrita en el escenario indica que hay una persona afectada.',
      },
    ],
  },

  {
    id: 4,
    callId: 1,
    order: 4,
    prompt: '¿Cuál es el estado aparente de la persona?',
    options: [
      {
        id: 10,
        text: 'Está consciente y presenta sangrado.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. Comunicar el estado aparente permite al operador valorar mejor la situación.',
      },
      {
        id: 11,
        text: 'Está completamente bien.',
        correct: false,
        points: 0,
        feedback:
          'La persona presenta una situación que requiere atención.',
      },
      {
        id: 12,
        text: 'No hay ninguna persona afectada.',
        correct: false,
        points: 0,
        feedback:
          'Esta información contradice la situación presentada en el escenario.',
      },
    ],
  },
];