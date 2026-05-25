// helpers/statusMapper.ts
const DEFAULT_STATUS = 'in progress';
export const statusConfig = {
    accepted: { bg: 'bg-green-100', text: 'text-green-700', label: 'Diterima' },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' },
    review: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Dalam Review' },
    'awaiting list': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Cadangan' },
    'in progress': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Dalam Proses' },
};
export function getStatusConfig(statusName) {
    const key = statusName?.toLowerCase().trim();
    return statusConfig[key ?? DEFAULT_STATUS] ?? statusConfig[DEFAULT_STATUS];
}
