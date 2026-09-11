"use server";

import { revalidatePath } from "next/cache";
import type { InputRelationType, DBRelationType, ActionResponse } from '@bn/types'
// ============================================================================
// IMPORTS & FEATURE INTEGRATION (DISABLED FOR NOW)
// ============================================================================
// import { saveBiodataKeluarga } from "@/features/pendaftaran/services/biodata.service";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface SubmitBiodataKeluargaPayload {
  formId: string;
  rawPayload: Record<string, any>;
}

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
}

// ============================================================================
// MAPPING DICTIONARIES
// ============================================================================
// UI Form Value -> DB Enum Value
const RELATION_TYPE_TO_DB: Record<InputRelationType, DBRelationType> = {
  AYAH: "BIODATA_FATHER",
  IBU: "BIODATA_MOTHER",
  WALI: "BIODATA_WALI",
};

// DB Enum Value -> UI Form Value
const DB_TO_RELATION_TYPE: Record<DBRelationType, InputRelationType> = {
  BIODATA_FATHER: "AYAH",
  BIODATA_MOTHER: "IBU",
  BIODATA_WALI: "WALI",
};

// ============================================================================
// MAIN SERVER ACTION
// ============================================================================
export async function submitBiodataKeluargaAction({
  formId,
  rawPayload,
}: SubmitBiodataKeluargaPayload): Promise<ActionResult> {
  try {
    // Simulasi network delay (database operation)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("=== [SERVER ACTION] submitBiodataKeluargaAction ===");
    console.log("Form ID (Pendaftaran ID):", formId);

    // ------------------------------------------------------------------------
    // 1. PENANGANAN SKIP WALI
    // ------------------------------------------------------------------------
    if (rawPayload.is_skipped === "true") {
      console.log("-> Action: Processing Skip Wali");

      /* FEATURE CALL PLACEHOLDER
      await saveBiodataKeluarga({
        pendaftaranId: formId,
        isSkipped: true,
        relationType: RELATION_TYPE_TO_DB["WALI"],
      });
      */

      revalidatePath(`/pendaftaran/${formId}`);

      return {
        success: true,
        message: "Data wali berhasil dilewati.",
      };
    }

    // ------------------------------------------------------------------------
    // 2. PARSING & REMAPPING DATA
    // ------------------------------------------------------------------------
    const inputRelation = rawPayload.relation_type as InputRelationType;
    const dbRelationType = RELATION_TYPE_TO_DB[inputRelation] || "BIODATA_WALI";

    const sanitizedData = {
      pendaftaranId: formId,
      relationType: dbRelationType, // Nilai yang sudah diremap ke enum DB (e.g. "BIODATA_FATHER")
      detailRelationType: rawPayload.detail_relation_type || null,
      namaLengkap: rawPayload.nama_lengkap ? String(rawPayload.nama_lengkap).trim() : "",
      statusHidup: rawPayload.status_hidup || "HIDUP",
      nik: rawPayload.nik || null,
      noHp: rawPayload.no_hp || null,
      tempatLahir: rawPayload.tempat_lahir || null,
      tanggalLahir: rawPayload.tanggal_lahir || null,
      pendidikanTerakhir: rawPayload.pendidikan_terakhir || null,
      pekerjaan: rawPayload.pekerjaan || null,
      penghasilan: rawPayload.penghasilan || null,
      alamat: rawPayload.alamat || null,
    };

    console.log("-> Mapped Payload for DB:", sanitizedData);

    // ------------------------------------------------------------------------
    // 3. VALIDASI FORMULIR
    // ------------------------------------------------------------------------
    const errors: Record<string, string[]> = {};

    if (!sanitizedData.namaLengkap) {
      errors.nama_lengkap = ["Nama lengkap wajib diisi."];
    }

    if (sanitizedData.statusHidup === "HIDUP") {
      if (!sanitizedData.nik) {
        errors.nik = ["NIK wajib diisi jika status hidup."];
      } else if (sanitizedData.nik.length !== 16) {
        errors.nik = ["NIK harus berjumlah 16 digit."];
      }

      if (!sanitizedData.noHp) {
        errors.no_hp = ["Nomor HP/WhatsApp wajib diisi."];
      }

      if (!sanitizedData.tempatLahir) {
        errors.tempat_lahir = ["Tempat lahir wajib diisi."];
      }

      if (!sanitizedData.tanggalLahir) {
        errors.tanggal_lahir = ["Tanggal lahir wajib diisi."];
      }
    }

    if (inputRelation === "WALI" && !sanitizedData.detailRelationType) {
      errors.detail_relation_type = ["Detail hubungan wali wajib diisi (misal: Kakek, Paman)."];
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: "Terdapat kesalahan pada pengisian formulir. Silakan periksa kembali.",
        errors,
      };
    }

    // ------------------------------------------------------------------------
    // 4. EKSEKUSI DATABASE (FEATURE PLACEHOLDER)
    // ------------------------------------------------------------------------
    /* FEATURE CALL PLACEHOLDER
    const result = await saveBiodataKeluarga(sanitizedData);
    */

    console.log("-> Success: Data biodata keluarga berhasil disimpan.");

    // Revalidate cache agar UI ter-update
    revalidatePath(`/pendaftaran/${formId}`);

    return {
      success: true,
      message: `Biodata ${inputRelation} berhasil disimpan!`,
    };
  } catch (error) {
    console.error("=== [SERVER ACTION ERROR] ===", error);
    return {
      success: false,
      message: "Terjadi kesalahan internal pada server. Silakan coba lagi.",
    };
  }
}