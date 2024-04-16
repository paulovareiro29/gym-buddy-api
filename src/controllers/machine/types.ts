export interface FindMachineRequest {
  id: string;
}

export interface CreateMachineRequest {
  name?: string;
  photo: string;
}

export interface PatchMachineRequest {
  name?: string;
  photo: string;
}
