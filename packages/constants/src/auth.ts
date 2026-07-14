// packages/constants/src/auth.ts
import { ROUTES } from "@bn/constants";

/**
 * Daftar role ID yang konsisten dengan database Anda.
 * Pastikan ini sama dengan isi tabel 'master_roles' di database_design.
 */
export const ROLES = {
  SUPERADMIN: "superadmin",
  ADMIN_PST: "admin_pst",    // Admin Pusat
  ADMIN_LPI: "admin_lpi",    // Admin Lembaga
  SISWA: "siswa",
} as const;

// Default redirect path setelah login berhasil (fallback)
export const DEFAULT_AFTER_LOGIN_PATH = ROUTES.ADMIN.DASHBOARD; // Default ke admin dashboard

// Key untuk menyimpan session atau redirect target di localStorage/sessionStorage
export const AUTH_STORAGE_KEYS = {
  LAST_PATH: "bn_last_attempted_path",
} as const;