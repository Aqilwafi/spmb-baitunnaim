"use client";

import { useState, useCallback } from "react";
import { uploadFileToSignedUrl } from "@/services/upload/file";
import { submitPembayaranAction } from "@/actions/pendaftaran/pembayaran";

type UploadStage =
  | "idle"
  | "requesting-token"
  | "uploading"
  | "submitting"
  | "success"
  | "error";

interface UseUploadPembayaranParams {
  formId: string;
}

interface UseUploadPembayaranState {
  stage: UploadStage;
  error: string | null;
  nextStep: number | null;
}

export function useUploadPembayaran({ formId }: UseUploadPembayaranParams) {
  const [state, setState] = useState<UseUploadPembayaranState>({
    stage: "idle",
    error: null,
    nextStep: null,
  });

  const reset = useCallback(() => {
    setState({ stage: "idle", error: null, nextStep: null });
  }, []);

  const upload = useCallback(
    async (file: File) => {
      setState({ stage: "requesting-token", error: null, nextStep: null });

      try {
        // 1. Request signed upload token dari API Route
        const tokenRes = await fetch("/api/request-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
          }),
        });

        const tokenJson = await tokenRes.json();

        if (!tokenRes.ok) {
          throw new Error(tokenJson.error ?? "Gagal membuat signed URL upload.");
        }

        const { path, token } = tokenJson as { path: string; token: string };

        // 2. Direct upload ke Supabase Storage via Service Adapter
        setState((prev) => ({ ...prev, stage: "uploading" }));

        await uploadFileToSignedUrl({
          bucket: "SPMB",
          path,
          token,
          file,
        });

        // 3. Submit metadata/path ke Server Action
        setState((prev) => ({ ...prev, stage: "submitting" }));

        const result = await submitPembayaranAction({
          formId,
          filePath: path,
        });

        if (!result.success) {
          throw new Error(result.message || "Gagal mengirim bukti pembayaran.");
        }

        setState({
          stage: "success",
          error: null,
          nextStep: result.data?.nextStep ?? null,
        });

        return result.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
        setState({ stage: "error", error: message, nextStep: null });
        throw err;
      }
    },
    [formId]
  );

  return {
    ...state,
    upload,
    reset,
    isLoading:
      state.stage === "requesting-token" ||
      state.stage === "uploading" ||
      state.stage === "submitting",
  };
}