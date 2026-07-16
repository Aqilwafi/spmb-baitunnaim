import {  isPendaftar } from "./policies";
import { getCurrentUser } from '@bn/auth'
import { validateAccess } from '@bn/auth/utils';

export const checkUserAccess = async (): Promise<boolean> => {
  const user = await getCurrentUser(); 
  if (!user) return false;
  const userRoleId = user.app_metadata?.access_rights; 
  const isAllowed = validateAccess(user, isPendaftar);
  return isAllowed;
};
