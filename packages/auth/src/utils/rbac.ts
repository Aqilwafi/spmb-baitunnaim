// 📄 File: packages/auth/src/utils/rbac.ts

import { GetUserResponse } from "@bn/types";

// 1. Definisikan tipe data struktur User dari Supabase dengan role berbasis angka/string
interface UserData {
  app_metadata?: {
    access_rights?: (number | string)[]; // 💡 Bisa menampung [4, 5] atau ["admin", "staff"]
  };
}

/**
 * 2. MESIN UTAMA GLOBAL (validateAccess) - Cek Role Saja
 * Memeriksa apakah user memiliki salah satu dari role yang diizinkan oleh kebijakan (policyCheck).
 */
export function validateAccess(
  userData: GetUserResponse | UserData | undefined | null,
  policyCheck: (roles: (number | string)[]) => boolean
): boolean {
  // Jika user tidak punya hak akses atau array kosong, langsung tolak
  const userRoles = userData?.app_metadata?.access_rights;
  if (!userRoles || userRoles.length === 0) return false;

  // Langsung lempar semua list role milik user ke fungsi kebijakan penentu
  return policyCheck(userRoles);
}