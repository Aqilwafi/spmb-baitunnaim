import { AuthError, AuthApiError } from '@supabase/supabase-js';

export interface AuthErrorResponse {
  message: string;
  code?: string;
  status?: number;
}

/**
 * Kamus lengkap penerjemah error code Supabase Auth
 * berdasarkan dokumentasi resmi: https://supabase.com/docs/guides/auth/debugging/error-codes
 */
const AUTH_ERROR_MESSAGES: Record<string, string> = {
  // General & Credentials
  invalid_credentials: 'Email atau kata sandi yang Anda masukkan salah.',
  email_exists: 'Email ini sudah terdaftar di sistem kami.',
  phone_exists: 'Nomor telepon ini sudah terdaftar di sistem kami.',
  email_not_confirmed: 'Silakan konfirmasi email Anda terlebih dahulu sebelum masuk.',
  phone_not_confirmed: 'Silakan konfirmasi nomor telepon Anda terlebih dahulu.',
  email_address_invalid: 'Domain email contoh atau uji coba tidak didukung. Gunakan email yang valid.',
  email_address_not_authorized: 'Pengiriman email tidak diizinkan untuk alamat ini (menggunakan SMTP default).',
  user_already_exists: 'Pengguna dengan data ini sudah ada.',
  user_not_found: 'Pengguna tidak ditemukan di sistem.',
  user_banned: 'Akun Anda telah ditangguhkan (banned).',
  user_sso_managed: 'Data ini dikelola melalui SSO dan tidak dapat diubah secara manual.',
  validation_failed: 'Data yang dikirim tidak sesuai format yang diharapkan.',
  bad_json: 'Format permintaan tidak valid.',
  no_authorization: 'Permintaan ini memerlukan header otorisasi.',
  not_admin: 'Anda tidak memiliki akses admin untuk aksi ini.',
  request_timeout: 'Permintaan memakan waktu terlalu lama. Silakan coba lagi.',
  conflict: 'Terjadi konflik permintaan. Silakan coba beberapa saat lagi.',
  captcha_failed: 'Verifikasi captcha gagal. Silakan coba lagi.',
  signup_disabled: 'Pendaftaran akun baru saat ini dinonaktifkan.',
  invite_not_found: 'Undangan tidak ditemukan atau sudah kedaluwarsa.',

  // Password & Security
  weak_password: 'Kata sandi terlalu lemah. Harap gunakan kriteria keamanan yang lebih tinggi.',
  same_password: 'Kata sandi baru harus berbeda dengan kata sandi saat ini.',
  reauthentication_needed: 'Anda harus melakukan autentikasi ulang sebelum mengubah kata sandi.',
  reauthentication_not_valid: 'Kode re-autentikasi tidak valid atau salah.',

  // OTP, Token, & Session
  otp_disabled: 'Masuk menggunakan OTP dinonaktifkan pada server.',
  otp_expired: 'Kode OTP telah kedaluwarsa. Silakan minta kode baru.',
  bad_jwt: 'Token autentikasi (JWT) tidak valid.',
  refresh_token_not_found: 'Sesi tidak ditemukan. Silakan masuk kembali.',
  refresh_token_already_used: 'Token sesi telah kedaluwarsa atau sudah digunakan sebelumnya.',
  session_expired: 'Sesi Anda telah kedaluwarsa karena tidak aktif.',
  session_not_found: 'Sesi tidak ditemukan atau Anda telah keluar (signed out).',

  // PKCE & Flow State
  flow_state_expired: 'Sesi alur autentikasi (PKCE) telah kedaluwarsa. Silakan masuk kembali.',
  flow_state_not_found: 'Sesi alur autentikasi tidak ditemukan atau sudah kedaluwarsa.',
  bad_code_verifier: 'Terjadi kesalahan pada implementasi klien (kode verifikator tidak cocok).',

  // Rate Limits
  over_request_rate_limit: 'Terlalu banyak permintaan dari perangkat Anda. Silakan coba beberapa saat lagi.',
  over_email_send_rate_limit: 'Terlalu banyak email dikirim ke alamat ini. Harap tunggu beberapa saat.',
  over_sms_send_rate_limit: 'Terlalu banyak SMS dikirim ke nomor ini. Harap tunggu beberapa saat.',

  // MFA (Multi-Factor Authentication)
  insufficient_aal: 'Memerlukan tingkat keamanan tambahan (MFA). Selesaikan tantangan MFA.',
  mfa_challenge_expired: 'Waktu respons tantangan MFA telah habis. Minta tantangan baru.',
  mfa_verification_failed: 'Kode verifikasi MFA salah.',
  mfa_verification_rejected: 'Verifikasi MFA ditolak.',
  mfa_factor_not_found: 'Faktor MFA tidak ditemukan.',
  mfa_factor_name_conflict: 'Nama faktor MFA ini sudah digunakan, gunakan nama lain.',
  mfa_ip_address_mismatch: 'Verifikasi MFA gagal karena perubahan alamat IP selama proses pendaftaran.',
  mfa_verified_factor_exists: 'Faktor telepon terverifikasi sudah ada. Hapus faktor lama untuk melanjutkan.',
  mfa_totp_enroll_disabled: 'Pendaftaran faktor MFA TOTP dinonaktifkan.',
  mfa_totp_verify_disabled: 'Login melalui MFA TOTP dinonaktifkan.',
  mfa_phone_enroll_disabled: 'Pendaftaran faktor MFA telepon dinonaktifkan.',
  mfa_phone_verify_disabled: 'Login melalui MFA telepon dinonaktifkan.',
  too_many_enrolled_mfa_factors: 'Anda telah mencapai batas maksimum faktor MFA yang dapat didaftarkan.',

  // Identity Linking
  identity_already_exists: 'Identitas ini sudah terhubung dengan akun lain.',
  identity_not_found: 'Identitas tidak ditemukan.',
  manual_linking_disabled: 'Fitur menghubungkan akun secara manual dinonaktifkan.',
  single_identity_not_deletable: 'Tidak dapat menghapus satu-satunya metode masuk yang Anda miliki.',
  email_conflict_identity_not_deletable:
    'Tidak dapat memutuskan identitas ini karena email akan bertabrakan dengan akun lain.',

  // Providers & OAuth
  anonymous_provider_disabled: 'Fitur masuk anonim dinonaktifkan.',
  email_provider_disabled: 'Pendaftaran dengan email dan kata sandi dinonaktifkan.',
  phone_provider_disabled: 'Pendaftaran dengan nomor telepon dinonaktifkan.',
  provider_disabled: 'Provider OAuth ini dinonaktifkan.',
  oauth_provider_not_supported: 'Provider OAuth tidak didukung atau dimatikan pada server.',
  provider_email_needs_verification: 'Email dari provider OAuth perlu diverifikasi terlebih dahulu.',
  bad_oauth_callback: 'Callback dari provider OAuth tidak valid.',
  bad_oauth_state: 'State OAuth tidak valid atau rusak.',

  // SMS
  sms_send_failed: 'Gagal mengirim SMS. Silakan coba lagi atau periksa konfigurasi provider.',

  // SAML / SSO (Enterprise)
  saml_provider_disabled: 'Enterprise SSO dengan SAML 2.0 tidak diaktifkan pada server.',
  saml_idp_not_found: 'Penyedia identitas SAML tidak ditemukan.',
  saml_idp_already_exists: 'Penyedia identitas SAML ini sudah terdaftar.',
  saml_metadata_fetch_failed: 'Gagal mengambil metadata SAML dari URL yang diberikan.',
  saml_entity_id_mismatch: 'Entity ID SAML tidak cocok dengan data yang tersimpan.',
  saml_assertion_no_email: 'Assertion SAML tidak menyertakan alamat email.',
  saml_assertion_no_user_id: 'Assertion SAML tidak menyertakan ID pengguna (NameID).',
  saml_relay_state_expired: 'Sesi relay state SAML telah kedaluwarsa. Silakan masuk kembali.',
  saml_relay_state_not_found: 'Sesi relay state SAML tidak ditemukan. Silakan masuk kembali.',
  sso_domain_already_exists: 'Domain SSO ini sudah terdaftar pada penyedia identitas lain.',
  sso_provider_not_found: 'Penyedia SSO tidak ditemukan.',

  // Hooks & Server
  hook_timeout: 'Waktu proses server hook habis (timeout).',
  hook_timeout_after_retry: 'Gagal mencapai server hook setelah beberapa kali percobaan.',
  hook_payload_over_size_limit: 'Ukuran data melebihi batas maksimum yang diizinkan.',
  unexpected_audience: 'Audience token tidak sesuai (fitur deprecated).',
  unexpected_failure: 'Terjadi gangguan internal pada server Auth.',
};

/**
 * Fungsi utama untuk menangani dan memetakan error Supabase Auth
 */
export function handleSupabaseAuthError(error: unknown): AuthErrorResponse {
  // 1. Error dari Supabase Auth API (punya .code dan .status)
  if (error instanceof AuthApiError) {
    const customMessage = error.code ? AUTH_ERROR_MESSAGES[error.code] : undefined;
    return {
      message: customMessage || error.message || 'Terjadi kesalahan pada layanan autentikasi.',
      code: error.code,
      status: error.status,
    };
  }

  // 2. Error umum dari AuthError klien
  if (error instanceof AuthError) {
    return {
      message: error.message,
      code: error.name,
    };
  }

  // 3. Error standar JavaScript
  if (error instanceof Error) {
    return {
      message: error.message,
    };
  }

  // 4. Fallback jika tipe error tidak dikenali
  return {
    message: 'Terjadi kesalahan yang tidak diketahui.',
  };
}

/**
 * Utilitas untuk memeriksa apakah error yang ditangkap memiliki kode spesifik
 */
export function isAuthErrorCode(error: unknown, code: string): boolean {
  return error instanceof AuthApiError && error.code === code;
}