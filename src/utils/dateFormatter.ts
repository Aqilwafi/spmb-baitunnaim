export const formatDateTimeId = (dateString: string | Date): string => {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};