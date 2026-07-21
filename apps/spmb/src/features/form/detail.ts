// features/form/detail-form.ts

import { getFormPendaftaranById } from "@/services/form";
import type { FormPendaftaranDisplayItem } from "@bn/types";

export async function getDetailPendaftaranService(formId: string): Promise<FormPendaftaranDisplayItem> {
  const data = await getFormPendaftaranById(formId);

  if (!data) {
    throw new Error("Data pendaftaran tidak ditemukan.");
  }

  return data;
}