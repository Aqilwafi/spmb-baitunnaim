// apps/admin/src/config/sidebar-menu.tsx
import {
  LayoutDashboard,
  Activity,
  UserCheck,
  Wallet,
  Files,
  ClipboardList,
  Newspaper,
  Logs,
  PenLine,
  UserRoundPen,
  UserCog,
  CalendarCog,
  Building, 
  DoorOpen,
  IdCard,
  HeartHandshake
} from "lucide-react";

export type MenuItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export type MenuGroup = {
  label: string;
  items: MenuItem[];
};

type BuildMenuParams = {
  canSpmb: boolean;
  canPublikasi: boolean;
  canManage: boolean;
  canLog: boolean;
};

export function buildSidebarGroups({
  canSpmb,
  canPublikasi,
  canManage,
  canLog,
}: BuildMenuParams): MenuGroup[] {
  return [
    {
      label: "Umum",
      items: [
        { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
        
      ],
    },
    ...(canSpmb
      ? [
          {
            label: "Siswa",
            items: [
              { name: "Data Siswa", path: "/dashboard/biodata/siswa", icon: <UserCheck size={18} /> },
              { name: "Keluarga Siswa", path: "/dashboard/biodata/keluarga", icon: <HeartHandshake size={18} /> },
              { name: "Dokumen", path: "/dashboard/dokumen", icon: <Files size={18} /> },
            ],
          },
        ]
      : []),
    ...(canSpmb
      ? [
          {
            label: "SPMB",
            items: [
              { name: "Progres Form", path: "/dashboard/spmb/progress", icon: <Activity size={18} /> },
              { name: "Pembayaran", path: "/dashboard/spmb/pembayaran", icon: <Wallet size={18} /> },
              { name: "Keputusan", path: "/dashboard/spmb/keputusan", icon: <ClipboardList size={18} /> },
            ],
          },
        ]
      : []),
    ...(canPublikasi
      ? [
          {
            label: "Publikasi",
            items: [
              { name: "Semua Artikel", path: "/dashboard/publikasi", icon: <Newspaper size={18} /> },
              { name: "Tulis Artikel", path: "/dashboard/publikasi/baru", icon: <PenLine size={18} /> },
            ],
          },
        ]
      : []),
    ...(canManage
      ? [
          {
            label: "Master Data",
            items: [
              { name: "Tahun Ajaran", path: "/dashboard/master/tahun-ajaran", icon: <CalendarCog size={18} /> },
              { name: "Lembaga", path: "/dashboard/master/lembaga", icon: <Building size={18} /> },
              { name: "Kelas", path: "/dashboard/master/kelas", icon: <DoorOpen size={18} /> },
              { name: "Role", path: "/dashboard/master/role", icon: <IdCard size={18} /> },
              
            ],
          },
        ]
      : []),
    ...(canManage
      ? [
          {
            label: "Kelola Akses",
            items: [
              { name: "Pendaftar", path: "/dashboard/manage/pendaftar", icon: <UserRoundPen size={18} /> },
              { name: "Admin", path: "/dashboard/manage/admin", icon: <UserCog size={18} /> },
            ],
          },
        ]
      : []),
    ...(canLog
      ? [
          {
            label: "Logs",
            items: [
              { name: "Activity Log", path: "/dashboard/logs", icon: <Logs size={18} /> },
            ],
          },
        ]
      : []),
  ];
}