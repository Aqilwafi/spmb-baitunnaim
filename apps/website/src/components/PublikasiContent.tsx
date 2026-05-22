"use client"

import { useMemo, useState } from "react"
import BlogCard from "@/components/BlogCard"
import { publikasi } from "@/const/publikasi"

export default function PublikasiComponent() {
  const [q, setQ] = useState("")

 const filteredPosts = useMemo(() => {
  if (!q.trim()) return publikasi;

  const term = q.toLowerCase();

  return publikasi.filter((post) =>
    post.judul.toLowerCase().includes(term) ||
    (post.penulis ?? "").toLowerCase().includes(term) ||
    (post.kategori ?? "").toLowerCase().includes(term)
    );
    }, [q]);

  return (
    <section className="py-5 bg-gray-50 text-black">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold text-center text-teal-800 mb-4">
          Publikasi
        </h2>
        <div className="w-24 h-1 bg-teal-600 mx-auto mb-10" />

        {/* SEARCH */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Cari artikel..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* LIST */}
        {filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">
            Tidak ada artikel yang cocok.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} {...post} />
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
