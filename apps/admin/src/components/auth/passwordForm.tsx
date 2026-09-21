"use client";

import { useActionState, useState, useEffect } from "react";
import { AlertCircle, CheckCircle2, AlertTriangle } from "lucide-react";
import { setPasswordAction } from "@/actions/auth/set-password";
import { PasswordInput, Button } from "@bn/ui";

export default function SetPasswordForm() {

  const [state, action, isPending] = useActionState(
      (prevState: any, formData: FormData) =>
        setPasswordAction(prevState, formData),
        null
    );

  const [linkError, setLinkError] = useState<string | null>(null);

  // Deteksi error expired/invalid token dari URL Hash
  useEffect(() => {
    const hash = window.location.hash;
    if (hash.includes("error=")) {
      const params = new URLSearchParams(hash.substring(1));
      const errorCode = params.get("error_code");

      if (errorCode === "otp_expired") {
        setLinkError(
          "Link reset password sudah kedaluwarsa. Silakan minta link baru."
        );
      } else {
        setLinkError(
          "Link reset password tidak valid. Silakan minta link baru."
        );
      }
    }
  }, []);

  // Helper untuk merender error per-field
  const renderFieldError = (fieldError?: string | string[]) => {
    if (!fieldError) return null;
    const message = Array.isArray(fieldError) ? fieldError[0] : fieldError;
    return <p className="text-[10px] text-red-500 mt-1">{message}</p>;
  };

  // Tampilan jika token link dari email error / expired (menggunakan Banner)
  if (linkError) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs font-medium leading-relaxed">{linkError}</p>
          <p>Silahkan hubungi Adnimistrator</p>
        </div>
      </div>
    );
  }

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

      {/* Field: Password Baru */}
      <div>
        <PasswordInput
          id="newPassword"
          name="newPassword"
          label="Password Baru"
          required
        />
        {renderFieldError(state?.errors?.newPassword)}
      </div>

      {/* Field: Konfirmasi Password Baru */}
      <div>
        <PasswordInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Konfirmasi Password Baru"
          required
        />
        {renderFieldError(state?.errors?.confirmNewPassword)}
      </div>

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending} className="rounded-xl">
        {isPending ? "Menyimpan..." : "Simpan Password Baru"}
      </Button>
    </form>
  );
}