import { z } from "zod";

export const logDataSchema = z.object({
  ip: z.string().nullable().optional(),
  userAgent: z.string().nullable().optional(),
  forwardedFor: z.string().nullable().optional(),
  realIp: z.string().nullable().optional(),
  credential: z.union([z.email(), z.literal("")]).optional(),
});

// Infer TypeScript type otomatis dari Zod schema
export type LogDataInput = z.infer<typeof logDataSchema>;