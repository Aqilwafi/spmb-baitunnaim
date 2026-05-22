INSERT INTO master_step (
    id,
    code,
    label,
    sort_order,
    is_revisable
)
VALUES
    (1, 'FORM', 'Buat Form', 1, FALSE),
    (2, 'PAYMENT', 'Pembayaran', 2, TRUE),
    (3, 'BIODATA_STUDENT', 'Biodata Siswa', 3, TRUE),
    (4, 'BIODATA_FATHER', 'Biodata Ayah', 4, TRUE),
    (5, 'BIODATA_MOTHER', 'Biodata Ibu', 5, TRUE),
    (6, 'BIODATA_WALI', 'Biodata Wali', 6, TRUE),
    (7, 'DOCUMENT_KK', 'Dokumen KK', 7, TRUE),
    (8, 'DOCUMENT_KTP', 'Dokumen KTP', 8, TRUE),
    (9, 'DOCUMENT_AKTE', 'Dokumen AKTE', 9, TRUE),
    (10, 'FINALIZATION', 'Finalisasi', 10, FALSE)
ON CONFLICT (code)
DO UPDATE SET
    label = EXCLUDED.label,
    sort_order = EXCLUDED.sort_order,
    is_revisable = EXCLUDED.is_revisable;

INSERT INTO master_lembaga (id, code, label) VALUES 
(1, 'MI', 'MI'), 
(2, 'TK', 'TK'), 
(3, 'KB', 'KB'), 
(4, 'TPA', 'TPA')
ON CONFLICT (label) DO NOTHING;

INSERT INTO master_kelas (id, code, label) VALUES
    (1, 'MI01', 'Kelas 1'),
    (2, 'MI02', 'Kelas 2'),
    (3, 'MI03', 'Kelas 3'),
    (4, 'MI04', 'Kelas 4'),
    (5, 'MI05', 'Kelas 5'),
    (6, 'MI06', 'Kelas 6')
ON CONFLICT (label) DO NOTHING;

INSERT INTO master_tahun_ajaran (code,tahun_mulai, tahun_selesai, semester, is_active) VALUES
    ('2025-2', 2025, 2026, 'GENAP', FALSE),
    ('2026-1', 2026, 2027, 'GANJIL', TRUE),
    ('2026-2', 2026, 2027, 'GENAP', FALSE)
ON CONFLICT (tahun_mulai, tahun_selesai, semester) DO NOTHING;

INSERT INTO master_tipe_dokumen (id, code, label) VALUES
    (1, 'KK_TYPE_DOC', 'Kartu Keluarga'), 
    (2, 'KTP_TYPE_DOC', 'Kartu Tanda Penduduk'), 
    (3, 'AKTE_TYPE_DOC', 'Akte Kelahiran')
ON CONFLICT (code) DO NOTHING;

INSERT INTO master_status_rumah (id, code, label) VALUES
    (1, 'NENEK', 'Nenek'), 
    (2, 'ORTU', 'Orang Tua'), 
    (3, 'SAUDARA', 'Saudara'), 
    (4, 'DINAS', 'Dinas'), 
    (5, 'SEWA', 'Sewa/Kontrak')
ON CONFLICT (code) DO NOTHING;

INSERT INTO master_tinggal_bersama (id, code, label) VALUES
    (1, 'ORTU', 'Orang Tua'), 
    (2, 'SAUDARA', 'Saudara'), 
    (3, 'WALI', 'Wali'), 
    (4, 'PANTI', 'Panti'), 
    (5, 'PESANTREN', 'Pesantren')
ON CONFLICT (code) DO NOTHING;

INSERT INTO master_roles (id, code, role_name, role_description) VALUES
    (1, 'PENDAFTAR', 'Pendaftar', 'Akun untuk melakukan pendaftaran siswa baru di SPMB Baitunnaim'),
    (2, 'SUPERADMIN', 'Super Administrator', 'Full system access'),
    (3, 'ADMINISTRATOR', 'Administrator', 'Admin lintas domain SPMB & Publikasi'),
    (4, 'VERIFIKATOR', 'Verifikator', 'Verifikasi data dan dokumen pendaftaran'),
    (5, 'PUBLIKATOR', 'Publikator', 'Kelola konten publikasi')
ON CONFLICT (id) DO NOTHING;

INSERT INTO master_domains (id, code, domain_name, domain_description) VALUES
    (1, 'SPMB', 'Sistem Penerimaan Murid Baru', 'Domain pendaftaran & seleksi siswa'),
    (2, 'PUBLIKASI', 'Sistem Publikasi', 'Domain konten & informasi')
ON CONFLICT (id) DO NOTHING;

INSERT INTO user_roles (user_id, role_id, domain_id) VALUES
    ('00000000-0000-0000-0000-000000000002', 3, 1),
    ('00000000-0000-0000-0000-000000000002', 3, 2);