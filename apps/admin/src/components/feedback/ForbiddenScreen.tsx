// apps/spmb/src/components/others/ForbiddenScreen.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Forbidden, Button } from "@bn/ui";

interface ForbiddenScreenProps {
  backHref?: string;
  backLabel?: string;
}

export default function ForbiddenScreen({
  backHref = "/dashboard",
  backLabel = "Kembali",
}: ForbiddenScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex">
      <Forbidden
        className="fixed inset-0 z-[9999] w-screen h-screen"
        primaryAction={
          <Link href={backHref} className="block w-full">
            <Button className="w-full flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              {backLabel}
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
    </div>
  );
}