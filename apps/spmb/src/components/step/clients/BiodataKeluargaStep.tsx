"use client";

import { useActionState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, User, ShieldCheck } from "lucide-react";
import { submitBiodataKeluargaAction } from "@/actions/pendaftaran/biodata-keluarga";
import { BiodataKeluargaForm } from "@/components/forms/BiodataKeluargaForm";

export type RelationType = "AYAH" | "IBU" | "WALI";
export type LifeStatus = "HIDUP" | "MENINGGAL";

export interface BiodataKeluargaItemData {
  relation_type: RelationType;
  detail_relation_type?: string | null;
  nama_lengkap: string;
  nik?: string | null;
  status_hidup: LifeStatus;
  tempat_lahir?: string | null;
  tanggal_lahir?: string | null;
  pekerjaan?: string | null;
  pendidikan_terakhir?: string | null;
  penghasilan?: string | null;
  no_hp?: string | null;
  alamat?: string | null;
}

interface BiodataKeluargaStepProps {
  pendaftaran_id: string;
  user_id: string;
  status: "active" | "complete";
  relationType: RelationType;
  data: BiodataKeluargaItemData | null;
  isWaliMandatory?: boolean;
}

export default function BiodataKeluargaStep({
  pendaftaran_id,
  status,
  relationType,
  data,
  isWaliMandatory = false,
}: BiodataKeluargaStepProps) {
  const router = useRouter();
  const isSubmittedRef = useRef(false);

  const labelMap: Record<RelationType, string> = {
    AYAH: "Ayah",
    IBU: "Ibu",
    WALI: "Wali",
  };

  const [state, action, isPending] = useActionState(
    async (prevState: any, formPayload: FormData) => {
      isSubmittedRef.current = true;
      return await submitBiodataKeluargaAction({
        formId: pendaftaran_id,
        rawPayload: Object.fromEntries(formPayload),
      });
    },
    null
  );

  useEffect(() => {
    if (isSubmittedRef.current && state?.success) {
      isSubmittedRef.current = false;
      router.refresh();
    }
  }, [state, router]);

  // Tampilan Read-Only (Status Complete)
  if (status === "complete" && data) {
    return (
      <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
        <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <div className="bg-green-100 p-2 rounded-full shrink-0">
              <CheckCircle2 className="text-green-600 w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
                Biodata {labelMap[relationType]}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Data {labelMap[relationType].toLowerCase()} telah tersimpan di sistem.
              </p>
            </div>
          </div>

          <div className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-bold bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full">
                {data.relation_type} {data.detail_relation_type && `(${data.detail_relation_type})`}
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  data.status_hidup === "HIDUP"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {data.status_hidup}
              </span>
            </div>

            <p className="text-sm font-bold text-gray-800">{data.nama_lengkap}</p>

            {data.status_hidup === "HIDUP" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600 pt-2 border-t border-gray-200/60">
                <p><span className="text-gray-400">NIK:</span> {data.nik || "-"}</p>
                <p><span className="text-gray-400">No. HP:</span> {data.no_hp || "-"}</p>
                <p><span className="text-gray-400">Pekerjaan:</span> {data.pekerjaan || "-"}</p>
                <p><span className="text-gray-400">Pendidikan:</span> {data.pendidikan_terakhir || "-"}</p>
                <p><span className="text-gray-400">Penghasilan:</span> {data.penghasilan || "-"}</p>
                <p className="sm:col-span-2"><span className="text-gray-400">Alamat:</span> {data.alamat || "-"}</p>
              </div>
            )}
          </div>

          <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
            <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
            <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
              Data tidak dapat diubah secara mandiri. Hubungi panitia pendaftaran jika ada pembaruan data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Tampilan Form Input (Status Active)
  return (
    <div className="flex flex-col gap-4 sm:gap-6 animate-in fade-in duration-500">
      <div className="p-4 sm:p-8 border rounded-[2rem] bg-white shadow-sm">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="bg-blue-100 p-2 rounded-full shrink-0">
            <User className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
              Isi Biodata {labelMap[relationType]}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Lengkapi formulir data {labelMap[relationType].toLowerCase()} sesuai dengan identitas resmi.
            </p>
          </div>
        </div>

        <BiodataKeluargaForm
          relationType={relationType}
          data={data}
          isWaliMandatory={isWaliMandatory}
          action={action}
          isPending={isPending}
          state={state}
        />

        <div className="flex items-start gap-3 p-4 bg-amber-50/50 border border-amber-100 rounded-[1.5rem] mt-6">
          <ShieldCheck className="text-amber-600 mt-0.5 shrink-0" size={18} />
          <p className="text-[11px] sm:text-xs text-amber-800 leading-relaxed font-medium">
            Pastikan NIK dan data diri {labelMap[relationType].toLowerCase()} sudah benar sebelum melanjutkan ke langkah berikutnya.
          </p>
        </div>
      </div>
    </div>
  );
}