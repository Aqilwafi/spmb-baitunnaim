import { resetPasswordSchema } from "../validators/reset-password.schema";
import { updateUserPassword } from "../services/reset-password";
import { getUser } from "../services/session"; 
import { executeSharedLogout } from "./logout";
import { BaseResponse, AuthActivityLogs, BaseFormPayload } from "@bn/types";
import { formatZodErrors, logDataSchema } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import { activityLogger } from "@bn/services";


interface ExecuteResetPasswordParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  eventType?: string;
}

export async function executeSharedResetPassword({payload, logData, eventType = 'spmb_reset_password'}: ExecuteResetPasswordParams): Promise<BaseResponse>{

  const parsed = resetPasswordSchema.safeParse(payload);
  const parsedLogData = logDataSchema.safeParse(logData);

  if (!parsed.success) {
    throw createValidationError(
      formatZodErrors(parsed.error),
      parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }
  
  if (!parsedLogData.success) {
    throw createValidationError(
      formatZodErrors(parsedLogData.error),
      parsedLogData.error.issues[0]?.message ?? "Data formulir tidak valid."
    );
  }
    const { data: userData, error: userError } = await getUser();
    if (userError) throw userError;

    const result = await updateUserPassword(parsed.data.newPassword);

    if (!result.success) {
        await activityLogger<AuthActivityLogs> ({
          event: eventType,
          status: "failed",
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
        status: 'success',
        metadata: {
          id: result.id,
          credential: result.credential,
          ...parsedLogData.data
        }
      });

      await executeSharedLogout({ 
        eventType: eventType
      });
      return {
        success: result.success,
        message: ''
      };
}