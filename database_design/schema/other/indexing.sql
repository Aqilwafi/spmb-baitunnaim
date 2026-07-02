create unique index uq_active_step_code on master_step(code) where (is_active = true);
create unique index uq_active_step_order on master_step(step_order) where (is_active = true);

create index if not exists idx_biodata_owner_user
on biodata_siswa(owner_user_id);

create index idx_biodata_siswa_reclaim_verify
on biodata_siswa (nik, tanggal_lahir, no_kk);

create index if not exists idx_pendidikan_siswa
on pendidikan_siswa_sebelumnya(biodata_siswa_id);

create index if not exists idx_keluarga_siswa
on biodata_keluarga(biodata_siswa_id);

create index if not exists idx_dokumen_form
on dokumen(form_pendaftaran_id);

create index if not exists idx_form_created_by
on form_pendaftaran(created_by);

-- post 

-- 1. index untuk foreign key (wajib agar query join kencang)
create index idx_posts_lembaga_id on posts (lembaga_id);
create index idx_posts_category_id on posts (category_id);
create index idx_posts_created_by on posts (created_by);

-- 2. partial index untuk pencarian artikel aktif berdasarkan slug (query routing)
create unique index idx_posts_slug_active 
on posts (slug) 
where is_active = true;

-- 3. partial index untuk halaman utama / list artikel terbaru (seo & feed)
create index idx_posts_latest_published 
on posts (created_at desc) 
where status = 'PUBLISHED' and is_active = true;

-- cms

create index if not exists idx_pages_code
on pages(code);

create unique index idx_pages_slug_active 
on pages (slug) 
where is_active = true;

create index if not exists idx_kata_mereka_show
on kata_mereka(is_show)
where is_active = true;

create index if not exists idx_kerjasama_show
on kerjasama(is_show)
where is_active = true;

create index if not exists idx_sosial_media_show
on sosial_media(is_show)
where is_active = true;

-- audit trail & activity logs

create index if not exists idx_audit_created_at on audit_trail(created_at desc);
create index if not exists idx_audit_user_id on audit_trail(user_id) where user_id is not null;
create index if not exists idx_audit_table_record on audit_trail(table_name, record_id);

-- indeks untuk tabel activity_logs
create index if not exists idx_activity_created_at on activity_logs(created_at desc);
create index if not exists idx_activity_user_event on activity_logs(user_id, event);

-- reclaim 

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