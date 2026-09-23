'use server';

import { headers } from "next/headers";
import { executeAdminInvite } from "@/features/users/invite";
import { isValidationError } from "@bn/utils";
import { BaseErrorMessage } from "@bn/constants";

export async function inviteAdminAction(_prevState: unknown, formData: FormData) {
    try {
        const payload = Object.fromEntries(formData.entries());
        const headersList = await headers();
        const logData = {
            ip: headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headersList.get("x-real-ip") ?? null,
            userAgent: headersList.get("user-agent"), 
            forwardedFor: headersList.get("x-forwarded-for"),
            realIp: headersList.get("x-real-ip"),
        };
        const siteUrl = `${process.env.NEXT_PUBLIC_ADMIN_URL!}/auth/callback?next=/set-password`;
        const result = await executeAdminInvite({payload, logData, redirectUrl: siteUrl});

        if (!result.success) {
            return result;
        }

        return result;
        
    } catch (error) {
        if (isValidationError(error)) {
            return {
                success: false,
                message: error.message,
                errors: error.errors,
            };
        }
        return {
            success: false,
            message: BaseErrorMessage.SERVER_ERROR
        } 
    }
    
}