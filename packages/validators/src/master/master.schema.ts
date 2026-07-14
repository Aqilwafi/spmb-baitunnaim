import { z } from 'zod';
import { 
  MasterKelasInsert, 
  MasterLembagaInsert 
} from '@bn/types'; // Import type yang sudah kamu buat

// 1. Skema Master Kelas
export const MasterKelasSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
}) satisfies z.ZodType<MasterKelasInsert>;

// 2. Skema Master Lembaga
export const MasterLembagaSchema = z.object({
  code: z.string().min(1),
  label: z.string().min(1),
}) satisfies z.ZodType<MasterLembagaInsert>;

