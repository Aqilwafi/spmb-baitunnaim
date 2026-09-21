// features/pendaftaran/options.ts

import { mapToMasterData } from "@bn/utils";
import { getMasterRoles} from "@bn/services";
import { MasterData } from "@bn/types";

export async function getMasterRolesOptions (): Promise<MasterData[]> {

    const data = await getMasterRoles();

    return mapToMasterData(data);
}