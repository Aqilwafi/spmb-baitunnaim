"use client";

import { useState } from "react";
import { useActionState } from "react";
import { registerAction } from "@/actions/authAction"; 
import { TextInput, EmailInput, PasswordInput, Button } from "@bn/ui";

export default function RegisterForm() {
  const [fields, setFields] = useState({ 
    email: "", 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  
  // State lokal untuk error validasi di UI
  const [clientError, setClientError] = useState<string | null>(null);
  
  // State dari Server Action
  const [state, formAction, isPending] = useActionState(registerAction, null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Reset error saat user mulai mengetik ulang
    if (clientError) setClientError(null);
  };

  const handleSubmit = async (formData: FormData) => {
    // 1. Validasi UI: Cek kecocokan password
    if (fields.password !== fields.confirmPassword) {
      setClientError("Password dan Konfirmasi Password tidak cocok.");
      return;
    }
    
    // 2. Jika lolos, kirim ke Server Action
    setClientError(null);
    formAction(formData);
  };

  return (
    <form action={handleSubmit} className="flex flex-col gap-4">
      <EmailInput 
        id="email" 
        name="email" 
        value={fields.email} 
        onChange={handleChange} 
        required 
      />
      
      <TextInput 
        id="username" 
        name="username" 
        label="Username" 
        value={fields.username} 
        onChange={handleChange} 
        required 
      />
      
      <PasswordInput 
        id="password" 
        name="password" 
        label="Password" 
        value={fields.password} 
        onChange={handleChange} 
        required 
      />

      <PasswordInput 
        id="confirmPassword" 
        name="confirmPassword" 
        label="Konfirmasi Password" 
        value={fields.confirmPassword} 
        onChange={handleChange} 
        required 
      />
      
      {/* Area Menampilkan Pesan (Error atau Sukses) */}
      {(clientError || state?.message) && (
        <p className={`text-sm ${state?.success ? "text-green-600" : "text-red-600"}`}>
          {clientError || state?.message}
        </p>
      )}
      
      <Button type="submit" disabled={isPending}>
        {isPending ? "Mendaftar..." : "Daftar"}
      </Button>
    </form>
  );
}