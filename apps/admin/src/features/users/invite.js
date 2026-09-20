// packages/auth/src/features/core.ts
import { logDataSchema, formatZodErrors } from "@bn/validators";
import { inviteUserByEmail } from "@/services/users/invite";
import { createValidationError } from "@bn/utils";
import { activityLogger } from "@bn/services";
import { inviteSchema } from '@bn/auth/validators';
import { getCurrentUser } from "@bn/auth";
export async function executeAdminInvite({ payload, logData, redirectUrl }) {
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
        throw createValidationError(formatZodErrors(parsed.error), parsed.error.issues[0]?.message ?? "Data tidak valid.");
    }
    ;
    if (!parsedLogData.success) {
        throw createValidationError(formatZodErrors(parsedLogData.error), parsedLogData.error.issues[0]?.message ?? "Data tidak valid.");
    }
    ;
    const result = await inviteUserByEmail(parsed.data.email, parsed.data.roleId, redirectUrl);
    if (!result.success) {
        await activityLogger({
            event: 'invite_admin',
            status: "failed",
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
    await activityLogger({
        userId: user.id,
        event: 'invite_admin',
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
        message: "Berhasil mengundang user (Admin)",
    };
}
