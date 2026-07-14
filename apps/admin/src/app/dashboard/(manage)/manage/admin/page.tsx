// apps/admin/src/app/dashboard/page.tsx

import { Maintenance } from "@bn/ui";
import BackButton from "@/components/buttons/BackButton";
import { ShieldUser } from "lucide-react";

import InviteAdminForm from "@/components/auth/InviteForm";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
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

        {/* Invite Form */}
        <InviteAdminForm />

        {/* Maintenance */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <Maintenance />
        </div>

        {/* Footer */}
        <div className="flex justify-start">
          <BackButton />
        </div>
      </div>
    </div>
  );
}