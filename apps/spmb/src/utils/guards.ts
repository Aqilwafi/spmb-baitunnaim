import { CURRENT_DOMAIN, isPendaftar } from "./policies";
import { getCurrentUser, validateAccess } from '@bn/auth';

export const checkUserAccess = async (): Promise<boolean> => {
  const user = await getCurrentUser(); 
  if (!user) return false;
  const userData = user.app_metadata?.access_rights; 
  const isAllowed = validateAccess(userData, CURRENT_DOMAIN, isPendaftar);
  return isAllowed;
};
