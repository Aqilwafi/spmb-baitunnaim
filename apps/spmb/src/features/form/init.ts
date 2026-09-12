
import { formIdParamsSchema } from "@bn/validators";
import { getInitForm, type InitFormStepData as ServiceInitFormStepData } from '@/services/form/init';
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { pickId, genderLabel } from "@bn/utils";

export type InitFormStepData = Omit<ServiceInitFormStepData, "gender"> & {
  genderFormatted: string;
};

export async function getInitFormData(
  formId: string
): Promise<InitFormStepData | null> {
  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) return null;

  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) return null;

  const data = await getInitForm(parsed.data, tahunAjaranId);

  if (!data) return null;

  return {
    ...data,
    genderFormatted: genderLabel(data.gender),
  };
}