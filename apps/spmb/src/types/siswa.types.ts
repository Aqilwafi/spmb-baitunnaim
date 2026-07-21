import { ActionResponse, BiodataSiswaDetailItem } from "@bn/types";

export type SiswaResponse = 
    | BiodataSiswaDetailItem & ActionResponse
    | ActionResponse;