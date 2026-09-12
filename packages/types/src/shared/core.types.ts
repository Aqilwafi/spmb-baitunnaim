export type { Session, User, JwtPayload } from '@supabase/supabase-js';

export type MasterData = {
  value: number;
  label: string;
  id?: number;
  code?: string;
  order?: number;
  start_year?: number;
  end_year?: number;
  semester?: string;
};

export type InputRelationType = "AYAH" | "IBU" | "WALI";
export type DBRelationType = "BIODATA_FATHER" | "BIODATA_MOTHER" | "BIODATA_WALI";

// bn/types
// base dari rpc langsung
export type BaseRPCSubmitResponse = {
  success: boolean;
  form_id: string;
  next_step_id?: number;
}
// ini untuk nextjs server, pakai camelCase
export interface FormSubmitResult {
  success: boolean;
  formId: string;
  nextStepId?: number;
}