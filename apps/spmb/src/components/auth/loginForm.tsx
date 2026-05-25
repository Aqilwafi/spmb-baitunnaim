"use client";

import { useActionState, useState } from "react";
import { loginAction } from "@bn/auth";
import Link from "next/link";
import { Button, Input, Label } from "@bn/ui"; 

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form action={formAction} className="text-black flex flex-col gap-4 w-full">
      
      {/* Input Email */}
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="identifier">Email</Label>
        <Input
          id="identifier"
          name="identifier"
          type="email"
          required
          placeholder="email@example.com"
          className="px-4 py-4"
        />
      </div>

      {/* Input Password */}
      <div className="flex flex-col gap-1.5 w-full">
        <Label htmlFor="password">Password</Label>
      
        <div className="flex items-center gap-2 w-full">
          
          <div className="flex-1">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
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

      {/* Pesan Error */}
      {state?.message && (
        <p className="text-red-500 text-sm font-medium mt-1">{state.message}</p>
      )}

      {/* Tombol Aksi */}
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
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </div>
    </form>
  );
}