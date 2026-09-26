// apps/admin/src/components/admin/BiodataKeluargaCard.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@bn/ui"; // Sesuaikan path import Card Anda
import { BiodataKeluargaForm } from "./BiodataKeluargaForm";
import type { FormattedListKeluarga } from "@/features/biodata/keluarga";
import type { MasterData } from "@bn/types";

interface BiodataKeluargaCardProps {
  initialData?: FormattedListKeluarga | null;
  isEdit?: boolean;
  onSubmit?: (data: any) => void;
  onCancel?: () => void;
  relationList?: MasterData[];
}

export function BiodataKeluargaCard({
  initialData,
  isEdit = false,
  onSubmit,
  onCancel,
  relationList = [],
}: BiodataKeluargaCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="border-b border-gray-100 pb-4 mb-5">
        <CardTitle className="text-base font-bold text-gray-800 flex items-center justify-between">
          <span>Biodata Keluarga: {initialData?.id || "Anggota Keluarga Baru"}</span>
          <span className="text-xs font-medium px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full">
            {initialData?.relasi || "RELASI"}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <BiodataKeluargaForm
          initialData={initialData}
          isEdit={isEdit}
          onSubmit={onSubmit}
          onCancel={onCancel}
          relationList={relationList}
        />
      </CardContent>
    </Card>
  );
}