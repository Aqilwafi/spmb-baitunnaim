// apps/web/src/app/publikasi/page.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PublikasiList from "@/components/PublikasiList";
import { fetchPublishedPosts } from "@/features/posts";

export default async function PublikasiPage() {
  const posts = await fetchPublishedPosts();

  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      <Navbar />
      <main className="flex-1 pt-22">
        <PublikasiList posts={posts} />
      </main>
      <Footer />
    </div>
  );
}