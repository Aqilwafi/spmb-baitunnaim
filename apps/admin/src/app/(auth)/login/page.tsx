"use client";

import Image from "next/image";
import Link from "next/link";
import LoginForm from "@/components/auth/loginForm";

export default function LoginPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50">
      <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto mt-10 p-4">
        <Image
          src="/logo_lpi.jpg"
          alt="Logo LPI"
          width={120}
          height={120}
          priority
          className="rounded-full -mt-7"
        />

        <h1 className="text-2xl font-bold text-gray-900 text-center">
          BAITUN NA&apos;IM
        </h1>
        <h2 className="text-xl font-bold text-gray-900 text-center">LOGIN</h2>

        <LoginForm />

       {/* Navigasi Tambahan: Lupa Password & Register */}
        <div className="flex flex-col gap-2 text-center">
          <Link
            href="/auth/lupa-password" // Sesuaikan dengan route lupa password kamu
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
          >
            Lupa password?
          </Link>
          
          <p className="text-sm text-gray-500">
            Belum punya akun?{" "}
            <Link
              href="/register" // Sesuaikan dengan route register kamu
              className="text-blue-600 hover:text-blue-800 transition-colors font-semibold"
            >
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
