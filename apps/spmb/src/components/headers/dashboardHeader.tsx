import { executeSharedLogout } from "@bn/auth";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";

export default function DashboardHeader({ name }: { name: string }) {
  async function handleServerLogout() {
    'use server'; // Mengubah fungsi ini menjadi server action inline
    await executeSharedLogout();
    redirect("/login"); // Menggunakan redirect bawaan server next/navigation
  }

  return (
    <header className="flex justify-between items-center max-w-5xl mx-auto h-16 px-4">
      <div>Halo, {name}</div>

      {/* 💡 Logout menggunakan Form Action murni Server-Side */}
      <form action={handleServerLogout}>
        <button type="submit" className="flex items-center gap-2 text-red-600">
          <LogOut size={16} />
          Logout
        </button>
      </form>
    </header>
  );
}