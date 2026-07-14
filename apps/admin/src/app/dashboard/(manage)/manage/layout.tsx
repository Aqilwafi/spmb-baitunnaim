// apps/admin/src/app/dashboard/(manage)/manage/layout.tsx
import { getCurrentClaims, validateAccess } from "@bn/auth";
import { Forbidden, Button } from "@bn/ui";
import { hasManageAccess } from "@/utils/policies";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const claims = await getCurrentClaims();
  const allowed = validateAccess(claims, hasManageAccess);
  if (!allowed) return <Forbidden
        primaryAction={
          <Link href="/" className="block w-full">
            <Button className="w-full flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              Kembali
            </Button>
          </Link>
        }
        secondaryAction={
          <Link href="/login" className="block w-full">
            <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-xs">
              Hubungi Admin IT
            </Button>
          </Link>
        }
      />;
  return <>{children}</>;
}