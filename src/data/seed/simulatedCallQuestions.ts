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

{
    id: 5,
    callId: 2,
    order: 1,
    prompt: '¿Qué está ocurriendo?',
    options: [
      {
        id: 13,
        text: 'Una persona presenta un posible atragantamiento.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El operador necesita conocer el tipo de emergencia.',
      },
      {
        id: 14,
        text: 'Una persona está descansando.',
        correct: false,
        points: 0,
        feedback:
          'Esta información no describe la emergencia.',
      },
      {
        id: 15,
        text: 'No ocurre nada importante.',
        correct: false,
        points: 0,
        feedback:
          'Los signos descritos corresponden a una posible emergencia.',
      },
    ],
  },
  {
    id: 6,
    callId: 2,
    order: 2,
    prompt: '¿Dónde ocurre la emergencia?',
    options: [
      {
        id: 16,
        text: 'En un lugar donde varias personas están comiendo.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La ubicación permite orientar la respuesta de emergencia.',
      },
      {
        id: 17,
        text: 'No sé dónde estamos.',
        correct: false,
        points: 0,
        feedback:
          'Debes proporcionar la ubicación cuando sea posible.',
      },
      {
        id: 18,
        text: 'En un lugar completamente diferente.',
        correct: false,
        points: 0,
        feedback:
          'La información no coincide con la situación presentada.',
      },
    ],
  },
  {
    id: 7,
    callId: 2,
    order: 3,
    prompt: '¿Cómo se encuentra la persona?',
    options: [
      {
        id: 19,
        text: 'Presenta dificultad para respirar y necesita asistencia.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El estado de la persona es información fundamental para el operador.',
      },
      {
        id: 20,
        text: 'Está completamente bien.',
        correct: false,
        points: 0,
        feedback:
          'La persona presenta signos de una emergencia.',
      },
      {
        id: 21,
        text: 'No hay ninguna persona afectada.',
        correct: false,
        points: 0,
        feedback:
          'La situación indica que sí existe una persona afectada.',
      },
    ],
  },
  {
    id: 8,
    callId: 2,
    order: 4,
    prompt: '¿Qué información adicional es importante comunicar?',
    options: [
      {
        id: 22,
        text: 'Que la persona presenta dificultad para respirar.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La dificultad respiratoria es un dato importante para valorar la gravedad.',
      },
      {
        id: 23,
        text: 'Que la comida estaba muy rica.',
        correct: false,
        points: 0,
        feedback:
          'Esa información no ayuda al operador a valorar la emergencia.',
      },
      {
        id: 24,
        text: 'Que no quieres proporcionar información.',
        correct: false,
        points: 0,
        feedback:
          'Debes comunicar la información relevante de la emergencia.',
      },
    ],
  },

