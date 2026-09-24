import NavbarMain from '../components/new/NavbarMain';
import Hero from '../components/old/Hero';
import Footer from '../components/new/Footer';
import Welcome from '@/components/new/Welcome';
import Profile from '@/components/new/Profile';
import KataMereka from '@/components/old/KataMereka';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen text-black bg-white">
      <NavbarMain transparent={true} />
      
      <main className="flex-1 flex flex-col">
        
        {/* 
          1. WELCOME: 
          Tampil di paling atas HANYA PADA SAAT MOBILE (md:hidden).
          Di laptop, bagian ini akan disembunyikan dari sini agar Hero bisa tampil duluan.
        */}
        <div className="block md:hidden">
          <Welcome />
        </div>

        {/* 2. HERO: 
          Tampil normal di semua layar, tapi di laptop dia berada di urutan paling atas.
        */}
        <Hero />

        {/* 
          3. WELCOME UNTUK LAPTOP:
          Tampil HANYA PADA SAAT LAPTOP/DESKTOP (hidden md:block).
          Sehingga di laptop urutannya: Hero -> Welcome -> Profile -> Kata Mereka.
        */}
        <div className="hidden md:block">
          <Welcome />
        </div>

        {/* 4. PROFILE & KATA MEREKA (Selalu di bawah, dengan Kata Mereka paling buncit) */}
        <Profile />
        <KataMereka />
        
      </main>

      <Footer />
    </div>
  );
}