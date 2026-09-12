"use client";

import { useEffect } from "react";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Terjadi kesalahan pada aplikasi:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 min-h-screen">
      <div className="flex flex-col items-center gap-6 p-10 bg-white shadow-2xl rounded-[2.5rem] w-full max-w-lg text-center border border-gray-100">
        
        {/* Visual Element */}
        <div className="relative">
          <div className="bg-red-50 p-8 rounded-full">
            <AlertTriangle className="w-16 h-16 text-red-500 stroke-[1.5]" />
          </div>
          <div className="absolute -top-2 -right-2 bg-white p-3 rounded-full shadow-md">
            <span className="text-xl font-black text-red-600">ERR</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">
            Sistem Kendala?
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">
            Terjadi Kesalahan Sistem
          </p>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed max-w-[300px] mx-auto">
          {error.message || "Maaf, kami mengalami kendala tak terduga saat memproses permintaan Anda. Silakan coba beberapa saat lagi."}
        </p>

        {/* Action Buttons */}
        <div className="w-full pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-100 cursor-pointer"
          >
            <RefreshCcw size={18} />
            Coba Lagi
          </button>
          
          <Link
            href="/dashboard"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all active:scale-95"
          >
            <Home size={18} />
            Dashboard
          </Link>
        </div>

        <div className="mt-4 pt-6 border-t border-dashed border-gray-100 w-full">
          <p className="text-[10px] text-gray-400 font-medium">
            Jika kendala ini terus berlanjut, silakan hubungi tim dukungan atau muat ulang halaman.
          </p>
        </div>
      </div>
    </div>
  );
}