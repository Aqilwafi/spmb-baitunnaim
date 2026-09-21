'use client';

import { Button } from "@bn/ui"; 
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/actions/auth/logout";

// 1. Tambahkan tipe props
interface LogoutButtonProps {
  showLabel?: boolean;
}

// 2. Terima prop showLabel (berikan nilai default misal true)
export default function LogoutButton({ showLabel = true }: LogoutButtonProps) {
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
      className="text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2 rounded-xl"
    >
      <LogOut size={16} />
      {/* 3. Render teks hanya jika showLabel bernilai true */}
      {showLabel && (isLoading ? "Keluar..." : "Logout")}
    </Button>
  );
}