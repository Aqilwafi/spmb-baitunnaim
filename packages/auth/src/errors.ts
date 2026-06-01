// packages/auth/src/errors.ts
import { isAuthError } from "@bn/supabase";
import { BaseResponse } from "@bn/types";

export function handleAuthError<E = never>(error: unknown, dataFails?: E): BaseResponse<undefined, E> {
  // 1. Pastikan ini adalah error dari SDK Supabase
  if (isAuthError(error)) {
    const msg = error.message;
    const status = error.status;

    // 2. Petakan pesan string statis dari GoTrue Backend
    const errorMap: Record<string, string> = {
      "Invalid login credentials": "Email atau password salah.",
      "Email not confirmed": "Email Anda belum dikonfirmasi. Silakan cek kotak masuk Anda.",
      "Phone not confirmed": "Nomor HP Anda belum diverifikasi.",
      "User is banned": "Akun Anda telah ditangguhkan oleh administrator.",
      "Email link is invalid or has expired": "Link verifikasi telah kedaluwarsa atau sudah pernah digunakan.",
      "Token has expired or is invalid": "Kode OTP salah atau telah kedaluwarsa.",
      "User already registered": "Email atau nomor HP sudah terdaftar.",
    };

    let finalMessage = errorMap[msg] || msg || "Terjadi kesalahan pada sistem autentikasi.";

    // Kondisi khusus jika format email bawaan supabase bermasalah
    if (msg.toLowerCase().includes("email address") && msg.toLowerCase().includes("is invalid")) {
      finalMessage = "Terjadi kesalahan pada email.";
    }

    // 3. Tangani skenario khusus berdasarkan HTTP Status (Rate Limit)
    if (status === 429 || msg.toLowerCase().includes("too many requests")) {
      finalMessage = "Terlalu banyak percobaan. Silakan coba lagi dalam beberapa menit.";
    }

    // 4. Kembalikan hasil pemetaan beserta bundle data yang gagal
    return {
      success: false,
      message: finalMessage,
      data: dataFails, 
    };
  }

  // Fallback jika terjadi crash internal di luar Supabase (misal network error murni)
  return {
    success: false,
    message: error instanceof Error ? error.message : "Terjadi kesalahan server internal.",
    data: dataFails,
  };
}