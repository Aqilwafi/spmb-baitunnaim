// @spmb/app/dashboard/page.tsx

import { getDashboardSummary } from "@/features/dashboard/summary";
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { FormPendaftaranCard } from '@/components/dashboards/FormPendaftaranCard';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';

export default async function DashboardPage() {
  const data = await getDashboardSummary();

  if (!data) {
    return (
      <main className="min-h-full bg-[#f8f9fa] flex items-center justify-center text-center p-8">
        <p className="text-gray-500">Pendaftaran belum dibuka. Silakan cek kembali nanti.</p>
      </main>
    );
  }

  const { tahunAjaran, lembagaOptions, kelasOptions, cards, hasPendaftaran } = data;

  return (
    <main className="min-h-full bg-[#f8f9fa]">
      <div className="flex justify-end">
        <InitFormPendaftaranModal lembaga={lembagaOptions} kelas={kelasOptions} />
      </div>
      {hasPendaftaran ? <FormPendaftaranCard data={cards} /> : <EmptyPendaftaran tahunAjaran={tahunAjaran} />}
    </main>
  );
}