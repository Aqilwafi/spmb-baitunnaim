// src/app/register/page.tsx
import Link from "next/link";
import { Card, CompanyLogo } from "@bn/ui";
import BackButton from "@/components/buttons/BackButton";
import RegisterForm from "@/components/auth/register-form"; // 💡 Catatan: Nanti kalau sempat, ganti nama filenya jadi register-form.tsx ya biar konsisten kebab-case!

export default function RegisterPage() {
  return (
    // 💡 Ditambahkan 'relative' agar absolute positioning milik BackButton mengacu ke main ini
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-3 relative">
      
      {/* 🌟 Tombol Back Melayang - Responsif HP (top-4) & Desktop (md:top-8) */}
      <div className="absolute top-4 left-4 md:top-8 md:left-8">
        <BackButton />
      </div>

      {/* Kontainer Utama */}
      <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto">
        
        {/* Header Area (Logo & Nama Aplikasi) */}
        <div className="flex flex-col items-center gap-2 text-center mt-4">
          <div className="relative w-[100px] h-[100px] shadow-sm rounded-full">
            <CompanyLogo />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {"BAITUN NA'IM"}
          </h1>
        </div>

        {/* Kotak Form Utama */}
        <Card className="w-full p-4 shadow-md bg-white rounded-2xl flex flex-col gap-2">
          {/* Sesuai standar, kita tambahkan padding bottom sedikit (pb-2) agar garis border-b tidak menempel teks */}
          <div className="text-center border-b border-gray-100 pb-2">
            <h2 className="text-lg font-bold text-gray-800 tracking-wider">BUAT AKUN BARU</h2>
            <p className="text-xs text-gray-400 mt-1">Silakan daftarkan akun baru Anda</p>
          </div>

          {/* Form Register */}
          <RegisterForm />
        </Card>

        {/* Navigasi Tambahan */}
        <div className="flex flex-col gap-2 text-center mt-2 mb-4">
          <p className="text-sm text-gray-500">
            {"Sudah punya akun? "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 transition-colors font-semibold hover:underline"
            >
              Masuk di sini
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}