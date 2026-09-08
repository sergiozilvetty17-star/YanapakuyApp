import type { Answer } from '@/domain/models';

export const answers: Answer[] = [
  {
    id: 1,
    questionId: 1,
    text: 'Verificar primero que el lugar sea seguro antes de acercarme.',
    correct: true,
    points: 20,
    feedback:
      'Correcto. La seguridad del lugar debe evaluarse antes de intentar ayudar.',
    criticalError: false,
  },
  {
    id: 2,
    questionId: 1,
    text: 'Correr inmediatamente hacia la persona.',
    correct: false,
    points: 0,
    consequence:
      'Podrías exponerte a vehículos en movimiento o a otros peligros.',
    feedback:
      'Primero debes evaluar los riesgos del entorno.',
    criticalError: true,
  },
  {
    id: 3,
    questionId: 1,
    text: 'Ignorar el accidente porque alguien más podría ayudar.',
    correct: false,
    points: 0,
    feedback:
      'No debes ignorar una emergencia. Evalúa la situación y solicita ayuda.',
    criticalError: false,
  },

  {
    id: 4,
    questionId: 2,
    text: 'Comprobar si responde y observar su estado general sin moverla innecesariamente.',
    correct: true,
    points: 20,
    feedback:
      'Correcto. Debes valorar el estado de la persona evitando movimientos innecesarios.',
    criticalError: false,
  },
  {
    id: 5,
    questionId: 2,
    text: 'Levantarla inmediatamente para sentarla.',
    correct: false,
    points: 5,
    consequence:
      'Podrías agravar una lesión existente.',
    feedback:
      'Una persona accidentada no debe moverse innecesariamente.',
    criticalError: false,
  },
  {
    id: 6,
    questionId: 2,
    text: 'Darle agua para que se recupere.',
    correct: false,
    points: 0,
    feedback:
      'No debes administrar alimentos o bebidas a una persona lesionada.',
    criticalError: false,
  },

  {
    id: 7,
    questionId: 3,
    text: 'Controlar el sangrado aplicando presión directa cuando sea apropiado y solicitar ayuda.',
    correct: true,
    points: 20,
    feedback:
      'Correcto. El control del sangrado y la solicitud de ayuda son prioridades.',
    criticalError: false,
  },
  {
    id: 8,
    questionId: 3,
    text: 'Buscar medicamentos para darle a la persona.',
    correct: false,
    points: 0,
    feedback:
      'No debes administrar medicamentos por tu cuenta.',
    criticalError: false,
  },
  {
    id: 9,
    questionId: 3,
    text: 'Dejar el sangrado sin atender mientras esperas.',
    correct: false,
    points: 5,
    feedback:
      'Un sangrado importante requiere atención inmediata y apropiada.',
    criticalError: false,
  },

  {
    id: 10,
    questionId: 4,
    text: 'Solicitar asistencia profesional y seguir las instrucciones del operador.',
    correct: true,
    points: 20,
    feedback:
      'Correcto. Una emergencia grave requiere asistencia profesional.',
    criticalError: false,
  },
  {
    id: 11,
    questionId: 4,
    text: 'Intentar transportar a la persona por cuenta propia inmediatamente.',
    correct: false,
    points: 0,
    consequence:
      'Mover incorrectamente a una persona lesionada puede empeorar sus lesiones.',
    feedback:
      'Es preferible solicitar asistencia profesional y seguir instrucciones.',
    criticalError: true,
  },

  {
    id: 12,
    questionId: 5,
    text: 'Indicar la ubicación, qué ocurrió, cuántas personas están afectadas y su estado aparente.',
    correct: true,
    points: 20,
    feedback:
      'Correcto. La información clara ayuda a los servicios de emergencia a responder.',
    criticalError: false,
  },
  {
    id: 13,
    questionId: 5,
    text: 'Decir únicamente que hubo un accidente.',
    correct: false,
    points: 5,
    feedback:
      'La información debe ser lo más clara y completa posible.',
    criticalError: false,
  },
  {
    id: 14,
    questionId: 5,
    text: 'Colgar inmediatamente después de decir la dirección.',
    correct: false,
    points: 0,
    feedback:
      'Es importante seguir las instrucciones del operador y proporcionar la información solicitada.',
    criticalError: false,
  },
];
