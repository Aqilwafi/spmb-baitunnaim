// apps/admin/src/app/dashboard/manage/admin/page.tsx

import BackButton from "@/components/buttons/BackButton";
import { ShieldUser } from "lucide-react";
import { getListUsers } from "@/features/users/list";
import { getMasterRolesOptions } from "@/features/users/roles/role";
import ManageAdminClient from "@/components/manage/ManageAdminClient";

export default async function ManageAdminPage() {
  // Panggil data langsung di dalam Server Component
  const users = await getListUsers([2, 4, 5]);
  const roleList = await getMasterRolesOptions([4, 5]);
  

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

        {/* Client Component untuk Tabel dan Tombol Invite */}
        <ManageAdminClient users={users} roleList={roleList} />

      </div>
    </div>
  );
}