"use client";

import Image from "next/image";
import Link from "next/link";
import RegisterForm from "../components/auth/registerForm";

export default function RegisterPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50">
      <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto mt-10 p-4">
        {/* Logo Identik dengan Login */}
        <Image
          src="/logo_lpi.jpg"
          alt="Logo LPI"
          width={120}
          height={120}
          priority
          className="rounded-full -mt-10"
        />

        {/* Header Identik dengan Login */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            BAITUN NA&apos;IM
          </h1>
          <h2 className="text-xl font-bold text-gray-900 uppercase">Buat Akun Baru</h2>
        </div>

        {/* Register Form (Sudah include styling section & max-w-md) */}
        <RegisterForm />

        {/* Navigasi Tambahan: Sudah punya akun? */}
        <div className="mt-2 text-center border-t border-gray-200 w-full">
          <p className="text-sm text-gray-500">
            Sudah punya akun?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
            >
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}