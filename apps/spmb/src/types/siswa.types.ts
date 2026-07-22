import { ActionResponse, BiodataSiswaDetail } from "@bn/types";

export type SiswaResponse = 
    | BiodataSiswaDetail & ActionResponse
    | ActionResponse;