import type { GuideStep } from '@/domain/models';

export const guideSteps: GuideStep[] = [
  // ============================================================
  // ACCIDENTE DE TRÁNSITO
  // ============================================================

  {
    id: 1,
    guideId: 1,
    order: 1,
    title: 'Verificar la escena',
    description:
      'Antes de acercarte, comprueba que el lugar sea seguro para ti y para las personas afectadas. Identifica riesgos como vehículos en movimiento, fuego, humo, cables eléctricos u otros peligros.',
    important: true,
    mediaKey: 'accidente.verificar-escena',
  },

  {
    id: 2,
    guideId: 1,
    order: 2,
    title: 'Proteger el lugar',
    description:
      'Si es posible hacerlo sin exponerte al peligro, ayuda a evitar nuevos accidentes y mantén a las personas alejadas de la zona de riesgo.',
    important: true,
    mediaKey: 'accidente.proteger-lugar',
  },

  {
    id: 3,
    guideId: 1,
    order: 3,
    title: 'Evaluar a la persona',
    description:
      'Observa el estado de la persona afectada. Comprueba si responde y presta atención a su respiración, sangrado visible y otras señales importantes. Evita moverla innecesariamente.',
    important: true,
    mediaKey: 'accidente.evaluar-persona',
  },

  {
    id: 4,
    guideId: 1,
    order: 4,
    title: 'Llamar a profesionales',
    description:
      'Solicita asistencia profesional cuando existan lesiones graves, pérdida de conciencia, dificultad respiratoria, sangrado importante u otras señales de peligro.',
    important: true,
    mediaKey: 'accidente.llamar-profesionales',
  },

  // ============================================================
  // QUEMADURA
  // ============================================================

  {
    id: 5,
    guideId: 2,
    order: 1,
    title: 'Alejar de la fuente',
    description:
      'Si es seguro hacerlo, aleja a la persona de la fuente que está provocando la quemadura.',
    important: true,
  },

  {
    id: 6,
    guideId: 2,
    order: 2,
    title: 'Enfriar la zona',
    description:
      'Enfría la zona afectada con agua corriente fresca durante varios minutos.',
    important: true,
  },

  {
    id: 7,
    guideId: 2,
    order: 3,
    title: 'Proteger la lesión',
    description:
      'Protege la zona afectada y evita manipular innecesariamente la lesión.',
    important: false,
  },

  {
    id: 8,
    guideId: 2,
    order: 4,
    title: 'Buscar atención profesional',
    description:
      'Determina si la extensión, profundidad, ubicación o causa de la quemadura requiere atención profesional.',
    important: true,
  },

  // ============================================================
  // ATRAGANTAMIENTO
  // ============================================================

  {
    id: 9,
    guideId: 3,
    order: 1,
    title: 'Evaluar la situación',
    description:
      'Determina si la persona puede hablar, toser o respirar y observa si presenta signos de una obstrucción grave de la vía aérea.',
    important: true,
  },

  {
    id: 10,
    guideId: 3,
    order: 2,
    title: 'Solicitar ayuda',
    description:
      'Pide ayuda y solicita asistencia profesional cuando la situación sea grave o la persona presente dificultad importante para respirar.',
    important: true,
  },

  {
    id: 11,
    guideId: 3,
    order: 3,
    title: 'Actuar según el estado',
    description:
      'Aplica las medidas de primeros auxilios apropiadas según el estado de la persona y tus conocimientos.',
    important: true,
  },

  {
    id: 12,
    guideId: 3,
    order: 4,
    title: 'Continuar evaluando',
    description:
      'Observa continuamente a la persona y actúa ante cualquier cambio en su estado.',
    important: true,
  },

  // ============================================================
  // DESMAYO
  // ============================================================

  {
    id: 13,
    guideId: 4,
    order: 1,
    title: 'Comprobar la respuesta',
    description:
      'Comprueba si la persona responde y observa su estado general.',
    important: true,
  },

  {
    id: 14,
    guideId: 4,
    order: 2,
    title: 'Proteger a la persona',
    description:
      'Evita que la persona sufra nuevos golpes o quede expuesta a otros peligros.',
    important: true,
  },

  {
    id: 15,
    guideId: 4,
    order: 3,
    title: 'Observar la recuperación',
    description:
      'Permanece atento a la respiración, respuesta y evolución de la persona mientras se recupera.',
    important: true,
  },

  {
    id: 16,
    guideId: 4,
    order: 4,
    title: 'Buscar ayuda si es necesario',
    description:
      'Solicita ayuda profesional si la persona no se recupera adecuadamente o presenta señales de alarma.',
    important: true,
  },
];