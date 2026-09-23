import { resetPasswordSchema } from "../validators/reset-password.schema";
import { updateUserPassword } from "../services/reset-password";
import { getUser } from "../services/session"; 
import { executeSharedLogout } from "./logout";
import { BaseResponse, AuthActivityLogs, BaseFormPayload } from "@bn/types";
import { formatZodErrors, logDataSchema } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import { activityLogger } from "@bn/services";
import { LogStatus, DeafultValidationMessage} from "@bn/constants";

interface ExecuteResetPasswordParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  eventType: string;
}

export async function executeSharedResetPassword({payload, logData, eventType}: ExecuteResetPasswordParams): Promise<BaseResponse>{

  const parsed = resetPasswordSchema.safeParse(payload);
  const parsedLogData = logDataSchema.safeParse(logData);

  if (!parsed.success) {
    throw createValidationError(
      formatZodErrors(parsed.error),
      parsed.error.issues[0]?.message ?? DeafultValidationMessage.GENERIC_VALIDATION_ERROR
    );
  }
  
  if (!parsedLogData.success) {
    throw createValidationError(
      formatZodErrors(parsedLogData.error),
      parsedLogData.error.issues[0]?.message ?? DeafultValidationMessage.GENERIC_VALIDATION_ERROR
    );
  }

  const { data: userData, error: userError } = await getUser();
  if (userError) throw userError;

  const result = await updateUserPassword(parsed.data.newPassword);

  if (!result.success) {
      await activityLogger<AuthActivityLogs> ({
        event: eventType,
        status: LogStatus.FAILED,
        metadata: {
          credential: userData.user.email,
          code: result.code,
          ...parsedLogData.data
        }
      });
      return {
        success: result.success,
        message: ''
      };
    }
      
    await activityLogger<AuthActivityLogs> ({
      userId: result.id,
      event: eventType,
      status: LogStatus.SUCCESS,
      metadata: {
        id: result.id,
        credential: result.credential,
        ...parsedLogData.data
      }
    });

    // Bungkus dengan try...catch agar error logout tidak membatalkan suksesnya reset password
    try {
      await executeSharedLogout({ 
        eventType: eventType,
        logData: {
          credential: result.credential,
          ...parsedLogData
        }
      });
    } catch (logoutError) {
      // Anda bisa mencatat error logout ke console atau error tracker tanpa menghentikan fungsi
      console.error("Gagal melakukan shared logout setelah reset password:", logoutError);
    }

    return {
      success: result.success,
      message: 'Berhasil melakukan reset password'
    };
}