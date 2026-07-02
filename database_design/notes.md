# NOTE #1 — Domain Architecture

## CHOOSEN

✓ Multi Domain

Domain yang digunakan saat ini:

* SPMB
* PUBLIKASI

Domain yang direncanakan menjadi future refactor:

* LMS

## Reason

Menggunakan satu database dan satu sistem autentikasi untuk beberapa domain aplikasi yang saling terkait.

## Impact

* Membuat tabel `master_domains`
* Membuat tabel `user_roles`
* Authorization harus mempertimbangkan domain
* RLS harus mempertimbangkan domain
* Satu user dapat memiliki role berbeda pada domain yang berbeda

Contoh:

```text
Ahmad
 ├─ VERIFIKATOR @ SPMB
 └─ PUBLIKATOR @ PUBLIKASI
```

# NOTE #2 — Role Architecture

## CHOOSEN

✓ Role-Based Access Control (RBAC)

Role yang digunakan:

- PENDAFTAR
- VERIFIKATOR
- PUBLIKATOR
- ADMINISTRATOR
- SUPERADMIN

## Reason

Setiap jenis pengguna memiliki tanggung jawab dan hak akses yang berbeda.

## Impact

- Membuat tabel `master_roles`
- Authorization berbasis role
- RLS mempertimbangkan role pengguna
- Permission matrix didefinisikan berdasarkan role

# NOTE #3 — Registration Ownership

## CHOOSEN

✓ One Account = Multiple Registrations

Satu akun dapat membuat dan mengelola lebih dari satu pendaftaran.

Contoh:

* Orang tua mendaftarkan beberapa anak
* Wali mendaftarkan lebih dari satu siswa

## Reason

Ownership pendaftaran berada pada akun pendaftar, bukan pada siswa.

## Student Identity

NIK digunakan sebagai identitas utama siswa.

## Additional Rules

* Satu NIK hanya boleh memiliki satu pendaftaran pada tahun ajaran yang sama
* NIK yang sama dapat digunakan kembali pada tahun ajaran yang berbeda

## Impact

* Relasi `profiles -> form_pendaftaran` adalah one-to-many
* `owner_user_id` tidak unique
* Satu akun dapat mengelola beberapa pendaftaran
* Perlu relasi ke `master_tahun_ajaran`
* Perlu mencegah duplikasi pendaftaran berdasarkan kombinasi:

```text
nik + tahun_ajaran
```

* Disarankan menggunakan unique constraint:

```sql
unique (nik, tahun_ajaran_id)
```

# NOTE #4 — Registration Lifecycle

## CHOOSEN

✓ Registration, Payment, dan Admission menggunakan status yang terpisah.

## Reason

Progress pengisian formulir, pembayaran, dan keputusan penerimaan merupakan proses bisnis yang berbeda dan dapat berubah secara independen.

## Registration Status

```text
DRAFT
FINALIZED
```

Digunakan untuk menandai kelengkapan formulir pendaftaran.

## Payment Status

```text
PENDING
SUBMITTED
VERIFIED
REJECTED
```

Digunakan untuk proses pembayaran formulir.

## Admission Status

```text
AWAITING
ACCEPTED
REJECTED
```

Digunakan untuk keputusan akhir pendaftaran.

## Initial Registration Data

Pendaftaran dibuat dengan data awal:

* Tahun Ajaran
* Lembaga
* Kelas (jika diperlukan)
* NIK Siswa
* Nama Siswa
* Jenis Kelamin

## Verification Authority

Pembayaran:

* VERIFIKATOR
* ADMINISTRATOR

Dokumen:

* VERIFIKATOR
* ADMINISTRATOR

Keputusan Pendaftaran:

* ADMINISTRATOR

## Impact

* Membutuhkan status pendaftaran terpisah dari status pembayaran
* Membutuhkan status penerimaan terpisah dari status pembayaran
* Mendukung proses verifikasi dan seleksi di masa depan tanpa perubahan struktur data

```
```

# NOTE #5 — Student & Family Relationship

## CHOOSEN

✓ Data siswa dipisahkan dari formulir pendaftaran.

✓ Data keluarga menggunakan satu tabel dengan tipe relasi.

## Reason

Memisahkan data siswa dari formulir pendaftaran membuat struktur data lebih fleksibel dan mudah dikembangkan.

Penggunaan satu tabel keluarga menghindari duplikasi struktur untuk ayah, ibu, dan wali.

## Family Structure

```text
form_pendaftaran
        │
        ▼
biodata_siswa
        │
        ▼
biodata_keluarga
```

Tipe relasi keluarga:

* AYAH
* IBU
* WALI

## Family Rules

* Data AYAH wajib ada

