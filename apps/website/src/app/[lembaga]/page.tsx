import Navbar2 from "@/components/old/Navbar2";
import Hero from '@/components/old/Hero';
import Footer from "@/components/new/Footer";
import PostDetail from "@/components/old/PostDetail";

interface Props {
  params: Promise<{ slug: string }>; // ← params adalah Promise
}

// Server Component dengan async
export default async function LembagaPage({ params }: Props) {
  const { slug } = await params; // ← await params dulu
  
  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      <Navbar2 />
      <main className="flex-1 pt-29">
        <Hero />  
      </main>
      <Footer />
    </div>
  );
}