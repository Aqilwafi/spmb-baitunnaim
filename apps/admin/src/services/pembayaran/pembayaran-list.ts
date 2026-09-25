import "server-only";
import { createSupabaseServer } from "@bn/supabase/server";
import type { Pembayaran, BiodataSiswa } from "@bn/types";

export interface PembayaranList {
    id: Pembayaran['id'];
    buktiBayar: Pembayaran['bukti_pembayaran_url'];
    namaLengkap: BiodataSiswa['nama_lengkap'];
    createdAt: Pembayaran['created_at'];
    status: Pembayaran['payment_status'];
    verifiedAt: Pembayaran['verified_at'];
    verifiedBy: Pembayaran['verified_by'];
}

export async function getPembayaranList(): Promise<PembayaranList[]> {
  const supabase = await createSupabaseServer();

  const { data, error } = await supabase
    .from('form_pendaftaran')
    .select(`
      id,
      
      biodata_siswa:biodata_siswa_id (
        nama_lengkap
      ),
      pembayaran!inner (
        id,
        bukti_pembayaran_url,
        created_at,
        payment_status,
        verified_at,
        verified_by
      )
    `);

  if (error) throw error;
  if (!data) return [];

  // Mapping hasil return sesuai dengan permintaan kamu:
  // id (dari form_pendaftaran.id), created_at, dan nama_lengkap dari biodata_siswa
  return data.map((item: any) => ({
    id: item.id,
    createdAt: item.pembayaran.created_at,
    namaLengkap: item.biodata_siswa.nama_lengkap,
    buktiBayar: item.pembayaran.bukti_pembayaran_url,
    status: item.pembayaran.payment_status,
    verifiedAt: item.pembayaran.verified_at,
    verifiedBy: item.pembayaran.verified_by,
  }));
}