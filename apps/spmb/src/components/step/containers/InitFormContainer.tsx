// components/step/containers/InitFormContainer.tsx
import type { StepContainerProps } from "@/types/step.types";
import { getInitFormData } from "@/features/pendaftaran/data/init";
import InitFormStep from "@/components/step/clients/InitFormStep";

export default async function InitFormContainer({
  formId,
  status,
}: StepContainerProps) {
  if (status !== "complete") {
    return null;
  }

  const data = await getInitFormData(formId);

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-400">
        Data tidak ditemukan
      </div>
    );
  }

  return <InitFormStep data={data} />;
}