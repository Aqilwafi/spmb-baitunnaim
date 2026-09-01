import {
  getPembayaranByFormId,
  getSignedBuktiPembayaranUrl,
  createBuktiPembayaranSignedUrl,
} from "@bn/services";
import type { PembayaranStepData } from "@/components/step/clients/PembayaranStep";
import { requestUploadMetadataSchema } from "@bn/validators";
import { getCurrentClaims } from "@bn/auth";

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

export async function createPembayaranSignedUrl(body: unknown) {
  // 1. Authenticated User Check
  const user = await getCurrentClaims();
  const userId = user?.sub || user?.id;

  if (!user || !userId) {
    return { error: "Unauthorized: Silakan login terlebih dahulu", status: 401 };
  }

  // 2. Validasi Payload via Zod Schema
  const validation = requestUploadMetadataSchema.safeParse(body);
  if (!validation.success) {
    return {
      error: validation.error.issues[0]?.message || "Bad Request",
      status: 400,
    };
  }

  // 3. Generate Path & Panggil Service
  const { fileName } = validation.data;
  const filePath = `bukti-pembayaran/${userId}/${Date.now()}-${fileName}`;

  const result = await createBuktiPembayaranSignedUrl(filePath);

  // 4. Handling Error dari Service Layer
  if (!result || "error" in result) {
    return {
      error: result?.error || "Gagal membuat URL upload",
      status: result?.status || 500,
    };
  }

  return {
    data: result.data,
    status: 200,
  };
}