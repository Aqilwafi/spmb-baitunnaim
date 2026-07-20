import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";

interface BlogCardProps {
  judul: string;
  slug: string;
  ringkasan?: string;
  content?: string; // dipakai untuk hitung estimasi waktu baca
  gambar?: string;
  kategori?: string;
  penulis?: string;
  tanggalDibuat: string;
}

export default function BlogCard({
  judul,
  slug,
  content,
  ringkasan,
  gambar,
  kategori,
  penulis,
  tanggalDibuat,
}: BlogCardProps) {

  const tanggal = new Date(tanggalDibuat).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hitungWaktuBaca = (text: string = ""): number => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const readTime = hitungWaktuBaca(content || ringkasan);
  const href = `/publikasi/${slug}`;

  return (
    <Link
      href={href}
      className="block bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
    >
      {gambar && (
        <div className="relative overflow-hidden rounded-lg mb-4">
          <Image
            src={gambar}
            alt={judul}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          {kategori && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded">
              {kategori}
            </span>
          )}
        </div>
      )}

      {!gambar && kategori && (
        <span className="inline-block bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded mb-3">
          {kategori}
        </span>
      )}

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
        <div className="flex items-center gap-1">
          <Clock size={14} />
          <span>{readTime} menit baca</span>
        </div>
        <span>📅 {tanggal}</span>
      </div>

      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{judul}</h3>

      {ringkasan && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{ringkasan}</p>
      )}

      <span className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
        Baca Selengkapnya <ArrowRight size={18} />
      </span>
    </Link>
  );
}