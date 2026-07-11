"use client";

import { useActionState } from "react";

import { forgotPasswordAction } from "@/actions/auth.actions";

import {
  EmailInput,
  Button,
} from "@bn/ui";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] =
    useActionState(forgotPasswordAction, null);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-full"
    >
      <EmailInput
        id="email"
        label="Email Terdaftar"
        required
      />

      {state?.message && (
        <p
          className={`text-sm ${
            state.success ? "text-green-600" : "text-red-500"
          }`}
        >
          {state.message}
        </p>
      )}

      <Button
        type="submit"
        variant="primary"
        disabled={isPending}
      >
        {isPending ? "Mengirim..." : "Kirim Link Reset"}
      </Button>
    </form>
  );
}