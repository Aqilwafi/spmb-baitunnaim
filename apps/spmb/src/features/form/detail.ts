// features/form/detail.ts

import { formDetailService } from "@/services/detail";
import type { DetailPendaftaran } from "@/types/step.types";
import { getCurrentClaims } from "@bn/auth";
import { pickId } from "@bn/utils";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { formIdParamsSchema } from "@bn/validators";

export async function getDetailPendaftaran(id: string): Promise<DetailPendaftaran|null> {

    // auth check
    const user = await getCurrentClaims();
    if (!user) return null;
    
    const tahunAjaranId = await pickId(getTahunAjaranAktif());
    if (!tahunAjaranId) return null;
        
    const parsed = formIdParamsSchema.safeParse(id);
    if (!parsed.success) return null;

    return await formDetailService(parsed.data, tahunAjaranId);
}