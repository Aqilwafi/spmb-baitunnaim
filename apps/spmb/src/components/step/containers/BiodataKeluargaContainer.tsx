import type { StepContainerProps } from "@/types/step.types";
import BiodataKeluargaStep from "@/components/step/clients/BiodataKeluargaStep";
// import { getBiodataKeluargaByRelation, getWaliRequirement } from "@/features/pendaftaran/biodata-keluarga";

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

  // Ambil data spesifik berdasarkan relasi jika step sudah complete
  const data = status === "complete"
    ? null // await getBiodataKeluargaByRelation(pendaftaran_id, relationType)
    : null;

  // Query khusus dari server: Apakah pendaftar wajib isi wali? (Misal berdasarkan umur/status orang tua)
  // Contoh: const isWaliMandatory = await getWaliRequirement(pendaftaran_id);
  const isWaliMandatory = false; // 👈 Mock nilai true/false dari server

  return (
    <BiodataKeluargaStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      relationType={relationType}
      data={data}
      isWaliMandatory={isWaliMandatory} // 👈 Pass ke client
    />
  );
}