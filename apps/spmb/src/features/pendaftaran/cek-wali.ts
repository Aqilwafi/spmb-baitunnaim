// spmb @/features/form/cek-wali.ts

import { checkUserAccess } from "@/features/auth/guards";
import { formIdParamsSchema, formatZodErrors} from "@bn/validators";
import { createValidationError } from "@bn/utils";
import { checkWaliRequirement } from "@/services/pendaftaran/cek-wali";

export async function checkWaliRequirementStatus(formId: string): Promise<boolean> {

    // 1. Guard Access
    if (!(await checkUserAccess())) {
        throw new Error("Akses tidak diizinkan.");
    }
    
    // 2. Validasi Zod
    const parsed = formIdParamsSchema.safeParse(formId);
    if (!parsed.success) {
        throw createValidationError(
            formatZodErrors(parsed.error),
            parsed.error.issues[0]?.message ?? "Data formulir tidak valid."
        );
    }

    return checkWaliRequirement(parsed.data);
}