import { User } from "@supabase/supabase-js";

export interface ClientDetailProps {
  pendaftaran: PendaftaranDetail;
  stepList: StepBisnis[];
  user: User;
}
export interface PendaftaranDetail {
  id: string;
  user_id: string;
  current_step_id: number;
  final_status_id: { name: string };
  lembaga_tujuan_id: { name: string };
  kelas_mi_id: { name: string };
  biodata_siswa: {
    nama_lengkap: string;
    jenis_kelamin: string;
    biodata_keluarga: any[];
    tempat_tinggal: any[];
  };
}

export interface StepBisnis {
  id: number;
  name: string;
}