import { forgotPasswordSchema } from "../validators/forgot-password.schema";
import { logDataSchema } from "../validators/log-data.schema";
import { resetPasswordForEmail } from "../services/forgot-password";
import { isAdminEmail } from "../services/admin/check-email";
import { BaseFormPayload, AuthActivityLogs, BaseAuthResponse } from "@bn/types";
import { formatZodErrors } from "@bn/validators"; // Helper Zod terpisah
import { createValidationError } from "@bn/utils";
import { authLogger } from "../services/logger/authLogs";

const GENERIC_FORGOT_PASSWORD_MESSAGE =
  "Instruksi pemulihan telah dikirim ke email Anda jika akun tersebut terdaftar.";

interface ExecuteForgotPasswordParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  redirectUrl: string;
}

export async function executeSharedForgotPassword({payload, logData, redirectUrl}: ExecuteForgotPasswordParams): Promise<BaseAuthResponse> {
  
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
    await authLogger ({
      event: 'Request Reset Password',
      status: "failed",
      metadata: {
        credential: parsed.data.email,
        message: "Percobaan Reset Password terhadap email admin",
        ...parsedLogData.data
      }
    });
    return {
        success: true,
        message: ""
      };
  };

  const result = await resetPasswordForEmail(parsed.data.email, redirectUrl);

  if (!result.success) {
      await authLogger ({
        event: 'Request Reset Password',
        status: "failed",
        metadata: {
          credential: parsed.data.email,
          ...parsedLogData.data
        }
      });
      return {
        ...result,
        message: GENERIC_FORGOT_PASSWORD_MESSAGE
      };
    }
  
    await authLogger ({
      userId: null,
      event: 'Request Reset Password',
      status: 'success',
      metadata: {
        credential: parsed.data.email,
        ...parsedLogData.data
      }
    });

    return {
      ...result,
      message: GENERIC_FORGOT_PASSWORD_MESSAGE
    };
}