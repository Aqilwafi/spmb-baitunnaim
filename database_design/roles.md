# Roles & Access Scope

## Overview

Sistem menggunakan Role-Based Access Control (RBAC) dengan dukungan Domain-Based Access Control.

Hak akses pengguna ditentukan berdasarkan:

1. Role
2. Domain
3. Resource ownership
4. Row Level Security (RLS)

Setiap pengguna dapat memiliki satu atau lebih role pada domain yang berbeda.

---

## Roles

* PENDAFTAR
* VERIFIKATOR
* PUBLIKATOR
* ADMINISTRATOR
* SUPERADMIN

---

## Domain Scope

| Role          | Domain Access    |
| ------------- | ---------------- |
| PENDAFTAR     | SPMB             |
| VERIFIKATOR   | SPMB             |
| PUBLIKATOR    | PUBLIKASI        |
| ADMINISTRATOR | Multiple Domains |
| SUPERADMIN    | All Domains      |

---

## PENDAFTAR

### Description

Akun untuk calon siswa, orang tua,   atau wali yang melakukan proses pendaftaran peserta didik baru.

### Scope

SPMB domain only.

### Responsibilities

* Mengisi formulir pendaftaran
* Mengelola biodata siswa
* Mengelola biodata keluarga
* Mengelola riwayat pendidikan sebelumnya
* Mengunggah dokumen persyaratan
* Mengunggah bukti pembayaran
* Memantau status proses pendaftaran

### Restrictions

* Tidak dapat mengakses data pendaftar lain
* Tidak dapat melakukan verifikasi
* Tidak dapat mengelola master data
* Tidak dapat mengelola pengguna
* Tidak dapat mengakses data audit

---

## VERIFIKATOR

### Description

Petugas yang bertugas melakukan pemeriksaan dan verifikasi data pendaftaran.

### Scope

SPMB domain only.

### Responsibilities

* Memeriksa data pendaftaran
* Memverifikasi dokumen persyaratan
* Memverifikasi pembayaran
* Memantau progres pendaftaran
* Memberikan status verifikasi sesuai prosedur yang berlaku

### Restrictions

* Tidak dapat mengelola master data
* Tidak dapat mengelola pengguna
* Tidak dapat mengubah konfigurasi sistem
* Tidak dapat mengubah role pengguna

---

## PUBLIKATOR

### Description

Petugas yang bertugas mengelola informasi dan publikasi.

### Scope

PUBLIKASI domain only.

### Responsibilities

* Mengelola konten publikasi
* Mengelola informasi penerimaan siswa baru
* Mengelola pengumuman
* Mengelola informasi yang ditampilkan kepada publik

### Restrictions

* Tidak dapat memverifikasi dokumen
* Tidak dapat memverifikasi pembayaran
* Tidak dapat mengelola role pengguna
* Tidak dapat mengubah konfigurasi sistem

---

## ADMINISTRATOR

### Description

Administrator operasional yang memiliki akses lintas domain sesuai penugasan.

### Scope

Multiple domains assigned through `user_roles`.

### Responsibilities

* Mengelola data master
* Mengelola pengguna
* Mengelola role pengguna
* Mengelola data pendaftaran
* Mengelola konfigurasi operasional sistem
* Mengakses activity logs
* Mengakses audit trail

### Restrictions

* Tidak dapat membuat akun SUPERADMIN
* Tidak dapat mengubah role menjadi SUPERADMIN
* Tidak dapat menghapus akun SUPERADMIN
* Tidak dapat mengelola lifecycle akun SUPERADMIN

---

## SUPERADMIN

### Description

Role tertinggi yang memiliki akses penuh terhadap seluruh sistem.

### Scope

All domains.

### Responsibilities

* Full system access
* Mengelola seluruh domain
* Mengelola seluruh pengguna
* Mengelola administrator
* Mengelola konfigurasi platform
* Mengelola kebijakan keamanan sistem

### Restrictions

* Tidak dapat mengelola akun SUPERADMIN lain
* Tidak dapat memberikan role SUPERADMIN melalui fitur aplikasi

---

## Role Hierarchy

```text
SUPERADMIN
      ↓
ADMINISTRATOR

VERIFIKATOR      PUBLIKATOR
      ↓
  PENDAFTAR
```

Catatan:

* Hierarki digunakan untuk menggambarkan tingkat kewenangan secara umum.
* Hak akses tetap ditentukan oleh role assignment dan domain assignment.
* Role yang lebih tinggi tidak selalu mewarisi seluruh hak akses role di bawahnya.

---

## Domain-Based Access Control

Sistem menerapkan kombinasi RBAC dan Domain-Based Access Control.

Struktur relasi:

```text
User
 └─ User Roles
        ├─ Role
        └─ Domain
```

Contoh:

```text
Ahmad
 ├─ VERIFIKATOR @ SPMB
 └─ PUBLIKATOR @ PUBLIKASI
```

atau:

```text
Budi
 ├─ ADMINISTRATOR @ SPMB
 └─ ADMINISTRATOR @ PUBLIKASI
```

Dengan pendekatan ini, seorang pengguna dapat memiliki beberapa role pada domain yang berbeda tanpa perlu membuat akun terpisah.

---

## Notes

Dokumen ini menjelaskan tanggung jawab dan cakupan akses setiap role pada level bisnis.

Implementasi teknis hak akses dilakukan melalui:

* PostgreSQL Functions
* Row Level Security (RLS)
* Database Constraints
* Application Authorization Layer

Detail hak akses per tabel didokumentasikan pada `matrix.md`.
