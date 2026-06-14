"use client";

import { useActionState, useEffect, useState } from "react";
import { registerAction } from "@/actions/auth/auth.actions";
import Link from "next/link";
import { CheckCircle2, Mail } from "lucide-react"; // Opsional: jika ingin icon di modal

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (state?.success) {
      setShowModal(true);
    }
  }, [state]);

  return (
    <section className="p-6 max-w-md mx-auto w-full">
      <form action={formAction} className="flex flex-col gap-4">
        
        {/* Email Field */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Email</label>
          <input
            name="email"
            type="email"
            required
            placeholder="email@example.com"
            className="border rounded-lg px-3 py-2 text-gray-500 focus:outline-blue-500"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col relative">
          <label className="mb-1 font-medium text-gray-700">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className="border rounded-lg px-3 py-2 pr-10 text-gray-500 focus:outline-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-gray-400 cursor-pointer hover:text-blue-500"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col relative">
          <label className="mb-1 font-medium text-gray-700">Konfirmasi Password</label>
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            required
            placeholder="••••••••"
            className="border rounded-lg px-3 py-2 pr-10 text-gray-500 focus:outline-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-gray-400 cursor-pointer hover:text-blue-500"
          >
            {showConfirmPassword ? "Hide" : "Show"}
          </button>
        </div>

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        {/* Button Group: Sesuai dengan Login Form */}
        <div className="flex gap-3 mt-2">
          <Link href="/" className="flex-1">
            <button 
              type="button" 
              className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors cursor-pointer"
            >
              Kembali
            </button>
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="flex-[2] bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer hover:bg-blue-700 transition-colors"
          >
            {isPending && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />}
            {isPending ? "Mendaftarkan..." : "Daftar Akun"}
          </button>
        </div>
      </form>

      {/* --- MODAL SUKSES --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full text-center shadow-2xl animate-in fade-in zoom-in duration-300">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} />
            </div>
            
            <h3 className="text-2xl font-black text-gray-900 mb-2">Cek Email Anda!</h3>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Kami telah mengirimkan tautan verifikasi ke <br/>
              <span className="font-bold text-gray-800">{state?.email}</span>
            </p>

            <Link href="/login" className="block w-full">
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-[0.98]">
                Lanjut ke Login
              </button>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}