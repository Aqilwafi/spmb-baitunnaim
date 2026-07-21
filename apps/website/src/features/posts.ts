// apps/web/src/features/publikasi/publikasi.feature.ts

import { getPostsByStatus, getPublishedPostBySlug } from '@bn/services'
import type { Posts, PostDetail } from '@bn/types'

const STSTUS = 'PUBLISHED';

export async function fetchPublishedPosts(): Promise<Posts[]> {
  return getPostsByStatus(STSTUS);
}

/**
 * Feature wrapper untuk halaman detail publikasi (web utama).
 */
export async function fetchPublishedPostBySlug(slug: string): Promise<Posts|null> {
  return getPublishedPostBySlug(slug)
}