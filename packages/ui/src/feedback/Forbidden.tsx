// packages/ui/src/Forbidden.tsx
import { ShieldAlert, ArrowLeft, Lock } from "lucide-react";
import { Button } from "../core/button";
import type { ReactNode } from "react";

export interface ForbiddenProps {
  primaryAction: ReactNode;
  secondaryAction?: ReactNode;
}

export function Forbidden({ primaryAction, secondaryAction }: ForbiddenProps) {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-6 min-h-screen">
      <div className="flex flex-col items-center gap-6 p-10 bg-white shadow-2xl rounded-[2.5rem] w-full max-w-lg text-center border border-red-50">
        
        <div className="relative">
          <div className="bg-red-50 p-6 rounded-full">
            <ShieldAlert className="w-16 h-16 text-red-500" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-sm border border-gray-100">
            <Lock size={20} className="text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Akses Ditolak</h1>
          <p className="text-[11px] uppercase tracking-[0.3em] font-bold text-red-500">Error 403: Forbidden</p>
        </div>

        <p className="text-gray-500 text-sm leading-relaxed max-w-[280px] mx-auto">
          Maaf, Anda tidak memiliki izin untuk mengakses halaman ini. Hal ini bisa terjadi karena sesi berakhir atau pembatasan hak akses keamanan.
        </p>

        <div className="w-full pt-4 space-y-3">
          {primaryAction}
          {secondaryAction}
        </div>

        <div className="mt-4 pt-6 border-t border-dashed border-gray-100 w-full">
          <p className="text-[10px] text-gray-300 font-mono italic">
            Event ID: Security Policy
          </p>
        </div>
      </div>
    </div>
  );
}