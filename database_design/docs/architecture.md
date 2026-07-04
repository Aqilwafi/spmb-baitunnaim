# Database Architecture

## Purpose

Database ini dirancang sebagai **single source of truth** untuk seluruh ekosistem digital Yayasan LPI Baitunnaim.

Satu database digunakan secara bersama oleh beberapa aplikasi yang berada dalam satu monorepo, yaitu:

* **Website** — Menyediakan informasi publik seperti profil yayasan, profil lembaga, artikel, berita, publikasi, dan halaman statis.
* **SPMB** — Menangani proses penerimaan peserta didik baru, mulai dari registrasi akun hingga proses seleksi.
* **Admin Panel** — Digunakan untuk mengelola pengguna, konten website, publikasi, master data, serta administrasi SPMB.

Alih-alih memisahkan database berdasarkan aplikasi, seluruh data disimpan dalam satu database yang dibagi menjadi beberapa **business domain**. Setiap aplikasi hanya mengakses domain yang diperlukan melalui kombinasi **Supabase Authentication**, **Row Level Security (RLS)**, dan **Role-Based Access Control (RBAC)**.

Database ini dirancang untuk mendukung kebutuhan **yayasan multi-lembaga**, sehingga setiap lembaga di bawah yayasan dapat menggunakan infrastruktur database yang sama tanpa memerlukan pemisahan database.

Implementasi saat ini tetap mempertimbangkan skala sistem yang relatif kecil. Beberapa bagian skema sengaja dibuat lebih sederhana untuk mengurangi kompleksitas, namun tetap mempertahankan struktur yang memungkinkan proses refactoring ketika kebutuhan bisnis maupun volume data meningkat di masa mendatang.

---

# System Architecture

Seluruh aplikasi menggunakan satu database PostgreSQL sebagai pusat data.

```text
                     Users
                       │
      ┌────────────────┼────────────────┐
      │                │                │
      ▼                ▼                ▼
  Website            SPMB         Admin Panel
      │                │                │
      └────────────────┼────────────────┘
                       ▼
             Supabase PostgreSQL
```

Masing-masing aplikasi memiliki tanggung jawab yang berbeda, tetapi seluruh data berasal dari database yang sama.

---

# Database Architecture

Database dibagi ke dalam beberapa domain yang memiliki tanggung jawab berbeda.

```text
                      Authority
                          │
                    Master Data
        ┌─────────────────┼─────────────────┐
        ▼                 ▼                 ▼
       CMS          Publikasi            SPMB
        │                 │                 │
        └─────────────────┼─────────────────┘
                          ▼
                 Audit & Activity Log
```

Arsitektur ini memisahkan **Core Domain**, **Business Domain**, dan **Cross-Cutting Domain** sehingga setiap bagian memiliki tanggung jawab yang jelas.

---

# Core Domains

Core Domain merupakan fondasi yang digunakan oleh seluruh modul dalam sistem.

## Authority

Mengelola identitas pengguna serta hak akses.

Tanggung jawab:

* Profil pengguna
* Role pengguna
* Domain akses
* Autentikasi
* Otorisasi

Seluruh business domain bergantung pada Authority untuk menentukan siapa yang dapat mengakses suatu data.

---

## Master Data

Menyediakan data referensi yang digunakan bersama oleh seluruh sistem.

Contohnya meliputi:

* Lembaga
* Tahun Ajaran
* Role
* Kelas
* Step Pendaftaran
* Tipe Dokumen
* Kategori
* Data referensi lainnya

Master Data menjadi satu-satunya sumber data referensi (single source of truth) yang digunakan oleh seluruh business domain.

---

# Business Domains

Business Domain berisi proses bisnis utama aplikasi.

Masing-masing domain memiliki tanggung jawab yang spesifik dan diusahakan tetap independen satu sama lain.

## CMS

Mengelola konfigurasi dan konten statis website.

Contoh:

* Hero Banner
* Halaman Profil
* Tentang Kami
* FAQ
* Kata Mereka
* Kerjasama
* Site Settings

CMS berfokus pada **bagaimana website ditampilkan**, bukan pada konten publikasi.

---

## Publikasi

Mengelola seluruh konten yang dipublikasikan kepada publik.

Contoh:

* Artikel
* Berita
* Pengumuman
* Tag
* Kategori

Setiap konten publikasi dapat dimiliki atau diterbitkan oleh lembaga yang berbeda sehingga seluruh lembaga dalam yayasan dapat mengelola publikasinya masing-masing.

Publikasi berfokus pada **isi konten**, bukan konfigurasi website.

---

## SPMB

Mengelola seluruh proses penerimaan peserta didik baru.

Domain ini mencakup seluruh alur mulai dari registrasi hingga keputusan akhir.

Contohnya meliputi:

* Form Pendaftaran
* Biodata Siswa
* Biodata Keluarga
* Pendidikan Sebelumnya
* Dokumen
* Pembayaran

Implementasi saat ini mengutamakan kesederhanaan struktur untuk memenuhi kebutuhan operasional yayasan dengan skala trafik yang masih relatif kecil. Struktur tersebut tetap dirancang agar dapat direfactor menjadi modul yang lebih terpisah apabila kebutuhan sistem berkembang.

---

# Cross-Cutting Domain

## Audit & Activity Log

Audit dan Activity Log bukan merupakan business domain.

Modul ini bertugas mencatat seluruh aktivitas penting yang terjadi di dalam sistem.

Contoh aktivitas yang dicatat:

* Login pengguna
* Perubahan data
* Persetujuan
* Penghapusan data
* Perubahan status
* Aktivitas administratif lainnya

Pendekatan ini memastikan setiap perubahan penting dapat ditelusuri kembali sebagai bagian dari proses auditing dan monitoring sistem.

---

# Domain Dependency

Database menerapkan ketergantungan domain sebagai berikut.

```text
Authority
      │
      ▼
Master Data
      │
      ├───────────┬────────────┐
      ▼           ▼            ▼
     CMS     Publikasi      SPMB
      │           │            │
      └───────────┴────────────┘
                  ▼
         Audit & Activity Log
```

Prinsip yang digunakan:

* Authority menjadi fondasi autentikasi dan otorisasi.
* Master Data menjadi sumber referensi bersama.
* Business Domain tidak saling bergantung secara langsung.
* Audit & Activity Log menerima pencatatan aktivitas dari seluruh domain.

---

# Security Architecture

Keamanan database dibangun menggunakan beberapa lapisan.

```text
Client
    │
    ▼
Supabase Authentication
    │
    ▼
Row Level Security (RLS)
    │
    ▼
PostgreSQL Functions
    │
    ▼
Database Tables
```

Pendekatan ini memastikan bahwa validasi akses dilakukan di tingkat database sehingga tidak bergantung sepenuhnya pada aplikasi.

---

# Design Principles

Arsitektur database mengikuti prinsip-prinsip berikut.

* Single Source of Truth
* Domain-Oriented Design
* Shared Database Architecture
* Security First
* Least Privilege Access
* Modular Business Domains
* Supabase Native
* Maintainable & Scalable Schema
* Refactor-Friendly Design
