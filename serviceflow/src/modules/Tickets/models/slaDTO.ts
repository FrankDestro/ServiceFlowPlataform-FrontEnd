export type SLADTO = {
  id: number;
  severity: string;
  responseTime: number;
  resolutionTime: number;
  businessHoursOnly: boolean;
  workStartTime: string;
  workEndTime: string;  
  workDays: string;     
  alertBeforeBreach: number;
  active: boolean;
  description: string;
};