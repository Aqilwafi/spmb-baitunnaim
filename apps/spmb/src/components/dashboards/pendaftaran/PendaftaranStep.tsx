// components/dashboards/pendaftaran/PendaftaranStep.tsx

"use client";

import { PendaftaranStepProps } from "@/types/step.types";
import {Maintenance} from "@bn/ui";
import { STEP_CONFIG } from "@/config/step-pages.config";

export default function PendaftaranStep({
  email,
  stepNumber,
  userid,
  pendaftaranId,
}: PendaftaranStepProps) {

  const step = STEP_CONFIG.find((s) => s.id === stepNumber);

  if (!step) {
    return (
      <div className="mt-6">
        <Maintenance />
        <div className="mt-4 py-3 px-6 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-center text-[10px] text-gray-400 font-mono">
            DEBUG_INFO: STEP_{stepNumber}_LOCKED | REF_{pendaftaranId}
          </p>
        </div>
      </div>
    );
  }

  const StepComponent = step.component;

  return (
    <div className="mt-6 p-4 border border-blue-100 bg-blue-50/50 rounded-[2rem] overflow-hidden">
      <StepComponent email={email} pendaftaranId={pendaftaranId} userid={userid} />

      <div className="mt-6 py-3 px-6 bg-white/60 rounded-2xl">
        <p className="text-center text-[11px] text-blue-600 font-bold uppercase tracking-[0.2em]">
          Internal Security Verified
        </p>
        <p className="text-center text-[9px] text-blue-300 mt-1 font-mono">
          USER_REF: {userid?.substring(0, 8)}...
        </p>
      </div>
    </div>
  );
}