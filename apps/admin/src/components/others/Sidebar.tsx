// apps/admin/src/components/sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Activity,
  UserCheck,
  Wallet,
  Files,
  ClipboardList,
  Newspaper,
  CircleUser,
  Menu,
  Users,
  PenLine,
  X,
  ShieldUser,
} from "lucide-react";

import LogoutButton from "@/components/buttons/LogoutButton";
import { useRouter } from "next/navigation";


type User = {
  username?: string;
  email: string;
  access_rights?: string[];
}

type SidebarProps = {
  canSpmb: boolean;
  canPublikasi: boolean;
  canManage: boolean;
  user?: User;
};

type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

type MenuGroup = {
  label: string;
  items: MenuItem[];
};

// todo: tambahkan halo nama! setelah Admin Panel
// props tambahkan data username dari layout.tsx 

export default function Sidebar({ canSpmb, canPublikasi, canManage, user, }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const groups: MenuGroup[] = [
    {
      label: "Umum",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
      ],
    },
    ...(canSpmb ? [{
      label: "SPMB",
      items: [
        { name: "Form Progress", path: "/dashboard/progress", icon: <Activity size={18} /> },
        { name: "Biodata Siswa", path: "/dashboard/biodata/siswa", icon: <UserCheck size={18} /> },
        { name: "Biodata Keluarga", path: "/dashboard/biodata/keluarga", icon: <Users size={18} /> },
        { name: "Pembayaran", path: "/dashboard/pembayaran", icon: <Wallet size={18} /> },
        { name: "Dokumen", path: "/dashboard/dokumen", icon: <Files size={18} /> },
        { name: "Keputusan", path: "/dashboard/keputusan", icon: <ClipboardList size={18} /> },
      ],
    }] : []),
    ...(canPublikasi ? [{
      label: "Publikasi",
      items: [
        { name: "Semua Artikel", path: "/dashboard/publikasi", icon: <Newspaper size={18} /> },
        { name: "Tulis Artikel", path: "/dashboard/publikasi/baru", icon: <PenLine size={18} /> },
      ],
    }] : []),
    ...(canManage ? [{
      label: "Manage Akun",
      items: [
        { name: "Pendaftar", path: "/dashboard/manage/users", icon: <CircleUser size={18} /> },
        { name: "Admin", path: "/dashboard/manage/admin", icon: <ShieldUser size={18} /> },
      ],
    }] : []),
  ];

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
      {/* Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {isOpen && <span className="font-semibold text-sm text-gray-700">Admin Panel</span>}
        
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded hover:bg-gray-100 transition text-gray-500"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      

      {/* Menu Groups */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 flex flex-col gap-4">
        {groups.map((group) => (
          <div key={group.label}>
            {isOpen && (
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 px-2 mb-1">
                {group.label}
              </p>
            )}
            <div className="flex flex-col gap-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-all ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }`}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {isOpen && <span>{item.name}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      

      {/* Footer */}
<div className="p-2 border-t border-gray-100 flex flex-col gap-2">

  {isOpen && user && (
    <div className="px-2">
      <p className="text-[11px] text-gray-400">
        Login sebagai
      </p>

      <p className="text-sm font-medium text-gray-700 truncate">
        {user.username}
      </p>
      <p className="text-sm font-medium text-gray-700 truncate">
        {user.email}
      </p>
    </div>
  )}

  {/* Logout */}
  <LogoutButton showLabel={isOpen} />
</div>
    </aside>
  );
}