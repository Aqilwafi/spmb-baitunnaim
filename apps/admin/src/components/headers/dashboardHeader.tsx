"use client";

import { useState } from "react";
import { logoutAction } from "@/actions/auth/auth.actions";
import { Loader2, LogOut, UserCircle } from "lucide-react";

export default function DashboardHeader({ name }: { name?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const nama = name || "User";

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logoutAction();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoading(false);
    }
  };

  return (
    <header className="w-full bg-blue-600 text-white px-4 md:px-6 py-4 shadow-md flex justify-between items-center sticky top-0 z-40">
      {/* Sisi Kiri: Branding/Welcome */}
      <div className="flex items-center gap-2 min-w-0">
        <UserCircle className="hidden sm:block w-6 h-6 flex-shrink-0" />
        <h1 className="text-lg md:text-xl font-bold truncate">
          <span className="font-normal opacity-90 hidden xs:inline">Halo, </span>
          {nama}
        </h1>
      </div>

      {/* Sisi Kanan: Button Logout */}
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 bg-white text-blue-600 rounded-xl font-bold transition-all hover:bg-gray-100 cursor-pointer active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed whitespace-nowrap shadow-sm"
      >
        {isLoading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span className="text-sm md:text-base">Wait...</span>
          </>
        ) : (
          <>
            <LogOut size={18} className="text-red-500" aria-label="Logout icon"/> 
            <span className="hidden sm:inline text-red-500">Logout</span>
          </>
        )}
      </button>
    </header>
  );
}