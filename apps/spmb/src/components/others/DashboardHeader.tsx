// components/others/DashboardHeader.tsx

import LogoutButton from "@/components/buttons/LogoutButtons";
import BackButton from "@/components/buttons/BackButton";
import { CompanyLogo } from "@bn/ui";

interface DashboardHeaderProps {
  name: string;
  showBackButton?: boolean;
}

export default function DashboardHeader({
  name,
  showBackButton = true,
}: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex justify-between items-center max-w-5xl mx-auto h-14 sm:h-16 px-3 sm:px-6 gap-2">
        {/* Sisi Kiri: Back Button (Opsional) + User Info */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {showBackButton && (
            <div className="shrink-0">
              <BackButton />
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
              <CompanyLogo className="w-full h-full object-cover" />
            </div>

            <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate">
              <span className="hidden sm:inline font-normal text-gray-500">
                Halo,{" "}
              </span>
              {name}
            </span>
          </div>
        </div>

        {/* Sisi Kanan: Logout Button */}
        <div className="shrink-0">
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}