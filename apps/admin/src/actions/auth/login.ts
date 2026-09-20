"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { executeSharedLogin } from "@bn/auth";
import { isValidationError } from "@bn/utils";
import type { BaseResponse } from "@bn/types";

export async function loginAction(_prevState: BaseResponse | null, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const headersList = await headers();
    const logData = {
        ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
        userAgent: headersList.get("user-agent"), 
        forwardedFor: headersList.get("x-forwarded-for"),
        realIp: headersList.get("x-real-ip"),
    };

    const result = await executeSharedLogin({
      payload,
      logData,
      eventType: 'admin_login'
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
      message: 'Terjadi kesalahan pada server.'
    } 
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}