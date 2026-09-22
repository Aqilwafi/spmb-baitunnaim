// apps/admin/src/app/dashboard/pembayaran/page.tsx
import { getPembayaranListData } from "@/features/spmb/pembayaran/pembayaran-list"; // sesuaikan path
import PembayaranTable from "@/components/pembayaran/PembyaranTable";
import { ShieldUser } from "lucide-react";
import BackButton from "@/components/buttons/BackButton";

export default async function PembayaranPage() {
  const pembayaranData = await getPembayaranListData();

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <ShieldUser className="w-6 h-6 text-blue-600 shrink-0" />

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Pembayaran Formulir Pendaftaran
            </h1>
            <p className="text-xs text-gray-500">
              Verifikasi bukti pembayaran formulir pendaftaran.
            </p>
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <PembayaranTable data={pembayaranData} />
    </div>
  );
}