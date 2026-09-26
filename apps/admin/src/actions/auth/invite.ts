'use server';

import { executeAdminInvite } from "@/features/users/invite";
import { isValidationError, getHeaderData } from "@bn/utils";
import { BaseErrorMessage } from "@bn/constants";

export async function inviteAdminAction(_prevState: unknown, formData: FormData) {
    try {
        const payload = Object.fromEntries(formData.entries());
        
        const logData = await getHeaderData();
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