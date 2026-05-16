export const ProblemStatus = {
  OPEN: 'OPEN',
  IN_INVESTIGATION: 'IN_INVESTIGATION',
  KNOWN_ERROR: 'KNOWN_ERROR',
  RESOLVED: 'RESOLVED',
  CLOSED: 'CLOSED',
  OVERDUE: 'OVERDUE'
} as const;

export type ProblemStatus =
  typeof ProblemStatus[keyof typeof ProblemStatus];

export const ProblemStatusLabels: Record<ProblemStatus, string> = {
  [ProblemStatus.OPEN]: 'Aberto',
  [ProblemStatus.IN_INVESTIGATION]: 'Em investigação',
  [ProblemStatus.KNOWN_ERROR]: 'Erro conhecido',
  [ProblemStatus.RESOLVED]: 'Resolvido',
  [ProblemStatus.CLOSED]: 'Encerrado',
  [ProblemStatus.OVERDUE]: 'Atrasado'
};