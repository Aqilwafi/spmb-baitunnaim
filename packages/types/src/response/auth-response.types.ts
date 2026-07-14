// packages/types/src/response/auth-response.types.ts

import type { ActionResponse } from "./action-response.types";

export type LoginResponse = ActionResponse<{
  email:string;
}>;

export type RegisterResponse = ActionResponse<{
  email:string;
  username?: string;
}>;

export type LogoutResponse = ActionResponse;

export type ForgotPasswordResponse = ActionResponse<{
  email:string;
}>;

export type ResetPasswordResponse = ActionResponse;
