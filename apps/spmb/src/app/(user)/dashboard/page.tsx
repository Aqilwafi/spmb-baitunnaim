// app/dashboard/page.tsx
import { createSupabaseServer } from '@bn/supabase';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';

export default async function DashboardPage() {

  const supabase = await createSupabaseServer();

  
  const kelasOptions = await getKelasOptions(supabase);
  const lembagaOptions = await getLembagaOptions(supabase);

  return (
    <main className="min-h-full bg-[#f8f9fa] ">
      <div className="flex justify-end">
        <InitFormPendaftaranModal
          lembaga={lembagaOptions}
          kelas={kelasOptions}
        />
      </div>
      <EmptyPendaftaran/>
      {/* To do:
          
      
      */}
      
    </main>
  );
}