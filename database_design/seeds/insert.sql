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

-- ============================================================
-- SEED DATA: master_categories
-- ============================================================
insert into master_categories (label) values
  ('Acara Sekolah'),
  ('Edukasi Kesehatan'),
  ('Kegiatan Sekolah'),
  ('Pendidikan'),
  ('Akademik'),
  ('PAUD'),
  ('Prestasi');

-- ============================================================
-- SEED DATA: tags (semua hashtag unik dari artikel)
-- ============================================================
insert into public.tags (label) values
  -- Artikel 1
  ('HariKartini2025'),
  ('MIAlMaarifNgadri'),
  ('KartiniMasaKini'),
  ('LombaKartini'),
  -- Artikel 2
  ('PAUDPlusBaitunNaim'),
  ('SenyumSehatAnakHebat'),
  ('PenyuluhanGigi'),
  ('PuskesmasBinangun'),
  ('AnakCeriaAnakSehat'),
  -- Artikel 5
  ('ASAJ2025'),
  ('PendidikanBermakna'),
  ('UjianAkhirMadrasah'),
  ('GenerasiBerkarakter'),
  -- Artikel 6
  ('PAUDBaitunnaim'),
  ('KeceriaanAnak'),
  ('HalalBihalalPAUD'),
  ('KembaliKeSekolah'),
  ('SemangatBaru'),
  ('PersaudaraanPAUD'),
  ('LiburLebaran'),
  ('AnakHebatPAUD'),
  -- Artikel 7
  ('HalalBihalal'),
  ('SilaturahmiIdulFitri'),
  ('HariPertamaSekolah'),
  ('PersaudaraanSekolah'),
  ('KeceriaanSetelahLebaran'),
  ('SiswaBerprestasi'),
  ('MIAlMaarifNgadriHebat'),
  -- Artikel 8
  ('MIAlmaarifNgadri'),
  ('JuaraUmumPorseni'),
  ('PorseniBinangun2025'),
  ('PrestasiGemilang'),
  ('32Piala'),
  ('OlahragaDanSeni'),
  ('PendidikanBerkualitas'),
  ('SemangatPelajar'),
  ('PendidikanHebat'),
  ('KreativitasSiswa');

-- ============================================================
-- SEED DATA: posts (8 artikel)
-- Catatan: 
--   - lembaga_id: asumsi MI=6, PAUD=2 (sesuai master_lembaga)
--   - category_id: sesuai mapping kategori di atas
--   - created_by: NULL karena belum ada profil
--   - content: menggunakan konten_md (full markdown)
-- ============================================================
insert into public.posts (lembaga_id, category_id, penulis, judul, slug, ringkasan, content, status, created_at, updated_at) values
-- 1. Panggung Kartini (MI, Acara Sekolah)
(
  1, 1, 'Admin',
  'Panggung Kartini, Panggung Ekspresi Siswa MI Al Maarif Ngadri',
  'panggung-kartini-panggung-ekspresi-siswa-mi-al-maarif-ngadri',
  'MI Al Maarif Ngadri merayakan Hari Kartini dengan lomba kreatif dan penuh semangat.',
  E'Ngadri, 21 April 2025 - MI Al Maarif Ngadri merayakan Hari Kartini dengan menggelar lomba puisi, menyanyi, dan story telling pada 21 April 2025.\n\nKegiatan ini bertujuan menumbuhkan semangat emansipasi dan kreativitas siswa. Lebih dari 60 siswa ikut berpartisipasi, menampilkan bakat terbaik mereka dalam berbagai kategori.\n\n“Peringatan ini tidak hanya mengenang Kartini, tetapi juga melatih keberanian dan kreativitas anak-anak,” ujar Usth Ita Kumala, koordinator kegiatan. \n\nPeringatan Hari Kartini kali ini tidak hanya seru, tetapi juga memberi ruang bagi siswa untuk berkembang, mengasah bakat, dan mengenal tokoh inspiratif bangsa.',
  'PUBLISHED', '2025-04-21', '2025-04-25'
),

