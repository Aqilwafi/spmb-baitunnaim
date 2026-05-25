"use client";

import { PendaftaranStepProps } from "@/types/typeProps"; 
import MaintenancePage from "../components/others/Maintanance"; 
import DaftarAkunStep from "./step/DaftarAkunStep";
import PembayaranStep from "./step/pembayaranStep";
// Import LembagaTujuanStep jika sudah ada, jika belum bisa pakai placeholder

export default function PendaftaranStep({
  email,
  stepNumber,
  userid,
  pendaftaranId,
}: PendaftaranStepProps) {
  
  // LOGIKA ISOLASI: Daftar step yang sudah "Production Ready"
  const activeSteps = [1, 2, 3];
  const isMaintenance = !activeSteps.includes(stepNumber);

  // Jika step belum siap, tampilkan MaintenancePage
  if (isMaintenance) {
    return (
      <div className="mt-6">
        <MaintenancePage />
        <div className="mt-4 py-3 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-center text-[10px] text-gray-400 font-mono">
            DEBUG_INFO: STEP_{stepNumber}_LOCKED | REF_{pendaftaranId}
          </p>
        </div>
      </div>
    );
  }

  // Render Step yang tersedia
  return (
    <div className="mt-6 p-4 border border-blue-100 bg-blue-50/50 rounded-[2rem] overflow-hidden">
      {stepNumber === 1 && (
        <DaftarAkunStep email={email} />
      )}

      {stepNumber === 2 && (
        /* Ganti dengan komponen LembagaTujuanStep asli jika sudah dibuat */
        <div className="p-8 text-center bg-white rounded-3xl">
          <h2 className="text-xl font-bold text-gray-800">Lembaga Tujuan</h2>
          <p className="text-sm text-gray-500">Pilih jenjang pendidikan tujuan Anda.</p>
        </div>
      )}

      {stepNumber === 3 && (
        <PembayaranStep 
          pendaftaranId={pendaftaranId} // Variabel ID dari props PendaftaranStep
          user={{ email }}              // Sesuai interface yang minta object user
          isComplete={false}            // Atau ambil dari logic status
          onComplete={() => console.log("Pembayaran Berhasil")}
        />
      )}

      {/* Footer Info untuk user yang sedang mengisi */}
      <div className="mt-6 py-3 px-6 bg-white/60 rounded-2xl">
        <p className="text-center text-[11px] text-blue-600 font-bold uppercase tracking-[0.2em]">
          Internal Security Verified
        </p>
        <p className="text-center text-[9px] text-blue-300 mt-1 font-mono">
          USER_REF: {'userid.substring(0, 8)'}...
        </p>
      </div>
    </div>
  );
}