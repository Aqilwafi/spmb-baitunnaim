import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    nama_lengkap: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export type RegisterInput = z.infer<typeof registerSchema>;
//# sourceMappingURL=auth.d.ts.map