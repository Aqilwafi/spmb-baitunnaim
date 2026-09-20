// packages/types/src/response/auth-response.types.ts

import type { BaseResponse } from "../shared/response.types";

export interface BaseAuthResponse {
  success: boolean;
  message?: string;
  code?: string;
  cause?: string;
  credential?: string;
  id?: string;
    
}

export type RegisterResponse = BaseResponse<{
  email:string;
  username?: string;
}>;

export type LogoutResponse = BaseResponse;

export type ForgotPasswordResponse = BaseResponse<{
  email:string;
}>;

export type ResetPasswordResponse = BaseResponse;
