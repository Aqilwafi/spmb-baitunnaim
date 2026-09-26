// apps/admin/src/components/buttons/ExportButton.tsx
"use client";

import { Button } from "@bn/ui";
import { Download } from "lucide-react";
import { exportBiodataKeluargaToExcel } from "@/helpers/excel/exportBiodataKeluargaToExcel";
import { exportSiswaToExcel } from "@/helpers/excel/exportSiswaToExcel";

// Definisikan jenis export yang didukung
type ExportType = "keluarga" | "siswa" | "logs"; // Tambah jenis lain nanti jika perlu

interface ExportButtonProps<T> {
  data: T[];
  type: ExportType;
  label?: string;
  className?: string;
}

export function ExportButton<T>({
  data,
  type,
  label = "Export Excel",
  className = "bg-green-600 hover:bg-green-700 text-white px-4 py-2 text-xs rounded-xl shadow-sm flex items-center gap-2",
}: ExportButtonProps<T>) {
  
  const handleExport = () => {
    try {
      if (!data || data.length === 0) {
        alert("Tidak ada data untuk diexport!");
        return;
      }

      // Routing fungsi export berdasarkan jenisnya
      switch (type) {
        case "keluarga":
          exportBiodataKeluargaToExcel(data as any);
          break;
        case "siswa":
          exportSiswaToExcel(data as any); // Contoh untuk masa depan
          break;
        case "logs":
          // exportLogsToExcel(data as any); // Contoh untuk masa depan
          break;
        default:
          throw new Error("Tipe export tidak dikenali.");
      }
    } catch (error: any) {
      alert(error.message || "Gagal melakukan export data.");
    }
  };

  return (
    <Button onClick={handleExport} className={className}>
      <Download className="w-4 h-4" />
      {label}
    </Button>
  );
}