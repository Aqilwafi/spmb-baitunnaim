// src/app/login/page.tsx
import Link from "next/link";
import { Card, CompanyLogo, BackButton } from "@bn/ui";
import LoginForm from "@/components/auth/login-form"; // 💡 Catatan: Jika sempat, ganti nama file jadi login-form.tsx nanti ya!

export default function LoginPage() {
  return (
    // 💡 Ditambahkan 'relative' agar absolute positioning milik BackButton mengacu ke main ini
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 relative">
      
      {/* 🌟 Tombol Back Melayang - Mengembalikan pengguna ke Landing/Home Page */}
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
        <Card className="w-full p-6 shadow-md bg-white rounded-2xl flex flex-col gap-5">
          <div className="text-center border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-800 tracking-wider">LOGIN</h2>
            <p className="text-xs text-gray-400 mt-1">Silakan masuk ke akun Anda</p>
          </div>

          {/* Form Login */}
          <LoginForm />
        </Card>

        {/* Navigasi Tambahan: Lupa Password & Register */}
        <div className="flex flex-col gap-2 text-center mt-2 mb-4">
          <Link
            href="/auth/lupa-password"
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium hover:underline"
          >
            Lupa password?
          </Link>
          
          <p className="text-sm text-gray-500">
            {"Belum punya akun? "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-800 transition-colors font-semibold hover:underline"
            >
              Daftar di sini
            </Link>
          </p>
        </div>

      </div>
    </main>
  );
}