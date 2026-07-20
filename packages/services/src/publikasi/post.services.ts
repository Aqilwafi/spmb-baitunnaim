// packages/services/src/services/post.services.ts

import { createSupabaseServer } from '@bn/supabase'
import type { PostListItem, PostDetail } from '@bn/types'

const LIST_SELECT = `
  id,
  judul,
  slug,
  ringkasan,
  penulis,
  created_at,
  master_categories ( label ),
  post_images ( image_path, is_hero )
`

const DETAIL_SELECT = `
  *,
  master_categories ( label ),
  post_images ( image_path, is_hero ),
  post_tag ( tags ( label ) )
`

/**
 * Ambil semua post published & active — dipakai web utama (publik).
 */
export async function getPublishedPosts(): Promise<PostListItem[]> {
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from('posts')
    .select(LIST_SELECT)
    .eq('status', 'PUBLISHED')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getPublishedPosts]', error)
    throw new Error('Gagal mengambil daftar publikasi')
  }

  return data as unknown as PostListItem[]
}

/**
 * Ambil satu post published by slug — dipakai halaman detail publik.
 */
export async function getPublishedPostBySlug(
  slug: string
): Promise<PostDetail | null> {
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from('posts')
    .select(DETAIL_SELECT)
    .eq('slug', slug)
    .eq('status', 'PUBLISHED')
    .eq('is_active', true)
    .maybeSingle()

  if (error) {
    console.error('[getPublishedPostBySlug]', error)
    throw new Error('Gagal mengambil detail publikasi')
  }

  return data as unknown as PostDetail | null
}

/**
 * Ambil SEMUA post (termasuk draft/inactive) — dipakai admin, RLS
 * yang membatasi lewat can_manage_publication().
 */
export async function getAllPostsForAdmin(): Promise<PostListItem[]> {
  const supabase = await createSupabaseServer()

  const { data, error } = await supabase
    .from('posts')
    .select(LIST_SELECT)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('[getAllPostsForAdmin]', error)
    throw new Error('Gagal mengambil daftar post (admin)')
  }

  return data as unknown as PostListItem[]
}