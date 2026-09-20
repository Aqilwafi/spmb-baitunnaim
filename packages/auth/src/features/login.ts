import { loginSchema } from "../validators/login.schema";
import { signInWithPassword } from "../services/login";
import { logDataSchema } from "@bn/validators";
import { activityLogger } from "@bn/services";
import { formatZodErrors } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { BaseFormPayload, AuthActivityLogs, BaseResponse } from "@bn/types";

interface ExecuteLoginParams extends BaseFormPayload {
  logData: AuthActivityLogs;
  eventType?: string;
}

const GENERIC_LOGIN_RESPONSE = 'Email atau Password salah.';

export async function executeSharedLogin({payload, logData, eventType = 'user_login'}: ExecuteLoginParams): Promise<BaseResponse> {
  
  const parsed = loginSchema.safeParse(payload);
  const parsedLogData = logDataSchema.safeParse(logData);
  
  if (!parsed.success) {
    throw createValidationError(
      formatZodErrors(parsed.error),
      parsed.error.issues[0]?.message ?? "Format Data tidak valid."
    );
  }

  if (!parsedLogData.success) {
    throw createValidationError(
      formatZodErrors(parsedLogData.error),
      parsedLogData.error.issues[0]?.message ?? "Format Data tidak valid."
    );
  }

  const result = await signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password
  });
  
  // Jika Login Gagal
  if (!result.success) {
    await activityLogger<AuthActivityLogs> ({
      userId: null, // Gagal login berarti belum punya user_id actor yang valid
      event: eventType,
      status: "failed",
      metadata: {
        credential: parsed.data.email,
        code: result.code,
        ...parsedLogData.data
      }
    });

    return {
      success: result.success,
      message: GENERIC_LOGIN_RESPONSE,
    };
  }

  // Jika Login Berhasil
  await activityLogger<AuthActivityLogs> ({
    userId: result.id, // ID user yang berhasil login sebagai actor
    event: eventType,
    status: 'success',
    metadata: {
      credential: result.credential,
      ...parsedLogData.data
    }
  });

  return {
    success: result.success,
    message: GENERIC_LOGIN_RESPONSE, // Sesuaikan jika ingin pesan sukses berbeda
  };
}