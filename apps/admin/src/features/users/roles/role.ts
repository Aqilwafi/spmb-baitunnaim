// features/pendaftaran/options.ts

import { mapToMasterData } from "@bn/utils";
import { getMasterRoles } from "@bn/services";
import { MasterData } from "@bn/types";

export async function getMasterRolesOptions(roleIds?: number[]): Promise<MasterData[]> {
    const data = await getMasterRoles();

    if (!data) {
        return [];
    }

    // Filter data mentah berdasarkan roleIds jika parameter diberikan dan tidak kosong
    const filteredData = roleIds && roleIds.length > 0
        ? data.filter((role) => roleIds.includes(role.id))
        : data;

    return mapToMasterData(filteredData);
}