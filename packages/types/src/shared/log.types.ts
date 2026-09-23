import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';

export type ActivityLogs = Tables<'activity_logs'>;

export type BaseLoggerParams<T = Record<string, any>> = {
  userId?: string | null;
  event: string;
  status: "success" | "failed";
  metadata?: T;
};

