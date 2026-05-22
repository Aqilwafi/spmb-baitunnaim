"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@/actions/authAction";
import Link from "next/link";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="p-6 max-w-md mx-auto w-full">
      <form action={formAction} className="flex flex-col gap-4">
        
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Email</label>
          <input
            name="identifier" // Harus sama dengan formData.get("identifier")
            type="email"
            required
            placeholder="email@example.com"
            className="border rounded-lg px-3 py-2 text-gray-500 focus:outline-blue-500"
          />
        </div>

        <div className="flex flex-col relative">
          <label className="mb-1 font-medium text-gray-700">Password</label>
          <input
            name="password" // Harus sama dengan formData.get("password")
            type={showPassword ? "text" : "password"}
            required
            className="border rounded-lg px-3 py-2 pr-10 text-gray-500 focus:outline-blue-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-9 text-sm text-gray-400 cursor-pointer"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {state?.error && <p className="text-red-500 text-sm">{state.error}</p>}

        <div className="flex gap-3 mt-2">
          <Link href="/" className="flex-1">
            <button type="button" className="w-full px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
              Kembali
            </button>
          </Link>

          <button
            type="submit"
            disabled={isPending}
            className="flex-[2] bg-blue-600 text-white py-2 rounded-lg disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isPending && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4" />}
            {isPending ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </section>
  );
}