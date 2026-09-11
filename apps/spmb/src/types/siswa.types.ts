import { ActionResponse, BiodataSiswaDetail, BiodataSiswa, BiodataKeluargaInsert } from "@bn/types";

export type SiswaResponse = 
    | BiodataSiswaDetail & ActionResponse
    | ActionResponse;

export type SiswaData = BiodataSiswaDetail & Pick<BiodataSiswa, 'nisn'>;

export type BiodataKeluargaPayload = Omit<BiodataKeluargaInsert, 'biodata_siswa_id'>