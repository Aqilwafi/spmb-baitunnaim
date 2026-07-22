// features/form/init.ts

import { getCurrentUser } from "@bn/auth";
import { checkUserAccess } from "@/utils/guards";
import { initFormSchema } from "@bn/validators";
import { getMasterTahunAjaran } from "@bn/services"; // sesuaikan path
import { mapInitFormPayload } from '../../utils/mappers';
import { upsertBiodataSiswa, insertFormPendaftaran } from "@/services/init-form";

export type InitFormPendaftaranResult =
  | { success: true; message: string; data: { id: string } }
  | { success: false; message: string };

export async function executeInitFormPendaftaran(
  payload: Record<string, FormDataEntryValue>
): Promise<InitFormPendaftaranResult> {
  if (!(await checkUserAccess())) {
    return { success: false, message: "Akses tidak diizinkan." };
  }

  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, message: "Sesi pengguna tidak ditemukan, silakan login ulang." };
  }

  const mapped = mapInitFormPayload(payload);
  const parsed = initFormSchema.safeParse(mapped);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Data formulir tidak valid.";
    return { success: false, message: firstError };
  }

  try {
      const tahunAjaran = await getMasterTahunAjaran();
      if (!tahunAjaran) {
        return { success: false, message: "Tahun ajaran aktif tidak ditemukan." };
      }

      const siswa = await upsertBiodataSiswa(user.id, parsed.data);

      const pendaftaran = await insertFormPendaftaran({
        pendaftarId: user.id,
        biodataSiswaId: siswa.id,
        tahunAjaranId: tahunAjaran.id,
        stepId: 2,
      });
    

    return { success: true, message: "Berhasil!", data: { id: pendaftaran.id } };
  } catch (error) {
    console.error("executeInitFormPendaftaran error:", error);
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}

import { getCurrentClaims } from "@bn/auth";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { pickId } from "@/utils/extract-id";
import { getBiodataSiswaIdByFormId } from "@/services/form";
import { getBiodataSiswaById } from "@/services/siswa";
import { lookupLabelById, genderLabel } from "@bn/utils";
import { getMasterLembaga, getMasterKelas } from "@bn/services";

export async function getInitFormStepData(formId: string): Promise<any|null> {
  const user = await getCurrentClaims();
  if (!user) return null;

  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) return null;

  const siswaId = await getBiodataSiswaIdByFormId(formId, tahunAjaranId);
  if (!siswaId) return null;

  const siswaData = await getBiodataSiswaById(siswaId);
  if (!siswaData) return null;

  const [lembagaOptions, kelasOptions] = await Promise.all([
    getMasterLembaga(),
    getMasterKelas(),
  ]);

  return {
    nama_lengkap: siswaData.nama_lengkap,
    nik: siswaData.nik,
    jenis_kelamin: genderLabel(siswaData.jenis_kelamin),
    tempat_lahir: siswaData.tempat_lahir,
    tanggal_lahir: siswaData.tanggal_lahir,
    lembaga_tujuan: lookupLabelById(lembagaOptions, siswaData.lembaga_id),
    kelas: lookupLabelById(kelasOptions, siswaData.kelas_id),
  };
}