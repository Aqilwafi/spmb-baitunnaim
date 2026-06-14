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
  ShieldCheck,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { executeSharedLogout } from "@bn/auth";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/actions/auth/auth.actions";

type SidebarProps = {
  canSpmb: boolean;
  canPublikasi: boolean;
  canManage: boolean;
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

export default function Sidebar({ canSpmb, canPublikasi, canManage }: SidebarProps) {
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
        { name: "Users Progress", path: "/dashboard/progress", icon: <Activity size={18} /> },
        { name: "Biodata Lengkap", path: "/dashboard/biodata", icon: <UserCheck size={18} /> },
        { name: "Pembayaran", path: "/dashboard/pembayaran", icon: <Wallet size={18} /> },
        { name: "Dokumen", path: "/dashboard/dokumen", icon: <Files size={18} /> },
        { name: "Keputusan", path: "/dashboard/keputusan", icon: <ClipboardList size={18} /> },
      ],
    }] : []),
    ...(canPublikasi ? [{
      label: "Publikasi",
      items: [
        { name: "Publikasi", path: "/dashboard/publikasi", icon: <Newspaper size={18} /> },
      ],
    }] : []),
    ...(canManage ? [{
      label: "Manage",
      items: [
        { name: "Manage Admin", path: "/dashboard/manage", icon: <ShieldCheck size={18} /> },
      ],
    }] : []),
  ];

  async function handleLogout() {
    await logoutAction();
    router.push("/");
    router.refresh();
  }

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

      {/* Logout */}
      <div className="p-2 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-2 py-2 rounded-md text-sm text-gray-600 hover:bg-red-50 hover:text-red-500 transition-all"
        >
          <LogOut size={18} className="shrink-0" />
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}