-- 2. Gigi Sehat (PAUD, Edukasi Kesehatan)
(
  1, 2, 'Admin',
  'Gigi Sehat, Anak Ceria oleh Puskesmas Binangun',
  'gigi-sehat-anak-ceria-puskesmas-binangun',
  'Edukasi kesehatan gigi untuk anak-anak PAUD Plus Baitun Naim.',
  E'Rabu, 16 April 2025 - PAUD Plus Baitun Naim kedatangan tamu istimewa dari Puskesmas Binangun dalam kegiatan edukasi kesehatan gigi untuk anak-anak.\n\nDengan penuh semangat dan tawa, anak-anak belajar menjaga kebersihan mulut sejak dini. Kegiatan ini dikemas secara menarik dan interaktif, lengkap dengan peragaan dan praktik langsung bersama para petugas kesehatan.\n\nTerima kasih Puskesmas Binangun atas kunjungannya! Semoga ilmu yang dibagikan hari ini bermanfaat dan menjadi bekal bagi anak-anak kami untuk tumbuh sehat dan ceria dengan senyum yang menawan 😊✨',
  'PUBLISHED', '2025-04-16', '2025-04-18'
),

-- 3. Market Day (MI, Kegiatan Sekolah)
(
  1, 3, 'Admin',
  'Market Day Hardiknas 2025 MI Al Maarif Ngadri',
  'market-day-hardiknas-2025',
  'Market Day penuh kreativitas dan kewirausahaan.',
  E'Dalam rangka memperingati Hari Pendidikan Nasional 2025, MI Al Maarif Ngadri menggelar acara Market Day yang penuh warna pada 2 Mei.\n\nAcara ini menjadi ajang bagi siswa-siswi untuk menampilkan kreativitas mereka melalui berbagai produk hasil karya tangan, mulai dari makanan ringan hingga kerajinan tangan.\n\nSelain sebagai bentuk perayaan, Market Day juga memberikan pengalaman berharga dalam berwirausaha, menggali potensi dan keterampilan bisnis para siswa-siswi.\n\nSeluruh siswa-siswi dengan antusias mengisi stand mereka dengan berbagai barang dagangan yang mereka buat sendiri. Semangat kewirausahaan yang ditunjukkan tidak hanya mencerminkan keterampilan teknis, tetapi juga nilai-nilai inovasi dan kreativitas yang diterapkan dalam kehidupan sehari-hari.\n\nKegiatan ini bukan hanya sekadar ajang jual beli, tetapi juga menjadi sarana bagi siswa-siswi untuk belajar mengenai pentingnya bekerja keras, berkolaborasi, dan mengembangkan jiwa kepemimpinan.',
  'PUBLISHED', '2025-05-02', '2025-05-02'
),

-- 4. Hardiknas (MI, Pendidikan)
(
  1, 4, 'Admin',
  'Hardiknas 2025 di MI Al Maarif Ngadri',
  'hardiknas-mi-al-maarif-ngadri-2025',
  'Peringatan Hardiknas dengan kegiatan positif dan penuh kebersamaan.',
  E'MI Al Maarif Ngadri merayakan Hari Pendidikan Nasional 2025 pada 2 Mei dengan serangkaian kegiatan yang mengedepankan semangat kebersamaan dan penguatan nilai pendidikan.\n\nAcara ini melibatkan seluruh elemen siswa-siswi dan guru dengan kegiatan seperti jalan sehat dan market day, yang membawa pesan tentang kerja keras, sportivitas, dan pentingnya pendidikan dalam kehidupan.\n\nSemangat yang terbangun dalam acara ini diharapkan dapat terus menggugah para siswa-siswi untuk terus belajar, berinovasi, dan menjaga semangat kebersamaan dalam menjalani proses pendidikan.',
  'PUBLISHED', '2025-05-02', '2025-05-03'
),

