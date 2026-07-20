-- 1. Tabel-tabel utama
create table if not exists public.tags (
    id bigint generated always as identity primary key,
    label varchar(50) not null unique,
    is_active boolean default true
);

create table if not exists public.posts (
    id bigint generated always as identity primary key,
    lembaga_id smallint references public.master_lembaga(id) on delete set null,
    category_id smallint references public.master_categories(id) on delete set null,
    penulis varchar(255) not null,
    judul varchar(255) not null,
    slug varchar(255) not null unique,
    ringkasan varchar(255),
    content text not null,
    status post_status default 'PUBLISHED',
    is_active boolean default true,
    created_by uuid references public.profiles(id) on delete set null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create table if not exists public.post_tag (
    post_id bigint not null,
    tag_id bigint not null,
    primary key (post_id, tag_id),
    foreign key (post_id) references public.posts(id) on delete cascade,
    foreign key (tag_id) references public.tags(id) on delete cascade
);

create table if not exists public.post_images (
    post_id bigint not null,
    image_path text not null,
    is_hero boolean not null default false,
    primary key (post_id, image_path)
);

create index if not exists idx_posts_lembaga on public.posts(lembaga_id);
create index if not exists idx_posts_category on public.posts(category_id);
create index if not exists idx_posts_status on public.posts(status) where is_active = true;
create index if not exists idx_posts_slug on public.posts(slug);
create index if not exists idx_post_images_hero on public.post_images(post_id) where is_hero = true;

drop trigger if exists trg_posts_updated_at 
on public.posts;

create trigger trg_posts_updated_at
before update on public.posts
for each row 
execute function public.fn_set_updated_at();

drop trigger if exists trg_master_categories_updated_at 
on public.master_categories;


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

-- SEED DATA: posts (8 artikel)
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