# Database Modules

Dokumen ini menjelaskan pembagian modul pada database Website LPI Baitunnaim beserta tanggung jawab masing-masing.

Modularisasi dilakukan berdasarkan **domain bisnis**, sehingga setiap modul memiliki batas tanggung jawab (responsibility) yang jelas serta meminimalkan keterkaitan antar domain.

---

# Module Overview

Saat ini database dibagi menjadi enam modul utama.

| Module      | Responsibility                                               |
| ----------- | ------------------------------------------------------------ |
| Authority   | Mengelola identitas pengguna dan hak akses.                  |
| Master Data | Menyediakan konfigurasi bisnis dan data referensi.           |
| CMS         | Mengelola konfigurasi dan konten statis website.             |
| Publikasi   | Mengelola seluruh konten publik yang diterbitkan.            |
| SPMB        | Mengelola proses penerimaan peserta didik baru.              |
| System      | Menyediakan fasilitas audit dan pencatatan aktivitas sistem. |

---

# Authority

## Overview

Authority merupakan pintu masuk seluruh sistem.

Modul ini bertanggung jawab mengelola identitas pengguna serta hak akses yang dimiliki setiap akun.

Authority tidak menyimpan data bisnis. Modul ini hanya menentukan **siapa pengguna** dan **hak akses apa yang dimilikinya**.

---

## Responsibilities

* Sinkronisasi identitas pengguna dari Supabase Authentication.
* Menyimpan representasi pengguna di dalam sistem.
* Mengelola role pengguna.
* Menyediakan informasi otorisasi untuk modul lain.

---

## Design Philosophy

Authority bersifat **identity-centric**, bukan **business-centric**.

Data seperti siswa, guru, operator, editor, maupun administrator bukan merupakan bagian dari Authority. Informasi tersebut baru memiliki makna pada domain bisnis yang menggunakannya.

Pendekatan ini menjaga agar modul autentikasi tetap independen terhadap proses bisnis aplikasi.

---

## Core Entities

* `profiles`
* `user_roles`
* `master_roles`

`profiles` menjadi representasi utama pengguna di dalam sistem.

Walaupun autentikasi saat ini menggunakan Supabase Authentication, seluruh relasi antar modul mengacu kepada `profiles` sehingga database tidak bergantung langsung pada penyedia autentikasi tertentu.

`user_roles` menyimpan kondisi hak akses pengguna saat ini (current state), sedangkan riwayat perubahan hak akses dicatat melalui mekanisme audit.

---

## Interaction with Other Modules

Authority digunakan oleh seluruh business domain sebagai sumber identitas pengguna.

Tidak ada modul bisnis yang menjadi bagian dari Authority.

---

# Master Data

## Overview

Master Data menyediakan seluruh konfigurasi bisnis dan data referensi yang digunakan bersama oleh berbagai domain.

Master Data menjadi **single source of truth** untuk seluruh konfigurasi operasional yayasan.

---

## Responsibilities

* Menyimpan konfigurasi bisnis.
* Menyediakan data referensi.
* Mengurangi duplikasi konfigurasi antar modul.

---

## Design Philosophy

Master Data merepresentasikan kebutuhan bisnis yang dapat berubah tanpa memerlukan perubahan struktur database.

Administrator dapat mengubah data melalui aplikasi sesuai kebutuhan operasional.

Master Data berbeda dengan Enum.

Enum merupakan bagian dari desain aplikasi dan hanya berubah melalui migration, sedangkan Master Data merupakan bagian dari konfigurasi bisnis yang dapat berubah sewaktu-waktu sesuai kebijakan yayasan.

---

## Core Entities

Contohnya meliputi:

* Lembaga
* Kelas
* Tahun Ajaran
* Step Pendaftaran
* Tipe Dokumen
* Kategori
* Data referensi bisnis lainnya

---

## Interaction with Other Modules

Master Data digunakan oleh:

* CMS
* Publikasi
* SPMB

Authority hanya menggunakan Master Data apabila berkaitan dengan konfigurasi akses.

---

# CMS

## Overview

CMS mengelola konfigurasi website serta konten yang bersifat relatif statis.

Modul ini berfokus pada bagaimana website ditampilkan kepada pengunjung.

---

## Responsibilities

* Hero Banner
* Pages
* FAQ
* Kata Mereka
* Kerjasama
* Site Settings
* Konfigurasi website lainnya

---

## Design Philosophy

CMS bersifat **configuration-centric**.

Tidak seluruh perilaku website harus dapat dikonfigurasi melalui database.

Konfigurasi hanya dipindahkan ke database apabila memberikan nilai bagi administrator.

