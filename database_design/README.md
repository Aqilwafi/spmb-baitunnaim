# Database Design

> Status: **Work in Progress** — skema database masih dalam tahap pengembangan dan dapat berubah mengikuti kebutuhan bisnis maupun implementasi aplikasi.

## Overview

Repository ini berisi desain database, fungsi PostgreSQL, Row Level Security (RLS), views, dan dokumentasi pendukung untuk sistem **Penerimaan Peserta Didik Baru (PPDB)** berbasis Supabase.

Fokus utama sistem:

* Multi-role access control
* Multi-domain / multi-lembaga
* Pendaftaran siswa secara bertahap (step-by-step)
* Validasi data siswa, orang tua, dan wali
* Upload dokumen persyaratan
* Audit trail dan activity logging
* Keamanan berbasis Row Level Security (RLS)

Database dirancang dengan prinsip:

* Data consistency
* Security first
* Scalability
* Maintainability
* Supabase friendly

---

## High-Level Architecture

```text
auth.users
    │
    ▼
profiles
    │
    ▼
user_roles
    │
    ▼
master_roles

master_domains
master_lembaga
master_kelas
master_tahun_ajaran
master_step
master_tipe_dokumen
master_status_rumah
master_tinggal_bersama

form_pendaftaran
    │
    ├── biodata_siswa
    ├── biodata_keluarga
    ├── pendidikan_siswa_sebelumnya
    ├── pembayaran
    └── dokumen

audit_trail
activity_logs
```

---

## Database Modules

### Master Data

Berisi data referensi yang digunakan oleh sistem.

#### Tables

* master_domains
* master_lembaga
* master_kelas
* master_roles
* master_step
* master_tahun_ajaran
* master_tipe_dokumen
* master_status_rumah
* master_tinggal_bersama

---

### Access Control

Mengatur identitas pengguna dan hak akses.

#### Tables

* profiles
* user_roles

#### Features

* Role Based Access Control (RBAC)
* Domain Based Access Control
* Multi-role support
* Permission validation melalui PostgreSQL Function

---

### Registration

Mengelola proses pendaftaran peserta didik.

#### Tables

* form_pendaftaran
* biodata_siswa
* biodata_keluarga
* pendidikan_siswa_sebelumnya
* pembayaran
* dokumen

---

### System

Digunakan untuk kebutuhan monitoring dan auditing.

#### Tables

* audit_trail
* activity_logs

---

## Security Architecture

Keamanan database menggunakan kombinasi:

### Row Level Security (RLS)

Setiap tabel bisnis memiliki policy yang membatasi akses berdasarkan:

* User
* Role
* Domain
* Kepemilikan data

Folder:

```text
rls/
```

---

### Database Functions

Business logic ditempatkan pada PostgreSQL Function.

Folder:

```text
functions/
```

Kategori:

#### Auth

```text
functions/auth
```

Fungsi yang berhubungan dengan sinkronisasi user Supabase dan profile.

#### Bisnis

```text
functions/bisnis
```

Fungsi validasi dan aturan bisnis aplikasi.

#### System

```text
functions/system
```

Fungsi untuk:

* Audit
* Activity logging
* Role checking
* Updated timestamp
* Role mutation

---

## Views

Database menyediakan beberapa view untuk mempermudah query aplikasi.

Folder:

```text
views/
```

#### Views

* form_pendaftaran_view
* pendidikan_siswa_sebelumnya_view

---

## Repository Structure

```text
.
├── functions/
│   ├── auth/
│   ├── bisnis/
│   └── system/
│
├── table/
│   ├── lookup_table.sql
│   ├── main_table.sql
│   ├── role_domain_table.sql
│   ├── audit_log_table.sql
│   ├── insert.sql
│   └── indexing.sql
│
├── rls/
│   ├── authority/
│   ├── bisnis/
│   ├── master/
│   └── system/
│
├── views/
│
├── other/
│
├── simpan/
│
├── roles.md
├── matrix.md
└── README.md
```

---

## Deployment Order

Disarankan menjalankan script dengan urutan berikut:

### 1. Extensions & Types

```text
other/
```

* extension.sql
* enums_type.sql

### 2. Tables

```text
table/
```

Urutan umum:

```text
lookup_table.sql
role_domain_table.sql
main_table.sql
audit_log_table.sql
indexing.sql
insert.sql
```

### 3. Functions

```text
functions/
```

### 4. Views

```text
views/
```

### 5. Row Level Security

```text
rls/
```

---

## Documentation

### Role Definition

```text
roles.md
```

Berisi definisi seluruh role yang digunakan sistem.

---

### Permission Matrix

```text
matrix.md
```

Berisi matriks hak akses untuk setiap role terhadap fitur dan data aplikasi.

---

## Future Work

### Database

* Permission table driven RBAC
* Dynamic permission engine
* Approval workflow
* Notification trigger
* Background jobs
* Data archival strategy

### Application

* Dashboard analytics
* Payment gateway integration
* Email notification
* WhatsApp notification
* Reporting system

---

## Notes

Folder `simpan/` digunakan sebagai area arsip, eksperimen, backup, dan referensi desain lama yang tidak digunakan langsung oleh deployment utama.
