# 🏫 Web Pendaftaran LPI

Aplikasi web pendaftaran siswa berbasis **Next.js 16** dengan autentikasi dan manajemen pendaftaran multi-step. Dibangun menggunakan Supabase sebagai backend dan dapat di-deploy menggunakan Docker.

---

## 🛠️ Tech Stack

| Teknologi | Versi |
|---|---|
| Next.js | 16.2.3 |
| React | 19.x |
| TypeScript | 5.x |
| Tailwind CSS | 4.x |
| Supabase (Auth + DB) | 2.x |
| Framer Motion | 12.x |
| Zod | 4.x |
| Docker | - |

---

## 📁 Struktur Proyek

```
.
├── database/               # SQL schema, fungsi, dan data lama
│   ├── functions/          # PL/pgSQL functions (auth, bisnis, system, validasi)
│   ├── table/              # DDL tabel utama dan lookup
│   └── old/                # Data migrasi dari sistem lama
├── docker/                 # Konfigurasi Docker & Compose
│   └── development/
├── public/                 # Aset statis (logo, gambar)
└── src/
    ├── actions/            # Server Actions (auth, pendaftaran)
    ├── app/                # Next.js App Router
    │   ├── (admin)/        # Halaman admin
    │   ├── (auth)/         # Login, register, reset password
    │   ├── (conditional)/  # Halaman forbidden, maintenance, unauthorized
    │   └── (user)/         # Dashboard & alur pendaftaran
    ├── components/         # Komponen UI
    │   ├── auth/           # Form login & register
    │   ├── dashboards/     # Dashboard & step pendaftaran
    │   ├── headers/        # Header per halaman
    │   └── others/         # Komponen umum (popup, maintenance)
    ├── config/             # Konfigurasi step pendaftaran
    ├── helpers/            # Helper logika pendaftaran
    ├── lib/supabase/       # Klien Supabase (admin, client, server, proxy)
    ├── services/           # Layer service (dashboard, pendaftaran)
    ├── types/              # TypeScript type definitions
    └── utils/              # Utilitas (format tanggal, status mapper)
```

---

## ⚡ Memulai

### Prasyarat

- **Node.js** >= 20
- **npm** atau **yarn**
- Akun **Supabase** (atau instance self-hosted)
- **Docker** (opsional, untuk deployment)

### Instalasi

1. **Clone repositori**
   ```bash
   git clone <url-repo>
   cd web
   ```

2. **Install dependensi**
   ```bash
   npm install
   ```

3. **Konfigurasi environment**

   Salin file `.env.example` menjadi `.env` lalu isi variabel yang dibutuhkan:
   ```bash
   cp .env.example .env
   ```

   Variabel yang diperlukan (sesuaikan dengan project Supabase Anda):
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
   ```

4. **Setup database**

   Jalankan SQL berikut secara berurutan di Supabase SQL Editor:
   ```
   database/table/lookup_table.sql
   database/table/main_table.sql
   database/function.sql
   ```

5. **Jalankan development server**
   ```bash
   npm run dev
   ```

   Aplikasi berjalan di `http://localhost:3000`

---

## 🐳 Menjalankan dengan Docker

```bash
cd docker
docker compose up --build
```

---

## 📜 Scripts

| Script | Perintah | Deskripsi |
|---|---|---|
| Development | `npm run dev` | Menjalankan server dev di port 3000 |
| Build | `npm run build` | Build aplikasi untuk production |
| Start | `npm run start` | Menjalankan build production |
| Lint | `npm run lint` | Menjalankan ESLint |

---

## 🔐 Fitur Autentikasi

- Login & Register dengan email/password
- Reset & lupa password via email
- Auth callback handler (`/auth/callback`)
- Middleware berbasis Supabase SSR untuk proteksi rute

---

## 📋 Alur Pendaftaran

Pendaftaran siswa dilakukan secara multi-step:

1. **Daftar Akun** — Pembuatan akun pengguna
2. **Lembaga Tujuan** — Pemilihan lembaga/sekolah tujuan
3. **Pembayaran** — Konfirmasi dan pembayaran pendaftaran

Setiap step dikonfigurasi melalui `src/config/stepConfig.ts` dan dapat dilanjutkan dari langkah terakhir yang telah diselesaikan.

---

## 🗂️ Halaman Aplikasi

| Route | Deskripsi |
|---|---|
| `/` | Halaman utama / landing |
| `/login` | Halaman login |
| `/register` | Halaman registrasi |
| `/lupa-password` | Formulir lupa password |
| `/reset-password` | Reset password via link email |
| `/dashboard` | Dashboard pengguna |
| `/dashboard/pendaftaran/[id]` | Detail & lanjut pendaftaran |
| `/admin` | Panel admin |
| `/forbidden` | Akses ditolak |
| `/unauthorized` | Tidak terautentikasi |
| `/maintanance` | Mode maintenance |

---

## 📄 Lisensi

Proyek ini bersifat privat dan tidak untuk didistribusikan secara publik.