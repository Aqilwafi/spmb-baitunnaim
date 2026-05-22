import { publikasi } from "@/const/publikasi";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface Props {
  slug: string;
}

// Server Component
export default function PostDetail({ slug }: Props) {
  const post = publikasi.find((p) => p.slug === slug);

  if (!post)
    return (
      <p className="text-center mt-10 text-xl font-semibold">
        ❌ Post tidak ditemukan
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* Breadcrumb */}
      <nav
        className="text-gray-500 text-sm mb-4"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/publikasi" className="hover:underline">
          Publikasi
        </Link>{" "}
        /{" "}
        <span className="text-gray-700 font-medium">
          {post.judul}
        </span>
      </nav>

      {/* Judul & Ringkasan */}
      <h1 className="text-4xl font-bold mb-3 leading-tight">
        {post.judul}
      </h1>
      <p className="text-gray-600 mb-5 leading-relaxed">
        {post.ringkasan}
      </p>

      {/* Gambar */}
      {post.gambar && (
        <img
          src={post.gambar}
          alt={post.judul}
          className="rounded-lg shadow mb-8 w-full object-cover"
        />
      )}

      {/* Konten Markdown */}
      <article className="prose prose-lg text-justify max-w-none prose-img:rounded-lg prose-ul:list-disc prose-ol:list-decimal prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw, rehypeSanitize]}
        >
          {post.konten_md}
        </ReactMarkdown>
      </article>
      <article></article>
    </div>
    
  );
}
