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
  stepOrder: number | null | undefined,
  currentStepOrder: number | null | undefined
): StepStatus {

  if (stepOrder == null) {
    return "locked";
  }
  if (currentStepOrder == null) {
    return "locked";
  }

  if (stepOrder < currentStepOrder) {
    return "complete";
  }

  if (stepOrder === currentStepOrder) {
    return "active";
  }

  return "locked";
}