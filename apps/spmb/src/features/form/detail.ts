// features/form/detail.ts

import { getPartFormPendaftaranByFormIdAndTahunAjaranId } from "@/services/form";
import { getNamaLengkapById } from "@/services/siswa";
import type { DetailPendaftaran } from "@/types/step.types";
import { getCurrentUser } from "@bn/auth";
import { pickId } from "@/utils/extract-id";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { formIdParamsSchema } from "@bn/validators";

export async function getDetailPendaftaran(id: string): Promise<DetailPendaftaran|null> {

    const user = await getCurrentUser();
    if (!user) return null;
    
    const tahunAjaranId = await pickId(getTahunAjaranAktif());
    if (!tahunAjaranId) return null;
        
    const parsed = formIdParamsSchema.safeParse(id);
    if (!parsed.success) return null;

    const formId = parsed.data;

    const formData = await getPartFormPendaftaranByFormIdAndTahunAjaranId(formId, user.id, tahunAjaranId);
    if (!formData) return null;

    const siswaData = await getNamaLengkapById(formData.biodata_siswa_id);
    if (!siswaData) return null;

    return  {
        ...formData,
        ...siswaData,
        pendaftar_id: user.id,
    };
}