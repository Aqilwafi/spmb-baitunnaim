// components/buttons/LogoutButton.tsx
'use client';

import { Button } from "@bn/ui"; 
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/actions/auth/logout";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await logoutAction();
    
    if (response?.success) {
      router.refresh();
      router.push("/login");
    } else {
      alert(response?.message || "Gagal logout");
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading}
      variant="ghost" 
      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-1.5 rounded-xl px-2.5 sm:px-3 py-1.5"
      title="Logout"
    >
      <LogOut size={18} className="shrink-0" />
      {/* Teks disembunyikan di mobile, hanya muncul di layar sm ke atas */}
      <span className="hidden sm:inline font-medium text-xs sm:text-sm">
        {isLoading ? "Keluar..." : "Logout"}
      </span>
    </Button>
  );
}