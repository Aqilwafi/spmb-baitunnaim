"use client";

import { useActionState } from "react";
import { forgotPasswordAction } from "@/actions/auth.actions";
import { EmailInput, Button } from "@bn/ui";

export default function ForgotPasswordForm() {
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      {/* Field: Email */}
      <div>
        <EmailInput
          id="email"
          name="email"
          label="Email Terdaftar"
          required
          defaultValue={state?.data?.email || ""}
        />
        {state?.errors?.email && (
          <p className="text-red-500 text-xs mt-1">{state.errors.email[0]}</p>
        )}
      </div>

      {/* Global Message (Sukses Kirim Link / Server Error) */}
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
        {isPending ? "Mengirim..." : "Kirim Link Reset"}
      </Button>
    </form>
  );
}