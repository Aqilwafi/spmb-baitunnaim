// apps/admin/src/components/admin/EditAdminForm.tsx

"use client";

import { useState, useTransition } from "react";
import { Mail, UserCog, ShieldCheck, User, Ban, ShieldAlert, Trash2, CheckCircle2 } from "lucide-react";
import { Button, Input, Label, Select } from "@bn/ui"; 
import { MasterData } from "@bn/types";
import { formatDateTimeId } from "@bn/utils";

interface EditAdminFormProps {
  onSuccess?: () => void;
  roleList?: MasterData[];
  user: any; // Menerima data user yang sedang diedit
  showRole?: boolean; // Prop penentu apakah field role dan tombol suspend role ditampilkan
}

export default function UserForm({ onSuccess, roleList = [], user, showRole = true }: EditAdminFormProps) {
  const [isPending, startTransition] = useTransition();

  // State form diisi awal dari data user yang dipilih
  const [formData, setFormData] = useState({
    email: user?.email || "",
    username: user?.username || "",
    roleId: user?.roleId || "",
  });

  const [message, setMessage] = useState<{ success: boolean; text: string } | null>(null);

  // Dummy Action untuk Submit Simpan Perubahan
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Simulasi proses async / server action update
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setMessage({
        success: true,
        text: "Berhasil memperbarui data!",
      });

      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1200);
      }
    });
  };

  // Dummy Action untuk Aksi Khusus (Suspend Role, Suspend Akun, Hapus Akun, dll)
  const handleDummyAction = (actionName: string) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setMessage({ success: true, text: `Berhasil melakukan: ${actionName}` });
    });
  };

  const inputBaseClass =
    "w-full px-4 py-3 sm:px-5 sm:py-4 rounded-xl sm:rounded-2xl border-gray-200 bg-gray-50/50 focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-500 text-sm sm:text-base transition-colors";

  return (
    <div className="bg-white p-2">
     <div className="flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-2">
            <UserCog className="w-5 h-5 text-gray-700 shrink-0" />
            <h2 className="text-lg font-semibold text-gray-900 truncate">
              Edit {showRole ? "Admin" : "Pendaftar"}: {user?.username || user?.email}
            </h2>
          </div>
          <p className="text-xs text-gray-500 ml-7">
            Bergabung: {formatDateTimeId(user?.accountCreatedAt || user?.created_at)}
          </p>
        </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Field Email */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="email" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <Mail size={14} className="text-blue-600 shrink-0" />
            <span>EMAIL</span>
          </Label>
          <Input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputBaseClass}
          />
        </div>

        {/* Field Username */}
        <div className="space-y-1.5 sm:space-y-2">
          <Label htmlFor="username" className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
            <User size={14} className="text-blue-600 shrink-0" />
            <span>USERNAME <span className="text-gray-400 font-normal">(OPSIONAL)</span></span>
          </Label>
          <Input
            id="username"
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className={inputBaseClass}
          />
        </div>

        {/* Field Role Dropdown (Hanya muncul jika showRole bernilai true) */}
        {showRole && (
          <div className="space-y-1.5 sm:space-y-2">
            <Label className="text-xs sm:text-[13px] font-bold text-gray-600 ml-1 flex items-center gap-2">
              <ShieldCheck size={14} className="text-blue-600 shrink-0" />
              <span>ROLE ADMIN</span>
            </Label>
            <Select
              required
              placeholder="Pilih Role"
              options={roleList}
              value={formData.roleId}
              onChange={(val: any) => setFormData({ ...formData, roleId: val })}
              className={inputBaseClass}
            />
          </div>
        )}

        {message && (
          <p className={`text-sm flex items-center gap-1.5 ${message.success ? "text-green-600" : "text-red-500"}`}>
            <CheckCircle2 size={16} />
            {message.text}
          </p>
        )}

        {/* Tombol Simpan Perubahan */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isPending}
          className="w-full rounded-xl py-4 mt-2"
        >
          Simpan Perubahan
        </Button>

        {/* Zona Aksi Tambahan (Suspend Role, Suspend Akun, Hapus Akun) */}
        <div className="mt-4 pt-4 border-t border-dashed border-gray-200 flex flex-col gap-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Aksi Manajemen Akun</p>
          
          <div className="flex flex-col gap-2">
            <div className={`grid gap-2 grid-cols-2`}>
              
              <Button
                  type="button"
                  variant="secondary"
                  className="text-xs text-orange-600 border-orange-200 hover:bg-orange-50 flex items-center justify-center gap-1.5 py-3"
                  onClick={() => handleDummyAction("Suspend Role")}
                >
                  <ShieldAlert size={14} />
                  Suspend Role
                </Button>

              <Button
                type="button"
                variant="secondary"
                className="text-xs text-red-600 border-red-200 hover:bg-red-50 flex items-center justify-center gap-1.5 py-3"
                onClick={() => handleDummyAction("Suspend Akun")}
              >
                <Ban size={14} />
                Suspend Akun
              </Button>
            </div>

            {/* Tombol Hapus Akun ditaruh di paling bawah secara penuh */}
            <Button
              type="button"
              variant="secondary"
              className="text-xs text-red-700 border-red-300 bg-red-50/50 hover:bg-red-100 flex items-center justify-center gap-1.5 py-3 w-full"
              onClick={() => handleDummyAction("Hapus Akun")}
            >
              <Trash2 size={14} />
              Hapus Akun
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}