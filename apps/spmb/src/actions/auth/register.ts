"use server";

import { redirect } from "next/navigation";
import { executeSharedRegister } from "@bn/auth";
import { getHeaderData, isValidationError } from "@bn/utils";
import type { BaseResponse } from "@bn/types";
import { BaseErrorMessage } from "@bn/constants";

export async function registerAction(_prevState: any, formData: FormData): Promise<BaseResponse> {
  try {
    const payload = Object.fromEntries(formData.entries());
    const logData = await getHeaderData();

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
      message: BaseErrorMessage.SERVER_ERROR,
    };
  }

  redirect("/login");
}