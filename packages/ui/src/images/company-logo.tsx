import Image from "next/image";

export function CompanyLogo({ className = "" }: { className?: string }) {
  return (
    /* Wrapper wajib relative dan memiliki ukuran (width & height) */
    <div className={`relative w-12 h-12 ${className}`}>
      <Image
        src="/logo_lembaga.png"
        alt="Logo LPI"
        fill
        sizes="(max-width: 640px) 100px, 100px"
        // Gunakan object-contain agar logo vertikal tidak terpotong (crop)
        // Hapus rounded-full jika logo aslinya bukan lingkaran pas, 
        // atau biarkan jika ingin framenya berbentuk lingkaran.
        className="object-contain"
        priority
      />
    </div>
  );
}