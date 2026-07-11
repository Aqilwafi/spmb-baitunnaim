// app/dashboard/page.tsx

import Image from "next/image";

export default async function DashboardPage() {
  

  return (
    <main className="min-h-screen bg-[#f8f9fa]">
      {/* Header dengan Glassmorphism effect */}
     

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

      </div>
    </main>
  );
}