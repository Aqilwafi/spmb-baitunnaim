import { forgotPasswordSchema } from "../validators/forgot-password.schema";
import { resetPasswordForEmail } from "../services/forgot-password";
import { isAdminEmail } from "../services/admin/check-email";
import { activityLogger } from '@bn/services';
import { formatZodErrors, logDataSchema } from "@bn/validators"; // Helper Zod terpisah
import { createValidationError } from "@bn/utils";
import type { BaseFormPayload, AuthActivityLogs, BaseResponse } from "@bn/types";

const GENERIC_FORGOT_PASSWORD_MESSAGE =
  "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.";

interface ExecuteForgotPasswordParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  redirectUrl: string;
}

export async function executeSharedForgotPassword({payload, logData, redirectUrl}: ExecuteForgotPasswordParams): Promise<BaseResponse> {
  
  const parsed = forgotPasswordSchema.safeParse(payload);
  const parsedLogData = logDataSchema.safeParse(logData);
  
  if (!parsed.success) {
    throw createValidationError(
      formatZodErrors(parsed.error),
      parsed.error.issues[0]?.message ?? "Data tidak valid."
    );
  };
    
  if (!parsedLogData.success) {
    throw createValidationError(
      formatZodErrors(parsedLogData.error),
      parsedLogData.error.issues[0]?.message ?? "Data tidak valid."
    );
  };

  const isAdmin = await isAdminEmail(parsed.data.email);

  if (isAdmin) {
    await activityLogger<AuthActivityLogs> ({
      event: 'forgot_password',
      status: "failed",
      metadata: {
        credential: parsed.data.email,
        message: "Percobaan Reset Password terhadap email admin",
        ...parsedLogData.data
      }
    });
    return {
        success: true,
        message: GENERIC_FORGOT_PASSWORD_MESSAGE
      };
  };

  const result = await resetPasswordForEmail(parsed.data.email, redirectUrl);

  if (!result.success) {
      await activityLogger<AuthActivityLogs> ({
        event: 'forgot_password',
        status: "failed",
        metadata: {
          credential: result.credential,
          code: result.code,
          ...parsedLogData.data
        }
      });
      return {
        success: true,
        message: GENERIC_FORGOT_PASSWORD_MESSAGE
      };
    }
  
    await activityLogger<AuthActivityLogs> ({
      userId: null,
      event: 'forgot_password',
      status: 'success',
      metadata: {
        credential: result.credential,
        ...parsedLogData.data
      }
    });

    return {
      success: true,
      message: GENERIC_FORGOT_PASSWORD_MESSAGE
    };
}