'use server';

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogout } from "@bn/auth";
import type { BaseResponse } from "@bn/types";
import { BaseErrorMessage, LogAuthEvent } from "@bn/constants";

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
      eventType: LogAuthEvent.SPMB_LOGOUT,
      logData: logData
    });
    revalidatePath("/", "layout");
    redirect("/login");

  } catch (error) {

    return {
      success: false,
      message: BaseErrorMessage.SERVER_ERROR,
    };
  }
}