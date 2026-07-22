// components/pendaftaran/AccordionOrchestrator.tsx
"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, ChevronDown, Lock } from "lucide-react";
import { Card, Button } from "@bn/ui";
import type { StepElement, DetailPendaftaran } from "@/types/step.types";

interface AccordionOrchestratorProps {
  pendaftaran: DetailPendaftaran;
  stepElements: StepElement[];
}

export default function AccordionOrchestrator({
  pendaftaran,
  stepElements,
}: AccordionOrchestratorProps) {
  const [openStep, setOpenStep] = useState<number | null>(pendaftaran.step_id);

  const toggleStep = (id: number) => {
    setOpenStep((prev) => (prev === id ? null : id));
  };

  return (
    <section className="p-6 space-y-4 max-w-3xl mx-auto">
      {stepElements.map((step) => {
        const isOpen = openStep === step.id;
        const isLocked = step.status === "locked";
        const isComplete = step.status === "complete";
        const isActive = step.status === "active";

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
                    {step.node}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        );
      })}
    </section>
  );
}