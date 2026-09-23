import { forgotPasswordSchema } from "../validators/forgot-password.schema";
import { resetPasswordForEmail } from "../services/forgot-password";
import { isAdminEmail } from "../services/admin/check-email";
import { activityLogger } from '@bn/services';
import { formatZodErrors, logDataSchema } from "@bn/validators"; // Helper Zod terpisah
import { createValidationError } from "@bn/utils";
import type { BaseFormPayload, AuthActivityLogs, BaseResponse } from "@bn/types";
import { LogAuthEvent, DefaultAuthMessage, LogStatus, DeafultValidationMessage } from "@bn/constants";

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
      parsed.error.issues[0]?.message ?? DeafultValidationMessage.GENERIC_VALIDATION_ERROR
    );
  };
    
  if (!parsedLogData.success) {
    throw createValidationError(
      formatZodErrors(parsedLogData.error),
      parsedLogData.error.issues[0]?.message ?? DeafultValidationMessage.GENERIC_VALIDATION_ERROR
    );
  };

  const isAdmin = await isAdminEmail(parsed.data.email);

  if (isAdmin) {
    await activityLogger<AuthActivityLogs> ({
      event: LogAuthEvent.SPMB_FORGOT_PASSWORD,
      status: LogStatus.FAILED,
      metadata: {
        credential: parsed.data.email,
        message: "Percobaan Reset Password terhadap email admin",
        ...parsedLogData.data
      }
    });
    return {
        success: true,
        message: DefaultAuthMessage.GENERIC_FORGOT_PASSWORD_MESSAGE
      };
  };

  const result = await resetPasswordForEmail(parsed.data.email, redirectUrl);

  if (!result.success) {
      await activityLogger<AuthActivityLogs> ({
        event: LogAuthEvent.SPMB_FORGOT_PASSWORD,
        status: LogStatus.FAILED,
        metadata: {
          credential: result.credential,
          code: result.code,
          ...parsedLogData.data
        }
      });
      return {
        success: true,
        message: DefaultAuthMessage.GENERIC_FORGOT_PASSWORD_MESSAGE
      };
    }
  
    await activityLogger<AuthActivityLogs> ({
      userId: null,
      event: LogAuthEvent.SPMB_FORGOT_PASSWORD,
      status: LogStatus.SUCCESS,
      metadata: {
        credential: result.credential,
        ...parsedLogData.data
      }
    });

    return {
      success: true,
      message: DefaultAuthMessage.GENERIC_FORGOT_PASSWORD_MESSAGE
    };
}