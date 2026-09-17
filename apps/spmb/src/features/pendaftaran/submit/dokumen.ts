import { insertDokumen } from "@/services/pendaftaran/mutasi/dokumen";
import { deleteFileFromStorageService } from "@/services/file/delete"; 
import { formIdParamsSchema, dokumenUploadPathSchema, formatZodErrors } from "@bn/validators";
import { checkUserAccess } from "../../auth/guards";
import { createValidationError } from "@bn/utils";
import type { FormSubmitResult } from "@/types/form.types";
import type { DokumenUploadPathInput } from "@bn/validators";

export interface ProcessDocumentFeaturePayload {
  formId: string;
  filePath: string;
  jenisDokumen: DokumenUploadPathInput['jenisDokumen'];
}

export async function submitDokumen({ formId, filePath, jenisDokumen }: ProcessDocumentFeaturePayload): Promise<FormSubmitResult> {
  // 1. Auth
  if (!(await checkUserAccess())) {
      throw new Error("Akses tidak diizinkan.");
  }

  // 2. Validasi formId
  const parsedFormId = formIdParamsSchema.safeParse(formId);
  if (!parsedFormId.success) {
    throw createValidationError(
      formatZodErrors(parsedFormId.error),
      parsedFormId.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  // 3. Validasi & sanitasi filePath dan jenisDokumen
  const parsedInput = dokumenUploadPathSchema.safeParse({ filePath, jenisDokumen });
  if (!parsedInput.success) {
    throw createValidationError(
      formatZodErrors(parsedInput.error),
      parsedInput.error.issues[0]?.message ?? "Data dokumen tidak valid."
    );
  }

  // 4. Eksekusi service + cleanup jika gagal
  try {
    return await insertDokumen({
      formId: parsedFormId.data,
      input: {
        filePath: parsedInput.data.filePath,
        jenisDokumen: parsedInput.data.jenisDokumen,
      },
    });
  } catch (err) {
    // Hapus file fisik/storage jika proses insert DB gagal / melempar error
    await deleteFileFromStorageService(parsedInput.data.filePath);
    
    // Teruskan error ke Actions layer
    throw err;
  }
}