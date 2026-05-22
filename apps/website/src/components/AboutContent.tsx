// components/AboutContent.tsx
export default function AboutContent() {
  return (
    <section className="min-h-screen bg-gray-50 px-4 text-black">
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-8">

        <h1 className="text-4xl font-bold text-gray-800">
          Profil Yayasan LPI Baitunnaim
        </h1>

        <p className="text-gray-700 leading-relaxed">
          <strong>Yayasan LPI Baitunnaim</strong> adalah sebuah lembaga pendidikan Islam
          yang berkomitmen dalam membentuk generasi berakhlak mulia, berilmu, dan
          berdaya saing melalui sistem pendidikan yang terpadu antara nilai keislaman
          dan ilmu pengetahuan modern.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Yayasan ini hadir sebagai wadah pembinaan anak sejak usia dini hingga
          pendidikan dasar, dengan mengedepankan pendidikan karakter, spiritualitas,
          serta kecerdasan intelektual yang seimbang. Kami meyakini bahwa pendidikan
          bukan hanya mengajarkan ilmu, tetapi juga membina kepribadian dan iman.
        </p>

        {/* VISI */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Visi</h2>
          <p className="text-gray-700 leading-relaxed">
            Menjadi lembaga pendidikan Islam unggulan dalam mencetak generasi yang
            beriman, berilmu, berakhlak, dan berdaya saing di tingkat nasional maupun global.
          </p>
        </section>

        {/* MISI */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Misi</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Menyelenggarakan pendidikan Islam terpadu berbasis Al-Qur’an dan As-Sunnah.</li>
            <li>Menanamkan nilai akhlakul karimah sejak usia dini.</li>
            <li>Mengembangkan potensi akademik dan non-akademik peserta didik.</li>
            <li>Mendorong terciptanya lingkungan belajar yang aman, islami, dan kondusif.</li>
            <li>Membina tenaga pendidik yang profesional, berdedikasi, dan berintegritas.</li>
            <li>Mengintegrasikan teknologi dalam proses pembelajaran.</li>
          </ul>
        </section>

        {/* UNIT PENDIDIKAN */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Unit Pendidikan</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li><strong>Kelompok Bermain (KB)</strong> - Pendidikan usia dini berbasis pembentukan karakter dan adab.</li>
            <li><strong>Taman Kanak-Kanak (TK)</strong> - Penguatan dasar akademik, sosial, dan spiritual anak.</li>
            <li><strong>Madrasah Ibtidaiyah (MI)</strong> - Pendidikan dasar ilmiah dan keislaman terpadu.</li>
          </ul>
        </section>

        {/* NILAI UNGGUL */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">Nilai-Nilai Unggulan</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Keislaman dan Akhlak Mulia</li>
            <li>Kedisiplinan dan Tanggung Jawab</li>
            <li>Kemandirian dan Kreativitas</li>
            <li>Keunggulan Akademik</li>
            <li>Kepedulian Sosial</li>
          </ul>
        </section>

        {/* TENTANG YAYASAN */}
        <section className="space-y-4 pb-10">
          <h2 className="text-2xl font-semibold text-gray-800">Tentang Yayasan</h2>
          <p className="text-gray-700 leading-relaxed">
            Yayasan LPI Baitunnaim tidak hanya berperan sebagai lembaga pendidikan,
            tetapi juga sebagai pusat dakwah dan pembinaan umat. Kami berkomitmen untuk
            menciptakan lingkungan pendidikan yang menumbuhkan nilai-nilai Islam serta
            membangun karakter generasi penerus bangsa yang berkualitas.
          </p>
        </section>

      </div>
    </section>
  );
}
