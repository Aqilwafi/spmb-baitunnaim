import { ActionResponse } from "@bn/types";
import { biodataKeluargaFormSchema } from "@bn/validators";
import type { BiodataKeluargaPayload } from '@/types/siswa.types'

export async function processSubmitBiodataKeluarga(input: BiodataKeluargaPayload): Promise<ActionResponse>{

    return {
        success: true,
        message: "",
    }

}