// apps/admin/src/app/dashboard/page.tsx
import { getKeluargaListData } from "@/features/biodata/keluarga"; 
import BackButton from "@/components/buttons/BackButton";
import BiodataKeluargaClient from "@/components/biodata/keluarga/BiodataKeluargaClient";
import { HeartHandshake, ShieldUser } from "lucide-react";

export default async function BiodataKeluargaPage() {
  const listKeluarga = await getKeluargaListData();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <HeartHandshake className="w-6 h-6 text-blue-600 shrink-0" />

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Biodata Keluarga
            </h1>
            <p className="text-xs text-gray-500">
              Biodata Keluarga Lengkap
            </p>
          </div>
        </div>
      </div>

      {/* Pembayaran Client (Berisi Tabel & Modal) */}
      <BiodataKeluargaClient data={listKeluarga} />
    </div>
  );
}