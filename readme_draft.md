# README (Draft) — Monorepo “SPMB Baitunnaim”

Monorepo ini berisi beberapa aplikasi web berbasis **Next.js** yang saling terhubung untuk kebutuhan pendaftaran siswa (“SPMB”) menggunakan **Supabase** sebagai backend (Auth + database).

## Struktur Workspace

- `apps/`
  - `website/` — website/landing (Next.js)
  - `spmb/` — aplikasi utama pendaftaran siswa (Next.js)
  - `admin/` — panel admin (Next.js)
- `packages/` — shared library (mis. auth, types, services, supabase client, ui, utilitas)
- `database_design/` — dokumentasi skema, fungsi (PL/pgSQL), policy, trigger, dan seed untuk Supabase
- `docker/` — konfigurasi Docker/Compose untuk dev & produksi

## Aplikasi

### 1) Website (`apps/website`)
Aplikasi Next.js untuk landing/website.

### 2) SPMB (`apps/spmb`)
Aplikasi pendaftaran siswa berbasis **Next.js 16**.

Fitur utama (ringkas):
- Autentikasi user via Supabase
- Alur pendaftaran multi-step
- Dashboard pengguna
- Integrasi backend melalui Supabase

### 3) Admin (`apps/admin`)
Panel admin untuk manajemen data yang dibutuhkan proses pendaftaran.

## Tech Stack

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth + Postgres + Storage)
- **Zod** (validasi)
- **Framer Motion** (UI/animasi)
- **Docker** (deployment/dev)

## Konfigurasi & Environment

Workspace menggunakan `pnpm` + `turbo`.

Buat file environment dengan pola:
- `cp .env.example .env`

Variabel utama yang dibutuhkan umumnya:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

> Catatan: nilai detail sangat tergantung konfigurasi Supabase instance yang digunakan.

## Setup Database (Supabase)

Isi database dengan file SQL yang ada di `database_design/`.

Direkomendasikan menjalankan urutan SQL seperti yang disebut di README aplikasi (mis. untuk `spmb`):
- SQL DDL tabel (lookup/main)
- SQL fungsi (functions)
- policy & trigger
- seed data (jika ada)

## Menjalankan Aplikasi

### Prasyarat
- Node.js versi sesuai requirement project (root menggunakan Node >= 22)
- pnpm
- Supabase instance (self-hosted atau cloud)

### Development (Monorepo)
- `pnpm dev` (menggunakan turbo)

> Setiap app bisa dijalankan lewat `--filter <app>` sesuai kebutuhan.

## Menjalankan dengan Docker

Docker Compose tersedia untuk pengembangan.

Langkah:
- `cd docker`
- `docker compose up --build`

Compose umumnya menyalakan:
- Supabase Postgres
- Supabase Auth (GoTrue)
- Supabase Storage API
- Aplikasi Next.js (`website`, `spmb`, `admin`)

## Deployment (Dockerfile)

`docker/Dockerfile` menggunakan pendekatan multistage:
1. `turbo prune` (memotong monorepo sesuai app)
2. instalasi dependencies
3. build Next.js menghasilkan output `standalone`
4. runner image dibuat lebih kecil (non-root user)

## Referensi Tambahan

- Dokumentasi skema & arsitektur database: `database_design/docs/*`
- SQL functions/policies/triggers: `database_design/functions`, `database_design/policies`, `database_design/triggers`

---

## Lisensi

Proyek bersifat privat. (Sesuaikan bila ada lisensi resmi di repository.)

