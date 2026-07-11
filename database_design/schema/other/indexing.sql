-- ============================================================
-- indexing.sql (OPTIMIZED)
-- Perubahan dari versi sebelumnya:
--   1. Dihapus: idx_pendidikan_siswa, idx_keluarga_siswa, idx_dokumen_form
--      -> sudah tercover oleh unique index yang ada (leftmost column match)
--   2. master_step: uq_active_step_code dihapus (redundant dengan
--      master_step_code_key), uq_active_step_order dipertahankan tapi
--      WAJIB drop index lama uq_step_order_active agar tidak ambigu
--   3. idx_biodata_siswa_reclaim_verify: no_kk sebenarnya ada di
--      biodata_siswa_detail, bukan biodata_siswa -> dipecah jadi 2 index
--   4. idx_form_created_by: kolom created_by tidak ada di form_pendaftaran
--      -> diganti asumsi ke pendaftar_id (SESUAIKAN jika salah asumsi)
-- ============================================================

-- ============================================================
-- MASTER_STEP
-- ============================================================

-- Drop index lama yang ambigu (composite unique, tidak benar2 mencegah
-- duplikat step_order aktif). Jalankan hanya jika sudah dikonfirmasi
-- tidak dipakai FK/constraint lain.
drop index if exists uq_step_order_active;

-- Hanya boleh ada 1 step aktif per step_order (partial unique)
create unique index if not exists uq_active_step_order
on master_step (step_order)
where (is_active = true);

-- uq_active_step_code TIDAK dibuat -> sudah redundant dengan
-- master_step_code_key (unique, berlaku global di semua baris)


-- ============================================================
-- BIODATA_SISWA
-- ============================================================

-- FK owner_user_id -> profiles, belum ada index sama sekali
create index if not exists idx_biodata_owner_user
on biodata_siswa (owner_user_id);

-- Reclaim verification: nik & tanggal_lahir ada di biodata_siswa
-- (no_kk TIDAK ada di tabel ini, lihat index terpisah di bawah)
create index if not exists idx_biodata_siswa_reclaim_verify
on biodata_siswa (nik, tanggal_lahir);

-- no_kk ada di biodata_siswa_detail (id = FK ke biodata_siswa.id)
create index if not exists idx_biodata_siswa_detail_no_kk
on biodata_siswa_detail (no_kk);


-- ============================================================
-- PENDIDIKAN_SISWA_SEBELUMNYA
-- ============================================================
-- idx_pendidikan_siswa DIHAPUS: biodata_siswa_id sudah UNIQUE
-- (pendidikan_siswa_sebelumnya_biodata_siswa_id_key), lookup by
-- kolom ini sudah efisien tanpa index tambahan.


-- ============================================================
-- BIODATA_KELUARGA
-- ============================================================
-- idx_keluarga_siswa DIHAPUS: uq_siswa_relation (biodata_siswa_id,
-- relation_type) sudah leftmost-match untuk query filter by
-- biodata_siswa_id saja.


-- ============================================================
-- DOKUMEN
-- ============================================================
-- idx_dokumen_form DIHAPUS: uq_form_tipe_dokumen
-- (form_pendaftaran_id, tipe_dokumen_id) sudah leftmost-match.


-- ============================================================
-- FORM_PENDAFTARAN
-- ============================================================

-- CATATAN: kolom "created_by" TIDAK ADA di schema form_pendaftaran.
-- Kolom yang tersedia: pendaftar_id, finalized_by, decided_by.
-- Diasumsikan maksudnya pendaftar_id (siapa yang mengisi/membuat form).
-- Jika ternyata kolom created_by memang perlu ditambahkan dulu ke tabel,
-- hapus/ubah baris di bawah ini.
create index if not exists idx_form_pendaftar_id
on form_pendaftaran (pendaftar_id);


-- ============================================================
-- POSTS
-- ============================================================
-- Catatan: tabel ini tidak ada di schema/index list yang diverifikasi.
-- Pastikan nama kolom (lembaga_id, category_id, created_by, slug,
-- is_active, status, created_at) memang sesuai sebelum menjalankan.

-- -- 1. index untuk foreign key (wajib agar query join kencang)
-- create index if not exists idx_posts_lembaga_id on posts (lembaga_id);
-- create index if not exists idx_posts_category_id on posts (category_id);
-- create index if not exists idx_posts_created_by on posts (created_by);

-- -- 2. partial index untuk pencarian artikel aktif berdasarkan slug (query routing)
-- create unique index if not exists idx_posts_slug_active
-- on posts (slug)
-- where is_active = true;

-- -- 3. partial index untuk halaman utama / list artikel terbaru (seo & feed)
-- create index if not exists idx_posts_latest_published
-- on posts (created_at desc)
-- where status = 'PUBLISHED' and is_active = true;


-- -- ============================================================
-- -- CMS (pages, kata_mereka, kerjasama, sosial_media)
-- -- ============================================================
-- -- Catatan: tabel-tabel ini juga tidak ada di schema yang diverifikasi.

-- create index if not exists idx_pages_code
-- on pages (code);

-- create unique index if not exists idx_pages_slug_active
-- on pages (slug)
-- where is_active = true;

-- create index if not exists idx_kata_mereka_show
-- on kata_mereka (is_show)
-- where is_active = true;

-- create index if not exists idx_kerjasama_show
-- on kerjasama (is_show)
-- where is_active = true;

-- create index if not exists idx_sosial_media_show
-- on sosial_media (is_show)
-- where is_active = true;


-- ============================================================
-- AUDIT TRAIL & ACTIVITY LOGS
-- ============================================================
-- create index if not exists idx_audit_created_at on audit_trail (created_at desc);
-- create index if not exists idx_audit_user_id on audit_trail (user_id) where user_id is not null;
-- create index if not exists idx_audit_table_record on audit_trail (table_name, record_id);

-- create index if not exists idx_activity_created_at on activity_logs (created_at desc);
-- create index if not exists idx_activity_user_event on activity_logs (user_id, event);


-- ============================================================
-- RECLAIM (masih di-comment sesuai file asli, belum diaktifkan)
-- ============================================================

-- create index if not exists idx_owner_history_siswa
-- on biodata_siswa_owner_history(biodata_siswa_id);

-- create index if not exists idx_owner_history_new_owner
-- on biodata_siswa_owner_history(new_owner_id);

-- create index if not exists idx_owner_history_changed_at
-- on biodata_siswa_owner_history(changed_at desc);

-- create unique index uniq_reclaim_pending_per_siswa
-- on siswa_reclaim_request (siswa_id)
-- where status = 'pending';

-- create index idx_reclaim_siswa
-- on siswa_reclaim_request (siswa_id);

-- create index idx_reclaim_requested_by
-- on siswa_reclaim_request (requested_by);

-- create index idx_reclaim_status
-- on siswa_reclaim_request (status);

-- create index idx_reclaim_created_at
-- on siswa_reclaim_request (created_at desc);