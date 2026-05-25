import Image from "next/image";
import Link from "next/link";
import { Card } from "@bn/ui";
import RegisterForm from "@/components/auth/registerForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-3">
      <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto">
        
        {/* Header Area (Logo & Nama Aplikasi) - Identik dengan Login */}
        <div className="flex flex-col items-center gap-2 text-center mt-4">
          <Image
            src="/logo_lpi.jpg"
            alt="Logo LPI"
            width={100} // Disamakan ukurannya menjadi 100
            height={100}
            priority
            className="rounded-full shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {"BAITUN NA'IM"}
          </h1>
        </div>

        {/* Kotak Form Utama menggunakan Shared Component Card */}
        <Card className="w-full p-4 shadow-md bg-white rounded-2xl flex flex-col gap-2">
          <div className="text-center border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 tracking-wider">BUAT AKUN BARU</h2>
            <p className="text-xs text-gray-400 mt-1">Silakan daftarkan akun baru Anda</p>
          </div>

          {/* Form Register */}
          <RegisterForm />
        </Card>

        {/* Navigasi Tambahan: Sudah punya akun? */}
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