// components/step/containers/PembayaranContainer.tsx

import type { StepContainerProps } from "@/types/step.types";

export default async function PembayaranContainer({
  pendaftaran_id,
  user_id,
  status,
}: StepContainerProps) {
  return (
    <div>
      <h1>Pembayaran</h1>
      <p>pendaftaran_id: {pendaftaran_id}</p>
      <p>user_id: {user_id}</p>
      <p>status: {status}</p>
    </div>
  );
}