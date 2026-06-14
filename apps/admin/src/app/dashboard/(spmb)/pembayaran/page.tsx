// apps/admin/src/app/dashboard/page.tsx
import { Maintenance } from "@bn/ui";
import { BackButton } from "@bn/ui";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Ini Pembayaran</h1>
      <Maintenance />
      <BackButton />
    </div>
  );
}