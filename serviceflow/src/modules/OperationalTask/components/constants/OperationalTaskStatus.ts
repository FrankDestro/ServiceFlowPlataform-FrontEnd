export const OperationalTaskStatus = {
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  ON_HOLD: 'ON_HOLD',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  OVERDUE: 'OVERDUE'
} as const;

export type OperationalTaskStatus =
  typeof OperationalTaskStatus[keyof typeof OperationalTaskStatus];

export const OperationalTaskStatusLabels: Record<OperationalTaskStatus, string> = {
  [OperationalTaskStatus.OPEN]: 'Aberta',
  [OperationalTaskStatus.IN_PROGRESS]: 'Em andamento',
  [OperationalTaskStatus.ON_HOLD]: 'Em espera',
  [OperationalTaskStatus.COMPLETED]: 'Concluída',
  [OperationalTaskStatus.CANCELLED]: 'Cancelada',
  [OperationalTaskStatus.OVERDUE]: 'Atrasada'
};