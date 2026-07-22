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