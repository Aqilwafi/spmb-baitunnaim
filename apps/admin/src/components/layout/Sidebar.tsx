// apps/admin/src/components/sidebar/Sidebar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import LogoutButton from "@/components/buttons/LogoutButton";
import { buildSidebarGroups } from "@/components/layout/SidebarMenu";

type User = {
  username?: string;
  email: string;
  access_rights?: string[];
};

type SidebarProps = {
  canSpmb: boolean;
  canPublikasi: boolean;
  canManage: boolean;
  canLog: boolean;
  user?: User;
};

export default function Sidebar({ canSpmb, canPublikasi, canManage, canLog, user }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const groups = buildSidebarGroups({ canSpmb, canPublikasi, canManage, canLog });

  return (
    <aside
      className={`sticky top-0 h-screen flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
        isOpen ? "w-56" : "w-16"
      }`}
    >
     {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        {isOpen && user && (
          <div className="min-w-0">
            
            <p className="text-xs font-medium text-gray-700 truncate">
              {user.username || 'admin'}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user.email}
            </p>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded hover:bg-gray-100 transition text-gray-500 shrink-0"
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

  {/* Logout */}
  <LogoutButton showLabel={isOpen} />
</div>
    </aside>
  );
}