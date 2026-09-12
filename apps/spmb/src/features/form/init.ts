
import { formIdParamsSchema, formatZodErrors } from "@bn/validators";
import { getInitForm, type InitFormStepData as ServiceInitFormStepData } from '@/services/form/init';
import { getTahunAjaranAktifData } from "../master/tahun-ajaran";
import { genderLabel, createValidationError } from "@bn/utils";

export type InitFormStepData = Omit<ServiceInitFormStepData, "gender"> & {
  genderFormatted: string;
};

export async function getInitFormData(formId: string): Promise<InitFormStepData | null> {

  const tahunAjaran = await getTahunAjaranAktifData();
  if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");

  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) {
     throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
  };

  const data = await getInitForm(parsed.data, tahunAjaran.id);

  if (!data) return null;

  return {
    ...data,
    genderFormatted: genderLabel(data.gender),
  };
}