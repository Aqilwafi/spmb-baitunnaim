// apps/admin/src/app/dashboard/page.tsx
import { Maintenance } from "@bn/ui";
import BackButton from "@/components/buttons/BackButton";
export default function MasterTahunAjaranPage() {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1>Ini Tahun Ajaran</h1>
      <Maintenance />
      <BackButton />
    </div>
  );
}