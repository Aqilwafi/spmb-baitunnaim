//import { stats } from "@bn/constants"

export default function Hero3() {
  return (
    <section className="bg-teal-800 py-8 opacity-90 text-white">
      <div className="container mx-auto px-6">
        
        {/* Isian dari Welcome */}
        <div className="text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-1">
            Welcome to
          </h2>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-1">
            <strong>BAITUN NA'IM ISLAMIC FULL DAY SCHOOL</strong>
          </h2>
          <h3 className="text-md md:text-xl font-medium text-teal-200 mb-2">
            Sekolah Hebat untuk Semua dan Setiap Anak
          </h3>
        </div>

        {/* Grid untuk statistik/konten Hero3 berikutnya */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Masukkan elemen grid/stats Anda di sini */}
        </div>

      </div>
    </section>
  );
}