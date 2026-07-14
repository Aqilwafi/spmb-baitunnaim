// packages/constants/src/routes.ts

/**
 * Centralized Route Definitions
 * Gunakan object ini di mana pun Anda membutuhkan path URL.
 * Ini mencegah typo dan memudahkan perubahan struktur URL di masa depan.
 */
export const ROUTES = {
  // -- Auth Routes --
  AUTH: {
    LOGIN: "/login",          // Sesuaikan dengan path login apps Anda
    LOGOUT: "/logout",
    REGISTER: "/register",
    FORGOT_PASSWORD: "/lupa-password",
    RESET_PASSWORD: "/reset-password",
    // Path callback untuk Supabase Auth
    CALLBACK: "/auth/callback", 
  },

  // -- Admin Routes --
  ADMIN: {
    DASHBOARD: "/dashboard",
    USER_MANAGEMENT: "/dashboard/manage/admin",
    DATA_SISWA: "/dashboard/manage/users",
    PUBLIKASI: "/dashboard/publikasi",
    // SPMB Management di dalam Admin
    SPMB_BIODATA: "/dashboard/spmb/biodata",
    SPMB_DOKUMEN: "/dashboard/spmb/dokumen",
  },

  // -- SPMB (User) Routes --
  SPMB: {
    DASHBOARD: "/dashboard",  // Bisa sama dengan admin, middleware yang bedain
    PENDAFTARAN: "/dashboard/pendaftaran",
  },

  // -- Website (Public) Routes --
  WEBSITE: {
    HOME: "/",
    ABOUT: "/about",
    CONTACT: "/contact",
    TOS: "/terms",
    PRIVACY: "/privacy",
    // Halaman publikasi dinamis
    PUBLIKASI: (slug: string) => `/publikasi/${slug}`,
  },
} as const; // 'as const' membuat object ini readonly dan inferensi tipenya kuat

// Contoh tipe data rute (berguna untuk TypeScript)
export type AppRoutes = typeof ROUTES;