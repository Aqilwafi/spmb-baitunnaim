// apps/admin/src/app/dashboard/manage/admin/page.tsx

import { Maintenance } from "@bn/ui";
import BackButton from "@/components/buttons/BackButton";
import { ShieldUser } from "lucide-react";

export default function Page() {
  return (
    
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-full mx-auto flex flex-col gap-6">
        

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex justify-start">
          <BackButton />
        </div>
            <ShieldUser className="w-8 h-8 text-blue-600" />

            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Manage Admin
              </h1>

              <p className="text-sm text-gray-500">
                Kelola akun admin dan undangan akses.
              </p>
            </div>
          </div>
        </div>

        {/* Maintenance */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <Maintenance />
        </div>
      </div>
    </div>
  );
}