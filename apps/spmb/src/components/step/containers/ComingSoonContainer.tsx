// components/step/containers/ComingSoonContainer.tsx
// Server Component — placeholder untuk step yang belum dibangun.
// Tidak fetch apapun, cukup render pesan "Segera hadir".

import type { StepContainerProps } from "@/types/step.types";

export default function ComingSoonContainer({ status }: StepContainerProps) {
  return (
    <div className="p-8 text-center text-gray-400">
      Segera hadir
    </div>
  );
}