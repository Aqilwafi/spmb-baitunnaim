import { isAccessAllowed } from "@/features/auth/guards";
import { getDetailPendaftaranData } from "@/features/form/detail";
import { computeStepStatus } from "@/helpers/step-rules";
import { STEP_CONFIG } from "@/components/step/config/step-pages.config";
import AccordionOrchestrator from "@/components/pendaftaran/AccordionOrchestrator";
import ForbiddenScreen from "@/components/others/ForbiddenScreen";
import NotFound from "@/app/not-found";
import BackButton from "@/components/buttons/BackButton";
import type { StepElement } from "@/types/step.types";
import { getStepList } from "@/features/master/steps";

export const dynamic = "force-dynamic";

export default async function DetailPendaftaranPage({params}: {params: Promise<{ id: string }>;}) {
  const { id } = await params;

  const { allowed } = await isAccessAllowed(id);

  if (!allowed) {
    return <ForbiddenScreen />;
  }

  const detailPendaftaranData = await getDetailPendaftaranData(id);
  console.log('page:', detailPendaftaranData)

  if (!detailPendaftaranData) {
    return <NotFound />;
  }

  // Ambil seluruh step dari database
  const rawSteps = await getStepList();
  const steps = [...rawSteps].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  // Cari step yang sedang aktif berdasarkan step_id pada pendaftaran
  const currentStep = steps.find(
    (step) => step.id === detailPendaftaranData.stepId
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
      stepOrder: step.order,
      label: step.label,
      status,

      node:
        status === "locked" || !Container
          ? null
          : (
              <Container
                formId={detailPendaftaranData.id}
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