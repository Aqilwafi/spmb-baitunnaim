import type { StepContainerProps } from "@/types/step.types";
import { checkWaliRequirementStatus } from "@/features/form/cek-wali";
import BiodataKeluargaStep from "@/components/step/clients/BiodataKeluargaStep";
import { getBiodataKeluargaData } from "@/features/pendaftaran/data/keluarga";

export default async function BiodataKeluargaContainer({
  formId,
  status,
  code,
}: StepContainerProps) {
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

  // Check requirement Wali HANYA jika step terkait adalah BIODATA_WALI
  let isWaliMandatory = false;
  if (code === "BIODATA_WALI") {
    isWaliMandatory = await checkWaliRequirementStatus(formId);
  }

  // Ambil data spesifik berdasarkan relasi jika step sudah complete
  const data =
    status === "complete"
      ? await getBiodataKeluargaData({ formId, relationType })
      : null;

  return (
    <BiodataKeluargaStep
      formId={formId}
      status={status}
      relationType={relationType}
      data={data}
      isWaliMandatory={isWaliMandatory}
    />
  );
}