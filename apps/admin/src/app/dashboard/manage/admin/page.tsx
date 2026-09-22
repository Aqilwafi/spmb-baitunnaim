// apps/admin/src/app/dashboard/manage/admin/page.tsx

import BackButton from "@/components/buttons/BackButton";
import { ShieldUser } from "lucide-react";
import { getListUsers } from "@/features/users/list";
import { getMasterRolesOptions } from "@/features/users/roles/role";
import ManageAdminClient from "@/components/manage/ManageAdminClient";

export default async function ManageAdminPage() {
  const users = await getListUsers([2, 4, 5]);
  const roleList = await getMasterRolesOptions([4, 5]);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <ShieldUser className="w-6 h-6 text-blue-600 shrink-0" />

          <div>
            <h1 className="text-lg font-bold text-gray-900">
              Manage Admin
            </h1>
            <p className="text-xs text-gray-500">
              Kelola akun admin dan undangan akses.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <ManageAdminClient users={users} roleList={roleList} />
    </div>
  );
}