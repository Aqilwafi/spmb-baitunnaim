
import { formatZodErrors, formIdParamsSchema } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { PendidikanSiswaItemData } from "@/types/biodata.types";
import type { BaseRPCParams } from "@/types/rpc.types";
import { getTahunAjaranAktifData } from "@/features/master/tahun-ajaran";
import { getPendidikanSiswaSebelumnya } from "@/services/pendaftaran/data/pendidikan"; 

export async function getBiodataSiswaDetailData({formId}: BaseRPCParams): Promise<PendidikanSiswaItemData|null> {
    const tahunAjaran = await getTahunAjaranAktifData();
    if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");
  
    const parsed = formIdParamsSchema.safeParse(formId);
    if (!parsed.success) {
       throw createValidationError(
          formatZodErrors(parsed.error),
          parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
        );
    };
    return await getPendidikanSiswaSebelumnya({formId: parsed.data});
}
