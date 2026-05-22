import "server-only";
import { createSupabaseServer } from "@/lib/supabase/server";
import { PendaftaranDetail, StepBisnis } from "@/types/typeApplicationDetail";

export async function getDetailPendaftaranService(id: string, userId: string): Promise<PendaftaranDetail | null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from("pendaftaran")
    .select(`
      *,
      biodata_siswa(
        *,
        biodata_keluarga(*),
        tempat_tinggal(*)
      ),
      final_status_id(name),
      lembaga_tujuan_id(name),
      kelas_mi_id(name)
    `)
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  
  // Cast ke interface yang sudah kita buat
  return data as unknown as PendaftaranDetail;
}

export async function getStepBisnisService(): Promise<StepBisnis[]> {
  const supabase = await createSupabaseServer();
  const { data } = await supabase
    .from("step_bisnis")
    .select("*")
    .order("id", { ascending: true });

  return (data || []) as StepBisnis[];
}