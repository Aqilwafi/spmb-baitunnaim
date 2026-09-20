import { registerSchema } from '../validators/register.schema';
import { logDataSchema } from '../validators/log-data.schema';
import { signUpWithPassword } from '../services/register';
import { authLogger } from '../services/logger/authLogs';
import { BaseFormPayload, AuthActivityLogs } from "@bn/types";
import { formatZodErrors } from "@bn/validators";
import { createValidationError } from "@bn/utils";

interface ExecuteRegisterParams extends BaseFormPayload {
  logData: AuthActivityLogs;
}

export async function executeSharedRegister({payload, logData}: ExecuteRegisterParams) {
  
  const parsed = registerSchema.safeParse(payload);
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
  
  const result = await signUpWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
    username: parsed.data.username ?? null
  });

  if (!result.success) {
      
    await authLogger ({
      event: 'User Register',
      status: "failed",
      metadata: {
        credential: parsed.data.email,
        ...parsedLogData.data
      }
    });
    return result;
  }
  
    // log berhasl login
  await authLogger ({
    userId: result.id,
    event: 'User Register',
    status: 'success',
    metadata: {
      credential: result.credential,
      ...parsedLogData.data
    }
  });
  return result;

}