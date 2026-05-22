// components/MaintenancePage.tsx
"use client";

import { Wrench } from "lucide-react";
import Link from "next/link";

export default function MaintenancePage() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 min-h-screen">
      <div className="flex flex-col items-center gap-5 p-8 bg-white shadow-md rounded-2xl w-full max-w-md text-center">
        <Wrench className="w-16 h-16 text-yellow-500 animate-pulse mt-2" />
        <h1 className="text-2xl font-semibold">Website Sedang Dalam Perbaikan</h1>
        <p className="text-gray-600 mb-4">
          Maaf, fitur ini sedang dalam proses maintenance.<br />
          Silakan coba lagi nanti.
        </p>

        {/* Tombol kembali ke halaman utama */}
        <Link
          href="/"
          className="mt-2 inline-block px-5 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium transition"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
