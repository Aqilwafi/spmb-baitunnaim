// app/dashboard/page.tsx
import { createSupabaseServer } from '@bn/supabase';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';
import { getTahunAjaranAktif } from '@/features/pendaftaran/tahun-ajaran';

export default async function DashboardPage() {

  const supabase = await createSupabaseServer();
  const tahunAjaranAktif = await getTahunAjaranAktif(supabase);
  const kelasOptions = await getKelasOptions(supabase);
  const lembagaOptions = await getLembagaOptions(supabase);

  {/* To do:
      get form   
  */}

  return (
    <main className="min-h-full bg-[#f8f9fa] ">
      <div className="flex justify-end">
        <InitFormPendaftaranModal
          lembaga={lembagaOptions}
          kelas={kelasOptions}
        />
      </div>
      <EmptyPendaftaran tahunAjaran={tahunAjaranAktif}/>
      {/* To do:
          render <FormPendaftaranCard/> ??  <EmptyPendaftaran/>
      */}
      
    </main>
  );
}