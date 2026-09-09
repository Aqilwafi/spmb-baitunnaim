"use client";

import { useActionState, useState, useEffect } from "react";
import { resetPasswordAction } from "@/actions/auth.actions";
import { PasswordInput, Button } from "@bn/ui";

export default function SetPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    resetPasswordAction,
    null
  );

  const [linkError, setLinkError] = useState<string | null>(null);

  // Deteksi error expired/invalid token dari URL Hash (Supabase Auth / Provider style)
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

  // Tampilan jika token link dari email error / expired
  if (linkError) {
    return (
      <div className="flex flex-col gap-4 w-full">
        <p className="text-sm text-red-500">{linkError}</p>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/lupa-password")}
        >
          Minta Link Baru
        </Button>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      {/* Field: Password Baru */}
      <div>
        <PasswordInput
          id="newPassword"
          name="newPassword"
          label="Password Baru"
          required
        />
        {state?.errors?.newPassword && (
          <p className="text-red-500 text-xs mt-1">
            {state.errors.newPassword[0]}
          </p>
        )}
      </div>

      {/* Field: Konfirmasi Password Baru */}
      <div>
        <PasswordInput
          id="confirmNewPassword"
          name="confirmNewPassword"
          label="Konfirmasi Password Baru"
          required
        />
        {state?.errors?.confirmNewPassword && (
          <p className="text-red-500 text-xs mt-1">
            {state.errors.confirmNewPassword[0]}
          </p>
        )}
      </div>

      {/* Global Message (Sukses Reset / General Error) */}
      {state?.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-600" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Simpan Password Baru"}
      </Button>
    </form>
  );
}