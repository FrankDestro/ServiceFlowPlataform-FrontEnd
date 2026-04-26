import type {UserSimpleDTO} from "../../Usuarios/models/UserDTO.ts";

export type AttachmentDTO = {
    id: number;
    originalName: string;
    type: string;
    bucket: string;
    objectName: string;
    sizeInMb: number;
    registrationDate: string;
    user: UserSimpleDTO;
};

export type AttachmentFormDTO = {
    file: File;
    id : string;
    originalName : string;
};


