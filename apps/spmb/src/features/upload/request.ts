// /features/upload/request.ts

import { getCurrentClaims } from "@bn/auth";
import { createValidationError } from "@bn/utils";
import { requestUploadMetadataSchema, formatZodErrors } from "@bn/validators";
import { requestSignedUrl, type SignedUrlResponse } from "@/services/file/url";

export type RequestUploadInput = unknown; // Menampung raw JSON body dari request

export async function requestUpload(input: RequestUploadInput): Promise<SignedUrlResponse> {

    // 1. Guard Access
    const claims = await getCurrentClaims();
    if (!claims) throw new Error("Akses tidak diizinkan.");
  
    

    // 2. Parse & Validasi Payload JSON
    const validation = requestUploadMetadataSchema.safeParse(input);

    if (!validation.success) {
        throw createValidationError(
            formatZodErrors(validation.error),
            validation.error.issues[0]?.message ?? "Data formulir tidak valid."
        );
    }

    const { fileName, category, documentType } = validation.data;

    // 3. Logika Renaming & Path (User ID konsisten di segmen kedua)
    const folderPrefix =
        category === "bukti-pembayaran"
        ? `bukti-pembayaran/${claims?.sub}`
        : `berkas-pendaftaran/${claims?.sub}/${documentType ?? "umum"}`;

    const uniqueFileName = `${Date.now()}-${fileName}`;
    const filePath = `${folderPrefix}/${uniqueFileName}`;

    return await requestSignedUrl(filePath);
}