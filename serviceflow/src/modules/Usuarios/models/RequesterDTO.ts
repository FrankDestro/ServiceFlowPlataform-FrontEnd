import type { DepartmentDTO } from "./DepartmentDTO";
import type { RoleDTO } from "./RoleDTO";
import type { SolvingAreaDTO } from "./solvingAreaDTO";

export type UserDTO = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imgProfile: string;
  contactNumber: string;
  blocked: boolean;
  statusUser : string;
  department: DepartmentDTO;
  solvingArea: SolvingAreaDTO;
  roles: RoleDTO[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
};


export type UserDTOUpdate = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  imgProfile: string;
  contactNumber: string;
};



