export const formatDateTimeId = (dateString: string | Date | null | undefined): string => {
  // 1. Tangani nilai null, undefined, atau string kosong
  if (!dateString) return "-";

  // 2. Konversi ke objek Date
  const date = new Date(dateString);

  // 3. Validasi apakah tanggal valid (menghindari "Invalid Date")
  if (isNaN(date.getTime())) return "-";

  // 4. Format menggunakan Intl (Native API browser/Node.js)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};