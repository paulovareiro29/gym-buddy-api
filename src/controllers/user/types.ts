export interface FindUserRequest {
  id: string;
}

export interface PatchUserRequest {
  email?: string;
  name?: string;
}
