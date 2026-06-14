"use client";

import { MapPinned, Home, Search, RefreshCcw } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 min-h-screen">
      <div className="flex flex-col items-center gap-6 p-10 bg-white shadow-2xl rounded-[2.5rem] w-full max-w-lg text-center border border-gray-100">
        
        {/* Visual Element */}
        <div className="relative">
          <div className="bg-blue-50 p-8 rounded-full">
            <Search className="w-16 h-16 text-blue-500 stroke-[1.5]" />
          </div>
          <div className="absolute -top-2 -right-2 bg-white p-3 rounded-full shadow-md">
            <span className="text-xl font-black text-blue-600">404</span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight italic">
            Halaman Hilang?
          </h1>
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-gray-400">
            Data tidak ditemukan
          </p>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed max-w-[300px] mx-auto">
          Ups! Kami sudah mencari ke seluruh penjuru sistem, tapi pendaftaran atau halaman yang Anda cari tidak ada di sini.
        </p>

        {/* Action Buttons */}
        <div className="w-full pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all active:scale-95 shadow-lg shadow-blue-100"
          >
            <Home size={18} />
            Dashboard
          </Link>
          
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all active:scale-95"
          >
            <RefreshCcw size={18} />
            Muat Ulang
          </button>
        </div>

        <div className="mt-4 pt-6 border-t border-dashed border-gray-100 w-full">
          <p className="text-[10px] text-gray-400 font-medium">
            Pastikan ID pendaftaran di URL sudah benar atau silakan kembali ke beranda utama.
          </p>
        </div>
      </div>
    </div>
  );
}