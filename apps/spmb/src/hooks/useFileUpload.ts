// packages/features/src/upload/useFileUpload.ts
"use client";

import { useState } from "react";
import { uploadFileToSignedUrl } from "@/services/file/upload";
import type { RequestUploadMetadataInput } from "@bn/validators";
import type { ActionResponse } from "@bn/types";

export interface UploadFileOptions {
  file: File;
  category: RequestUploadMetadataInput["category"];
  documentType?: RequestUploadMetadataInput["documentType"];
}

export function useFileUpload() {
  const [isUploading, setIsUploading] = useState(false);

  const upload = async ({
    file,
    category,
    documentType,
  }: UploadFileOptions): Promise<ActionResponse<string>> => {
    setIsUploading(true);

    try {
      // 1. Minta Signed URL & Path ke API Route
      const res = await fetch("/api/request-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          category,
          documentType,
        }),
      });

      const result = await res.json();

      // Jika HTTP Error / Validation Error dari API Route
      if (!res.ok) {
        return {
          success: false,
          message: result.message || result.error || "Gagal meminta URL upload.",
          errors: result.errors,
        };
      }

      const { path, token } = result;

      // 2. Direct Upload via SDK ke Storage Supabase
      await uploadFileToSignedUrl({
        bucket: "SPMB",
        path,
        token,
        file,
      });

      // 3. Return Berhasil (Format ActionResponse<string>)
      return {
        success: true,
        message: "File berhasil diunggah ke storage.",
        data: path, // Mengembalikan string filePath
      };
    } catch (error) {
      // Standarisasi error penanganan persis seperti di Server Action
      return {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengunggah file.",
      };
    } finally {
      setIsUploading(false);
    }
  };

  return {
    upload,
    isUploading,
  };
}