-- 5. ASAJ (MI, Akademik)
(
  1, 5, 'Admin',
  'ASAJ MI Al Maarif Ngadri 2025',
  'asaj-mi-al-maarif-ngadri-2025',
  'Evaluasi akademik menjelang kelulusan.',
  E'MI Al Maarif Ngadri menggelar Asesmen Sumatif Akhir Jenjang (ASAJ) bagi siswa kelas VI mulai 21 hingga 28 April 2025.\n\nKegiatan ini menjadi bagian penting dalam mengevaluasi capaian belajar selama enam tahun terakhir. Para siswa mengikuti asesmen dengan semangat dan persiapan matang, didampingi guru-guru yang terus memberikan motivasi.\n\nSemoga seluruh proses berjalan lancar dan hasilnya menjadi bekal terbaik menuju jenjang selanjutnya.',
  'PUBLISHED', '2025-04-21', '2025-04-28'
),

-- 6. Halal Bihalal PAUD (PAUD, PAUD)
(
  1, 6, 'Admin',
  'Halal Bihalal PAUD Baitunnaim 2025',
  'halal-bihalal-paud-baitunnaim-2025',
  'Halal bihalal di PAUD penuh canda dan kasih sayang.',
  E'PAUD Baitunnaim menyambut hari pertama masuk sekolah setelah libur Idul Fitri dengan penuh keceriaan.\n\nAnak-anak terlihat antusias dan senang bertemu teman-teman serta guru-guru mereka. Untuk mempererat persaudaraan setelah liburan, PAUD Baitunnaim mengadakan acara halal bihalal yang menghangatkan suasana.\n\nAnak-anak saling bermaaf-maafan dan berbagi cerita seru tentang liburan mereka, sembari menikmati kebersamaan yang menyenangkan.\n\nMelalui kegiatan ini, anak-anak diajarkan tentang nilai-nilai persaudaraan, saling menghormati, dan menjaga hubungan baik sejak dini.',
  'PUBLISHED', '2025-04-10', '2025-04-11'
),

-- 7. Halal Bihalal MI (MI, Kegiatan Sekolah)
(
  1, 3, 'Admin',
  'Suasana Hangat dan Penuh Keceriaan, MI Al Maarif Ngadri Adakan Halal Bihalal Setelah Libur Lebaran',
  'halal-bihalal-mi-al-maarif-ngadri-2025',
  'Setelah libur panjang Idul Fitri, MI Al Maarif Ngadri kembali dengan semangat baru melalui kegiatan halal bihalal di sekolah.',
  E'Hari ini, suasana di MI Al Maarif Ngadri sangat hangat dan penuh keceriaan.\n\nSetelah menikmati libur panjang Idul Fitri, para siswa dan guru kembali ke sekolah dengan semangat yang tinggi.\n\nPada hari pertama masuk sekolah, Senin (14 April 2025), mereka mengadakan acara halal bihalal sebagai bentuk silaturahmi setelah liburan.\n\nDengan kegiatan halal bihalal ini, MI Al Maarif Ngadri berharap agar para siswa bisa memulai kembali hari-hari mereka di sekolah dengan semangat baru.',
  'PUBLISHED', '2025-04-10', '2025-04-11'
),

-- 8. Porseni (MI, Prestasi)
(
  1, 7, 'Admin',
  'MI Al Maarif Ngadri Raih Juara Umum 2 Porseni Kecamatan Binangun 2025',
  'mi-al-maarif-ngadri-juara-umum-2-porseni-binangun-2025',
  'MI Al Maarif Ngadri sukses meraih juara umum 2 di ajang Porseni Kecamatan Binangun 2025 dengan total 32 piala dari berbagai cabang lomba.',
  E'MI Almaarif Ngadri berhasil meraih prestasi gemilang dengan menjadi juara umum 2 pada ajang Porseni Kecamatan Binangun, yang dilaksanakan pada 12 April 2025.\n\nDalam kompetisi yang diikuti oleh berbagai sekolah se-Kecamatan Binangun, MI Almaarif sukses mengumpulkan total 32 piala, mencakup berbagai kategori olahraga dan seni.\n\nKeberhasilan ini tak lepas dari dukungan penuh pihak sekolah, guru, dan para siswa yang tampil maksimal.\n\nDengan prestasi ini, MI Almaarif Ngadri semakin mengukuhkan namanya sebagai sekolah yang berkompeten di bidang pengembangan potensi siswa.',
  'PUBLISHED', '2025-04-10', '2025-04-11'
);


