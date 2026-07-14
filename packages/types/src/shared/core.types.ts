export { isAuthError } from "@supabase/supabase-js";
export type { Session, User, JwtPayload } from '@supabase/supabase-js';

export type MasterData = {
  value: number;
  label: string;
  code?: string;
  order?: number;
};