// apps/admin/src/utils/policies.ts

export const SPMB_DOMAIN = "SPMB";
export const PUBLIKASI_DOMAIN = "PUBLIKASI";
export const ALL_DOMAINS = [SPMB_DOMAIN, PUBLIKASI_DOMAIN];

export const isVerifikator = (roles: string[]) => roles.includes("VERIFIKATOR");
export const isPublikator = (roles: string[]) => roles.includes("PUBLIKATOR");
export const isAdministrator = (roles: string[]) => roles.includes("ADMINISTRATOR");
export const isSuperAdmin = (roles: string[]) => roles.includes("SUPERADMIN");

export const isAdminLevel = (roles: string[]) =>
  isAdministrator(roles) || isSuperAdmin(roles);

export const hasSpmbAccess = (roles: string[]) =>
  isVerifikator(roles) || isAdminLevel(roles);

export const hasPublikasiAccess = (roles: string[]) =>
  isPublikator(roles) || isAdminLevel(roles);

export const hasManageAccess = (roles: string[]) => isAdminLevel(roles);