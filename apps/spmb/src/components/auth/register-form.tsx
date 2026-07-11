"use client";

import { useActionState, useState } from "react";
import { registerAction } from "@/actions/auth.actions"; 
import { TextInput, EmailInput, PasswordInput, Button } from "@bn/ui";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerAction, null);
  const [frontendError, setFrontendError] = useState<string | null>(null);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    const form = event.currentTarget; 
    const formData = new FormData(form);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");
    if (password !== confirmPassword) {
      event.preventDefault(); 
      setFrontendError("Password dan konfirmasi password tidak cocok!");
      return;
    }
    setFrontendError(null);
  };

  return (
    <form action={formAction} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      
      <EmailInput required defaultValue={state?.data?.email || ""}/>
      <TextInput id="username" name="username" defaultValue={state?.data?.username || ""} label="Username" placeholder="(opsional) silahkan isi sebagai nama akun anda"/>
      <PasswordInput name="password" required/>
      
      <PasswordInput 
        id="confirmPassword" 
        name="confirmPassword"
        label="Konfirmasi Password" 
        required 
      />

      {(frontendError || state?.message) && (
        <p className="text-red-500 text-sm">{frontendError || state?.message}</p>
      )}
      
      <Button type="submit" variant="primary" disabled={isPending}>
        {isPending ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}