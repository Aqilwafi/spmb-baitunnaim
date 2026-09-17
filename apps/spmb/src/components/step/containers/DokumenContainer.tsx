// components/step/containers/DokumenContainer.tsx

import type { StepContainerProps } from "@/types/step.types";
import DokumenStep from "@/components/step/clients/DokumenStep";
import { getDokumenDataByTipe } from "@/features/pendaftaran/data/dokumen";

export default async function DokumenContainer({
  formId,
  status,
  code,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  // Mapping string code ke string tipe dokumen
  const documentTypeCodeMap: Record<string, "KK_TYPE_DOC" | "KTP_AYAH_TYPE_DOC" |"KTP_IBU_TYPE_DOC" | "AKTE_TYPE_DOC"> = {
    DOCUMENT_KK: "KK_TYPE_DOC",
    DOCUMENT_KTP_IBU: "KTP_IBU_TYPE_DOC",
    DOCUMENT_KTP_AYAH: 'KTP_AYAH_TYPE_DOC',
    DOCUMENT_AKTE: "AKTE_TYPE_DOC",
  };

  // Mapping string code ke number untuk RPC (p_tipe_dokumen_id)
  const documentTypeIdMap: Record<string, number> = {
    DOCUMENT_KK: 1,
    DOCUMENT_KTP_AYAH: 4,
    DOCUMENT_KTP_IBU: 2,
    DOCUMENT_AKTE: 3,
  };

  const jenisDokumen = documentTypeCodeMap[code || "DOCUMENT_KK"] || "KK_TYPE_DOC";
  const jenisDokumenId = documentTypeIdMap[code || "DOCUMENT_KK"] ?? 1;

  // Ambil data asli jika complete, passing null jika active
  const data = status === "complete" 
    ? await getDokumenDataByTipe(formId, jenisDokumenId) 
    : null;

  return (
    <DokumenStep
      formId={formId}
      status={status}
      code={code}
      jenisDokumen={jenisDokumen}
      data={data}
    />
  );
}