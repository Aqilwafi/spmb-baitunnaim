
import { formIdParamsSchema, formatZodErrors } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { DokumenStepData } from "@/types/form.types";
import { getDokumenByTipe } from "@/services/pendaftaran/data/dokumen"; 
import { getSignedUrl } from "@/services/file/access-url";


export async function getDokumenDataByTipe(formId: string, tipeDokumenId: number): Promise<DokumenStepData | null> {

  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) {
     throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
  };

  const dokumenData = await getDokumenByTipe({formId: parsed.data, tipeDokumenId: tipeDokumenId});
  if (!dokumenData) return null;

  const signedUrl = await getSignedUrl(
    dokumenData.fileUrl
  );
  if (!signedUrl) return null;

  return {
    ...dokumenData,
    fileUrl: signedUrl,
  };
}