// apps/admin/src/utils/policies.ts

const isSuperAdmin = (roles: (string | number)[]) => roles.includes(1);
const isAdministrator = (roles: (string | number)[]) => roles.includes(2);
const isVerifikator = (roles: (string | number)[]) => roles.includes(4);
const isPublikator = (roles: (string | number)[]) => roles.includes(5);

export const isHighAdminLevel = (roles: (string | number)[]) =>
  isAdministrator(roles) || isSuperAdmin(roles);

export const hasSpmbAccess = (roles: (string | number)[]) =>
  isVerifikator(roles) || isHighAdminLevel(roles);

export const hasPublikasiAccess = (roles: (string | number)[]) =>
  isPublikator(roles) || isHighAdminLevel(roles);

export const hasManageAccess = (roles: (string | number)[]) => isHighAdminLevel(roles);