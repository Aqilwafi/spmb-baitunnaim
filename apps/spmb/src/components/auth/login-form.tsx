"use client";

import { useActionState } from "react";
import { loginAction } from "@/actions/auth.actions";
import { Button, EmailInput, PasswordInput } from "@bn/ui"; 

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      
      {/* ✨ Semua input diurus oleh 1 komponen */}
      <EmailInput required defaultValue={(state && state.success === false) ? state.data?.email : ""}/>
      <PasswordInput required/>

      {state?.message && <p className="text-red-500 text-sm">{state.message}</p>}
      
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}