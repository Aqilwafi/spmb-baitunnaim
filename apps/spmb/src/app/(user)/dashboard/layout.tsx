// 📄 File: apps/dashboard/src/app/dashboard/layout.tsx
import { getCurrentClaims, validateAccess } from '@bn/auth'; // 💡 Import mesin global dari shared
import { CURRENT_DOMAIN, isPendaftar } from '@/utils/policies'; // 💡 Import aturan lokal kita
import { redirect } from 'next/navigation';
import DashboardHeader from '@/components/headers/dashboardHeader';
import { Forbidden, Unauthorized } from '@bn/ui';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  // 1. Ambil session user dari server
  const claims = await getCurrentClaims();
  
  // 2. Jika expire, langsung tendang ke halaman unauthorized
  if (!claims) return <Unauthorized/> ;
  
  const claimsData = claims;

  const isAllowed = validateAccess(claimsData, CURRENT_DOMAIN, isPendaftar);

  if (!isAllowed) {
    return <Forbidden/>
  }

  // 5. Jika lolos (TRUE), render halaman dashboard dengan normal
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