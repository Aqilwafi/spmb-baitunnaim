// components/buttons/LogoutButton.tsx
'use client';

import { Button } from "@bn/ui"; // 💡 Import langsung dari shared UI package monorepo kamu
import { LogOut } from "lucide-react";
import { executeSharedLogout } from "@bn/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    const response = await executeSharedLogout();
    
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
      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2 rounded-xl"
    >
      <LogOut size={16} />
      {isLoading ? "Keluar..." : "Logout"}
    </Button>
  );
}