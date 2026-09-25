// packages/auth/src/features/core.ts


import { inviteUserByEmail } from "@/services/users/invite";
import { revokeRole } from "@/services/users/roles/revoke";
import { assignRole } from "@/services/users/roles/assign";
import { deleteUser } from "@/services/users/delete";
import { activityLogger } from "@bn/services";
import { createValidationError } from "@bn/utils";
import { inviteSchema } from '@bn/auth/validators'
import { getCurrentUser } from "@bn/auth";
import { logDataSchema, formatZodErrors } from "@bn/validators";
import { BaseResponse, BaseFormPayload, AuthActivityLogs } from "@bn/types";
import { DeafultValidationMessage, LogAuthEvent, LogStatus } from "@bn/constants";


interface ExecuteInviteAdminParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  redirectUrl: string;
}

const ROLE_ID_PENDAFTAR = 3;

export async function executeAdminInvite({ payload, logData, redirectUrl }: ExecuteInviteAdminParams): Promise<BaseResponse> {
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
  }

  if (!parsedLogData.success) {
    throw createValidationError(
      formatZodErrors(parsedLogData.error),
      parsedLogData.error.issues[0]?.message ?? DeafultValidationMessage.GENERIC_VALIDATION_ERROR
    );
  }

  // --- Step 1: Invite user ---
  const inviteResult = await inviteUserByEmail(parsed.data.email, redirectUrl, parsed.data.username ?? null);

  if (!inviteResult.success) {
    await logResult({
      userId: user.id,
      status: LogStatus.FAILED,
      metadata: {
        credential: inviteResult.credential,
        code: inviteResult.code,
        ...parsedLogData.data,
      },
    });
    return {
      success: false,
      message: "Gagal mengundang user (Admin)",
    };
  }

  const newUserId = inviteResult.id!;

  // --- Step 2: Revoke default role (PENDAFTAR) ---
  const revokeResult = await revokeRole(newUserId, ROLE_ID_PENDAFTAR);

  if (!revokeResult.success) {
    const rollback = await deleteUser(newUserId);

    await logResult({
      userId: user.id,
      status: LogStatus.FAILED,
      metadata: {
        id: newUserId,
        credential: inviteResult.credential,
        code: revokeResult.code,
        rollbackFailed: !rollback.success,
        rollbackCode: rollback.success ? undefined : rollback.code,
        ...parsedLogData.data,
      },
    });
    return {
      success: false,
      message: "Gagal mengundang user (Admin)",
    };
  }

  // --- Step 3: Assign target role ---
  const assignResult = await assignRole(newUserId, parsed.data.roleId);

  if (!assignResult.success) {
    const rollback = await deleteUser(newUserId);

    await logResult({
      userId: user.id,
      status: LogStatus.FAILED,
      metadata: {
        id: newUserId,
        credential: inviteResult.credential,
        code: assignResult.code,
        rollbackFailed: !rollback.success,
        rollbackCode: rollback.success ? undefined : rollback.code,
        ...parsedLogData.data,
      },
    });
    return {
      success: false,
      message: "Gagal mengundang user (Admin)",
    };
  }

  // --- Semua step sukses ---
  await logResult({
    userId: user.id,
    status: LogStatus.SUCCESS,
    metadata: {
      id: newUserId,
      credential: inviteResult.credential,
      ...parsedLogData.data,
    },
  });

  return {
    success: true,
    message: "Berhasil mengundang user (Admin)",
  };
}

async function logResult({
  userId,
  status,
  metadata,
}: {
  userId: string;
  status: (typeof LogStatus)[keyof typeof LogStatus];
  metadata: Record<string, unknown>;
}) {
  await activityLogger<AuthActivityLogs>({
    userId,
    event: LogAuthEvent.ADMIN_INVITE_ACCOUNT,
    status,
    metadata,
  });
}