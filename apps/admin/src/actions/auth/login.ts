"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogin } from "@bn/auth";
import { isValidationError, getHeaderData } from "@bn/utils";
import type { BaseResponse } from "@bn/types";
import { BaseErrorMessage, LogAuthEvent } from "@bn/constants";

export async function loginAction(_prevState: BaseResponse | null, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const logData = await getHeaderData();

    const result = await executeSharedLogin({
      payload,
      logData,
      eventType: LogAuthEvent.ADMIN_LOGIN
    });

    if (!result.success) {
      return result;
    }

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

  revalidatePath("/", "layout");
  redirect("/dashboard");
}