import type { StepContainerProps } from "@/types/step.types";
import FinalisasiStep from "@/components/step/clients/FinalisasiStep";
import { getFinalisasiData, getIsFinalData } from "@/features/pendaftaran/data/finalisasi";

export default async function FinalisasiContainer({
  formId,
  code,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  console.log (status)
  const isFinal = await  getIsFinalData(formId);
  console.log(isFinal)

  // ubah status manual dari active menjadi completed jika getIsFinalData = true.

  const data = isFinal
      ? await getFinalisasiData(formId) 
      : null;

  // Step 11 bersifat konfirmasi akhir, jadi tidak perlu fetch data dari database khusus step ini, 
  // kecuali Anda ingin mengambil ringkasan status pendaftaran/pembayaran.
  return (
    <FinalisasiStep
      formId={formId}
      code={code}
      data={data}
      status={status}
      isFinal={isFinal}
    />
  );
}