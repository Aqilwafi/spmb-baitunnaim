import type { StepContainerProps } from "@/types/step.types";
import { checkWaliRequirementStatus } from "@/features/pendaftaran/data/cek-wali";
import BiodataKeluargaStep from "@/components/step/clients/BiodataKeluargaStep";
// import { getBiodataKeluargaByRelation } from "@/features/pendaftaran/biodata-keluarga";

export default async function BiodataKeluargaContainer({
  pendaftaran_id,
  user_id,
  status,
  code,
}: StepContainerProps & { code?: string }) {
  if (status === "locked") {
    return null;
  }

  // Mapping dari code config ke relation_type database
  const relationMap: Record<string, "AYAH" | "IBU" | "WALI"> = {
    BIODATA_FATHER: "AYAH",
    BIODATA_MOTHER: "IBU",
    BIODATA_WALI: "WALI",
  };

  const relationType = relationMap[code || "BIODATA_FATHER"] || "AYAH";

  // 1. Pengecekan requirement Wali HANYA jika sedang di step BIODATA_WALI
  let isWaliMandatory = false ;

  if (code === "BIODATA_WALI") {
    // Fungsi ini hanya dieksekusi/query ke database di step WALI saja
    isWaliMandatory = await checkWaliRequirementStatus(pendaftaran_id);

    // 2. Jika Wali TIDAK wajib & status masih active,
    // sembunyikan step ini (atau logic auto-skip step pendaftaran)
    if (!isWaliMandatory && status === "active") {
      return null; 
    }
  }

  // Ambil data spesifik berdasarkan relasi jika step sudah complete
  const data = status === "complete"
    ? null // await getBiodataKeluargaByRelation(pendaftaran_id, relationType)
    : null;

  return (
    <BiodataKeluargaStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      relationType={relationType}
      data={data}
      isWaliMandatory={isWaliMandatory}
    />
  );
}