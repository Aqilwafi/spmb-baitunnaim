# Database Security

Dokumen ini menjelaskan arsitektur keamanan database Website LPI Baitunnaim.

Keamanan merupakan bagian dari desain database dan tidak hanya bergantung pada aplikasi yang mengaksesnya.

Seluruh mekanisme keamanan dirancang agar tetap konsisten meskipun terdapat lebih dari satu aplikasi atau layanan yang menggunakan database yang sama.

---

# Security Principles

Database dibangun berdasarkan prinsip berikut.

* Authentication terpisah dari Authorization.
* Seluruh akses divalidasi sedekat mungkin dengan data.
* Default access adalah **deny**.
* Hak akses diberikan secara eksplisit.
* Logika keamanan dipusatkan di database.
* Audit dilakukan terhadap aktivitas penting.

---

# Security Layers

Keamanan terdiri dari beberapa lapisan.

```text
Client
    │
    ▼
Supabase Authentication
    │
    ▼
profiles
    │
    ▼
Role-Based Access Control
    │
    ▼
PostgreSQL Function
    │
    ▼
Row Level Security
    │
    ▼
Database
```

Setiap lapisan memiliki tanggung jawab yang berbeda.

---

# Authentication

Autentikasi menggunakan Supabase Authentication.

Database tidak menggunakan `auth.users` sebagai representasi utama pengguna.

Sebagai gantinya, seluruh domain bisnis menggunakan tabel `profiles`.

Pendekatan ini menjaga database tetap independen terhadap penyedia autentikasi yang digunakan.

---

# Authorization

Hak akses ditentukan menggunakan Role-Based Access Control (RBAC).

Satu pengguna dapat memiliki lebih dari satu role.

Role merepresentasikan hak akses yang dimiliki pengguna pada kondisi saat ini.

Riwayat perubahan role tidak disimpan pada tabel role, melainkan dicatat melalui mekanisme audit.

---

# Row Level Security

Seluruh tabel bisnis yang diakses aplikasi menggunakan Row Level Security (RLS).

Policy menjadi lapisan keamanan terakhir sebelum data diakses.

Aplikasi tidak boleh bergantung pada validasi di sisi client.

---

# PostgreSQL Functions

Policy RLS diusahakan tetap sederhana.

Apabila logika mulai kompleks, validasi dipindahkan ke PostgreSQL Function.

Keuntungan pendekatan ini:

* Policy lebih mudah dibaca.
* Logika dapat digunakan ulang.
* Perubahan aturan bisnis hanya dilakukan pada satu tempat.
* Mengurangi duplikasi policy.

Function menjadi pusat validasi hak akses maupun aturan bisnis yang digunakan oleh RLS.

---

# Security Responsibility

Setiap komponen memiliki tanggung jawab yang berbeda.

| Component               | Responsibility                                   |
| ----------------------- | ------------------------------------------------ |
| Supabase Authentication | Memverifikasi identitas pengguna.                |
| Profiles                | Representasi pengguna di dalam sistem.           |
| Roles                   | Menentukan hak akses pengguna.                   |
| PostgreSQL Functions    | Menjalankan validasi keamanan dan aturan bisnis. |
| Row Level Security      | Membatasi akses terhadap data.                   |
| Audit Trail             | Mencatat aktivitas penting.                      |

---

# Access Flow

Alur akses data secara umum sebagai berikut.

```text
User Login
      │
      ▼
Authentication
      │
      ▼
Profile
      │
      ▼
Role Validation
      │
      ▼
Business Validation
      │
      ▼
Row Level Security
      │
      ▼
Data Access
```

Akses hanya diberikan apabila seluruh tahapan berhasil dilewati.

---

# Principle of Least Privilege

Pengguna hanya memperoleh hak akses minimum yang dibutuhkan untuk menjalankan tugasnya.

Role tidak dibuat terlalu luas.

Penambahan hak akses dilakukan secara eksplisit sesuai kebutuhan operasional.

---

# Default Deny

Seluruh tabel bisnis menggunakan pendekatan **default deny**.

Tanpa Policy yang mengizinkan akses, data dianggap tidak dapat diakses.

Pendekatan ini mengurangi risiko akses yang tidak disengaja akibat perubahan aplikasi.

---

# Defense in Depth

Keamanan tidak bergantung pada satu mekanisme saja.

Validasi dilakukan pada beberapa lapisan.

Sebagai contoh:

* Identitas diverifikasi melalui Authentication.
* Hak akses diverifikasi melalui Role.
* Aturan bisnis diverifikasi melalui PostgreSQL Function.
* Akses data diverifikasi melalui RLS.

Apabila salah satu lapisan gagal, lapisan lain tetap memberikan perlindungan.

---

# Audit Trail

Aktivitas penting dicatat sebagai bagian dari sistem audit.

Implementasi awal difokuskan pada pencatatan minimum yang diperlukan untuk:

* Monitoring
* Troubleshooting
* Pelacakan perubahan
* Pengembangan fitur audit di masa mendatang

Audit bukan bagian dari proses otorisasi, namun menjadi pendukung keamanan sistem secara keseluruhan.

---

# Trust Boundary

Database merupakan sumber kebenaran (*source of truth*) bagi seluruh aplikasi.

Client tidak dianggap sebagai sumber yang dapat dipercaya.

Seluruh data yang diterima dari aplikasi harus melalui proses validasi sebelum disimpan maupun diakses.

---

# Future Considerations

Arsitektur keamanan dirancang agar dapat berkembang tanpa mengubah filosofi dasar sistem.

Pengembangan di masa mendatang dapat mencakup:

* Permission-based Access Control (PBAC)
* Approval Workflow
* Fine-grained Permission
* Session Audit
* API Key Authorization
* Background Service Authorization

Seluruh pengembangan tersebut tetap mengikuti prinsip:

* Authentication terpisah dari Authorization.
* Database menjadi pusat validasi keamanan.
* Row Level Security tetap menjadi lapisan proteksi terakhir terhadap data.
