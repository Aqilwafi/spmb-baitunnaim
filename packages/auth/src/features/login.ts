import { loginSchema } from "../validators/login.schema";
import { logDataSchema } from "../validators/log-data.schema";
import { signInWithPassword } from "../services/login";
import { authLogger } from "../services/logger/authLogs";
import { formatZodErrors } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { BaseFormPayload, AuthActivityLogs, BaseResponse, BaseAuthResponse } from "@bn/types";


interface ExecuteLoginParams extends BaseFormPayload {
  logData: AuthActivityLogs;
}

const GENERIC_LOGIN_RESPONSE = 'Email atau Password salah.';

export async function executeSharedLogin({payload, logData}: ExecuteLoginParams): Promise<BaseResponse> {
 
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
  
  if (!result.success) {
    await authLogger ({
      event: 'User Login',
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

  await authLogger ({
    userId: result.id,
    event: 'User Login',
    status: 'success',
    metadata: {
      credential: result.credential,
      ...parsedLogData.data
    }
  });

  return {
      success: result.success,
      message: GENERIC_LOGIN_RESPONSE,
    };
}