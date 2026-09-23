"use server";
import { headers } from "next/headers";
import { executeSharedForgotPassword } from "@bn/auth";
import type { BaseResponse } from "@bn/types";
import { isValidationError } from "@bn/utils";
import { BaseErrorMessage, DefaultAuthMessage } from "@bn/constants";

export async function forgotPasswordAction(_prevState: any, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const siteUrl = `${process.env.NEXT_PUBLIC_SPMB_URL!}/auth/callback?next=/reset-password`;
    const headersList = await headers();
    const logData = {
            ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
            userAgent: headersList.get("user-agent"), 
            forwardedFor: headersList.get("x-forwarded-for"),
            realIp: headersList.get("x-real-ip"),
        };
    
    const result = await executeSharedForgotPassword({
      payload,
      redirectUrl: siteUrl,
      logData,
    });

    if (result.message) {
      return {
        success: true,
        message: result.message,
      };

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
    };
  }
  return {
    success: true,
    message: DefaultAuthMessage.GENERIC_FORGOT_PASSWORD_MESSAGE,
  }
}