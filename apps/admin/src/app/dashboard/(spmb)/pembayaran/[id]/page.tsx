// apps/admin/src/app/dashboard/pembayaran/[id]/page.tsx

import BackButton from "@/components/buttons/BackButton";
import { CreditCard, Wrench } from "lucide-react";
import { Maintenance } from "@bn/ui";

interface DetailPembayaranPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function DetailPembayaranPage({ params }: DetailPembayaranPageProps) {
  const { id } = await params;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <CreditCard className="w-6 h-6 text-blue-600 shrink-0" />

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Detail & Verifikasi Pembayaran
            </h1>
            <p className="text-xs text-gray-500">
              ID Pembayaran: <span className="font-mono text-gray-700">{id}</span>
            </p>
          </div>
        </div>
      </div>

      
     <Maintenance/>;
    </div>
  );
}