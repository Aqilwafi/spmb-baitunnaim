"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedResetPassword } from "@bn/auth";
import { isValidationError, getHeaderData } from "@bn/utils";
import type { BaseResponse } from "@bn/types";
import { BaseErrorMessage, LogAuthEvent } from "@bn/constants";

export async function setPasswordAction(_prevState: BaseResponse | null, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const logData = await getHeaderData();

    const result = await executeSharedResetPassword({
      payload,
      logData,
      eventType: LogAuthEvent.ADMIN_SET_NEW_PASSWORD
    });

    if (!result.success) {
      return result;
    }

    revalidatePath("/", "layout");

  } catch (error) {
    if (isValidationError(error)) {
      return {
        success: false,
        message: error.message,
        errors: error.errors,
      };
    }
    return {
      success: false,
      message: BaseErrorMessage.SERVER_ERROR
    } 
  }

  redirect("/");
}