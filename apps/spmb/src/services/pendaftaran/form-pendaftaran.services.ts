// services/dashboardService.ts
import "server-only";
import { getCurrentClaims } from "@bn/auth";
import { createSupabaseServer, QueryData } from "@bn/supabase";

const pendaftaranQuery = (supabase: any) => 
  supabase.from('pendaftaran').select('*');

type PendaftaranData = QueryData<ReturnType<typeof pendaftaranQuery>>;

export async function getFormPendaftaran(): Promise<PendaftaranData>{

    const claims = await getCurrentClaims();
    if (!claims) {
        throw new Error("Unauthorized");
    }

    const supabase = await createSupabaseServer();
    const { data, error } = await pendaftaranQuery(supabase).eq('user_id', claims.sub);

    if (error) {
        throw new Error("Failed to fetch pendaftaran data");
    }

    return data;
}

export async function getDetailFormPendaftaran(): Promise<PendaftaranData>{

    const claims = await getCurrentClaims();
    if (!claims) {
        throw new Error("Unauthorized");
    }

    const supabase = await createSupabaseServer();
    const { data, error } = await pendaftaranQuery(supabase).eq('user_id', claims.sub);

    if (error) {
        throw new Error("Failed to fetch pendaftaran data");
    }

    return data;
}

