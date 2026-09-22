
import { formIdParamsSchema, formatZodErrors } from "@bn/validators";
import { getTahunAjaranAktifData } from "../../master/tahun-ajaran";
import {  admissionStatusLabel, createValidationError } from "@bn/utils";
import type { FinalisasiResult } from "@/types/form.types";
import { getFinalisasi, getIsFinalForm } from "@/services/pendaftaran/data/finalisasi";

export type FormattedFinalisasi = FinalisasiResult & {
  formattedAdmissionStatus: string;
};

export async function getFinalisasiData(formId: string): Promise<FormattedFinalisasi> {

  const tahunAjaran = await getTahunAjaranAktifData();
  if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");

  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) {
     throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
  };

  const result = await  getFinalisasi(parsed.data, tahunAjaran.id);

  return {
    ...result,
    finalizedBy: "Verifikator",
    formattedAdmissionStatus: admissionStatusLabel(result.admissionStatus)
  }
}

export async function getIsFinalData(formId: string): Promise<Boolean> {

  const tahunAjaran = await getTahunAjaranAktifData();
  if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");

  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) {
     throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
  };

  return await getIsFinalForm(parsed.data, tahunAjaran.id)
}