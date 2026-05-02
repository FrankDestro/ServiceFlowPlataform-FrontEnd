export const TicketStatus = {
  AWAITING_APPROVAL: 'AWAITING_APPROVAL',
  OPEN: 'OPEN',
  IN_PROGRESS: 'IN_PROGRESS',
  FROZEN: 'FROZEN',
  REOPENED: 'REOPENED',
  CANCELED: 'CANCELED',
  FINISHED: 'FINISHED'
} as const;

export type TicketStatus =
  typeof TicketStatus[keyof typeof TicketStatus];

export const TicketStatusLabels: Record<TicketStatus, string> = {
  [TicketStatus.AWAITING_APPROVAL]: 'Aguardando aprovação',
  [TicketStatus.OPEN]: 'Aberto',
  [TicketStatus.IN_PROGRESS]: 'Em andamento',
  [TicketStatus.FROZEN]: 'Congelado',
  [TicketStatus.REOPENED]: 'Reaberto',
  [TicketStatus.CANCELED]: 'Cancelado',
  [TicketStatus.FINISHED]: 'Finalizado'
};