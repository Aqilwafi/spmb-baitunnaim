// apps/admin/src/app/dashboard/layout.tsx

import { getCurrentClaims } from "@bn/auth";
import { validateAccess } from "@bn/auth/utils";
import { Unauthorized, Forbidden, Button } from "@bn/ui";
import ForbiddenScreen from "@/components/feedback/ForbiddenScreen";
import { hasSpmbAccess, hasPublikasiAccess, hasManageAccess } from "@/helpers/policies";
import Sidebar from "@/components/layout/Sidebar";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();
  if (!claims) return <Unauthorized link="/" />;

  const user = {
    email: claims.email || "",
    username: claims.user_metadata?.username || claims.email || "admin",
    access_rights: claims.app_metadata?.access_rights || [],
  };

  const hasAnyAccess = validateAccess(claims, (roles) =>
    hasSpmbAccess(roles) || hasPublikasiAccess(roles) || hasManageAccess(roles)
  );

  if (!hasAnyAccess) {
    return <ForbiddenScreen />
  }

  const canSpmb = validateAccess(claims, hasSpmbAccess);
  const canPublikasi = validateAccess(claims, hasPublikasiAccess);
  const canManage = validateAccess(claims, hasManageAccess);
  const canLog = validateAccess(claims, hasManageAccess);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        canSpmb={canSpmb}
        canPublikasi={canPublikasi}
        canManage={canManage}
        canLog={canLog}
        user={user}
      />
      {/* Background dan padding global sudah dipegang oleh <main> ini */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
}