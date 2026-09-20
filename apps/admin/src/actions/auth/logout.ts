'use server';

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogout } from "@bn/auth";
import type { BaseResponse } from "@bn/types";

export async function logoutAction(): Promise<BaseResponse> {
  try {

    const headersList = await headers();
    const logData = {
      ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
      userAgent: headersList.get("user-agent"), 
      forwardedFor: headersList.get("x-forwarded-for"),
      realIp: headersList.get("x-real-ip"),
    };
    
    await executeSharedLogout({
      eventType: 'admin_logout',
      logData: logData
    });
    revalidatePath("/", "layout");
    redirect("/");

  } catch (error) {

    return {
      success: false,
      message: "Terjadi kesalahan saat logout.",
    };
  }
}