-- Artikel 1: Panggung Kartini → 4 tags
insert into public.post_tag (post_id, tag_id) values
  (1, 1),  -- HariKartini2025
  (1, 2),  -- MIAlMaarifNgadri
  (1, 3),  -- KartiniMasaKini
  (1, 4);  -- LombaKartini

-- Artikel 2: Gigi Sehat → 5 tags
insert into public.post_tag (post_id, tag_id) values
  (2, 5),  -- PAUDPlusBaitunNaim
  (2, 6),  -- SenyumSehatAnakHebat
  (2, 7),  -- PenyuluhanGigi
  (2, 8),  -- PuskesmasBinangun
  (2, 9);  -- AnakCeriaAnakSehat

-- Artikel 3: Market Day → tidak ada hashtag
-- (skip)

-- Artikel 4: Hardiknas → tidak ada hashtag
-- (skip)

-- Artikel 5: ASAJ → 5 tags
insert into public.post_tag (post_id, tag_id) values
  (5, 10),  -- ASAJ2025
  (5, 2),   -- MIAlMaarifNgadri (sudah ada dari artikel 1)
  (5, 11),  -- PendidikanBermakna
  (5, 12),  -- UjianAkhirMadrasah
  (5, 13);  -- GenerasiBerkarakter

-- Artikel 6: Halal Bihalal PAUD → 8 tags
insert into public.post_tag (post_id, tag_id) values
  (6, 14),  -- PAUDBaitunnaim
  (6, 15),  -- KeceriaanAnak
  (6, 16),  -- HalalBihalalPAUD
  (6, 17),  -- KembaliKeSekolah
  (6, 18),  -- SemangatBaru
  (6, 19),  -- PersaudaraanPAUD
  (6, 20),  -- LiburLebaran
  (6, 21);  -- AnakHebatPAUD

-- Artikel 7: Halal Bihalal MI → 10 tags
insert into public.post_tag (post_id, tag_id) values
  (7, 2),   -- MIAlMaarifNgadri
  (7, 22),  -- HalalBihalal
  (7, 17),  -- KembaliKeSekolah
  (7, 18),  -- SemangatBaru
  (7, 23),  -- SilaturahmiIdulFitri
  (7, 24),  -- HariPertamaSekolah
  (7, 25),  -- PersaudaraanSekolah
  (7, 26),  -- KeceriaanSetelahLebaran
  (7, 27),  -- SiswaBerprestasi
  (7, 28);  -- MIAlMaarifNgadriHebat

-- Artikel 8: Porseni → 10 tags
insert into public.post_tag (post_id, tag_id) values
  (8, 29),  -- MIAlmaarifNgadri
  (8, 30),  -- JuaraUmumPorseni
  (8, 31),  -- PorseniBinangun2025
  (8, 32),  -- PrestasiGemilang
  (8, 33),  -- 32Piala
  (8, 34),  -- OlahragaDanSeni
  (8, 35),  -- PendidikanBerkualitas
  (8, 36),  -- SemangatPelajar
  (8, 37),  -- PendidikanHebat
  (8, 38);  -- KreativitasSiswa

-- ============================================================
-- SEED DATA: post_images (hero image untuk tiap artikel)
-- ============================================================
insert into public.post_images (post_id, image_path, is_hero) values
  (1, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/kartini.jpg', false),
  (2, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/gigi.jpg', false),
  (3, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/market.jpg', false),
  (4, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/hariguru.jpg', false),
  (5, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/asat.jpg', false),
  (6, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/hbhtk.jpg', false),
  (7, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/hbhmi.jpg', false),
  (8, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/porseni.jpg', false);
