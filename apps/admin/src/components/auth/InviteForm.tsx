// apps/admin/src/components/admin/InviteAdminForm.tsx

"use client";

import { useActionState, useEffect } from "react";
import { Mail, UserPlus } from "lucide-react";
import { inviteAdminAction } from "@/actions/auth/invite";
import { Button } from "@bn/ui"; // ✨ Import Button dari @bn/ui

interface InviteAdminFormProps {
  onSuccess?: () => void;
}

export default function InviteAdminForm({ onSuccess }: InviteAdminFormProps) {
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

  return (
    <div className="bg-white p-2">
      <div className="flex items-center gap-2 mb-4">
        <UserPlus className="w-5 h-5 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">
          Invite Admin
        </h2>
      </div>

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Email Admin
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="email"
              name="email"
              required
              placeholder="admin@example.com"
              className="
                text-black
                w-full
                rounded-xl
                border
                border-gray-300
                pl-10
                pr-4
                py-3
                outline-none
                focus:ring-2
                focus:ring-blue-500
                focus:border-blue-500
              "
            />
          </div>
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

        {/* Mengganti tag button HTML biasa dengan komponen Button @bn/ui */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isPending}
          className="w-full rounded-xl"
        >
          Kirim Invite
        </Button>
      </form>
    </div>
  );
}