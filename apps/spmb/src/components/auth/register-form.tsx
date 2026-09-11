"use client";

import { useActionState } from "react";
import { registerAction } from "@/actions/auth/auth"; 
import { TextInput, EmailInput, PasswordInput, Button } from "@bn/ui";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      {/* Field: Email */}
      <div>
        <EmailInput 
          name="email"
          required 
          defaultValue={state?.data?.email || ""}
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Field: Username */}
      <div>
        <TextInput 
          id="username" 
          name="username" 
          defaultValue={state?.data?.username || ""} 
          label="Username" 
          placeholder="(opsional) silakan isi sebagai nama akun anda"
        />
        {state?.errors?.username && (
          <p className="text-red-500 text-xs mt-1">{state.errors.username[0]}</p>
        )}
      </div>

      {/* Field: Password */}
      <div>
        <PasswordInput 
          name="password" 
          required
          // defaultValue TIDAK DIPAKAI agar password otomatis kosong jika form error/re-render
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
        )}
      </div>

      {/* Field: Confirm Password */}
      <div>
        <PasswordInput 
          id="confirmPassword" 
          name="confirmPassword"
          label="Konfirmasi Password" 
          required 
          // defaultValue TIDAK DIPAKAI
        />
        {state?.errors?.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">{state.errors.confirmPassword[0]}</p>
        )}
      </div>

      {/* Global Message (Sukses / Server Error) */}
      {state?.message && (
        <p className={`text-sm ${state.success ? "text-green-600" : "text-red-500"}`}>
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}