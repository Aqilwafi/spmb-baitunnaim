export { isAuthError } from "@supabase/supabase-js";
export type { Session, User, JwtPayload } from '@supabase/supabase-js';

export type BaseResponse<T = undefined, E = never> = 
  | { success: true; message: string; data?: T } 
  | { success: false; message: string; data?: E};

export type SelectOption = {
  value: string;
  label: string;
};