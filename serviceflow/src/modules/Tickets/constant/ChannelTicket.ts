export const ChannelTicketDTO = {
  PORTAL: "PORTAL",
  EMAIL: "EMAIL",
  PHONE: "PHONE",
  CHAT: "CHAT",
  WHATSAPP: "WHATSAPP",
} as const;

export type ChannelTicketDTO =
  typeof ChannelTicketDTO[keyof typeof ChannelTicketDTO];