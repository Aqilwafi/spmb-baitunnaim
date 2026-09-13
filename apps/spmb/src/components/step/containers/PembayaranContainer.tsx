// components/step/containers/PembayaranContainer.tsx

import type { StepContainerProps } from "@/types/step.types";
import PembayaranStep from "@/components/step/clients/PembayaranStep";
import { getPembayaranData } from "@/features/pendaftaran/data/pembayaran";

export default async function PembayaranContainer({
  formId,
  status,
  code,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  // Ambil data asli jika complete, passing null jika active
  const data = status === "complete" 
    ? await getPembayaranData(formId) 
    : null;

  return (
    <PembayaranStep
      formId={formId}
      status={status}
      code={code}
      data={data}
    />
  );
}