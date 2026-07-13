// features/pendaftaran/options.ts

import "server-only";
import { AppSupabaseClient } from "@bn/supabase";
import { mapToMasterData } from "@bn/utils";
import { getMasterKelas, getMasterLembaga } from "@bn/services";
import { MasterData } from "@bn/types";

export async function getLembagaOptions (supabase: AppSupabaseClient): Promise<MasterData[]> {

    const data = await getMasterLembaga(supabase);

    return mapToMasterData(data);
}

export async function getKelasOptions (supabase: AppSupabaseClient): Promise<MasterData[]> {

    const data = await getMasterKelas(supabase);

    return mapToMasterData(data);
}