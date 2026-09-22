"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, Lock } from "lucide-react";
import { Card, Button } from "@bn/ui";
import type { StepElement } from "@/types/step.types";
import type { DetailPendaftaran } from "@/types/form.types";

interface AccordionOrchestratorProps {
  pendaftaran: DetailPendaftaran;
  stepElements: StepElement[];
}

export default function AccordionOrchestrator({
  pendaftaran,
  stepElements,
}: AccordionOrchestratorProps) {
  const [openStep, setOpenStep] = useState<number | null>(pendaftaran.stepId);

  const toggleStep = (id: number) => {
    setOpenStep((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {stepElements.map((step) => {
        const isOpen = openStep === step.id;
        const isLocked = step.status === "locked";
        const isComplete = step.status === "complete";
        const isActive = step.status === "active";

        return (
          <Card
            key={step.id}
            className={`rounded-2xl sm:rounded-3xl shadow-sm p-0 transition-all duration-200 overflow-hidden
              ${isLocked ? "border-gray-100 opacity-60" : "hover:border-blue-300"}
              ${isActive ? "ring-2 ring-blue-500 border-blue-500 shadow-md" : ""}`}
          >
            <Button
              variant="ghost"
              onClick={() => toggleStep(step.id ?? 0)}
              disabled={isLocked}
              className="w-full !flex !justify-between !items-center p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl shadow-none h-auto"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-black shrink-0 transition-colors
                    ${isComplete ? "bg-green-500 text-white" : ""}
                    ${isActive ? "bg-blue-600 text-white" : ""}
                    ${isLocked ? "bg-gray-100 text-gray-400" : ""}`}
                >
                  {isComplete ? "✓" : step.stepOrder}
                </div>

                <span className={`font-bold text-sm sm:text-base text-left ${isLocked ? "text-gray-400" : "text-gray-800"}`}>
                  {step.label}
                </span>
              </div>

              {isLocked ? (
                <Lock size={16} className="text-gray-300 shrink-0" />
              ) : isOpen ? (
                <ChevronUp className="text-gray-400 shrink-0" />
              ) : (
                <ChevronDown className="text-gray-400 shrink-0" />
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
                  {/* Container konten accordion tanpa padding berlebih */}
                  <div className="px-3 sm:px-6 pb-4 sm:pb-6 border-t border-gray-100 pt-3 sm:pt-4 bg-white">
                    {step.node}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </div>
  );
}