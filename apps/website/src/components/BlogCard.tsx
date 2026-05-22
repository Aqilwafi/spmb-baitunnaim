import Link from "next/link";
import Image from "next/image";
import { Clock, MessageCircle, ArrowRight } from "lucide-react";
import { BlogCardProps } from "@/types/props";

export default function BlogCard({
  judul,
  slug,
  konten_md,
  ringkasan,
  gambar,
  kategori,
  penulis,
  waktu_baca,
  jumlah_komentar = 0,
  unggulan = false,
  tanggal_dibuat,
}: BlogCardProps) {

  const tanggal = new Date(tanggal_dibuat).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // aman meski kosong
  const hitungWaktuBaca = (text: string = ""): number => {
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / 200));
  };

  const readTime = waktu_baca ?? hitungWaktuBaca(ringkasan || konten_md);
  const href = `/publikasi/${slug}`;

  const CardContent: React.FC = () => (
    <>
      {gambar && (
        <div className="relative overflow-hidden rounded-lg mb-4">
          <Image
            src={gambar}
            alt={judul}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
            priority={unggulan}
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
        <div className="flex items-center gap-1">
          <MessageCircle size={14} />
          <span>{jumlah_komentar}</span>
        </div>
      </div>

      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{judul}</h3>

      {ringkasan && (
        <p className="text-gray-600 text-sm mb-3 line-clamp-3">{ringkasan}</p>
      )}

      <span className="inline-flex items-center gap-2 text-gray-700 hover:text-orange-500 transition">
        Baca Selengkapnya <ArrowRight size={18} />
      </span>
    </>
  );

  if (unggulan) {
    return (
      <Link
        href={href}
        className="block bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition col-span-1 md:col-span-2"
      >
        <Image
          src={gambar || "/logo_lpi.png"}
          alt={judul}
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-lg mb-4"
          priority
        />

        {kategori && (
          <span className="inline-block bg-orange-500 text-white px-3 py-1 text-xs font-semibold rounded mb-3">
            {kategori}
          </span>
        )}

        <h2 className="text-2xl font-bold mb-3">{judul}</h2>

        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span>👤 {penulis || "Admin"}</span>
          <span>📅 {tanggal}</span>
          <span>⏱ {readTime} menit baca</span>
        </div>

        {ringkasan && <p className="text-gray-600 mb-4">{ringkasan}</p>}

        <span className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:text-orange-500 transition">
          Baca Selengkapnya <ArrowRight size={20} />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="block bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition"
    >
      <CardContent />
    </Link>
  );
}
