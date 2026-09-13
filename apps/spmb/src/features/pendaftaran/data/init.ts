
import { formIdParamsSchema, formatZodErrors } from "@bn/validators";
import { getInitForm } from '@/services/pendaftaran/data/init';
import { getTahunAjaranAktifData } from "../../master/tahun-ajaran";
import { genderLabel, createValidationError } from "@bn/utils";
import type { InitFormStepData } from "@/types/form.types";

export type FormattedInitFormStepData = Omit<InitFormStepData, "gender"> & {
  genderFormatted: string;
};

export async function getInitFormData(formId: string): Promise<FormattedInitFormStepData> {

  const tahunAjaran = await getTahunAjaranAktifData();
  if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");

  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) {
     throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
  };

  const data = await getInitForm({formId: parsed.data});

  if (!data) throw new Error("Tidak ada data valid");

  return {
    ...data,
    genderFormatted: genderLabel(data.gender),
  };
}