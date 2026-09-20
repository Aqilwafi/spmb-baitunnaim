"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { executeSharedRegister } from "@bn/auth";
import { isValidationError } from "@bn/utils";
import type { BaseResponse } from "@bn/types";

export async function registerAction(_prevState: any, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    
    const headersList = await headers();
    const logData = {
        ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
        userAgent: headersList.get("user-agent"),
        forwardedFor: headersList.get("x-forwarded-for"),
        realIp: headersList.get("x-real-ip"),
    };

    const result = await executeSharedRegister({
      payload,
      logData,
    });

    if (!result.success) {
      return {
        success: false,
        message: "Gagal melakukan registrasi.",
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
      message: "Terjadi kesalahan pada server.",
    };
  }

  redirect("/login");
}