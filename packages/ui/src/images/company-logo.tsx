import Image from "next/image";

export function CompanyLogo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo_lpi.jpg"
      alt="Logo LPI"
      fill
      sizes="(max-width: 640px) 100px, 100px" // Karena ukurannya konisten ~100px
      className={`object-cover rounded-full ${className}`}
      priority
    />
  );
}