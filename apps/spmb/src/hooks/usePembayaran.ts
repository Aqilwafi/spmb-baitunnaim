// apps/spmb/src/components/step/clients/hooks/useUploadPembayaran.ts

"use client";

import { useState, useCallback } from "react";
import { createSupabaseBrowser } from "@bn/supabase/browser";
import { submitPembayaranAction } from "@/actions/pembayaran-actions";

type UploadStage =
  | "idle"
  | "requesting-token"
  | "uploading"
  | "submitting"
  | "success"
  | "error";

interface UseUploadPembayaranParams {
  formId: string;
  stepId?: number;
}

interface UseUploadPembayaranState {
  stage: UploadStage;
  error: string | null;
  nextStep: number | null;
}

export function useUploadPembayaran({ formId, stepId }: UseUploadPembayaranParams) {
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
        // 1. Minta signed upload token
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

        // 2. Upload langsung ke Supabase Storage
        setState((prev) => ({ ...prev, stage: "uploading" }));

        const supabase = createSupabaseBrowser();
        const { error: uploadError } = await supabase.storage
          .from("SPMB")
          .uploadToSignedUrl(path, token, file);

        if (uploadError) {
          throw new Error(uploadError.message);
        }

        // 3. Submit ke server action -> service -> RPC
        setState((prev) => ({ ...prev, stage: "submitting" }));

        const result = await submitPembayaranAction({
          formId,
          filePath: path,
          
        });

        if (!result.success) {
          throw new Error(result.error.code || "Gagal mengirim bukti pembayaran.");
        }

        setState({ stage: "success", error: null, nextStep: result?.data?.nextStep ?? null });
        return result.data;
      } catch (err) {
        const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
        setState({ stage: "error", error: message, nextStep: null });
        throw err;
      }
    },
    [formId, stepId]
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