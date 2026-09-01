import type { StepContainerProps } from "@/types/step.types";
import BiodataSiswaDetailStep from "@/components/step/clients/BiodataSiswaStep";
//import { getBiodataSiswaDetailData } from "@/features/pendaftaran/biodata-detail";

export default async function BiodataSiswaContainer({
  pendaftaran_id,
  user_id,
  status,
}: StepContainerProps) {
  if (status === "locked") {
    return null;
  }

  const data = status === "complete" 
    ? null
    : null;

  return (
    <BiodataSiswaDetailStep
      pendaftaran_id={pendaftaran_id}
      user_id={user_id}
      status={status}
      data={data}
    />
  );
}