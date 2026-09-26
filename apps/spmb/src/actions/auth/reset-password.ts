"use server";

import { redirect } from "next/navigation";
import { executeSharedResetPassword } from "@bn/auth";
import type { BaseResponse } from "@bn/types";
import { getHeaderData, isValidationError } from "@bn/utils";
import { LogAuthEvent, BaseErrorMessage } from "@bn/constants";

export async function resetPasswordAction(_prevState: any, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const logData = await getHeaderData();

    const result = await executeSharedResetPassword({
        payload: payload,
        logData: logData,
        eventType: LogAuthEvent.SPMB_FORGOT_PASSWORD
    });

    if (!result.success) {
      return result;
    }

    redirect("/login?reset=success");
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
    };
  }
}