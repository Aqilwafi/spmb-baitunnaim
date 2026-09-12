import { createSupabaseServer } from "@bn/supabase/server";

export interface SignedUrlResponse {
 signedUrl: string;
 token: string;
 path: string;
}

export async function requestSignedUrl(params: string): Promise<SignedUrlResponse> {

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.storage
        .from("SPMB")
        .createSignedUploadUrl(params);

    if (error) throw error;

    return data;
    
}