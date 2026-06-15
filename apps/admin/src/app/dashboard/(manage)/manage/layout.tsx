// apps/admin/src/app/dashboard/(manage)/manage/layout.tsx
import { getCurrentClaims, validateAccess } from "@bn/auth";
import { Forbidden } from "@bn/ui";
import { ALL_DOMAINS, hasManageAccess } from "@/utils/policies";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();
  const allowed = validateAccess(claims, ALL_DOMAINS, hasManageAccess);
  if (!allowed) return <Forbidden />;
  return <>{children}</>;
}