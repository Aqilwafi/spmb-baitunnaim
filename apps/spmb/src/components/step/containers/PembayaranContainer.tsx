// components/step/containers/PembayaranContainer.tsx

import type { StepContainerProps } from "@/types/step.types";
import PembayaranStep from "@/components/step/clients/PembayaranStep";

export default async function PembayaranContainer({
  pendaftaran_id,
  user_id,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  // TODO: ganti dengan fetch data pembayaran asli begitu API siap
  // const data = await getPembayaranStepData(pendaftaran_id);
  const dummyData =
    status === "complete"
      ? {
          bukti_bayar_url: "https://placehold.co/400x300?text=Bukti+Bayar",
          uploaded_at: new Date().toISOString(),
        }
      : null;

  return (
    <PembayaranStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      data={dummyData}
    />
  );
}