import { executeSharedLogout } from "@bn/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { CompanyLogo, Button } from "@bn/ui";

export default function DashboardHeader({ name }: { name: string }) {
  async function handleServerLogout() {
    'use server';
    await executeSharedLogout();
    redirect("/login");
  }

  return (
    <header className="flex justify-between items-center max-w-5xl mx-auto h-16 px-4 md:px-6">
      {/* Kontainer Halo & Logo Gambar */}
      <div className="flex items-center gap-3 text-gray-700 font-medium text-sm md:text-base">
        
        {/* Logo Perusahaan / Avatar */}
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-100 flex-shrink-0">
          <CompanyLogo className="w-full h-full object-cover" />
        </div>

        {/* 💡 Responsif: Di HP cuma muncul namanya saja, di desktop muncul utuh */}
        <span className="truncate max-w-[150px] sm:max-w-none">
          <span className="hidden sm:inline text-gray-800 font-normal">Halo, </span>
          {name}
        </span>
      </div>

      {/* Logout menggunakan Form Action murni Server-Side */}
      <form action={handleServerLogout}>
        {/* 💡 Responsif: Di HP kecilkan padding. Varian ghost disesuaikan */}
        <Button 
          type="submit" 
          variant="ghost" 
          className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 px-2 py-1.5 sm:px-3 sm:py-2 rounded-xl text-sm md:text-base"
        >
          <LogOut size={16} className="flex-shrink-0" />
          {/* 💡 Responsif: Tulisan "Logout" hilang di HP, muncul di layar sm (640px) ke atas */}
          <span className="hidden sm:block">Logout</span>
        </Button>
      </form>
    </header>
  );
}