insert into master_step (
    code,
    label,
    step_order
)
values
    ('FORM', 'Buat Form', 1),
    ('PAYMENT', 'Pembayaran', 2),
    ('BIODATA_STUDENT', 'Biodata Siswa', 3),
    ('BIODATA_FATHER', 'Biodata Ayah', 4),
    ('BIODATA_MOTHER', 'Biodata Ibu', 5),
    ('BIODATA_WALI', 'Biodata Wali', 6),
    ('DOCUMENT_KK', 'Dokumen KK', 7),
    ('DOCUMENT_KTP', 'Dokumen KTP', 8),
    ('DOCUMENT_AKTE', 'Dokumen AKTE', 9),
    ('FINALIZATION', 'Finalisasi', 10)
on conflict (code)
do update set
    label = excluded.label,
    step_order = excluded.step_order;

insert into master_lembaga (code, label) values
    ('MI', 'MI'),
    ('TK', 'TK'),
    ('KB', 'KB'),
    ('TPA', 'TPA')
on conflict (code) do nothing;

insert into master_kelas (code, label) values
    ('MI01', 'Kelas 1'),
    ('MI02', 'Kelas 2'),
    ('MI03', 'Kelas 3'),
    ('MI04', 'Kelas 4'),
    ('MI05', 'Kelas 5'),
    ('MI06', 'Kelas 6')
on conflict (code) do nothing;

insert into master_tahun_ajaran (
    code,
    label,
    start_year,
    end_year,
    semester,
    is_active
)
values
    ('2025-2026_GENAP', '2025-2026_GENAP', 2025, 2026, 'GENAP', false),
    ('2026-2027_GANJIL', '2025-2026_GENAP', 2026, 2027, 'GANJIL', true),
    ('2026-2027_GENAP', '2025-2026_GENAP', 2026, 2027, 'GENAP', false)
on conflict (start_year, end_year, semester) do nothing;

insert into master_tipe_dokumen (code, label) values
    ('KK_TYPE_DOC', 'Kartu Keluarga'),
    ('KTP_TYPE_DOC', 'Kartu Tanda Penduduk'),
    ('AKTE_TYPE_DOC', 'Akte Kelahiran')
on conflict (code) do nothing;

insert into master_status_rumah (code, label) values
    ('NENEK', 'Nenek'),
    ('ORTU', 'Orang Tua'),
    ('SAUDARA', 'Saudara'),
    ('DINAS', 'Dinas'),
    ('SEWA', 'Sewa/Kontrak')
on conflict (code) do nothing;

insert into master_tinggal_bersama (code, label) values
    ('ORTU', 'Orang Tua'),
    ('SAUDARA', 'Saudara'),
    ('WALI', 'Wali'),
    ('PANTI', 'Panti'),
    ('PESANTREN', 'Pesantren')
on conflict (code) do nothing;

insert into master_roles (code, label, description) values
('SUPERADMIN', 'Super Administrator', 'Full system access'),
('ADMINISTRATOR', 'Administrator', 'Admin lintas domain SPMB & Publikasi'),
    ('PENDAFTAR', 'Pendaftar', 'Akun untuk melakukan pendaftaran siswa baru di SPMB Baitunnaim'),
    ('VERIFIKATOR', 'Verifikator', 'Verifikasi data dan dokumen pendaftaran'),
    ('PUBLIKATOR', 'Publikator', 'Kelola konten publikasi')
on conflict (id) do nothing;