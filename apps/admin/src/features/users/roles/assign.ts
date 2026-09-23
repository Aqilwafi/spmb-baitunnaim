// packages/auth/src/features/core.ts


import { logDataSchema, formatZodErrors } from "@bn/validators";
import { BaseResponse, BaseFormPayload, AuthActivityLogs } from "@bn/types";
import { createValidationError } from "@bn/utils";
import { activityLogger } from "@bn/services";
import { assignRole } from "@/services/users/roles/assign";
import { roleAssignmentSchema } from "@bn/auth/validators";
import { getCurrentUser } from "@bn/auth";
import { DeafultValidationMessage, LogAuthEvent, LogStatus } from "@bn/constants";

interface ExecuteAssignRoleParams extends BaseFormPayload {
  logData: AuthActivityLogs;
}

export async function executeAssignRole({payload, logData}: ExecuteAssignRoleParams): Promise<BaseResponse> {
  
  const user = await getCurrentUser()
  if (!user) {
    return {
      success: false,
      message: 'Unauthorized'
    }
  }
  
  const parsed = roleAssignmentSchema.safeParse(payload);
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

  const result = await assignRole(parsed.data.userId, parsed.data.roleId,);

  if (!result.success) {
    await activityLogger ({
      userId: user.id,
      event: LogAuthEvent.ADMIN_ASSIGN_ROLE,
      status: LogStatus.FAILED,
      metadata: {
        credential: result.credential,
        code: result.code,
        ...parsedLogData.data
      }
    });
    return {
      success: false,
      message: "Gagal assign role",
    };
  }

  await activityLogger ({
      userId: user.id,
      event: LogAuthEvent.ADMIN_ASSIGN_ROLE,
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
      message: "Berhasil assign role",
    }
}