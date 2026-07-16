"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronLeft, ChevronDown, Lock } from "lucide-react";
import PendaftaranStep from "@/components/dashboards/pendaftaran/PendaftaranStep";
import { STEP_CONFIG } from "@/config/step-pages.config";
import { Card, Button } from "@bn/ui";

interface ClientDetailPendaftaranProps {
  pendaftaran: {
    id: string;
    current_step_id?: number;
    biodata_siswa?: {
      nama_lengkap?: string;
    };
    final_status_id?: {
      name?: string;
    };
  };
  user: {
    id: string;
    email?: string;
  };
}

export default function ClientDetailPendaftaran({ pendaftaran, user }: ClientDetailPendaftaranProps) {
  const currentStep = pendaftaran.current_step_id || 2;
  const [openStep, setOpenStep] = useState<number | null>(currentStep);

  const toggleStep = (id: number) => {
    setOpenStep(openStep === id ? null : id);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
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
              FORM ID: {pendaftaran.id || "Calon Siswa"}
            </h1>
            <p className="text-[11px] text-blue-600 uppercase tracking-[0.2em] font-black mt-0.5">
              Status: {pendaftaran.final_status_id?.name || "Sedang Diproses"}
            </p>
          </div>
        </div>
      </div>

      <section className="p-6 space-y-4 max-w-3xl mx-auto">
        {STEP_CONFIG.map((step) => {
          const isComplete = step.id < currentStep;
          const isActive = step.id === currentStep;
          const isLocked = step.id > currentStep;
          const isOpen = openStep === step.id;

          return (
            <Card
              key={step.id}
              className={`rounded-3xl shadow-sm p-0 transition-all duration-200
                ${isLocked ? "border-gray-100 opacity-60" : "hover:border-blue-300"}
                ${isActive ? "ring-2 ring-blue-500 border-blue-500 shadow-md" : ""}`}
            >
              <Button
                variant="ghost"
                onClick={() => toggleStep(step.id)}
                disabled={isLocked}
                className="w-full flex justify-between items-center p-5 rounded-3xl shadow-none"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-colors
                      ${isComplete ? "bg-green-500 text-white" : ""}
                      ${isActive ? "bg-blue-600 text-white" : ""}
                      ${isLocked ? "bg-gray-100 text-gray-400" : ""}`}
                  >
                    {isComplete ? "✓" : step.step_order}
                  </div>

                  <span className={`font-bold ${isLocked ? "text-gray-400" : "text-gray-700"}`}>
                    {step.label}
                  </span>
                </div>

                {isLocked ? (
                  <Lock size={16} className="text-gray-300" />
                ) : isOpen ? (
                  <ChevronUp className="text-gray-400" />
                ) : (
                  <ChevronDown className="text-gray-400" />
                )}
              </Button>

              <AnimatePresence initial={false}>
                {isOpen && !isLocked && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 border-t pt-4 bg-white rounded-b-3xl">
                      <PendaftaranStep
                        email={user.email}
                        pendaftaranId={pendaftaran.id}
                        stepNumber={step.id}
                        userid={user.id}
                        currentStep={currentStep}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </section>
    </main>
  );
}