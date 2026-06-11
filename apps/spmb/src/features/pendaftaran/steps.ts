// features/pendaftaran/options.ts

import "server-only";
import { MasterStepListItem } from "@bn/types";
import { getMasterStep } from "@bn/services";
import { AppSupabaseClient } from "@bn/supabase";

export async function getSteps (supabase: AppSupabaseClient): Promise<MasterStepListItem[]> {

    const data = await getMasterStep(supabase);

    return data;
}
