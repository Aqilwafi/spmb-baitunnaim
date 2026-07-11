import Image from "next/image";
import Link from "next/link";
import { Card } from "@bn/ui"; // ← Import Card dari UI package Anda
import SetPasswordForm from "@/components/auth/password-form";

export default function ResetPasswordPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto">
        
        {/* Header Area (Logo & Nama Aplikasi) */}
        <div className="flex flex-col items-center gap-3 text-center">
          <Image
            src="/logo_lpi.jpg"
            alt="Logo LPI"
            width={100}
            height={100}
            priority
            className="rounded-full shadow-sm"
          />
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {"BAITUN NA'IM"}
          </h1>
        </div>

        {/* Kotak Form Utama menggunakan Shared Component Card */}
        <Card className="w-full p-6 shadow-md bg-white rounded-2xl flex flex-col gap-5">
          <div className="text-center border-b border-gray-100 pb-3">
            <h2 className="text-lg font-bold text-gray-800 tracking-wider">RESET PASSWORD AKUN</h2>
            <p className="text-xs text-gray-400 mt-1">Silakan reset password akun Anda</p>
          </div>

          {/* Form Login */}
          <SetPasswordForm />
        </Card>

      </div>
    </main>
  );
}