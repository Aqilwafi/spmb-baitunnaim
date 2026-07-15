// features/pendaftaran/options.ts

import "server-only";
import { mapToMasterData } from "@bn/utils";
import { getMasterKelas, getMasterLembaga } from "@bn/services";
import { MasterData } from "@bn/types";

export async function getLembagaOptions (): Promise<MasterData[]> {

    const data = await getMasterLembaga();

    return mapToMasterData(data);
}

export async function getKelasOptions (): Promise<MasterData[]> {

    const data = await getMasterKelas();

    return mapToMasterData(data);
}