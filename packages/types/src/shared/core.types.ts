export type { Session, User, JwtPayload } from '@supabase/supabase-js';

export type MasterData = {
  value: number;
  label: string;
  id?: number;
  code?: string;
  order?: number;
  startYear?: number;
  endYear?: number;
  semester?: string;
};

export interface BaseDocumentPayload {
  filePath: string;
}

export interface DetailDocumentUpload extends BaseDocumentPayload {
  documentId?: number;
  documentCode?: string;
}