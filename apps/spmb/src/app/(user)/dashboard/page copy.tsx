// app/dashboard/page.tsx

import Image from "next/image";
import Link from "next/link";
import { ClipboardList, ArrowRight, LayoutGrid } from "lucide-react";

// Services & Types
import { getDashboardData } from "@/services/serviceDashboard";
import { getMasterRegistrationData } from "@/services/servicePendaftaran";
import { RegistrationCard } from "@/types/typeDashboard";

// Components
import DashboardHeader from "../../../components/headers/dashboardHeader";
import NewRegistrationTrigger from "../../../components/dashboards/NewRegistrationTrigger";

// Utils
import { getStatusConfig } from "@/utils/statusMapper";
import { formatDateTimeId } from "@/utils/dateFormatter";

export default async function DashboardPage() {
  // 1. Ambil data yang sudah ter-transformasi dan Master Data
  const { registrations, userEmail } = await getDashboardData();
  const { masterLembaga, masterKelas } = await getMasterRegistrationData();

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Header dengan Glassmorphism effect */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <DashboardHeader name={userEmail || "User"} />
      </div>

      <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-8">
        
        {/* Banner Section */}
        <div className="relative w-full h-48 md:h-56 rounded-3xl overflow-hidden shadow-2xl shadow-blue-100">
          <Image 
            src="/dash.jpeg" 
            alt="Dashboard Banner" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex flex-col justify-center px-8 md:px-12 text-white">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang</h1>
            <p className="text-sm md:text-base opacity-90 max-w-md">
              Akses layanan pendaftaran dan pantau progres aplikasi kamu dalam satu pintu.
            </p>
          </div>
        </div>

        {/* Action & List Section */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <LayoutGrid size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Panel Pendaftaran</h2>
            </div>
            
            {/* Modal Trigger untuk pendaftaran baru */}
            <NewRegistrationTrigger 
              masterLembaga={masterLembaga} 
              masterKelas={masterKelas} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registrations.length > 0 ? (
              registrations.map((reg: RegistrationCard) => {
                // Mengambil config visual berdasarkan status yang sudah di-flatten
                const config = getStatusConfig(reg.status);

                return (
                  <Link 
                    key={reg.id} 
                    href={`/dashboard/pendaftaran/${reg.id}`}
                    className="bg-white border border-gray-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:border-blue-100 transition-all group relative overflow-hidden block"
                  >
                    <div className="flex flex-col h-full justify-between gap-4">
                      
                      {/* Top Row: Icon & Status Badge */}
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <ClipboardList size={24} />
                        </div>
                        
                        <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${config.bg} ${config.text}`}>
                          {config.label}
                        </span>
                      </div>
                      
                      {/* Middle Row: Info Siswa & Lembaga */}
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors line-clamp-1">
                          {reg.namaSiswa}
                        </h3>
                        
                        <p className="text-sm text-gray-500 font-medium italic">
                          {reg.lembaga} — {reg.kelas}
                        </p>

                        <div className="flex flex-col gap-1 mt-3">
                          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                            ID: {reg.idShort}
                          </p>
                          <p className="text-[10px] text-gray-400 font-medium">
                            Terakhir diedit {formatDateTimeId(reg.lastUpdate)}
                          </p>
                        </div>
                      </div>

                      {/* Bottom Row: Action Call */}
                      <div className="flex items-center text-sm font-bold text-blue-600 mt-2">
                        {reg.status === 'draft' ? 'Lanjutkan Pendaftaran' : 'Lihat Detail'}
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>

                    {/* Subtle Revision Indicator */}
                    {reg.isRevision && (
                      <div className="absolute top-0 right-0 w-2 h-2 bg-orange-500 rounded-full mt-2 mr-2" title="Perlu Revisi" />
                    )}
                  </Link>
                );
              })
            ) : (
              /* Empty State: Tampil jika belum ada data */
              <div className="col-span-full text-center py-16 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
                   <ClipboardList size={32} />
                </div>
                <h3 className="text-gray-900 font-bold">Belum Ada Pendaftaran</h3>
                <p className="text-gray-500 text-sm mt-1">Silakan klik tombol "Tambah Pendaftaran" untuk memulai.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}