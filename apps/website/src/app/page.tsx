import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Hero2 from '@/components/Hero2';
import Hero3 from '@/components/Hero3';
import KataMereka from '@/components/KataMereka';
import Kerjasama from '@/components/Kerjasama';
import SosialMedia from '@/components/SosialMedia';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen text-black">
      <Navbar transparent={true}/>
      <main className="flex-1">
        <Hero />      
        <Hero2 />
        <Hero3 />
        <KataMereka />
          <Kerjasama/>
          <SosialMedia/>
      </main>
      <Footer />
    </div>
  );
}
