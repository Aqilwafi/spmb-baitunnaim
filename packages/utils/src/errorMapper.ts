export interface AppValidationError {
  type: "VALIDATION_ERROR";
  message: string;
  errors: Record<string, string[]>;
}

// Helper untuk melempar error validasi
export function createValidationError(
  errors: Record<string, string[]>,
  message = "Terdapat kesalahan pada isian formulir."
): AppValidationError {
  return {
    type: "VALIDATION_ERROR",
    message,
    errors,
  };
}

// Guard untuk memeriksa apakah ini validation error
export function isValidationError(error: unknown): error is AppValidationError {
  return typeof error === "object" && error !== null && (error as AppValidationError).type === "VALIDATION_ERROR";
}