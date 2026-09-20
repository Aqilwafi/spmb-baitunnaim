import { BaseResponse, BaseFormPayload, AuthActivityLogs } from "@bn/types";
interface ExecuteInviteAdminParams extends BaseFormPayload {
    logData: AuthActivityLogs;
    redirectUrl: string;
}
export declare function executeAdminInvite({ payload, logData, redirectUrl }: ExecuteInviteAdminParams): Promise<BaseResponse>;
export {};
//# sourceMappingURL=invite.d.ts.map