Apabila suatu kebutuhan lebih sederhana diselesaikan melalui kode aplikasi, maka solusi tersebut tetap dipertahankan untuk menjaga kompleksitas sistem tetap rendah.

---

## Core Entities

* `pages`
* `hero_banners`
* `faq`
* `kata_mereka`
* `kerjasama`
* `site_settings`
* dan entitas konfigurasi website lainnya.

---

## Interaction with Other Modules

CMS dapat menggunakan Master Data sebagai referensi konfigurasi.

CMS tidak bergantung pada modul Publikasi maupun SPMB.

---

# Publikasi

## Overview

Publikasi mengelola seluruh konten yang diterbitkan kepada publik.

Seluruh bentuk publikasi diperlakukan sebagai satu konsep yang sama, yaitu **content**.

---

## Responsibilities

* Artikel
* Berita
* Pengumuman
* Konten publik lainnya

---

## Design Philosophy

Publikasi bersifat **content-centric**.

Perbedaan antara artikel, berita, maupun bentuk publikasi lainnya tidak direpresentasikan sebagai tabel yang berbeda.

Seluruhnya dianggap sebagai content dan dibedakan melalui metadata seperti kategori, tag, maupun atribut lainnya.

Pendekatan ini menjaga struktur database tetap sederhana serta mempermudah penambahan jenis publikasi baru.

---

## Core Entities

* `posts`
* `tags`
* `post_tag`

---

## Interaction with Other Modules

Publikasi menggunakan Master Data sebagai referensi apabila diperlukan.

Publikasi tidak bergantung pada domain SPMB maupun CMS.

---

# SPMB

## Overview

SPMB mengelola seluruh proses penerimaan peserta didik baru.

Berbeda dengan pendekatan yang berpusat pada formulir pendaftaran, domain ini menggunakan pendekatan **student-centric**.

---

## Responsibilities

* Biodata siswa
* Biodata keluarga
* Riwayat pendidikan
* Formulir pendaftaran
* Dokumen
* Pembayaran

---

## Design Philosophy

Siswa merupakan entitas utama yang memiliki umur panjang di dalam sistem.

Setiap proses pendaftaran diperlakukan sebagai transaksi bisnis yang melekat pada siswa tersebut.

Pendekatan ini memungkinkan data siswa digunakan kembali ketika melakukan pendaftaran pada jenjang berikutnya tanpa harus mengisi ulang seluruh informasi dari awal.

Struktur saat ini sengaja dibuat sederhana untuk memenuhi kebutuhan operasional yayasan dengan skala yang masih relatif kecil, namun tetap mempertimbangkan kemungkinan refactoring apabila sistem berkembang di masa mendatang.

---

## Core Entities

* `biodata_siswa`
* `biodata_keluarga`
* `pendidikan_siswa_sebelumnya`
* `form_pendaftaran`
* `dokumen`
* `pembayaran`

---

## Interaction with Other Modules

SPMB menggunakan:

* Authority untuk identitas pengguna.
* Master Data sebagai referensi konfigurasi proses bisnis.

SPMB tidak bergantung pada CMS maupun Publikasi.

---

# System

## Overview

System menyediakan fasilitas pencatatan aktivitas yang terjadi di seluruh sistem.

Modul ini bukan merupakan domain bisnis.

---

## Responsibilities

* Audit Trail
* Activity Log

---

## Design Philosophy

System bersifat **event-centric**.

Fokus utama modul ini adalah mencatat aktivitas penting yang terjadi pada domain lain.

Pencatatan dilakukan secara bertahap sesuai kebutuhan sistem dan menjadi fondasi bagi proses monitoring, troubleshooting, maupun audit di masa mendatang.

---

## Core Entities

* `audit_trail`
* `activity_logs`

---

## Interaction with Other Modules

System menerima informasi aktivitas dari:

* Authority
* CMS
* Publikasi
* SPMB

System tidak menjadi dependensi logika bisnis bagi modul lain.

---

# Module Dependency

Hubungan antar modul mengikuti prinsip berikut.

```text
Authority
      │
      ▼
Master Data
      │
 ┌────┼─────┐
 ▼    ▼     ▼
CMS  Publikasi  SPMB
  \     |     /
   \    |    /
    ▼   ▼   ▼
      System
```

Business Domain saling independen.

Seluruh modul berbagi identitas melalui Authority, menggunakan konfigurasi bersama melalui Master Data, dan mencatat aktivitas ke dalam System.

Dengan pendekatan ini, setiap domain dapat berkembang secara mandiri tanpa meningkatkan ketergantungan antar modul secara berlebihan.
