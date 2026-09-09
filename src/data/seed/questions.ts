import type { Question } from '@/domain/models';

export const questions: Question[] = [
  {
    id: 1,
    scenarioId: 1,
    order: 1,
    text: '¿Cuál debería ser tu primera acción al llegar al lugar del accidente?',
    timeLimit: 30,
    critical: true,
  },
  {
    id: 2,
    scenarioId: 1,
    order: 2,
    text: 'Observas a la persona en el suelo. ¿Qué haces a continuación?',
    timeLimit: 30,
    critical: false,
  },
  {
    id: 3,
    scenarioId: 1,
    order: 3,
    text: 'La persona está consciente pero presenta un sangrado importante. ¿Qué haces?',
    timeLimit: 30,
    critical: false,
  },
  {
    id: 4,
    scenarioId: 1,
    order: 4,
    text: 'La persona presenta signos que requieren asistencia profesional. ¿Qué decisión tomas?',
    timeLimit: 30,
    critical: true,
  },
];