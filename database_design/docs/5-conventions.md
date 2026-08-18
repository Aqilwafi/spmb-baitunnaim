# Database Conventions

Dokumen ini berisi konvensi yang digunakan selama pengembangan database Website LPI Baitunnaim.

Tujuan utama konvensi ini adalah menjaga konsistensi desain, mempermudah kolaborasi, serta mengurangi keputusan yang harus diulang ketika mengembangkan fitur baru.

---

# General Principles

Semua keputusan desain mengikuti prinsip berikut.

* Prioritaskan kesederhanaan dibanding abstraksi yang belum diperlukan.
* Struktur database mengikuti kebutuhan bisnis, bukan tampilan aplikasi.
* Hindari duplikasi data.
* Setiap data hanya memiliki satu sumber utama (*Single Source of Truth*).
* Refactoring diperbolehkan apabila memberikan manfaat yang nyata.
* Konsistensi lebih penting daripada preferensi pribadi.

---

# Naming Convention

## Tables

* Menggunakan `snake_case`.
* Menggunakan nama yang deskriptif.
* Nama tabel merepresentasikan entitas bisnis.

Contoh:

```text
profiles
user_roles
master_lembaga
form_pendaftaran
audit_trail
```

---

## Primary Key

Seluruh tabel menggunakan:

```text
id
```

dengan tipe UUID.

---

## Foreign Key

Menggunakan pola:

```text
<nama_entitas>_id
```

Contoh:

```text
profile_id
role_id
student_id
post_id
```

---

## Timestamp

Menggunakan nama berikut.

```text
created_at
updated_at
deleted_at
```

Apabila tabel tidak menggunakan soft delete, maka `deleted_at` tidak perlu dibuat.

---

## Boolean

Menggunakan awalan:

```text
is_
has_
```

Contoh:

```text
is_active
is_verified
has_paid
```

---

# Enum vs Master Data

Database membedakan dengan jelas antara Enum dan Master Data.

## Gunakan Enum apabila

* Nilai merupakan bagian dari desain aplikasi.
* Perubahan membutuhkan deployment atau migration.
* Nilai bersifat umum dan hampir tidak berubah.

Contoh:

* Jenis Kelamin
* Agama
* Golongan Darah

---

## Gunakan Master Data apabila

* Nilai merupakan konfigurasi bisnis.
* Administrator dapat mengubah data.
* Perubahan tidak memerlukan migration.

Contoh:

* Tahun Ajaran
* Lembaga
* Kelas
* Step Pendaftaran
* Tipe Dokumen
* Kategori

---

# Business Modeling

Database dimodelkan berdasarkan domain bisnis.

Setiap domain memiliki satu entitas utama (*aggregate root*).

| Domain      | Aggregate Root         |
| ----------- | ---------------------- |
| Authority   | User                   |
| Master Data | Business Configuration |
| CMS         | Website Configuration  |
| Publikasi   | Content                |
| SPMB        | Student                |
| System      | Audit Event            |

Domain tidak boleh saling mengambil alih tanggung jawab domain lain.

---

# Relationship Rules

* Hindari relasi yang tidak diperlukan.
* Hindari circular dependency.
* Gunakan tabel penghubung (*junction table*) untuk relasi many-to-many.
* Hindari penyimpanan data yang dapat dihitung ulang.

---

# Profiles

Seluruh domain bisnis menggunakan `profiles` sebagai representasi pengguna.

Jangan membuat relasi langsung ke `auth.users`.

`auth.users` diperlakukan sebagai penyedia autentikasi (*Identity Provider*), sedangkan `profiles` menjadi representasi pengguna di dalam sistem.

Pendekatan ini menjaga database tetap independen terhadap penyedia autentikasi yang digunakan.

---

# Soft Delete

Soft delete hanya digunakan apabila data memiliki nilai historis atau berpotensi dipulihkan.

Apabila data tidak memiliki kebutuhan historis, gunakan hard delete.

Kolom yang digunakan:

```text
deleted_at
```

Dokumen mengenai strategi soft delete dijelaskan lebih lanjut pada `soft-delete.md`.

---

# Audit

Audit digunakan untuk mencatat perubahan penting pada sistem.

Audit bukan pengganti data operasional.

Pisahkan dengan jelas antara:

* Current State
* Historical Event

Contoh:

`user_roles` menyimpan role yang dimiliki pengguna saat ini.

Riwayat perubahan role dicatat melalui Audit Trail.

---

# Views

Gunakan View apabila:

* Query digunakan berulang kali.
* Menyederhanakan query aplikasi.
* Tidak mengubah data.

View tidak boleh digunakan untuk menyimpan logika bisnis yang kompleks.

---

# PostgreSQL Functions

Gunakan PostgreSQL Function apabila:

* Logika digunakan oleh lebih dari satu aplikasi.
* Berkaitan dengan validasi data.
* Berkaitan dengan keamanan.
* Berkaitan dengan proses bisnis yang harus konsisten.

Hindari membuat Function untuk logika yang hanya digunakan oleh satu halaman aplikasi.

---

# Row Level Security

Semua tabel bisnis yang diakses aplikasi harus menggunakan Row Level Security (RLS).

Policy dibuat berdasarkan kebutuhan bisnis, bukan berdasarkan halaman aplikasi.

Apabila validasi mulai kompleks, pindahkan logika ke PostgreSQL Function agar policy tetap mudah dibaca.

---

# Future-Proofing

Database tidak dirancang untuk mengantisipasi seluruh kemungkinan masa depan.

Apabila kebutuhan baru muncul:

1. Analisis kembali kebutuhan bisnis.
2. Gunakan struktur yang paling sederhana.
3. Izin refactor.

Jangan membuat abstraksi hanya karena kemungkinan akan digunakan di masa mendatang.

---

# Documentation

Setiap perubahan besar pada struktur database sebaiknya diikuti dengan pembaruan dokumentasi.

Dokumentasi merupakan bagian dari proses pengembangan, bukan pekerjaan setelah implementasi selesai.
