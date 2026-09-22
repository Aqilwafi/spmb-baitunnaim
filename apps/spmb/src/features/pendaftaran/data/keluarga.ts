import { formatZodErrors, formIdParamsSchema } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { EnumRelasiKeluarga } from "@bn/types";
import type { BiodataKeluargaItemData } from "@/types/biodata.types";
import type { BaseRPCParams } from "@bn/types";
import { getTahunAjaranAktifData } from "@/features/master/tahun-ajaran";
import { getBiodataKeluarga } from "@/services/pendaftaran/data/keluarga";

interface FeatureParams extends BaseRPCParams {
    relationType: EnumRelasiKeluarga;
}

export async function getBiodataKeluargaData({ formId, relationType }: FeatureParams): Promise<BiodataKeluargaItemData | null> {
    const tahunAjaran = await getTahunAjaranAktifData();
    if (!tahunAjaran.id) throw new Error("Tidak ada tahun ajaran aktif.");
 
    const parsed = formIdParamsSchema.safeParse(formId);
    if (!parsed.success) {
       throw createValidationError(
          formatZodErrors(parsed.error),
          parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
       );
    }

    return await getBiodataKeluarga({ formId: parsed.data, relationType });
}