import type { StepContainerProps } from "@/types/step.types";
import PendidikanSebelumnyaStep from "@/components/step/clients/PendidikanSebelumnyaStep";
import { getPendidikanSiswaSebelumnya } from "@/services/pendaftaran/data/pendidikan";

export default async function PendidikanSebelumnyaContainer({
  formId,
  code,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  // Jika ada master data yang diperlukan (misal: jenis sekolah, dll), ambil di sini via Promise.all
  const data = status === "complete" 
    ? await getPendidikanSiswaSebelumnya({ formId: formId })
    : null;

  return (
    <PendidikanSebelumnyaStep
      formId={formId}
      code={code}
      status={status}
      data={data ?? null}
    />
  );
}