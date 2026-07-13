export { isAuthError } from "@supabase/supabase-js";
export type { Session, User, JwtPayload } from '@supabase/supabase-js';

export type BaseResponse<T = undefined, E = never> = 
  | { success: true; message: string; data?: T } 
  | { success: false; message: string; data?: E};

export type MasterDataz = {
  value: number;
  label: string;
};

export type MasterData = {
  value: number;
  label: string;
  code?: string;
  order?: number;
};