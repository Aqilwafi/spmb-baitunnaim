"use client";

import { useState } from "react";
import { updatePasswordAction } from "@/actions/authAction";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Konfirmasi password tidak cocok.");
      return;
    }

    setLoading(true);
    const result = await updatePasswordAction(password);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else {
      alert("Password berhasil diperbarui!");
      router.push("/login");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 bg-gray-50 p-4">
      <div className="max-w-md w-full mx-auto text-center space-y-6">
        <Image
          src="/logo_lpi.jpg"
          alt="Logo"
          width={80}
          height={80}
          className="rounded-full mx-auto"
        />

        <h1 className="text-2xl font-black text-gray-900">ATUR PASSWORD BARU</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-5 text-left"
        >
          <div className="relative">
            <label className="block text-sm font-bold text-gray-700 mb-1">Password Baru</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-600"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Konfirmasi Password</label>
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={6}
              className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 outline-none text-gray-600"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest hover:text-green-600"
            >
              {showPassword ? "Sembunyikan" : "Tampilkan Password"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-xs font-medium bg-red-50 p-2 rounded-lg border border-red-100 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-2xl font-black text-sm hover:bg-green-700 transition-all shadow-lg shadow-green-100 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
            )}
            {loading ? "Menyimpan Perubahan..." : "Update Password Sekarang"}
          </button>
        </form>
      </div>
    </main>
  );
}