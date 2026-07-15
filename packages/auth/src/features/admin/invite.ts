// packages/auth/src/features/core.ts

import { emailField } from "@bn/validators";
import { inviteUserByEmail } from "../../services/admin/invite";
import { ActionResponse } from "@bn/types";

export async function executeSharedLogin(payload: string): Promise<ActionResponse> {
  const parsed = emailField.safeParse(payload);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const { error } = await inviteUserByEmail(parsed.data);

  if (error) {
    return {
      success: false,
      message: "",
      error:{
        code: ""
      }
    }
  }

  return {
      success: true,
      message: "",
    }
}