import type { Enums } from './supabase';

export type EnumGender = Enums<'gender_enum'>;
export type EnumAgama = Enums<'agama_enum'>;
export type EnumStatusHidup = Enums<'life_status_enum'>;
export type EnumRelasiKeluarga = Enums<'family_relation_enum'>;
export type EnumStatusAdmisi = Enums<'admission_status_enum'>;
export type EnumStatusFormPendaftaran = Enums<'registration_form_status_enum'>;
export type EnumSemester = Enums<'semester_enum'>;
export type EnumStatusPembayaran = Enums<'payment_status_enum'>;
export type EnumStatusDokumen = Enums<'document_status_enum'>;
export type EnumStatusPosts = Enums<'post_status'>;
export type EnumAuditLogAction = Enums<'audit_operation_enum'>;