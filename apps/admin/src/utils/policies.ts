// 📄 File: apps/dashboard/src/utils/policies.ts

// 1. Tentukan nama DOMAIN utama untuk aplikasi ini.
//    Next.js akan tahu kalau aplikasi ini khusus mengurus urusan "SPMB"
export const CURRENT_DOMAIN = "SPMB";

/**
 * 2. KUMPULAN ATURAN (POLICIES)
 * Fungsi-fungsi di bawah ini bertugas menerima array role hasil saringan,
 * lalu mengembalikan nilai true jika memenuhi syarat.
 */

// Aturan A: Khusus Administrator saja

export const isPendaftar = (roles: string[]) => roles.includes("PENDAFTAR");

export const isAdmin = (roles: string[]) => roles.includes("ADMINISTRATOR");

// Aturan B: Boleh Administrator, boleh juga Verifikator (Multi-role friendly!)
export const isStaffAtauAdmin = (roles: string[]) => 
  roles.includes("ADMINISTRATOR") || roles.includes("VERIFIKATOR");

// Aturan C: Khusus Verifikator saja
export const isVerifikatorOnly = (roles: string[]) => roles.includes("VERIFIKATOR");