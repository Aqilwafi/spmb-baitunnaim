# Design Philosophy

Dokumen ini menjelaskan prinsip-prinsip yang digunakan dalam merancang database Website LPI Baitunnaim.

Prinsip-prinsip berikut menjadi pedoman dalam mengambil keputusan desain, sehingga perubahan maupun pengembangan fitur di masa mendatang tetap mengikuti arah arsitektur yang sama.

---

# Keep It Simple

Database dirancang untuk menyelesaikan kebutuhan bisnis saat ini tanpa menambahkan kompleksitas yang belum diperlukan.

Fitur, abstraksi, maupun struktur tambahan hanya dibuat apabila benar-benar memberikan nilai terhadap kebutuhan operasional sistem.

Apabila di masa mendatang kebutuhan berubah secara signifikan, maka refactoring lebih diutamakan dibanding mempertahankan desain yang terlalu kompleks sejak awal.

---

# Design for Refactoring

Perubahan arsitektur dianggap sebagai bagian alami dari siklus pengembangan.

Beberapa bagian sistem sengaja dibuat lebih sederhana karena mempertimbangkan:

* Skala yayasan
* Volume data
* Jumlah pengguna
* Trafik aplikasi

Apabila kebutuhan berkembang, struktur database dapat direstrukturisasi tanpa mengubah filosofi dasar sistem.

Database tidak didesain untuk mengantisipasi seluruh kemungkinan masa depan, tetapi dirancang agar mudah berkembang ketika kebutuhan tersebut benar-benar muncul.

---

# Domain-Oriented Design

Database dibagi berdasarkan domain bisnis, bukan berdasarkan aplikasi.

Setiap domain memiliki tanggung jawab yang jelas dan hanya mengelola data yang menjadi miliknya.

Saat ini domain utama terdiri dari:

* Authority
* Master Data
* CMS
* Publikasi
* SPMB
* System

Pemisahan domain bertujuan menjaga batas tanggung jawab setiap modul sehingga perubahan pada satu domain tidak berdampak langsung terhadap domain lainnya.

---

# Single Source of Truth

Setiap informasi hanya memiliki satu sumber utama.

Contohnya:

* Data akun hanya berada pada Authority.
* Data siswa hanya berada pada SPMB.
* Konten publik hanya berada pada Publikasi.
* Konfigurasi website hanya berada pada CMS.
* Data referensi bisnis hanya berada pada Master Data.

Pendekatan ini mengurangi duplikasi data dan menjaga konsistensi antar modul.

---

# Business-Centric Modeling

Struktur database mengikuti kebutuhan bisnis, bukan mengikuti tampilan antarmuka aplikasi.

Model data dibangun berdasarkan entitas yang memiliki umur panjang dalam proses bisnis.

Contohnya:

* Authority berpusat pada **User**.
* Publikasi berpusat pada **Content**.
* SPMB berpusat pada **Student**.
* CMS berpusat pada **Website Configuration**.
* System berpusat pada **Audit Event**.

Dengan pendekatan ini, perubahan pada antarmuka aplikasi tidak harus diikuti perubahan struktur database.

---

# Student-Centric Registration

Domain SPMB menggunakan pendekatan **student-centric**.

Siswa diperlakukan sebagai entitas utama yang dapat melakukan lebih dari satu proses pendaftaran sepanjang siklus pendidikannya.

Setiap proses pendaftaran dianggap sebagai transaksi bisnis yang melekat pada data siswa, bukan sebagai pemilik seluruh informasi siswa.

Pendekatan ini memungkinkan penggunaan kembali biodata ketika siswa melanjutkan ke jenjang berikutnya tanpa harus mengisi ulang seluruh formulir.

---

# Content-Centric Publication

Seluruh materi publik diperlakukan sebagai **content**.

Artikel, berita, pengumuman, maupun bentuk publikasi lainnya merupakan variasi dari konsep yang sama dan dibedakan melalui metadata seperti kategori, tag, atau atribut lainnya.

Pendekatan ini menjaga model data tetap sederhana dan fleksibel terhadap penambahan jenis publikasi baru.

---

# Configuration over Customization

Konfigurasi hanya dipindahkan ke database apabila memberikan nilai bagi kebutuhan operasional.

Konten seperti Hero Banner, FAQ, halaman profil, maupun konfigurasi website dikelola melalui CMS karena memang menjadi kebutuhan administrator.

Sebaliknya, perilaku aplikasi yang tidak memberikan manfaat apabila dikonfigurasi tetap diimplementasikan pada kode aplikasi agar sistem tetap sederhana dan mudah dipelihara.

---

# Business Configuration vs Application Constants

Database membedakan dengan jelas antara **Business Configuration** dan **Application Constants**.

## Business Configuration

Data yang dapat berubah mengikuti kebutuhan operasional yayasan disimpan sebagai **Master Data**.

Perubahannya dilakukan melalui aplikasi tanpa memerlukan perubahan skema database.

Contohnya:

* Tahun Ajaran
* Lembaga
* Kelas
* Step Pendaftaran
* Tipe Dokumen
* Kategori Konten

## Application Constants

Nilai yang merupakan bagian dari desain aplikasi disimpan sebagai **Enum**.

Perubahannya memerlukan migration karena dapat memengaruhi perilaku sistem.

Contohnya:

* Jenis Kelamin
* Agama
* Golongan Darah
* Nilai tetap lainnya yang bersifat umum dan tidak dikendalikan oleh proses bisnis.

---

# Security First

Keamanan menjadi bagian dari desain database, bukan hanya tanggung jawab aplikasi.

Seluruh akses data dirancang untuk menggunakan:

* Supabase Authentication
* PostgreSQL Functions
* Row Level Security (RLS)
* Role-Based Access Control (RBAC)

Validasi dilakukan sedekat mungkin dengan data agar aturan keamanan tetap konsisten meskipun terdapat lebih dari satu aplikasi yang mengakses database.

---

# Audit Everything Important

Perubahan penting harus dapat ditelusuri.

Aktivitas seperti perubahan data, proses administrasi, maupun tindakan pengguna dicatat sebagai bagian dari mekanisme audit.

Pencatatan dilakukan secara bertahap sesuai kebutuhan sistem, dengan tujuan menyediakan riwayat aktivitas yang dapat digunakan untuk monitoring, troubleshooting, maupun pengembangan fitur auditing di masa mendatang.

---

# Prefer Clarity Over Cleverness

Kejelasan struktur lebih diutamakan dibanding optimasi atau abstraksi yang berlebihan.

Nama tabel, fungsi, maupun relasi dibuat agar mudah dipahami oleh developer lain.

Ketika terdapat pilihan antara desain yang lebih kompleks atau desain yang lebih sederhana dengan hasil yang sama, maka desain yang lebih sederhana lebih diutamakan.

---

# Evolution Over Prediction

Arsitektur tidak berusaha memprediksi seluruh kebutuhan masa depan.

Sebaliknya, sistem dikembangkan berdasarkan kebutuhan nyata yang telah tervalidasi.

Fitur atau abstraksi baru ditambahkan ketika memang memberikan manfaat yang jelas terhadap proses bisnis.

Pendekatan ini menjaga database tetap sederhana, mudah dipahami, dan siap berevolusi seiring berkembangnya kebutuhan yayasan.
