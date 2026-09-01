// @spmb/src/helpers/step-rules.ts

import type { StepStatus } from "@/types/step.types";

/**
 * Menentukan status sebuah step berdasarkan posisi relatifnya
 * terhadap current_step_id milik pendaftaran.
 *
 * - id < currentStepId  -> complete (data sudah tersimpan, boleh fetch)
 * - id === currentStepId -> active   (form kosong, TIDAK fetch)
 * - id > currentStepId  -> locked   (tidak dirender, tidak fetch)
 */
export function computeStepStatus(
  stepId: number,
  currentStepId: number | null
): StepStatus {
  if (!currentStepId) return 'locked';
  if (stepId < currentStepId) return "complete";
  if (stepId === currentStepId) return "active";
  return "locked";
}