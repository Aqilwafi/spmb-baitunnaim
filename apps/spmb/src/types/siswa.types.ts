import { ActionResponse, BiodataSiswaDetailListItem } from "@bn/types";

export type SiswaResponse = 
    | BiodataSiswaDetailListItem & ActionResponse
    | ActionResponse;