// components/step/containers/PembayaranContainer.tsx

import type { StepContainerProps } from "@/types/step.types";
import PembayaranStep from "@/components/step/clients/PembayaranStep";
import { getPembayaranStepData } from "@/features/upload/pembayaran";

export default async function PembayaranContainer({
  pendaftaran_id,
  user_id,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  // Ambil data asli jika complete, passing null jika active
  const data = status === "complete" 
    ? await getPembayaranStepData(pendaftaran_id) 
    : null;

  return (
    <PembayaranStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      data={data}
    />
  );
}