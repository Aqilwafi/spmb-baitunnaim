// app/dashboard/page.tsx
import { createSupabaseServer } from '@bn/supabase';
import { FormPendaftaranCard, type FormPendaftaranDisplay, type FormPendaftaranRaw } from '@/components/dashboards/FormPendaftaranCard';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';
import { getTahunAjaranAktif } from '@/features/pendaftaran/tahun-ajaran';
import { getCurrentClaims } from '@bn/auth';
// import { getMasterStep } from '@bn/services'; // Tidak dipakai di render
// import { getFormPendaftaranMapList } from '@/features/pendaftaran/form'; // Tidak dipakai di render

// TODO: Pindahkan mapper ke /features/pendaftaran/mappers.ts
function mapFormPendaftaran(
  raw: FormPendaftaranRaw[],
  kelasOptions: { value: string; label: string }[],
  lembagaOptions: { value: string; label: string }[],
): FormPendaftaranDisplay[] {
  return raw.map((form) => ({
    ...form,
    kelas: kelasOptions.find((o) => o.value === form.kelasCode)?.label ?? '-',
    lembaga: lembagaOptions.find((o) => o.value === form.lembagaCode)?.label ?? '-',
  }));
}

export default async function DashboardPage() {
  const supabase = await createSupabaseServer();

  const claims = await getCurrentClaims();
  if (!claims) return null;

  // Optimasi: Fetch semua data pendukung secara paralel
  const [tahunAjaranAktif, kelasOptions, lembagaOptions] = await Promise.all([
    getTahunAjaranAktif(supabase),
    getKelasOptions(supabase),
    getLembagaOptions(supabase),
  ]);

  // Data saat ini kosong (menghapus dummy yang tidak terpakai)
  const formPendaftaranRaw: FormPendaftaranRaw[] = [];
  const formPendaftaran = mapFormPendaftaran(formPendaftaranRaw, kelasOptions, lembagaOptions);
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