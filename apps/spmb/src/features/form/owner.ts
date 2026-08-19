// features/form/owner.ts

import { getCurrentClaims } from "@bn/auth";
import { getBiodataSiswaByOwnerId } from "@bn/services";
import { BiodataSiswa, BiodataSiswaDetail } from "@bn/types";

export async function getBiodataSiswaIdsOwnerId(): Promise<BiodataSiswa[]> {
    const user = await getCurrentClaims();
    if (!user) return [];

    const siswaData = await getBiodataSiswaByOwnerId(user.sub);
    return siswaData;
}