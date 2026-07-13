// apps/admin/src/app/dashboard/layout.tsx
import { getCurrentClaims, validateAccess } from "@bn/auth";
import { Unauthorized, Forbidden } from "@bn/ui";
import { hasSpmbAccess, hasPublikasiAccess, hasManageAccess } from "@/utils/policies";
import Sidebar from "@/components/others/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();
  if (!claims) return <Unauthorized />;
  const user = {
    email: claims.email || "",
    username:
      claims.user_metadata?.username ||
      claims.email ||
      "admin",

    access_rights:
      claims.app_metadata?.access_rights || [],
  };

  // Cukup punya akses salah satu domain untuk masuk admin panel
  const hasAnyAccess = validateAccess(claims, (roles) =>
    hasSpmbAccess(roles) || hasPublikasiAccess(roles) || hasManageAccess(roles)
  );

  if (!hasAnyAccess) return <Forbidden />;

  // Hitung akses per domain untuk dikirim ke sidebar
  const canSpmb = validateAccess(claims, hasSpmbAccess);
  const canPublikasi = validateAccess(claims, hasPublikasiAccess);
  const canManage = validateAccess(claims, hasManageAccess);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        canSpmb={canSpmb}
        canPublikasi={canPublikasi}
        canManage={canManage}
        user={user}
      />
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}