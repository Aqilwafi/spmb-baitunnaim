markdown_content = """# 📋 Database Development Tracking Notes

File ini digunakan untuk melakukan tracking peninjauan, perbaikan, dan pengujian file-file database SQL serta dokumentasi terkait. Berikan tanda silang `[x]` jika file sudah selesai direview dan dipastikan **sip** (aman dari error keamanan `search_path`, trigger logic, RLS bypass, dll).

---

## 📂 Root Files & Documentation

### 📄 Project Root
- [ ] `.gitignore`
- [ ] `README.md`

### 📘 Docs (`/docs`)
- [ ] `docs/architecture.md` — Arsitektur sistem & relasi schema
- [ ] `docs/conventions.md` — Standar penamaan & aturan penulisan SQL
- [ ] `docs/design-philosophy.md` — Filosofi perancangan database
- [ ] `docs/matrix.md` — Matriks hak akses / RBAC matrix
- [ ] `docs/modules.md` — Penjelasan modul-modul aplikasi
- [ ] `docs/roles.md` — Definisi peran & level otoritas
- [ ] `docs/security.md` — Aturan & best-practice keamanan (RLS & Security Definer)
- [ ] `docs/tables.md` — Kamus data / dokumentasi tabel

---

## ⚙️ Functions (`/functions`)

### 🛡️ Audit (`/functions/audit`)
- [ ] `functions/audit/function_activity_logs.sql`
- [ ] `functions/audit/function_audit_trigger.sql`

### 🔑 Auth (`/functions/auth`)
- [v] `functions/auth/fn_create_user_relations.sql` 
- [v] `functions/auth/fn_prepare_new_user.sql` 
- [v] `functions/auth/fn_sync_app_metadata.sql`
- [ ] `functions/auth/fn_sync_email_to_profile.sql`
- [ ] `functions/auth/fn_sync_username_to_auth.sql` 

### 📰 Publication (`/functions/publication`)
- [ ] `functions/publication/fn_can_manage_publication.sql`

### 🤝 Shared Helper (`/functions/shared`)
- [ ] `functions/shared/function_admin_only.sql`
- [ ] `functions/shared/function_domain.sql`
- [ ] `functions/shared/function_rls_helper.sql`

### 🎓 SPMB (`/functions/spmb`)
- [v] `functions/spmb/fn_can_manage_spmb.sql`
- [v] `functions/spmb/fn_is_owner_form_data.sql`
- [v] `functions/spmb/fn_is_owner_siswa_data.sql`
- [v] `functions/spmb/fn_rpc_is_guardian_required.sql`
- [v] `functions/spmb/fn_validate_guardian_requirement.sql`
- [v] `functions/spmb/fn_validate_step_progression.sql`

### 🖥️ System (`/functions/system`)
- [ ] `functions/system/fn_is_owner_data.sql`
- [v] `functions/system/fn_set_updated_at.sql`
- [ ] `functions/system/funtion_role_mutation.sql`

### 👥 Users (`/functions/users`)
- [v] `functions/users/fn_can_manage_user_role.sql`
- [v] `functions/users/fn_is_administrator.sql` 
- [v] `functions/users/fn_is_high_level_admin.sql`
- [v] `functions/users/fn_is_superadmin.sql` 

---

## 🔒 Row Level Security Policies (`/policies`)

### 🛡️ Audit (`/policies/audit`)
- [ ] `policies/audit/activity_logs.sql`
- [ ] `policies/audit/audit_trail.sql`

### 🔑 Authority (`/policies/authority`)
- [v] `policies/authority/profiles.sql` 
- [v] `policies/authority/user_roles.sql`

### 🎨 CMS (`/policies/cms`)
- [ ] `policies/cms/faq.sql`
- [ ] `policies/cms/hero_banners.sql`
- [ ] `policies/cms/kata_mereka.sql`
- [ ] `policies/cms/kerjasama.sql`
- [ ] `policies/cms/pages.sql`
- [ ] `policies/cms/site_settings.sql`
- [ ] `policies/cms/sosial_media.sql`

### 📦 Master Data (`/policies/master`)
- [v] `policies/master/master_categories.sql`
- [v] `policies/master/master_kelas.sql`
- [v] `policies/master/master_lembaga.sql`
- [v] `policies/master/master_roles.sql`
- [v] `policies/master/master_status_rumah.sql`
- [v] `policies/master/master_step.sql`
- [v] `policies/master/master_tahun_ajaran.sql`
- [v] `policies/master/master_tinggal_bersama.sql`
- [v] `policies/master/master_tipe_dokumen.sql`

### 📰 Publikasi (`/policies/publikasi`)
- [ ] `policies/publikasi/posts.sql`
- [ ] `policies/publikasi/post_tag.sql`
- [ ] `policies/publikasi/tags.sql`

### 🎓 SPMB (`/policies/spmb`)
- [v] `policies/spmb/biodata_keluarga.sql`
- [v] `policies/spmb/biodata_siswa.sql`
- [v] `policies/spmb/biodata_siswa_detail.sql`
- [v] `policies/spmb/dokumen.sql`
- [v] `policies/spmb/form_pendaftaran.sql`
- [v] `policies/spmb/pembayaran.sql`
- [v] `policies/spmb/pendidikan_siswa_sebelumnya.sql`

---

## 🏗️ Schema & Tables (`/schema`)

### 🗃️ Root Schema
- [ ] `schema/supabase.sql`

### ⚙️ Other Configurations (`/schema/other`)
- [v] `schema/other/enums_type.sql`
- [v] `schema/other/extensions_and_domain.sql`
- [ ] `schema/other/indexing.sql`

### 📊 Tables Definition (`/schema/tables`)
- [ ] `schema/tables/audit.sql`
- [ ] `schema/tables/cms.sql`
- [v] `schema/tables/master.sql`
- [ ] `schema/tables/publikasi.sql`
- [v] `schema/tables/spmb.sql`
- [v] `schema/tables/user.sql`

---

## 🌱 Seeds Data (`/seeds`)

### 📥 Root Seeds
- [ ] `seeds/insert.sql`

### 🚀 To Supabase Production/Staging (`/seeds/to_supabase`)
- [v] `seeds/to_supabase/001.sql`
- [v] `seeds/to_supabase/002.sql`
- [v] `seeds/to_supabase/003.sql`
- [v] `seeds/to_supabase/004.sql`
- [v] `seeds/to_supabase/005.sql`
- [v] `seeds/to_supabase/006.sql`
- [v] `seeds/to_supabase/007.sql`
- [v] `seeds/to_supabase/008.sql`
- [v] `seeds/to_supabase/009.sql`
- [ ] `seeds/to_supabase/010.sql`

---

## ⚡ Triggers (`/triggers`)

### 🔑 Auth Triggers (`/triggers/auth`)
- [v] `triggers/auth/tr_after_auth_user_created.sql`
- [v] `triggers/auth/tr_before_auth_user_created.sql`
- [v] `triggers/auth/tr_sync_app_metadata.sql` 
- [ ] `triggers/auth/tr_sync_email_to_profile.sql`
- [ ] `triggers/auth/tr_sync_username_to_auth.sql`

### 🖥️ System Triggers (`/triggers/system`)
- [v] `triggers/system/trg_set_updated_at.sql`

---

## 💡 Pengingat Penting Saat Review (Supabase Best-Practices)
1. **Fungsi Security Definer:** Selalu tambahkan `REVOKE EXECUTE ON FUNCTION ... FROM public, anon, authenticated;` jika fungsi tersebut hanya digunakan oleh sistem trigger internal, agar tidak bisa dieksploitasi lewat REST API.
2. **Search Path Keamanan:** Pastikan setiap fungsi memiliki klausa `SET search_path = public` (atau `public, auth` jika meng-update data auth) untuk mencegah *Search Path Hijacking*.
3. **RLS Activation:** Jangan lupa baris `ALTER TABLE <nama_tabel> ENABLE ROW LEVEL SECURITY;` pada setiap file policy sebelum mendefinisikan `CREATE POLICY`.
4. **Trigger Return:** Cek trigger berjenis `BEFORE` jangan sampai melakukan `RETURN NULL` kecuali jika tujuannya memang sengaja ingin membatalkan/meng-cancel operasi tulis data.
"""