* Data IBU wajib ada

* Status hidup menggunakan:

  * HIDUP
  * MENINGGAL

* Data WALI bersifat opsional

* Data WALI menjadi wajib apabila:

  * AYAH = MENINGGAL
  * IBU = MENINGGAL

## Address Rules

Alamat disimpan dalam format text.

Alamat siswa dapat berbeda dengan alamat keluarga.

Detail administratif seperti provinsi, kota, kecamatan, dan kelurahan belum dipisahkan dan dapat direfaktor di masa depan apabila diperlukan.

## Residence Information

Informasi tempat tinggal dipisahkan menjadi:

### Tinggal Bersama

Contoh:

* AYAH
* IBU
* AYAH_DAN_IBU
* WALI
* SAUDARA
* ASRAMA
* LAINNYA

### Status Tempat Tinggal

Contoh:

* MILIK_SENDIRI
* KONTRAK
* SEWA
* DINAS
* ASRAMA
* LAINNYA

## Impact

* Membuat tabel `biodata_siswa`
* Membuat tabel `biodata_keluarga`
* Menggunakan `relation_type` untuk membedakan AYAH, IBU, dan WALI
* Membutuhkan validasi keberadaan AYAH dan IBU
* Membutuhkan validasi WALI apabila AYAH dan IBU berstatus MENINGGAL
* Menggunakan `detail_relation_type` untuk mendetailkan WALI
* Membutuhkan master data untuk status tempat tinggal
* Membutuhkan master data untuk tinggal bersama

# NOTE #6 — Document Management

## CHOOSEN

✓ Dokumen dikelola per tipe dokumen.

✓ Verifikasi dilakukan per dokumen.

## Reason

Setiap dokumen memiliki status dan hasil verifikasi yang dapat berbeda.

Pendekatan ini lebih fleksibel untuk kebutuhan saat ini maupun pengembangan di masa depan.

## Document Types

Tipe dokumen dikelola melalui:

* `master_tipe_dokumen`

Administrator dapat menambah tipe dokumen baru apabila diperlukan.

## Upload Rules

* Setiap tipe dokumen hanya memiliki satu file aktif
* Upload ulang akan menggantikan file sebelumnya
* Riwayat file tidak disimpan

## Verification Rules

Verifikasi dilakukan per dokumen.

Contoh:

```text
KK        → VERIFIED
AKTA      → REJECTED
PAS FOTO  → VERIFIED
```

Status dokumen:

* PENDING
* VERIFIED
* REJECTED

## Verification Notes

Verifikator dapat memberikan catatan pada dokumen yang ditolak.

Contoh:

* KK tidak terbaca
* Pas foto buram
* Akta kelahiran terpotong

Catatan digunakan sebagai feedback dan bukan sebagai media komunikasi dua arah.

## Required Documents

Kewajiban dokumen ditentukan berdasarkan konfigurasi tipe dokumen.

Dokumen tertentu dapat ditandai sebagai opsional apabila diperlukan oleh proses bisnis.

Contoh:

* Raport terakhir
* Ijazah terakhir

## Registration Flow

Upload dokumen tidak bergantung pada status pembayaran maupun proses verifikasi lainnya.

Pendaftar dapat mengunggah dokumen setelah mencapai langkah yang sesuai pada proses pendaftaran.

## Impact

* Membuat tabel `master_tipe_dokumen`
* Membuat tabel `dokumen`
* Setiap dokumen memiliki status verifikasi sendiri
* Setiap dokumen memiliki catatan verifikasi sendiri
* Satu tipe dokumen hanya memiliki satu file aktif
* Mendukung dokumen wajib maupun opsional
* Mendukung penambahan tipe dokumen baru tanpa perubahan struktur database

```
```

# NOTE #7 — Payment Flow

## CHOOSEN

✓ Pembayaran dilakukan per pendaftaran.

✓ Pembayaran tidak mengunci proses pengisian formulir.

## Reason

Proses pembayaran dan pengisian data merupakan aktivitas yang dapat berjalan secara independen.

Pendekatan ini memberikan pengalaman pengguna yang lebih baik serta mempermudah proses administrasi.

## Payment Scope

Saat ini sistem hanya mendukung pembayaran formulir pendaftaran.

Namun, struktur database dipersiapkan agar dapat mendukung beberapa jenis pembayaran di masa depan tanpa perubahan besar pada skema.

## Payment Rules

* Satu pendaftaran memiliki satu pembayaran aktif
* Upload ulang bukti pembayaran akan menggantikan file sebelumnya
* Riwayat bukti pembayaran tidak disimpan

## Payment Status

* PENDING
* SUBMITTED
* VERIFIED
* REJECTED

