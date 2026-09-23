// packages/auth/src/features/core.ts

import { logDataSchema, formatZodErrors} from "@bn/validators";
import { inviteUserByEmail } from "@/services/users/invite";
import { BaseResponse, BaseFormPayload, AuthActivityLogs } from "@bn/types";
import { createValidationError } from "@bn/utils";
import { activityLogger } from "@bn/services";
import { inviteSchema } from '@bn/auth/validators'
import { getCurrentUser } from "@bn/auth";
import { DeafultValidationMessage, LogAuthEvent, LogStatus } from "@bn/constants";

interface ExecuteInviteAdminParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  redirectUrl: string;
}

export async function executeAdminInvite({payload, logData, redirectUrl}: ExecuteInviteAdminParams): Promise<BaseResponse> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const parsed = inviteSchema.safeParse(payload);
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

  const result = await inviteUserByEmail(parsed.data.email, parsed.data.roleId, redirectUrl);

  if (!result.success) {
    await activityLogger<AuthActivityLogs> ({
      userId: user.id,
      event: LogAuthEvent.ADMIN_INVITE_ACCOUNT,
      status: LogStatus.FAILED,
      metadata: {
        credential: result.credential,
        code: result.code,
        ...parsedLogData.data
      }
    });
    return {
      success: false,
      message: "Gagal mengundang user (Admin)",
    };
  }

  await activityLogger<AuthActivityLogs> ({
      userId: user.id,
      event: LogAuthEvent.ADMIN_INVITE_ACCOUNT,
      status: LogStatus.SUCCESS,
      metadata: {
        id: result.id,
        credential: result.credential,
        code: result.code,
        ...parsedLogData.data
      }
    });

  return {
      success: true,
      message: "Berhasil mengundang user (Admin)",
    }
}