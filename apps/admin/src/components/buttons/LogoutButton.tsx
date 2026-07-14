// components/buttons/LogoutButton.tsx
'use client';

import { Button } from "@bn/ui";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { logoutAction } from "@/actions/auth.actions";

type LogoutButtonProps = {
  showLabel?: boolean;
};

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
      className={`text-red-600 hover:text-red-700 hover:bg-red-50 flex items-center gap-2 rounded-xl ${
        showLabel ? "justify-start px-3" : "justify-center"
      }`}
      title="Logout"
    >
      <LogOut size={16} className="shrink-0" />
      {showLabel && <span>{isLoading ? "Keluar..." : "Logout"}</span>}
    </Button>
  );
}