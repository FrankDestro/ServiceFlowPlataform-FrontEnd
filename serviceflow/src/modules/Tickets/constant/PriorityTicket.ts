export const PriorityTicket = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  CRITICAL: 'CRITICAL'
} as const;

export type PriorityTicket =
  typeof PriorityTicket[keyof typeof PriorityTicket];