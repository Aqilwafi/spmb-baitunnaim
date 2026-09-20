"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { registerAction } from "@/actions/auth/register"; 
import { TextInput, EmailInput, PasswordInput, Button } from "@bn/ui";

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(
    (prevState: any, formData: FormData) =>
      registerAction(prevState, formData),
      null
  );
  

  // Helper untuk merender error per field agar seragam
  const renderFieldError = (fieldError?: string | string[]) => {
    if (!fieldError) return null;
    const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
  };

  return (
    <form action={action} className="flex flex-col gap-4 w-full">
      {/* Global Message (Banner Error / Success) */}
      {state?.message && (
        <div className={`flex items-start gap-3 p-4 border rounded-xl ${
          state.success 
            ? "bg-green-50 border-green-200 text-green-700" 
            : "bg-red-50 border-red-200 text-red-600"
        }`}>
          {state.success ? (
            <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          ) : (
            <AlertCircle className="mt-0.5 shrink-0" size={18} />
          )}
          <p className="text-xs font-medium leading-relaxed">{state.message}</p>
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

      {/* Field: Username */}
      <div>
        <TextInput 
          id="username" 
          name="username" 
          defaultValue={state?.data || ""} 
          label="Username" 
          placeholder="(opsional) silakan isi sebagai nama akun anda"
        />
        {renderFieldError(state?.errors?.username)}
      </div>

      {/* Field: Password */}
      <div>
        <PasswordInput 
          name="password" 
          required
        />
        {renderFieldError(state?.errors?.password)}
      </div>

      {/* Field: Confirm Password */}
      <div>
        <PasswordInput 
          id="confirmPassword" 
          name="confirmPassword"
          label="Konfirmasi Password" 
          required 
        />
        {renderFieldError(state?.errors?.confirmPassword)}
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending} className="rounded-xl">
        {isPending ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}