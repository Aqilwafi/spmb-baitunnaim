// 📄 File: apps/dashboard/src/app/dashboard/layout.tsx
import { getCurrentClaims, validateAccess } from '@bn/auth'; 
import { isPendaftar } from '@/utils/policies'; // 💡 Cukup import fungsi policy lokal saja
import DashboardHeader from '@/components/headers/dashboardHeader';
import { Forbidden, Unauthorized } from '@bn/ui';
import { executeSharedLogout } from '@bn/auth';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Ambil session user dari server
  const claims = await getCurrentClaims();
  
  // 2. Jika session habis/tidak ada, langsung tampilkan halaman unauthorized
  if (!claims) return <Unauthorized />;
  
  const claimsData = claims;

  // 3. Validasi akses instan: langsung kirim data claims dan fungsi policy penentu
  const isAllowed = validateAccess(claimsData, isPendaftar);

  if (!isAllowed) {
    return <Forbidden />;
  }

  // 4. Jika lolos, render halaman dashboard dengan layout semantik yang rapi
  return (
    <section className="min-h-screen bg-[#f8f9fa] text-gray-800 flex flex-col">
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 w-full">
        <DashboardHeader name={claimsData.user_metadata?.username || claimsData.email || "User"} />
      </div>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-6 py-6">
        {children}
      </main>
    </section>
  );
}