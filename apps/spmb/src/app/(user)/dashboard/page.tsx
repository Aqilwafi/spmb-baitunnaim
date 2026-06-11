// app/dashboard/page.tsx
import { createSupabaseServer } from '@bn/supabase';
import { FormPendaftaranCard, type FormPendaftaranDisplay, type FormPendaftaranRaw } from '@/components/dashboards/FormPendaftaranCard';
import { EmptyPendaftaran } from '@/components/dashboards/EmptyPendaftaran';
import { getKelasOptions, getLembagaOptions } from '@/features/pendaftaran/options';
import { InitFormPendaftaranModal } from '@/components/dashboards/InitFormPendaftaranModal';
import { getTahunAjaranAktif } from '@/features/pendaftaran/tahun-ajaran';
import { getSiswaIdByUserId } from '@/services/pendaftaran/servicePendaftaran';
import { getCurrentClaims } from '@bn/auth';
import { getMasterStep } from '@bn/services';
import { getFormPendaftaranMapList } from '@/features/pendaftaran/form';

// TODO: pisahkan ke /features/pendaftaran/mappers.ts
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
  const userid = claims?.data

  const tahunAjaranAktif = await getTahunAjaranAktif(supabase);
  const kelasOptions = await getKelasOptions(supabase);
  const lembagaOptions = await getLembagaOptions(supabase);
  const stepList = await getMasterStep(supabase);
  //const forms = await getFormPendaftaranMapList(supabase)

  //const siswaReference = await getSiswaIdByUserId(supabase, claims?.);

  // TODO:
  // const formPendaftaranRaw = await getFormPendaftaran(supabase);

  const SHOW_FORM = true;

  const formPendaftaranRaw: FormPendaftaranRaw[] = SHOW_FORM
    ? [
        {
          id: "1",
          namaSiswa: "Ahmad Fauzan",
          lembagaCode: "MI",
          kelasCode: "MI01",
          lastStep: "Data Orang Tua",
          status: "DRAFT",
          lastModified: "06 Juni 2026 09:15",
        },
        {
          id: "2",
          namaSiswa: "Siti Nurhaliza",
          lembagaCode: "TK",
          kelasCode: "",
          lastStep: "Upload Dokumen",
          status: "SUBMITTED",
          lastModified: "05 Juni 2026 14:20",
        },
        {
          id: "3",
          namaSiswa: "Freiren",
          lembagaCode: "MI",
          kelasCode: "MI06",
          lastStep: "Upload Dokumen",
          status: "SUBMITTED",
          lastModified: "05 Juni 2026 14:20",
        },
      ]
    : [];

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