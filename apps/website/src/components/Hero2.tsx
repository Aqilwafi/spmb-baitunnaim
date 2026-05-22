import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero2() {
  
  return (
    <section className="py-10 bg-white overflow-hidden">
      <div className="container mx-auto px-2 text-center">
        {/* JUDUL */}
        <h2 className="text-2xl md:text-5xl font-bold text-teal-800 mb-1">
          Welcome to
        </h2>
        <h2 className="text-2xl md:text-4xl font-bold text-teal-800 mb-1">
          <strong>BAITUN NA'IM ISLAMIC FULL DAY SCHOOL</strong>
        </h2>
        <h3 className="text-md md:text-xl font-medium text-gray-400 mb-6">
          Sekolah Hebat untuk Semua dan Setiap Anak
        </h3>
        
        <Link
          href="/lpi"
          className="block bg-gray-50 p-6 shadow-md hover:shadow-lg transition
                    flex flex-col justify-between h-full"
        >
          <div>
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">
              Profil LPI Baitun Na'im
            </h1>

            <p className="text-gray-700 leading-relaxed text-justify mb-4">
              Lembaga ini bernama Lembaga Pendidikan Islam <strong>BAITUN NA'IM</strong> berkedudukan dan berkantor pusat di komplek Masjid Jami...
            </p>
          </div>

          <span className="inline-flex items-center gap-1 self-end font-semibold 
                          text-gray-700 hover:text-teal-800 transition">
            Baca Selengkapnya <ArrowRight size={18} />
          </span>
        </Link>


      </div>
      
    </section>
  );
}