{
    id: 9,
    callId: 3,
    order: 1,
    prompt: '¿Qué ocurrió?',
    options: [
      {
        id: 25,
        text: 'Una persona tiene una herida con sangrado abundante.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El operador necesita conocer el tipo de emergencia.',
      },
      {
        id: 26,
        text: 'Una persona está descansando.',
        correct: false,
        points: 0,
        feedback:
          'Esta información no describe la emergencia.',
      },
      {
        id: 27,
        text: 'No ocurrió nada importante.',
        correct: false,
        points: 0,
        feedback:
          'La situación presenta una emergencia que requiere atención.',
      },
    ],
  },
  {
    id: 10,
    callId: 3,
    order: 2,
    prompt: '¿Dónde ocurrió la emergencia?',
    options: [
      {
        id: 28,
        text: 'En un lugar público.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La ubicación es necesaria para coordinar la ayuda.',
      },
      {
        id: 29,
        text: 'No sé dónde estamos.',
        correct: false,
        points: 0,
        feedback:
          'Debes proporcionar la ubicación cuando sea posible.',
      },
      {
        id: 30,
        text: 'En una ubicación diferente a la del escenario.',
        correct: false,
        points: 0,
        feedback:
          'La información no coincide con la situación.',
      },
    ],
  },
  {
    id: 11,
    callId: 3,
    order: 3,
    prompt: '¿Cómo se encuentra la persona?',
    options: [
      {
        id: 31,
        text: 'Está consciente y presenta un sangrado abundante.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El estado de la persona es información importante.',
      },
      {
        id: 32,
        text: 'Está completamente bien.',
        correct: false,
        points: 0,
        feedback:
          'La persona presenta una lesión que requiere atención.',
      },
      {
        id: 33,
        text: 'No hay ninguna persona afectada.',
        correct: false,
        points: 0,
        feedback:
          'La situación indica que sí existe una persona afectada.',
      },
    ],
  },
  {
    id: 12,
    callId: 3,
    order: 4,
    prompt: '¿Qué información adicional debes comunicar?',
    options: [
      {
        id: 34,
        text: 'Que el sangrado continúa a pesar de la atención inicial.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El operador necesita conocer la evolución de la emergencia.',
      },
      {
        id: 35,
        text: 'Que no quieres proporcionar información.',
        correct: false,
        points: 0,
        feedback:
          'Debes comunicar la información relevante.',
      },
      {
        id: 36,
        text: 'Que la persona no necesita ayuda.',
        correct: false,
        points: 0,
        feedback:
          'La situación descrita requiere valoración profesional.',
      },
    ],
  },

{
    id: 13,
    callId: 4,
    order: 1,
    prompt: '¿Qué ocurrió?',
    options: [
      {
        id: 37,
        text: 'Una persona sufrió una descarga eléctrica.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El operador necesita conocer el tipo de emergencia.',
      },
      {
        id: 38,
        text: 'Una persona está descansando.',
        correct: false,
        points: 0,
        feedback:
          'Esta información no describe la emergencia.',
      },
      {
        id: 39,
        text: 'No ocurrió nada importante.',
        correct: false,
        points: 0,
        feedback:
          'Una descarga eléctrica puede representar una emergencia.',
      },
    ],
  },
  {
    id: 14,
    callId: 4,
    order: 2,
    prompt: '¿Dónde ocurrió la emergencia?',
    options: [
      {
        id: 40,
        text: 'En una vivienda.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La ubicación permite coordinar la asistencia.',
      },
      {
        id: 41,
        text: 'No sé dónde ocurrió.',
        correct: false,
        points: 0,
        feedback:
          'Debes proporcionar la ubicación cuando sea posible.',
      },
      {
        id: 42,
        text: 'En un lugar diferente al escenario.',
        correct: false,
        points: 0,
        feedback:
          'La información no coincide con la situación presentada.',
      },
    ],
  },
  {
    id: 15,
    callId: 4,
    order: 3,
    prompt: '¿Cómo se encuentra la persona?',
    options: [
      {
        id: 43,
        text: 'Está afectada después de recibir una descarga eléctrica.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. El estado de la persona es información fundamental.',
      },
      {
        id: 44,
        text: 'Está completamente bien y no necesita valoración.',
        correct: false,
        points: 0,
        feedback:
          'Una descarga eléctrica puede producir lesiones que no son evidentes.',
      },
      {
        id: 45,
        text: 'No hay ninguna persona afectada.',
        correct: false,
        points: 0,
        feedback:
          'La situación indica que sí existe una persona afectada.',
      },
    ],
  },
  {
    id: 16,
    callId: 4,
    order: 4,
    prompt: '¿Qué información sobre su estado es importante comunicar?',
    options: [
      {
        id: 46,
        text: 'Indicar si responde y respira.',
        correct: true,
        points: 5,
        feedback:
          'Correcto. La respuesta y la respiración son datos importantes para valorar la emergencia.',
      },
      {
        id: 47,
        text: 'Que no quieres revisar su estado.',
        correct: false,
        points: 0,
        feedback:
          'Debes comunicar información relevante sobre la persona.',
      },
      {
        id: 48,
        text: 'Que no importa cómo se encuentra.',
        correct: false,
        points: 0,
        feedback:
          'El estado de la persona es fundamental para la atención.',
      },
    ],
  },
];