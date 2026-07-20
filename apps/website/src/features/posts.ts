// apps/web/src/features/publikasi/publikasi.feature.ts

import { getPublishedPosts, getPublishedPostBySlug } from '@bn/services'
import type { PostListItem, PostDetail } from '@bn/types'

/**
 * Feature wrapper untuk halaman list publikasi (web utama).
 * Lapisan ini yang dipanggil komponen — bukan service langsung —
 * supaya kalau nanti ada logic tambahan (mapping, caching, dsb)
 * bisa ditaruh di sini tanpa menyentuh service atau komponen.
 */
export async function fetchPublishedPosts(): Promise<PostListItem[]> {
  return getPublishedPosts()
}

/**
 * Feature wrapper untuk halaman detail publikasi (web utama).
 */
export async function fetchPublishedPostBySlug(
  slug: string
): Promise<PostDetail | null> {
  return getPublishedPostBySlug(slug)
}