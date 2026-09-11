import type { StepContainerProps } from "@/types/step.types";
import BiodataSiswaDetailStep from "@/components/step/clients/BiodataSiswaStep";
import { getStatusRumahOptions, getTinggalBersamaOptions } from "@/features/master/options";

import { getBiodataSiswaDetail } from "@/services/biodata/siswa";



export default async function BiodataSiswaContainer({
  pendaftaran_id,
  user_id,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  const [statusRumahOptions, tinggalBersamaOptions] = await Promise.all([
          getStatusRumahOptions(),
          getTinggalBersamaOptions()
      ]);

  const data = status === "complete" 
    ? await getBiodataSiswaDetail({ formId: pendaftaran_id })
    : null;

  return (
    <BiodataSiswaDetailStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      data={data?.data ?? null}
      statusRumahOptions={statusRumahOptions}
      tinggalBersamaOptions={tinggalBersamaOptions}
    />
  );
}