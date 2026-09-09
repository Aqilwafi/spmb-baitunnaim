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

export interface BaseRPCSubmitResponse {
  form_id: string;
  next_step_id?: number;
}

export interface FormSubmitResult {
  formId: string;
  nextStepId?: number;
}