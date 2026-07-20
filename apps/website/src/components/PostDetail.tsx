import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import type { PostDetail as PostDetailType } from "@bn/types";

interface Props {
  post: PostDetailType | null;
}

export default function PostDetail({ post }: Props) {
  if (!post)
    return (
      <p className="text-center mt-10 text-xl font-semibold">
        ❌ Post tidak ditemukan
      </p>
    );

  const hero = post.post_images?.find((img) => !img.is_hero);
  console.log(hero?.image_path);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <nav className="text-gray-500 text-sm mb-4" aria-label="Breadcrumb">
        <Link href="/" className="hover:underline">Home</Link>{" "}
        / <Link href="/publikasi" className="hover:underline">Publikasi</Link>{" "}
        / <span className="text-gray-700 font-medium">{post.judul}</span>
      </nav>

      <h1 className="text-4xl font-bold mb-3 leading-tight">{post.judul}</h1>
      <p className="text-gray-600 mb-5 leading-relaxed">{post.ringkasan}</p>

      {hero && (
        <img
          src={hero.image_path}
          alt={post.judul}
          className="rounded-lg shadow mb-8 w-full object-cover"
        />
      )}

      <article className="prose prose-lg text-justify max-w-none prose-img:rounded-lg prose-ul:list-disc prose-ol:list-decimal prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeSanitize]}>
          {post.content}
        </ReactMarkdown>
      </article>

      {post.post_tag && post.post_tag.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-6">
          {post.post_tag.map((pt, i) => (
            <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
              #{pt.tags.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}