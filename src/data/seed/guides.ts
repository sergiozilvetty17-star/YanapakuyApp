import type { Guide } from '@/domain/models';

export const guides: Guide[] = [
  {
    id: 1,
    emergencyId: 1,
    title: 'Accidente de tránsito',
    summary:
      'Orientación básica para actuar de forma segura ante un accidente de tránsito y ayudar a una persona afectada mientras llega asistencia profesional.',
    warningSigns: [
      'Pérdida de conciencia.',
      'Dificultad para respirar.',
      'Sangrado abundante.',
      'Dolor intenso o lesiones graves.',
      'Deformidad evidente en alguna extremidad.',
      'Confusión o alteración importante del estado de conciencia.',
    ],
    whatToDo: [
      'Verifica que la escena sea segura antes de acercarte.',
      'Protege el lugar para evitar nuevos accidentes.',
      'Evalúa el estado general de la persona sin moverla innecesariamente.',
      'Solicita ayuda profesional cuando la situación lo requiera.',
      'Mantén la calma y observa cualquier cambio en el estado de la persona.',
    ],
    whatNotToDo: [
      'No ingreses a una zona que todavía represente peligro.',
      'No muevas a la persona innecesariamente.',
      'No retires el casco de un motociclista salvo que exista una situación de emergencia que lo haga necesario y cuentes con la preparación adecuada.',
      'No administres medicamentos, alimentos ni bebidas.',
      'No abandones a la persona si puedes permanecer en un lugar seguro hasta que llegue ayuda.',
    ],
    whenToCall:
      'Solicita ayuda profesional ante lesiones graves, pérdida de conciencia, dificultad respiratoria, sangrado importante o cualquier situación que pueda poner en peligro la vida.',
  },

  {
    id: 2,
    emergencyId: 2,
    title: 'Quemadura',
    summary:
      'Orientación básica para actuar ante una quemadura y reducir el riesgo de que la lesión empeore mientras se determina si requiere atención profesional.',
    warningSigns: [
      'Quemadura extensa.',
      'Quemadura profunda o con aspecto grave.',
      'Lesión producida por electricidad.',
      'Lesión producida por sustancias químicas.',
      'Quemadura en cara, manos, pies, articulaciones o zonas genitales.',
      'Dificultad para respirar o alteración del estado de conciencia.',
    ],
    whatToDo: [
      'Aleja a la persona de la fuente que está provocando la quemadura si hacerlo es seguro.',
      'Enfría la zona afectada con agua corriente fresca durante varios minutos.',
      'Protege la lesión de forma adecuada.',
      'Observa la evolución de la persona.',
      'Busca atención profesional cuando la gravedad o extensión de la lesión lo requiera.',
    ],
    whatNotToDo: [
      'No coloques hielo directamente sobre la quemadura.',
      'No revientes las ampollas.',
      'No retires ropa que esté adherida a la piel.',
      'No apliques sustancias caseras sobre la lesión.',
      'No ignores una quemadura extensa, profunda, eléctrica o química.',
    ],
    whenToCall:
      'Busca ayuda profesional ante quemaduras extensas, profundas, eléctricas, químicas o que afecten zonas especialmente delicadas.',
  },

  {
    id: 3,
    emergencyId: 3,
    title: 'Atragantamiento',
    summary:
      'Orientación básica para reconocer una obstrucción de la vía aérea y actuar de acuerdo con el estado de la persona.',
    warningSigns: [
      'La persona no puede hablar normalmente.',
      'La persona presenta dificultad importante para respirar.',
      'La persona no puede toser eficazmente.',
      'La persona lleva las manos al cuello o muestra signos de asfixia.',
      'La persona pierde el conocimiento.',
      'La coloración de labios o piel comienza a cambiar.',
    ],
    whatToDo: [
      'Evalúa rápidamente la situación y determina si existe una obstrucción de la vía aérea.',
      'Solicita ayuda y pide a otra persona que contacte con los servicios de emergencia cuando corresponda.',
      'Actúa de acuerdo con el estado de la persona y los conocimientos de primeros auxilios que tengas.',
      'Continúa observando la respuesta de la persona.',
      'Si la persona pierde el conocimiento, activa inmediatamente el protocolo de emergencia correspondiente.',
    ],
    whatNotToDo: [
      'No introduzcas los dedos en la boca a ciegas para intentar retirar el objeto.',
      'No golpees a la persona de manera indiscriminada.',
      'No le des alimentos ni bebidas.',
      'No abandones la situación si la persona continúa presentando dificultad respiratoria.',
      'No retrases la solicitud de ayuda profesional ante una obstrucción grave.',
    ],
    whenToCall:
      'Solicita ayuda profesional ante una obstrucción grave, dificultad respiratoria importante, pérdida de conciencia o cuando las medidas iniciales no resuelvan la situación.',
  },

  {
    id: 4,
    emergencyId: 4,
    title: 'Desmayo',
    summary:
      'Orientación básica para proteger a una persona que ha perdido temporalmente el conocimiento y observar su recuperación.',
    warningSigns: [
      'La persona no recupera rápidamente el conocimiento.',
      'La persona presenta dificultad para respirar.',
      'La persona sufre una lesión durante la caída.',
      'La persona presenta convulsiones.',
      'Existe confusión prolongada después de recuperar el conocimiento.',
      'El desmayo ocurre repetidamente o sin una causa evidente.',
    ],
    whatToDo: [
      'Comprueba si la persona responde.',
      'Protege a la persona de nuevos golpes o peligros.',
      'Observa su respiración y estado general.',
      'Permanece atento mientras se recupera.',
      'Solicita ayuda profesional si presenta signos de alarma o no se recupera adecuadamente.',
    ],
    whatNotToDo: [
      'No abandones a la persona inmediatamente después del desmayo.',
      'No la obligues a levantarse rápidamente.',
      'No le des alimentos ni bebidas mientras esté inconsciente.',
      'No administres medicamentos.',
      'No ignores signos de alarma después de recuperar el conocimiento.',
    ],
    whenToCall:
      'Solicita ayuda profesional si la persona no recupera adecuadamente el conocimiento, presenta dificultad respiratoria, convulsiones, lesiones importantes, confusión prolongada o episodios repetidos.',
  },
];