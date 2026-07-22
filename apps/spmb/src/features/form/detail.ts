// features/form/detail.ts

import { getPartFormPendaftaranByPendaftarIdAndTahunAjaranId } from "@/services/form";
import { getNamaLengkapById } from "@/services/siswa";
import type { DetailPendaftaran } from "@/types/step.types";
import { getCurrentUser } from "@bn/auth";
import { pickId } from "@/utils/extract-id";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";

export async function getDetailPendaftaran(): Promise<DetailPendaftaran|null> {

    const user = await getCurrentUser();
    if (!user) return null;
    
    const tahunAjaranId = await pickId(getTahunAjaranAktif());
    if (!tahunAjaranId) return null;

    const formData = await getPartFormPendaftaranByPendaftarIdAndTahunAjaranId(user.id, tahunAjaranId);
    if (!formData) return null;

    const siswaData = await getNamaLengkapById(formData.biodata_siswa_id);
    if (!siswaData) return null;

    // return, merge siswa data dan form data as DetailPendaftaran
    return  {
        ...formData,
        ...siswaData,
        pendaftar_id: user.id,
    };
}