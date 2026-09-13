import { isPendaftar } from "@/helpers/policies";
import { getCurrentUser, getCurrentClaims } from '@bn/auth'
import { validateAccess } from '@bn/auth/utils';
import { formIdParamsSchema } from "@bn/validators";
import { getFormPendaftaranByPendaftarId } from "@bn/services";

export const checkUserAccess = async (): Promise<boolean> => {
  const user = await getCurrentUser(); 
  if (!user) return false;
  const isAllowed = validateAccess(user, isPendaftar);
  return isAllowed;
};

export async function isAccessAllowed(formId: string) {
  
  const safe = formIdParamsSchema.safeParse(formId);
  if (!safe.success) {
    return { allowed: false, reason: "INVALID_FORMAT" };
  }

  const claims = await getCurrentClaims();
  if (!claims) return { allowed: false };
 

  const data = await getFormPendaftaranByPendaftarId(safe.data);
  const isOwner = claims.sub === data?.pendaftar_id;
  
  return { 
    allowed: !!claims && isOwner, 
  };
}