// packages/auth/src/features/core.ts


import { logDataSchema, formatZodErrors } from "@bn/validators";
import { BaseResponse, BaseFormPayload, AuthActivityLogs } from "@bn/types";
import { createValidationError } from "@bn/utils";
import { activityLogger } from "@bn/services";
import { assignRole } from "@/services/users/roles/assign";
import { roleAssignmentSchema } from "@bn/auth/validators";
import { getCurrentUser } from "@bn/auth";

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
        parsed.error.issues[0]?.message ?? "Data tidak valid."
      );
    };
      
    if (!parsedLogData.success) {
      throw createValidationError(
        formatZodErrors(parsedLogData.error),
        parsedLogData.error.issues[0]?.message ?? "Data tidak valid."
      );
    };

  const result = await assignRole(parsed.data.userId, parsed.data.roleId,);

  if (!result.success) {
    await activityLogger ({
      userId: user.id,
      event: 'assign_role',
      status: "failed",
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
      event: 'assign_role',
      status: "success",
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