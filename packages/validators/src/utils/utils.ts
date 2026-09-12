import { z } from "zod";

export function formatZodErrors(error: z.ZodError): Record<string, string[]> {
  const errors: Record<string, string[]> = {};
  for (const issue of error.issues) {
    const field = issue.path[0]?.toString();
    if (field) {
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
  }
  return errors;
}