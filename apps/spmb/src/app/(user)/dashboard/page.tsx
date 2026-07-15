// app/dashboard/page.tsx
import { getCurrentClaims } from '@bn/auth';
import { getSteps } from '@/features/pendaftaran/steps';
import { getTahunAjaranAktif } from '@/features/pendaftaran/tahun-ajaran';
import { getFormPendaftaranForDashboard } from '@/features/form/display-form';
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { FormPendaftaranCard } from '@/components/dashboards/FormPendaftaranCard';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';

export default async function DashboardPage() {

  const claims = await getCurrentClaims();
  if (!claims) return null;
  
  // Optimasi: Fetch semua data pendukung secara paralel
  const [tahunAjaranAktif, kelasOptions, lembagaOptions, steps] = await Promise.all([
    getTahunAjaranAktif(),
    getKelasOptions(),
    getLembagaOptions(),
    getSteps()
  ]);

  if (!tahunAjaranAktif) return null;

  const formPendaftaran = await getFormPendaftaranForDashboard(
    claims.sub,
    tahunAjaranAktif,
    kelasOptions,
    lembagaOptions
  );
  const hasPendaftaran = formPendaftaran.length > 0;

  return (
    <main className="min-h-full bg-[#f8f9fa]">
      <div className="flex justify-end">
        <InitFormPendaftaranModal
          lembaga={lembagaOptions}
          kelas={kelasOptions}
        />
      </div>

      {hasPendaftaran ? (
        <FormPendaftaranCard data={formPendaftaran} />
      ) : (
        <EmptyPendaftaran tahunAjaran={tahunAjaranAktif} />
      )}
    </main>
  );
}