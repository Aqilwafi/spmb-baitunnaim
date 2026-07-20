create or replace function public.fn_can_manage_publikasi()
returns boolean
language sql
stable
set search_path = public
as $$
    select (
        public.fn_is_high_level_admin() 
        or
        coalesce(
            (auth.jwt() -> 'app_metadata' -> 'access_rights')::jsonb @> '[4]'::jsonb, false
        )
    ); 
$$;

-- Artikel 1: Panggung Kartini → 4 tags
insert into public.post_tag (post_id, tag_id) values
  (1, 1),  -- HariKartini2025
  (1, 2),  -- MIAlMaarifNgadri
  (1, 3),  -- KartiniMasaKini
  (1, 4);  -- LombaKartini

-- Artikel 2: Gigi Sehat → 5 tags
insert into public.post_tag (post_id, tag_id) values
  (2, 5),  -- PAUDPlusBaitunNaim
  (2, 6),  -- SenyumSehatAnakHebat
  (2, 7),  -- PenyuluhanGigi
  (2, 8),  -- PuskesmasBinangun
  (2, 9);  -- AnakCeriaAnakSehat

-- Artikel 5: ASAJ → 5 tags
insert into public.post_tag (post_id, tag_id) values
  (5, 10),  -- ASAJ2025
  (5, 2),   -- MIAlMaarifNgadri (sudah ada dari artikel 1)
  (5, 11),  -- PendidikanBermakna
  (5, 12),  -- UjianAkhirMadrasah
  (5, 13);  -- GenerasiBerkarakter

-- Artikel 6: Halal Bihalal PAUD → 8 tags
insert into public.post_tag (post_id, tag_id) values
  (6, 14),  -- PAUDBaitunnaim
  (6, 15),  -- KeceriaanAnak
  (6, 16),  -- HalalBihalalPAUD
  (6, 17),  -- KembaliKeSekolah
  (6, 18),  -- SemangatBaru
  (6, 19),  -- PersaudaraanPAUD
  (6, 20),  -- LiburLebaran
  (6, 21);  -- AnakHebatPAUD

-- Artikel 7: Halal Bihalal MI → 10 tags
insert into public.post_tag (post_id, tag_id) values
  (7, 2),   -- MIAlMaarifNgadri
  (7, 22),  -- HalalBihalal
  (7, 17),  -- KembaliKeSekolah
  (7, 18),  -- SemangatBaru
  (7, 23),  -- SilaturahmiIdulFitri
  (7, 24),  -- HariPertamaSekolah
  (7, 25),  -- PersaudaraanSekolah
  (7, 26),  -- KeceriaanSetelahLebaran
  (7, 27),  -- SiswaBerprestasi
  (7, 28);  -- MIAlMaarifNgadriHebat

-- Artikel 8: Porseni → 10 tags
insert into public.post_tag (post_id, tag_id) values
  (8, 29),  -- MIAlmaarifNgadri
  (8, 30),  -- JuaraUmumPorseni
  (8, 31),  -- PorseniBinangun2025
  (8, 32),  -- PrestasiGemilang
  (8, 33),  -- 32Piala
  (8, 34),  -- OlahragaDanSeni
  (8, 35),  -- PendidikanBerkualitas
  (8, 36),  -- SemangatPelajar
  (8, 37),  -- PendidikanHebat
  (8, 38);  -- KreativitasSiswa

insert into public.post_images (post_id, image_path, is_hero) values
  (1, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/kartini.jpg', false),
  (2, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/gigi.jpg', false),
  (3, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/market.jpg', false),
  (4, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/hariguru.jpg', false),
  (5, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/asat.jpg', false),
  (6, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/hbhtk.jpg', false),
  (7, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/hbhmi.jpg', false),
  (8, 'https://rywammolujagaasauldp.supabase.co/storage/v1/object/public/baitunnaim/public/porseni.jpg', false);

-- policies/publikasi/rls_posts.sql

alter table public.posts enable row level security;

drop policy if exists "RLS: posts: select"
on public.posts;

create policy "RLS: posts: select"
on public.posts
for select
using (true);

drop policy if exists "RLS: posts: insert"
on public.posts;

create policy "RLS: posts: insert"
on public.posts
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: posts: update"
on public.posts;

create policy "RLS: posts: update"
on public.posts
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: posts: delete"
on public.posts;

create policy "RLS: posts: delete"
on public.posts
for delete
using (false); -- tidak boleh delete post, harus delete user di auth.users sekalian 2 fungsi.

-- policies/publikasi/rls_tags.

alter table public.tags enable row level security;

drop policy if exists "RLS: tags: select"
on public.tags;

create policy "RLS: tags: select"
on public.tags
for select
using (true);

drop policy if exists "RLS: tags: insert"
on public.tags;

create policy "RLS: tags: insert"
on public.tags
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: tags: update"
on public.tags;

create policy "RLS: tags: update"
on public.tags
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: tags: delete"
on public.tags;

create policy "RLS: tags: delete"
on public.tags
for delete
using (false); -- tidak boleh delete tag, harus delete user di auth.users sekalian 2 fungsi.

-- policies/publikasi/rls_post_tag.sql

alter table public.post_tag enable row level security;

drop policy if exists "RLS: post_tag: select"
on public.post_tag;

create policy "RLS: post_tag: select"
on public.post_tag
for select
using (true);

drop policy if exists "RLS: post_tag: insert"
on public.post_tag;

create policy "RLS: post_tag: insert"
on public.post_tag
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_tag: update"
on public.post_tag;

create policy "RLS: post_tag: update"
on public.post_tag
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_tag: delete"
on public.post_tag;

create policy "RLS: post_tag: delete"
on public.post_tag
for delete
using (false); -- tidak boleh delete post_tag, harus delete user di auth.users sekalian 2 fungsi.

-- policies/publikasi/post_images.sql

alter table public.post_images enable row level security;

drop policy if exists "RLS: post_images: select"
on public.post_images;

create policy "RLS: post_images: select"
on public.post_images
for select
using (true);

drop policy if exists "RLS: post_images: insert"
on public.post_images;

create policy "RLS: post_images: insert"
on public.post_images
for insert
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_images: update"
on public.post_images;

create policy "RLS: post_images: update"
on public.post_images
for update  
using (
    public.fn_can_manage_publikasi()
)
with check (
    public.fn_can_manage_publikasi()
);

drop policy if exists "RLS: post_images: delete"
on public.post_images;

create policy "RLS: post_images: delete"
on public.post_images
for delete
using (false); 