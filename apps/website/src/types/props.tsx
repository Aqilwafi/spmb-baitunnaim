export interface BlogCardProps {
  id: number;
  judul: string;
  slug: string;
  konten_md: string;
  ringkasan?: string;
  gambar?: string;
  kategori?: string;
  penulis?: string;
  sector?: string;
  waktu_baca: number;
  jumlah_komentar: number;
  unggulan: boolean;
  tanggal_dibuat: string;
  tanggal_diperbarui: string;
}

export interface BlogCardProps2 {
  id: number;
  judul: string;
  slug: string;
  ringkasan?: string;
  gambar?: string;
  kategori: string;
  penulis: string;

  waktu_baca?: number;
  jumlah_komentar?: number;
  unggulan?: boolean;

  tanggal_dibuat: string;
  tanggal_diperbarui: string;

  konten: string[];

  // Optional fields / opsional
  hashtags?: string[];
  sector?: string;

  sosial_media?: {
    instagram?: string[] | string;   // bisa array atau single
    tiktok?: string;
    youtube?: string;
  };

  kontak?: {
    whatsapp?: string;
    telp?: string;
    email?: string;
  };
}


/**
 * Props BlogCard adalah turunan Artikel
 */
export interface Artikel {
  id: number;
  judul: string;
  slug: string;
  konten_md: string;
  ringkasan?: string;
  gambar?: string;
  kategori?: string;
  penulis?: string;
  waktu_baca?: number;
  jumlah_komentar?: number;
  unggulan?: boolean;
  tanggal_dibuat: string;
}
