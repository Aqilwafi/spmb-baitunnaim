// 📄 File: apps/dashboard/src/app/dashboard/pendaftaran/layout.tsx

import { getCurrentClaims } from '@bn/auth';
import { validateAccess } from '@bn/auth/utils';
import { isPendaftar } from '@/helpers/policies';
import { Unauthorized } from '@bn/ui';
import ForbiddenScreen from '@/components/feedback/ForbiddenScreen'; 

export default async function DashboardPendaftaranLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();

  if (!claims) return <Unauthorized link="/login" />;

  const claimsData = claims;
  const isAllowed = validateAccess(claimsData, isPendaftar);

  if (!isAllowed) {
    // Menggunakan ForbiddenScreen dengan kustomisasi sesuai kebutuhan layout pendaftaran
    return <ForbiddenScreen backHref="/login" backLabel="Kembali" />;
  }

  return (
    <>
      {children}
    </>
  );
}