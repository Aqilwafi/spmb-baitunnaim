import Navbar2 from "@/components/Navbar2";
import Hero from '@/components/Hero';
import Footer from "@/components/Footer";
import PostDetail from "@/components/PostDetail";

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