// apps/admin/src/utils/policies.ts

export const isVerifikator = (roles: (string | number)[]) => roles.includes(4);
export const isPublikator = (roles: (string | number)[]) => roles.includes(5);
export const isAdministrator = (roles: (string | number)[]) => roles.includes(2);
export const isSuperAdmin = (roles: (string | number)[]) => roles.includes(1);

export const isAdminLevel = (roles: (string | number)[]) =>
  isAdministrator(roles) || isSuperAdmin(roles);

export const hasSpmbAccess = (roles: (string | number)[]) =>
  isVerifikator(roles) || isAdminLevel(roles);

export const hasPublikasiAccess = (roles: (string | number)[]) =>
  isPublikator(roles) || isAdminLevel(roles);

export const hasManageAccess = (roles: (string | number)[]) => isAdminLevel(roles);