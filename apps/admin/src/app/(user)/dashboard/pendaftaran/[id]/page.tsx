import { createSupabaseServer } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import ClientDetailPendaftaran from "@/components/dashboards/pendaftaran/ClientDetailPendaftaran";
import { 
  getDetailPendaftaranService, 
  getStepBisnisService 
} from "@/services/serviceDetailPendaftaran";

export default async function DetailPendaftaranPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServer();

  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // 2. Fetch Data via Service
  // Kita jalankan paralel agar lebih cepat (Performance Boost)
  const [pendaftaran, stepList] = await Promise.all([
    getDetailPendaftaranService(id, user.id),
    getStepBisnisService()
  ]);

  // 3. Ownership & Existence Check
  if (!pendaftaran) {
    // Kita lakukan pengecekan tambahan: apakah datanya ada tapi milik orang lain?
    const { data: exists } = await supabase
      .from("pendaftaran")
      .select("id")
      .eq("id", id)
      .single();

    if (exists) {
      redirect("/forbidden"); // Data ada tapi user_id beda
    } else {
      notFound(); // Memang datanya tidak ada
    }
  }

  return (
    <ClientDetailPendaftaran 
      user={user} 
      pendaftaran={pendaftaran} 
      stepList={stepList} 
    />
  );
}