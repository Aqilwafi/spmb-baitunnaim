insert into master_step (
    id,
    code,
    label,
    sort_order,
    is_revisable
)
values
    (1, 'FORM', 'Buat Form', 1, false),
    (2, 'PAYMENT', 'Pembayaran', 2, true),
    (3, 'BIODATA_STUDENT', 'Biodata Siswa', 3, true),
    (4, 'BIODATA_FATHER', 'Biodata Ayah', 4, true),
    (5, 'BIODATA_MOTHER', 'Biodata Ibu', 5, true),
    (6, 'BIODATA_WALI', 'Biodata Wali', 6, true),
    (7, 'DOCUMENT_KK', 'Dokumen KK', 7, true),
    (8, 'DOCUMENT_KTP', 'Dokumen KTP', 8, true),
    (9, 'DOCUMENT_AKTE', 'Dokumen AKTE', 9, true),
    (10, 'FINALIZATION', 'Finalisasi', 10, false)
on conflict (code)
do update set
    label = excluded.label,
    sort_order = excluded.sort_order,
    is_revisable = excluded.is_revisable;

insert into master_lembaga (id, code, label) values
    (1, 'MI', 'MI'),
    (2, 'TK', 'TK'),
    (3, 'KB', 'KB'),
    (4, 'TPA', 'TPA')
on conflict (label) do nothing;

insert into master_kelas (id, code, label) values
    (1, 'MI01', 'Kelas 1'),
    (2, 'MI02', 'Kelas 2'),
    (3, 'MI03', 'Kelas 3'),
    (4, 'MI04', 'Kelas 4'),
    (5, 'MI05', 'Kelas 5'),
    (6, 'MI06', 'Kelas 6')
on conflict (label) do nothing;

insert into master_tahun_ajaran (code, tahun_mulai, tahun_selesai, semester, is_active) values
    ('2025-2', 2025, 2026, 'GENAP', false),
    ('2026-1', 2026, 2027, 'GANJIL', true),
    ('2026-2', 2026, 2027, 'GENAP', false)
on conflict (tahun_mulai, tahun_selesai, semester) do nothing;

insert into master_tipe_dokumen (id, code, label) values
    (1, 'KK_TYPE_DOC', 'Kartu Keluarga'),
    (2, 'KTP_TYPE_DOC', 'Kartu Tanda Penduduk'),
    (3, 'AKTE_TYPE_DOC', 'Akte Kelahiran')
on conflict (code) do nothing;

insert into master_status_rumah (id, code, label) values
    (1, 'NENEK', 'Nenek'),
    (2, 'ORTU', 'Orang Tua'),
    (3, 'SAUDARA', 'Saudara'),
    (4, 'DINAS', 'Dinas'),
    (5, 'SEWA', 'Sewa/Kontrak')
on conflict (code) do nothing;

insert into master_tinggal_bersama (id, code, label) values
    (1, 'ORTU', 'Orang Tua'),
    (2, 'SAUDARA', 'Saudara'),
    (3, 'WALI', 'Wali'),
    (4, 'PANTI', 'Panti'),
    (5, 'PESANTREN', 'Pesantren')
on conflict (code) do nothing;

insert into master_roles (code, label, description) values
('SUPERADMIN', 'Super Administrator', 'Full system access'),
('ADMINISTRATOR', 'Administrator', 'Admin lintas domain SPMB & Publikasi'),
    ('PENDAFTAR', 'Pendaftar', 'Akun untuk melakukan pendaftaran siswa baru di SPMB Baitunnaim'),
    ('VERIFIKATOR', 'Verifikator', 'Verifikasi data dan dokumen pendaftaran'),
    ('PUBLIKATOR', 'Publikator', 'Kelola konten publikasi')
on conflict (id) do nothing;

insert into master_domains (id, code, domain_name, domain_description) values
    (1, 'SPMB', 'Sistem Penerimaan Murid Baru', 'Domain pendaftaran & seleksi siswa'),
    (2, 'PUBLIKASI', 'Sistem Publikasi', 'Domain konten & informasi')
on conflict (id) do nothing;

insert into user_roles (user_id, role_id, domain_id) values
    ('00000000-0000-0000-0000-000000000002', 3, 1),
    ('00000000-0000-0000-0000-000000000002', 3, 2);