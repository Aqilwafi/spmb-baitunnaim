'use server';

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getHeaderData } from "@bn/utils";
import { executeSharedLogout } from "@bn/auth";
import { BaseErrorMessage, LogAuthEvent } from "@bn/constants";
import type { BaseResponse } from "@bn/types";

export async function logoutAction(): Promise<BaseResponse> {
  try {

    const logData = await getHeaderData();
    
    await executeSharedLogout({
      eventType: LogAuthEvent.SPMB_LOGOUT,
      logData: logData
    });
    revalidatePath("/", "layout");

  } catch (error) {
    console.log('error action:', error)

    return {
      success: false,
      message: BaseErrorMessage.SERVER_ERROR,
    };
  }
  redirect("/login");
}