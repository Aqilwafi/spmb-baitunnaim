// src/app/admin/verifikasi-pembayaran/page.tsx
import Image from "next/image";
import Link from "next/link";

// Data dummy untuk satu detail transaksi pembayaran
const paymentDetail = {
  id: "3a4e96a0-5cc5-43e9-b83d-c1dbf64b56d9",
  orderId: "9a105032-ef07-4734-9e20-050217a1d3bb",
  namaPelanggan: "Ahmad Fauzi",
  lembaga: "MI",
  metodePembayaran: "Bank Muamalat a.n. Pesantren Darunnajah",
  jumlahMasuk: "Rp 250.000",
  status: "SUBMITTED",
  keterangan: "-",
  createdAt: "15 September 2026 pukul 13.29.08",
  updatedAt: "15 September 2026 pukul 13.29.08",
  buktiUrl: "/dash.jpeg",
};

export default function AdminVerifikasiPembayaranDetailPage() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 hidden md:flex flex-col justify-between">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              BN
            </div>
            <span className="font-bold tracking-wide">PPDB ADMIN</span>
          </div>

          <nav className="flex flex-col gap-1">
            <Link href="/admin/dashboard" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800">
              Dashboard
            </Link>
            <Link href="/admin/pendaftaran" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800">
              Data Pendaftaran
            </Link>
            <Link href="/admin/verifikasi-pembayaran" className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white">
              Verifikasi Pembayaran
            </Link>
            <Link href="/admin/dokumen" className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800">
              Dokumen Siswa
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button className="w-full text-left px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 rounded-lg">
            Keluar Sistem
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-sm font-medium text-gray-500">Pendaftaran Darunnajah</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin/logout" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Keluar &rarr;
            </Link>
          </div>
        </header>

        {/* CONTENT / DASHBOARD BODY */}
        <main className="flex-1 overflow-y-auto p-6 bg-amber-50/30">
          <div className="max-w-7xl mx-auto space-y-4">
            
            {/* Breadcrumb & Title Bar */}
            <div>
              <Link href="/admin/verifikasi-pembayaran" className="text-xs font-medium text-gray-500 hover:underline">
                &larr; Kembali ke Daftar Pembayaran
              </Link>
              <div className="flex items-center justify-between mt-1">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">
                  Verifikasi Pembayaran #{paymentDetail.id.slice(0, 12)}...
                </h2>
                <span className="bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold px-3 py-1 rounded-md uppercase">
                  {paymentDetail.status}
                </span>
              </div>
            </div>

            {/* TWO COLUMN GRID LAYOUT */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* KIRI: PREVIEW BUKTI TRANSFER (Lebar 6 kolom) */}
              <div className="lg:col-span-6 bg-white border border-gray-200 rounded-xl p-6 shadow-xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span>📄</span> Bukti Transfer / Pembayaran
                  </h3>
                  
                  {/* Container Gambar Besar */}
                  <div className="relative w-full h-[450px] bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <Image 
                      src={paymentDetail.buktiUrl} 
                      alt="Bukti Pembayaran" 
                      fill 
                      className="object-contain" 
                    />
                  </div>
                </div>
                <p className="text-center text-xs text-gray-400 mt-4">
                  * Klik gambar untuk melihat ukuran penuh
                </p>
              </div>

              {/* KANAN: AKSI & RINCIAN DATA (Lebar 6 kolom) */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Kotak Aksi Verifikasi */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs">
                  <h3 className="text-sm font-bold text-gray-800 mb-4">Aksi Verifikasi</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-sm shadow-xs transition">
                      Verifikasi Pembayaran
                    </button>
                    <button className="w-full py-2.5 bg-white border border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-lg text-sm transition">
                      Tolak Pembayaran
                    </button>
                  </div>
                </div>

                {/* Ringkasan Order */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-4">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3">Ringkasan Order</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-gray-400">Order ID</p>
                      <p className="font-mono font-medium text-gray-800 mt-0.5">#{paymentDetail.orderId.slice(0, 12)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Nama Pelanggan</p>
                      <p className="font-medium text-gray-800 mt-0.5">{paymentDetail.namaPelanggan}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Total Tagihan Order</p>
                      <p className="font-bold text-gray-900 mt-0.5">{paymentDetail.jumlahMasuk}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Status Order</p>
                      <p className="font-semibold text-blue-600 mt-0.5">PENDING_PAYMENT</p>
                    </div>
                  </div>
                </div>

                {/* Rincian Data Pembayaran (DB Payments) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xs space-y-3">
                  <h3 className="text-sm font-bold text-gray-800 border-b border-gray-100 pb-3">
                    Rincian Data Pembayaran (DB Payments)
                  </h3>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">ID Pembayaran</span>
                      <span className="font-mono text-gray-700">{paymentDetail.id}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Order ID</span>
                      <span className="font-mono text-gray-700">{paymentDetail.orderId}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Metode Pembayaran</span>
                      <span className="text-gray-700 font-medium">{paymentDetail.metodePembayaran}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Jumlah Masuk (Amount)</span>
                      <span className="font-semibold text-emerald-600">{paymentDetail.jumlahMasuk}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Status</span>
                      <span className="font-bold text-amber-600">{paymentDetail.status}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Catatan / Keterangan</span>
                      <span className="text-gray-700">{paymentDetail.keterangan}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-400">Created At</span>
                      <span className="text-gray-700">{paymentDetail.createdAt}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-gray-400">Updated At</span>
                      <span className="text-gray-700">{paymentDetail.updatedAt}</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
}