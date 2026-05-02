// types/authType.ts
export interface RegisterForm {
  email: string;
  password: string;
}

export interface LoginForm {
  identifier: string;
  password: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}