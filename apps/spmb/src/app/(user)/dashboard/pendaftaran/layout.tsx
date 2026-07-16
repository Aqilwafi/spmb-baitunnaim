// 📄 File: apps/dashboard/src/app/dashboard/pendaftaran/layout.tsx

import { getCurrentClaims } from '@bn/auth';
import { validateAccess } from '@bn/auth/utils';
import { isPendaftar } from '@/utils/policies';
import DashboardHeader from '@/components/headers/dashboardHeader';
import { Forbidden, Unauthorized, Button } from '@bn/ui';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function DashboardPendaftaranLayout({ children }: { children: React.ReactNode }) {
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
    <>
      {children}
    </>
  );
}