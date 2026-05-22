"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PendaftaranStep from "@/components/dashboards/pendaftaran/PendaftaranStep";
import { ChevronUp, ChevronLeft, ChevronDown, Lock } from "lucide-react";
import { ClientDetailProps } from "@/types/typeApplicationDetail";


export default function ClientDetailPendaftaran({ pendaftaran, stepList, user }: ClientDetailProps) {
  // Ambil progres terakhir. Default ke 2 karena step 1 (akun) otomatis selesai
  const currentStep = pendaftaran.current_step_id || 2;

  // Membuka step yang sedang aktif secara otomatis
  const [openStep, setOpenStep] = useState<number | null>(currentStep);

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* Header Info */}
      <div className="bg-white p-6 border-b sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link 
            href="/dashboard" 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors active:scale-95 text-gray-600"
          >
            <ChevronLeft size={24} strokeWidth={2.5} />
          </Link>

          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">
              {pendaftaran.biodata_siswa?.nama_lengkap || "Calon Siswa"}
            </h1>
            <p className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-black mt-0.5">
              Status: {pendaftaran.final_status_id?.name || "Sedang Diproses"}
            </p>
          </div>
        </div>
      </div>

      <section className="p-6 space-y-4 max-w-3xl mx-auto">
        {stepList.map((step) => {
          // Logika Status Step
          const isComplete = step.id < currentStep+1;
          const isActive = step.id === currentStep +1;
          const isLocked = step.id > currentStep +1;
          const isOpen = openStep === step.id;

          return (
            <div 
              key={step.id} 
              className={`bg-white rounded-3xl shadow-sm border transition-all 
                ${isLocked ? "border-gray-100 opacity-60" : "hover:border-blue-300"} 
                ${isActive ? "ring-2 ring-blue-500 border-blue-500" : ""}`}
            >
              <button
                onClick={() => toggleStep(step.id)}
                disabled={isLocked}
                className="w-full flex justify-between items-center p-5 outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors
                    ${isComplete ? "bg-green-500 text-white" : ""} 
                    ${isActive ? "bg-blue-600 text-white" : ""}
                    ${isLocked ? "bg-gray-100 text-gray-400" : ""}`}
                  >
                    {isComplete ? "✓" : step.id}
                  </div>
                  <span className={`font-bold text-left ${isLocked ? "text-gray-400" : "text-gray-700"}`}>
                    {step.name}
                  </span>
                </div>

                {isLocked ? (
                  <Lock size={16} className="text-gray-300" />
                ) : (
                  isOpen ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />
                )}
              </button>

              <AnimatePresence>
                {isOpen && !isLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 border-t pt-4">
                      <PendaftaranStep
                        email={user.email}
                        pendaftaranId={pendaftaran.id}
                        stepNumber={step.id}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </section>
    </main>
  );
}