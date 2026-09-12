// features/form/detail.ts

import { getFormDetail } from "@/services/form/detail";
import type { DetailPendaftaran } from "@/types/step.types";
import { getCurrentClaims } from "@bn/auth";
import { getTahunAjaranAktifData } from "../master/tahun-ajaran";
import { formIdParamsSchema, formatZodErrors } from "@bn/validators";
import { createValidationError } from "@bn/utils";

export async function getDetailPendaftaranData(id: string): Promise<DetailPendaftaran> {

    // auth check
    const user = await getCurrentClaims();
    if (!user) throw new Error("Akses Tidak Diizinkan.");
    
    const tahunAjaran = await getTahunAjaranAktifData();
    if (!tahunAjaran.id) throw new Error("Tidak ada Tahun Ajaran Aktif.");
        
    const parsed = formIdParamsSchema.safeParse(id);
    if (!parsed.success) {
        throw createValidationError(
        formatZodErrors(parsed.error),
        parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
      );
    }

    return await getFormDetail(parsed.data, tahunAjaran.id);
}