// services/pendaftaran/pendaftaran-options.services.ts

import "server-only";
import { SelectOption } from "@bn/types";
import { getMasterKelas, getMasterLembaga } from "@bn/services";
import { AppSupabaseClient } from "@bn/supabase";
import { mapKelasOptions, mapLembagaOptions } from "@/features/pendaftaran/mappers";

export async function getLembagaOptions (supabase: AppSupabaseClient): Promise<SelectOption[]> {

    const data = await getMasterLembaga(supabase);

    return mapLembagaOptions(data);
}

export async function getKelasOptions (supabase: AppSupabaseClient): Promise<SelectOption[]> {

    const data = await getMasterKelas(supabase);

    return mapKelasOptions(data);
}