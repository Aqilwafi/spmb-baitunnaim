// packages/services/src/services/publikasi/post.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from '@bn/supabase'
import type { Posts, PostTag, PostImages, PostStatusEnum } from '@bn/types'

export async function getPosts(): Promise<Posts[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_active', true);

  if (error) return [];

  return data;
}

export async function getPostsByStatus(statusPosts: PostStatusEnum): Promise<Posts[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_active', true)
    .eq('status', statusPosts)

  if (error) return [];

  return data;
}

export async function getPublishedPostBySlug(slug: string): Promise<Posts | null> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('is_active', true)
    .eq('slug', slug)
    .single()

  if (error) return null;

  return data;
}

export async function getPostTagByPostId(postsId: number[]): Promise<PostTag[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('post_tag')
    .select('*')
    .in('post_id', postsId);

  if (error) return [];

  return data;
}

export async function getPostImagesByPostId(postsId: number[]): Promise<PostImages[]> {

  const supabase = await createSupabaseServer();
  const { data, error } = await supabase
    .from('post_images')
    .select('*')
    .in('post_id', postsId);

  if (error) return [];

  return data;
}