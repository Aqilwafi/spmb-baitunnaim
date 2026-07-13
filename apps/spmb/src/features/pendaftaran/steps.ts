// features/pendaftaran/options.ts

import "server-only";
import { MasterData } from "@bn/types";
import { mapStepOptions } from "@bn/utils";
import { getMasterStep } from "@bn/services";
import { AppSupabaseClient } from "@bn/supabase";

export async function getSteps (supabase: AppSupabaseClient): Promise<MasterData[]> {

    const data = await getMasterStep(supabase);
    return mapStepOptions(data);
}
