import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { PembayaranStepData } from "@/types/form.types";
import type { RPCGetPembayaranResult, BaseRPCParams} from "@/types/rpc.types";

export async function getPembayaran({ formId }: BaseRPCParams): Promise<PembayaranStepData | null> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .rpc('fn_rpc_get_pembayaran_data', {
      p_form_id: formId,
    })
    .maybeSingle<RPCGetPembayaranResult>();

  if (error) throw error;
  if (!data) return null;

  return {
    urlBuktiBayar: data.bukti_pembayaran_url,
    paymentStatus: data.payment_status,
    uploadedAt: data.created_at,
    verifiedAt: data.verified_at,
    verifiedBy: data.verified_by,
  };
}