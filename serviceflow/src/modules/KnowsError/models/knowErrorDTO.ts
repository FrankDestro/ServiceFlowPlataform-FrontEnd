import type {AttachmentDTO} from "../../Attachment/models/AttachmentDTO.ts";

export type KnowErrorDTO = {
  id: number;
  title: string;
  description: string;
  rootCause: string;
  solution: string;
  workaround: string;
  affectedSystems: string;
  tags: string[];
  status: string;
  viewsCount: number;
  helpfulCount: number;
  createDate: string;
  updatedAt: string;
  resolutionDate: string | null;
  registratorUserId: number;
  registratorUserEmail: string;
  resolverUserId: number | null;
  resolverUserEmail: string | null;
  originTicketId: number | null;
  originTicketNumber: string | null;
  attachments: AttachmentDTO[];
};

export type KnowErrorSimpleDTO = Omit<KnowErrorDTO, "attachments">;


export type KnowErrorSearchParams = {
    title: string;
    status: string;
    affectedSystems: string;
    tags: string[];
    initialDate: string;
    finalDate: string;
    initialDateResolution: string;
    finalDateResolution: string;
};