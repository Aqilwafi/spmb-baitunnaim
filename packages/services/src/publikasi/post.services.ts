// packages/services/src/services/publikasi/post.services.ts
// @bn/services

import "server-only";
import { createSupabaseServer } from "@bn/supabase";
import { withCache } from "@bn/utils";
import type { Posts, PostTag, PostImages, PostStatusEnum } from "@bn/types";

export const getPosts = () =>
  withCache<Posts[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_active", true);

      if (error) return [];

      return data;
    },
    ["posts"],
    ["posts"]
  )();

export const getPostsByStatus = (statusPosts: PostStatusEnum) =>
  withCache<Posts[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_active", true)
        .eq("status", statusPosts);

      if (error) return [];

      return data;
    },
    ["posts", "status", statusPosts],
    ["posts"]
  )();

export const getPublishedPostBySlug = (slug: string) =>
  withCache<Posts | null>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("is_active", true)
        .eq("slug", slug)
        .single();

      if (error) return null;

      return data;
    },
    ["posts", "slug", slug],
    ["posts"]
  )();

export const getPostTagByPostId = (postsId: number[]) =>
  withCache<PostTag[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("post_tag")
        .select("*")
        .in("post_id", postsId);

      if (error) return [];

      return data;
    },
    ["post_tag", ...postsId.map(String)],
    ["post_tag"]
  )();

export const getPostImagesByPostId = (postsId: number[]) =>
  withCache<PostImages[]>(
    async () => {
      const supabase = await createSupabaseServer();
      const { data, error } = await supabase
        .from("post_images")
        .select("*")
        .in("post_id", postsId);

      if (error) return [];

      return data;
    },
    ["post_images", ...postsId.map(String)],
    ["post_images"]
  )();