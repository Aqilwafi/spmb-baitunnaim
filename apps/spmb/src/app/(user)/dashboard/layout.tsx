// 📄 File: apps/dashboard/src/app/dashboard/layout.tsx
import { getCurrentClaims } from '@bn/auth';
import { validateAccess } from '@bn/auth/utils';
import { isPendaftar } from '@/utils/policies';
import DashboardHeader from '@/components/headers/dashboardHeader';
import { Forbidden, Unauthorized, Button } from '@bn/ui';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();

  if (!claims) return <Unauthorized />;

  const claimsData = claims;

  const isAllowed = validateAccess(claimsData, isPendaftar);

  if (!isAllowed) {
    return (
      <Forbidden
        primaryAction={
          <Link href="/login" className="block w-full">
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
    );
  }

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