// packages/validators/src/schemas/invite.schema.ts
import { z } from "zod";
import { emailField, roleIdField, usernameField } from "@bn/validators";

export const inviteSchema = z.object({
  email: emailField,
  roleId: roleIdField,
  username: usernameField
});

export type InviteInput = z.infer<typeof inviteSchema>;