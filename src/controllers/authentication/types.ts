export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  role_id?: string;
}

export interface ActivateRequest {
  email: string;
  password: string;
  register_code: string;
}
