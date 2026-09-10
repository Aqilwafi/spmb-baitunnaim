import type { StepContainerProps } from "@/types/step.types";
import BiodataSiswaDetailStep from "@/components/step/clients/BiodataSiswaStep";
import { getMasterData } from "@/features/form/biodata-siswa-detail";

import { getBiodataSiswaDetail } from "@/services/biodata-siswa-detail";



export default async function BiodataSiswaContainer({
  pendaftaran_id,
  user_id,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }
  const masterData = await getMasterData();

  const data = status === "complete" 
    ? await getBiodataSiswaDetail({ formId: pendaftaran_id })
    : null;

  return (
    <BiodataSiswaDetailStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      data={data?.data ?? null}
      statusRumahOptions={masterData.statusRumahOptions}
      tinggalBersamaOptions={masterData.tinggalBersamaOptions}
    />
  );
}