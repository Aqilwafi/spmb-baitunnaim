import { ActionResponse, BiodataSiswaDetail, BiodataSiswa } from "@bn/types";

export type SiswaResponse = 
    | BiodataSiswaDetail & ActionResponse
    | ActionResponse;

export type SiswaData = BiodataSiswaDetail & Pick<BiodataSiswa, 'nisn'>;
