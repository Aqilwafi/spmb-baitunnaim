// 📄 File: packages/auth/src/utils/rbac.ts

// 1. Definisikan tipe data struktur User dari Supabase/Auth kamu
interface UserSessionData {
  app_metadata?: {
    access_rights?: string[];
  };
}

// 2. Fungsi pembantu (internal) untuk memecah teks "SPMB:ADMINISTRATOR" 
//    menjadi { domain: "SPMB", role: "ADMINISTRATOR" }
function parseAccessRight(right: string) {
  const [domain, role] = right.split(":");
  return { 
    domain: domain?.toUpperCase(), 
    role: role?.toUpperCase() 
  };
}

/**
 * 3. MESIN UTAMA GLOBAL (validateAccess)
 * Fungsi ini yang akan di-import oleh aplikasi-aplikasi kamu.
 */
export function validateAccess(
  sessionUser: UserSessionData | undefined | null,
  currentDomain: string | string[], // 💡 Ubah ini agar bisa menerima string tunggal atau Array
  policyCheck: (roles: string[]) => boolean
): boolean {
  if (!sessionUser?.app_metadata?.access_rights) return false;

  // Ubah input domain menjadi array agar seragam saat diproses
  const domainsToCheck = Array.isArray(currentDomain)
    ? currentDomain.map(d => d.toUpperCase())
    : [currentDomain.toUpperCase()];

  // Proses Saringan: Ambil semua role yang cocok dengan domain-domain yang diizinkan
  const userRolesInDomain = sessionUser.app_metadata.access_rights
    .map(parseAccessRight)
    .filter((item) => domainsToCheck.includes(item.domain)) // 💡 Sekarang mengecek apakah ada di dalam list array
    .map((item) => item.role);

  if (userRolesInDomain.length === 0) return false;

  return policyCheck(userRolesInDomain);
}