// app/dashboard/pendaftaran/[id]/page.tsx

import { isAccessAllowed } from "@/features/auth/guards";
import { getDetailPendaftaran } from "@/features/form/detail";
import { computeStepStatus } from "@/helpers/step-rules";
import { STEP_CONFIG } from "@/components/step/config/step-pages.config";
import AccordionOrchestrator from "@/components/pendaftaran/AccordionOrchestrator";
import ForbiddenScreen from "@/components/others/ForbiddenScreen";
import NotFound from "@/app/not-found";
import BackButton from "@/components/buttons/BackButton";
import type { StepElement } from "@/types/step.types";

export const dynamic = "force-dynamic";

export default async function DetailPendaftaranPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const { allowed } = await isAccessAllowed(id);
  if (!allowed) return <ForbiddenScreen />;

  const detailPendaftaranData = await getDetailPendaftaran(id);
  if (!detailPendaftaranData) return <NotFound />;

  const stepElements: StepElement[] = STEP_CONFIG.map((step) => {
    const status = computeStepStatus(step.id, detailPendaftaranData.step_id);
    const Container = step.container;

    return {
      id: step.id,
      step_order: step.step_order,
      label: step.label,
      status,
      node: status === "locked" ? null : (
        <Container
          pendaftaran_id={detailPendaftaranData.id}
          user_id={detailPendaftaranData.pendaftar_id}
          status={status}
          code={step.code}
        />
      ),
    };
  });

  return (
    <>
      <BackButton />
      <AccordionOrchestrator
        pendaftaran={detailPendaftaranData}
        stepElements={stepElements}
      />
    </>
  );
}