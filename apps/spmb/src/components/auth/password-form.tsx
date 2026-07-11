"use client";

import { useActionState, useState, useEffect } from "react";

import { resetPasswordAction } from "@/actions/auth/auth.actions";

import {
  PasswordInput,
  Button,
} from "@bn/ui";

export default function SetPasswordForm() {
  const [state, formAction, isPending] =
    useActionState(resetPasswordAction, null);

  const [frontendError, setFrontendError] =
    useState<string | null>(null);

  const [linkError, setLinkError] =
    useState<string | null>(null);

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

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(event.currentTarget);

    const newPassword = formData.get("newPassword");
    const confirmNewPassword = formData.get("confirmNewPassword");

    if (newPassword !== confirmNewPassword) {
      event.preventDefault();

      setFrontendError(
        "Password dan konfirmasi password tidak cocok!"
      );

      return;
    }

    setFrontendError(null);
  };

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
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      <PasswordInput
        id="newPassword"
        name="newPassword"
        label="Password Baru"
        required
      />

      <PasswordInput
        id="confirmNewPassword"
        name="confirmNewPassword"
        label="Konfirmasi Password Baru"
        required
      />

      {(frontendError || state?.message) && (
        <p className="text-sm text-red-500">
          {frontendError || state?.message}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
      >
        {isPending
          ? "Menyimpan..."
          : "Simpan Password Baru"}
      </Button>
    </form>
  );
}