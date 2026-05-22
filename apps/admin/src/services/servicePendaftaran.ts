import "server-only";
import { createSupabaseServer } from "@/lib/supabase/server";
import { RegistrationPayload } from "@/types/typeApplication";

export async function createNewRegistrationService(payload: RegistrationPayload) {
  const supabase = await createSupabaseServer();

  // 1. Insert Pendaftaran Dasar
  const { data: reg, error: regError } = await supabase
    .from("pendaftaran")
    .insert({
      user_id: payload.userId,
      lembaga_tujuan_id: payload.lembagaId,
      kelas_mi_id: payload.kelasId,
      current_step_id: 2 // Langsung ke step biodata
    })
    .select().single();

  if (regError) throw new Error("Gagal membuat entri pendaftaran.");

  // 2. Insert Biodata Siswa
  const { error: bioError } = await supabase
    .from("biodata_siswa")
    .insert({
      pendaftaran_id: reg.id,
      nama_lengkap: payload.namaLengkap,
      jenis_kelamin: payload.jenisKelamin,
    });

  if (bioError) {
    // Manual Rollback jika biodata gagal masuk
    await supabase.from("pendaftaran").delete().eq("id", reg.id);
    throw new Error("Gagal menyimpan biodata siswa.");
  }

  return reg;
}

export async function getMasterRegistrationData() {
  const supabase = await createSupabaseServer();
  const [lembaga, kelas] = await Promise.all([
    supabase.from("lembaga_tujuan").select("id, name"),
    supabase.from("kelas_mi").select("id, name"),
  ]);

  return {
    masterLembaga: (lembaga.data || []) as any[],
    masterKelas: (kelas.data || []) as any[],
  };
}