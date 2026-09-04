// features/form/init.ts
import { checkUserAccess } from "@/features/auth/guards";
import { initFormSchema, formIdParamsSchema } from "@bn/validators";
import {
  initFormPendaftaranService,
  initFormStepDataService,
  type InitFormStepDataRPCResponse,
} from "@/services/init-form";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { mapInitFormPayload } from "../../helpers/mappers";
import { pickId, genderLabel } from "@bn/utils";

export type InitFormPendaftaranResult =
  | { success: true; message: string; data: { id: string } }
  | { success: false; message: string };

// Tipe data hasil kustomisasi di layer feature/UI (jenis_kelamin ter-format)
export type InitFormStepData = Omit<InitFormStepDataRPCResponse, "jenis_kelamin"> & {
  jenis_kelamin: string;
};

const STEP_INIT_FORM = 2;

export async function executeInitFormPendaftaran(
  payload: Record<string, FormDataEntryValue>
): Promise<InitFormPendaftaranResult> {
  if (!(await checkUserAccess())) {
    return { success: false, message: "Akses tidak diizinkan." };
  }

  const parsed = initFormSchema.safeParse(mapInitFormPayload(payload));
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Data formulir tidak valid.",
    };
  }

  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) {
    return { success: false, message: "Tahun ajaran aktif tidak ditemukan." };
  }

  try {
    const pendaftaran = await initFormPendaftaranService({
      nik: parsed.data.nik,
      namaLengkap: parsed.data.namaLengkap,
      gender: parsed.data.gender,
      tempatLahir: parsed.data.tempatLahir,
      tanggalLahir: parsed.data.tanggalLahir.toISOString().split("T")[0],
      lembagaId: parsed.data.lembagaId,
      kelasId: parsed.data.kelasId ?? null,
      tahunAjaranId,
      stepId: STEP_INIT_FORM,
    });

    return {
      success: true,
      message: "Berhasil!",
      data: { id: pendaftaran.form_id },
    };
  } catch (error) {
    console.error("executeInitFormPendaftaran error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Terjadi kesalahan pada server.",
    };
  }
}

export async function getInitFormStepData(formId: string): Promise<InitFormStepData | null> {
  // 1. Validasi parameter formId
  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) return null;

  // 2. Ambil Tahun Ajaran Aktif
  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) return null;

  // 3. Panggil RPC Atomic (Ownership check via auth.uid() sudah ditangani di SQL)
  const data = await initFormStepDataService(parsed.data, tahunAjaranId);
  if (!data) return null;

  // 4. Format tampilan sederhana di UI level
  return {
    ...data,
    jenis_kelamin: genderLabel(data.jenis_kelamin),
  };
}