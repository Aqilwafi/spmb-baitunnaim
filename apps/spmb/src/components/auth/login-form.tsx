"use client";

import { useActionState } from "react";
import { AlertCircle } from "lucide-react"; // Tambahkan icon jika ingin sama persis
import { loginAction } from "@/actions/auth/login";
import { Button, EmailInput, PasswordInput } from "@bn/ui"; 

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  // Helper render error field (sama seperti di biodata)
  const renderFieldError = (fieldError?: string | string[]) => {
    if (!fieldError) return null;
    const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
  };

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      {/* Pesan Error / Global Message dalam bentuk Banner (opsional agar persis) */}
      {state?.message && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="text-red-600 mt-0.5 shrink-0" size={18} />
          <p className="text-xs text-red-600 font-medium leading-relaxed">{state.message}</p>
        </div>
      )}

      {/* Field: Email */}
      <div>
        <EmailInput 
          name="email"
          required 
          defaultValue={state?.data || ""}
        />
        {renderFieldError(state?.errors?.email)}
      </div>

      {/* Field: Password */}
      <div>
        <PasswordInput 
          name="password"
          required
        />
        {renderFieldError(state?.errors?.password)}
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending} className="rounded-xl">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}