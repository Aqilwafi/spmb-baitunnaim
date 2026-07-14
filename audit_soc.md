Ceklist Audit Separation of Concerns (SoC)
Gunakan daftar ini untuk ditandai (dengan mengubah [ ] menjadi [x]) saat Anda meninjau file-file di dalam monorepo Anda.

1. Audit Layer Infrastructure (packages/supabase)
Tujuan: Package ini hanya boleh menangani koneksi dan instantiation Supabase. Ia tidak boleh tahu aturan bisnis spesifik aplikasi.

[ ] Pemisahan Konfigurasi: Apakah process.env diakses secara langsung di dalam packages/supabase?

Saran: Sebaiknya tidak. Gunakan Dependency Injection atau buat wrapper packages/env agar lebih aman.

[ ] Kebocoran Logika Rute: Apakah file seperti packages/supabase/proxy.ts atau fungsi lain di dalamnya mengandung pengecekan path (misal: if (pathname === '/login'))?

Saran: Hapus ini. Pindahkan logika rute ke middleware.ts di masing-masing apps/.

[ ] Dependensi Framework: Apakah packages/supabase hanya mengimpor tipe dari next/server (misal: NextRequest) dan bukan komponen runtime (redirect, cookies() global)?

Saran: Menggunakan tipe next/server diperbolehkan untuk signature fungsi.

2. Audit Layer Business Logic & Types (packages/auth, packages/services, packages/validators, packages/types)
Tujuan: Area ini adalah "otak" aplikasi. Harus agnostic terhadap Next.js dan UI.

[ ] Kemandirian packages/auth: Apakah fungsi di dalam packages/auth/src/services.ts melakukan redirect() secara langsung?

Saran: Hapus ini. Fungsi auth harus mengembalikan status/data, dan apps/ yang melakukan redirect berdasarkan data tersebut (Pola "Action Result").

[ ] Injeksi Konfigurasi pada Auth: Apakah URL untuk redirect (redirectTo) di dalam packages/auth di-hardcode?

Saran: Sebaiknya di-inject dari apps/ (Dependency Injection) agar satu fungsi auth bisa dipakai oleh admin dan spmb dengan callback URL berbeda.

[ ] Kekeringan (DRY) Services: Apakah ada duplikasi fungsi API/Supabase antara apps/admin dan apps/spmb?

Saran: Pindahkan fungsi yang sama ke packages/services.

[ ] Validasi Terpusat: Apakah Zod schema di packages/validators sudah digunakan oleh apps/*/actions.ts dan bukan mendefinisikan schema sendiri?

3. Audit Layer UI & Constants (packages/ui, packages/constants)
Tujuan: packages/ui harus "bodoh" (hanya visual), dan packages/constants harus menjadi satu-satunya sumber kebenaran untuk konfigurasi statis.

[ ] Kemurnian Komponen UI: Apakah komponen di packages/ui (misal: Sidebar.tsx, BackButton.tsx) mengimpor next/navigation (useRouter, usePathname)?

Saran: Hapus ini. Ini adalah pelanggaran SoC berat. Komponen UI harus menerima callback function (misal: onClick, onBack) dari apps/.

[ ] Sentralisasi Routing: Apakah masih ada hardcoded string URL (misal: "/dashboard/manage/admin") di dalam file .tsx atau packages/?

Saran: Pindahkan semua URL ke packages/constants/src/routes.ts dan gunakan objek ROUTES tersebut.

4. Audit Layer Application & Glue Code (apps/admin, apps/spmb, apps/website)
Tujuan: apps/ adalah perekat. Di sinilah dependensi framework (Next.js) dan logika bisnis bertemu.

[ ] Middleware Agnostik: Apakah apps/admin/src/middleware.ts atau apps/spmb/src/middleware.ts masih mengimpor fungsi proxy yang memiliki hardcoded logic di dalamnya?

Saran: Middleware harus mengimpor pure function dari packages/supabase dan menginjeksi aturan proteksi spesifik aplikasi tersebut (Pola "Inject Callback/Predicate").

[ ] Actions sebagai Glue Code: Apakah apps/*/src/actions/*.ts memanggil fungsi dari packages/auth atau packages/services, lalu menangani redirect() (Next.js function) berdasarkan responsnya? Ini adalah tempat yang benar untuk redirect().

[ ] Redundansi Komponen: Apakah ada komponen di apps/admin/src/components/others/ yang fungsinya sama persis dengan yang ada di packages/ui/src/?

Saran: Hapus komponen di apps/ dan gunakan dari packages/ui.

[ ] Duplikasi Aset: Apakah folder public/ di setiap apps berisi file gambar/logo yang sama?

Saran: Pertimbangkan untuk memusatkan aset statis (di luar repo atau di package khusus).