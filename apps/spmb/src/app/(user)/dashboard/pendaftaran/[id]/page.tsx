// app/dashboard/pendaftaran/[id]/page.tsx

import Link from "next/link";
import { isAccessAllowed } from "@/utils/guards";
import ClientDetailPendaftaran from "@/components/pendaftaran/ClientPendaftaran";
import { Forbidden, Button } from "@bn/ui";
import { ArrowLeft } from 'lucide-react';

// Kita lengkapi dummy datanya sedikit agar tampilan Header di Accordion terisi bagus
const dummyPendaftaran = {
  id: "dummy-id-123",
  current_step_id: 3, // Menandakan user sudah menyelesaikan step 2, sekarang aktif di step 3
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
  const { allowed } = await isAccessAllowed(id);
  if (!allowed) {
    return  (
      <div className=" fixed inset-0 z-50 flex">
        <Forbidden
          className="fixed inset-0 z-[9999] w-screen h-screen"
            primaryAction={
              <Link href="/dashboard" className="block w-full">
                <Button className="w-full flex items-center justify-center gap-2">
                  <ArrowLeft size={18} />
                    Kembali
                </Button>
              </Link>
            }
          secondaryAction={
            <Link href="/" className="block w-full">
              <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-xs">
                Hubungi Admin IT
              </Button>
            </Link>
          }
        />
      </div>
    );
  }

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