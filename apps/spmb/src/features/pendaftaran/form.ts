// features/pendaftaran/form-pendaftaran.ts
import { getFormPendaftaranDisplayCards, getMasterStep } from '@bn/services';
import type { FormPendaftaranDisplayItem, MasterData } from '@bn/types';
import type { AppSupabaseClient } from '@bn/supabase';
import type { MasterTahunAjaranListItem, MasterStepListItem} from '@bn/types';
import { mapStepOptions } from "@bn/utils";
import { createSupabaseServer } from "@bn/supabase";
import { getCurrentUser } from "@bn/auth";
import { checkUserAccess } from "@/utils/guards";
import { initFormSchema } from "@bn/validators";


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


export type InitFormPendaftaranResult =
  | { success: true; message: string; data: { id: string } }
  | { success: false; message: string };

export async function executeInitFormPendaftaran(
  supabase: AppSupabaseClient,
  payload: Record<string, FormDataEntryValue>
): Promise<InitFormPendaftaranResult> {
  if (!(await checkUserAccess())) {
    return { success: false, message: "Akses tidak diizinkan." };
  }

  const user = await getCurrentUser();
  if (!user?.id) {
    return { success: false, message: "Sesi pengguna tidak ditemukan, silakan login ulang." };
  }

  const parsed = initFormSchema.safeParse(payload);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Data formulir tidak valid.";
    return { success: false, message: firstError };
  }

  try {
    // const result = await createNewRegistrationService(supabase, { userId: user.id, ...parsed.data });
    const newRegId = "12345"; // Contoh ID dari DB

    return { success: true, message: "Berhasil!", data: { id: newRegId } };
  } catch (error) {
    console.error("executeInitFormPendaftaran error:", error);
    return { success: false, message: "Terjadi kesalahan pada server." };
  }
}
