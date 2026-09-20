"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { executeSharedResetPassword } from "@bn/auth";
import type { BaseResponse } from "@bn/types";
import { isValidationError } from "@bn/utils";

export async function resetPasswordAction(_prevState: any, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const headersList = await headers();
    const logData = {
        ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
        userAgent: headersList.get("user-agent"), 
        forwardedFor: headersList.get("x-forwarded-for"),
        realIp: headersList.get("x-real-ip"),
    };

    const result = await executeSharedResetPassword({
        payload: payload,
        logData: logData
    });

    if (!result.success) {
      return {
        success: false,
        message: result.message || 'terjadi kesalahan.',
      };
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
      message: error instanceof Error ? error.message : "Terjadi kesalahan yang tidak diketahui.",
    };
  }
}