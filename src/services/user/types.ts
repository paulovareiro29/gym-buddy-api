export interface NormalizedUser {
  id: string;
  email: string;
  name: string;
  address: string;
  register_code: string;
  activated: boolean;
}

export interface CreateUser {
  role_id: string;
  email: string;
  name?: string;
}

export interface UpdateUser {
  email?: string;
  name?: string;
  password?: string;
  activated?: boolean;
}
