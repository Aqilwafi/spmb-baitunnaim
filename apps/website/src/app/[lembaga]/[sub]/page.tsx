import Navbar from "@/components/new/NavbarMain";
import Hero from '@/components/old/Hero';
import Footer from "@/components/new/Footer";
import PostDetail from "@/components/old/PostDetail";
import { fetchPublishedPostBySlug } from "@/features/posts";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function SubLembagaPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPublishedPostBySlug(slug);

  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      <Navbar />
      <main className="flex-1 pt-22">
        <Hero />
        {/* <PostDetail post={post} /> */}
      </main>
      <Footer />
    </div>
  );
}