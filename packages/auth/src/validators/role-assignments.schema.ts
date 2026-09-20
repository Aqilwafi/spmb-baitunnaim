// packages/validators/src/schemas/role-assignments.schema.ts
import { z } from "zod";
import { userIdField, roleIdField, emailField } from "@bn/validators";

export const roleAssignmentSchema = z.object({
  email: emailField,
  userId: userIdField,
  roleId: roleIdField,
});

export type RoleAssignmentInput = z.infer<typeof roleAssignmentSchema>;