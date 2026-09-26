// apps/admin/src/app/dashboard/biodata/siswa/page.tsx

import { ShieldUser } from "lucide-react";
import { getSiswaListData } from "@/features/biodata/siswa";
import BackButton from "@/components/buttons/BackButton";
import BiodataSiswaClient from "@/components/biodata/siswa/BiodataSiswaClient";
import { ExportButton } from "@/components/buttons/ExportButton";

export default async function BiodataSiswaPage() {
  const listSiswa = await getSiswaListData();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <ShieldUser className="w-6 h-6 text-blue-600 shrink-0" />

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Biodata Siswa
            </h1>
            <p className="text-xs text-gray-500">
              Total data: {listSiswa.length} siswa
            </p>
          </div>
        </div>

        {/* Tombol Export Siswa */}
        <ExportButton 
          data={listSiswa}
          type="siswa"
          label="Export Data Siswa"
        />
      </div>

      {/* Biodata Siswa Client (Berisi Tabel & Modal) */}
      <BiodataSiswaClient data={listSiswa} />
    </div>
  );
}