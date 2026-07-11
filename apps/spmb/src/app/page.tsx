// src/app/page.tsx
import Link from "next/link";
import { Button, CompanyLogo } from "@bn/ui"; // 💡 Pakai yang sudah di-shared

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col items-center gap-6 max-w-md w-full mx-auto">
        
        {/* Header Area */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="relative w-[120px] h-[120px] shadow-sm rounded-full">
            <CompanyLogo />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-wide">
            {"BAITUN NA'IM"}
          </h1>
        </div>

        {/* Action Buttons Area */}
        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Link href="/login">
            <Button variant="primary" className="w-full">
              LOGIN
            </Button>
          </Link>
          <Link href="/register" >
            <Button variant="secondary" className="w-full">
              DAFTAR AKUN BARU
            </Button>
          </Link>
        </div>

      </div>
    </main>
  );
}