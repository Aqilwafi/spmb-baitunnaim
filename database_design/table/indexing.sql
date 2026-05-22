
-- KEEP: deduplication + lookup utama
CREATE UNIQUE INDEX uniq_nik_not_null
ON biodata_siswa(nik)
WHERE nik IS NOT NULL;

-- KEEP: query by akun pendaftar
CREATE INDEX IF NOT EXISTS idx_biodata_akun_pendaftar
ON biodata_siswa(akun_pendaftar_id);

CREATE INDEX idx_biodata_siswa_reclaim_verify
ON biodata_siswa (nik, tanggal_lahir, no_kk);

CREATE INDEX IF NOT EXISTS idx_pendidikan_siswa
ON pendidikan_siswa_sebelumnya(siswa_id);

CREATE INDEX IF NOT EXISTS idx_keluarga_siswa
ON biodata_keluarga(siswa_id);

CREATE UNIQUE INDEX idx_posts_slug
ON posts (slug);

CREATE UNIQUE INDEX idx_posts_slug_lower
ON posts (lower(slug));

CREATE INDEX idx_posts_status
ON posts (status);

CREATE INDEX idx_posts_author
ON posts (author_id);

CREATE INDEX idx_posts_category
ON posts (category_id);

CREATE INDEX idx_posts_published_at
ON posts (published_at DESC)
WHERE status = 'published';

CREATE INDEX idx_posts_created_at
ON posts (created_at DESC);

CREATE UNIQUE INDEX idx_categories_slug_lower
ON categories (lower(slug));


CREATE INDEX IF NOT EXISTS idx_owner_history_siswa
ON biodata_siswa_owner_history(siswa_id);

CREATE INDEX IF NOT EXISTS idx_owner_history_new_owner
ON biodata_siswa_owner_history(new_owner_id);

CREATE INDEX IF NOT EXISTS idx_owner_history_changed_at
ON biodata_siswa_owner_history(changed_at DESC);

CREATE UNIQUE INDEX uniq_reclaim_pending_per_siswa
ON siswa_reclaim_request (siswa_id)
WHERE status = 'PENDING';

CREATE INDEX idx_reclaim_siswa
ON siswa_reclaim_request (siswa_id);

CREATE INDEX idx_reclaim_requested_by
ON siswa_reclaim_request (requested_by);

CREATE INDEX idx_reclaim_status
ON siswa_reclaim_request (status);

CREATE INDEX idx_reclaim_created_at
ON siswa_reclaim_request (created_at DESC);


CREATE INDEX IF NOT EXISTS idx_activity_created_at
ON activity_logs(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_audit_created_at
ON audit_trail(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_dokumen_form
ON dokumen(form_pendaftaran_id);

CREATE INDEX IF NOT EXISTS idx_pembayaran_form
ON pembayaran(form_pendaftaran_id);

CREATE INDEX IF NOT EXISTS idx_form_created_by
ON form_pendaftaran(created_by);