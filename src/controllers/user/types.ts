export interface FindUserRequest {
  id: string;
}

export interface CreateUserRequest {
  email?: string;
  name?: string;
}

export interface PatchUserRequest {
  email?: string;
  name?: string;
}
