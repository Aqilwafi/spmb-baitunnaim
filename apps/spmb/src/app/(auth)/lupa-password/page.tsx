"use client";

import { useActionState } from "react"; // 1. Tambahkan ini
import { forgotPasswordAction } from "@/actions/authAction";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  // 2. Gunakan useActionState
  const [state, formAction, isPending] = useActionState(forgotPasswordAction, null);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50 p-4">
      <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto p-4">
        {/* ... Logo dan Header tetap sama ... */}

        {/* 3. Gunakan formAction sebagai action form */}
        <form
          action={formAction}
          className="w-full space-y-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Terdaftar</label>
            <input
              type="email"
              name="email" // WAJIB ada 'name' agar formData terisi
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-600"
              placeholder="example@email.com"
            />
          </div>

          {/* 4. Menampilkan state dari server */}
          {state && (
            <div className={`p-3 rounded-xl text-sm font-medium ${
                state.success ? "bg-green-50 text-green-700 border border-green-100" 
                              : "bg-red-50 text-red-700 border border-red-100"
            }`}>
              {state.message}
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/login" className="flex-1 text-center">
              <button type="button" className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 cursor-pointer">
                Batal
              </button>
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="flex-[2] bg-blue-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isPending && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-3 h-3" />}
              {isPending ? "Mengirim..." : "Kirim Link"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}