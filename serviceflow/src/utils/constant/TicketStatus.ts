export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  FROZEN = 'FROZEN',
  CANCELED = 'CANCELED',
  FINISHED = 'FINISHED'
}

export const TicketStatusLabels: Record<TicketStatus, string> = {
  [TicketStatus.OPEN]: 'Aberto',
  [TicketStatus.IN_PROGRESS]: 'Em andamento',
  [TicketStatus.FROZEN]: 'Congelado',
  [TicketStatus.CANCELED]: 'Cancelado',
  [TicketStatus.FINISHED]: 'Finalizado'
};