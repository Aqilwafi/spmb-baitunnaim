
import { formatZodErrors, formIdParamsSchema } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { BiodataSiswaDetailItemData } from "@/types/biodata.types";
import type { BaseRPCParams } from "@bn/types";
import { getTahunAjaranAktifData } from "@/features/master/tahun-ajaran";
import { getBiodataSiswaDetail } from "@/services/pendaftaran/data/siswa";

export async function getBiodataSiswaDetailData({formId}: BaseRPCParams): Promise<BiodataSiswaDetailItemData|null> {
    const tahunAjaran = await getTahunAjaranAktifData();
    if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");
  
    const parsed = formIdParamsSchema.safeParse(formId);
    if (!parsed.success) {
       throw createValidationError(
          formatZodErrors(parsed.error),
          parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
        );
    };
    return await getBiodataSiswaDetail({formId: parsed.data});
}
