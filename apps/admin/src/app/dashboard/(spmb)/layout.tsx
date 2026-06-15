import { getCurrentClaims, validateAccess } from "@bn/auth";
import { Forbidden } from "@bn/ui";
import { hasSpmbAccess } from "@/utils/policies";

export default async function SpmbLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();
  const allowed = validateAccess(claims, "SPMB", hasSpmbAccess);
  if (!allowed) return <Forbidden />;
  return <>{children}</>;
}