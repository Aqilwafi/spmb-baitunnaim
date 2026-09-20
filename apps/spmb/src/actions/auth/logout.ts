'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogout } from "@bn/auth";
import type { BaseResponse } from "@bn/types";

export async function logoutAction(): Promise<BaseResponse> {
  try {
    
    await executeSharedLogout();
    revalidatePath("/", "layout");
    redirect("/login");

  } catch (error) {

    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan saat logout.",
    };
  }
}