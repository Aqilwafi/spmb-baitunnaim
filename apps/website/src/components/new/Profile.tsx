import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Profile() {
  return (
    <section className="pb-10 pt-6 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href="/lpi"
          className="block bg-gray-50 p-6 sm:p-8 rounded-2xl shadow-md hover:shadow-lg transition
                     flex flex-col justify-between h-full"
        >
          <div>
            <h1 className="text-md md:text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
              Profil LPI Baitun Na'im
            </h1>

            <p className="text-sm text-gray-700 leading-relaxed text-justify mb-6">
              Lembaga ini bernama Lembaga Pendidikan Islam <strong>BAITUN NA'IM</strong> berkedudukan dan berkantor pusat di komplek Masjid Jami...
            </p>
          </div>

          <span className="inline-flex items-center text-sm gap-1 self-end font-semibold 
                           text-gray-700 hover:text-teal-800 transition">
            Baca Selengkapnya <ArrowRight size={18} />
          </span>
        </Link>
      </div>
    </section>
  );
}