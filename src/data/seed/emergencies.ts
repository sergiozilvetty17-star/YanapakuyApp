import type { Emergency } from '@/domain/models';

export const emergencies: Emergency[] = [
  {
    id: 1,
    name: 'Accidente de tránsito',
    category: 'Traumatismos',
    description:
      'Situación en la que una o más personas pueden presentar lesiones como consecuencia de un accidente vehicular.',
    riskLevel: 'critico',
    active: true,
  },
  {
    id: 2,
    name: 'Quemadura',
    category: 'Lesiones',
    description:
      'Lesión producida por contacto con calor, sustancias quémicas, electricidad u otras fuentes.',
    riskLevel: 'alto',
    active: true,
  },
  {
    id: 3,
    name: 'Atragantamiento',
    category: 'Emergencias respiratorias',
    description:
      'Obstrucción parcial o completa de las vías respiratorias por un objeto o alimento.',
    riskLevel: 'critico',
    active: true,
  },
  {
    id: 4,
    name: 'Desmayo',
    category: 'Alteraciones de conciencia',
    description:
      'Pérdida temporal de la conciencia que puede tener diferentes causas.',
    riskLevel: 'medio',
    active: true,
  },
];
