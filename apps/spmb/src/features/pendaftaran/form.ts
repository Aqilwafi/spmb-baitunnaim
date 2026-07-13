// features/pendaftaran/form-pendaftaran.ts
import { getFormPendaftaranDisplayCards, getMasterStep } from '@bn/services';
import type { FormPendaftaranDisplayItem, MasterData } from '@bn/types';
import type { AppSupabaseClient } from '@bn/supabase';
import type { MasterTahunAjaranListItem, MasterStepListItem} from '@bn/types';
import { mapStepOptions } from "@bn/utils";


async function getSteps (supabase: AppSupabaseClient): Promise<MasterData[]> {
    const data = await getMasterStep(supabase);
    return mapStepOptions(data);
}

export type FormPendaftaranDisplayCard = FormPendaftaranDisplayItem & {
  lembagaLabel: string;
  kelasLabel: string;
  stepLabel: string
};

export async function getFormPendaftaranForDashboard(
  supabase: AppSupabaseClient,
  userId: string,
  tahunAjaranAktif: MasterTahunAjaranListItem,
  kelasOptions: MasterData[],
  lembagaOptions: MasterData[],
  steps: MasterData[],
): Promise<FormPendaftaranDisplayCard[]> {
    const raw = await getFormPendaftaranDisplayCards(supabase, userId, tahunAjaranAktif);
    const step = await getSteps(supabase)
  return raw.map((form) => ({
    ...form,
    lembagaLabel: lembagaOptions.find((o) => o.value === form.lembaga_id)?.label ?? '-',
    kelasLabel: kelasOptions.find((o) => o.value === form.kelas_id)?.label ?? '-',
    stepLabel:steps.find((o) => o.value === form.step_id)?.label ?? '-',
  }));
}