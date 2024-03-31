export interface CreateUser {
  email: string;
  name?: string;
}

export interface UpdateUser {
  email?: string;
  name?: string;
}
