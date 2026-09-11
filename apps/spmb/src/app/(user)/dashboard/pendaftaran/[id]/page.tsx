import { isAccessAllowed } from "@/features/auth/guards";
import { getDetailPendaftaran } from "@/features/form/detail-form";
import { computeStepStatus } from "@/helpers/step-rules";
import { STEP_CONFIG } from "@/components/step/config/step-pages.config";
import AccordionOrchestrator from "@/components/pendaftaran/AccordionOrchestrator";
import ForbiddenScreen from "@/components/others/ForbiddenScreen";
import NotFound from "@/app/not-found";
import BackButton from "@/components/buttons/BackButton";
import type { StepElement } from "@/types/step.types";
import { getSteps } from "@/features/master/steps";

export const dynamic = "force-dynamic";

export default async function DetailPendaftaranPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { allowed } = await isAccessAllowed(id);

  if (!allowed) {
    return <ForbiddenScreen />;
  }

  const detailPendaftaranData = await getDetailPendaftaran(id);

  if (!detailPendaftaranData) {
    return <NotFound />;
  }

  // Ambil seluruh step dari database
  const steps = await getSteps();

  // Cari step yang sedang aktif berdasarkan step_id pada pendaftaran
  const currentStep = steps.find(
    (step) => step.id === detailPendaftaranData.step_id
  );

  // Ambil order dari current step
  const currentStepOrder = currentStep?.order ?? null;

  const stepElements: StepElement[] = steps.map((step) => {
    // Status ditentukan berdasarkan ORDER, bukan ID
    const status = computeStepStatus(
      step.order,
      currentStepOrder
    );

    // Cari container berdasarkan CODE
    const Container = step.code
    ? STEP_CONFIG[step.code as keyof typeof STEP_CONFIG]?.container
    : undefined;

    return {
      id: step.id,
      step_order: step.order,
      label: step.label,
      status,

      node:
        status === "locked" || !Container
          ? null
          : (
              <Container
                pendaftaran_id={detailPendaftaranData.id}
                user_id={detailPendaftaranData.pendaftar_id}
                status={status}
                code={step.code ?? ""}
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