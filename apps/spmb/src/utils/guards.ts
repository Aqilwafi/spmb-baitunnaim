import {  isPendaftar } from "./policies";
import { getCurrentUser, validateAccess } from '@bn/auth';

export const checkUserAccess = async (): Promise<boolean> => {
  const user = await getCurrentUser(); 
  if (!user) return false;
  const userRoleId = user.app_metadata?.access_rights; 
  const isAllowed = validateAccess(userRoleId, isPendaftar);
  return isAllowed;
};
