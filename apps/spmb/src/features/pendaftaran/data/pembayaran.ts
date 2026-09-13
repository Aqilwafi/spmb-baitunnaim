
import { formIdParamsSchema, formatZodErrors } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { PembayaranStepData } from "@/types/form.types";
import { getPembayaran } from "@/services/pendaftaran/data/pembayaran";
import { getSignedUrl } from "@/services/file/access-url";


export async function getPembayaranData(formId: string): Promise<PembayaranStepData | null> {

  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) {
     throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
  };

  const pembayaran = await getPembayaran({formId: parsed.data});
  if (!pembayaran) return null;

  const signedUrl = await getSignedUrl(
    pembayaran.urlBuktiBayar
  );
  if (!signedUrl) return null;

  return {
    ...pembayaran,
    urlBuktiBayar: signedUrl,
  };
}