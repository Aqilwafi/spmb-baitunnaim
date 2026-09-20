// packages/validators/src/schemas/invite.schema.ts
import { z } from "zod";
import { emailField, roleIdField } from "@bn/validators";

export const inviteSchema = z.object({
  email: emailField,
  roleId: roleIdField,
});

export type InviteInput = z.infer<typeof inviteSchema>;