// app/dashboard/pendaftaran/[id]/page.tsx

import Link from "next/link";
import { ArrowLeft } from 'lucide-react';
import { Forbidden, Button } from "@bn/ui";
import { isAccessAllowed } from "@/features/auth/guards";
import { getDetailPendaftaran } from "@/features/form/detail";
import { computeStepStatus } from "@/helpers/step-rules";
import { STEP_CONFIG } from "@/components/step/config/step-pages.config";
import AccordionOrchestrator from "@/components/pendaftaran/AccordionOrchestrator";
import type { StepElement } from "@/types/step.types";
import NotFound from "@/app/not-found";
import BackButton from "@/components/buttons/BackButton";
export const dynamic = "force-dynamic";

function ForbiddenScreen() {
  return (
    <div className="fixed inset-0 z-50 flex">
      <Forbidden
        className="fixed inset-0 z-[9999] w-screen h-screen"
        primaryAction={
          <Link href="/dashboard" className="block w-full">
            <Button className="w-full flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              Kembali
            </Button>
          </Link>
        }
        secondaryAction={
          <Link href="/" className="block w-full">
            <Button variant="ghost" className="w-full flex items-center justify-center gap-2 text-xs">
              Hubungi Admin IT
            </Button>
          </Link>
        }
      />
    </div>
  );
}

export default async function DetailPendaftaranPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  

  const { allowed } = await isAccessAllowed(id);
  if (!allowed) return <ForbiddenScreen />;
  

  const detailPendaftaranData = await getDetailPendaftaran(id); 
  if (!detailPendaftaranData) return <NotFound />;
  console.log(detailPendaftaranData)

  const stepElements: StepElement[] = STEP_CONFIG.map((step) => {
    const status = computeStepStatus(step.id, 10); // hack kalau mau cek locked UI cepat
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