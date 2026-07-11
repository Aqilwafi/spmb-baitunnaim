"use client";

import { useActionState, useState } from "react";

import { setPasswordAction } from "@/actions/users.actions";

import {
  TextInput,
  PasswordInput,
  Button,
} from "@bn/ui";

export default function SetPasswordForm() {
  const [state, formAction, isPending] =
    useActionState(setPasswordAction, null);

  const [frontendError, setFrontendError] =
    useState<string | null>(null);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const formData = new FormData(event.currentTarget);

    const password = formData.get("password");
    const confirmPassword =
      formData.get("confirmPassword");

    if (password !== confirmPassword) {
      event.preventDefault();

      setFrontendError(
        "Password dan konfirmasi password tidak cocok!"
      );

      return;
    }

    setFrontendError(null);
  };

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full"
    >
      <TextInput
        id="username"
        name="username"
        label="Username"
        placeholder="(opsional) nama akun admin"
        defaultValue={state?.message || ""}
      />

      <PasswordInput
        id="password"
        name="password"
        label="Password Baru"
        required
      />

      <PasswordInput
        id="confirmPassword"
        name="confirmPassword"
        label="Konfirmasi Password"
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
          : "Aktivasi Akun"}
      </Button>
    </form>
  );
}