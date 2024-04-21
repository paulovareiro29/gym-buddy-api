export interface FindMachineRequest {
  id: string;
}

export interface CreateMachineRequest {
  name?: string;
  photo: string;
  categories: string[];
}

export interface PatchMachineRequest {
  name?: string;
  categories?: string[];
  photo: string;
}
