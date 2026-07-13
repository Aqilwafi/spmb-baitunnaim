// app/dashboard/page.tsx
import { getCurrentClaims } from '@bn/auth';
import { createSupabaseServer } from '@bn/supabase';
import { getTahunAjaranAktif } from '@/features/pendaftaran/tahun-ajaran';
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';
import { getFormPendaftaranForDashboard } from '@/features/pendaftaran/form';
import { FormPendaftaranCard } from '@/components/dashboards/FormPendaftaranCard';
import { getSteps } from '@/features/pendaftaran/steps';

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();

  const claims = await getCurrentClaims();
  if (!claims) return null;
  
  // Optimasi: Fetch semua data pendukung secara paralel
  const [tahunAjaranAktif, kelasOptions, lembagaOptions, steps] = await Promise.all([
    getTahunAjaranAktif(supabase),
    getKelasOptions(supabase),
    getLembagaOptions(supabase),
    getSteps(supabase)
  ]);

  if (!tahunAjaranAktif) return null;

  const formPendaftaran = await getFormPendaftaranForDashboard(
    supabase,
    claims.sub,
    tahunAjaranAktif,
    kelasOptions,
    lembagaOptions,
    steps
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