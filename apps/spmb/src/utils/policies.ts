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
