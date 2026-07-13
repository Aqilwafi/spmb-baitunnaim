// apps/admin/src/app/dashboard/(manage)/manage/layout.tsx
import { getCurrentClaims, validateAccess } from "@bn/auth";
import { Forbidden } from "@bn/ui";
import { hasManageAccess } from "@/utils/policies";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();
  const allowed = validateAccess(claims, hasManageAccess);
  if (!allowed) return <Forbidden />;
  return <>{children}</>;
}