// apps/admin/src/app/dashboard/page.tsx
import { getKeluargaListData } from "@/features/biodata/keluarga"; 
import BackButton from "@/components/buttons/BackButton";
import BiodataKeluargaClient from "@/components/biodata/keluarga/BiodataKeluargaClient";
import { ExportButton } from "@/components/buttons/ExportButton"; // <-- Import ExportButton general
import { HeartHandshake } from "lucide-react";

export default async function BiodataKeluargaPage() {
  const listKeluarga = await getKeluargaListData();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
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
              Total data: {listKeluarga.length} anggota keluarga
            </p>
          </div>
        </div>

        {/* Mengirim data & tipe string (Aman dari error Server-Client) */}
        <ExportButton 
          data={listKeluarga}
          type="keluarga"
          label="Export Data Keluarga"
        />
      </div>

      {/* Biodata Keluarga Client */}
      <BiodataKeluargaClient data={listKeluarga} />
    </div>
  );
}