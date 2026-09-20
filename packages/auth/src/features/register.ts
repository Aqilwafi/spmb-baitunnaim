import { registerSchema } from '../validators/register.schema';
import { signUpWithPassword } from '../services/register';
import { activityLogger } from '@bn/services';
import { formatZodErrors, logDataSchema } from "@bn/validators";
import { createValidationError } from "@bn/utils";
import type { BaseFormPayload, AuthActivityLogs } from "@bn/types";

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
      
    await activityLogger<AuthActivityLogs> ({
      event: 'spmb_register',
      status: "failed",
      metadata: {
        credential: parsed.data.email,
        ...parsedLogData.data
      }
    });
    return result;
  }
  
    // log berhasl login
  await activityLogger<AuthActivityLogs> ({
    userId: result.id,
    event: 'spmb_register',
    status: 'success',
    metadata: {
      credential: result.credential,
      ...parsedLogData.data
    }
  });
  return result;

}