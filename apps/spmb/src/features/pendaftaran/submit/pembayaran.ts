import { insertPembayaran } from "@/services/pendaftaran/pembayaran";
import { deleteFileFromStorageService } from "@/services/file/delete"; 
import { formIdParamsSchema, pembayaranUploadPathSchema, formatZodErrors } from "@bn/validators";
import type { FormSubmitResult } from '@bn/types';
import { checkUserAccess } from "../../auth/guards";
import {  createValidationError } from "@bn/utils";
import type { ProcessDocumentUpload } from "@/types/form.types";

export async function submitPembayaran(input: ProcessDocumentUpload): Promise<FormSubmitResult> {
  
  // 1. Auth
  if (!(await checkUserAccess())) {
      throw new Error("Akses tidak diizinkan.");
  }

  // 2. Validasi formId
  const parsedFormId = formIdParamsSchema.safeParse({ formId: input.formId });
  if (!parsedFormId.success) {
    throw createValidationError(
      formatZodErrors(parsedFormId.error),
      parsedFormId.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  // 3. Validasi & sanitasi filePath
  const parsedFilePath = pembayaranUploadPathSchema.safeParse({ filePath: input.filePath });
  if (!parsedFilePath.success) {
    throw createValidationError(
      formatZodErrors(parsedFilePath.error),
      parsedFilePath.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }

  // 4. Eksekusi service + cleanup jika gagal
  try {
    return await insertPembayaran({
      formId: parsedFormId.data,
      filePath: parsedFilePath.data.filePath,
    });
  } catch (err) {
    // Hapus file fisik/storage jika proses insert DB gagal / melempar error
    await deleteFileFromStorageService(parsedFilePath.data.filePath);
    
    // Teruskan error ke Actions layer
    throw err;
  }
}