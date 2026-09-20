"use client";

import { useActionState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { forgotPasswordAction } from "@/actions/auth/forgot-password";
import { EmailInput, Button } from "@bn/ui";

export default function ForgotPasswordForm() {
  
  const [state, action, isPending] = useActionState(
        (prevState: any, formData: FormData) =>
          forgotPasswordAction(prevState, formData),
          null
      );
  

  // Helper untuk merender error per-field agar seragam
  const renderFieldError = (fieldError?: string | string[]) => {
    if (!fieldError) return null;
    const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
  };

  return (
    <form action={action} className="flex flex-col gap-4 w-full">
      {/* Global Message (Banner Sukses / Error) */}
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
          id="email"
          name="email"
          label="Email Terdaftar"
          required
          defaultValue={state?.data || ""}
        />
        {renderFieldError(state?.errors?.email)}
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending} className="rounded-xl">
        {isPending ? "Mengirim..." : "Kirim Link Reset"}
      </Button>
    </form>
  );
}