## Verification Authority

Pembayaran dapat diverifikasi oleh:

* VERIFIKATOR
* ADMINISTRATOR

## Payment Data

Data yang disimpan meliputi:

* Jenis pembayaran
* Nominal
* Tanggal transfer
* Bank tujuan
* Nama pengirim
* Bukti pembayaran
* Catatan verifikasi

## Data Rules

* Nominal diisi otomatis oleh sistem
* Tanggal transfer menggunakan waktu upload sebagai nilai awal dan dapat diperbarui oleh administrator apabila diperlukan
* Nama pengirim diinput oleh administrator berdasarkan bukti pembayaran atau mutasi rekening
* Catatan verifikasi digunakan sebagai feedback kepada pendaftar

## Registration Flow

Pendaftar tetap dapat melanjutkan proses pengisian formulir meskipun pembayaran belum diverifikasi.

## Impact

* Membuat tabel `pembayaran`
* Mendukung satu pembayaran aktif untuk setiap pendaftaran
* Menyediakan `payment_type` untuk kebutuhan pengembangan di masa depan
* Menyediakan status pembayaran yang terpisah dari status pendaftaran
* Mendukung proses verifikasi tanpa menghambat alur pengisian formulir

# NOTE #8 — Verification Flow

## CHOOSEN

✓ Verifikasi dipisahkan berdasarkan objek yang diverifikasi.

## Reason

Setiap objek memiliki proses verifikasi, status, dan penanggung jawab yang berbeda.

Pendekatan ini memudahkan penambahan tahapan verifikasi di masa depan tanpa mengubah struktur database.

## Verification Scope

Saat ini sistem mendukung verifikasi terhadap:

* Pembayaran
* Dokumen
* Pendaftaran

Objek lain dapat ditambahkan di masa depan apabila diperlukan.

## Verification Authority

Verifikasi operasional dapat dilakukan oleh:

* VERIFIKATOR
* ADMINISTRATOR

Keputusan akhir pendaftaran dilakukan oleh:

* ADMINISTRATOR

## Verification Principle

Verifikasi tidak menghambat proses pengisian formulir.

Pendaftar tetap dapat melanjutkan proses selama belum melakukan finalisasi.

## Admission Decision

Status keputusan pendaftaran dipisahkan dari status pembayaran maupun status dokumen.

Status yang digunakan:

* AWAITING
* ACCEPTED
* REJECTED

## Impact

* Status pembayaran terpisah dari status dokumen
* Status dokumen dikelola per dokumen
* Status penerimaan dikelola pada pendaftaran
* Mendukung penambahan tahapan verifikasi di masa depan tanpa perubahan struktur database

# NOTE #9 — Audit & Activity Logging

## CHOOSEN

✓ Sistem memisahkan Audit Trail dan Activity Log.

## Reason

Audit Trail digunakan untuk menjaga integritas data, sedangkan Activity Log digunakan untuk mencatat aktivitas pengguna.

Keduanya memiliki tujuan yang berbeda sehingga dipisahkan dalam implementasi.

## Audit Trail

Audit Trail mencatat perubahan data pada tabel yang dipilih.

Informasi yang dicatat meliputi:

* Jenis operasi (INSERT, UPDATE, DELETE)
* Waktu perubahan
* Pengguna yang melakukan perubahan
* Data sebelum perubahan (jika ada)
* Data setelah perubahan (jika ada)

Audit Trail digunakan untuk kebutuhan investigasi, debugging, dan pemulihan informasi.

## Activity Log

Activity Log mencatat aktivitas penting yang dilakukan pengguna.

Contoh aktivitas:

* Login
* Membuat pendaftaran
* Upload dokumen
* Upload bukti pembayaran
* Finalisasi pendaftaran
* Verifikasi pembayaran
* Verifikasi dokumen
* Keputusan pendaftaran

Activity Log digunakan sebagai riwayat aktivitas pengguna dan operasional sistem.

## Logging Principle

* Audit Trail dibuat secara otomatis oleh sistem.
* Activity Log dibuat untuk aktivitas bisnis yang dianggap penting.
* Pengguna tidak dapat mengubah maupun menghapus data log.

## Impact

* Membuat tabel `audit_trail`
* Membuat tabel `activity_logs`
* Audit Trail diisi melalui trigger database
* Activity Log diisi melalui fungsi atau logika aplikasi
* Audit Trail dan Activity Log hanya dapat diakses oleh administrator


## CMS
-  About Us
-  Visi & Misi
-  Sejarah
-  Terms & Conditions
-  Privacy Policy
-  FAQ
-  Kata Mereka / Testimoni
-  Banner
-  Berita
-  Pengumuman
