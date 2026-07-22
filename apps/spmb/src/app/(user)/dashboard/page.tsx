// @spmb/app/dashboard/page.tsx

import { getFormCardsData } from '@/features/form/card';
import { getTahunAjaranAktif } from '@/features/master/tahun-ajaran';
import { getKelasOptions, getLembagaOptions } from '@/features/master/options';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { FormPendaftaranCard } from '@/components/dashboards/FormPendaftaranCard';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';

export default async function DashboardPage() {
  const [tahunAjaran, lembagaOptions, kelasOptions] = await Promise.all([
    getTahunAjaranAktif(), 
    getLembagaOptions(),
    getKelasOptions(),
  ]);

  if (!tahunAjaran) return;

  const cards = await getFormCardsData(tahunAjaran.id);
  const hasPendaftaran = cards.length > 0;

  return (
    <main className="min-h-full bg-[#f8f9fa]">
      <div className="flex justify-end">
        <InitFormPendaftaranModal lembaga={lembagaOptions} kelas={kelasOptions} />
      </div>
      {hasPendaftaran ? (
        <FormPendaftaranCard data={cards}  />
      ) : (
        <EmptyPendaftaran tahunAjaran={tahunAjaran} />
      )}
    </main>
  );
}