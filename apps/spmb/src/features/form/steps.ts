// features/pendaftaran/options.ts

import { MasterData } from "@bn/types";
import { mapStepOptions } from "@bn/utils";
import { getMasterStep } from "@bn/services";

export async function getSteps (): Promise<MasterData[]> {

    const data = await getMasterStep();
    return mapStepOptions(data);
}
