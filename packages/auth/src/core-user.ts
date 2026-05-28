import { createSupabaseServer } from "@bn/supabase";
import { BaseResponse } from "@bn/types";
import { handleAuthError } from "./errors";

export async function getCurrentSession(): Promise<BaseResponse> {

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.auth.getSession();

    if (error) {
        handleAuthError(error) as BaseResponse;
      }

    return{
        success: true,
        message: ""
    }
}

export async function getCurrentUser(): Promise<BaseResponse> {

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        handleAuthError(error) as BaseResponse;
      }

    return{
        success: true,
        message: ""
    }
}

export async function getCurrentClaims(): Promise<BaseResponse> {

    const supabase = await createSupabaseServer();

    const { data, error } = await supabase.auth.getClaims();

    if (error) {
        handleAuthError(error) as BaseResponse;
      }

    return{
        success: true,
        message: ""
    }
}