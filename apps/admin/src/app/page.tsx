// src/app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";


export default function HomePage() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            {/* Logo */}
            <div className="flex flex-col items-center gap-4 max-w-md w-full">
                <Image
                    src="/logo_lpi.jpg"   // ← langsung path, tanpa import
                    alt="Logo LPI"
                    width={120}
                    height={120}
                    priority
                    className="rounded-full -mt-10"
                  />
                <div className="flex flex-col gap-8 w-full max-w-xs">
                    <h1 className="text-2xl font-bold text-gray-900 text-center">
                    BAITUN NA&apos;IM
                    </h1>
                </div>
                <div className="flex flex-col gap-4 w-full max-w-md">
                    <Link href="/login">
                        <button className="w-full px-6 py-3 rounded-2xl bg-blue-500 text-white text-lg shadow hover:bg-blue-700 transition cursor-pointer">
                        LOGIN
                      </button>
                    </Link>
                    <Link href="/register">
                      <button className="w-full px-6 py-3 rounded-2xl bg-gray-200 text-gray-800 text-lg shadow hover:bg-gray-300 transition cursor-pointer">
                        DAFTAR AKUN BARU
                      </button>
                    </Link>
                </div>
            </div>
      </main>
    );
}
