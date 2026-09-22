// import "server-only";
// import { createSupabaseServer } from "@bn/supabase/server";
// import type { DokumenStepData } from "@/types/form.types";
// import type { RPCGetDokumen, BaseRPCParams} from "@bn/types";

// interface RPCParams extends BaseRPCParams {
//     tipeDokumenId: number
// }

// export async function getDokumenByTipe({ formId, tipeDokumenId }: RPCParams): Promise<DokumenStepData | null> {
//   const supabase = await createSupabaseServer();

//   const { data, error } = await supabase
//     .rpc('fn_rpc_get_dokumen_by_tipe', {
//       p_form_id: formId,
//       p_tipe_dokumen_id: tipeDokumenId,
//     })
//     .maybeSingle<RPCGetDokumen>();

//   if (error) throw error;
//   if (!data) return null;

//   return {
//     id: data.id,
//     formPendaftaranId: data.form_pendaftaran_id,
//     tipeDokumenId: data.tipe_dokumen_id,
//     fileUrl: data.file_url,
//     documentStatus: data.document_status,
//     catatanVerifikasi: data.catatan_verifikasi,
//     verifiedBy: data.verified_by,
//     verifiedAt: data.verified_at,
//     uploadedAt: data.uploaded_at,
//     };
// }