// packages/types/src/post.types.ts

import type {
  Enums,
  Tables,
  TablesInsert,
  TablesUpdate,
} from '../shared/supabase';

import type { MasterCategories } from '../shared/master.types';

export type Posts = Tables<'posts'>;
export type PostInsert = TablesInsert<'posts'>;
export type PostUpdate = TablesUpdate<'posts'>;
export type PostStatusEnum = Enums<'post_status'>;

export type Tag = Tables<'tags'>;
export type TagInsert = TablesInsert<'tags'>;
export type TagUpdate = TablesUpdate<'tags'>;

export type PostImages = Tables<'post_images'>;
export type PostImagesInsert = TablesInsert<'post_images'>;
export type PostImagesUpdate = TablesUpdate<'post_images'>;

export type PostTag = Tables<'post_tag'>;
export type PostTagInsert = TablesInsert<'post_tag'>;
export type PostTagUpdate = TablesUpdate<'post_tag'>;

// Untuk list (card) — ringkas, cukup hero image + kategori
export type PostItem = Pick<Posts,'id' | 'judul' | 'slug' | 'ringkasan' | 'penulis' | 'created_at'> & {
  master_categories: Pick<MasterCategories, 'label'> | null
  post_images: Pick<PostImages, 'image_path' | 'is_hero'>[]
}

// Untuk detail — full content + tags
export type PostDetail = Posts & {
  master_categories: Pick<MasterCategories, 'label'> | null
  post_images: Pick<PostImages, 'image_path' | 'is_hero'>[]
  post_tag: {
    tags: Pick<Tag, 'label'>
  }[]
}