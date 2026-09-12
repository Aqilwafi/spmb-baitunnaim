"use client";

import { useState } from "react";
import { TiptapEditor } from "@/components/editor";
import { Eye, Edit3, Image as ImageIcon, Tag, Building, Folder } from "lucide-react";

// Mock Data Dummy (Substitusi Data dari Database)
const MOCK_LEMBAGA = [
  { id: 1, nama: "Lembaga Penelitian & Pengabdian" },
  { id: 2, nama: "Fakultas Ilmu Komputer" },
  { id: 3, nama: "Humas & Pusat Informasi" },
];

const MOCK_CATEGORIES = [
  { id: 1, nama: "Berita Utama" },
  { id: 2, nama: "Pengumuman" },
  { id: 3, nama: "Artikel Ilmiah" },
];

const MOCK_TAGS = [
  { id: 1, label: "Teknologi" },
  { id: 2, label: "Pendidikan" },
  { id: 3, label: "Kampus" },
  { id: 4, label: "Riset" },
];

export function PostEditorPreview() {
  // State Form
  const [judul, setJudul] = useState("Inovasi Teknologi AI Terbaru di Lingkungan Kampus");
  const [penulis, setPenulis] = useState("Ahmad Fauzi");
  const [ringkasan, setRingkasan] = useState(
    "Implementasi sistem pintar berbasis AI untuk efisiensi administrasi dan publikasi ilmiah."
  );
  const [selectedLembaga, setSelectedLembaga] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<number>(1);
  const [selectedTags, setSelectedTags] = useState<number[]>([1, 3]);
  const [heroImage, setHeroImage] = useState<string>(
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80"
  );
  
  // State Editor HTML dari Tiptap
  const [contentHtml, setContentHtml] = useState<string>(
    `<h2>Pengenalan Sistem AI Baru</h2><p>Kami sangat senang mengumumkan bahwa platform baru ini memanfaatkan kecerdasan buatan untuk membantu proses publikasi berita.</p><ul><li>Proses otomatisasi metadata</li><li>Integrasi WYSIWYG Tiptap</li><li>Kecepatan rendering tinggi</li></ul>`
  );

  // Toggle Tag Selection
  const toggleTag = (id: number) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Mendapatkan label dummy untuk Preview
  const currentLembaga = MOCK_LEMBAGA.find((l) => l.id === selectedLembaga)?.nama;
  const currentCategory = MOCK_CATEGORIES.find((c) => c.id === selectedCategory)?.nama;

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 p-4 lg:p-8">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-6 flex justify-between items-center border-b pb-4 border-slate-200 dark:border-slate-800">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Editor Artikel & Berita</h1>
            <p className="text-sm text-slate-500">Live preview side-by-side mode</p>
          </div>
          <button 
            type="button" 
            onClick={() => alert("Simpan Data Mock:\n" + JSON.stringify({ judul, penulis, ringkasan, contentHtml, selectedLembaga, selectedCategory, selectedTags }, null, 2))}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-sm transition"
          >
            Simpan Draft (Mock)
          </button>
        </header>

        {/* Grid 2 Kolom: Kiri (Ketik/Form) vs Kanan (Tampil/Preview) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* ================= SISI KETIK (FORM EDITOR) ================= */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2 border-b pb-3 text-slate-800 dark:text-slate-200 font-semibold">
              <Edit3 className="w-5 h-5 text-blue-600" />
              <h2>Form Input Artikel</h2>
            </div>

            {/* Input Judul */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Judul Artikel</label>
              <input
                type="text"
                value={judul}
                onChange={(e) => setJudul(e.target.value)}
                placeholder="Masukkan judul artikel..."
                className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Input Penulis & Hero Image URL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Penulis</label>
                <input
                  type="text"
                  value={penulis}
                  onChange={(e) => setPenulis(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL Hero Image (Gambar Utama)</label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Select Lembaga & Kategori */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Lembaga</label>
                <select
                  value={selectedLembaga}
                  onChange={(e) => setSelectedLembaga(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                >
                  {MOCK_LEMBAGA.map((item) => (
                    <option key={item.id} value={item.id}>{item.nama}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Kategori</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(Number(e.target.value))}
                  className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none"
                >
                  {MOCK_CATEGORIES.map((item) => (
                    <option key={item.id} value={item.id}>{item.nama}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tag Selection (Multi-select Chips) */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Tag Artikel</label>
              <div className="flex flex-wrap gap-2">
                {MOCK_TAGS.map((tag) => {
                  const isSelected = selectedTags.includes(tag.id);
                  return (
                    <button
                      type="button"
                      key={tag.id}
                      onClick={() => toggleTag(tag.id)}
                      className={`px-3 py-1 text-xs rounded-full border transition ${
                        isSelected
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700"
                      }`}
                    >
                      #{tag.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input Ringkasan */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Ringkasan Artikel</label>
              <textarea
                rows={2}
                value={ringkasan}
                onChange={(e) => setRingkasan(e.target.value)}
                className="w-full px-3 py-2 border rounded-md text-sm border-slate-300 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>

            {/* Tiptap Editor Component */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Isi Konten (WYSIWYG Editor)</label>
              <TiptapEditor value={contentHtml} onChange={setContentHtml} />
            </div>
          </div>


          {/* ================= SISI TAMPIL (PREVIEW ARTIKEL) ================= */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm sticky top-6">
            <div className="flex items-center justify-between border-b pb-3 mb-6">
              <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold">
                <Eye className="w-5 h-5 text-emerald-600" />
                <h2>Live Tampilan Publik</h2>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 font-medium px-2.5 py-1 rounded-full">
                PUBLISHED
              </span>
            </div>

            <article className="space-y-4">
              {/* Category & Lembaga Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                {currentCategory && (
                  <span className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded">
                    <Folder className="w-3.5 h-3.5" />
                    {currentCategory}
                  </span>
                )}
                {currentLembaga && (
                  <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2.5 py-1 rounded">
                    <Building className="w-3.5 h-3.5" />
                    {currentLembaga}
                  </span>
                )}
              </div>

              {/* Judul Artikel */}
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {judul || "Judul Artikel..."}
              </h1>

              {/* Author & Meta */}
              <div className="flex items-center gap-3 text-xs text-slate-500 border-y py-2 border-slate-100 dark:border-slate-800">
                <span>Oleh: <strong className="text-slate-700 dark:text-slate-300">{penulis || "-"}</strong></span>
                <span>•</span>
                <span>{new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>

              {/* Hero Image */}
              {heroImage && (
                <div className="rounded-lg overflow-hidden max-h-[250px] w-full border border-slate-100 dark:border-slate-800">
                  <img
                    src={heroImage}
                    alt="Hero"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </div>
              )}

              {/* Ringkasan / Lead Paragraph */}
              {ringkasan && (
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 italic border-l-4 border-blue-500 pl-3 py-1">
                  {ringkasan}
                </p>
              )}

              {/* Hasil Render Tiptap Content (HTML Output) */}
              <div
                className="prose max-w-none dark:prose-invert text-sm pt-2 border-t border-slate-100 dark:border-slate-800"
                dangerouslySetInnerHTML={{ __html: contentHtml || "<p className='text-slate-400 italic'>Konten artikel kosong...</p>" }}
              />

              {/* List Tags */}
              {selectedTags.length > 0 && (
                <div className="pt-4 flex items-center gap-2 flex-wrap border-t border-slate-100 dark:border-slate-800">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {selectedTags.map((tagId) => {
                    const tag = MOCK_TAGS.find((t) => t.id === tagId);
                    return tag ? (
                      <span key={tag.id} className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded">
                        #{tag.label}
                      </span>
                    ) : null;
                  })}
                </div>
              )}
            </article>
          </div>

        </div>
      </div>
    </div>
  );
}