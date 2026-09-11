"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth/auth";
import { Button, EmailInput, PasswordInput } from "@bn/ui"; 

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

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

      {/* Field: Password */}
      <div>
        <PasswordInput 
          name="password"
          required
        />
        {state?.errors?.password && (
          <p className="text-red-500 text-xs mt-1">{state.errors.password[0]}</p>
        )}
      </div>

      {/* Global Message (Error Kredensial / Server Error / Message) */}
      {state?.message && (
        <p className={`text-sm ${state.success ? "text-green-600" : "text-red-500"}`}>
          {state.message}
        </p>
      )}

      {/* Submit Button */}
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}