// src/app/admin/pendaftaran/page.tsx
import DashboardHeader from "@/components/headers/dashboardHeader";
import React from "react";
import { 
  Users, 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  Search
} from "lucide-react";

// Data Dummy
const DUMMY_PENDAFTARAN = [
  { id: "1", nama: "Budi Santoso", status: "Terverifikasi", lembaga: "MI", tanggal: "2026-04-10" },
  { id: "2", nama: "Siti Aminah", status: "Pending", lembaga: "TK", tanggal: "2026-04-12" },
  { id: "3", nama: "Rizky Fauzi", status: "Cek Pembayaran", lembaga: "MI", tanggal: "2026-04-13" },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Panggil Header di luar padding utama agar bisa sticky 
         atau full width sesuai desain dashboard-mu
      */}
      <DashboardHeader />

      <main className="p-8 max-w-7xl mx-auto space-y-8">
        {/* Judul Halaman & Info Singkat */}
        <div>
          <h1 className="text-2xl font-black text-gray-900">Panel Administrator</h1>
          <p className="text-sm text-gray-500 font-medium">Pantau dan verifikasi pendaftaran siswa baru secara real-time.</p>
        </div>

        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Pendaftar" value="124" icon={<Users className="text-blue-600" />} color="bg-blue-50" />
          <StatCard title="Terverifikasi" value="89" icon={<CheckCircle className="text-green-600" />} color="bg-green-50" />
          <StatCard title="Menunggu" value="35" icon={<Clock className="text-yellow-600" />} color="bg-yellow-50" />
        </div>

        {/* Main Table Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800">Daftar Pendaftaran Baru</h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[11px] uppercase tracking-widest text-gray-500 font-black">
                  <th className="px-6 py-4">Nama Calon Siswa</th>
                  <th className="px-6 py-4">Lembaga</th>
                  <th className="px-6 py-4">Tanggal</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {DUMMY_PENDAFTARAN.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-700">{item.nama}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.lembaga}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{item.tanggal}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.status === "Terverifikasi" ? "bg-green-100 text-green-700" : 
                        item.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="inline-flex items-center gap-1 text-blue-600 font-bold text-sm hover:underline">
                        Detail <ArrowUpRight size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 bg-gray-50/50 border-t text-center">
            <button className="text-xs font-bold text-gray-400 hover:text-blue-600 transition-colors">
              Lihat Semua Data Pendaftaran
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-5 transition-transform hover:scale-[1.02]">
      <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="text-2xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  );
}