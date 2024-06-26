export interface FindUserRequest {
  id: string;
}

export interface PatchUserRequest {
  email?: string;
  name?: string;
  address?: string;
  avatar?: string;
}
