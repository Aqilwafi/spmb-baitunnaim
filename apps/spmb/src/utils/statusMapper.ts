// helpers/statusMapper.ts

export type StatusKey =
  | 'accepted'
  | 'rejected'
  | 'review'
  | 'awaiting list'
  | 'in progress';

const DEFAULT_STATUS: StatusKey = 'in progress';

export const statusConfig: Record<StatusKey, { bg: string; text: string; label: string }> = {
  accepted: { bg: 'bg-green-100', text: 'text-green-700', label: 'Diterima' },
  rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Ditolak' },
  review: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Dalam Review' },
  'awaiting list': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Cadangan' },
  'in progress': { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Dalam Proses' },
};

export function getStatusConfig(statusName?: string) {
  const key = statusName?.toLowerCase().trim() as StatusKey | undefined;

  return statusConfig[key ?? DEFAULT_STATUS] ?? statusConfig[DEFAULT_STATUS];
}
