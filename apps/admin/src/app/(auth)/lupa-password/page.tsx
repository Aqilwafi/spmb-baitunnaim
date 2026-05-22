"use client";

import { useState } from "react";
import { forgotPasswordAction } from "@/actions/authAction";
import Link from "next/link";
import Image from "next/image";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const result = await forgotPasswordAction(email);
      setMessage({
        type: "success",
        text: result.message || "Link reset password telah dikirim ke email Anda jika akun tersebut terdaftar.",
      });
    } catch {
      setMessage({
        type: "error",
        text: "Terjadi gangguan koneksi. Silakan coba sesaat lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50 p-4">
      <div className="flex flex-col items-center gap-4 max-w-md w-full mx-auto p-4">
        <Image
          src="/logo_lpi.jpg"
          alt="Logo LPI"
          width={100}
          height={100}
          className="rounded-full shadow-sm"
        />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 uppercase">Lupa Password</h1>
          <p className="text-sm text-gray-500 mt-1">Masukkan email untuk memulihkan akses</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full space-y-4 bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 mt-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Terdaftar</label>
            <input
              type="email"
              required
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-gray-600"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-xl text-sm font-medium ${
                message.type === "success"
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-red-50 text-red-700 border border-red-100"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="flex gap-3">
            <Link href="/login" className="flex-1 text-center">
              <button
                type="button"
                className="w-full px-4 py-2 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Batal
              </button>
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] bg-blue-600 text-white py-2 rounded-xl font-bold text-sm hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading && (
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-3 h-3" />
              )}
              {loading ? "Mengirim..." : "Kirim Link"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}