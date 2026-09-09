import { checkUserAccess } from "@/features/auth/guards";
import { initFormSchema, formIdParamsSchema } from "@bn/validators";
import {
  insertInitFormStep,
  getInitFormStep,
  type InitFormStepData as ServiceInitFormStepData,
  type InitFormResult,
} from "@/services/init-form";
import { getTahunAjaranAktif } from "../master/tahun-ajaran";
import { mapInitFormPayload } from "../../helpers/mappers";
import { pickId, genderLabel } from "@bn/utils";
import type { ActionResponse } from "@bn/types"; // Hapus RpcSubmitResponse

// 1. Disesuaikan dengan InitFormStepData dari Service (menggunakan camelCase)
export type InitFormStepData = Omit<ServiceInitFormStepData, "gender"> & {
  genderFormatted: string;
};

export async function executeInitFormStep(
  payload: Record<string, FormDataEntryValue>
): Promise<ActionResponse<InitFormResult>> {
  if (!(await checkUserAccess())) {
    return {
      success: false,
      message: "Akses tidak diizinkan.",
      error: { code: "UNAUTHORIZED" },
    };
  }

  const parsed = initFormSchema.safeParse(mapInitFormPayload(payload));
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Data formulir tidak valid.",
      error: { code: "VALIDATION_ERROR" },
    };
  }

  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) {
    return {
      success: false,
      message: "Tahun ajaran aktif tidak ditemukan.",
      error: { code: "NOT_FOUND" },
    };
  }

  try {
    const pendaftaran = await insertInitFormStep({
      nik: parsed.data.nik,
      namaLengkap: parsed.data.namaLengkap,
      gender: parsed.data.gender,
      tempatLahir: parsed.data.tempatLahir,
      tanggalLahir: parsed.data.tanggalLahir.toISOString().split("T")[0],
      lembagaId: parsed.data.lembagaId,
      kelasId: parsed.data.kelasId ?? null,
    });

    return {
      success: true,
      message: "Berhasil!",
      data: pendaftaran, // Berisi { formId, nextStepId }
    };
  } catch (error) {
    console.error("executeInitFormPendaftaran error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Terjadi kesalahan pada server.",
    };
  }
}

export async function getInitFormStepData(
  formId: string
): Promise<InitFormStepData | null> {
  const parsed = formIdParamsSchema.safeParse(formId);
  if (!parsed.success) return null;

  const tahunAjaranId = await pickId(getTahunAjaranAktif());
  if (!tahunAjaranId) return null;

  const data = await getInitFormStep(parsed.data, tahunAjaranId);
  
  if (!data) return null;

  console.log(data);
  
  return {
    ...data,
    genderFormatted: genderLabel(data.gender),
  };
}