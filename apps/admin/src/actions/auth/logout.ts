'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogout } from "@bn/auth";
import type { BaseResponse } from "@bn/types";
import { BaseErrorMessage, LogAuthEvent } from "@bn/constants";
import { getHeaderData } from "@bn/utils";

export async function logoutAction(): Promise<BaseResponse> {
  try {

    const logData = await getHeaderData();
    
    await executeSharedLogout({
      eventType: LogAuthEvent.ADMIN_LOGOUT,
      logData: logData
    });
    revalidatePath("/", "layout");

  } catch (error) {

    return {
      success: false,
      message: BaseErrorMessage.SERVER_ERROR,
    };
  }
  redirect("/");
}