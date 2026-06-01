import type { Tables, TablesInsert, TablesUpdate } from '../shared/base.types';
/**
 * =========================
 * Database Types
 * =========================
 */
export type Post = Tables<'posts'>;
export type PostInsert = TablesInsert<'posts'>;
export type PostUpdate = TablesUpdate<'posts'>;
/**
 * =========================
 * Status
 * =========================
 */
export type PostStatus = 'draft' | 'published' | 'archived';
/**
 * =========================
 * UI / View Models
 * =========================
 */
export type PostCard = {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    thumbnail: string | null;
    created_at: string;
};
export type PostListItem = {
    id: string;
    title: string;
    slug: string;
    status: PostStatus;
    created_at: string;
};
export type PostDetail = {
    id: string;
    title: string;
    slug: string;
    content: unknown;
    thumbnail: string | null;
    status: PostStatus;
    created_at: string;
    updated_at: string | null;
};
/**
 * =========================
 * Editor Types
 * =========================
 */
export type TiptapContent = {
    type: string;
    content?: TiptapContent[];
    text?: string;
    attrs?: Record<string, unknown>;
};
/**
 * =========================
 * Payload Types
 * =========================
 */
export type CreatePostPayload = {
    title: string;
    slug: string;
    content: TiptapContent;
    thumbnail?: string;
    status?: PostStatus;
};
export type UpdatePostPayload = Partial<CreatePostPayload>;
/**
 * =========================
 * Query Types
 * =========================
 */
export type GetPostsOptions = {
    limit?: number;
    offset?: number;
    status?: PostStatus;
    search?: string;
};
//# sourceMappingURL=post.type.d.ts.map