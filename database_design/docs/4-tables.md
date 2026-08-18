## Tables

### Master Table

Berisi data referensi yang digunakan oleh sistem.

#### Tables

* public.master_lembaga
* public.master_kelas
* public.master_roles
* public.master_step
* public.master_tahun_ajaran
* public.master_tipe_dokumen
* public.master_status_rumah
* public.master_tinggal_bersama
* public.master_categories

---

### User Authority (RBAC)

Mengatur identitas pengguna dan hak akses.

#### Tables

* public.profiles
* public.user_roles

---

### SPMB

Mengelola proses pendaftaran peserta didik.

#### Tables

* public.biodata_siswa
* public.biodata_siswa_detail
* public.biodata_keluarga
* public.pendidikan_siswa_sebelumnya
* public.form_pendaftaran
* public.pembayaran
* public.dokumen

---

### Publikasi

Mengelola konten publikasi berupa artikel, berita, dsb.

#### Tables

* public.tags
* public.posts
* public.post_tag

---

### CMS

Mengelola konfigurasi website utama.

#### Tables

* public.pages
* public.kata_mereka
* public.kerjasama
* public.sosial_media
* public.faq
* public.hero_banners
* public.site_settings

---

### Audit

Digunakan untuk kebutuhan monitoring dan auditing.

#### Tables

* public.audit_trail
* public.activity_logs

---