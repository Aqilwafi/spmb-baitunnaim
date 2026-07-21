1. Identitas user (dari auth): done

userId / claims.sub — buat query siswa/form miliknya

2. Daftar siswa milik user ini: 

letak = form/owner.ts (file baru, belum dilist)
untuk menampilkan card, perlu tau berapa card berdasarkan siswa.

Karena satu akun bisa punya lebih dari satu anak (multi-siswa) — lihat pola getBiodataSiswaByOwnerId yang udah ada di services
Dibutuhkan buat nentuin: apakah user ini punya siswa terdaftar sama sekali, dan siswa mana aja

3. Daftar form pendaftaran per siswa tsb:

letak = form/owner.ts (file baru, belum dilist)
setelah dapat siswa, ambil form yang aktif. sekalian filter juga berdasarkan th ajaran saat ini.

getFormPendaftaranByPendaftarId (atau semacamnya) — buat nampilin FormPendaftaranCard per form yang ada
Kalau kosong semua → render EmptyPendaftaran

4. Untuk tiap card, minimal butuh ringkasan:

letak = form/card.ts
utama dari card.ts, karena menampilkan data awal. jadi, setelah select * dari services, features (card.ts) yang filter data yang ditampilkan.

id (buat link ke /dashboard/pendaftaran/[id])
Nama siswa (buat label card)
step_id saat ini (buat progress indicator di card, kalau ada)
Status (registration/admission)