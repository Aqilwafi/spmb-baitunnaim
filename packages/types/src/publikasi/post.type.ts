// packages/types/src/post.types.ts

import type {
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';


/**
 * =========================
 * Database Types
 * =========================
 */

export type Post = Tables<'posts'>
export type PostInsert = TablesInsert<'posts'>
export type PostUpdate = TablesUpdate<'posts'>
export type Tag = Tables<'tags'>
export type MasterCategory = Tables<'master_categories'>
export type PostImage = Tables<'post_images'>

/**
 * =========================
 * Composite / Joined Types
 * =========================
 */

// Untuk list (card) — ringkas, cukup hero image + kategori
export type PostListItem = Pick<Post,'id' | 'judul' | 'slug' | 'ringkasan' | 'penulis' | 'created_at'> & {
  master_categories: Pick<MasterCategory, 'label'> | null
  post_images: Pick<PostImage, 'image_path' | 'is_hero'>[]
}

// Untuk detail — full content + tags
export type PostDetail = Post & {
  master_categories: Pick<MasterCategory, 'label'> | null
  post_images: Pick<PostImage, 'image_path' | 'is_hero'>[]
  post_tag: {
    tags: Pick<Tag, 'label'>
  }[]
}