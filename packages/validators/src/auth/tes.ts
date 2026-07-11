import { z } from 'zod';
import { Database } from '@bn/types'; // Tipe dari Supabase CLI

// 1. Ambil definisi tabel dari Supabase
type PendaftaranRow = Database['public']['Tables']['form_pendaftaran']['Insert'];

// 2. Buat Zod Schema dengan *refining* (validasi tambahan)
export const PendaftaranSchema = z.object({
  // Kita ambil dari database, tapi kita "perketat" aturannya
  nik: z.string().length(16, "NIK harus 16 digit").regex(/^\d+$/, "Hanya angka"),
  nama_lengkap: z.string().min(3),
  jenis_kelamin: z.enum(['L', 'P']),
  lembaga_tujuan_id: z.string(),
  kelas_mi_id: z.string().optional(),
}) satisfies z.ZodType<PendaftaranRow>; // <--- INI KUNCINYA!

export type PendaftaranInput = z.infer<typeof PendaftaranSchema>;