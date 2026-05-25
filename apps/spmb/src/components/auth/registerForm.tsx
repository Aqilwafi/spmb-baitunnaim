"use client";

import { useActionState, useEffect, useState } from "react";
import { registerAction } from "@bn/auth";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button, Input, Label, Modal } from "@bn/ui"; 

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
      <form action={formAction} className="text-black flex flex-col gap-4 w-full">
        
        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="email@example.com"
            className="w-full px-4 py-4"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label htmlFor="password">Password</Label>
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-4"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="px-3 py-4 h-full text-xs font-semibold text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer border border-transparent min-w-[60px] text-center"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="flex flex-col gap-1.5 w-full">
          <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
          <div className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                onChange={(e) => {
                  const passwordInput = document.getElementById("password") as HTMLInputElement;
                  if (e.target.value !== passwordInput?.value) {
                    e.target.setCustomValidity("Password dan Konfirmasi Password tidak cocok.");
                  } else {
                    e.target.setCustomValidity(""); // Kosongkan artinya lulus validasi HTML5
                  }
                }}
                className="w-full px-4 py-4"
              />
            </div>
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="px-3 py-4 h-full text-xs font-semibold text-gray-500 hover:text-black bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors cursor-pointer border border-transparent min-w-[60px] text-center"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Pesan Error (Disamakan dengan state.message) */}
        {state?.message && (
          <p className="text-red-500 text-sm font-medium mt-1">{state.message}</p>
        )}

        {/* Button Group (Menggunakan Komponen Button Global) */}
        <div className="flex gap-3 mt-3">
          <Link href="/" className="flex-1">
            <Button type="button" variant="secondary" className="w-full py-2.5">
              Kembali
            </Button>
          </Link>

          <Button
            type="submit"
            variant="primary"
            disabled={isPending}
            className="flex-[2] py-2.5 flex items-center justify-center gap-2"
          >
            {isPending && (
              <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />
            )}
            {isPending ? "Mendaftarkan..." : "Daftar Akun"}
          </Button>
        </div>
      </form>

      {/* --- MODAL SUKSES --- */}
      <Modal open={showModal}>
        <div className="text-center max-w-sm w-full animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} />
          </div>
          
          <h3 className="text-2xl font-black text-gray-900 mb-2">Cek Email Anda!</h3>
          <p className="text-gray-500 mb-8 leading-relaxed">
            Kami telah mengirimkan tautan verifikasi ke <br/>
            <span className="font-bold text-gray-800">{"email Anda"}</span>
          </p>

          <Link href="/login" className="block w-full">
            <Button variant="primary" className="w-full py-4 rounded-2xl font-bold shadow-lg">
              Lanjut ke Login
            </Button>
          </Link>
        </div>
      </Modal>
    </section>
  );
}