import type { Guide } from '@/domain/models';

export const guides: Guide[] = [
  {
    id: 1,
    emergencyId: 1,
    title: 'Accidente de tránsito',
    summary:
      'Antes de ayudar, verifica que el lugar sea seguro y evita exponerte a nuevos peligros.',
    whatToDo: [
      'Mantener la calma y evaluar la seguridad del lugar.',
      'Proteger la zona para evitar otro accidente.',
      'Verificar el estado de las personas involucradas.',
      'Solicitar ayuda profesional cuando sea necesario.',
      'Evitar mover a una persona lesionada salvo que exista un peligro inmediato.',
    ],
    whatNotToDo: [
      'No ingresar a una zona peligrosa sin evaluar los riesgos.',
      'No mover innecesariamente a una persona lesionada.',
      'No retirar un casco a una persona accidentada salvo que exista una razón de emergencia y se cuente con entrenamiento adecuado.',
      'No administrar medicamentos o alimentos.',
    ],
    whenToCall:
      'Solicita ayuda profesional ante lesiones graves, pérdida de conciencia, dificultad respiratoria, sangrado importante o cualquier situación que pueda poner en peligro la vida.',
  },
  {
    id: 2,
    emergencyId: 2,
    title: 'Quemaduras',
    summary:
      'Una quemadura debe evaluarse según su extensión, profundidad, ubicación y causa.',
    whatToDo: [
      'Alejar a la persona de la fuente de calor si es seguro hacerlo.',
      'Enfriar la zona afectada con agua corriente fresca.',
      'Retirar objetos que puedan comprimir la zona si no están adheridos.',
      'Buscar atención médica cuando la gravedad lo requiera.',
    ],
    whatNotToDo: [
      'No aplicar hielo directamente sobre la quemadura.',
      'No romper las ampollas.',
      'No aplicar sustancias caseras sobre la lesión.',
    ],
    whenToCall:
      'Busca ayuda profesional ante quemaduras extensas, profundas, eléctricas, quémicas o que afecten zonas especialmente delicadas.',
  },
];
