import LogoutButton from "@/components/buttons/LogoutButtons"; // Sesuaikan path import-nya
import { CompanyLogo } from "@bn/ui";

export default function DashboardHeader({ name }: { name: string }) {
  return (
    <header className="flex justify-between items-center max-w-5xl mx-auto h-16 px-4 md:px-6">
      {/* Kontainer Halo & Logo */}
      <div className="flex items-center gap-3 text-gray-700 font-medium text-sm md:text-base">
        <div className="relative w-8 h-8 rounded-full overflow-hidden bg-gray-200 border border-gray-100 flex-shrink-0">
          <CompanyLogo className="w-full h-full object-cover" />
        </div>

        <span className="truncate max-w-[150px] sm:max-w-none">
          <span className="hidden sm:inline text-gray-800 font-normal">Halo, </span>
          {name}
        </span>
      </div>

      {/* Langsung pakai komponen LogoutButton yang sudah ada */}
      <LogoutButton />
    </header>
  );
}