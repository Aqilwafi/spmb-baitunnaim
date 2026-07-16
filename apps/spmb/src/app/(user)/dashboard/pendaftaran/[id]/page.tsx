// app/dashboard/pendaftaran/[id]/page.tsx

import ClientDetailPendaftaran from "@/components/dashboards/pendaftaran/ClientPendaftaran";

// Kita lengkapi dummy datanya sedikit agar tampilan Header di Accordion terisi bagus
const dummyPendaftaran = {
  id: "dummy-id-123",
  current_step_id: 2, // Menandakan user sudah menyelesaikan step 2, sekarang aktif di step 3
  biodata_siswa: {
    nama_lengkap: "Ahmad Rifai", // Muncul di header
  },
  final_status_id: {
    name: "Draft Pendaftaran", // Muncul di status badge header
  },
};

const dummyUser = {
  id: "dummy-user-id-999",
  email: "ahmad.rifai@example.com",
};

export default async function DetailPendaftaranPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Mengambil ID dari URL parameter (Next.js 15+ Pattern)
  const { id } = await params;

  /**
   * NOTE MASA DEPAN:
   * Jika nanti sudah pakai database/Supabase asli, kamu tinggal ganti dummy di atas dengan:
   * 
   * const supabase = await createSupabaseServer();
   * const { data: { user } } = await supabase.auth.getUser();
   * const pendaftaran = await getDetailPendaftaranService(id, user.id);
   */

  return (
    <ClientDetailPendaftaran 
      pendaftaran={dummyPendaftaran} 
      user={dummyUser} 
    />
  );
}