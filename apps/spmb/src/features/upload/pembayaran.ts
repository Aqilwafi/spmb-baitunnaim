import {
  getPembayaranByFormId,
  getSignedBuktiPembayaranUrl,
} from "@bn/services";
import type { PembayaranStepData } from "@/components/step/clients/PembayaranStep";

export async function getPembayaranStepData(
  formId: string
): Promise<PembayaranStepData | null> {
  const pembayaran = await getPembayaranByFormId(formId);
  if (!pembayaran) return null;

  const signedUrl = await getSignedBuktiPembayaranUrl(
    pembayaran.bukti_pembayaran_url
  );
  if (!signedUrl) return null;

  return {
    bukti_bayar_url: signedUrl,
    uploaded_at: pembayaran.tanggal_transfer ?? pembayaran.created_at,
  };
}