export type StatusKey = 'accepted' | 'rejected' | 'review' | 'awaiting list' | 'in progress';
export declare const statusConfig: Record<StatusKey, {
    bg: string;
    text: string;
    label: string;
}>;
export declare function getStatusConfig(statusName?: string): {
    bg: string;
    text: string;
    label: string;
};
//# sourceMappingURL=statusMapper.d.ts.map