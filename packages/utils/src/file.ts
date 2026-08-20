export interface FileValidationOptions {
  maxSizeMB?: number;
  allowedExtensions?: string[];
}

export interface FileValidationResult {
  valid: boolean;
  error?: string;
  extension: string;
  sizeMB: string;
}

/**
 * Mengubah ukuran file dalam bytes menjadi format MB yang terbaca (string)
 */
export const formatFileSizeMB = (bytes: number): string => {
  return (bytes / (1024 * 1024)).toFixed(2);
};

/**
 * Mengambil ekstensi file dari nama file (tanpa tanda titik, lowercase)
 */
export const getFileExtension = (fileName: string): string => {
  return fileName.split(".").pop()?.toLowerCase() || "";
};

/**
 * Memvalidasi ukuran dan ekstensi file
 */
export const validateFile = (
  file: File,
  options: FileValidationOptions = {}
): FileValidationResult => {
  const { maxSizeMB = 2, allowedExtensions = ["jpg", "jpeg", "png", "pdf"] } = options;

  const extension = getFileExtension(file.name);
  const sizeMB = formatFileSizeMB(file.size);
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  // Cek ekstensi
  if (allowedExtensions.length > 0 && !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: `Format file .${extension} tidak diizinkan. Gunakan: ${allowedExtensions.join(", ")}`,
      extension,
      sizeMB,
    };
  }

  // Cek ukuran file
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `Ukuran file (${sizeMB} MB) melebihi batas maksimal ${maxSizeMB} MB.`,
      extension,
      sizeMB,
    };
  }

  return {
    valid: true,
    extension,
    sizeMB,
  };
};