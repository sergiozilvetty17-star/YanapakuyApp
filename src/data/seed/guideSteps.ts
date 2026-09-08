import type { GuideStep } from '@/domain/models';

export const guideSteps: GuideStep[] = [
  // ==============================
  // ACCIDENTE DE TRÁNSITO
  // ==============================
  {
    id: 1,
    guideId: 1,
    order: 1,
    title: 'Verifica la seguridad de la escena',
    description:
      'Antes de acercarte, observa si existen vehículos en movimiento, fuego, humo, cables u otros peligros que puedan ponerte en riesgo.',
    important: true,
  },
  {
    id: 2,
    guideId: 1,
    order: 2,
    title: 'Protege el lugar',
    description:
      'Si es posible hacerlo sin exponerte al peligro, señaliza o solicita ayuda para mantener segura la zona.',
    important: true,
  },
  {
    id: 3,
    guideId: 1,
    order: 3,
    title: 'Evalúa a la persona',
    description:
      'Comprueba si responde y observa su estado general sin realizar movimientos innecesarios.',
    important: true,
  },
  {
    id: 4,
    guideId: 1,
    order: 4,
    title: 'Solicita ayuda profesional',
    description:
      'Cuando la situación lo requiera, solicita asistencia profesional y proporciona información clara sobre lo ocurrido.',
    important: true,
  },

  // ==============================
  // QUEMADURA
  // ==============================
  {
    id: 5,
    guideId: 2,
    order: 1,
    title: 'Aleja a la persona de la fuente',
    description:
      'Elimina la exposición a la fuente de calor únicamente si puedes hacerlo de manera segura.',
    important: true,
  },
  {
    id: 6,
    guideId: 2,
    order: 2,
    title: 'Enfría la zona afectada',
    description:
      'En una quemadura térmica, utiliza agua corriente fresca para ayudar a enfriar la zona afectada.',
    important: true,
  },
  {
    id: 7,
    guideId: 2,
    order: 3,
    title: 'Protege la lesión',
    description:
      'Mantén la zona protegida y evita manipular innecesariamente la piel lesionada.',
    important: false,
  },
  {
    id: 8,
    guideId: 2,
    order: 4,
    title: 'Busca atención profesional cuando corresponda',
    description:
      'Las quemaduras extensas, profundas o ubicadas en zonas delicadas requieren valoración profesional.',
    important: true,
  },

  // ==============================
  // ATRAGANTAMIENTO
  // ==============================
  {
    id: 9,
    guideId: 3,
    order: 1,
    title: 'Evalúa la situación',
    description:
      'Determina si la persona puede hablar, respirar o toser y observa si presenta signos de obstrucción grave.',
    important: true,
  },
  {
    id: 10,
    guideId: 3,
    order: 2,
    title: 'Solicita ayuda',
    description:
      'Ante una obstrucción grave, solicita asistencia profesional y sigue las indicaciones correspondientes.',
    important: true,
  },
  {
    id: 11,
    guideId: 3,
    order: 3,
    title: 'Actúa según el estado de la persona',
    description:
      'Las acciones de primeros auxilios dependen de si la persona puede toser, respirar o responder.',
    important: true,
  },
  {
    id: 12,
    guideId: 3,
    order: 4,
    title: 'Continúa evaluando',
    description:
      'Observa continuamente el estado de la persona y solicita asistencia profesional si la situación empeora.',
    important: true,
  },

  // ==============================
  // DESMAYO
  // ==============================
  {
    id: 13,
    guideId: 4,
    order: 1,
    title: 'Comprueba si responde',
    description:
      'Observa si la persona responde a estímulos y comprueba su estado general.',
    important: true,
  },
  {
    id: 14,
    guideId: 4,
    order: 2,
    title: 'Protege a la persona',
    description:
      'Evita que se golpee y mantén despejada el área alrededor.',
    important: true,
  },
  {
    id: 15,
    guideId: 4,
    order: 3,
    title: 'Observa su recuperación',
    description:
      'Supervisa su estado y comprueba si recupera la respuesta normalmente.',
    important: false,
  },
  {
    id: 16,
    guideId: 4,
    order: 4,
    title: 'Solicita ayuda si es necesario',
    description:
      'Si no recupera la respuesta, presenta lesiones o aparecen otros signos preocupantes, solicita asistencia profesional.',
    important: true,
  },
];