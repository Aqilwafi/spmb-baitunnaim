import { isPendaftar } from "./policies";
import { getCurrentUser, getCurrentClaims } from '@bn/auth'
import { validateAccess } from '@bn/auth/utils';
import { getPendaftarIdByFormId } from "@/services/user";

export const checkUserAccess = async (): Promise<boolean> => {
  const user = await getCurrentUser(); 
  if (!user) return false;
  const isAllowed = validateAccess(user, isPendaftar);
  return isAllowed;
};

export async function isAccessAllowed(pendaftaranId: string) {
  
  const claims = await getCurrentClaims();
  if (!claims) return { allowed: false };;

  const data = await getPendaftarIdByFormId(pendaftaranId);
  const isOwner = claims.sub === data?.pendaftar_id;
  
  return { 
    allowed: !!claims && isOwner, 
  };
}