// apps/admin/src/components/admin/InviteAdminForm.tsx

"use client";

import { useActionState, useEffect } from "react";
import { Mail, UserPlus, ShieldCheck, User } from "lucide-react";
import { inviteAdminAction } from "@/actions/auth/invite";
import { Button, Input, Label, Select } from "@bn/ui"; 
import { MasterData } from "@bn/types";

interface InviteAdminFormProps {
  onSuccess?: () => void;
  roleList: MasterData[];
}

export default function InviteForm({ onSuccess, roleList }: InviteAdminFormProps) {
  const [state, formAction, isPending] =
    useActionState(inviteAdminAction, null);

  // Tutup modal otomatis jika status success bernilai true
  useEffect(() => {
    if (state?.success && onSuccess) {
      const timer = setTimeout(() => {
        onSuccess();
      }, 1500); // Beri jeda 1.5 detik agar pesan sukses terbaca dulu
      return () => clearTimeout(timer);
    }
  }, [state, onSuccess]);

  const inputBaseClass =
    "w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 text-sm sm:text-base transition-colors";

  return (
    <div className="bg-white p-2">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">
          Invite Admin
        </h2>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        {/* Field Email */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <Mail size={14} className="text-blue-600 shrink-0" />
            <span>EMAIL ADMIN</span>
          </Label>

          <div className="relative">
            <Input
              id="email"
              type="email"
              name="email"
              required
              placeholder="admin@example.com"
              className={inputBaseClass}
            />
          </div>
        </div>

        {/* Field Username (Opsional) */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="username" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <User size={14} className="text-blue-600 shrink-0" />
            <span>USERNAME <span className="text-gray-400 font-normal">(OPSIONAL)</span></span>
          </Label>

          <div className="relative">
            <Input
              id="username"
              type="text"
              name="username"
              placeholder="username_admin"
              className={inputBaseClass}
            />
          </div>
        </div>

        {/* Field Role Dropdown */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <ShieldCheck size={14} className="text-blue-600 shrink-0" />
            <span>ROLE ADMIN</span>
          </Label>
          <Select
            name="roleId"
            required
            placeholder="Pilih Role"
            options={roleList}
            className={inputBaseClass}
          />
        </div>

        {state?.message && (
          <p
            className={`text-sm ${
              state.success ? "text-green-600" : "text-red-500"
            }`}
          >
            {state.message as string}
          </p>
        )}

        {/* Tombol Submit */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isPending}
          className="w-full rounded-xl py-4 mt-2"
        >
          Kirim Undangan
        </Button>
      </form>
    </div>
  );
}