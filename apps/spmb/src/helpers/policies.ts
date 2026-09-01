// @spmb/src/helpers/policies.ts

export const isPendaftar = (roles: (string | number)[]) => {
  // Masukkan angka ID Role yang mewakili pendaftar, misal angka 4 dan 5
  return roles.includes(3); 
};
