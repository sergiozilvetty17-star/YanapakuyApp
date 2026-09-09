import type { Emergency } from '@/domain/models';

export const emergencies: Emergency[] = [
  {
    id: 1,
    name: 'Accidente de tránsito',
    category: 'Traumatismos',
    description:
      'Situación en la que una o más personas resultan afectadas por una colisión o accidente de tránsito.',
    riskLevel: 'critico',
    active: true,
  },

  {
    id: 2,
    name: 'Quemadura',
    category: 'Lesiones',
    description:
      'Lesión producida por calor, líquidos calientes, fuego u otras fuentes capaces de dañar los tejidos.',
    riskLevel: 'alto',
    active: true,
  },

  {
    id: 3,
    name: 'Atragantamiento',
    category: 'Emergencias respiratorias',
    description:
      'Situación en la que un objeto o alimento obstruye parcial o completamente la vía aérea.',
    riskLevel: 'critico',
    active: true,
  },

  {
    id: 4,
    name: 'Desmayo',
    category: 'Alteraciones de conciencia',
    description:
      'Pérdida temporal del conocimiento que puede provocar una caída y requerir evaluación según la situación.',
    riskLevel: 'medio',
    active: true,
  },

  {
    id: 5,
    name: 'Herida con sangrado abundante',
    category: 'Hemorragias',
    description:
      'Lesión que produce una pérdida importante de sangre y puede requerir atención profesional urgente.',
    riskLevel: 'alto',
    active: true,
  },

  {
    id: 6,
    name: 'Descarga eléctrica',
    category: 'Accidentes eléctricos',
    description:
      'Situación en la que una persona entra en contacto con una fuente eléctrica y puede sufrir lesiones internas o externas.',
    riskLevel: 'critico',
    active: true,
  },
];