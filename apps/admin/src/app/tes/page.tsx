// app/artikel/[slug]/page.tsx
import Image from 'next/image';

// Simulasi fungsi untuk mengambil data dari Database (Supabase / API Anda)
async function getArtikelBySlug(slug: string) {
  // Contoh data dummy yang mirip dengan struktur database Anda
  return {
    judul: "Gigi Sehat, Anak Ceria oleh Puskesmas Binangun",
    ringkasan: "Edukasi kesehatan gigi untuk anak-anak PAUD Plus Baitun Naim.",
    featuredImage: "/dash.jpeg", // Contoh URL gambar
    tanggal: "Rabu, 16 April 2025",
    // Ini adalah string HTML mentah yang disimpan dari Tiptap
    kontenHtml: `
      <p>Rabu, 16 April 2025 - PAUD Plus Baitun Naim kedatangan tamu istimewa dari Puskesmas Binangun dalam kegiatan edukasi kesehatan gigi untuk anak-anak.</p>
      <p>Dengan penuh semangat dan tawa, anak-anak belajar menjaga kebersihan mulut sejak dini. Kegiatan ini dikemas secara menarik dan interaktif, lengkap dengan peragaan dan praktik langsung bersama para petugas kesehatan.</p>
      <p>Terima kasih Puskesmas Binangun atas kunjungannya! Semoga ilmu yang dibagikan hari ini bermanfaat dan menjadi bekal bagi anak-anak kami untuk tumbuh sehat dan ceria dengan senyum yang menawan 😍✨</p>
      <p>#PAUDPlusBaitunNaim<br>#SenyumSehatAnak</p>
    `
  };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function HalamanDetailArtikel({ params }: PageProps) {
  const { slug } = await params;
  const artikel = await getArtikelBySlug(slug);

  return (
    <main className="min-h-screen bg-white text-gray-900 py-10 px-4">
      <article className="max-w-3xl mx-auto space-y-6">
        
        {/* 1. Judul Utama & Ringkasan */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
            {artikel.judul}
          </h1>
          <p className="text-lg text-gray-600 font-medium">
            {artikel.ringkasan}
          </p>
          <div className="text-sm text-gray-400 pt-1">
            Dipublikasikan pada {artikel.tanggal}
          </div>
        </div>

        {/* 2. Gambar Utama (Featured Image) */}
        <div className="relative w-full h-[350px] md:h-[450px] rounded-2xl overflow-hidden shadow-md">
          <Image 
            src={artikel.featuredImage} 
            alt={artikel.judul}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* 3. Isi Konten Artikel dari Tiptap (HTML) */}
        {/* Kelas 'prose' dari Tailwind typography otomatis merapikan elemen HTML */}
        <div 
          className="prose prose-lg max-w-none prose-headings:font-bold prose-p:leading-relaxed text-gray-800"
          dangerouslySetInnerHTML={{ __html: artikel.kontenHtml }}
        />

      </article>
    </main>
  );
}