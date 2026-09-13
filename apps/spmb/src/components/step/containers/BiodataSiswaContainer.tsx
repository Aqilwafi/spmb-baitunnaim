import type { StepContainerProps } from "@/types/step.types";
import BiodataSiswaDetailStep from "@/components/step/clients/BiodataSiswaStep";
import { getStatusRumahOptions, getTinggalBersamaOptions } from "@/features/master/options";
import { getBiodataSiswaDetailData } from "@/features/pendaftaran/data/siswa";

export default async function BiodataSiswaContainer({
  formId,
  status,
  code,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  const [statusRumahOptions, tinggalBersamaOptions] = await Promise.all([
          getStatusRumahOptions(),
          getTinggalBersamaOptions()
      ]);

  const data = status === "complete" 
    ? await getBiodataSiswaDetailData({formId})
    : null;

  return (
    <BiodataSiswaDetailStep
      formId={formId}
      status={status}
      code={code}
      data={data}
      statusRumahOptions={statusRumahOptions}
      tinggalBersamaOptions={tinggalBersamaOptions}
    />
  );
}