"use client"

import { useMemo, useState } from "react"
import BlogCard from "../components/BlogCard"
import type { PostItem } from "@bn/types"

interface Props {
  posts: PostItem[];
}

export default function PublikasiList({ posts }: Props) {
  const [q, setQ] = useState("")

  const filteredPosts = useMemo(() => {
    if (!q.trim()) return posts;

    const term = q.toLowerCase();

    return posts.filter((post) =>
      post.judul.toLowerCase().includes(term) ||
      (post.penulis ?? "").toLowerCase().includes(term) ||
      (post.master_categories?.label ?? "").toLowerCase().includes(term)
    );
  }, [q, posts]);

  return (
    <section className="py-5 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center text-teal-800 mb-4">
          Publikasi
        </h2>
        <div className="w-24 h-1 bg-teal-600 mx-auto mb-10" />

        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada artikel yang cocok.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              const hero = post.post_images?.find((img) => !img.is_hero);
              return (
                <BlogCard
                  key={post.id}
                  judul={post.judul}
                  slug={post.slug}
                  ringkasan={post.ringkasan ?? ""}
                  penulis={post.penulis}
                  kategori={post.master_categories?.label ?? ""}
                  gambar={hero?.image_path ?? ""}
                  tanggalDibuat={post.created_at ?? new Date().toISOString()}
                />
              );
            })}
          </div>
        )}

      </div>
    </section>
  )
}